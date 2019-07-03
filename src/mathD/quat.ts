import { Vec3 } from "./vec3";
import { Mat3 } from "./Mat3";
import { clamp, EPSILON } from "./common";

export class Quat extends Float32Array {
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

    private static Recycle: Quat[] = [];
    public static readonly norot = Quat.create();
    public static create() {
        if (Quat.Recycle && Quat.Recycle.length > 0) {
            let item = Quat.Recycle.pop() as Quat;
            Quat.identity(item);
            return item;
        } else {
            let item = new Quat();
            return item;
        }
    }
    public static clone(from: Quat): Quat {
        if (Quat.Recycle.length > 0) {
            let item = Quat.Recycle.pop() as Quat;
            Quat.copy(from, item);
            return item;
        } else {
            let item = new Quat();
            item[0] = from[0];
            item[1] = from[1];
            item[2] = from[2];
            item[3] = from[3];
            return item;
        }
    }
    public static recycle(item: Quat) {
        Quat.Recycle.push(item);
    }

    public static disposeRecycledItems() {
        Quat.Recycle.length = 0;
    }
    private constructor() {
        super(4);
        // this[0]=0;
        // this[1]=0;
        // this[2]=0;
        this[3] = 1;
    }

    /**
     * Copy the values from one Quat to another
     *
     * @param out the receiving Quaternion
     * @param a the source Quaternion
     * @returns out
     * @function
     */
    public static copy(a: Quat | number[], out: Quat): Quat {
        out[0] = a[0];
        out[1] = a[1];
        out[2] = a[2];
        out[3] = a[3];
        return out;
    }

    /**
     * Set a Quat to the identity Quaternion
     *
     * @param out the receiving Quaternion
     * @returns out
     */
    public static identity(out: Quat): Quat {
        out[0] = 0;
        out[1] = 0;
        out[2] = 0;
        out[3] = 1;
        return out;
    }

    /**
     * Gets the rotation axis and angle for a given
     *  Quaternion. If a Quaternion is created with
     *  setAxisAngle, this method will return the same
     *  values as providied in the original parameter list
     *  OR functionally equivalent values.
     * Example: The Quaternion formed by axis [0, 0, 1] and
     *  angle -90 is the same as the Quaternion formed by
     *  [0, 0, 1] and 270. This method favors the latter.
     * @param  {Vec3} axis  Vector receiving the axis of rotation
     * @param  {Quat} q     Quaternion to be decomposed
     * @return {number}     Angle, in radians, of the rotation
     */
    public static getAxisAngle(axis: Vec3, q: Quat): number {
        let rad = Math.acos(q[3]) * 2.0;
        let s = Math.sin(rad / 2.0);
        if (s != 0.0) {
            axis[0] = q[0] / s;
            axis[1] = q[1] / s;
            axis[2] = q[2] / s;
        } else {
            // If s is zero, return any axis (no rotation - axis does not matter)
            axis[0] = 1;
            axis[1] = 0;
            axis[2] = 0;
        }
        return rad;
    }

    /**
     * Adds two Quat's
     *
     * @param out the receiving Quaternion
     * @param a the first operand
     * @param b the second operand
     * @returns out
     * @function
     */
    public static add(a: Quat, b: Quat, out: Quat): Quat {
        out[0] = a[0] + b[0];
        out[1] = a[1] + b[1];
        out[2] = a[2] + b[2];
        out[3] = a[3] + b[3];
        return out;
    }

    /**
     * Multiplies two Quat's
     *
     * @param out the receiving Quaternion
     * @param a the first operand
     * @param b the second operand
     * @returns out
     */
    public static multiply(a: Quat, b: Quat, out: Quat): Quat {
        let ax = a[0],
            ay = a[1],
            az = a[2],
            aw = a[3];
        let bx = b[0],
            by = b[1],
            bz = b[2],
            bw = b[3];

        out[0] = ax * bw + aw * bx + ay * bz - az * by;
        out[1] = ay * bw + aw * by + az * bx - ax * bz;
        out[2] = az * bw + aw * bz + ax * by - ay * bx;
        out[3] = aw * bw - ax * bx - ay * by - az * bz;
        return out;
    }

    /**
     * Scales a Quat by a scalar number
     *
     * @param out the receiving vector
     * @param a the vector to scale
     * @param b amount to scale the vector by
     * @returns out
     * @function
     */
    public static scale(a: Quat, b: number, out: Quat): Quat {
        out[0] = a[0] * b;
        out[1] = a[1] * b;
        out[2] = a[2] * b;
        out[3] = a[3] * b;
        return out;
    }

