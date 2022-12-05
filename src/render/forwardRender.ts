import { Material } from "./material";
import { BlitRenderState, RenderState } from "./renderState";
import { Frustum } from "./frustum";
import { BoundingSphere } from "../scene/bounds";
import { UniformState } from "./uniformState";
import { AutoUniforms } from "./autoUniform";
import { ShaderFeat } from "./shaderBucket";
import { IRenderable } from "./irenderable";
import { GraphicsDevice, IEngineOption, ShaderProgram, VertexAttEnum } from "../webgl";
import { Color, mat4, Rect, Tempt, vec3, vec4 } from "../mathD";
import { BaseTexture } from "./baseTexture";
import { ICamera } from "./camera";
import { RenderTarget } from "./renderTarget";
import { DefaultGeometry } from "../resources/defAssets/defaultGeometry";
import { RenderTypeEnum } from "./renderLayer";
import { ISceneCamera } from "../scene";
export class ForwardRender {
    readonly device: GraphicsDevice;
    uniformState = new UniformState();
    constructor(canvas: HTMLCanvasElement, option?: IEngineOption) {
        this.device = new GraphicsDevice(canvas, option);
    }

    renderList(camera: ICamera[] | ICamera, renderItems: IRenderable[], options?: { onAfterFrustumCull?: (renderInsArr: IRenderable[], viewer: ICamera) => void }) {
        renderItems = renderItems.filter(item => { return !(item.beVisible == false || item.geometry == null || item.material?.shader == null) });
        if (camera instanceof Array) {
            for (let k = 0; k < camera.length; k++) {
                this._renderList(camera[k], renderItems, options);
            }
        } else {
            this._renderList(camera, renderItems, options);
        }
    }

    /**
     * 通过材质(将source作为"MainTex"参数)绘制source图像到destination中
     * destination=null时，则绘制到屏幕上
    */
    blit(source: BaseTexture, destination: RenderTarget | null, mat: Material) {
        mat.setUniform("MainTex", source);
        if (destination != null) {
            let fb = destination.syncData(this.device);
            fb.bind();
            this.device.setViewPort(0, 0, destination.width, destination.height);
        } else {
            this.device.unbindFrameBuffer();
            this.device.setViewPort(0, 0, this.device.canvas.width, this.device.canvas.height);
        }
        // this.device.setClearStateAndClear({ clearDepth: null, clearColor: Color.WHITE, clearStencil: null });
        this.device.setCullState(BlitRenderState.cull);
        this.device.setDepthState(BlitRenderState.depth);
        this.device.setColorMaskState(BlitRenderState.colorMask);
        this.device.setBlendState(BlitRenderState.blend);
        this.device.setStencilState(BlitRenderState.stencilTest);
        this.device.setScissorState(BlitRenderState.scissorTest);
        mat.shader.getSubPasses(0, this.device).forEach(el => {
            //shader bind
            el.bind();
            //shader uniform bind
            this.bindShaderUniforms(el, mat.uniformParameters);
            let vao = DefaultGeometry.quad2d.syncDataAndBind(this.device);
            this.device.draw(vao);
        });
    }

