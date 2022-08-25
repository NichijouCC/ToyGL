import { mat4, Tempt, vec3, vec3Pool } from "../mathD";
import { Geometry, VertexAttEnum } from "../render";
import { BoundingSphere } from "./bounds";

export class Ray {
    origin: vec3;
    dir: vec3;
    length: number;
    constructor(origin = vec3.create(), dir: vec3 = vec3.fromValues(0, 0, 1), length = Number.POSITIVE_INFINITY) {
        this.origin = origin;
        this.dir = dir;
        this.length = length;
    }
    setByTwoPoint(start: vec3, end: vec3) {
        vec3.copy(start, this.origin);
        let dir = vec3.subtract(vec3.create(), end, start);
        vec3.normalize(dir, dir);
        vec3.copy(this.dir, dir);
        this.length = vec3.len(dir);
        return this;
    }

    intersectWithBoundingSphere(sphere: BoundingSphere) {
        let tempt1 = vec3Pool.create();
        let dir = vec3.subtract(tempt1, sphere.center, this.origin);
        let dotRes = vec3.dot(dir, this.dir);
        if (dotRes < 0) {
            vec3Pool.recycle(tempt1);
            return false;
        }
        let dis2 = vec3.dot(dir, dir) - dotRes * dotRes;

        return dis2 < sphere.radius * sphere.radius
    }
    private static temptRay = new Ray();
    intersectWithGeometry(geo: Geometry, worldMat?: mat4): vec3[] | null {
        let computeRay: Ray = this;
        if (worldMat != null) {
            let inverse = mat4.invert(Tempt.getMat4(), worldMat);
            mat4.transformPoint(Ray.temptRay.origin, this.origin, inverse);
            mat4.transformVector(Ray.temptRay.dir, this.dir, inverse);
            Ray.temptRay.length = this.length;
            computeRay = Ray.temptRay;
        }
        let nearPoints: vec3[] = [];
        let points = geo.attributes[VertexAttEnum.POSITION].elements;
        let indices = geo.indices.elements;
        for (let i = 0; i < indices.length;) {
            let point_a = points[indices[i++]] as any;
            let point_b = points[indices[i++]] as any;
            let point_c = points[indices[i++]] as any;
            let point = computeRay.intersectTriangle(point_a, point_b, point_c);
            if (point != null) {
                if (worldMat != null) {
                    mat4.transformPoint(point, point, worldMat);
                }
                nearPoints.push(point);
            }
        }
        return nearPoints.length == null ? null : nearPoints;
    }

    intersectTriangle(v0: vec3, v1: vec3, v2: vec3): vec3 | null {
        let vec3_tempt1 = Tempt.getVec3();
        let vec3_tempt2 = Tempt.getVec3(1);
        let vec3_tempt3 = Tempt.getVec3(2);
        let vec3_tempt4 = Tempt.getVec3(3);
        let vec3_tempt5 = Tempt.getVec3(4);

        let v0v1 = vec3.subtract(vec3_tempt1, v1, v0);
        let v0v2 = vec3.subtract(vec3_tempt2, v2, v0);
        let pvec = vec3.cross(vec3_tempt3, this.dir, v0v2);
        let det = vec3.dot(v0v1, pvec);

        if (Math.abs(det) < 0.00001) return null;
        let invDet = 1 / det;
        let tvec = vec3.subtract(vec3_tempt4, this.origin, v0);
        let u = vec3.dot(tvec, pvec) * invDet;
        if (u < 0 || u > 1) return null;

        let qvec = vec3.cross(vec3_tempt5, tvec, v0v1);
        let v = vec3.dot(this.dir, qvec) * invDet;
        if (v < 0 || u + v > 1) return null;

        let t = vec3.dot(v0v2, qvec) * invDet;
        return vec3.scaleAndAdd(vec3.create(), this.origin, this.dir, t);
    }
}