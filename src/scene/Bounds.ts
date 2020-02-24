import { Vec3 } from "../mathD/vec3";
import { Mat4 } from "../mathD/mat4";
import { VertexAttEnum } from "../webgl/VertexAttEnum";
import { VertexArray } from "../webgl/VertextArray";
import { TypedArray } from "../core/TypedArray";

namespace Private
{
    export const min = Vec3.create(-999999, -999999, -999999);
    export const max = Vec3.create(999999, 999999, 999999);

}

export class Bounds
{
    max: Vec3 = Vec3.create();
    min: Vec3 = Vec3.create();
    // centerPoint: Vec3 = Vec3.create();
    private _center: Vec3 = Vec3.create();
    get centerPoint()
    {
        Vec3.center(this.min, this.max, this._center);
        return this._center;
    }
    setMaxPoint(pos: Vec3)
    {
        Vec3.copy(pos, this.max);
    }
    setMinPoint(pos: Vec3)
    {
        Vec3.copy(pos, this.min);
    }

    setFromPoints(pos: Vec3[]): Bounds
    {
        for (let key in pos)
        {
            Vec3.min(this.min, pos[key], this.min);
            Vec3.max(this.max, pos[key], this.max);
        }
        // Vec3.center(this.minPoint, this.maxPoint, this.centerPoint);
        return this;
    }

    static fromVertexArray(vertexArr: VertexArray)
    {
        const { vertexAttributes } = vertexArr;
        return Bounds.fromTypedArray(vertexAttributes[VertexAttEnum.POSITION]?.vertexBuffer.typedArray);
    }

    static fromTypedArray(positions: TypedArray)
    {
        const bb = new Bounds();
        bb.setMinPoint(Private.min);
        bb.setMaxPoint(Private.max);

        for (let i = 0; i < positions.length; i += 3)
        {
            const x = positions[i];
            const y = positions[i + 1];
            const z = positions[i + 2];
            if (bb.min.x > x)
            {
                bb.min.x = x;
            }
            if (bb.max.x < x)
            {
                bb.max.x = x;
            }
            if (bb.min.y > y)
            {
                bb.min.y = y;
            }
            if (bb.max.y < y)
            {
                bb.max.y = y;
            }
            if (bb.min.z > z)
            {
                bb.min.z = z;
            }
            if (bb.max.z < z)
            {
                bb.max.z = z;
            }
        }
        return bb
    }

    addAABB(box: Bounds)
    {
        Vec3.min(this.min, box.min, this.min);
        Vec3.max(this.max, box.max, this.max);
        // Vec3.center(this.minPoint, this.maxPoint, this.centerPoint);
        return this;
    }

    beEmpty(): boolean
    {
        return (
            this.min[0] > this.max[0] ||
            this.min[1] > this.max[1] ||
            this.min[2] > this.max[2]
        );
    }

    containPoint(point: Vec3): boolean
    {
        return (
            point[0] >= this.min[0] &&
            point[0] <= this.max[0] &&
            point[1] >= this.min[1] &&
            point[1] <= this.max[1] &&
            point[2] >= this.min[2] &&
            point[2] <= this.max[2]
        );
    }

    intersect(box: Bounds): boolean
    {
        let interMin = box.min;
        let interMax = box.max;

        if (this.min[0] > interMax[0]) return false;
        if (this.min[1] > interMax[1]) return false;
        if (this.min[2] > interMax[2]) return false;
        if (this.max[0] > interMin[0]) return false;
        if (this.max[1] > interMin[1]) return false;
        if (this.max[2] > interMin[2]) return false;

        return true;
    }

    applyMatrix(mat: Mat4)
    {
        if (this.beEmpty()) return;
        let min = Vec3.create();
        let max = Vec3.create();
        min[0] += mat[12];
        max[0] += mat[12];
        min[1] += mat[13];
        max[1] += mat[13];
        min[2] += mat[14];
        max[2] += mat[14];

        for (let i = 0; i < 3; i++)
        {
            for (let k = 0; k < 3; k++)
            {
                if (mat[k + i * 4] > 0)
                {
                    min[i] += mat[k + i * 4] * this.min[i];
                    max[i] += mat[k + i * 4] * this.max[i];
                } else
                {
                    min[i] += mat[k + i * 4] * this.max[i];
                    max[i] += mat[k + i * 4] * this.min[i];
                }
            }
        }
        Vec3.recycle(this.min);
        Vec3.recycle(this.max);
        this.min = min;
        this.max = max;
    }
}

export class BoundingSphere
{
    center: Vec3 = Vec3.create();
    radius: number = 0;

    applyMatrix(mat: Mat4)
    {
        Mat4.transformPoint(this.center, mat, this.center);
        this.radius = this.radius * Mat4.getMaxScaleOnAxis(mat);
    }
    setFromPoints(points: Vec3[], center: Vec3 = null)
    {
        if (center != null)
        {
            Vec3.copy(center, this.center);
        } else
        {
            let center = new Bounds().setFromPoints(points).centerPoint;
            Vec3.copy(center, this.center);
        }
        for (let i = 0; i < points.length; i++)
        {
            let dis = Vec3.distance(points[i], this.center);
            if (dis > this.radius)
            {
                this.radius = dis;
            }
        }
    }

    static fromVertexArray(vertexArr: VertexArray, center: Vec3 = null)
    {
        const { vertexAttributes } = vertexArr;
        return BoundingSphere.fromTypedArray(vertexAttributes[VertexAttEnum.POSITION]?.vertexBuffer.typedArray);
    }

    static fromTypedArray(positions: TypedArray, center: Vec3 = null)
    {
        const bb = new BoundingSphere();
        if (center != null)
        {
            Vec3.copy(center, bb.center);
        } else
        {
            let center = Bounds.fromTypedArray(positions).centerPoint;
            Vec3.copy(center, bb.center);
        }
        let x, y, z, xx, yy, zz, dis
        for (let i = 0; i < positions.length; i += 3)
        {
            x = positions[i];
            y = positions[i + 1];
            z = positions[i + 2];
            xx = x - center.x;
            yy = y - center.y;
            zz = z - center.z;
            dis = Math.sqrt(x * x + y * y + z * z);
            if (dis > bb.radius)
            {
                bb.radius = dis;
            }
        }
    }

    copyTo(to: BoundingSphere)
    {
        Vec3.copy(this.center, to.center);
        to.radius = this.radius;
    }

    clone(): BoundingSphere
    {
        let newSphere = BoundingSphere.create();
        this.copyTo(newSphere);
        return newSphere;
    }
    private static pool: BoundingSphere[] = [];
    static create()
    {
        if (this.pool.length > 0)
        {
            return this.pool.pop();
        } else
        {
            return new BoundingSphere();
        }
    }
    static recycle(item: BoundingSphere)
    {
        this.pool.push(item);
    }

    static fromBoundingBox(box: BoundingBox, result: BoundingSphere = new BoundingSphere())
    {
        result.center = Vec3.clone(box.center);
        result.radius = Vec3.magnitude(box.halfSize);
        return result;
    }
}

export class BoundingBox
{
    center: Vec3 = Vec3.create();
    halfSize: Vec3 = Vec3.create(1, 1, 1);

    private static pool: BoundingBox[] = [];
    static create()
    {
        if (this.pool.length > 0)
        {
            return this.pool.pop();
        } else
        {
            return new BoundingBox();
        }
    }
    static recycle(item: BoundingBox)
    {
        this.pool.push(item);
    }
}
