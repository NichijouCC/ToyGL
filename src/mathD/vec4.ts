import { Mat4 } from "./mat4";

import { Quat } from "./quat";

import { EPSILON } from "./common";

export class Vec4 extends Float32Array {
    get x() {
        return this[0];
    }

    set x(value: number) {
        this[0] = value;
    }

    get y() {
        return this[1];
    }

    set y(value: number) {
        this[1] = value;
    }

    get z() {
        return this[2];
    }

    set z(value: number) {
        this[2] = value;
    }

    get w() {
        return this[3];
    }

    set w(value: number) {
        this[3] = value;
    }

    private static Recycle: Vec4[] = [];
    public static create(x: number = 0, y: number = 0, z: number = 0, w: number = 0): Vec4 {
        if (Vec4.Recycle && Vec4.Recycle.length > 0) {
            const item = Vec4.Recycle.pop() as Vec4;
            item[0] = x;
            item[1] = y;
            item[2] = z;
            item[3] = w;
            return item;
        } else {
            const item = new Vec4(x, y, z, w);
            // item[0]=x;
            // item[1]=y;
            // item[2]=z;
            // item[3]=w;
            return item;
        }
    }

    public static clone(from: Vec4): Vec4 {
        if (Vec4.Recycle.length > 0) {
            const item = Vec4.Recycle.pop() as Vec4;
            Vec4.copy(from, item);
            return item;
        } else {
            const item = new Vec4(from[0], from[1], from[2], from[3]);
            // item[0]=from[0];
            // item[1]=from[1];
            // item[2]=from[2];
            // item[3]=from[3];
            return item;
        }
    }

    public static recycle(item: Vec4) {
        Vec4.Recycle.push(item);
    }

    public static disposeRecycledItems() {
        Vec4.Recycle.length = 0;
    }

    constructor(x: number = 0, y: number = 0, z: number = 0, w: number = 0) {
        super(4);
        this[0] = x;
        this[1] = y;
        this[2] = z;
        this[3] = w;
    }

    /**
     * Copy the values from one vec4 to another
     *
     * @param out the receiving vector
     * @param a the source vector
     * @returns out
     */
    public static copy(a: Vec4 | number[], out: Vec4 = Vec4.create()): Vec4 {
        out[0] = a[0];
        out[1] = a[1];
        out[2] = a[2];
        out[3] = a[3];
        return out;
    }

    /**
     * Adds two vec4's
     *
     * @param out the receiving vector
     * @param a the first operand
     * @param b the second operand
     * @returns out
     */
    public static add(a: Vec4, b: Vec4, out: Vec4 = Vec4.create()): Vec4 {
        out[0] = a[0] + b[0];
        out[1] = a[1] + b[1];
        out[2] = a[2] + b[2];
        out[3] = a[3] + b[3];
        return out;
    }

    /**
     * Subtracts vector b from vector a
     *
     * @param a the first operand
     * @param b the second operand
     * @param out the receiving vector
     * @returns out
     */
    public static subtract(a: Vec4, b: Vec4, out: Vec4 = Vec4.create()): Vec4 {
        out[0] = a[0] - b[0];
        out[1] = a[1] - b[1];
        out[2] = a[2] - b[2];
        out[3] = a[3] - b[3];
        return out;
    }

    /**
     * Multiplies two vec4's
     *
     * @param a the first operand
     * @param b the second operand
     * @param out the receiving vector         *
     * @returns out
     */
    public static multiply(a: Vec4, b: Vec4, out: Vec4 = Vec4.create()): Vec4 {
        out[0] = a[0] * b[0];
        out[1] = a[1] * b[1];
        out[2] = a[2] * b[2];
        out[3] = a[3] * b[3];
        return out;
    }

    /**
     * Divides two vec4's
     *
     * @param out the receiving vector
     * @param a the first operand
     * @param b the second operand
     * @returns out
     */
    public static divide(a: Vec4, b: Vec4, out: Vec4 = Vec4.create()): Vec4 {
        out[0] = a[0] / b[0];
        out[1] = a[1] / b[1];
        out[2] = a[2] / b[2];
        out[3] = a[3] / b[3];
        return out;
    }

