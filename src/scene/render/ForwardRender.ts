import { Camera } from "../Camera";
import { Material } from "../asset/Material";
import { GraphicsDevice } from "../../webgl/GraphicsDevice";
import { RenderState } from "../RenderState";
import { Frustum } from "../Frustum";
import { BoundingSphere } from "../Bounds";
import { MeshInstance } from "../primitive/MeshInstance";
import { UniformState } from "../UniformState";
import { Entity } from "../../core/Entity";
import { Igeometry } from "../asset/geometry/BaseGeometry";
import { Mat4 } from "../../mathD/mat4";
import { SkinInstance } from "../primitive/SkinInstance";
import { StaticMesh } from "../asset/geometry/StaticMesh";
import { AutoUniforms } from "../AutoUniform";
import { ShaderInstance } from "../asset/Shader";


export enum SortTypeEnum {
    MatLayerIndex = 0b10000,
    ShaderId = 0b01000,
    Zdist_FrontToBack = 0b00100
}

namespace Private {
    export let preMaterial: Material;
    export let preRenderState: RenderState;
    export let temptSphere: BoundingSphere = new BoundingSphere();
}

export interface Irenderable {
    bevisible?: boolean;
    cullingMask?: number;
    enableCull?: boolean;
    instanceCount?: number;
    material: Material;
    geometry: Igeometry;
    worldMat: Mat4;
    bounding: BoundingSphere;
    zdist?: number;

    skinIns?: SkinInstance;
}


export class ForwardRender {
    private device: GraphicsDevice;
    uniformState = new UniformState();
    constructor(device: GraphicsDevice) {
        this.device = device;
    }

    setCamera(camera: Camera) {
        this.uniformState.curCamera = camera;
        this.device.setViewPort(camera.viewport.x, camera.viewport.y, camera.viewport.width * this.device.width, camera.viewport.height * this.device.height);
        this.device.setClear(
            camera.enableClearDepth ? camera.dePthValue : null,
            camera.enableClearColor ? camera.backgroundColor : null,
            camera.enableClearStencil ? camera.stencilValue : null
        );
    }

    render(camera: Camera, drawCalls: Irenderable[], lights?: any, ) {
        let culledDrawcalls = this.cull(camera, drawCalls);
        let drawcall, shader, uniforms, renderState, vertexArray, shaderIns: ShaderInstance, uniformValue
        for (let i = 0; i < culledDrawcalls.length; i++) {
            drawcall = culledDrawcalls[i];

            if (drawcall.skinIns) {
                drawcall.skinIns.recomputeBoneData();
                drawcall.skinIns.applyToAutoUniform(this.uniformState, this.device);
            } else {
                this.uniformState.matrixModel = drawcall.worldMat;
            }

            let bucketId = 0;
            if (drawcall.material != Private.preMaterial || drawcall.material.beDirty) {
                Private.preMaterial = drawcall.material;
                drawcall.material.beDirty = false;

                shaderIns = drawcall.material.shader.getInstance(bucketId);
                uniforms = drawcall.material.uniformParameters;
                renderState = drawcall.material.renderState;

                shaderIns.bindAutoUniforms(this.device, this.uniformState);//auto unfiorm
                shaderIns.bindManulUniforms(this.device, uniforms);

                if (Private.preRenderState != renderState) {
                    this.device.setCullFaceState(renderState.cull.enabled, renderState.cull.cullBack);
                    this.device.setDepthState(renderState.depthWrite, renderState.depthTest.enabled, renderState.depthTest.depthFunc);
                    this.device.setColorMask(renderState.colorWrite.red, renderState.colorWrite.green, renderState.colorWrite.blue, renderState.colorWrite.alpha);
                    this.device.setBlendState(
                        renderState.blend.enabled,
                        renderState.blend.blendEquation,
                        renderState.blend.blendSrc,
                        renderState.blend.blendDst,
                        renderState.blend.enableSeparateBlend,
                        renderState.blend.blendAlphaEquation,
                        renderState.blend.blendSrcAlpha,
                        renderState.blend.blendDstAlpha,
                    );
                    this.device.setStencilState(
                        renderState.stencilTest.enabled,
                        renderState.stencilTest.stencilFunction,
                        renderState.stencilTest.stencilRefValue,
                        renderState.stencilTest.stencilMask,
                        renderState.stencilTest.stencilFail,
                        renderState.stencilTest.stencilFaileZpass,
                        renderState.stencilTest.stencilPassZfail,
                        renderState.stencilTest.enableSeparateStencil,
                        renderState.stencilTest.stencilFunctionBack,
                        renderState.stencilTest.stencilRefValueBack,
                        renderState.stencilTest.stencilMaskBack,
                        renderState.stencilTest.stencilFailBack,
                        renderState.stencilTest.stencilFaileZpassBack,
                        renderState.stencilTest.stencilPassZfailBack,
                    );
                }
            } else {
                shaderIns = drawcall.material.shader.getInstance(bucketId)
                shaderIns.bindAutoUniforms(this.device, this.uniformState);//auto unfiorm
            }
            drawcall.geometry.bind(this.device);
            this.device.draw(drawcall.geometry.graphicAsset, drawcall.instanceCount)
        }
    }
    /**
     * 使用camera cullingMask和frustum 剔除不可见物体
     * @param camera 
     * @param drawCalls 
     */
    cull(camera: Camera, drawCalls: Irenderable[]) {
        let visualArr = [];
        let { cullingMask, frustum } = camera;
        let drawcall
        for (let i = 0; i < drawCalls.length; i++) {
            drawcall = drawCalls[i];
            if (!drawcall.bevisible || (drawcall.cullingMask != null && ((drawcall.cullingMask & cullingMask) == 0))) continue;
            if (drawcall.enableCull) {
                if (this.frustumCull(frustum, drawcall)) {
                    visualArr.push(drawcall);
                }
            } else {
                visualArr.push(drawcall);
            }
        }
        return visualArr;
    }

    private frustumCull(frustum: Frustum, drawcall: Irenderable) {
        // BoundingSphere.fromBoundingBox(drawcall.boundingBox, Private.temptSphere);
        return frustum.containSphere(drawcall.bounding, drawcall.worldMat);
    }

    drawMesh(options: { mesh: StaticMesh, mat: Material }) {

    }
}