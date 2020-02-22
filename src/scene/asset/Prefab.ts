import { Asset } from "./Asset";
import { Entity } from "../../core/Entity";

export class Prefab extends Asset
{
    private _root: Entity;
    set root(root: Entity) { this._root = root };
    static instance(prefab: Prefab): Entity
    {
        return prefab._root.clone();
    }
}