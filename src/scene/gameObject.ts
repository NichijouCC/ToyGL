import { IRenderable } from "../render";
import { Component, Entity, System } from "./entity";
import { World } from "./world";

export class GameObject {
    constructor(world: World) {
        let en = new Entity(world);
        en.addComponent(ObjectNode)
    }
}

export class ObjectNode extends Component {
    update(deltaTime: number): void { }
    render(): IRenderable[] | IRenderable { return [] }
    clone(): ObjectNode {
        throw new Error("Method not implemented.");
    }
}

export class ObjectSystem extends System {
    caries = { comps: [ObjectNode] }

}