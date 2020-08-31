import { Mat4 } from "./mat4";
import { Vec2 } from "./vec2";
import { Mat2d } from "./mat2d";
import { EPSILON } from "./common";
import { Quat } from "./quat";

export class Mat3 extends Float32Array {
    private static Recycle: Mat3[] = [];
    public static create(): Mat3 {
        if (Mat3.Recycle && Mat3.Recycle.length > 0) {
            const item = Mat3.Recycle.pop();
            Mat3.identity(item);
            return item;
        } else {
            const item = new Float32Array(9);
            item[0] = 1;
            item[4] = 1;
            item[8] = 1;
            return item;
        }
    }

    public static clone(from: Mat3): Mat3 {
        if (Mat3.Recycle.length > 0) {
            const item = Mat3.Recycle.pop();
            Mat3.copy(from, item);
            return item;
        } else {
            const out = new Float32Array(9);
            out[0] = from[0];
            out[1] = from[1];
            out[2] = from[2];
            out[3] = from[3];
            out[4] = from[4];
            out[5] = from[5];
            out[6] = from[6];
            out[7] = from[7];
            out[8] = from[8];
            return out;
        }
    }

    public static recycle(item: Mat3) {
        Mat3.Recycle.push(item);
    }

    public static disposeRecycledItems() {
        Mat3.Recycle.length = 0;
    }

    constructor() {
        super(9);
        this[0] = 1;
        this[4] = 1;
        this[8] = 1;
    }

    /**
     * Copies the upper-left 3x3 values into the given mat3.
     *
     * @param {Mat3} out the receiving 3x3 matrix
     * @param {mat4} a   the source 4x4 matrix
     * @returns {Mat3} out
     */
    public static fromMat4(a: Mat4, out: Mat3) {
        out[0] = a[0];
        out[1] = a[1];
        out[2] = a[2];
        out[3] = a[4];
        out[4] = a[5];
        out[5] = a[6];
        out[6] = a[8];
        out[7] = a[9];
        out[8] = a[10];
        return out;
    }

    /**
     * Copy the values from one mat3 to another
     *
     * @param {Mat3} out the receiving matrix
     * @param {Mat3} a the source matrix
     * @returns {Mat3} out
     */
    public static copy(a: Mat3, out: Mat3) {
        out[0] = a[0];
        out[1] = a[1];
        out[2] = a[2];
        out[3] = a[3];
        out[4] = a[4];
        out[5] = a[5];
        out[6] = a[6];
        out[7] = a[7];
        out[8] = a[8];
        return out;
    }

    /**
     * Set a mat3 to the identity matrix
     *
     * @param {Mat3} out the receiving matrix
     * @returns {Mat3} out
     */
    public static identity(out: Mat3) {
        out[0] = 1;
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
        out[4] = 1;
        out[5] = 0;
        out[6] = 0;
        out[7] = 0;
        out[8] = 1;
        return out;
    }

    /**
     * Transpose the values of a mat3
     *
     * @param {Mat3} out the receiving matrix
     * @param {Mat3} a the source matrix
     * @returns {Mat3} out
     */
    public static transpose(a: Mat3, out: Mat3) {
        // If we are transposing ourselves we can skip a few steps but have to cache some values
        if (out === a) {
            const a01 = a[1];
            const a02 = a[2];
            const a12 = a[5];
            out[1] = a[3];
            out[2] = a[6];
            out[3] = a01;
            out[5] = a[7];
            out[6] = a02;
            out[7] = a12;
        } else {
            out[0] = a[0];
            out[1] = a[3];
            out[2] = a[6];
            out[3] = a[1];
            out[4] = a[4];
            out[5] = a[7];
            out[6] = a[2];
            out[7] = a[5];
            out[8] = a[8];
        }

        return out;
    }

    /**
     * Inverts a mat3
     *
     * @param {Mat3} out the receiving matrix
     * @param {Mat3} a the source matrix
     * @returns {Mat3} out
     */
    public static invert(a: Mat3, out: Mat3) {
        const a00 = a[0];
        const a01 = a[1];
        const a02 = a[2];
        const a10 = a[3];
        const a11 = a[4];
        const a12 = a[5];
        const a20 = a[6];
        const a21 = a[7];
        const a22 = a[8];

        const b01 = a22 * a11 - a12 * a21;
        const b11 = -a22 * a10 + a12 * a20;
        const b21 = a21 * a10 - a11 * a20;

        // Calculate the determinant
        let det = a00 * b01 + a01 * b11 + a02 * b21;

        if (!det) {
            return null;
        }
        det = 1.0 / det;

        out[0] = b01 * det;
        out[1] = (-a22 * a01 + a02 * a21) * det;
        out[2] = (a12 * a01 - a02 * a11) * det;
        out[3] = b11 * det;
        out[4] = (a22 * a00 - a02 * a20) * det;
        out[5] = (-a12 * a00 + a02 * a10) * det;
        out[6] = b21 * det;
        out[7] = (-a21 * a00 + a01 * a20) * det;
        out[8] = (a11 * a00 - a01 * a10) * det;
        return out;
    }

