import { Camera } from "./Camera";
import { MeshInstance } from "./MeshInstance";
import { GraphicsDevice } from "../webgl/GraphicsDevice";
import { Transform } from "./Transform";
import { StaticMesh } from "./mesh/StaticMesh";
import { Material } from "./Material";
import { RenderLayerEnum } from "./RenderLayer";
import { LayerCollection } from "./LayerCollection";
import { SortTypeEnum } from "./Render";

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


