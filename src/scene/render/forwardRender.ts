import { Camera } from "../camera";
import { Material } from "../asset/material/material";
import { GraphicsDevice } from "../../webgl/graphicsDevice";
import { RenderState } from "../renderState";
import { Frustum } from "../frustum";
import { BoundingSphere } from "../bounds";
import { UniformState } from "../uniformState";
import { AutoUniforms } from "./autoUniform";
import { ShaderBucket } from "../asset/material/shaderBucket";
import { LayerComposition } from "../layerComposition";
import { Irenderable } from "./irenderable";
import { FrameState } from "../frameState";
import { ShaderProgram } from "../../webgl";
import { vec3 } from "../../mathD";

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

    private bindShaderUniforms(shaderIns: ShaderProgram, uniformValues: { [name: string]: any }) {
        let values = { ...uniformValues };
        let uniforms = shaderIns.uniforms;
        for (let key in uniforms) {
            if (AutoUniforms.containAuto(key)) {
                values[key] = AutoUniforms.getAutoUniformValue(key, this.uniformState);
            }
        }
        shaderIns.bindUniforms(this.device, values);
    }

    private bindShaderAutoUniforms(shaderIns: ShaderProgram) {
        let values: { [key: string]: any } = {};
        let uniforms = shaderIns.uniforms;
        for (let key in uniforms) {
            if (AutoUniforms.containAuto(key)) {
                values[key] = AutoUniforms.getAutoUniformValue(key, this.uniformState);
            }
        }
        shaderIns.bindUniforms(this.device, values);
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

    render(cameras: Camera[], frameState: FrameState) {
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
        let renderArr = frameState.renders;
        for (let i = 0; i < renderArr.length; i++) {
            renderItem = renderArr[i];
            if (renderItem.beVisible == false || renderItem.geometry == null || renderItem.material?.shader == null) continue;
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
            layercomps = this.camerRenderLayers.get(cam);
            layercomps.getlayers().forEach(layer => {
                if (layer.insCount == 0) return;
                const renderInsArr = layer.getSortedinsArr(cam);
                this.renderList(cam, renderInsArr, frameState);
            });
        }
    }

    private renderList(cam: Camera, renderInsArr: Irenderable[], frameState: FrameState) {
        this.setCamera(cam);
        let renderItem: Irenderable, material: Material, uniforms, renderState, vertexArray, shaderIns: ShaderProgram, uniformValue;
        for (let i = 0; i < renderInsArr.length; i++) {
            renderItem = renderInsArr[i];

            let bucketId = 0;
            if (renderItem.skinIns) {
                bucketId = bucketId | ShaderBucket.SKIN;
                renderItem.skinIns.update(this.device, this.uniformState, frameState);
            } else {
                this.uniformState.matrixModel = renderItem.worldMat;
            }

            material = renderItem.material;
            uniforms = material.uniformParameters;
            if (uniforms.MainTex) {
                bucketId = bucketId | ShaderBucket.DIFFUSE_MAP;
            }

            shaderIns = material.shader.getProgram(bucketId, this.device);
            let shaderChanged = shaderIns.bind();

            if (shaderChanged || material != Private.preMaterial || material._beDirty || Private.preBuketID != bucketId) {
                Private.preMaterial = material;
                Private.preBuketID = bucketId;
                material._beDirty = false;
                this.bindShaderUniforms(shaderIns, uniforms);
            } else {
                this.bindShaderAutoUniforms(shaderIns);
            }

            renderState = material.renderState;
            if (Private.preRenderState != renderState) {
                Private.preRenderState = renderState;
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

            renderItem.geometry.bind(this.device);
            this.device.draw(renderItem.geometry.graphicAsset, renderItem.instanceCount);
        }
    }

    private frustumCull = (() => {
        let _temptSphere = new BoundingSphere();
        return (frustum: Frustum, drawCall: Irenderable) => {
            let aabb = drawCall.boundingBox ?? drawCall.geometry.boundingBox;
            vec3.copy(_temptSphere.center, aabb.center);
            _temptSphere.radius = vec3.len(aabb.halfSize);
            return frustum.containSphere(_temptSphere, drawCall.worldMat);
        }
    })()
}