    /**
     * Calculates the adjugate of a mat3
     *
     * @param {Mat3} out the receiving matrix
     * @param {Mat3} a the source matrix
     * @returns {Mat3} out
     */
    public static adjoint(a: Mat3, out: Mat3) {
        const a00 = a[0];
        const a01 = a[1];
        const a02 = a[2];
        const a10 = a[3];
        const a11 = a[4];
        const a12 = a[5];
        const a20 = a[6];
        const a21 = a[7];
        const a22 = a[8];

        out[0] = a11 * a22 - a12 * a21;
        out[1] = a02 * a21 - a01 * a22;
        out[2] = a01 * a12 - a02 * a11;
        out[3] = a12 * a20 - a10 * a22;
        out[4] = a00 * a22 - a02 * a20;
        out[5] = a02 * a10 - a00 * a12;
        out[6] = a10 * a21 - a11 * a20;
        out[7] = a01 * a20 - a00 * a21;
        out[8] = a00 * a11 - a01 * a10;
        return out;
    }

    /**
     * Calculates the determinant of a mat3
     *
     * @param {Mat3} a the source matrix
     * @returns {Number} determinant of a
     */
    public static determinant(a: Mat3) {
        const a00 = a[0];
        const a01 = a[1];
        const a02 = a[2];
        const a10 = a[3];
        const a11 = a[4];
        const a12 = a[5];
        const a20 = a[6];
        const a21 = a[7];
        const a22 = a[8];

        return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
    }

    /**
     * Multiplies two mat3's
     *
     * @param {Mat3} out the receiving matrix
     * @param {Mat3} a the first operand
     * @param {Mat3} b the second operand
     * @returns {Mat3} out
     */
    public static multiply(a: Mat3, b: Mat3, out: Mat3) {
        const a00 = a[0];
        const a01 = a[1];
        const a02 = a[2];
        const a10 = a[3];
        const a11 = a[4];
        const a12 = a[5];
        const a20 = a[6];
        const a21 = a[7];
        const a22 = a[8];

        const b00 = b[0];
        const b01 = b[1];
        const b02 = b[2];
        const b10 = b[3];
        const b11 = b[4];
        const b12 = b[5];
        const b20 = b[6];
        const b21 = b[7];
        const b22 = b[8];

        out[0] = b00 * a00 + b01 * a10 + b02 * a20;
        out[1] = b00 * a01 + b01 * a11 + b02 * a21;
        out[2] = b00 * a02 + b01 * a12 + b02 * a22;

        out[3] = b10 * a00 + b11 * a10 + b12 * a20;
        out[4] = b10 * a01 + b11 * a11 + b12 * a21;
        out[5] = b10 * a02 + b11 * a12 + b12 * a22;

        out[6] = b20 * a00 + b21 * a10 + b22 * a20;
        out[7] = b20 * a01 + b21 * a11 + b22 * a21;
        out[8] = b20 * a02 + b21 * a12 + b22 * a22;
        return out;
    }

    /**
     * Translate a mat3 by the given vector
     *
     * @param {Mat3} out the receiving matrix
     * @param {Mat3} a the matrix to translate
     * @param {vec2} v vector to translate by
     * @returns {Mat3} out
     */
    public static translate(a: Mat3, v: Mat3, out: Mat3) {
        const a00 = a[0];
        const a01 = a[1];
        const a02 = a[2];
        const a10 = a[3];
        const a11 = a[4];
        const a12 = a[5];
        const a20 = a[6];
        const a21 = a[7];
        const a22 = a[8];
        const x = v[0];
        const y = v[1];

        out[0] = a00;
        out[1] = a01;
        out[2] = a02;

        out[3] = a10;
        out[4] = a11;
        out[5] = a12;

        out[6] = x * a00 + y * a10 + a20;
        out[7] = x * a01 + y * a11 + a21;
        out[8] = x * a02 + y * a12 + a22;
        return out;
    }