    /**
     * Calculates the length of a Quat
     *
     * @param a vector to calculate length of
     * @returns length of a
     * @function
     */
    public static length_(a: Quat): number {
        let x = a[0];
        let y = a[1];
        let z = a[2];
        let w = a[3];
        return Math.sqrt(x * x + y * y + z * z + w * w);
    }

    /**
     * Calculates the squared length of a Quat
     *
     * @param a vector to calculate squared length of
     * @returns squared length of a
     * @function
     */
    public static squaredLength(a: Quat): number {
        let x = a[0];
        let y = a[1];
        let z = a[2];
        let w = a[3];
        return x * x + y * y + z * z + w * w;
    }

    /**
     * Normalize a Quat
     *
     * @param out the receiving Quaternion
     * @param src Quaternion to normalize
     * @returns out
     * @function
     */
    public static normalize(src: Quat, out: Quat): Quat {
        let x = src[0];
        let y = src[1];
        let z = src[2];
        let w = src[3];
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
     * Calculates the dot product of two Quat's
     *
     * @param a the first operand
     * @param b the second operand
     * @returns dot product of a and b
     * @function
     */
    public static dot(a: Quat, b: Quat): number {
        return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
    }

    /**
     * Performs a linear interpolation between two Quat's
     *
     * @param out the receiving Quaternion
     * @param a the first operand
     * @param b the second operand
     * @param t interpolation amount between the two inputs
     * @returns out
     * @function
     */
    public static lerp(a: Quat, b: Quat, t: number, out: Quat): Quat {
        let ax = a[0];
        let ay = a[1];
        let az = a[2];
        let aw = a[3];
        out[0] = ax + t * (b[0] - ax);
        out[1] = ay + t * (b[1] - ay);
        out[2] = az + t * (b[2] - az);
        out[3] = aw + t * (b[3] - aw);
        return out;
    }

    /**
     * Performs a spherical linear interpolation between two Quat
     *
     * @param out the receiving Quaternion
     * @param a the first operand
     * @param b the second operand
     * @param t interpolation amount between the two inputs
     * @returns out
     */
    public static slerp(a: Quat, b: Quat, t: number, out: Quat): Quat {
        // benchmarks:
        //    http://jsperf.com/Quaternion-slerp-implementations
        let ax = a[0],
            ay = a[1],
            az = a[2],
            aw = a[3];
        let bx = b[0],
            by = b[1],
            bz = b[2],
            bw = b[3];

        let omega: number = void 0,
            cosom: number = void 0,
            sinom: number = void 0,
            scale0: number = void 0,
            scale1: number = void 0;

        // calc cosine
        cosom = ax * bx + ay * by + az * bz + aw * bw;
        // adjust signs (if necessary)
        if (cosom < 0.0) {
            cosom = -cosom;
            bx = -bx;
            by = -by;
            bz = -bz;
            bw = -bw;
        }
        // calculate coefficients
        if (1.0 - cosom > 0.000001) {
            // standard case (slerp)
            omega = Math.acos(cosom);
            sinom = Math.sin(omega);
            scale0 = Math.sin((1.0 - t) * omega) / sinom;
            scale1 = Math.sin(t * omega) / sinom;
        } else {
            // "from" and "to" Quaternions are very close
            //  ... so we can do a linear interpolation
            scale0 = 1.0 - t;
            scale1 = t;
        }
        // calculate final values
        out[0] = scale0 * ax + scale1 * bx;
        out[1] = scale0 * ay + scale1 * by;
        out[2] = scale0 * az + scale1 * bz;
        out[3] = scale0 * aw + scale1 * bw;

        return out;
    }

    /**
     * Performs a spherical linear interpolation with two control points
     *
     * @param {Quat} out the receiving Quaternion
     * @param {Quat} a the first operand
     * @param {Quat} b the second operand
     * @param {Quat} c the third operand
     * @param {Quat} d the fourth operand
     * @param {number} t interpolation amount
     * @returns {Quat} out
     */
    public static sqlerp(a: Quat, b: Quat, c: Quat, d: Quat, t: number, out: Quat): Quat {
        let temp1 = Quat.create();
        let temp2 = Quat.create();

        Quat.slerp(a, d, t, temp1);
        Quat.slerp(b, c, t, temp2);
        Quat.slerp(temp1, temp2, 2 * t * (1 - t), out);

        return out;
    }

    /**
     * Calculates the inverse of a Quat
     *
     * @param out the receiving Quaternion
     * @param a Quat to calculate inverse of
     * @returns out
     */
    public static inverse(a: Quat, out: Quat): Quat {
        let a0 = a[0],
            a1 = a[1],
            a2 = a[2],
            a3 = a[3];
        let dot = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3;
        let invDot = dot ? 1.0 / dot : 0;

        // TODO: Would be faster to return [0,0,0,0] immediately if dot == 0

        out[0] = -a0 * invDot;
        out[1] = -a1 * invDot;
        out[2] = -a2 * invDot;
        out[3] = a3 * invDot;
        return out;
    }
    /**
     * Calculates the conjugate of a Quat
     * If the Quaternion is normalized, this function is faster than Quat.inverse and produces the same result.
     *
     * @param out the receiving Quaternion
     * @param a Quat to calculate conjugate of
     * @returns out
     */
    public static conjugate(out: Quat, a: Quat): Quat {
        out[0] = -a[0];
        out[1] = -a[1];
        out[2] = -a[2];
        out[3] = a[3];
        return out;
    }

    /**
     * Returns a string representation of a Quaternion
     *
     * @param a Quat to represent as a string
     * @returns string representation of the Quat
     */
    public static str(a: Quat): string {
        return "Quat(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")";
    }

