import { Camera, ClearEnum } from "./Camera";
import { DrawCommand } from "./DrawCommand";
import { Material } from "./asset/Material";
import { GraphicsDevice } from "../webgl/GraphicsDevice";
import { RenderState } from "./RenderState";
import { Frustum } from "./Frustum";
import { Vec3 } from "../mathD/vec3";
import { BoundingSphere } from "./Bounds";
import { StaticMesh } from "./asset/StaticMesh";
import { MeshInstance } from "./MeshInstance";
import { RenderLayerEnum } from "./RenderLayer";
import { LayerCollection } from "./LayerCollection";
import { IlayerIndexEvent } from "./asset/Shader";
import { UniformState } from "./UniformState";


export enum SortTypeEnum
{
    MatLayerIndex = 0b10000,
    ShaderId = 0b01000,
    Zdist_FrontToBack = 0b00100
}

namespace Private
{
    export let preMaterial: Material;
    export let preRenderState: RenderState;
    export let temptSphere: BoundingSphere = new BoundingSphere();
}


export class Render
{
    private device: GraphicsDevice;
    uniformState = new UniformState();
    constructor(device: GraphicsDevice)
    {
        this.device = device;
    }

    setCamera(camera: Camera)
    {
        this.uniformState.curCamera = camera;
        this.device.setClear(
            camera.enableClearDepth ? camera.dePthValue : null,
            camera.enableClearColor ? camera.backgroundColor : null,
            camera.enableClearStencil ? camera.stencilValue : null
        );
    }

    renderLayers(camera: Camera, layer: LayerCollection)
    {
        if (layer.insCount == 0) return;
        var commands = layer.getSortedinsArr(camera);
        this.render(camera, commands);
    }

    render(camera: Camera, drawCalls: MeshInstance[], lights?: any, )
    {
        let culledDrawcalls = this.cull(camera, drawCalls);
        let drawcall, shader, uniforms, renderState, vertexArray
        for (let i = 0; i < culledDrawcalls.length; i++)
        {
            drawcall = culledDrawcalls[i];
            this.uniformState.matrixModel = drawcall.worldMat;
            if (drawcall.material != Private.preMaterial || drawcall.material.beDirty)
            {
                Private.preMaterial = drawcall.material;
                drawcall.material.beDirty = false;

                shader = drawcall.material.shader;
                uniforms = drawcall.material.uniformParameters;
                renderState = drawcall.material.renderState;

                shader.bind(this.device);
                shader.bindAutoUniforms(this.device, this.uniformState);//auto unfiorm
                shader.bindManulUniforms(this.device, uniforms);

                if (Private.preRenderState != renderState)
                {
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
            } else
            {
                shader = drawcall.material.shader;
                shader.bindAutoUniforms(this.device, this.uniformState);//auto unfiorm
            }
            drawcall.geometry.bind(this.device);
            drawcall.geometry.draw(this.device, drawcall.instanceCount);
        }
    }
    /**
     * 使用camera cullingMask和frustum 剔除不可见物体
     * @param camera 
     * @param drawCalls 
     */
    cull(camera: Camera, drawCalls: MeshInstance[])
    {
        let visualArr = [];
        let { cullingMask, frustum } = camera;
        let drawcall
        for (let i = 0; i < drawCalls.length; i++)
        {
            drawcall = drawCalls[i];
            if (!drawcall.bevisible || (drawcall.cullingMask != null && ((drawcall.cullingMask & cullingMask) == 0))) continue;
            if (drawcall.enableCull)
            {
                if (this.frustumCull(frustum, drawcall))
                {
                    visualArr.push(drawcall);
                }
            } else
            {
                visualArr.push(drawcall);
            }
        }
        return visualArr;
    }

    private frustumCull(frustum: Frustum, drawcall: MeshInstance)
    {
        // BoundingSphere.fromBoundingBox(drawcall.boundingBox, Private.temptSphere);
        return frustum.containSphere(drawcall.bounding, drawcall.worldMat);
    }
}