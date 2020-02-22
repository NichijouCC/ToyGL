import { getGLTypeForTypedArray } from "../render/helper";
import { glTypeToByteSize } from "../resources/assets/geometry";
import { GraphicsDevice } from "./GraphicsDevice";
import { BufferUsageEnum, Buffer, BufferTargetEnum } from "./Buffer";
export type IndicesArray = Uint16Array | Uint32Array;
export type IndexBufferOption = {
    context: GraphicsDevice;
    usage?: BufferUsageEnum;
    sizeInBytes: number;
    indexDatatype: number;
} | {
    context: GraphicsDevice;
    usage?: BufferUsageEnum;
    typedArray: IndicesArray;
};
export class IndexBuffer extends Buffer
{
    readonly indexDatatype: number;
    readonly bytesPerIndex: number;
    readonly numberOfIndices: number;
    constructor(options: IndexBufferOption)
    {
        super({ ...options, bufferTarget: BufferTargetEnum.ELEMENT_ARRAY_BUFFER } as any);
        this.indexDatatype = (options as any).indexDatatype;
        let typedArray = (options as any).typedArray;
        if (typedArray)
        {
            this.indexDatatype = getGLTypeForTypedArray(typedArray);
        }
        this.bytesPerIndex = glTypeToByteSize(this.indexDatatype);
        this.numberOfIndices = this.sizeInBytes / this.bytesPerIndex;
    }
}
