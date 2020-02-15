import { CullingMask } from "./Camera";
import { Material } from "./Material";
import { VertexArray } from "../webgl/VertextArray";
import { RenderCommand } from "../webgl/RenderCommand";
import { BoundingSphere, BoundingBox } from "./Bounds";
import { Mat4 } from "../mathD/mat4";
import { Transform } from "./Transform";

export class DrawCommand extends RenderCommand
{
    cullingMask?: CullingMask;
    material: Material;
    private _vertexArray: VertexArray;
    set vertexArray(vertexArray: VertexArray)
    {
        this._vertexArray = vertexArray;
        if (vertexArray?.indexBuffer != null)
        {
            this.indexBufferData = {
                bytesPerIndex: vertexArray?.indexBuffer?.bytesPerIndex,
                indexDatatype: vertexArray?.indexBuffer?.indexDatatype,
                count: vertexArray?.indexBuffer?.numberOfIndices,
            }
            this.count = vertexArray?.indexBuffer?.numberOfIndices;
        }
    }
    get vertexArray()
    {
        return this._vertexArray;
    };
    enableCull: boolean = true;
    // boundingSphere: BoundingSphere;
    aabb: BoundingBox;
    worldMat: Mat4;
    zdist: number;

    static sortByZdist_FrontToBack(drawa: DrawCommand, drawb: DrawCommand)
    {
        return drawa.zdist - drawb.zdist;
    }
    static sortByZdist_BackToFront(drawa: DrawCommand, drawb: DrawCommand)
    {
        return drawb.zdist - drawa.zdist;
    }

    static sortByMatLayer(drawa: DrawCommand, drawb: DrawCommand)
    {
        return drawa.material.layer + drawa.material.queue - (drawb.material.layer + drawb.material.queue);
    }


    static from(vertexArray: VertexArray, material: Material, node: Transform)
    {
        let newcommnad = new DrawCommand();
        newcommnad.material = material;
        newcommnad.vertexArray = vertexArray;
        newcommnad.worldMat = node.worldMatrix;
    }
}