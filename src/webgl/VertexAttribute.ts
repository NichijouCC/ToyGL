import { VertexBuffer } from "./VertexBuffer";
import { GraphicsDevice } from "./GraphicsDevice";

export interface IvertexAttribute {
    index: number; // 0;
    enabled: boolean; // true;
    // vertexBuffer: VertexBuffer; // positionBuffer;
    // value:any;
    componentsPerAttribute: number; // 3;
    componentDatatype: number; // ComponentDatatype.FLOAT;
    normalize: boolean; // false;
    offsetInBytes: number; // 0;
    strideInBytes: number; // 0; // tightly packed
    instanceDivisor: number; // 0; // not instanced
}
export interface IvertexAttributeOption {
    index?: number; // 0;
    enabled?: boolean; // true;
    // vertexBuffer: VertexBuffer; // positionBuffer;
    // value:any;
    componentsPerAttribute: number; // 3;
    componentDatatype?: number; // ComponentDatatype.FLOAT;
    normalize?: boolean; // false;
    offsetInBytes?: number; // 0;
    strideInBytes?: number; // 0; // tightly packed
    instanceDivisor?: number; // 0; // not instanced
}
/**
 * 
 * @example useage
 * var attributes = new VertexAttribute(
 *     {
 *         index                  : 2,
 *         componentsPerAttribute : 3,
 *         componentDatatype      : ComponentDatatype.FLOAT,
 *         offsetInBytes          : 0,
 *         strideInBytes          : 24
 *     })
 */
export class VertexAttribute implements IvertexAttribute
{
    readonly index: number;
    readonly enabled: boolean;
    readonly componentsPerAttribute: number;
    readonly componentDatatype: number;
    readonly normalize: boolean;
    readonly offsetInBytes: number;
    readonly strideInBytes: number;
    readonly instanceDivisor: number;
    constructor(att: IvertexAttributeOption)
    {
        this.index = att.index;
        this.enabled = att.enabled ?? true; // true;
        this.componentsPerAttribute = att.componentsPerAttribute; // 3;
        this.componentDatatype = att.componentDatatype ?? ComponentDatatypeEnum.FLOAT; // FLOAT;
        this.normalize = att.normalize ?? false; // false;
        this.offsetInBytes = att.offsetInBytes ?? 0; // 0;
        this.strideInBytes = att.strideInBytes ?? 0; // 0; // tightly packed
        this.instanceDivisor = att.instanceDivisor ?? 0; // 0; // not instanced
    }
}

export enum ComponentDatatypeEnum{
    /**
     * Int8Array
     */
    BYTE = 0x1400,
    /**
     * Uint8Array
     */
    UNSIGNED_BYTE = 0x1401,
    /**
     * Int16Array
     */
    SHORT = 0x1402,
    /**
     * Uint16Array
     */
    UNSIGNED_SHORT = 0x1403,
    /**
     * Int32Array
     */
    INT = 0x1404,
    /**
     * Uint32Array
     */
    UNSIGNED_INT = 0x1405,
    /**
     * Float32Array
     */
    FLOAT = 0x1406,
    /**
     * Uint16Array
     */
    UNSIGNED_SHORT_4_4_4_4 = 0x8033,
    /**
     * Uint16Array
     */
    UNSIGNED_SHORT_5_5_5_1 = 0x8034,
    /**
     * Uint16Array
     */
    UNSIGNED_SHORT_5_6_5 = 0x8363,
    /**
     * Uint16Array
     */
    HALF_FLOAT = 0x140b,
    /**
     * Uint32Array
     */
    UNSIGNED_INT_2_10_10_10_REV = 0x8368,
    /**
     * Uint32Array
     */
    UNSIGNED_INT_10F_11F_11F_REV = 0x8c3b,
    /**
     * Uint32Array
     */
    UNSIGNED_INT_5_9_9_9_REV = 0x8c3e,
    /**
     * Uint32Array
     */
    FLOAT_32_UNSIGNED_INT_24_8_REV = 0x8dad,
    /**
     * Uint32Array
     */
    UNSIGNED_INT_24_8 = 0x84fa,
}
export enum VertexAttEnum {
    POSITION = "position",
    NORMAL = "normal",
    TANGENT = "tangent",
    TEXCOORD_0 = "uv",
    TEXCOORD_1 = "uv1",
    TEXCOORD_2 = "uv2",

    COLOR_0 = "color",
    WEIGHTS_0 = "skinWeight",
    JOINTS_0 = "skinIndex",
}



