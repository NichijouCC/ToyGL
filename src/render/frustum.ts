import { Plane } from "../scene/plane";
import { mat4 } from "../mathD";
import { BoundingSphere } from "../scene/bounds";

export class Frustum {
    planes: Plane[] = [];

    constructor(
        p0: Plane = null,
        p1: Plane = null,
        p2: Plane = null,
        p3: Plane = null,
        p4: Plane = null,
        p5: Plane = null
    ) {
        this.planes[0] = p0 != null ? p0 : new Plane();
        this.planes[1] = p1 != null ? p1 : new Plane();
        this.planes[2] = p2 != null ? p2 : new Plane();
        this.planes[3] = p3 != null ? p3 : new Plane();
        this.planes[4] = p4 != null ? p4 : new Plane();
        this.planes[5] = p5 != null ? p5 : new Plane();
    }

    set(p0: Plane, p1: Plane, p2: Plane, p3: Plane, p4: Plane, p5: Plane) {
        this.planes[0].copy(p0);
        this.planes[1].copy(p1);
        this.planes[2].copy(p2);
        this.planes[3].copy(p3);
        this.planes[4].copy(p4);
        this.planes[5].copy(p5);
    }

    setFromMatrix(me: mat4): Frustum {
        const planes = this.planes;
        const me0 = me[0];
        const me1 = me[1];
        const me2 = me[2];
        const me3 = me[3];
        const me4 = me[4];
        const me5 = me[5];
        const me6 = me[6];
        const me7 = me[7];
        const me8 = me[8];
        const me9 = me[9];
        const me10 = me[10];
        const me11 = me[11];
        const me12 = me[12];
        const me13 = me[13];
        const me14 = me[14];
        const me15 = me[15];

        planes[0].setComponents(me3 - me0, me7 - me4, me11 - me8, me15 - me12);
        planes[1].setComponents(me3 + me0, me7 + me4, me11 + me8, me15 + me12);
        planes[2].setComponents(me3 + me1, me7 + me5, me11 + me9, me15 + me13);
        planes[3].setComponents(me3 - me1, me7 - me5, me11 - me9, me15 - me13);
        planes[4].setComponents(me3 - me2, me7 - me6, me11 - me10, me15 - me14);
        planes[5].setComponents(me3 + me2, me7 + me6, me11 + me10, me15 + me14);

        return this;
    }

    /**
     * 和包围球检测相交
     * @param sphere 包围球
     * @param mat 用于变换包围球
     */
    containSphere(sphere: BoundingSphere, mat: mat4 = null): boolean {
        const planes = this.planes;
        if (mat != null) {
            const cloneSphere = sphere.clone();
            cloneSphere.applyMatrix(mat);

            const center = cloneSphere.center;
            const negRadius = -cloneSphere.radius;
            for (let i = 0; i < 6; i++) {
                const distance: number = planes[i].distanceToPoint(center);
                if (distance < negRadius) {
                    return false;
                }
            }
            BoundingSphere.recycle(sphere);
        } else {
            const center = sphere.center;
            const negRadius = -sphere.radius;
            for (let i = 0; i < 6; i++) {
                const distance: number = planes[i].distanceToPoint(center);
                if (distance < negRadius) {
                    return false;
                }
            }
        }
        return true;
    }
}
