import { Camera } from "./../ec/components/camera";
import { Entity } from "../ec/entity";
import { Transform } from "../ec/transform";
import { FrameState, IframeState, Irenderable } from "./frameState";
import { RenderMachine } from "../render/renderMachine";
import { CullingMask } from "../ec/ec";
import { Frustum } from "./frustum";
import { Debug } from "../debug/debug";

export class Scene {
    private root: Transform = new Entity().transform;
    private frameState: FrameState = new FrameState();
    private render: RenderMachine;
    constructor(render: RenderMachine) {
        this.render = render;
    }
    newEntity(name: string = null, compsArr: string[] = null): Entity {
        let newobj = new Entity(name, compsArr);
        this.addEntity(newobj);
        return newobj;
    }

    addEntity(entity: Entity) {
        this.root.addChild(entity.transform);
    }

    addCamera(): Camera {
        let entity = this.newEntity("camer", ["Camera"]);
        return entity.getCompByName("Camera") as Camera;
    }

    foreachRootNodes(func: (rootItem: Transform) => void) {
        for (let i = 0; i < this.root.children.length; i++) {
            func(this.root.children[i]);
        }
    }

    preUpdate: (deltatime: number) => void;

    update(deltatime: number) {
        if (this.preUpdate) {
            this.preUpdate(deltatime);
        }
        this.frameState.reInit();
        this.frameState.deltaTime = deltatime;
        this.foreachRootNodes(node => {
            this._updateNode(node, this.frameState);
        });

        this.frameState.cameraList.sort((a, b) => {
            return a.priority - b.priority;
        });

        for (let i = 0; i < this.frameState.cameraList.length; i++) {
            let cam = this.frameState.cameraList[i];

            Debug.drawCameraWireframe(cam, this.frameState);
            // this.frameState.renderList = [Debug.showCameraWireframe(cam)];
            let arr = this.frameState.renderList.filter(item => {
                return this.maskCheck(cam.cullingMask, item) && this.frusumCheck(cam.frustum, item);
            });
            if (cam.preRender) {
                cam.preRender(this.render, arr);
            }
            this.render.drawCamera(cam, arr);
            if (cam.afterRender) {
                cam.afterRender(this.render, arr);
            }
        }
    }

    private _updateNode(node: Transform, frameState: IframeState) {
        let entity = node.entity;
        if (!entity.beActive) return;

        for (const key in node.entity.components) {
            node.entity.components[key].update(frameState);
        }
        for (let i = 0, len = node.children.length; i < len; i++) {
            this._updateNode(node.children[i], frameState);
        }
    }

    private frusumCheck(frustum: Frustum, item: Irenderable): boolean {
        return frustum.intersectRender(item);
    }

    private maskCheck(maskLayer: CullingMask, item: Irenderable): boolean {
        return (item.maskLayer & maskLayer) !== 0;
    }
}
