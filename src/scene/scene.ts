import { Camera } from "./Camera";
import { MeshInstance, Mesh } from "./MeshInstance";
import { GraphicsDevice } from "../webgl/GraphicsDevice";
import { Transform } from "./Transform";

export class Scene
{
    private root: Transform = new Transform();

    private mesh: Mesh[] = [];

    createChild()
    {
        let node = new Transform();
        return node;
    }

    createCamera()
    {
        let cam = new Camera();
        let node = this.createChild();
        cam.node = node;
        return cam;
    }

    render(context: GraphicsDevice, camera: Camera)
    {

    }
}