    /**
     * Rotates a Quaternion by the given angle about the X axis
     *
     * @param out Quat receiving operation result
     * @param a Quat to rotate
     * @param rad angle (in radians) to rotate
     * @returns out
     */
    public static rotateX(a: Quat, rad: number, out: Quat): Quat {
        rad *= 0.5;

        let ax = a[0],
            ay = a[1],
            az = a[2],
            aw = a[3];
        let bx = Math.sin(rad),
            bw = Math.cos(rad);

        out[0] = ax * bw + aw * bx;
        out[1] = ay * bw + az * bx;
        out[2] = az * bw - ay * bx;
        out[3] = aw * bw - ax * bx;
        return out;
    }

    /**
     * Rotates a Quaternion by the given angle about the Y axis
     *
     * @param out Quat receiving operation result
     * @param a Quat to rotate
     * @param rad angle (in radians) to rotate
     * @returns out
     */
    public static rotateY(a: Quat, rad: number, out: Quat): Quat {
        rad *= 0.5;

        let ax = a[0],
            ay = a[1],
            az = a[2],
            aw = a[3];
        let by = Math.sin(rad),
            bw = Math.cos(rad);

        out[0] = ax * bw - az * by;
        out[1] = ay * bw + aw * by;
        out[2] = az * bw + ax * by;
        out[3] = aw * bw - ay * by;
        return out;
    }

    /**
     * Rotates a Quaternion by the given angle about the Z axis
     *
     * @param out Quat receiving operation result
     * @param a Quat to rotate
     * @param rad angle (in radians) to rotate
     * @returns out
     */
    public static rotateZ(a: Quat, rad: number, out: Quat): Quat {
        rad *= 0.5;

        let ax = a[0],
            ay = a[1],
            az = a[2],
            aw = a[3];
        let bz = Math.sin(rad),
            bw = Math.cos(rad);

        out[0] = ax * bw + ay * bz;
        out[1] = ay * bw - ax * bz;
        out[2] = az * bw + aw * bz;
        out[3] = aw * bw - az * bz;
        return out;
    }

