import { Material } from "./material";
import { GraphicsDevice, IEngineOption } from "../webgl/graphicsDevice";
import { RenderState } from "./renderState";
import { Frustum } from "./frustum";
import { BoundingSphere } from "../scene/bounds";
import { UniformState } from "./uniformState";
import { AutoUniforms } from "./autoUniform";
import { ShaderBucket } from "./shaderBucket";
import { IRenderable } from "./irenderable";
import { ShaderProgram } from "../webgl";
import { mat4, vec3 } from "../mathD";
import { BaseTexture } from "./baseTexture";
import { ICamera } from "./camera";
export class ForwardRender {
    readonly device: GraphicsDevice;
    uniformState = new UniformState();
    constructor(canvas: HTMLCanvasElement, option?: IEngineOption) {
        this.device = new GraphicsDevice(canvas, option);
    }

    renderList(camera: ICamera[] | ICamera, renderItems: IRenderable[], options?: { onAfterFrustumCull?: (renderInsArr: IRenderable[], viewer: ICamera) => IRenderable[] }) {
        renderItems = renderItems.filter(item => { return !(item.beVisible == false || item.geometry == null || item.material?.shader == null) });
        if (camera instanceof Array) {
            for (let k = 0; k < camera.length; k++) {
                this._renderList(camera[k], renderItems, options);
            }
        } else {
            this._renderList(camera, renderItems, options);
        }
    }

    private _renderList = (() => {
        var viewProjectMatrix: mat4 = mat4.create();
        var frustum = new Frustum();
        return (camera: ICamera, renderItems: IRenderable[], options?: { onAfterFrustumCull?: (renderInsArr: IRenderable[], viewer: ICamera) => IRenderable[] }) => {
            const { cullingMask, projectMatrix, viewMatrix } = camera;
            mat4.multiply(viewProjectMatrix, projectMatrix, viewMatrix);
            frustum.setFromMatrix(viewProjectMatrix);
            this.uniformState.matrixViewProject = viewProjectMatrix;
            let item: IRenderable
            let renderList = [];
            //检查mask,做视锥体剔除
            for (let i = 0; i < renderItems.length; i++) {
                item = renderItems[i];
                if (item.layerMask != null && ((item.layerMask & cullingMask) == 0)) continue;
                if (item.enableCull) {
                    if (this.frustumCull(frustum, item)) {
                        renderList.push(item);
                    }
                } else {
                    renderList.push(item);
                }
                renderList.push(item);
            }
            //做renderItems排序
            if (options?.onAfterFrustumCull != null) {
                renderList = options?.onAfterFrustumCull(renderList, camera);
            }
            //准备视口和清理画布
            this.uniformState.viewer = camera;
            this.device.setViewPort(camera.viewport.x, camera.viewport.y, camera.viewport.width, camera.viewport.height);
            this.device.setClear(
                camera.enableClearDepth ? camera.dePthValue : null,
                camera.enableClearColor ? camera.backgroundColor : null,
                camera.enableClearStencil ? camera.stencilValue : null
            );
            //遍历渲染
            for (let i = 0; i < renderList.length; i++) {
                this._renderItem(renderList[i]);
            }
        }
    })()

    private _renderItem = (() => {
        let material: Material, uniforms, preRenderState: RenderState, renderState: RenderState;
        return (renderItem: IRenderable) => {
            let bucketId = 0;
            if (renderItem.skin) {
                bucketId = bucketId | ShaderBucket.SKIN;
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
            //shader bind
            let shaderIns = material.shader.bind(bucketId, this.device);
            //shader uniform bind
            this.bindShaderUniforms(shaderIns, uniforms);
            //vao bind
            let vao = renderItem.geometry.bind(this.device);
            //render state bind
            renderState = material.renderState;
            if (preRenderState != renderState) {
                preRenderState = renderState;
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
            this.device.draw(vao, renderItem.instanceCount);
            renderItem.children?.forEach(item => this._renderItem(item))
        }
    })()

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
                values[key] = tex.glTarget
            }
        }
        shaderIns.bindUniforms(values);
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
