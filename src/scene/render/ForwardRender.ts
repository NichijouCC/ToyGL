import { Camera } from "../Camera";
import { Material } from "../asset/material/Material";
import { GraphicsDevice } from "../../webgl/GraphicsDevice";
import { RenderState } from "../RenderState";
import { Frustum } from "../Frustum";
import { BoundingSphere } from "../Bounds";
import { MeshInstance } from "../primitive/MeshInstance";
import { UniformState } from "../UniformState";
import { Entity } from "../../core/Entity";
import { StaticMesh } from "../asset/geometry/StaticMesh";
import { AutoUniforms } from "../AutoUniform";
import { ShaderBucket } from "../asset/material/ShaderBucket";
import { ShaderInstance } from "../asset/material/ShaderInstance";
import { LayerComposition } from "../LayerComposition";
import { Irenderable } from "./Irenderable";

const Private: {
    preMaterial: Material,
    preBuketID: number,
    preRenderState: RenderState,
    temptSphere: BoundingSphere
} = {
    preMaterial: null,
    preBuketID: null,
    preRenderState: null,
    temptSphere: new BoundingSphere()
};
export class ForwardRender {
    private device: GraphicsDevice;
    uniformState = new UniformState();
    constructor(device: GraphicsDevice) {
        this.device = device;
    }

    private setCamera(camera: Camera) {
        this.uniformState.curCamera = camera;
        this.device.setViewPort(camera.viewport.x, camera.viewport.y, camera.viewport.width * this.device.width, camera.viewport.height * this.device.height);
        this.device.setClear(
            camera.enableClearDepth ? camera.dePthValue : null,
            camera.enableClearColor ? camera.backgroundColor : null,
            camera.enableClearStencil ? camera.stencilValue : null
        );
    }

    private camerRenderLayers = new Map<Camera, LayerComposition>();

    render(cameras: Camera[], renderArr: Irenderable[], lights?: any) {
        cameras = cameras.sort(item => item.priority);
        let cam: Camera, layercomps: LayerComposition, renderItem: Irenderable;

        // ---------------clear preFrame Data
        for (let k = 0; k < cameras.length; k++) {
            cam = cameras[k];
            if (!this.camerRenderLayers.has(cam)) {
                layercomps = new LayerComposition();
                this.camerRenderLayers.set(cam, layercomps);
            } else {
                layercomps = this.camerRenderLayers.get(cam);
                layercomps.clear();
            }
        }

        // ----------------collect render Ins
        for (let i = 0; i < renderArr.length; i++) {
            renderItem = renderArr[i];
            if (!renderItem.bevisible || renderItem.geometry == null || renderItem.material?.shader == null) continue;
            for (let k = 0; k < cameras.length; k++) {
                cam = cameras[k];
                const { cullingMask, frustum } = cam;
                layercomps = this.camerRenderLayers.get(cam);

                if (renderItem.cullingMask != null && ((renderItem.cullingMask & cullingMask) == 0)) continue;
                if (renderItem.enableCull) {
                    if (this.frustumCull(frustum, renderItem)) {
                        layercomps.addRenableItem(renderItem);
                    }
                } else {
                    layercomps.addRenableItem(renderItem);
                }
            }
        }

        // ------------------------render per camera
        for (let k = 0; k < cameras.length; k++) {
            cam = cameras[k];
            this.setCamera(cam);
            layercomps = this.camerRenderLayers.get(cam);
            layercomps.getlayers().forEach(layer => {
                if (layer.insCount == 0) return;
                const renderInsArr = layer.getSortedinsArr(cam);
                this.renderList(cam, renderInsArr);
            });
        }
    }

    private renderList(cam: Camera, renderInsArr: Irenderable[]) {
        let renderItem: Irenderable, material: Material, uniforms, renderState, vertexArray, shaderIns: ShaderInstance, uniformValue;
        for (let i = 0; i < renderInsArr.length; i++) {
            renderItem = renderInsArr[i];

            let bucketId = 0;
            if (renderItem.skinIns) {
                bucketId = bucketId | ShaderBucket.SKIN;
                renderItem.skinIns.update(this.device, this.uniformState);
            } else {
                this.uniformState.matrixModel = renderItem.worldMat;
            }

            material = renderItem.material;
            uniforms = material.uniformParameters;
            if (uniforms.MainTex) {
                bucketId = bucketId | ShaderBucket.DIFFUSEMAP;
            }

            if (material != Private.preMaterial || material.beDirty || Private.preBuketID != bucketId) {
                Private.preMaterial = material;
                Private.preBuketID = bucketId;
                material.beDirty = false;

                shaderIns = material.shader.getInstance(bucketId);
                renderState = material.renderState;

                shaderIns.bind(this.device);
                shaderIns.bindAutoUniforms(this.device, this.uniformState);// auto unfiorm
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
                        renderState.blend.blendDstAlpha
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
                        renderState.stencilTest.stencilPassZfailBack
                    );
                }
            } else {
                shaderIns = material.shader.getInstance(bucketId);
                shaderIns.bindAutoUniforms(this.device, this.uniformState);// auto unfiorm
            }
            renderItem.geometry.bind(this.device);
            this.device.draw(renderItem.geometry.graphicAsset, renderItem.instanceCount);
        }
    }

    private frustumCull(frustum: Frustum, drawcall: Irenderable) {
        return frustum.containSphere(drawcall.bounding, drawcall.worldMat);
    }

    drawMesh(options: { mesh: StaticMesh, mat: Material }) {

    }
}
