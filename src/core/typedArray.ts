/* eslint-disable no-throw-literal */
/* DataType */
const BYTE = 0x1400;
const UNSIGNED_BYTE = 0x1401;
const SHORT = 0x1402;
const UNSIGNED_SHORT = 0x1403;
const INT = 0x1404;
const UNSIGNED_INT = 0x1405;
const FLOAT = 0x1406;
const UNSIGNED_SHORT_4_4_4_4 = 0x8033;
const UNSIGNED_SHORT_5_5_5_1 = 0x8034;
const UNSIGNED_SHORT_5_6_5 = 0x8363;
const HALF_FLOAT = 0x140b;
const UNSIGNED_INT_2_10_10_10_REV = 0x8368;
const UNSIGNED_INT_10F_11F_11F_REV = 0x8c3b;
const UNSIGNED_INT_5_9_9_9_REV = 0x8c3e;
const FLOAT_32_UNSIGNED_INT_24_8_REV = 0x8dad;
const UNSIGNED_INT_24_8 = 0x84fa;

const glTypeToTypedArrayCtor: { [gltype: number]: any } = {};
{
    const tt = glTypeToTypedArrayCtor;
    tt[BYTE] = Int8Array;
    tt[UNSIGNED_BYTE] = Uint8Array;
    tt[SHORT] = Int16Array;
    tt[UNSIGNED_SHORT] = Uint16Array;
    tt[INT] = Int32Array;
    tt[UNSIGNED_INT] = Uint32Array;
    tt[FLOAT] = Float32Array;
    tt[UNSIGNED_SHORT_4_4_4_4] = Uint16Array;
    tt[UNSIGNED_SHORT_5_5_5_1] = Uint16Array;
    tt[UNSIGNED_SHORT_5_6_5] = Uint16Array;
    tt[HALF_FLOAT] = Uint16Array;
    tt[UNSIGNED_INT_2_10_10_10_REV] = Uint32Array;
    tt[UNSIGNED_INT_10F_11F_11F_REV] = Uint32Array;
    tt[UNSIGNED_INT_5_9_9_9_REV] = Uint32Array;
    tt[FLOAT_32_UNSIGNED_INT_24_8_REV] = Uint32Array;
    tt[UNSIGNED_INT_24_8] = Uint32Array;
}

/**
 * Get the GL type for a typedArray
 */
export function getGLTypeFromTypedArray(typedArray: ArrayBufferView): number {
    if (typedArray instanceof Int8Array) {
        return BYTE;
    }
    if (typedArray instanceof Uint8Array) {
        return UNSIGNED_BYTE;
    }
    if (typedArray instanceof Uint8ClampedArray) {
        return UNSIGNED_BYTE;
    }
    if (typedArray instanceof Int16Array) {
        return SHORT;
    }
    if (typedArray instanceof Uint16Array) {
        return UNSIGNED_SHORT;
    }
    if (typedArray instanceof Int32Array) {
        return INT;
    }
    if (typedArray instanceof Uint32Array) {
        return UNSIGNED_INT;
    }
    if (typedArray instanceof Float32Array) {
        return FLOAT;
    }
    throw "unsupported typed array to gl type";
}

export type TypedArray = Int8Array | Uint8Array | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array;

export namespace TypedArray {
    export function fromGlType(glType: number, data: number | Array<number> | TypedArray, byteOffset: number = 0): TypedArray {
        const TypeArrayCtr = GlType.toTypeArrCtor(glType);
        if (typeof data == "number") {
            return new TypeArrayCtr(data as number);
        } else if (data instanceof Array) {
            return new TypeArrayCtr(data);
        } else {
            const typedArray = data as TypedArray;
            return new TypeArrayCtr(typedArray.buffer, typedArray.byteOffset + byteOffset, typedArray.byteLength / TypeArrayCtr.BYTES_PER_ELEMENT);
        }
    }

    export function getGLType(data: TypedArray) {
        return GlType.fromTypedArray(data);
    }
}

export namespace GlType {
    export function bytesPerElement(glType: number) {
        if (glTypeToTypedArrayCtor[glType]) {
            return glTypeToTypedArrayCtor[glType].BYTES_PER_ELEMENT;
        }
        throw "unsupported gltype to bytesPerElement";
    }

    export function toTypeArrCtor(glType: number) {
        if (glTypeToTypedArrayCtor[glType] != null) {
            return glTypeToTypedArrayCtor[glType];
        }
        throw "unsupported gltype to array type";
    }

    export function fromTypedArray(typedArray: ArrayBufferView): number {
        if (typedArray instanceof Int8Array) {
            return BYTE;
        }
        if (typedArray instanceof Uint8Array) {
            return UNSIGNED_BYTE;
        }
        if (typedArray instanceof Uint8ClampedArray) {
            return UNSIGNED_BYTE;
        }
        if (typedArray instanceof Int16Array) {
            return SHORT;
        }
        if (typedArray instanceof Uint16Array) {
            return UNSIGNED_SHORT;
        }
        if (typedArray instanceof Int32Array) {
            return INT;
        }
        if (typedArray instanceof Uint32Array) {
            return UNSIGNED_INT;
        }
        if (typedArray instanceof Float32Array) {
            return FLOAT;
        }
        throw "unsupported typed array to gl type";
    }
}
