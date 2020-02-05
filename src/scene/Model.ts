import { Mat4 } from "../mathD/mat4";
import { MeshInstance } from "./MeshInstance";
import { Transform } from "./Transform";

export class Model
{
    private meshInstances: MeshInstance[];
    private rootNode: Transform;
}

