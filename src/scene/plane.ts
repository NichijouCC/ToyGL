import { Vec3 } from "../mathD/vec3";

export class Plane {
    //ax+by+cz+d=0;
    normal: Vec3 = Vec3.create(0, 1, 0);
    constant: number = 0;

    distanceToPoint(point: Vec3): number {
        return Vec3.dot(point, this.normal) + this.constant;
    }

    copy(to: Plane) {
        Vec3.copy(this.normal, to.normal);
        to.constant = this.constant;
    }

    setComponents(nx: number, ny: number, nz: number, ds: number) {
        this.normal[0] = nx;
        this.normal[1] = ny;
        this.normal[2] = nz;
        let inverseNormalLength = 1.0 / Vec3.magnitude(this.normal);
        Vec3.scale(this.normal, inverseNormalLength, this.normal);
        this.constant = ds * inverseNormalLength;
    }
}
