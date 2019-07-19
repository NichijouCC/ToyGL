import { GlRender } from "./glRender";
import { Irenderable } from "../scene/frameState";
import { RenderList } from "./renderList";
import { ClearEnum, Camera } from "../ec/components/camera";
import { RenderContext } from "./renderContext";
import { AutoUniform } from "./autoUniform";
import { Material } from "../resources/assets/material";
import { DefGeometry } from "../resources/defAssets/defGeometry";
import { Rect } from "../mathD/rect";

export class RenderMachine {
    private rendercontext: RenderContext;
    constructor(cancvas: HTMLCanvasElement) {
        this.rendercontext = new RenderContext();
        GlRender.autoUniform = new AutoUniform(this.rendercontext);
        GlRender.init(cancvas, { extentions: ["WEBGL_depth_texture"] });
    }
    private camRenderList: { [cameraId: number]: RenderList } = {};

    drawCamera(cam: Camera, renderList: Irenderable[]) {
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
            this.rendercontext.curRender = item;
            let shader = item.material.shader;
            if (shader != null) {
                let passes = shader.passes && shader.passes["base"];
                if (passes != null) {
                    for (let i = 0; i < passes.length; i++) {
                        GlRender.drawObject(item.geometry, passes[i], item.material.uniforms, shader.mapUniformDef);
                    }
                }
            }
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
