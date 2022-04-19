import { BlendMode, ClippingAttachment, Color, MeshAttachment, NumberArrayLike, RegionAttachment, Skeleton, SkeletonClipping, TextureAtlasRegion, Vector2, VertexEffect } from "@esotericsoftware/spine-core";
import { IComponent } from "../../core/ecs";
import { mat4, vec2, vec3 } from "../../mathD";
import { BlendParamEnum, IRenderable, Material, Shader, VertexAttEnum } from "../../render";
import { World, System } from "../../scene";
import { SpineAssetMgr } from "./spineAssetMgr";
import { SpineBatcher } from "./spineBatcher";
import { SpineComp } from "./spineComp";
import { SpineTexture } from "./spineTexture";

export class SpineSystem extends System {
    caries: { [queryKey: string]: (new () => IComponent)[]; } = { comps: [SpineComp] }
    readonly assetMgr: SpineAssetMgr;
    readonly premultipliedAlpha: boolean;
    //2d画布的尺寸, 高度自适应
    private _canvasSize = vec2.create();
    get canvasWidth() { return this._canvasSize[0] };
    set canvasWidth(value: number) {
        this._canvasSize[0] = value;
        this._canvasSize[1] = value / this._scene.screen.aspect;
        mat4.fromScaling(this.toCanvasMat, vec3.fromValues(2 / this._canvasSize[0], 2 / this._canvasSize[1], 1))
    }
    private _batcher: SpineBatcher;
    private _shader: Shader;
    private _scene: World;
    private toCanvasMat: mat4 = mat4.create();
    constructor(scene: World, options?: { pathPrefix?: string, premultipliedAlpha?: boolean }) {
        super();
        this._scene = scene;
        this.assetMgr = new SpineAssetMgr(options?.pathPrefix);
        this.canvasWidth = 1800;
        this.premultipliedAlpha = options?.premultipliedAlpha ?? false;

        this._shader = new Shader({
            attributes: {
                "_glesVertex": VertexAttEnum.POSITION,
                "_glesMultiTexCoord0": VertexAttEnum.TEXCOORD_0,
                "_glesColor": VertexAttEnum.COLOR_0,
                "_glesColorEx": VertexAttEnum.COLOR_1,
            },
            vsStr: `
            attribute vec4 _glesVertex;    
            attribute vec2 _glesMultiTexCoord0;          
            attribute vec4 _glesColor;
            attribute vec4 _glesColorEx;                   
            uniform highp mat4 czm_model;
            varying lowp vec4 v_light;  
            varying lowp vec4 v_dark;               
            varying highp vec2 xlv_TEXCOORD0;            
            void main()                                      
            {                                                
                highp vec4 tmpvar_1;                         
                tmpvar_1.w = 1.0;                            
                tmpvar_1.xyz = _glesVertex.xyz;              
                v_light = _glesColor;
                v_dark = _glesColorEx;                    
                xlv_TEXCOORD0 = _glesMultiTexCoord0;      
                gl_Position = czm_model* tmpvar_1;   
            }
            `,
            fsStr: `
            uniform sampler2D uMainTex;
            uniform highp vec4 uMainColor;
            varying lowp vec4 v_light;
            varying lowp vec4 v_dark;
            varying highp vec2 xlv_TEXCOORD0;
            void main()
            {
                lowp vec4 texColor = texture2D(uMainTex, xlv_TEXCOORD0);
                gl_FragColor.a = uMainColor.a * texColor.a * v_light.a;
                gl_FragColor.rgb =uMainColor.rgb*(((texColor.a - 1.0) * v_dark.a + 1.0 - texColor.rgb) * v_dark.rgb + texColor.rgb * v_light.rgb);
            }`
        });
        this._batcher = new SpineBatcher();
    }

