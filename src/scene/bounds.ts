import { vec3, mat4 } from "../mathD/index";
import { TypedArray } from "../core/typedArray";
import { Vec3 } from "cannon-es";

namespace Private {
    export const min = vec3.fromValues(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);
    export const max = vec3.fromValues(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
}

export class Bounds {
    max: vec3 = vec3.create();
    min: vec3 = vec3.create();
    // centerPoint: vec3 = vec3.create();
    private _center: vec3 = vec3.create();
    get centerPoint() {
        vec3.center(this._center, this.min, this.max);
        return this._center;
    }

    setMaxPoint(pos: vec3) {
        vec3.copy(this.max, pos);
    }

    setMinPoint(pos: vec3) {
        vec3.copy(this.min, pos);
    }

    setFromPoints(pos: vec3[]): Bounds {
        for (const key in pos) {
            vec3.min(this.min, this.min, pos[key]);
            vec3.max(this.max, this.max, pos[key]);
        }
        // vec3.center(this.minPoint, this.maxPoint, this.centerPoint);
        return this;
    }

    static fromTypedArray(positions: TypedArray) {
        const bb = new Bounds();
        bb.setMinPoint(Private.max);
        bb.setMaxPoint(Private.min);

        for (let i = 0; i < positions.length; i += 3) {
            const x = positions[i];
            const y = positions[i + 1];
            const z = positions[i + 2];
            if (bb.min[0] > x) {
                bb.min[0] = x;
            }
            if (bb.max[0] < x) {
                bb.max[0] = x;
            }
            if (bb.min[1] > y) {
                bb.min[1] = y;
            }
            if (bb.max[1] < y) {
                bb.max[1] = y;
            }
            if (bb.min[2] > z) {
                bb.min[2] = z;
            }
            if (bb.max[2] < z) {
                bb.max[2] = z;
            }
        }
        return bb;
    }

    addAABB(box: Bounds) {
        vec3.min(this.min, box.min, this.min);
        vec3.max(this.max, box.max, this.max);
        // vec3.center(this.minPoint, this.maxPoint, this.centerPoint);
        return this;
    }

    beEmpty(): boolean {
        return (
            this.min[0] > this.max[0] ||
            this.min[1] > this.max[1] ||
            this.min[2] > this.max[2]
        );
    }

    containPoint(point: vec3): boolean {
        return (
            point[0] >= this.min[0] &&
            point[0] <= this.max[0] &&
            point[1] >= this.min[1] &&
            point[1] <= this.max[1] &&
            point[2] >= this.min[2] &&
            point[2] <= this.max[2]
        );
    }

    intersect(box: Bounds): boolean {
        const interMin = box.min;
        const interMax = box.max;

        if (this.min[0] > interMax[0]) return false;
        if (this.min[1] > interMax[1]) return false;
        if (this.min[2] > interMax[2]) return false;
        if (this.max[0] > interMin[0]) return false;
        if (this.max[1] > interMin[1]) return false;
        if (this.max[2] > interMin[2]) return false;

        return true;
    }

    applyMatrix(mat: mat4) {
        if (this.beEmpty()) return;
        const min = vec3.create();
        const max = vec3.create();
        min[0] += mat[12];
        max[0] += mat[12];
        min[1] += mat[13];
        max[1] += mat[13];
        min[2] += mat[14];
        max[2] += mat[14];

        for (let i = 0; i < 3; i++) {
            for (let k = 0; k < 3; k++) {
                if (mat[k + i * 4] > 0) {
                    min[i] += mat[k + i * 4] * this.min[i];
                    max[i] += mat[k + i * 4] * this.max[i];
                } else {
                    min[i] += mat[k + i * 4] * this.max[i];
                    max[i] += mat[k + i * 4] * this.min[i];
                }
            }
        }
        this.min = min;
        this.max = max;
    }
}

export class BoundingSphere {
    center: vec3 = vec3.create();
    radius: number = 0;

    private constructor(params?: Partial<BoundingSphere>) {
        for (let key in params) {
            this[key] = params[key]
        }
    }

