import { vec3 as glVec3, vec4 as glVec4, mat4 as glMat4, quat as glQuat } from "gl-matrix";
import { TypedArray } from "../core/typedArray";
import { Tempt } from "./tempt";

export { vec2, mat2, mat2d, mat3, glMatrix } from 'gl-matrix';

export type vec3 = glVec3;
export const vec3 = Object.assign({
    FORWARD: glVec3.fromValues(0, 0, 1),
    BACKWARD: glVec3.fromValues(0, 0, -1),
    RIGHT: glVec3.fromValues(1, 0, 0),
    LEFT: glVec3.fromValues(-1, 0, 0),
    UP: glVec3.fromValues(0, 1, 0),
    DOWN: glVec3.fromValues(0, -1, 0),
    ZERO: glVec3.fromValues(0, 0, 0),
    ONE: glVec3.fromValues(1, 1, 1),

    center: (out: glVec3, a: glVec3, b: glVec3) => {
        out[0] = (a[0] + b[0]) * 0.5;
        out[1] = (a[1] + b[1]) * 0.5;
        out[2] = (a[2] + b[2]) * 0.5;
        return out;
    },
    projectToPlan: (() => {
        const tempt = glVec3.create();
        return (out: glVec3, a: glVec3, planNormal: glVec3) => {
            glVec3.scale(tempt, planNormal, glVec3.dot(a, planNormal));
            glVec3.subtract(out, a, tempt);
            return out;
        };
    })(),
    identity: (out: glVec3) => {
        out[0] = 0;
        out[1] = 0;
        out[2] = 0;
        return out;
    },
    fromArray: (arr: ArrayLike<number>) => {
        return glVec3.fromValues(arr[0], arr[1], arr[2]);
    }
}, glVec3);

export type vec4 = glVec4;
export const vec4 = Object.assign({
    identity: (out: glVec4) => {
        out[0] = 0;
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
        return out;
    },
    fromArray: (arr: ArrayLike<number>) => {
        return glVec4.fromValues(arr[0], arr[1], arr[2], arr[3]);
    }
}, glVec4);

export type mat4 = glMat4;
export const mat4 = Object.assign({
    IDENTITY: glMat4.create(),
    fromArray: (array: ArrayLike<number>) => {
        return glMat4.fromValues(array[0], array[1], array[2], array[3], array[4], array[5], array[6], array[7], array[8], array[9], array[10], array[11], array[12], array[13], array[14], array[15]);
    },
    toArray: (array: number[] | TypedArray, mat: glMat4, offset = 0) => {
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
    },
    getMaxScaleOnAxis: (mat: glMat4): number => {
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
    },
    transformVector: (out: glVec3, a: glVec3, m: glMat4) => {
        const x = a[0];
        const y = a[1];
        const z = a[2];
        out[0] = m[0] * x + m[4] * y + m[8] * z;
        out[1] = m[1] * x + m[5] * y + m[9] * z;
        out[2] = m[2] * x + m[6] * y + m[10] * z;
        return out;
    },
    transformPoint: glVec3.transformMat4,
    ndcToView(out: vec3, ndcPos: vec3, projectMat: mat4) {
        let tempMat = Tempt.getMat4();
        let temptVec4 = Tempt.getVec4();
        const inversePrjMat = mat4.invert(tempMat, projectMat);
        const viewPosH = vec4.transformMat4(temptVec4, vec4.fromValues(ndcPos[0], ndcPos[1], ndcPos[2], 1), inversePrjMat);
        out[0] = viewPosH[0] / viewPosH[3];
        out[1] = viewPosH[1] / viewPosH[3];
        out[2] = viewPosH[2] / viewPosH[3];
        return out;
    },
    ndcToWorld(out: vec3, ndcPos: vec3, projectMat: mat4, camToWorld: mat4) {
        const view_pos = mat4.ndcToView(out, ndcPos, projectMat);
        return vec3.transformMat4(view_pos, view_pos, camToWorld);
    }
}, glMat4);

export type quat = glQuat;
export const quat = Object.assign({
    IDENTITY: glQuat.create(),
    fromArray: (arr: ArrayLike<number>) => {
        return glQuat.fromValues(arr[0], arr[1], arr[2], arr[3]);
    }
}, glQuat)