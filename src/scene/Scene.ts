import { ForwardRender } from "./render/ForwardRender";
import { Camera } from "./Camera";
import { Entity } from "../core/Entity";
import { ToyScreen } from "../core/ToyScreen";

export class InterScene {
    private _cameras: Map<string, Camera> = new Map();
    tryAddCamera(cam: Camera) {
        if (!this._cameras.has(cam.id)) {
            this._cameras.set(cam.id, cam);
        }
    }

    get cameras() { return this._cameras; }

    private render: ForwardRender;
    private screen: ToyScreen;
    constructor(render: ForwardRender, screen: ToyScreen) {
        this.render = render;
        this.screen = screen;
        screen.onresize.addEventListener((ev) => {
            this._cameras.forEach(item => {
                item.aspect = ev.width / ev.height;
            });
        });
    }

    private root: Entity = new Entity();
    createChild(): Entity {
        const trans = new Entity();
        this.root.addChild(trans);
        return trans;
    }

    addChild(item: Entity) {
        this.root.addChild(item);
    }

    createCamera() {
        const cam = new Camera();
        cam.node = this.createChild();
        this.tryAddCamera(cam);
        return cam;
    }
}
