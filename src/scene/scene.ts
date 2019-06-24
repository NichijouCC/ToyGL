import { Entity } from "../ec/entity";
import { Transform } from "../ec/components/transform";
import { FrameState, IframeState } from "./frameState";
import { RenderMachine } from "../render/renderMachine";

export class Scene {
    private root: Transform = new Transform();
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

    foreachRootNodes(func: (rootItem: Transform) => void) {
        for (let i = 0; i < this.root.children.length; i++) {
            func(this.root.children[i]);
        }
    }

    update(deltatime: number) {
        this.frameState.reInit();
        this.frameState.deltaTime = deltatime;
        this.foreachRootNodes(node => {
            this._updateNode(node, this.frameState);
        });
        this.render.frameRender(this.frameState);
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
}