    /**
     * Math.ceil the components of a vec4
     *
     * @param {Vec4} a vector to ceil
     * @param {Vec4} out the receiving vector
     * @returns {Vec4} out
     */
    public static ceil(a: Vec4, out: Vec4 = Vec4.create()): Vec4 {
        out[0] = Math.ceil(a[0]);
        out[1] = Math.ceil(a[1]);
        out[2] = Math.ceil(a[2]);
        out[3] = Math.ceil(a[3]);
        return out;
    }

    /**
     * Math.floor the components of a vec4
     *
     * @param {Vec4} a vector to floor
     * @param {Vec4} out the receiving vector         *
     * @returns {Vec4} out
     */
    public static floor(a: Vec4, out: Vec4 = Vec4.create()): Vec4 {
        out[0] = Math.floor(a[0]);
        out[1] = Math.floor(a[1]);
        out[2] = Math.floor(a[2]);
        out[3] = Math.floor(a[3]);
        return out;
    }

    /**
     * Returns the minimum of two vec4's
     *
     * @param out the receiving vector
     * @param a the first operand
     * @param b the second operand
     * @returns out
     */
    public static min(a: Vec4, b: Vec4, out: Vec4 = Vec4.create()): Vec4 {
        out[0] = Math.min(a[0], b[0]);
        out[1] = Math.min(a[1], b[1]);
        out[2] = Math.min(a[2], b[2]);
        out[3] = Math.min(a[3], b[3]);
        return out;
    }

    /**
     * Returns the maximum of two vec4's
     *
     * @param out the receiving vector
     * @param a the first operand
     * @param b the second operand
     * @returns out
     */
    public static max(a: Vec4, b: Vec4, out: Vec4 = Vec4.create()): Vec4 {
        out[0] = Math.max(a[0], b[0]);
        out[1] = Math.max(a[1], b[1]);
        out[2] = Math.max(a[2], b[2]);
        out[3] = Math.max(a[3], b[3]);
        return out;
    }

    /**
     * Math.round the components of a vec4
     *
     * @param {Vec4} out the receiving vector
     * @param {Vec4} a vector to round
     * @returns {Vec4} out
     */
    public static round(a: Vec4, out: Vec4 = Vec4.create()): Vec4 {
        out[0] = Math.round(a[0]);
        out[1] = Math.round(a[1]);
        out[2] = Math.round(a[2]);
        out[3] = Math.round(a[3]);
        return out;
    }

    /**
     * Scales a vec4 by a scalar number
     *
     * @param out the receiving vector
     * @param a the vector to scale
     * @param b amount to scale the vector by
     * @returns out
     */
    public static scale(a: Vec4, b: number, out: Vec4 = Vec4.create()): Vec4 {
        out[0] = a[0] * b;
        out[1] = a[1] * b;
        out[2] = a[2] * b;
        out[3] = a[3] * b;
        return out;
    }

    /**
     * Adds two vec4's after scaling the second operand by a scalar value
     *
     * @param out the receiving vector
     * @param a the first operand
     * @param b the second operand
     * @param scale the amount to scale b by before adding
     * @returns out
     */
    public static scaleAndAdd(a: Vec4, b: Vec4, scale: number, out: Vec4 = Vec4.create()): Vec4 {
        out[0] = a[0] + b[0] * scale;
        out[1] = a[1] + b[1] * scale;
        out[2] = a[2] + b[2] * scale;
        out[3] = a[3] + b[3] * scale;
        return out;
    }

    /**
     * Calculates the euclidian distance between two vec4's
     *
     * @param a the first operand
     * @param b the second operand
     * @returns distance between a and b
     */
    public static distance(a: Vec4, b: Vec4): number {
        const x = b[0] - a[0];
        const y = b[1] - a[1];
        const z = b[2] - a[2];
        const w = b[3] - a[3];
        return Math.sqrt(x * x + y * y + z * z + w * w);
    }