    applyMatrix(mat: mat4) {
        vec3.transformMat4(this.center, this.center, mat);

        this.radius = this.radius * mat4.getMaxScaleOnAxis(mat);
    }

    setFromPoints(points: vec3[], center: vec3 = null) {
        if (center != null) {
            vec3.copy(this.center, center);
        } else {
            const center = new Bounds().setFromPoints(points).centerPoint;
            vec3.copy(this.center, center);
        }
        for (let i = 0; i < points.length; i++) {
            const dis = vec3.distance(points[i], this.center);
            if (dis > this.radius) {
                this.radius = dis;
            }
        }
    }

    static fromTypedArray(positions: TypedArray, center: vec3 = null) {
        const bb = new BoundingSphere();
        if (center != null) {
            vec3.copy(bb.center, center);
        } else {
            center = Bounds.fromTypedArray(positions).centerPoint;
            vec3.copy(bb.center, center);
        }
        let x, y, z, xx, yy, zz, dis;
        for (let i = 0; i < positions.length; i += 3) {
            x = positions[i];
            y = positions[i + 1];
            z = positions[i + 2];
            xx = x - center[0];
            yy = y - center[1];
            zz = z - center[2];
            dis = Math.sqrt(x * x + y * y + z * z);
            if (dis > bb.radius) {
                bb.radius = dis;
            }
        }
        return bb;
    }

    copyTo(to: BoundingSphere) {
        vec3.copy(to.center, this.center);
        to.radius = this.radius;
    }

    clone(): BoundingSphere {
        const newSphere = BoundingSphere.create();
        this.copyTo(newSphere);
        return newSphere;
    }

    private static pool: BoundingSphere[] = [];
    static create(params?: Partial<BoundingSphere>) {
        if (this.pool.length > 0) {
            return this.pool.pop();
        } else {
            return new BoundingSphere(params);
        }
    }

    static recycle(item: BoundingSphere) {
        this.pool.push(item);
    }

    static fromBoundingBox(box: BoundingBox, result: BoundingSphere = new BoundingSphere()) {
        result.center = vec3.clone(box.center);
        result.radius = vec3.len(box.halfSize);
        return result;
    }
}

export class BoundingBox {
    center: vec3 = vec3.create();
    halfSize: vec3 = vec3.create();
    private constructor(center?: vec3, halfSize?: vec3) {
        if (center) {
            this.center = vec3.clone(center);
        } else {
            this.center = vec3.create();
        }
        if (halfSize) {
            this.halfSize = vec3.clone(halfSize);
        } else {
            this.halfSize = vec3.create();
        }
        this._min = vec3.subtract(vec3.create(), this.center, this.halfSize);
        this._max = vec3.add(vec3.create(), this.center, this.halfSize);
    }
    SetData(center: vec3, halfSize: vec3) {
        vec3.copy(this.center, center);
        vec3.copy(this.halfSize, halfSize);
        this._min = vec3.subtract(vec3.create(), this.center, this.halfSize);
        this._max = vec3.add(vec3.create(), this.center, this.halfSize);
    }

