import { Mat4 } from "../../mathD/mat4";
import { MeshInstance } from "../MeshInstance";
import { Transform } from "../../core/Transform";
import { Entity } from "../../core/Entity";
import { Asset } from "./Asset";

export class Model extends Asset
{
    root: Entity;
}