    /**
     * Rotates a mat3 by the given angle
     *
     * @param {Mat3} out the receiving matrix
     * @param {Mat3} a the matrix to rotate
     * @param {Number} rad the angle to rotate the matrix by
     * @returns {Mat3} out
     */
    public static rotate(a: Mat3, rad: number, out: Mat3) {
        const a00 = a[0];
        const a01 = a[1];
        const a02 = a[2];
        const a10 = a[3];
        const a11 = a[4];
        const a12 = a[5];
        const a20 = a[6];
        const a21 = a[7];
        const a22 = a[8];
        const s = Math.sin(rad);
        const c = Math.cos(rad);

        out[0] = c * a00 + s * a10;
        out[1] = c * a01 + s * a11;
        out[2] = c * a02 + s * a12;

        out[3] = c * a10 - s * a00;
        out[4] = c * a11 - s * a01;
        out[5] = c * a12 - s * a02;

        out[6] = a20;
        out[7] = a21;
        out[8] = a22;
        return out;
    }

    /**
     * Scales the mat3 by the dimensions in the given vec2
     *
     * @param {Mat3} out the receiving matrix
     * @param {Mat3} a the matrix to rotate
     * @param {vec2} v the vec2 to scale the matrix by
     * @returns {Mat3} out
     **/
    public static scale(a: Mat3, v: Vec2, out: Mat3) {
        const x = v[0];
        const y = v[1];

        out[0] = x * a[0];
        out[1] = x * a[1];
        out[2] = x * a[2];

        out[3] = y * a[3];
        out[4] = y * a[4];
        out[5] = y * a[5];

        out[6] = a[6];
        out[7] = a[7];
        out[8] = a[8];
        return out;
    }

    /**
     * Creates a matrix from a vector translation
     * This is equivalent to (but much faster than):
     *
     *     mat3.identity(dest);
     *     mat3.translate(dest, dest, vec);
     *
     * @param {Mat3} out mat3 receiving operation result
     * @param {vec2} v Translation vector
     * @returns {Mat3} out
     */
    public static fromTranslation(v: Vec2, out: Mat3) {
        out[0] = 1;
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
        out[4] = 1;
        out[5] = 0;
        out[6] = v[0];
        out[7] = v[1];
        out[8] = 1;
        return out;
    }

    /**
     * Creates a matrix from a given angle
     * This is equivalent to (but much faster than):
     *
     *     mat3.identity(dest);
     *     mat3.rotate(dest, dest, rad);
     *
     * @param {Mat3} out mat3 receiving operation result
     * @param {Number} rad the angle to rotate the matrix by
     * @returns {Mat3} out
     */
    public static fromRotation(rad: number, out: Mat3) {
        const s = Math.sin(rad);
        const c = Math.cos(rad);

        out[0] = c;
        out[1] = s;
        out[2] = 0;

        out[3] = -s;
        out[4] = c;
        out[5] = 0;

        out[6] = 0;
        out[7] = 0;
        out[8] = 1;
        return out;
    }

    /**
     * Creates a matrix from a vector scaling
     * This is equivalent to (but much faster than):
     *
     *     mat3.identity(dest);
     *     mat3.scale(dest, dest, vec);
     *
     * @param {Mat3} out mat3 receiving operation result
     * @param {vec2} v Scaling vector
     * @returns {Mat3} out
     */
    public static fromScaling(v: Vec2, out: Mat3) {
        out[0] = v[0];
        out[1] = 0;
        out[2] = 0;

        out[3] = 0;
        out[4] = v[1];
        out[5] = 0;

        out[6] = 0;
        out[7] = 0;
        out[8] = 1;
        return out;
    }

    /**
     * Copies the values from a mat2d into a mat3
     *
     * @param {Mat3} out the receiving matrix
     * @param {mat2d} a the matrix to copy
     * @returns {Mat3} out
     **/
    public static fromMat2d(a: Mat2d, out: Mat3) {
        out[0] = a[0];
        out[1] = a[1];
        out[2] = 0;

        out[3] = a[2];
        out[4] = a[3];
        out[5] = 0;

        out[6] = a[4];
        out[7] = a[5];
        out[8] = 1;
        return out;
    }

