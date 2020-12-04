import { EventTarget } from "@mtgoo/ctool";
import { ForwardRender } from "./render/forwardRender";
import { Camera } from "./camera";
import { Entity } from "../core/entity";
import { Ecs } from "../core/ecs";
import { Irenderable } from "./render/irenderable";
import { FrameState } from "./frameState";

export class InterScene {
    private _cameras: Map<string, Camera> = new Map();
    private _maincam: Camera
    get mainCamera() { return this._maincam; }
    set mainCamera(cam: Camera) { this._maincam = cam; }
    addNewCamera() {
        const cam = new Camera();
        cam.node = this.addNewChild();
        this.addCamera(cam);
        return cam;
    }

    addCamera(cam: Camera) {
        if (this._cameras.size == 0) {
            this._maincam = cam;
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
        this.root = new Entity();
        Entity.onDirty.addEventListener((node) => {
            this.frameState.dirtyNode.add(node as Entity);
        });
    }

    addNewChild(): Entity {
        const trans = new Entity();
        this.root.addChild(trans);
        return trans;
    }

    addChild(item: Entity) {
        this.root.addChild(item);
    }

    preupdate = new EventTarget<number>();
    frameState: FrameState = new FrameState();
    _tick = (deltaTime: number) => {
        this.preupdate.raiseEvent(deltaTime);
        Ecs.update(deltaTime);
        this.tickRender(this.frameState);
        this.frameState = new FrameState();
    }

    private _renders: Irenderable[] = [];
    addRenderIns(render: Irenderable) {
        this._renders.push(render);
        return render;
    }

    _addFrameRenderIns(render: Irenderable) {
        this.frameState.renders.push(render);
        return render;
    }

    prerender = new EventTarget();
    private tickRender = (state: FrameState) => {
        this.prerender.raiseEvent();
        state.renders = state.renders.concat(this._renders);
        const { cameras } = this;
        this.render.render(Array.from(cameras.values()), state);
    }
}
