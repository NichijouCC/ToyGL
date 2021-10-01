import { Asset } from "./asset";
import { Entity } from "../scene/entity";

export class Prefab extends Asset {
    private _root: Entity;
    set root(root: Entity) { this._root = root; };
    static instance(prefab: Prefab): Entity {
        // TODO 先暂时直接返回root
        // return prefab._root;
        return prefab._root.clone();
    }

    destroy(): void {
        throw new Error("Method not implemented.");
    }
}
