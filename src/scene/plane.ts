import { vec3 } from 'gl-matrix';

export class Plane {
    // ax+by+cz+d=0;
    normal: vec3 = vec3.fromValues(0, 1, 0);
    constant: number = 0;

    distanceToPoint(point: vec3): number {
        return vec3.dot(point, this.normal) + this.constant;
    }

    copy(to: Plane) {
        vec3.copy(to.normal, this.normal);
        to.constant = this.constant;
    }

    setComponents(nx: number, ny: number, nz: number, ds: number) {
        this.normal[0] = nx;
        this.normal[1] = ny;
        this.normal[2] = nz;
        const inverseNormalLength = 1.0 / vec3.len(this.normal);
        vec3.scale(this.normal, this.normal, inverseNormalLength);
        this.constant = ds * inverseNormalLength;
    }
}
