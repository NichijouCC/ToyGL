import { vec4 } from './index'
export const EPSILON = 0.000001;

export function clamp(v: number, min: number = 0, max: number = 1): number {
    if (v <= min) return min;
    else if (v >= max) return max;
    else return v;
}

export function bePowerOf2(value: number) {
    return (value & (value - 1)) == 0;
}

export function lerp(from: number, to: number, lerp: number): number {
    return (to - from) * lerp + from;
}

export function random(min: number = 0, max: number = 1) {
    const bund = max - min;
    return min + bund * Math.random();
}

export function numberEqual(a: number, b: number): boolean {
    return a == b;
}
export function arrayEqual(a: number[] | Float32Array, b: number[] | Float32Array) {
    for (let i = 0; i < a.length; i++) {
        if (a[i] != b[i]) {
            return false;
        }
    }
    return true;
}
// row：图片行数//column:图片列数//index：第几张图片（index从0开始计数）
export function spriteAnimation(row: number, column: number, index: number, out: vec4) {
    var width = 1.0 / column;
    var height = 1.0 / row;
    var offsetx = width * (index % column);
    var offsety = height * row - height * (Math.floor(index / column) + 1);

    out[0] = width;
    out[1] = height;
    out[2] = offsetx;
    out[3] = offsety;
    // var uvOffset=new gd3d.math.vector4(width,height,offsetx,offsety);
    // return  uvOffset;
}

export function numberLerp(fromV: number, toV: number, v: number) {
    return fromV * (1 - v) + toV * v;
}

// export function disposeAllRecyle() {
//     color.disposeRecycledItems();
//     mat2d.disposeRecycledItems();
//     mat3.disposeRecycledItems();
//     mat4.disposeRecycledItems();
//     quat.disposeRecycledItems();
//     vec2.disposeRecycledItems();
//     vec3.disposeRecycledItems();
//     vec4.disposeRecycledItems();
// }

/**
 * Find the next highest power of two.
 * @param x Number to start search from.
 * @return Next highest power of two.
 */
export function CeilingPOT(x: number): number {
    x--;
    x |= x >> 1;
    x |= x >> 2;
    x |= x >> 4;
    x |= x >> 8;
    x |= x >> 16;
    x++;
    return x;
}

export function ceilPowerOfTwo(value: number) {
    return Math.pow(2, Math.ceil(Math.log(value) / Math.LN2));
}

/**
 * Find the next lowest power of two.
 * @param x Number to start search from.
 * @return Next lowest power of two.
 */
export function FloorPOT(x: number): number {
    x = x | (x >> 1);
    x = x | (x >> 2);
    x = x | (x >> 4);
    x = x | (x >> 8);
    x = x | (x >> 16);
    return x - (x >> 1);
}

/**
 * Find the nearest power of two.
 * @param x Number to start search from.
 * @return Next nearest power of two.
 */
export function NearestPOT(x: number): number {
    var c = CeilingPOT(x);
    var f = FloorPOT(x);
    return c - x > x - f ? f : c;
}

export function isPowerOf2(value: number) {
    return (value & (value - 1)) === 0;
}

export function canGenerateMipmap(width: number, height: number, webGLVersion: number) {
    if (webGLVersion != 2) {
        return isPowerOf2(width) && isPowerOf2(height);
    }
    return true;
}

export function canWrapReapeat(width: number, height: number, webGLVersion: number) {
    if (webGLVersion != 2) {
        return isPowerOf2(width) && isPowerOf2(height);
    }
    return true;
}

// export function filterFallback(gl: WebGLRenderingContext, filter: number): number {
//     if (filter === gl.NEAREST || filter === gl.NEAREST_MIPMAP_LINEAR || filter === gl.NEAREST_MIPMAP_NEAREST) {
//         return gl.NEAREST;
//     }
//     return gl.LINEAR;
// }