    /**
     * Calculates a 3x3 matrix from the given quaternion
     *
     * @param {Mat3} out mat3 receiving operation result
     * @param {quat} q Quaternion to create matrix from
     *
     * @returns {Mat3} out
     */
    public static fromQuat(q: Quat, out: Mat3) {
        const x = q[0];
        const y = q[1];
        const z = q[2];
        const w = q[3];
        const x2 = x + x;
        const y2 = y + y;
        const z2 = z + z;

        const xx = x * x2;
        const yx = y * x2;
        const yy = y * y2;
        const zx = z * x2;
        const zy = z * y2;
        const zz = z * z2;
        const wx = w * x2;
        const wy = w * y2;
        const wz = w * z2;

        out[0] = 1 - yy - zz;
        out[3] = yx - wz;
        out[6] = zx + wy;

        out[1] = yx + wz;
        out[4] = 1 - xx - zz;
        out[7] = zy - wx;

        out[2] = zx - wy;
        out[5] = zy + wx;
        out[8] = 1 - xx - yy;

        return out;
    }

    /**
     * Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix
     *
     * @param {Mat3} out mat3 receiving operation result
     * @param {mat4} a Mat4 to derive the normal matrix from
     *
     * @returns {Mat3} out
     */
    public static normalFromMat4(a: Mat4, out: Mat3) {
        const a00 = a[0];
        const a01 = a[1];
        const a02 = a[2];
        const a03 = a[3];
        const a10 = a[4];
        const a11 = a[5];
        const a12 = a[6];
        const a13 = a[7];
        const a20 = a[8];
        const a21 = a[9];
        const a22 = a[10];
        const a23 = a[11];
        const a30 = a[12];
        const a31 = a[13];
        const a32 = a[14];
        const a33 = a[15];

        const b00 = a00 * a11 - a01 * a10;
        const b01 = a00 * a12 - a02 * a10;
        const b02 = a00 * a13 - a03 * a10;
        const b03 = a01 * a12 - a02 * a11;
        const b04 = a01 * a13 - a03 * a11;
        const b05 = a02 * a13 - a03 * a12;
        const b06 = a20 * a31 - a21 * a30;
        const b07 = a20 * a32 - a22 * a30;
        const b08 = a20 * a33 - a23 * a30;
        const b09 = a21 * a32 - a22 * a31;
        const b10 = a21 * a33 - a23 * a31;
        const b11 = a22 * a33 - a23 * a32;

        // Calculate the determinant
        let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

        if (!det) {
            return null;
        }
        det = 1.0 / det;

        out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
        out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
        out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;

        out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
        out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
        out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;

        out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
        out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
        out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;

        return out;
    }

    /**
     * Generates a 2D projection matrix with the given bounds
     *
     * @param {Mat3} out mat3 frustum matrix will be written into
     * @param {number} width Width of your gl context
     * @param {number} height Height of gl context
     * @returns {Mat3} out
     */
    public static projection(width: number, height: number, out: Mat3) {
        out[0] = 2 / width;
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
        out[4] = -2 / height;
        out[5] = 0;
        out[6] = -1;
        out[7] = 1;
        out[8] = 1;
        return out;
    }

    /**
     * Returns a string representation of a mat3
     *
     * @param {Mat3} a matrix to represent as a string
     * @returns {String} string representation of the matrix
     */
    public static str(a: Mat3) {
        return (
            "mat3(" +
            a[0] +
            ", " +
            a[1] +
            ", " +
            a[2] +
            ", " +
            a[3] +
            ", " +
            a[4] +
            ", " +
            a[5] +
            ", " +
            a[6] +
            ", " +
            a[7] +
            ", " +
            a[8] +
            ")"
        );
    }

    /**
     * Returns Frobenius norm of a mat3
     *
     * @param {Mat3} a the matrix to calculate Frobenius norm of
     * @returns {Number} Frobenius norm
     */
    public static frob(a: Mat3) {
        return Math.sqrt(
            Math.pow(a[0], 2) +
                Math.pow(a[1], 2) +
                Math.pow(a[2], 2) +
                Math.pow(a[3], 2) +
                Math.pow(a[4], 2) +
                Math.pow(a[5], 2) +
                Math.pow(a[6], 2) +
                Math.pow(a[7], 2) +
                Math.pow(a[8], 2)
        );
    }

    /**
     * Adds two mat3's
     *
     * @param {Mat3} out the receiving matrix
     * @param {Mat3} a the first operand
     * @param {Mat3} b the second operand
     * @returns {Mat3} out
     */
    public static add(a: Mat3, b: Mat3, out: Mat3) {
        out[0] = a[0] + b[0];
        out[1] = a[1] + b[1];
        out[2] = a[2] + b[2];
        out[3] = a[3] + b[3];
        out[4] = a[4] + b[4];
        out[5] = a[5] + b[5];
        out[6] = a[6] + b[6];
        out[7] = a[7] + b[7];
        out[8] = a[8] + b[8];
        return out;
    }

