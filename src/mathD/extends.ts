import { ObjectPool } from "@mtgoo/ctool";
import { vec4 } from "gl-matrix";
import { vec3, mat4 } from "gl-matrix";
import { TypedArray } from "../core/typedArray";

(vec3 as any).FORWARD = vec3.fromValues(0, 0, 1);
(vec3 as any).BACKWARD = vec3.fromValues(0, 0, -1);
(vec3 as any).RIGHT = vec3.fromValues(1, 0, 0);
(vec3 as any).LEFT = vec3.fromValues(-1, 0, 0);
(vec3 as any).UP = vec3.fromValues(0, 1, 0);
(vec3 as any).DOWN = vec3.fromValues(0, -1, 0);
(vec3 as any).ZERO = vec3.fromValues(0, 0, 0);
(vec3 as any).ONE = vec3.fromValues(1, 1, 1);

(vec3 as any).center = (out: vec3, a: vec3, b: vec3) => {
    out[0] = (a[0] + b[0]) * 0.5;
    out[1] = (a[1] + b[1]) * 0.5;
    out[2] = (a[2] + b[2]) * 0.5;
    return out;
};

(vec3 as any).projectToPlan = (() => {
    const tempt = vec3.create();
    return (out: vec3, a: vec3, planNormal: vec3) => {
        vec3.scale(tempt, planNormal, vec3.dot(a, planNormal));
        vec3.subtract(out, a, tempt);
        return out;
    };
})();
(vec3 as any).identity = (out: vec3) => {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    return out;
}
(vec4 as any).identity = (out: vec3) => {
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    return out;
}

(mat4 as any).IDENTITY = mat4.create();
(mat4 as any).fromNumberArray = (array: ArrayLike<number>) => {
    return mat4.fromValues(array[0], array[1], array[2], array[3], array[4], array[5], array[6], array[7], array[8], array[9], array[10], array[11], array[12], array[13], array[14], array[15]);
};
(mat4 as any).toArray = (array: number[] | TypedArray, mat: mat4, offset = 0) => {
    array[offset] = mat[0];
    array[offset + 1] = mat[1];
    array[offset + 2] = mat[2];
    array[offset + 3] = mat[3];

    array[offset + 4] = mat[4];
    array[offset + 5] = mat[5];
    array[offset + 6] = mat[6];
    array[offset + 7] = mat[7];

    array[offset + 8] = mat[8];
    array[offset + 9] = mat[9];
    array[offset + 10] = mat[10];
    array[offset + 11] = mat[11];

    array[offset + 12] = mat[12];
    array[offset + 13] = mat[13];
    array[offset + 14] = mat[14];
    array[offset + 15] = mat[15];
    return array;
};

(mat4 as any).getMaxScaleOnAxis = (mat: mat4): number => {
    const m11 = mat[0];
    const m12 = mat[1];
    const m13 = mat[2];
    const m21 = mat[4];
    const m22 = mat[5];
    const m23 = mat[6];
    const m31 = mat[8];
    const m32 = mat[9];
    const m33 = mat[10];

    const scaleX = m11 * m11 + m12 * m12 + m13 * m13;
    const scaleY = m21 * m21 + m22 * m22 + m23 * m23;
    const scaleZ = m31 * m31 + m32 * m32 + m33 * m33;

    return Math.sqrt(Math.max(scaleX, scaleY, scaleZ));
};

(mat4 as any).transformVector = (out: vec3, a: vec3, m: mat4) => {
    const x = a[0];
    const y = a[1];
    const z = a[2];
    out[0] = m[0] * x + m[4] * y + m[8] * z;
    out[1] = m[1] * x + m[5] * y + m[9] * z;
    out[2] = m[2] * x + m[6] * y + m[10] * z;
    return out;
};

(mat4 as any).transformPoint = vec3.transformMat4;

declare module "gl-matrix" {
    namespace vec3 {
        const ZERO: vec3;
        const ONE: vec3;
        const FORWARD: vec3;
        const BACKWARD: vec3;
        const RIGHT: vec3;
        const LEFT: vec3;
        const DOWN: vec3;
        const UP: vec3;
        export function center(out: vec3, a: vec3, b: vec3): vec3;
        export function projectToPlan(out: vec3, a: vec3, planNormal: vec3): vec3;
        export function identity(out: vec3): vec3;
    }
    namespace vec4 {
        export function identity(out: vec4): vec4;
    }
    namespace mat4 {
        const IDENTITY: mat4;
        export function fromNumberArray(array: ArrayLike<number>): mat4;
        export function transformVector(out: vec3, a: vec3, m: mat4): vec3;
        export function transformPoint(out: vec3, a: vec3, m: mat4): vec3;
        export function getMaxScaleOnAxis(array: mat4): number;
        export function toArray<T = number[] | TypedArray>(out: T, mat: mat4, offset: number): T;
    }
}

export const mat4Pool = new ObjectPool({ create: () => mat4.create(), reset: (obj: mat4) => mat4.identity(obj) });
export const vec3Pool = new ObjectPool({ create: () => vec3.create(), reset: (obj: vec3) => vec3.identity(obj) });
export const vec4Pool = new ObjectPool({ create: () => vec4.create(), reset: (obj: vec4) => vec4.identity(obj) });