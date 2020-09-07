import { ForwardRender } from "./render/forwardRender";
import { Camera } from "./camera";
import { Entity } from "../core/entity";
import { EventTarget } from "../core/eventTarget";
import { Ecs } from "../core/ecs";
import { Irenderable } from "./render/irenderable";

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

    private render: ForwardRender;
    constructor(render: ForwardRender) {
        this.render = render;
    }

    private root: Entity = new Entity();
    addNewChild(): Entity {
        const trans = new Entity();
        this.root.addChild(trans);
        return trans;
    }

    addChild(item: Entity) {
        this.root.addChild(item);
    }

    preupdate = new EventTarget<number>();
    tick = (deltaTime: number) => {
        this.preupdate.raiseEvent(deltaTime);
        Ecs.update(deltaTime);

        this.tickRender();
    }

    private _renderCollection: Irenderable[] = [];
    addRenderItem(item: Irenderable) {
        this._renderCollection.push(item);

        return item;
    }

    private _frameTemptRenders: Irenderable[] = [];
    _addRender(render: Irenderable) {
        this._frameTemptRenders.push(render);
    }

    prerender = new EventTarget();
    private tickRender = () => {
        this.prerender.raiseEvent();

        const { cameras, _frameTemptRenders, _renderCollection } = this;
        const allRenders = _frameTemptRenders.concat(_renderCollection);
        this._frameTemptRenders = [];

        this.render.render(Array.from(cameras.values()), allRenders);
    }
}
