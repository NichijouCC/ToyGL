import { Quat } from "./quat";

import { EPSILON } from "./common";

export class Vec3 extends Float32Array {
    public static readonly UP = Vec3.create(0, 1, 0);
    public static readonly DOWN = Vec3.create(0, -1, 0);

    public static readonly RIGHT = Vec3.create(1, 0, 0);
    public static readonly LEFT = Vec3.create(-1, 0, 0);

    public static readonly FORWARD = Vec3.create(0, 0, 1);
    public static readonly BACKWARD = Vec3.create(0, 0, -1);

    public static readonly ONE = Vec3.create(1, 1, 1);
    public static readonly ZERO = Vec3.create(0, 0, 0);

    public get x() {
        return this[0];
    }

    public set x(value: number) {
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

    private static Recycle: Vec3[] = [];
    public static create(x: number = 0, y: number = 0, z: number = 0) {
        if (Vec3.Recycle && Vec3.Recycle.length > 0) {
            const item = Vec3.Recycle.pop() as Vec3;
            item[0] = x;
            item[1] = y;
            item[2] = z;
            return item;
        } else {
            // let item=new Float32Array(3);
            // item[0]=x;
            // item[1]=y;
            // item[2]=z;
            const item = new Vec3(x, y, z);
            return item;
        }
    }

    public static clone(from: Vec3): Vec3 {
        if (Vec3.Recycle.length > 0) {
            const item = Vec3.Recycle.pop() as Vec3;

            Vec3.copy(from, item);
            return item;
        } else {
            // let item=new Float32Array(3);
            const item = new Vec3(from[0], from[1], from[2]);
            // item[0]=from[0];
            // item[1]=from[1];
            // item[2]=from[2];
            return item;
        }
    }

    public static recycle(item: Vec3) {
        Vec3.Recycle.push(item);
    }

    public static disposeRecycledItems() {
        Vec3.Recycle.length = 0;
    }

    constructor(x: number = 0, y: number = 0, z: number = 0) {
        super(3);
        this[0] = x;
        this[1] = y;
        this[2] = z;
    }

    /**
     * Copy the values from one vec3 to another
     *
     * @param out the receiving vector
     * @param src the source vector
     * @returns out
     */
    public static copy(from: Vec3 | number[], out: Vec3 = Vec3.create()): Vec3 {
        out[0] = from[0];
        out[1] = from[1];
        out[2] = from[2];
        return out;
    }

    /**
     * Adds two vec3's
     *
     * @param out the receiving vector
     * @param lhs the first operand
     * @param rhs the second operand
     * @returns out
     */
    public static add(lhs: Vec3, rhs: Vec3, out: Vec3 = Vec3.create()): Vec3 {
        out[0] = lhs[0] + rhs[0];
        out[1] = lhs[1] + rhs[1];
        out[2] = lhs[2] + rhs[2];
        return out;
    }

    public static toZero(a: Vec3) {
        a[0] = a[1] = a[2] = 0;
    }

    /**
     * Subtracts vector b from vector a
     *
     * @param out the receiving vector
     * @param lhs the first operand
     * @param rhs the second operand
     * @returns out
     */
    public static subtract(lhs: Vec3, rhs: Vec3, out: Vec3 = Vec3.create()): Vec3 {
        out[0] = lhs[0] - rhs[0];
        out[1] = lhs[1] - rhs[1];
        out[2] = lhs[2] - rhs[2];
        return out;
    }

    /**
     * Multiplies two vec3's
     *
     * @param out the receiving vector
     * @param a the first operand
     * @param b the second operand
     * @returns out
     */
    public static multiply(a: Vec3, b: Vec3, out: Vec3 = Vec3.create()): Vec3 {
        out[0] = a[0] * b[0];
        out[1] = a[1] * b[1];
        out[2] = a[2] * b[2];
        return out;
    }

    public static center(a: Vec3, b: Vec3, out: Vec3 = Vec3.create()) {
        this.add(a, b, out);
        this.scale(out, 0.5, out);
        return out;
    }

    /**
     * Divides two vec3's
     *
     * @param out the receiving vector
     * @param a the first operand
     * @param b the second operand
     * @returns out
     */
    public static divide(a: Vec3, b: Vec3, out: Vec3 = Vec3.create()): Vec3 {
        out[0] = a[0] / b[0];
        out[1] = a[1] / b[1];
        out[2] = a[2] / b[2];
        return out;
    }

    /**
     * Math.ceil the components of a vec3
     *
     * @param {Vec3} out the receiving vector
     * @param {Vec3} a vector to ceil
     * @returns {Vec3} out
     */
    public static ceil(out: Vec3 = Vec3.create(), a: Vec3): Vec3 {
        out[0] = Math.ceil(a[0]);
        out[1] = Math.ceil(a[1]);
        out[2] = Math.ceil(a[2]);
        return out;
    }

    /**
     * Math.floor the components of a vec3
     *
     * @param {Vec3} out the receiving vector
     * @param {Vec3} a vector to floor
     * @returns {Vec3} out
     */
    public static floor(out: Vec3 = Vec3.create(), a: Vec3): Vec3 {
        out[0] = Math.floor(a[0]);
        out[1] = Math.floor(a[1]);
        out[2] = Math.floor(a[2]);
        return out;
    }

    /**
     * Returns the minimum of two vec3's
     *
     * @param out the receiving vector
     * @param a the first operand
     * @param b the second operand
     * @returns out
     */
    public static min(a: Vec3, b: Vec3, out: Vec3 = Vec3.create()): Vec3 {
        out[0] = Math.min(a[0], b[0]);
        out[1] = Math.min(a[1], b[1]);
        out[2] = Math.min(a[2], b[2]);
        return out;
    }

    /**
     * Returns the maximum of two vec3's
     *
     * @param out the receiving vector
     * @param a the first operand
     * @param b the second operand
     * @returns out
     */
    public static max(out: Vec3 = Vec3.create(), a: Vec3, b: Vec3): Vec3 {
        out[0] = Math.max(a[0], b[0]);
        out[1] = Math.max(a[1], b[1]);
        out[2] = Math.max(a[2], b[2]);
        return out;
    }

    /**
     * Math.round the components of a vec3
     *
     * @param {Vec3} out the receiving vector
     * @param {Vec3} a vector to round
     * @returns {Vec3} out
     */
    public static round(out: Vec3 = Vec3.create(), a: Vec3): Vec3 {
        out[0] = Math.round(a[0]);
        out[1] = Math.round(a[1]);
        out[2] = Math.round(a[2]);
        return out;
    }

    /**
     * Scales a vec3 by a scalar number
     *
     * @param out the receiving vector
     * @param a the vector to scale
     * @param b amount to scale the vector by
     * @returns out
     */
    public static scale(a: Vec3, b: number, out: Vec3 = Vec3.create()): Vec3 {
        out[0] = a[0] * b;
        out[1] = a[1] * b;
        out[2] = a[2] * b;
        return out;
    }

    /**
     * Adds two vec3's after scaling the second operand by a scalar value
     *
     * @param out the receiving vector
     * @param lhs the first operand
     * @param rhs the second operand
     * @param scale the amount to scale b by before adding
     * @returns out
     */
    public static AddscaledVec(lhs: Vec3, rhs: Vec3, scale: number, out: Vec3 = Vec3.create()): Vec3 {
        out[0] = lhs[0] + rhs[0] * scale;
        out[1] = lhs[1] + rhs[1] * scale;
        out[2] = lhs[2] + rhs[2] * scale;
        return out;
    }

    /**
     * Calculates the euclidian distance between two vec3's
     *
     * @param a the first operand
     * @param b the second operand
     * @returns distance between a and b
     */
    public static distance(a: Vec3, b: Vec3): number {
        const x = b[0] - a[0];
        const y = b[1] - a[1];
        const z = b[2] - a[2];
        return Math.sqrt(x * x + y * y + z * z);
    }

    /**
     * Calculates the squared euclidian distance between two vec3's
     *
     * @param a the first operand
     * @param b the second operand
     * @returns squared distance between a and b
     */
    public static squaredDistance(a: Vec3, b: Vec3): number {
        const x = b[0] - a[0];
        const y = b[1] - a[1];
        const z = b[2] - a[2];
        return x * x + y * y + z * z;
    }

    /**
     * Calculates the length of a vec3
     *
     * @param a vector to calculate length of
     * @returns length of a
     */
    public static magnitude(a: Vec3): number {
        const x = a[0];
        const y = a[1];
        const z = a[2];
        return Math.sqrt(x * x + y * y + z * z);
    }

    /**
     * Calculates the squared length of a vec3
     *
     * @param a vector to calculate squared length of
     * @returns squared length of a
     */
    public static squaredLength(a: Vec3): number {
        const x = a[0];
        const y = a[1];
        const z = a[2];
        return x * x + y * y + z * z;
    }

    /**
     * Negates the components of a vec3
     *
     * @param out the receiving vector
     * @param a vector to negate
     * @returns out
     */
    public static negate(a: Vec3, out: Vec3 = Vec3.create()): Vec3 {
        out[0] = -a[0];
        out[1] = -a[1];
        out[2] = -a[2];
        return out;
    }

    /**
     * Returns the inverse of the components of a vec3
     *
     * @param out the receiving vector
     * @param a vector to invert
     * @returns out
     */
    public static inverse(a: Vec3, out: Vec3 = Vec3.create()): Vec3 {
        out[0] = 1.0 / a[0];
        out[1] = 1.0 / a[1];
        out[2] = 1.0 / a[2];
        return out;
    }

    /**
     * Normalize a vec3
     *
     * @param out the receiving vector
     * @param src vector to normalize
     * @returns out
     */
    public static normalize(src: Vec3, out: Vec3 = Vec3.create()): Vec3 {
        const x = src[0];
        const y = src[1];
        const z = src[2];
        let len = x * x + y * y + z * z;
        if (len > 0) {
            // TODO: evaluate use of glm_invsqrt here?
            len = 1 / Math.sqrt(len);
            out[0] = src[0] * len;
            out[1] = src[1] * len;
            out[2] = src[2] * len;
        }
        return out;
    }

    /**
     * Calculates the dot product of two vec3's
     *
     * @param a the first operand
     * @param b the second operand
     * @returns dot product of a and b
     */
    public static dot(a: Vec3, b: Vec3): number {
        return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
    }

    /**
     * Computes the cross product of two vec3's
     *
     * @param out the receiving vector
     * @param lhs the first operand
     * @param rhs the second operand
     * @returns out
     */
    public static cross(lhs: Vec3, rhs: Vec3, out: Vec3 = Vec3.create()): Vec3 {
        const ax = lhs[0];
        const ay = lhs[1];
        const az = lhs[2];
        const bx = rhs[0];
        const by = rhs[1];
        const bz = rhs[2];

        out[0] = ay * bz - az * by;
        out[1] = az * bx - ax * bz;
        out[2] = ax * by - ay * bx;
        return out;
    }

    /**
     * Performs a linear interpolation between two vec3's
     *
     * @param out the receiving vector
     * @param lhs the first operand
     * @param rhs the second operand
     * @param lerp interpolation amount between the two inputs
     * @returns out
     */
    public static lerp(lhs: Vec3, rhs: Vec3, lerp: number, out: Vec3 = Vec3.create()): Vec3 {
        const ax = lhs[0];
        const ay = lhs[1];
        const az = lhs[2];
        out[0] = ax + lerp * (rhs[0] - ax);
        out[1] = ay + lerp * (rhs[1] - ay);
        out[2] = az + lerp * (rhs[2] - az);
        return out;
    }

    /**
     * Performs a hermite interpolation with two control points
     *
     * @param {Vec3} out the receiving vector
     * @param {Vec3} a the first operand
     * @param {Vec3} b the second operand
     * @param {Vec3} c the third operand
     * @param {Vec3} d the fourth operand
     * @param {number} t interpolation amount between the two inputs
     * @returns {Vec3} out
     */
    public static hermite(a: Vec3, b: Vec3, c: Vec3, d: Vec3, t: number, out: Vec3 = Vec3.create()): Vec3 {
        const factorTimes2 = t * t;
        const factor1 = factorTimes2 * (2 * t - 3) + 1;
        const factor2 = factorTimes2 * (t - 2) + t;
        const factor3 = factorTimes2 * (t - 1);
        const factor4 = factorTimes2 * (3 - 2 * t);

        out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
        out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
        out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;

        return out;
    }

    /**
     * Performs a bezier interpolation with two control points
     *
     * @param {Vec3} out the receiving vector
     * @param {Vec3} a the first operand
     * @param {Vec3} b the second operand
     * @param {Vec3} c the third operand
     * @param {Vec3} d the fourth operand
     * @param {number} t interpolation amount between the two inputs
     * @returns {Vec3} out
     */
    public static bezier(a: Vec3, b: Vec3, c: Vec3, d: Vec3, t: number, out: Vec3 = Vec3.create()): Vec3 {
        const inverseFactor = 1 - t;
        const inverseFactorTimesTwo = inverseFactor * inverseFactor;
        const factorTimes2 = t * t;
        const factor1 = inverseFactorTimesTwo * inverseFactor;
        const factor2 = 3 * t * inverseFactorTimesTwo;
        const factor3 = 3 * factorTimes2 * inverseFactor;
        const factor4 = factorTimes2 * t;

        out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
        out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
        out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;

        return out;
    }

    /**
     * Generates a random vector with the given scale
     *
     * @param out the receiving vector
     * @param [scale] Length of the resulting vector. If omitted, a unit vector will be returned
     * @returns out
     */
    public static random(scale: number = 1, out: Vec3 = Vec3.create()): Vec3 {
        scale = scale || 1.0;

        const r = Math.random() * 2.0 * Math.PI;
        const z = Math.random() * 2.0 - 1.0;
        const zScale = Math.sqrt(1.0 - z * z) * scale;

        out[0] = Math.cos(r) * zScale;
        out[1] = Math.sin(r) * zScale;
        out[2] = z * scale;
        return out;
    }

    // /**
    //  * Transforms the vec3 with a mat3.
    //  *
    //  * @param out the receiving vector
    //  * @param a the vector to transform
    //  * @param m the 3x3 matrix to transform with
    //  * @returns out
    //  */
    // public static transformMat3(out: Vec3 = Vec3.create(), a: vec3, m: mat3): vec3{
    //     let x = a[0],
    //     y = a[1],
    //     z = a[2];
    // out[0] = x * m[0] + y * m[3] + z * m[6];
    // out[1] = x * m[1] + y * m[4] + z * m[7];
    // out[2] = x * m[2] + y * m[5] + z * m[8];
    // return out;
    // }

    // /**
    //  * 转到mat4中
    //  * Transforms the vec3 with a mat4.
    //  * 4th vector component is implicitly '1'
    //  *
    //  * @param out the receiving vector
    //  * @param a the vector to transform
    //  * @param m matrix to transform with
    //  * @returns out
    //  */
    // public static transformMat4(out: Vec3 = Vec3.create(), a: vec3, m: mat4): vec3{
    //     let x = a[0],
    //         y = a[1],
    //         z = a[2];
    //     let w = m[3] * x + m[7] * y + m[11] * z + m[15];
    //     w = w || 1.0;
    //     out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
    //     out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
    //     out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
    //     return out;
    // }

    /**
     * Transforms the vec3 with a Quat
     *
     * @param out the receiving vector
     * @param a the vector to transform
     * @param q Quaternion to transform with
     * @returns out
     */
    public static transformQuat(a: Vec3, q: Quat, out: Vec3 = Vec3.create()): Vec3 {
        // benchmarks: http://jsperf.com/Quaternion-transform-vec3-implementations

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
        return out;
    }

    /**
     * Rotate a 3D vector around the x-axis
     * @param out The receiving vec3
     * @param a The vec3 point to rotate
     * @param b The origin of the rotation
     * @param c The angle of rotation
     * @returns out
     */
    public static rotateX(a: Vec3, b: Vec3, c: number, out: Vec3 = Vec3.create()): Vec3 {
        const p = [];
        const r = [];
        // Translate point to the origin
        p[0] = a[0] - b[0];
        p[1] = a[1] - b[1];
        p[2] = a[2] - b[2];

        // perform rotation
        r[0] = p[0];
        r[1] = p[1] * Math.cos(c) - p[2] * Math.sin(c);
        r[2] = p[1] * Math.sin(c) + p[2] * Math.cos(c);

        // translate to correct position
        out[0] = r[0] + b[0];
        out[1] = r[1] + b[1];
        out[2] = r[2] + b[2];

        return out;
    }

    /**
     * Rotate a 3D vector around the y-axis
     * @param out The receiving vec3
     * @param a The vec3 point to rotate
     * @param b The origin of the rotation
     * @param c The angle of rotation
     * @returns out
     */
    public static rotateY(a: Vec3, b: Vec3, c: number, out: Vec3 = Vec3.create()): Vec3 {
        const p = [];
        const r = [];
        // Translate point to the origin
        p[0] = a[0] - b[0];
        p[1] = a[1] - b[1];
        p[2] = a[2] - b[2];

        // perform rotation
        r[0] = p[2] * Math.sin(c) + p[0] * Math.cos(c);
        r[1] = p[1];
        r[2] = p[2] * Math.cos(c) - p[0] * Math.sin(c);

        // translate to correct position
        out[0] = r[0] + b[0];
        out[1] = r[1] + b[1];
        out[2] = r[2] + b[2];

        return out;
    }

    /**
     * Rotate a 3D vector around the z-axis
     * @param out The receiving vec3
     * @param a The vec3 point to rotate
     * @param b The origin of the rotation
     * @param c The angle of rotation
     * @returns out
     */
    public static rotateZ(a: Vec3, b: Vec3, c: number, out: Vec3 = Vec3.create()): Vec3 {
        const p = [];
        const r = [];
        // Translate point to the origin
        p[0] = a[0] - b[0];
        p[1] = a[1] - b[1];
        p[2] = a[2] - b[2];

        // perform rotation
        r[0] = p[0] * Math.cos(c) - p[1] * Math.sin(c);
        r[1] = p[0] * Math.sin(c) + p[1] * Math.cos(c);
        r[2] = p[2];

        // translate to correct position
        out[0] = r[0] + b[0];
        out[1] = r[1] + b[1];
        out[2] = r[2] + b[2];

        return out;
    }

    // /**
    //  * Perform some operation over an array of vec3s.
    //  *
    //  * @param a the array of vectors to iterate over
    //  * @param stride Number of elements between the start of each vec3. If 0 assumes tightly packed
    //  * @param offset Number of elements to skip at the beginning of the array
    //  * @param count Number of vec3s to iterate over. If 0 iterates over entire array
    //  * @param fn Function to call for each vector in the array
    //  * @param arg additional argument to pass to fn
    //  * @returns a
    //  * @function
    //  */
    // public static forEach(a: Float32Array, stride: number, offset: number, count: number,
    //                       fn: (a: vec3, b: vec3, arg: any) => void, arg: any): Float32Array;

    // /**
    //  * Perform some operation over an array of vec3s.
    //  *
    //  * @param a the array of vectors to iterate over
    //  * @param stride Number of elements between the start of each vec3. If 0 assumes tightly packed
    //  * @param offset Number of elements to skip at the beginning of the array
    //  * @param count Number of vec3s to iterate over. If 0 iterates over entire array
    //  * @param fn Function to call for each vector in the array
    //  * @returns a
    //  * @function
    //  */
    // public static forEach(a: Float32Array, stride: number, offset: number, count: number,
    //                       fn: (a: vec3, b: vec3) => void): Float32Array;

    /**
     * Get the angle between two 3D vectors
     * @param a The first operand
     * @param b The second operand
     * @returns The angle in radians
     */
    public static angle(a: Vec3, b: Vec3): number {
        const tempA = Vec3.clone(a);
        const tempB = Vec3.clone(b);
        // let tempA = vec3.fromValues(a[0], a[1], a[2]);
        // let tempB = vec3.fromValues(b[0], b[1], b[2]);

        Vec3.normalize(tempA, tempA);
        Vec3.normalize(tempB, tempB);

        const cosine = Vec3.dot(tempA, tempB);

        if (cosine > 1.0) {
            return 0;
        } else if (cosine < -1.0) {
            return Math.PI;
        } else {
            return Math.acos(cosine);
        }
    }

    /**
     * Returns a string representation of a vector
     *
     * @param a vector to represent as a string
     * @returns string representation of the vector
     */
    public static str(a: Vec3): string {
        return "vec3(" + a[0] + ", " + a[1] + ", " + a[2] + ")";
    }

    /**
     * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
     *
     * @param {Vec3} a The first vector.
     * @param {Vec3} b The second vector.
     * @returns {boolean} True if the vectors are equal, false otherwise.
     */
    public static exactEquals(a: Vec3, b: Vec3): boolean {
        return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
    }

    /**
     * Returns whether or not the vectors have approximately the same elements in the same position.
     *
     * @param {Vec3} a The first vector.
     * @param {Vec3} b The second vector.
     * @returns {boolean} True if the vectors are equal, false otherwise.
     */
    public static equals(a: Vec3, b: Vec3): boolean {
        const a0 = a[0];
        const a1 = a[1];
        const a2 = a[2];
        const b0 = b[0];
        const b1 = b[1];
        const b2 = b[2];
        return Math.abs(a0 - b0) <= EPSILON && Math.abs(a1 - b1) <= EPSILON && Math.abs(a2 - b2) <= EPSILON;
    }
}