    //positions=[x1,y1,z1,x2,y2,z2...]
    static fromTypedArray(positions: TypedArray, center: vec3 = null) {
        const min = vec3.fromValues(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
        const max = vec3.fromValues(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);
        let x, y, z;
        for (let i = 0; i < positions.length; i += 3) {
            x = positions[i];
            y = positions[i + 1];
            z = positions[i + 2];
            if (x < min[0]) {
                min[0] = x;
            } else if (x > max[0]) {
                max[0] = x;
            }
            if (y < min[1]) {
                min[1] = y;
            } else if (y > max[1]) {
                max[1] = y;
            }
            if (z < min[2]) {
                min[2] = z;
            } else if (z > max[2]) {
                max[2] = z;
            }
        }
        return BoundingBox.fromMinMax(min, max);
    }
    //positions=[[x1,y1,z1],[x2,y2,z2]...]
    static fromTypedArrays(positions: TypedArray[], center: vec3 = null) {
        const min = vec3.fromValues(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
        const max = vec3.fromValues(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);
        let x, y, z;
        for (let i = 0; i < positions.length; i += 3) {
            x = positions[i][0];
            y = positions[i][1];
            z = positions[i][2];
            if (x < min[0]) {
                min[0] = x;
            } else if (x > max[0]) {
                max[0] = x;
            }
            if (y < min[1]) {
                min[1] = y;
            } else if (y > max[1]) {
                max[1] = y;
            }
            if (z < min[2]) {
                min[2] = z;
            } else if (z > max[2]) {
                max[2] = z;
            }
        }
        return BoundingBox.fromMinMax(min, max);
    }
    private _min: vec3;
    private _max: vec3;
    get min() { return this._min }
    get max() { return this._max }

    static fromMinMax = (() => {
        const _tempt = vec3.create();
        return (min: ArrayLike<number>, max: ArrayLike<number>, out?: BoundingBox) => {
            out = out ?? new BoundingBox();
            let center = vec3.copy(vec3.create(), vec3.set(_tempt, (min[0] + max[0]) * 0.5, (min[1] + max[1]) * 0.5, (min[2] + max[2]) * 0.5));
            let halfSize = vec3.copy(vec3.create(), vec3.set(_tempt, (max[0] - min[0]) * 0.5, (max[1] - min[1]) * 0.5, (max[2] - min[2]) * 0.5));
            out.SetData(center, halfSize);
            return out;
        };
    })()

    static contact(out: BoundingBox, a: BoundingBox, ...b: BoundingBox[]) {
        let min = vec3.clone(a.min);
        let max = vec3.clone(a.max);
        for (let i = 0; i < b.length; i++) {
            if (b[i]._min[0] < min[0]) {
                min[0] = b[i]._min[0];
            }
            if (b[i]._min[1] < min[1]) {
                min[1] = b[i]._min[1];
            }
            if (b[i]._min[2] < min[2]) {
                min[2] = b[i]._min[2];
            }

            if (b[i]._max[0] > max[0]) {
                max[0] = b[i]._max[0];
            }
            if (b[i]._max[1] > max[1]) {
                max[1] = b[i]._max[1];
            }
            if (b[i]._max[2] > max[2]) {
                max[2] = b[i]._max[2];
            }
        }
        let _tempt = vec3.create();
        vec3.copy(out.center, vec3.set(_tempt, (min[0] + max[0]) * 0.5, (min[1] + max[1]) * 0.5, (min[2] + max[2]) * 0.5));
        vec3.copy(out.halfSize, vec3.set(_tempt, (max[0] - min[0]) * 0.5, (max[1] - min[1]) * 0.5, (max[2] - min[2]) * 0.5));
        vec3.copy(out._min, min);
        vec3.copy(out._max, max);
    }

    clone() {
        let box = new BoundingBox();
        vec3.copy(this.center, box.center);
        vec3.copy(this.halfSize, box.halfSize);
        vec3.copy(this._min, box._min);
        vec3.copy(this._max, box._max);
        return box
    }

    private static pool: BoundingBox[] = [];
    static create(center?: vec3, halfSize?: vec3) {
        if (this.pool.length > 0) {
            const ins = this.pool.pop();
            vec3.copy(ins.center, center ?? vec3.ZERO);
            vec3.copy(ins.halfSize, halfSize ?? vec3.ONE);
        } else {
            return new BoundingBox(center, halfSize);
        }
    }

    static recycle(item: BoundingBox) {
        this.pool.push(item);
    }
}

export function computeMinMax(points: TypedArray[], min?: vec3, max?: vec3) {
    min = min ?? vec3.fromValues(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY);
    max = max ?? vec3.fromValues(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY);
    for (let i = 0; i < points.length; i++) {
        let point = points[i];
        if (point[0] < min[0]) {
            min[0] = point[0];
        } else if (point[0] > max[0]) {
            max[0] = point[0];
        }
        if (point[1] < min[1]) {
            min[1] = point[1];
        } else if (point[1] > max[1]) {
            max[1] = point[1];
        }
        if (point[2] < min[2]) {
            min[2] = point[2];
        } else if (point[2] > max[2]) {
            max[2] = point[2];
        }
    }
    return { min, max }
}