    private _renderList = (() => {
        var viewProjectMatrix: mat4 = mat4.create();
        var frustum = new Frustum();
        return (camera: ICamera, renderItems: IRenderable[], options?: { onAfterFrustumCull?: (renderInsArr: IRenderable[], viewer: ICamera) => void }) => {
            const { cullingMask, projectMatrix, viewMatrix, renderTarget, viewport } = camera;
            mat4.multiply(viewProjectMatrix, projectMatrix, viewMatrix);
            frustum.setFromMatrix(viewProjectMatrix);
            this.uniformState.matrixViewProject = viewProjectMatrix as any;
            let item: IRenderable
            let renderList = [];
            //检查mask,做视锥体剔除
            for (let i = 0; i < renderItems.length; i++) {
                item = renderItems[i];
                if (item.layer != null && ((item.layer & cullingMask) == 0)) continue;
                if (item.enableCull) {
                    if (this.frustumCull(frustum, item)) {
                        renderList.push(item);
                    }
                } else {
                    renderList.push(item);
                }
            }
            if (options?.onAfterFrustumCull != null) {
                options?.onAfterFrustumCull(renderList, camera);
            }
            //renderItems排序
            this.sortRenderItems(renderList, camera);

            //准备视口和清理画布
            this.uniformState.viewer = camera;
            let pixelWidth = this.device.canvas.width;
            let pixelHeight = this.device.canvas.height;
            if (renderTarget != null) {
                let fb = renderTarget.syncData(this.device);
                fb.bind();
                pixelWidth = renderTarget.width;
                pixelHeight = renderTarget.height;
            } else {
                this.device.unbindFrameBuffer();
            }
            this.device.setViewPort(viewport.x * pixelWidth, viewport.y * pixelHeight, viewport.width * pixelWidth, viewport.height * pixelHeight);
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
                bucketId = bucketId | ShaderFeat.SKIN;
                this.uniformState.matrixModel = renderItem.skin.worldMat;
                this.uniformState.boneMatrices = renderItem.skin.boneMatrices;
            } else {
                this.uniformState.matrixModel = renderItem.worldMat;
            }

            material = renderItem.material;
            uniforms = material.uniformParameters;
            if (uniforms.MainTex) {
                bucketId = bucketId | ShaderFeat.DIFFUSE_MAP;
            }
            renderItem.instanceData?.attributes.forEach(item => {
                bucketId = bucketId | item.shaderBucketId;
            });
            material.shader.getSubPasses(bucketId, this.device).forEach(el => {
                //shader bind
                el.bind();
                //shader uniform bind
                this.bindShaderUniforms(el, uniforms);
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
                    renderItem.instanceData.attributes.forEach(item => renderItem.geometry.addAttribute(item));
                    //vao bind
                    let vao = renderItem.geometry.syncDataAndBind(this.device);
                    this.device.draw(vao, renderItem.instanceData.count);
                } else {
                    //vao bind
                    let vao = renderItem.geometry.syncDataAndBind(this.device);
                    this.device.draw(vao);
                }
                preMaterial = material;
            })
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
                let glTex = tex.syncData(this.device);
                shaderIns.bindUniform(key, glTex);
            } else {
                shaderIns.bindUniform(key, values[key]);
            }
        }
        // shaderIns.bindUniforms(values);
    }

    private frustumCull(frustum: Frustum, drawCall: IRenderable) {
        if (drawCall.worldBounding) {
            return frustum.containSphere(drawCall.worldBounding);
        } else {
            return frustum.containSphere(drawCall.geometry.bounding, drawCall.worldMat);
        }
    }

    private sortRenderItems(items: IRenderable[], cam: ICamera) {
        if (items.length <= 1) return items;
        let zdistDic: Map<IRenderable, number> = new Map();
        // let camera: CameraComponent = cam as any;
        let camWorldMat = cam.worldMatrix;
        const camPos = mat4.getTranslation(Tempt.getVec3(0), camWorldMat);
        let camFwd = mat4.transformVector(Tempt.getVec3(1), vec3.FORWARD, camWorldMat);
        vec3.normalize(camFwd, camFwd);
        let tempX, tempY, tempZ;
        let insPos = Tempt.getVec3(2);

        items.sort((a, b) => {
            let firstSortOrder = a.sortOrder - b.sortOrder;
            if (!isNaN(firstSortOrder) && firstSortOrder != 0) return firstSortOrder;
            let renderType = a.material.renderType - b.material.renderType;
            if (renderType != 0) return renderType;
            let sortOrder = a.material.sortOrder - b.material.sortOrder
            if (!isNaN(sortOrder) && sortOrder) return sortOrder;
            if (a.material.renderType == RenderTypeEnum.OPAQUE) {
                //先shader排序
                let shaderId = a.material.shader.create_id - b.material.shader.create_id;
                if (shaderId != 0) return shaderId;

                //由近到远
                let aZdist: number = zdistDic.get(a);
                let bZdist: number = zdistDic.get(b);
                if (aZdist == null) {
                    mat4.getTranslation(insPos, a.worldMat);
                    tempX = insPos[0] - camPos[0];
                    tempY = insPos[1] - camPos[1];
                    tempZ = insPos[2] - camPos[2];
                    aZdist = tempX * camFwd[0] + tempY * camFwd[1] + tempZ * camFwd[2];
                    zdistDic.set(a, aZdist);
                }
                if (bZdist == null) {
                    mat4.getTranslation(insPos, b.worldMat);
                    tempX = insPos[0] - camPos[0];
                    tempY = insPos[1] - camPos[1];
                    tempZ = insPos[2] - camPos[2];
                    bZdist = tempX * camFwd[0] + tempY * camFwd[1] + tempZ * camFwd[2];
                    zdistDic.set(b, bZdist);
                }
                return bZdist - aZdist;
            } else if (a.material.renderType == RenderTypeEnum.TRANSPARENT || a.material.renderType == RenderTypeEnum.ALPHA_CUT) {
                //由远到近
                let aZdist: number = zdistDic.get(a);
                let bZdist: number = zdistDic.get(b);
                if (aZdist == null) {
                    mat4.getTranslation(insPos, a.worldMat);
                    tempX = insPos[0] - camPos[0];
                    tempY = insPos[1] - camPos[1];
                    tempZ = insPos[2] - camPos[2];
                    aZdist = tempX * camFwd[0] + tempY * camFwd[1] + tempZ * camFwd[2];
                    zdistDic.set(a, aZdist);
                }
                if (bZdist == null) {
                    mat4.getTranslation(insPos, b.worldMat);
                    tempX = insPos[0] - camPos[0];
                    tempY = insPos[1] - camPos[1];
                    tempZ = insPos[2] - camPos[2];
                    bZdist = tempX * camFwd[0] + tempY * camFwd[1] + tempZ * camFwd[2];
                    zdistDic.set(b, bZdist);
                }
                return aZdist - bZdist;
            }
            return 0;
        });
        return items;
    }
}
