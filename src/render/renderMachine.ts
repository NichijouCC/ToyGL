import { GlRender, ItextureInfo } from "./glRender";
import { Irenderable, FrameState, IframeState } from "../scene/frameState";
import { RenderList } from "./renderList";
import { ClearEnum, Camera } from "../ec/components/camera";
import { RenderContext } from "./renderContext";
import { AutoUniform } from "./autoUniform";
import { Material } from "../resources/assets/material";
import { DefGeometry } from "../resources/defAssets/defGeometry";
import { Rect } from "../mathD/rect";
import { Light } from "../ec/components/light";
import { RenderTexture } from "../resources/assets/renderTexture";
import { GlConstants } from "./GlConstant";
import { Geometry } from "../resources/assets/geometry";
import { Mat4 } from "../mathD/mat4";
import { DefMaterial } from "../resources/defAssets/defMaterial";

export class RenderMachine {
    private rendercontext: RenderContext;
    constructor(cancvas: HTMLCanvasElement) {
        this.rendercontext = new RenderContext();
        GlRender.autoUniform = new AutoUniform(this.rendercontext);
        GlRender.init(cancvas, { extentions: ["WEBGL_depth_texture"] });
    }
    private camRenderList: { [cameraId: number]: RenderList } = {};
    private lightShadowTex: { [lightId: number]: RenderTexture } = {};

    drawCamera(cam: Camera, renderList: Irenderable[], lightList?: Light[]) {
        GlRender.setFrameBuffer(cam.targetTexture);

        if (this.camRenderList[cam.entity.guid] == null) {
            this.camRenderList[cam.entity.guid] = new RenderList(cam);
        }
        let camrenderList = this.camRenderList[cam.entity.guid];
        camrenderList.clear();

        if (cam.targetTexture && cam.targetTexture.overrideMaterial) {
            let newMat = cam.targetTexture.overrideMaterial;
            for (let i = 0; i < renderList.length; i++) {
                if (renderList[i].maskLayer & cam.cullingMask) {
                    camrenderList.addRenderer({ ...renderList[i], material: newMat });
                }
            }
        } else {
            for (let i = 0; i < renderList.length; i++) {
                if (renderList[i].maskLayer & cam.cullingMask) {
                    camrenderList.addRenderer(renderList[i]);
                }
            }
        }

        //----------- set global State
        if (cam.targetTexture == null) {
            GlRender.setViewPort(cam.viewport);
        }
        GlRender.setClear(
            cam.clearFlag & ClearEnum.DEPTH ? true : false,
            cam.clearFlag & ClearEnum.COLOR ? cam.backgroundColor : null,
            cam.clearFlag & ClearEnum.STENCIL ? true : false,
        );

        //-----------camera render before
        this.rendercontext.curCamera = cam;
        //-----------camera render ing
        camrenderList.sort().foreach((item: Irenderable) => {
            this.drawMesh(item.geometry, item.material, item.modelMatrix);
        });
        //-----------canera render end
    }

    renderQuad(mat: Material, pass: number = 0) {
        GlRender.setFrameBuffer(null);
        GlRender.setViewPort(Rect.Identity);
        let shader = mat.shader;
        if (shader != null) {
            let passes = shader.passes && shader.passes["base"];
            if (passes != null) {
                GlRender.drawObject(DefGeometry.fromType("quad"), passes[pass], mat.uniforms, shader.mapUniformDef);
            }
        }
    }

    renderShadowDepthTex(light: Light, renderlist: Irenderable[]): ItextureInfo {
        let list = renderlist.filter(item => {
            return (item.maskLayer & light.cullingMask) !== 0;
        });
        if (this.lightShadowTex[light.entity.guid] == null) {
            this.lightShadowTex[light.entity.guid] = new RenderTexture({
                activeDepthAttachment: true,
                depthFormat: GlConstants.DEPTH_COMPONENT,
            });
        }
        GlRender.setFrameBuffer(this.lightShadowTex[light.entity.guid]);
        GlRender.setViewPort(Rect.Identity);
        GlRender.setClear(true, null, false);
        for (let i = 0; i < list.length; i++) {
            this.drawMesh(list[i].geometry, DefMaterial.fromType("3dBase"), list[i].modelMatrix);
        }

        return this.lightShadowTex[light.entity.guid].depthTexture;
    }

    drawMesh(geometry: Geometry, material: Material, modelMatrix: Mat4) {
        this.rendercontext.matrixModel = modelMatrix;
        let shader = material.shader;
        if (shader != null) {
            let passes = shader.passes && shader.passes["base"];
            if (passes != null) {
                for (let i = 0; i < passes.length; i++) {
                    GlRender.drawObject(geometry, passes[i], material.uniforms, shader.mapUniformDef);
                }
            }
        }
    }
}

export enum DrawTypeEnum {
    BASE = 0,
    SKIN = 1,
    LIGHTMAP = 2,
    FOG = 4,
    INSTANCe = 8,

    NOFOG = 3,
    NOLIGHTMAP = 5,
}
