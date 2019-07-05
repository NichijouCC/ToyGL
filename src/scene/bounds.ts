import { Vec3 } from "../mathD/vec3";
import { Geometry } from "../resources/assets/geometry";
import { Mat4 } from "../mathD/mat4";
import { VertexAttEnum } from "../render/vertexAttType";

export class Bounds {
    maxPoint: Vec3 = Vec3.create();
    minPoint: Vec3 = Vec3.create();
    // centerPoint: Vec3 = Vec3.create();
    private _center: Vec3 = Vec3.create();
    get centerPoint() {
        Vec3.center(this.minPoint, this.maxPoint, this._center);
        return this._center;
    }
    setMaxPoint(pos: Vec3) {
        Vec3.copy(pos, this.maxPoint);
    }
    setMinPoint(pos: Vec3) {
        Vec3.copy(pos, this.minPoint);
    }

    setFromPoints(pos: Vec3[]): Bounds {
        for (let key in pos) {
            Vec3.min(this.minPoint, pos[key], this.minPoint);
            Vec3.max(this.maxPoint, pos[key], this.maxPoint);
        }
        // Vec3.center(this.minPoint, this.maxPoint, this.centerPoint);
        return this;
    }

    setFromMesh(geometry: Geometry): Bounds {
        let points = geometry.getAttDataArr(VertexAttEnum.POSITION);
        this.setFromPoints(points);
        return this;
    }

    addAABB(box: Bounds) {
        Vec3.min(this.minPoint, box.minPoint, this.minPoint);
        Vec3.max(this.maxPoint, box.maxPoint, this.maxPoint);
        // Vec3.center(this.minPoint, this.maxPoint, this.centerPoint);
        return this;
    }

    beEmpty(): boolean {
        return (
            this.minPoint[0] > this.maxPoint[0] ||
            this.minPoint[1] > this.maxPoint[1] ||
            this.minPoint[2] > this.maxPoint[2]
        );
    }

    containPoint(point: Vec3): boolean {
        return (
            point[0] >= this.minPoint[0] &&
            point[0] <= this.maxPoint[0] &&
            point[1] >= this.minPoint[1] &&
            point[1] <= this.maxPoint[1] &&
            point[2] >= this.minPoint[2] &&
            point[2] <= this.maxPoint[2]
        );
    }

    intersect(box: Bounds): boolean {
        let interMin = box.minPoint;
        let interMax = box.maxPoint;

        if (this.minPoint[0] > interMax[0]) return false;
        if (this.minPoint[1] > interMax[1]) return false;
        if (this.minPoint[2] > interMax[2]) return false;
        if (this.maxPoint[0] > interMin[0]) return false;
        if (this.maxPoint[1] > interMin[1]) return false;
        if (this.maxPoint[2] > interMin[2]) return false;

        return true;
    }

    applyMatrix(mat: Mat4) {
        if (this.beEmpty()) return;
        let min = Vec3.create();
        let max = Vec3.create();
        min[0] += mat[12];
        max[0] += mat[12];
        min[1] += mat[13];
        max[1] += mat[13];
        min[2] += mat[14];
        max[2] += mat[14];

        for (let i = 0; i < 3; i++) {
            for (let k = 0; k < 3; k++) {
                if (mat[k + i * 4] > 0) {
                    min[i] += mat[k + i * 4] * this.minPoint[i];
                    max[i] += mat[k + i * 4] * this.maxPoint[i];
                } else {
                    min[i] += mat[k + i * 4] * this.maxPoint[i];
                    max[i] += mat[k + i * 4] * this.minPoint[i];
                }
            }
        }
        Vec3.recycle(this.minPoint);
        Vec3.recycle(this.maxPoint);
        this.minPoint = min;
        this.maxPoint = max;
    }
}

export class BoundingSphere {
    center: Vec3 = Vec3.create();
    radius: number = 0;

    applyMatrix(mat: Mat4) {
        Mat4.transformPoint(this.center, mat, this.center);
    }
    setFromPoints(points: Vec3[], center: Vec3 = null) {
        if (center != null) {
            Vec3.copy(center, this.center);
        } else {
            let center = new Bounds().setFromPoints(points).centerPoint;
            Vec3.copy(center, this.center);
        }
        for (let i = 0; i < points.length; i++) {
            let dis = Vec3.distance(points[i], this.center);
            if (dis > this.radius) {
                this.radius = dis;
            }
        }
    }
    setFromGeometry(geometry: Geometry, center: Vec3 = null): BoundingSphere {
        let points = geometry.getAttDataArr(VertexAttEnum.POSITION);
        this.setFromPoints(points, center);
        return this;
    }

    copyTo(to: BoundingSphere) {
        Vec3.copy(this.center, to.center);
        to.radius = this.radius;
    }

    clone(): BoundingSphere {
        let newSphere = BoundingSphere.create();
        this.copyTo(newSphere);
        return newSphere;
    }
    private static pool: BoundingSphere[] = [];
    static create() {
        if (this.pool.length > 0) {
            return this.pool.pop();
        } else {
            return new BoundingSphere();
        }
    }
    static recycle(item: BoundingSphere) {
        this.pool.push(item);
    }
}

export class BoundingBox {
    center: Vec3 = Vec3.create();
    halfSize: Vec3 = Vec3.create(1, 1, 1);

    private static pool: BoundingBox[] = [];
    static create() {
        if (this.pool.length > 0) {
            return this.pool.pop();
        } else {
            return new BoundingBox();
        }
    }
    static recycle(item: BoundingBox) {
        this.pool.push(item);
    }
}
