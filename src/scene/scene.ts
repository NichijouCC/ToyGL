import { Camera } from "./Camera";
import { GraphicsDevice } from "../webgl/GraphicsDevice";
import { Transform } from "./Transform";

export class Scene
{
    private root: Transform = new Transform();
    createChild()
    {
        let node = new Transform();
        return node;
    }

    render(context: GraphicsDevice, camera: Camera)
    {

    }
}