    /**
     * Calculates the squared euclidian distance between two vec4's
     *
     * @param a the first operand
     * @param b the second operand
     * @returns squared distance between a and b
     */
    public static squaredDistance(a: Vec4, b: Vec4): number {
        const x = b[0] - a[0];
        const y = b[1] - a[1];
        const z = b[2] - a[2];
        const w = b[3] - a[3];
        return x * x + y * y + z * z + w * w;
    }

    /**
     * Calculates the length of a vec4
     *
     * @param a vector to calculate length of
     * @returns length of a
     */
    public static length_(a: Vec4): number {
        const x = a[0];
        const y = a[1];
        const z = a[2];
        const w = a[3];
        return Math.sqrt(x * x + y * y + z * z + w * w);
    }

    /**
     * Calculates the squared length of a vec4
     *
     * @param a vector to calculate squared length of
     * @returns squared length of a
     */
    public static squaredLength(a: Vec4): number {
        const x = a[0];
        const y = a[1];
        const z = a[2];
        const w = a[3];
        return x * x + y * y + z * z + w * w;
    }

    /**
     * Negates the components of a vec4
     *
     * @param out the receiving vector
     * @param a vector to negate
     * @returns out
     */
    public static negate(a: Vec4, out: Vec4 = Vec4.create()): Vec4 {
        out[0] = -a[0];
        out[1] = -a[1];
        out[2] = -a[2];
        out[3] = -a[3];
        return out;
    }

    /**
     * Returns the inverse of the components of a vec4
     *
     * @param out the receiving vector
     * @param a vector to invert
     * @returns out
     */
    public static inverse(a: Vec4, out: Vec4 = Vec4.create()): Vec4 {
        out[0] = 1.0 / a[0];
        out[1] = 1.0 / a[1];
        out[2] = 1.0 / a[2];
        out[3] = 1.0 / a[3];
        return out;
    }

    /**
     * Normalize a vec4
     *
     * @param out the receiving vector
     * @param a vector to normalize
     * @returns out
     */
    public static normalize(a: Vec4, out: Vec4 = Vec4.create()): Vec4 {
        const x = a[0];
        const y = a[1];
        const z = a[2];
        const w = a[3];
        let len = x * x + y * y + z * z + w * w;
        if (len > 0) {
            len = 1 / Math.sqrt(len);
            out[0] = x * len;
            out[1] = y * len;
            out[2] = z * len;
            out[3] = w * len;
        }
        return out;
    }

    /**
     * Calculates the dot product of two vec4's
     *
     * @param a the first operand
     * @param b the second operand
     * @returns dot product of a and b
     */
    public static dot(a: Vec4, b: Vec4): number {
        return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
    }

    /**
     * Performs a linear interpolation between two vec4's
     *
     * @param out the receiving vector
     * @param lhs the first operand
     * @param rhs the second operand
     * @param lerp interpolation amount between the two inputs
     * @returns out
     */
    public static lerp(lhs: Vec4, rhs: Vec4, lerp: number, out: Vec4 = Vec4.create()): Vec4 {
        const ax = lhs[0];
        const ay = lhs[1];
        const az = lhs[2];
        const aw = lhs[3];
        out[0] = ax + lerp * (rhs[0] - ax);
        out[1] = ay + lerp * (rhs[1] - ay);
        out[2] = az + lerp * (rhs[2] - az);
        out[3] = aw + lerp * (rhs[3] - aw);
        return out;
    }

    /**
     * Generates a random vector with the given scale
     *
     * @param out the receiving vector
     * @param scale length of the resulting vector. If ommitted, a unit vector will be returned
     * @returns out
     */
    public static random(scale: number, out: Vec4 = Vec4.create()): Vec4 {
        scale = scale || 1.0;

        // TODO: This is a pretty awful way of doing this. Find something better.
        out[0] = Math.random();
        out[1] = Math.random();
        out[2] = Math.random();
        out[3] = Math.random();
        Vec4.normalize(out, out);
        Vec4.scale(out, scale, out);
        return out;
    }