    /**
     * Subtracts matrix b from matrix a
     *
     * @param {Mat3} out the receiving matrix
     * @param {Mat3} a the first operand
     * @param {Mat3} b the second operand
     * @returns {Mat3} out
     */
    public static subtract(a: Mat3, b: Mat3, out: Mat3) {
        out[0] = a[0] - b[0];
        out[1] = a[1] - b[1];
        out[2] = a[2] - b[2];
        out[3] = a[3] - b[3];
        out[4] = a[4] - b[4];
        out[5] = a[5] - b[5];
        out[6] = a[6] - b[6];
        out[7] = a[7] - b[7];
        out[8] = a[8] - b[8];
        return out;
    }

    /**
     * Multiply each element of the matrix by a scalar.
     *
     * @param {Mat3} out the receiving matrix
     * @param {Mat3} a the matrix to scale
     * @param {Number} b amount to scale the matrix's elements by
     * @returns {Mat3} out
     */
    public static multiplyScalar(a: Mat3, b: number, out: Mat3) {
        out[0] = a[0] * b;
        out[1] = a[1] * b;
        out[2] = a[2] * b;
        out[3] = a[3] * b;
        out[4] = a[4] * b;
        out[5] = a[5] * b;
        out[6] = a[6] * b;
        out[7] = a[7] * b;
        out[8] = a[8] * b;
        return out;
    }

    /**
     * Adds two mat3's after multiplying each element of the second operand by a scalar value.
     *
     * @param {Mat3} out the receiving vector
     * @param {Mat3} a the first operand
     * @param {Mat3} b the second operand
     * @param {Number} scale the amount to scale b's elements by before adding
     * @returns {Mat3} out
     */
    public static multiplyScalarAndAdd(a: Mat3, b: Mat3, scale: number, out: Mat3) {
        out[0] = a[0] + b[0] * scale;
        out[1] = a[1] + b[1] * scale;
        out[2] = a[2] + b[2] * scale;
        out[3] = a[3] + b[3] * scale;
        out[4] = a[4] + b[4] * scale;
        out[5] = a[5] + b[5] * scale;
        out[6] = a[6] + b[6] * scale;
        out[7] = a[7] + b[7] * scale;
        out[8] = a[8] + b[8] * scale;
        return out;
    }

    /**
     * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
     *
     * @param {Mat3} a The first matrix.
     * @param {Mat3} b The second matrix.
     * @returns {Boolean} True if the matrices are equal, false otherwise.
     */
    public static exactEquals(a: Mat3, b: Mat3) {
        return (
            a[0] === b[0] &&
            a[1] === b[1] &&
            a[2] === b[2] &&
            a[3] === b[3] &&
            a[4] === b[4] &&
            a[5] === b[5] &&
            a[6] === b[6] &&
            a[7] === b[7] &&
            a[8] === b[8]
        );
    }

    /**
     * Returns whether or not the matrices have approximately the same elements in the same position.
     *
     * @param {Mat3} a The first matrix.
     * @param {Mat3} b The second matrix.
     * @returns {Boolean} True if the matrices are equal, false otherwise.
     */
    public static equals(a: Mat3, b: Mat3) {
        const a0 = a[0];
        const a1 = a[1];
        const a2 = a[2];
        const a3 = a[3];
        const a4 = a[4];
        const a5 = a[5];
        const a6 = a[6];
        const a7 = a[7];
        const a8 = a[8];
        const b0 = b[0];
        const b1 = b[1];
        const b2 = b[2];
        const b3 = b[3];
        const b4 = b[4];
        const b5 = b[5];
        const b6 = b[6];
        const b7 = b[7];
        const b8 = b[8];
        return (
            Math.abs(a0 - b0) <= EPSILON &&
            Math.abs(a1 - b1) <= EPSILON &&
            Math.abs(a2 - b2) <= EPSILON &&
            Math.abs(a3 - b3) <= EPSILON &&
            Math.abs(a4 - b4) <= EPSILON &&
            Math.abs(a5 - b5) <= EPSILON &&
            Math.abs(a6 - b6) <= EPSILON &&
            Math.abs(a7 - b7) <= EPSILON &&
            Math.abs(a8 - b8) <= EPSILON
        );
    }
}
