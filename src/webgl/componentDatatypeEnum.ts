import { getByteSizeFromGLtype } from "../core/typedArray";

export enum ComponentDatatypeEnum
{
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
    /**
     * Float64Array
     */
    DOUBLE = 0x140a
}

export namespace ComponentDatatypeEnum
{
    export function byteSize(type: ComponentDatatypeEnum) {
        return getByteSizeFromGLtype(type);
    }
}