    update(deltaTime: number): void {
        this._batcher.begin();
        this.queries.comps.forEach(node => {
            let comp = node.getComponent(SpineComp);
            let { animationState, skeleton, vertexEffect } = comp;
            animationState.update(deltaTime);
            animationState.apply(skeleton);
            skeleton.updateWorldTransform();
            this.updateGeometry(comp);
        })
        this._batcher.end();
        let { drawParams, batchers } = this._batcher;
        drawParams.forEach(el => {
            let mat = new Material();
            mat.shader = this._shader;
            mat.renderState.cull.enabled = false;
            mat.renderState.depthTest.enabled = false;
            mat.renderState.blend.enabled = true;
            mat.setUniform("uMainColor", el.mainColor);
            mat.setUniform("uMainTex", el.slotTexture.texture);
            let srcRgb, srcAlpha, dstRgb, dstAlpha;
            switch (el.slotBlendMode) {
                case BlendMode.Normal:
                    srcRgb = this.premultipliedAlpha ? BlendParamEnum.ONE : BlendParamEnum.SRC_ALPHA;
                    srcAlpha = BlendParamEnum.ONE;
                    dstRgb = dstAlpha = BlendParamEnum.ONE_MINUS_SRC_ALPHA;
                    break;
                case BlendMode.Additive:
                    srcRgb = this.premultipliedAlpha ? BlendParamEnum.ONE : BlendParamEnum.SRC_ALPHA;
                    srcAlpha = BlendParamEnum.ONE;
                    dstRgb = dstAlpha = BlendParamEnum.ONE;
                    break;
                case BlendMode.Multiply:
                    srcRgb = BlendParamEnum.DST_COLOR;
                    srcAlpha = BlendParamEnum.ONE_MINUS_SRC_ALPHA;
                    dstRgb = dstAlpha = BlendParamEnum.ONE_MINUS_SRC_ALPHA;
                    break;
                case BlendMode.Screen:
                    srcRgb = BlendParamEnum.ONE;
                    srcAlpha = BlendParamEnum.ONE_MINUS_SRC_ALPHA;
                    dstRgb = dstAlpha = BlendParamEnum.ONE_MINUS_SRC_ALPHA;
                    break;
            }
            mat.renderState.blend.blendSrc = srcRgb;
            mat.renderState.blend.blendSrcAlpha = srcAlpha;
            mat.renderState.blend.blendDst = dstRgb;
            mat.renderState.blend.blendDstAlpha = dstAlpha;

            let ins: IRenderable = {
                geometry: batchers[el.batcherIndex].geometry,
                material: mat,
                worldMat: this.toCanvasMat,
            }
            this._scene.addFrameRenderIns(ins);
        })
    }