    /**
     * Creates a Quaternion from the given 3x3 rotation matrix.
     *
     * NOTE: The resultant Quaternion is not normalized, so you should be sure
     * to renormalize the Quaternion yourself where necessary.
     *
     * @param out the receiving Quaternion
     * @param m rotation matrix
     * @returns out
     * @function
     */
    public static fromMat3(m: Mat3, out: Quat): Quat {
        // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
        // article "Quaternion Calculus and Fast Animation".
        let fTrace = m[0] + m[4] + m[8];
        let fRoot: number = void 0;

        if (fTrace > 0.0) {
            // |w| > 1/2, may as well choose w > 1/2
            fRoot = Math.sqrt(fTrace + 1.0); // 2w
            out[3] = 0.5 * fRoot;
            fRoot = 0.5 / fRoot; // 1/(4w)
            out[0] = (m[5] - m[7]) * fRoot;
            out[1] = (m[6] - m[2]) * fRoot;
            out[2] = (m[1] - m[3]) * fRoot;
        } else {
            // |w| <= 1/2
            let i = 0;
            if (m[4] > m[0]) i = 1;
            if (m[8] > m[i * 3 + i]) i = 2;
            let j = (i + 1) % 3;
            let k = (i + 2) % 3;

            fRoot = Math.sqrt(m[i * 3 + i] - m[j * 3 + j] - m[k * 3 + k] + 1.0);
            out[i] = 0.5 * fRoot;
            fRoot = 0.5 / fRoot;
            out[3] = (m[j * 3 + k] - m[k * 3 + j]) * fRoot;
            out[j] = (m[j * 3 + i] + m[i * 3 + j]) * fRoot;
            out[k] = (m[k * 3 + i] + m[i * 3 + k]) * fRoot;
        }

        return out;
    }

    /**
     * Sets the specified Quaternion with values corresponding to the given
     * axes. Each axis is a Vec3 and is expected to be unit length and
     * perpendicular to all other specified axes.
     *
     * @param out the receiving Quat
     * @param view  the vector representing the viewing direction
     * @param right the vector representing the local "right" direction
     * @param up    the vector representing the local "up" direction
     * @returns out
     */
    public static setAxes(view: Vec3, right: Vec3, up: Vec3, out: Quat): Quat {
        let matr = Mat3.create();

        matr[0] = right[0];
        matr[3] = right[1];
        matr[6] = right[2];

        matr[1] = up[0];
        matr[4] = up[1];
        matr[7] = up[2];

        matr[2] = -view[0];
        matr[5] = -view[1];
        matr[8] = -view[2];
        Quat.fromMat3(matr, out);
        matr = null;

        return Quat.normalize(out, out);
    }

