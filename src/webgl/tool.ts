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

export function filterFallback(gl: WebGLRenderingContext, filter: number): number {
    if (filter === gl.NEAREST || filter === gl.NEAREST_MIPMAP_LINEAR || filter === gl.NEAREST_MIPMAP_NEAREST) {
        return gl.NEAREST;
    }
    return gl.LINEAR;
}
