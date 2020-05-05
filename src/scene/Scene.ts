import { LayerComposition } from "./LayerComposition";
import { MeshInstance } from "./primitive/MeshInstance";
import { ForwardRender } from "./render/ForwardRender";
import { Camera } from "./Camera";
import { Entity } from "../core/Entity";
import { EventHandler } from "../core/Event";
import { UniformState } from "./UniformState";

export class InterScene {

    private _cameras: Map<string, Camera> = new Map();
    tryAddCamera(cam: Camera) {
        if (!this._cameras.has(cam.id)) {
            this._cameras.set(cam.id, cam)
        }
    }
    get cameras() { return this._cameras }

    private render: ForwardRender;
    constructor(render: ForwardRender) {
        this.render = render;
    }
    private root: Entity = new Entity();
    createChild(): Entity {
        let trans = new Entity();
        this.root.addChild(trans);
        return trans;
    }

    addChild(item: Entity) {
        this.root.addChild(item);
    }

    createCamera() {
        let cam = new Camera();
        cam.node = this.createChild();
        this.tryAddCamera(cam);
        return cam;
    }
}