    private updateGeometry = (() => {
        let tempPos = new Vector2();
        let tempUv = new Vector2();
        let tempLight = new Color();
        let tempDark = new Color();
        let tempColor = new Color();
        let tempColor2 = new Color();
        let vertices = new Float32Array(1024);
        let clipper = new SkeletonClipping();
        return (comp: SpineComp) => {
            let { skeleton, vertexEffect, mainColor } = comp;
            let triangles: Array<number> = null;
            let uvs = null;
            let drawOrder = skeleton.drawOrder;
            let skeletonColor = skeleton.color;
            for (let i = 0, n = drawOrder.length; i < n; i++) {
                let vertexSize = clipper.isClipping() ? 2 : 12;
                let slot = drawOrder[i];
                if (!slot.bone.active) continue
                let attachment = slot.getAttachment();
                let texture: SpineTexture = null;
                let attachmentColor: Color = null;
                let numFloats = 0;
                if (attachment instanceof RegionAttachment) {
                    let region = <RegionAttachment>attachment;
                    attachmentColor = region.color;
                    numFloats = vertexSize * 4;
                    region.computeWorldVertices(slot.bone, vertices, 0, vertexSize);
                    triangles = [0, 1, 2, 2, 3, 0];
                    uvs = region.uvs;
                    texture = <SpineTexture>(<TextureAtlasRegion>region.region.renderObject).page.texture;
                } else if (attachment instanceof MeshAttachment) {
                    let mesh = <MeshAttachment>attachment;
                    attachmentColor = mesh.color;
                    numFloats = (mesh.worldVerticesLength >> 1) * vertexSize;
                    if (numFloats > vertices.length) {
                        vertices = new Float32Array(numFloats);
                    }
                    mesh.computeWorldVertices(slot, 0, mesh.worldVerticesLength, vertices, 0, vertexSize);
                    triangles = mesh.triangles;
                    uvs = mesh.uvs;
                    texture = <SpineTexture>(<TextureAtlasRegion>mesh.region.renderObject).page.texture;
                } else if (attachment instanceof ClippingAttachment) {
                    let clip = <ClippingAttachment>(attachment);
                    clipper.clipStart(slot, clip);
                    continue;
                } else continue;

                if (texture != null) {
                    let slotColor = slot.color;
                    let finalColor = tempColor;
                    finalColor.r = skeletonColor.r * slotColor.r * attachmentColor.r;
                    finalColor.g = skeletonColor.g * slotColor.g * attachmentColor.g;
                    finalColor.b = skeletonColor.b * slotColor.b * attachmentColor.b;
                    finalColor.a = skeletonColor.a * slotColor.a * attachmentColor.a;
                    if (this.premultipliedAlpha) {
                        finalColor.r *= finalColor.a;
                        finalColor.g *= finalColor.a;
                        finalColor.b *= finalColor.a;
                    }
                    let darkColor = tempColor2;
                    if (!slot.darkColor)
                        darkColor.set(0, 0, 0, 1.0);
                    else {
                        if (this.premultipliedAlpha) {
                            darkColor.r = slot.darkColor.r * finalColor.a;
                            darkColor.g = slot.darkColor.g * finalColor.a;
                            darkColor.b = slot.darkColor.b * finalColor.a;
                        } else {
                            darkColor.setFromColor(slot.darkColor);
                        }
                        darkColor.a = this.premultipliedAlpha ? 1.0 : 0.0;
                    }


                    let finalVertices: NumberArrayLike;
                    let finalIndices: NumberArrayLike;

                    if (clipper.isClipping()) {
                        clipper.clipTriangles(vertices, numFloats, triangles, triangles.length, uvs, finalColor, darkColor, true);
                        let clippedVertices = clipper.clippedVertices;
                        let clippedTriangles = clipper.clippedTriangles;
                        if (vertexEffect != null) {
                            let verts = clippedVertices;
                            for (let v = 0, n = clippedVertices.length; v < n; v += vertexSize) {
                                tempPos.x = verts[v];
                                tempPos.y = verts[v + 1];
                                tempLight.set(verts[v + 2], verts[v + 3], verts[v + 4], verts[v + 5]);
                                tempUv.x = verts[v + 6];
                                tempUv.y = verts[v + 7];
                                tempDark.set(verts[v + 8], verts[v + 9], verts[v + 10], verts[v + 11]);
                                vertexEffect.transform(tempPos, tempUv, tempLight, tempDark);
                                verts[v] = tempPos.x;
                                verts[v + 1] = tempPos.y;
                                verts[v + 2] = tempUv.x;
                                verts[v + 3] = tempUv.y;
                                verts[v + 4] = tempLight.r;
                                verts[v + 5] = tempLight.g;
                                verts[v + 6] = tempLight.b;
                                verts[v + 7] = tempLight.a;
                                verts[v + 8] = tempDark.r;
                                verts[v + 9] = tempDark.g;
                                verts[v + 10] = tempDark.b;
                                verts[v + 11] = tempDark.a;
                            }
                        }
                        finalVertices = clippedVertices;
                        finalIndices = clippedTriangles;
                    } else {
                        let verts = vertices;
                        if (vertexEffect != null) {
                            for (let v = 0, u = 0, n = numFloats; v < n; v += vertexSize, u += 2) {
                                tempPos.x = verts[v];
                                tempPos.y = verts[v + 1];
                                tempUv.x = uvs[u];
                                tempUv.y = uvs[u + 1]
                                tempLight.setFromColor(finalColor);
                                tempDark.setFromColor(darkColor);
                                vertexEffect.transform(tempPos, tempUv, tempLight, tempDark);
                                verts[v] = tempPos.x;
                                verts[v + 1] = tempPos.y;
                                verts[v + 2] = tempUv.x;
                                verts[v + 3] = tempUv.y;
                                verts[v + 4] = tempLight.r;
                                verts[v + 5] = tempLight.g;
                                verts[v + 6] = tempLight.b;
                                verts[v + 7] = tempLight.a;
                                verts[v + 8] = tempDark.r;
                                verts[v + 9] = tempDark.g;
                                verts[v + 10] = tempDark.b;
                                verts[v + 11] = tempDark.a;
                            }
                        } else {
                            for (let v = 2, u = 0, n = numFloats; v < n; v += vertexSize, u += 2) {
                                verts[v + 0] = uvs[u];
                                verts[v + 1] = uvs[u + 1];
                                verts[v + 2] = finalColor.r;
                                verts[v + 3] = finalColor.g;
                                verts[v + 4] = finalColor.b;
                                verts[v + 5] = finalColor.a;
                                verts[v + 6] = darkColor.r;
                                verts[v + 7] = darkColor.g;
                                verts[v + 8] = darkColor.b;
                                verts[v + 9] = darkColor.a;
                            }
                        }
                        finalVertices = vertices.subarray(0, numFloats);
                        finalIndices = triangles;
                    }

                    if (finalVertices.length == 0 || finalIndices.length == 0)
                        continue;
                    this._batcher.mergeData(finalVertices, finalIndices, slot.data.blendMode, texture, mainColor);
                }

                clipper.clipEndWithSlot(slot);
            }
            clipper.clipEnd();
        }
    })()
}