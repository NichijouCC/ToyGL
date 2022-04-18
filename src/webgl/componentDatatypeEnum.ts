
export enum ComponentDatatypeEnum {
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

export namespace ComponentDatatypeEnum {
    const dic: { [type: number]: number } = {
        [ComponentDatatypeEnum.BYTE]: Int8Array.BYTES_PER_ELEMENT,
        [ComponentDatatypeEnum.UNSIGNED_BYTE]: Uint8Array.BYTES_PER_ELEMENT,
        [ComponentDatatypeEnum.SHORT]: Int16Array.BYTES_PER_ELEMENT,
        [ComponentDatatypeEnum.UNSIGNED_SHORT]: Uint16Array.BYTES_PER_ELEMENT,
        [ComponentDatatypeEnum.INT]: Int32Array.BYTES_PER_ELEMENT,
        [ComponentDatatypeEnum.UNSIGNED_INT]: Uint32Array.BYTES_PER_ELEMENT,
        [ComponentDatatypeEnum.FLOAT]: Float32Array.BYTES_PER_ELEMENT,
        [ComponentDatatypeEnum.UNSIGNED_SHORT_4_4_4_4]: Uint16Array.BYTES_PER_ELEMENT,
        [ComponentDatatypeEnum.UNSIGNED_SHORT_5_5_5_1]: Uint16Array.BYTES_PER_ELEMENT,
        [ComponentDatatypeEnum.UNSIGNED_SHORT_5_6_5]: Uint16Array.BYTES_PER_ELEMENT,
        [ComponentDatatypeEnum.HALF_FLOAT]: Uint16Array.BYTES_PER_ELEMENT,
        [ComponentDatatypeEnum.UNSIGNED_INT_2_10_10_10_REV]: Uint32Array.BYTES_PER_ELEMENT,
        [ComponentDatatypeEnum.UNSIGNED_INT_10F_11F_11F_REV]: Uint32Array.BYTES_PER_ELEMENT,
        [ComponentDatatypeEnum.UNSIGNED_INT_5_9_9_9_REV]: Uint32Array.BYTES_PER_ELEMENT,
        [ComponentDatatypeEnum.FLOAT_32_UNSIGNED_INT_24_8_REV]: Uint32Array.BYTES_PER_ELEMENT,
        [ComponentDatatypeEnum.UNSIGNED_INT_24_8]: Uint32Array.BYTES_PER_ELEMENT,
        [ComponentDatatypeEnum.DOUBLE]: Float64Array.BYTES_PER_ELEMENT,
    }
    export function toBytesPerElement(type: ComponentDatatypeEnum) {
        if (dic[type] == null) {
            throw new Error(`无法获取从ComponentDatatype【${type}】获取BYTES_PER_ELEMENT`);
        }
        return dic[type]
    }
}
