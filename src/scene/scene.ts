import { EventTarget } from "@mtgoo/ctool";
import { ForwardRender } from "./render/forwardRender";
import { Camera } from "./camera";
import { Entity } from "../core/ecs/entity";
import { Ecs } from "../core/ecs/ecs";
import { IRenderable } from "./render/irenderable";
import { FrameState } from "./frameState";

export class InterScene {
    private _cameras: Map<string, Camera> = new Map();
    private _mainCam: Camera
    get mainCamera() { return this._mainCam; }
    set mainCamera(cam: Camera) { this._mainCam = cam; }
    addNewCamera() {
        const cam = new Camera();
        cam.node = this.addNewChild();
        this.addCamera(cam);
        return cam;
    }

    addCamera(cam: Camera) {
        if (this._cameras.size == 0) {
            this._mainCam = cam;
        }
        if (!this._cameras.has(cam.id)) {
            this._cameras.set(cam.id, cam);
        }
    }

    get cameras() { return this._cameras; }
    private root: Entity;
    private render: ForwardRender;
    constructor(render: ForwardRender) {
        this.render = render;
        this.root = Entity.create({ beActive: true, _parentsBeActive: true } as any);
        Entity.onDirty.addEventListener((node) => {
            this.frameState.dirtyNode.add(node as Entity);
        });
    }

    addNewChild(): Entity {
        const trans = Entity.create();
        this.root.addChild(trans);
        return trans;
    }

    addChild(item: Entity) {
        this.root.addChild(item);
        return item;
    }

    preUpdate = new EventTarget<number>();
    frameState: FrameState = new FrameState();
    _tick = (deltaTime: number) => {
        this.preUpdate.raiseEvent(deltaTime);
        Ecs.update(deltaTime);
        this.tickRender(this.frameState);
        this.frameState = new FrameState();
    }

    private _renders: IRenderable[] = [];
    addRenderIns(render: IRenderable) {
        this._renders.push(render);
        return render;
    }

    _addFrameRenderIns(render: IRenderable) {
        this.frameState.renders.push(render);
        return render;
    }
    _addFrameMesh() {

    }

    prerender = new EventTarget();
    private tickRender = (state: FrameState) => {
        this.prerender.raiseEvent();
        state.renders = state.renders.concat(this._renders);
        const { cameras } = this;
        this.render.render(Array.from(cameras.values()), state);
    }
}
