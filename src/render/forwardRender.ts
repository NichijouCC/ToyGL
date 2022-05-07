import { Material } from "./material";
import { RenderState } from "./renderState";
import { Frustum } from "./frustum";
import { BoundingSphere } from "../scene/bounds";
import { UniformState } from "./uniformState";
import { AutoUniforms } from "./autoUniform";
import { ShaderBucket } from "./shaderBucket";
import { IRenderable } from "./irenderable";
import { GraphicsDevice, IEngineOption, ShaderProgram } from "../webgl";
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
            }
            //可做renderItems排序
            if (options?.onAfterFrustumCull != null) {
                renderList = options?.onAfterFrustumCull(renderList, camera);
            }
            //准备视口和清理画布
            this.uniformState.viewer = camera;
            this.device.setViewPort(camera.viewport.x, camera.viewport.y, camera.viewport.width, camera.viewport.height);
            this.device.setClearStateAndClear({
                clearDepth: camera.enableClearDepth ? camera.dePthValue : null,
                clearColor: camera.enableClearColor ? camera.backgroundColor : null,
                clearStencil: camera.enableClearStencil ? camera.stencilValue : null
            });
            //遍历渲染
            for (let i = 0; i < renderList.length; i++) {
                this.drawGeometry(renderList[i]);
            }
        }
    })()

    drawGeometry = (() => {
        let preMaterial: Material, material: Material, uniforms, preRenderState: RenderState, renderState: RenderState;
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
            if (renderItem.instanceData) {
                bucketId = bucketId | ShaderBucket.INS_POS;
            }
            //shader bind
            let shaderIns = material.shader.bind(bucketId, this.device);
            //shader uniform bind
            this.bindShaderUniforms(shaderIns, uniforms);
            //render state bind
            renderState = material.renderState;
            if (preMaterial != material && preRenderState != renderState) {
                preRenderState = renderState;
                this.device.setCullState(renderState.cull);
                this.device.setDepthState(renderState.depth);
                this.device.setColorMaskState(renderState.colorMask);
                this.device.setBlendState(renderState.blend);
                this.device.setStencilState(renderState.stencilTest);
                this.device.setScissorState(renderState.scissorTest);
            }
            if (renderItem.instanceData) {//instance draw
                renderItem.geometry.addAttribute(renderItem.instanceData.attribute);
                //vao bind
                let vao = renderItem.geometry.bind(this.device);
                this.device.draw(vao, renderItem.instanceData.count);
            } else {
                //vao bind
                let vao = renderItem.geometry.bind(this.device);
                this.device.draw(vao);
            }
            preMaterial = material;
            renderItem.children?.forEach(item => this.drawGeometry(item))
        }
    })()

    private bindShaderUniforms(shaderIns: ShaderProgram, uniformValues: { [name: string]: any }) {
        const values = { ...uniformValues };
        const uniforms = shaderIns.uniforms;
        for (const key in uniforms) {
            if (AutoUniforms.containAuto(key)) {
                values[key] = AutoUniforms.getAutoUniformValue(key, this.uniformState);
            }
        }
        for (let key in values) {
            if (values[key] instanceof BaseTexture) {
                let tex = (values[key] as BaseTexture)
                let glTex = tex.bind(this.device);
                shaderIns.bindUniform(key, glTex);
            } else {
                shaderIns.bindUniform(key, values[key]);
            }
        }
        // shaderIns.bindUniforms(values);
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
