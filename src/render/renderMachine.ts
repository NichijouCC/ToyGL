import { GlRender } from "./glRender";
import { IframeState, Irenderable } from "../scene/frameState";
import { RenderList } from "./renderList";
import { ClearEnum } from "../ec/components/camera";
import { RenderContext } from "./renderContext";
import { AutoUniform } from "./autoUniform";

export class RenderMachine {
    private rendercontext: RenderContext;
    constructor(cancvas: HTMLCanvasElement) {
        this.rendercontext = new RenderContext();
        GlRender.autoUniform = new AutoUniform(this.rendercontext);
        GlRender.init(cancvas);
    }
    private camRenderList: { [cameraId: number]: RenderList } = {};
    frameRender(frameState: IframeState) {
        let camerlist = frameState.cameraList;
        let renderList = frameState.renderList;
        camerlist.sort((a, b) => {
            return a.priority - b.priority;
        });

        for (let i = 0; i < camerlist.length; i++) {
            let cam = camerlist[i];

            if (this.camRenderList[cam.entity.guid] == null) {
                this.camRenderList[cam.entity.guid] = new RenderList(cam);
            }
            let camrenderList = this.camRenderList[cam.entity.guid];

            // let newList = this.filterRenderByCamera(renderList, cam);
            for (let i = 0; i < renderList.length; i++) {
                if (renderList[i].maskLayer & cam.cullingMask) {
                    camrenderList.addRenderer(renderList[i]);
                }
            }

            //----------- set global State
            GlRender.setViewPort(cam.viewport);
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
                GlRender.drawObject(item.geometry.data, item.material.program, item.material.uniforms);
            });
            //-----------canera render end
        }
    }
}
