import { getGLTypeForTypedArray } from "../render/helper";
import { GraphicsDevice } from "./GraphicsDevice";
import { BufferUsageEnum, Buffer, BufferTargetEnum } from "./Buffer";
import { GlConstants } from "./GLconstant";
import { TypedArray, getByteSizeFromGLtype } from "../core/TypedArray";
export type IndicesArray = Uint8Array | Uint16Array | Uint32Array;
export type IndexBufferOption = {
    context: GraphicsDevice;
    usage?: BufferUsageEnum;
    sizeInBytes: number;
    indexDatatype: IndexDatatypeEnum;
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
        super({ ...options, target: BufferTargetEnum.ELEMENT_ARRAY_BUFFER });
        this.indexDatatype = (options as any).indexDatatype;
        let typedArray = (options as any).typedArray;
        if (typedArray)
        {
            this.indexDatatype = TypedArray.glType(typedArray);
        }
        this.bytesPerIndex = getByteSizeFromGLtype(this.indexDatatype);
        this.numberOfIndices = this._sizeInBytes / this.bytesPerIndex;
    }
}

export enum IndexDatatypeEnum
{
    Uint16Array = GlConstants.UNSIGNED_SHORT,
    Uint32Array = GlConstants.UNSIGNED_INT,
}