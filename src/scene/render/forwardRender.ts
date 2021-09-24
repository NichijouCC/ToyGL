import { Camera } from "../camera";
import { Material } from "./material";
import { GraphicsDevice } from "../../webgl/graphicsDevice";
import { RenderState } from "./renderState";
import { Frustum } from "../frustum";
import { BoundingSphere } from "../bounds";
import { UniformState } from "./uniformState";
import { AutoUniforms } from "./autoUniform";
import { ShaderBucket } from "./shaderBucket";
import { IRenderable } from "./irenderable";
import { FrameState } from "../frameState";
import { ShaderProgram } from "../../webgl";
import { vec3 } from "../../mathD";
import { BaseTexture } from "./baseTexture";

const Private: {
    preShader: ShaderProgram,
    preMaterial: Material,
    preBucketID: number,
    preRenderState: RenderState,
    temptSphere: BoundingSphere
} = {
    preShader: null,
    preMaterial: null,
    preBucketID: null,
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
        const values = { ...uniformValues };
        const uniforms = shaderIns.uniforms;
        for (const key in uniforms) {
            if (AutoUniforms.containAuto(key)) {
                values[key] = AutoUniforms.getAutoUniformValue(key, this.uniformState);
            }
            if (values[key] instanceof BaseTexture) {
                let tex = (values[key] as BaseTexture)
                tex.bind(this.device);
                // shaderIns.bindUniform(key, tex.graphicAsset);
                values[key] = tex.glTarget
            }
        }
        shaderIns.bindUniforms(values);
    }

    // private bindShaderAutoUniforms(shaderIns: ShaderProgram) {
    //     const values: { [key: string]: any } = {};
    //     const uniforms = shaderIns.uniforms;
    //     for (const key in uniforms) {
    //         if (AutoUniforms.containAuto(key)) {
    //             values[key] = AutoUniforms.getAutoUniformValue(key, this.uniformState);
    //         }
    //     }
    //     shaderIns.bindUniforms(values);
    // }

    private setCamera(camera: Camera) {
        this.uniformState.curCamera = camera;
        this.device.setViewPort(camera.viewport.x, camera.viewport.y, camera.viewport.width, camera.viewport.height);
        this.device.setClear(
            camera.enableClearDepth ? camera.dePthValue : null,
            camera.enableClearColor ? camera.backgroundColor : null,
            camera.enableClearStencil ? camera.stencilValue : null
        );
    }

    renderCameras(cameras: Camera[], renderArr: IRenderable[], options?: { onAfterFrustumCull?: (renderInsArr: IRenderable[], cam: Camera) => IRenderable[] }) {
        cameras = cameras.sort(item => item.priority);
        renderArr = renderArr.filter(item => { return !(item.beVisible == false || item.geometry == null || item.material?.shader == null) });

        let cam: Camera, renderItem: IRenderable;
        let _renderList: IRenderable[];
        // ----------------collect render Ins
        for (let k = 0; k < cameras.length; k++) {
            cam = cameras[k];
            const { cullingMask, frustum } = cam;
            _renderList = [];
            for (let i = 0; i < renderArr.length; i++) {
                renderItem = renderArr[i];
                if (renderItem.cullingMask != null && ((renderItem.cullingMask & cullingMask) == 0)) continue;
                if (renderItem.enableCull) {
                    if (this.frustumCull(frustum, renderItem)) {
                        _renderList.push(renderItem);
                    }
                } else {
                    _renderList.push(renderItem);
                }
            }
            if (options?.onAfterFrustumCull != null) {
                _renderList = options?.onAfterFrustumCull(_renderList, cam);
            }
            this.renderList(cam, _renderList);
        }
    }
    renderList(cam: Camera, renderInsArr: IRenderable[]) {
        this.setCamera(cam);
        let renderItem: IRenderable, material: Material, uniforms, renderState, vertexArray, shaderIns: ShaderProgram, uniformValue;
        for (let i = 0; i < renderInsArr.length; i++) {
            renderItem = renderInsArr[i];

            let bucketId = 0;
            if (renderItem.skin) {
                bucketId = bucketId | ShaderBucket.SKIN;
                // renderItem.skinIns.update(this.device, this.uniformState);
                // renderItem.skinIns.applyToUniformState(this.uniformState);
                this.uniformState.matrixModel = renderItem.skin.worldMat;
                this.uniformState.boneMatrices = renderItem.skin.boneMatrices;
            } else {
                this.uniformState.matrixModel = renderItem.worldMat;
            }

            material = renderItem.material;
            uniforms = material.uniformParameters;
            if (uniforms.MainTex) {
                bucketId = bucketId | ShaderBucket.DIFFUSE_MAP;
            }
            let shaderIns = material.shader.bind(bucketId, this.device);
            // shaderIns = material.shader.getProgram(bucketId, this.device);
            // const shaderChanged = shaderIns.bind();

            // if (shaderIns != Private.preShader || material != Private.preMaterial || material._beDirty || Private.preBucketID != bucketId) {
            //     Private.preShader = shaderIns;
            //     Private.preMaterial = material;
            //     Private.preBucketID = bucketId;
            //     material._beDirty = false;
            //     this.bindShaderUniforms(shaderIns, uniforms);
            // } else {
            //     this.bindShaderAutoUniforms(shaderIns);
            // }
            this.bindShaderUniforms(shaderIns, uniforms);

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
                    renderState.stencilTest.stencilFailZpass,
                    renderState.stencilTest.stencilPassZfail,
                    renderState.stencilTest.enableSeparateStencil,
                    renderState.stencilTest.stencilFunctionBack,
                    renderState.stencilTest.stencilRefValueBack,
                    renderState.stencilTest.stencilMaskBack,
                    renderState.stencilTest.stencilFailBack,
                    renderState.stencilTest.stencilFailZpassBack,
                    renderState.stencilTest.stencilPassZfailBack
                );
            }

            let vao = renderItem.geometry.bind(this.device);
            this.device.draw(vao, renderItem.instanceCount);
        }
    }

    private frustumCull = (() => {
        const _temptSphere = new BoundingSphere();
        return (frustum: Frustum, drawCall: IRenderable) => {
            const box = drawCall.boundingBox ?? drawCall.geometry.boundingBox;
            vec3.copy(_temptSphere.center, box.center);
            _temptSphere.radius = vec3.len(box.halfSize);
            return frustum.containSphere(_temptSphere, drawCall.worldMat);
        };
    })()
}