    /**
     * Calculates the W component of a Quat from the X, Y, and Z components.
     * Assumes that Quaternion is 1 unit in length.
     * Any existing W component will be ignored.
     *
     * @param out the receiving Quaternion
     * @param a Quat to calculate W component of
     * @returns out
     */
    public static calculateW(a: Quat, out: Quat): Quat {
        let x = a[0],
            y = a[1],
            z = a[2];

        out[0] = x;
        out[1] = y;
        out[2] = z;
        out[3] = Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z));
        return out;
    }

    /**
     * Returns whether or not the Quaternions have exactly the same elements in the same position (when compared with ===)
     *
     * @param {Quat} a The first vector.
     * @param {Quat} b The second vector.
     * @returns {boolean} True if the Quaternions are equal, false otherwise.
     */
    public static exactEquals(a: Quat, b: Quat): boolean {
        return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
    }

    // /**
    //  * Returns whether or not the Quaternions have approximately the same elements in the same position.
    //  *
    //  * @param {Quat} a The first vector.
    //  * @param {Quat} b The second vector.
    //  * @returns {boolean} True if the Quaternions are equal, false otherwise.
    //  */
    // public static equals (a: Quat, b: Quat): boolean{
    //     let a0 = a[0],
    //     a1 = a[1],
    //     a2 = a[2],
    //     a3 = a[3];
    // let b0 = b[0],
    //     b1 = b[1],
    //     b2 = b[2],
    //     b3 = b[3];
    // return Math.abs(a0 - b0) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3));

    // }
    static fromYawPitchRoll(yaw: number, pitch: number, roll: number, result: Quat): void {
        // Produces a Quaternion from Euler angles in the z-y-x orientation (Tait-Bryan angles)
        let halfRoll = roll * 0.5;
        let halfPitch = pitch * 0.5;
        let halfYaw = yaw * 0.5;

        let sinRoll = Math.sin(halfRoll);
        let cosRoll = Math.cos(halfRoll);
        let sinPitch = Math.sin(halfPitch);
        let cosPitch = Math.cos(halfPitch);
        let sinYaw = Math.sin(halfYaw);
        let cosYaw = Math.cos(halfYaw);

        result[0] = cosYaw * sinPitch * cosRoll + sinYaw * cosPitch * sinRoll;
        result[1] = sinYaw * cosPitch * cosRoll - cosYaw * sinPitch * sinRoll;
        result[2] = cosYaw * cosPitch * sinRoll - sinYaw * sinPitch * cosRoll;
        result[3] = cosYaw * cosPitch * cosRoll + sinYaw * sinPitch * sinRoll;
    }
    /**舍弃glmatrix 的fromeuler  （坐标系不同算法不同）
     * Creates a Quaternion from the given euler angle x, y, z.
     * rot order： z-y-x
     * @param {x} Angle to rotate around X axis in degrees.
     * @param {y} Angle to rotate around Y axis in degrees.
     * @param {z} Angle to rotate around Z axis in degrees.
     * @param {Quat} out the receiving Quaternion
     * @returns {Quat} out
     * @function
     */
    static FromEuler(x: number, y: number, z: number, out: Quat): Quat {
        x *= (0.5 * Math.PI) / 180;
        y *= (0.5 * Math.PI) / 180;
        z *= (0.5 * Math.PI) / 180;

        let cosX: number = Math.cos(x),
            sinX: number = Math.sin(x);
        let cosY: number = Math.cos(y),
            sinY: number = Math.sin(y);
        let cosZ: number = Math.cos(z),
            sinZ: number = Math.sin(z);

        out[0] = sinX * cosY * cosZ + cosX * sinY * sinZ;
        out[1] = cosX * sinY * cosZ - sinX * cosY * sinZ;
        out[2] = cosX * cosY * sinZ - sinX * sinY * cosZ;
        out[3] = cosX * cosY * cosZ + sinX * sinY * sinZ;

        this.normalize(out, out);
        return out;
    }
    static ToEuler(src: Quat, out: Vec3) {
        let x = src[0],
            y = src[1],
            z = src[2],
            w = src[3];
        let temp: number = 2.0 * (w * x - y * z);
        temp = clamp(temp, -1.0, 1.0);
        out[0] = Math.asin(temp);
        out[1] = Math.atan2(2.0 * (w * y + z * x), 1.0 - 2.0 * (y * y + x * x));
        out[2] = Math.atan2(2.0 * (w * z + y * x), 1.0 - 2.0 * (x * x + z * z));

        out[0] /= Math.PI / 180;
        out[1] /= Math.PI / 180;
        out[2] /= Math.PI / 180;
    }

    /**
     * Sets a Quat from the given angle and rotation axis,
     * then returns it.
     *
     * @param out the receiving Quaternion
     * @param axis the axis around which to rotate
     * @param rad （弧度）the angle in radians
     * @returns out
     **/
    public static AxisAngle(axis: Vec3, rad: number, out: Quat): Quat {
        rad = rad * 0.5;
        let s = Math.sin(rad);
        out[0] = s * axis[0];
        out[1] = s * axis[1];
        out[2] = s * axis[2];
        out[3] = Math.cos(rad);
        return out;
    }

    /**
     * Sets a Quaternion to represent the shortest rotation from one
     * vector to another.
     *
     * Both vectors are assumed to be unit length.
     *
     * @param out the receiving Quaternion.
     * @param from the initial vector
     * @param to the destination vector
     * @returns out
     */
    public static rotationTo(from: Vec3, to: Vec3, out: Quat): Quat {
        let tmpVec3 = Vec3.create();
        let xUnitVec3 = Vec3.RIGHT;
        let yUnitVec3 = Vec3.UP;

        let dot = Vec3.dot(from, to);
        if (dot < -0.999999) {
            Vec3.cross(tmpVec3, xUnitVec3, from);
            if (Vec3.magnitude(tmpVec3) < 0.000001) Vec3.cross(tmpVec3, yUnitVec3, from);
            Vec3.normalize(tmpVec3, tmpVec3);
            Quat.AxisAngle(tmpVec3, Math.PI, out);
            return out;
        } else if (dot > 0.999999) {
            out[0] = 0;
            out[1] = 0;
            out[2] = 0;
            out[3] = 1;
            return out;
        } else {
            Vec3.cross(tmpVec3, from, to);
            out[0] = tmpVec3[0];
            out[1] = tmpVec3[1];
            out[2] = tmpVec3[2];
            out[3] = 1 + dot;
            return Quat.normalize(out, out);
        }
    }
    static myLookRotation(dir: Vec3, out: Quat, up: Vec3 = Vec3.UP) {
        if (Vec3.exactEquals(dir, Vec3.ZERO)) {
            console.log("Zero direction in MyLookRotation");
            return Quat.norot;
        }
        if (!Vec3.exactEquals(dir, up)) {
            let tempv = Vec3.create();
            Vec3.scale(up, Vec3.dot(up, dir), tempv);
            Vec3.subtract(dir, tempv, tempv);
            let qu = Quat.create();
            this.rotationTo(Vec3.FORWARD, tempv, qu);
            let qu2 = Quat.create();
            this.rotationTo(tempv, dir, qu2);
            Quat.multiply(qu, qu2, out);
        } else {
            this.rotationTo(Vec3.FORWARD, dir, out);
        }
    }
    // /**
    //  *
    //  * @param pos transform self pos
    //  * @param targetpos targetpos
    //  * @param out
    //  * @param up
    //  */
    // static lookat(pos: Vec3, targetpos: Vec3, out: Quat,up:Vec3=Vec3.UP)
    // {
    //     let baseDir=Vec3.BACKWARD;

    //     let dir = Vec3.create();
    //     Vec3.subtract(targetpos, pos, dir);
    //     Vec3.normalize(dir, dir);
    //     let dot = Vec3.dot(baseDir, dir);
    //     if (Math.abs(dot - (-1.0)) < 0.000001)
    //     {
    //         this.AxisAngle(Vec3.UP, Math.PI, out);
    //     }else if(Math.abs(dot - 1.0) < 0.000001)
    //     {
    //         Quat.identity(out);
    //     }else
    //     {
    //         dot = clamp(dot, -1, 1);
    //         let rotangle = Math.acos(dot);
    //         let rotAxis = Vec3.create();
    //         Vec3.cross(baseDir, dir, rotAxis);
    //         Vec3.normalize(rotAxis,rotAxis);
    //         Quat.AxisAngle(rotAxis, rotangle, out);
    //     }

    //     let targetdirx:Vec3=Vec3.create();
    //     Vec3.cross(up,out,targetdirx);
    //     let dotx = Vec3.dot(targetdirx,Vec3.RIGHT);
    //     let rot2=Quat.create();
    //     if (Math.abs(dotx - 1.0) < 0.000001)
    //     {
    //     }else if(Math.abs(dotx - 1.0) < 0.000001)
    //     {
    //         this.AxisAngle(Vec3.FORWARD, Math.PI, rot2);
    //         Quat.multiply(out,rot2,out);
    //     }else
    //     {
    //         let rotAxis=Vec3.create();
    //         Vec3.cross(Vec3.RIGHT,targetdirx,rotAxis);
    //         dotx = clamp(dotx, -1, 1);
    //         let rotangle = Math.acos(dotx);
    //         Quat.AxisAngle(rotAxis, rotangle, rot2);
    //         Quat.multiply(out,rot2,out);
    //     }

    //     Vec3.recycle(dir);
    //     // Vec3.recycle(rotAxis);

    //     // let dir = Vec3.create();
    //     // Vec3.subtract(targetpos, pos, dir);
    //     // Vec3.normalize(dir, dir);
    //     // this.rotationTo(Vec3.BACKWARD,dir,out);
    // }

    static LookRotation(lookAt: Vec3, up: Vec3 = Vec3.UP) {
        /*Vector forward = lookAt.Normalized();
            Vector right = Vector::Cross(up.Normalized(), forward);
            Vector up = Vector::Cross(forward, right);*/

        // Vector forward = lookAt.Normalized();
        // Vector::OrthoNormalize(&up, &forward); // Keeps up the same, make forward orthogonal to up
        // Vector right = Vector::Cross(up, forward);

        // Quaternion ret;
        // ret.w = sqrtf(1.0f + right.x + up.y + forward.z) * 0.5f;
        // float w4_recip = 1.0f / (4.0f * ret.w);
        // ret.x = (forward.y - up.z) * w4_recip;
        // ret.y = (right.z - forward.x) * w4_recip;
        // ret.z = (up.x - right.y) * w4_recip;

        // return ret;

        let forward = Vec3.create();
        Vec3.normalize(lookAt, forward);
        let right = Vec3.create();
        Vec3.cross(up, forward, right);
    }

    static transformVector(src: Quat, vector: Vec3, out: Vec3) {
        var x1: number, y1: number, z1: number, w1: number;
        var x2: number = vector[0],
            y2: number = vector[1],
            z2: number = vector[2];

        w1 = -src[0] * x2 - src[1] * y2 - src[2] * z2;
        x1 = src[3] * x2 + src[1] * z2 - src[2] * y2;
        y1 = src[3] * y2 - src[0] * z2 + src[2] * x2;
        z1 = src[3] * z2 + src[0] * y2 - src[1] * x2;

        out.x = -w1 * src[0] + x1 * src[3] - y1 * src[2] + z1 * src[1];
        out.y = -w1 * src[1] + x1 * src[2] + y1 * src[3] - z1 * src[0];
        out.z = -w1 * src[2] - x1 * src[1] + y1 * src[0] + z1 * src[3];
    }
    static fromUnitXYZ(xAxis: Vec3, yAxis: Vec3, zAxis: Vec3, out: Quat=Quat.create()) {
        var m11 = xAxis[0],
            m12 = yAxis[0],
            m13 = zAxis[0];
        var m21 = xAxis[1],
            m22 = yAxis[1],
            m23 = zAxis[1];
        var m31 = xAxis[2],
            m32 = yAxis[2],
            m33 = zAxis[2];
        var trace = m11 + m22 + m33;
        var s;
        if (trace > 0) {
            s = 0.5 / Math.sqrt(trace + 1.0);

            out.w = 0.25 / s;
            out.x = (m32 - m23) * s;
            out.y = (m13 - m31) * s;
            out.z = (m21 - m12) * s;
        } else if (m11 > m22 && m11 > m33) {
            s = 2.0 * Math.sqrt(1.0 + m11 - m22 - m33);

            out.w = (m32 - m23) / s;
            out.x = 0.25 * s;
            out.y = (m12 + m21) / s;
            out.z = (m13 + m31) / s;
        } else if (m22 > m33) {
            s = 2.0 * Math.sqrt(1.0 + m22 - m11 - m33);

            out.w = (m13 - m31) / s;
            out.x = (m12 + m21) / s;
            out.y = 0.25 * s;
            out.z = (m23 + m32) / s;
        } else {
            s = 2.0 * Math.sqrt(1.0 + m33 - m11 - m22);

            out.w = (m21 - m12) / s;
            out.x = (m13 + m31) / s;
            out.y = (m23 + m32) / s;
            out.z = 0.25 * s;
        }
        return out;
    }
    static lookat(pos: Vec3, targetpos: Vec3, out: Quat, up: Vec3 = Vec3.UP) {
        // let baseDir=Vec3.BACKWARD;
        let dirz = Vec3.create();
        Vec3.subtract(pos, targetpos, dirz);
        Vec3.normalize(dirz, dirz);

        let dirx: Vec3 = Vec3.create();
        Vec3.cross(up, dirz, dirx);
        Vec3.normalize(dirx, dirx);

        let diry: Vec3 = Vec3.create();
        Vec3.cross(dirz, dirx, diry);
        // Vec3.normalize(diry, diry);

        this.fromUnitXYZ(dirx, diry, dirz, out);

        Vec3.recycle(dirx);
        Vec3.recycle(diry);
        Vec3.recycle(dirz);
    }

    /**
     * Returns whether or not the vectors have approximately the same elements in the same Quat.
     *
     * @param {vec4} a The first vector.
     * @param {vec4} b The second vector.
     * @returns {boolean} True if the vectors are equal, false otherwise.
     */
    public static equals(a: Quat, b: Quat): boolean {
        let a0 = a[0],
            a1 = a[1],
            a2 = a[2],
            a3 = a[3];
        let b0 = b[0],
            b1 = b[1],
            b2 = b[2],
            b3 = b[3];
        return (
            Math.abs(a0 - b0) <= EPSILON &&
            Math.abs(a1 - b1) <= EPSILON &&
            Math.abs(a2 - b2) <= EPSILON &&
            Math.abs(a3 - b3) <= EPSILON
        );
    }
    /**
     *
     * @param from
     * @param to
     * @param out
     */
    static fromToRotation(from: Vec3, to: Vec3, out: Quat) {
        let dir1 = Vec3.create();
        let dir2 = Vec3.create();

        Vec3.normalize(from, dir1);
        Vec3.normalize(to, dir2);

        let dir = Vec3.create();
        Vec3.cross(dir1, dir2, dir);
        if (Vec3.magnitude(dir) < 0.001) {
            Quat.identity(out);
        } else {
            let dot = Vec3.dot(dir1, dir2);
            Vec3.normalize(dir, dir);
            Quat.AxisAngle(dir, Math.acos(dot), out);
        }
        Vec3.recycle(dir);
        Vec3.recycle(dir1);
        Vec3.recycle(dir2);
    }
}
