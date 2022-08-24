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
    intersectWithGeometry(geo: Geometry, worldMat?: mat4): vec3 | null {
        let computeRay: Ray = this;
        if (worldMat != null) {
            let inverse = mat4.invert(Tempt.getMat4(), worldMat);
            mat4.transformPoint(Ray.temptRay.origin, this.origin, inverse);
            mat4.transformVector(Ray.temptRay.dir, this.dir, inverse);
            Ray.temptRay.length = this.length;
            computeRay = Ray.temptRay;
        }
        let points = geo.attributes[VertexAttEnum.POSITION].elements;
        let indices = geo.indices.data;
        for (let i = 0; i < indices.length;) {
            let point_a = points[indices[i++]] as any;
            let point_b = points[indices[i++]] as any;
            let point_c = points[indices[i++]] as any;
            let point = computeRay.intersectTriangle(point_a, point_b, point_c);
            if (point != null) {
                if (worldMat != null) {
                    mat4.transformPoint(point, point, worldMat);
                }
                return point;
            }
        }
        return null;
    }

    intersectTriangle(a: vec3, b: vec3, c: vec3): vec3 | null {
        // Compute the offset origin, edges, and normal.
        // from https://github.com/pmjoniak/GeometricTools/blob/master/GTEngine/Include/Mathematics/GteIntrRay3Triangle3.h

        let vec3_tempt1 = Tempt.getVec3();
        let vec3_tempt2 = Tempt.getVec3(1);
        let vec3_tempt3 = Tempt.getVec3(2);
        let vec3_tempt5 = Tempt.getVec3(5);
        let vec3_tempt6 = Tempt.getVec3(6);

        let _edge1 = vec3.subtract(vec3_tempt1, b, a);
        let _edge2 = vec3.subtract(vec3_tempt2, c, a);
        let _normal = vec3.cross(vec3_tempt3, _edge1, _edge2);

        // Solve Q + t*D = b1*E1 + b2*E2 (Q = kDiff, D = ray direction,
        // E1 = kEdge1, E2 = kEdge2, N = Cross(E1,E2)) by
        //   |Dot(D,N)|*b1 = sign(Dot(D,N))*Dot(D,Cross(Q,E2))
        //   |Dot(D,N)|*b2 = sign(Dot(D,N))*Dot(D,Cross(E1,Q))
        //   |Dot(D,N)|*t = -sign(Dot(D,N))*Dot(Q,N)
        let DdN = vec3.dot(this.dir, _normal);

        let sign;
        if (DdN > 0) {
            sign = 1;
        } else if (DdN < 0) {
            sign = - 1;
            DdN = - DdN;
        } else {
            return null;
        }
        let _diff = vec3.subtract(vec3_tempt5, this.origin, a);
        // const DdQxE2 = sign * this.direction.dot(_edge2.crossVectors(_diff, _edge2));
        const DdQxE2 = sign * vec3.dot(this.dir, vec3.cross(vec3_tempt6, _diff, _edge2));

        // b1 < 0, no intersection
        if (DdQxE2 < 0) {
            return null;
        }

        // const DdE1xQ = sign * this.direction.dot(_edge1.cross(_diff));
        const DdE1xQ = sign * vec3.dot(this.dir, vec3.cross(vec3_tempt6, _edge1, _diff));
        // b2 < 0, no intersection
        if (DdE1xQ < 0) {
            return null;
        }

        // b1+b2 > 1, no intersection
        if (DdQxE2 + DdE1xQ > DdN) {
            return null;
        }

        // Line intersects triangle, check if ray does.
        // const QdN = - sign * _diff.dot(_normal);
        const QdN = - sign * vec3.dot(_diff, _normal);

        // t < 0, no intersection
        if (QdN < 0) {
            return null;
        }

        // Ray intersects triangle.
        return vec3.scaleAndAdd(vec3.create(), this.origin, this.dir, QdN / DdN)
    }
}