    /**
     * Transforms the vec4 with a Mat4.
     *
     * @param out the receiving vector
     * @param a the vector to transform
     * @param m matrix to transform with
     * @returns out
     */
    public static transformMat4(a: Vec4, m: Mat4, out: Vec4 = Vec4.create()): Vec4 {
        const x = a[0];
        const y = a[1];
        const z = a[2];
        const w = a[3];
        out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
        out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
        out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
        out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
        return out;
    }

    /**
     * Transforms the vec4 with a Quat
     *
     * @param out the receiving vector
     * @param a the vector to transform
     * @param q Quaternion to transform with
     * @returns out
     */

    public static transformQuat(a: Vec4, q: Quat, out: Vec4 = Vec4.create()): Vec4 {
        const x = a[0];
        const y = a[1];
        const z = a[2];
        const qx = q[0];
        const qy = q[1];
        const qz = q[2];
        const qw = q[3];

        // calculate Quat * vec
        const ix = qw * x + qy * z - qz * y;
        const iy = qw * y + qz * x - qx * z;
        const iz = qw * z + qx * y - qy * x;
        const iw = -qx * x - qy * y - qz * z;

        // calculate result * inverse Quat
        out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
        out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
        out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
        out[3] = a[3];
        return out;
    }

    // /**
    //  * Perform some operation over an array of vec4s.
    //  *
    //  * @param a the array of vectors to iterate over
    //  * @param stride Number of elements between the start of each vec4. If 0 assumes tightly packed
    //  * @param offset Number of elements to skip at the beginning of the array
    //  * @param count Number of vec4s to iterate over. If 0 iterates over entire array
    //  * @param fn Function to call for each vector in the array
    //  * @param arg additional argument to pass to fn
    //  * @returns a
    //  * @function
    //  */
    // public static forEach(a: Float32Array, stride: number, offset: number, count: number,
    //                       fn: (a: vec4, b: vec4, arg: any) => void, arg: any): Float32Array;

    // /**
    //  * Perform some operation over an array of vec4s.
    //  *
    //  * @param a the array of vectors to iterate over
    //  * @param stride Number of elements between the start of each vec4. If 0 assumes tightly packed
    //  * @param offset Number of elements to skip at the beginning of the array
    //  * @param count Number of vec4s to iterate over. If 0 iterates over entire array
    //  * @param fn Function to call for each vector in the array
    //  * @returns a
    //  * @function
    //  */
    // public static forEach(a: Float32Array, stride: number, offset: number, count: number,
    //                       fn: (a: vec4, b: vec4) => void): Float32Array;

    /**
     * Returns a string representation of a vector
     *
     * @param a vector to represent as a string
     * @returns string representation of the vector
     */
    public static str(a: Vec4): string {
        return "vec4(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")";
    }

    /**
     * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
     *
     * @param {Vec4} a The first vector.
     * @param {Vec4} b The second vector.
     * @returns {boolean} True if the vectors are equal, false otherwise.
     */
    public static exactEquals(a: Vec4, b: Vec4): boolean {
        return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
    }

    /**
     * Returns whether or not the vectors have approximately the same elements in the same position.
     *
     * @param {Vec4} a The first vector.
     * @param {Vec4} b The second vector.
     * @returns {boolean} True if the vectors are equal, false otherwise.
     */
    public static equals(a: Vec4, b: Vec4): boolean {
        const a0 = a[0];
        const a1 = a[1];
        const a2 = a[2];
        const a3 = a[3];
        const b0 = b[0];
        const b1 = b[1];
        const b2 = b[2];
        const b3 = b[3];
        return (
            Math.abs(a0 - b0) <= EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
            Math.abs(a1 - b1) <= EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
            Math.abs(a2 - b2) <= EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) &&
            Math.abs(a3 - b3) <= EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3))
        );
    }
}
