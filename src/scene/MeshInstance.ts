import { Geometry } from "./geometry/Geometry";
import { Material } from "./Material";
import { Transform } from "./Transform";
import { VertexArray } from "../webgl/VertextArray";
import { PrimitiveTypeEnum } from "../core/PrimitiveTypeEnum";

export class MeshInstance
{
    mesh: Mesh;
    node: Transform;
    material: Material;
}

export class Mesh implements IDrawData
{
    vertexArray: VertexArray;
    mode: PrimitiveTypeEnum;
    count: number;
    offset: number;

    // static fromGeometry(options: {
    //     context: GraphicsDevice,
    //     geometry: Geometry,
    //     bufferUsage?: BufferUsageEnum,
    //     interleave?: boolean
    //     count?: number;
    //     offset?: number;
    // })
    // {
    //     let newMesh = new Mesh();
    //     let vertexArray = VertexArray.fromGeometry({
    //         context: options.context,
    //         geometry: options.geometry,
    //         bufferUsage: options.bufferUsage,
    //         interleave: options.interleave,
    //     });
    //     newMesh.count = options.count ?? vertexArray.indexbuffer.numberOfIndices;
    //     newMesh.offset = options.offset ?? 0;
    //     newMesh.mode = options.mode ?? PrimitiveTypeEnum.TRIANGLES;
    //     newMesh.vertexArray = vertexArray;
    //     return newMesh;
    // }
}

export interface IDrawData
{
    mode: PrimitiveTypeEnum;
    count: number;
    offset: number;
}