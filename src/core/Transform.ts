import { Vec3 } from "../mathD/vec3";
import { Quat } from "../mathD/quat";
import { Mat4 } from "../mathD/mat4";
import { EventHandler } from "./Event";

enum DirtyFlagEnum
{
    WWORLD_POS = 0b000100,
    WORLD_ROTATION = 0b001000,
    WORLD_SCALE = 0b010000,
    LOCALMAT = 0b000001,
    WORLDMAT = 0b000010,
}

export class Transform
{
    // refScene: Scene;
    parent: Transform;
    children: Transform[] = [];
    private dirtyFlag: number = 0;
    name: string;
    constructor(name?: string)
    {
        this.name = name;
        //--------attach to dirty-------
        Object.defineProperty(this._localPosition, "x", {
            get: () => { return this._localPosition[0] },
            set: value => { this._localPosition[0] = value; this.markDirty() }
        })
        Object.defineProperty(this._localPosition, "y", {
            get: () => { return this._localPosition[1] },
            set: value => { this._localPosition[1] = value; this.markDirty() }
        })
        Object.defineProperty(this._localPosition, "z", {
            get: () => { return this._localPosition[2] },
            set: value => { this._localPosition[2] = value; this.markDirty() }
        })
        Object.defineProperty(this._localRotation, "x", {
            get: () => { return this._localRotation[0] },
            set: value => { this._localRotation[0] = value; this.markDirty() }
        })
        Object.defineProperty(this._localRotation, "y", {
            get: () => { return this._localRotation[1] },
            set: value => { this._localRotation[1] = value; this.markDirty() }
        })
        Object.defineProperty(this._localRotation, "z", {
            get: () => { return this._localRotation[2] },
            set: value => { this._localRotation[2] = value; this.markDirty() }
        })
        Object.defineProperty(this._localRotation, "w", {
            get: () => { return this._localRotation[3] },
            set: value => { this._localRotation[3] = value; this.markDirty() }
        })
        Object.defineProperty(this._localScale, "x", {
            get: () => { return this._localScale[0] },
            set: value => { this._localScale[0] = value; this.markDirty() }
        })
        Object.defineProperty(this._localScale, "y", {
            get: () => { return this._localScale[1] },
            set: value => { this._localScale[1] = value; this.markDirty() }
        })
        Object.defineProperty(this._localScale, "z", {
            get: () => { return this._localScale[2] },
            set: value => { this._localScale[2] = value; this.markDirty() }
        })
    }

    private _localPosition: Vec3 = Vec3.create();
    private _localRotation: Quat = Quat.create();
    private _localScale: Vec3 = Vec3.create(1, 1, 1);

    set localPosition(value: Vec3)
    {
        Vec3.copy(value, this._localPosition);
        this.markDirty();
    }
    get localPosition(): Vec3
    {
        return this._localPosition;
    }

    set localRotation(value: Quat)
    {
        Vec3.copy(value, this._localRotation);
        // this._localRotation = value;
        this.markDirty();
    }
    get localRotation(): Quat
    {
        return this._localRotation;
    }

    set localScale(value: Vec3)
    {
        Vec3.copy(value, this._localScale);
        // this._localScale = value;
        this.markDirty();
    }
    get localScale(): Vec3
    {
        return this._localScale;
    }

    private _localMatrix: Mat4 = Mat4.create();
    set localMatrix(value: Mat4)
    {
        this._localMatrix = value;
        Mat4.decompose(this._localMatrix, this._localScale, this._localRotation, this._localPosition);
        this.dirtyFlag = this.dirtyFlag & ~DirtyFlagEnum.LOCALMAT;
        this.dirtyFlag = this.dirtyFlag | DirtyFlagEnum.WORLDMAT;

        Transform.NotifyChildSelfDirty(this);
    }

    get localMatrix()
    {
        if (this.dirtyFlag & DirtyFlagEnum.LOCALMAT)
        {
            Mat4.RTS(this._localPosition, this._localScale, this._localRotation, this._localMatrix);
            this.dirtyFlag = this.dirtyFlag & ~DirtyFlagEnum.LOCALMAT;
        }
        return this._localMatrix;
    }

    //-------------------------world属性--------------------------------------------------------------
    //------------------------------------------------------------------------------------------------
    //得到worldmatrix后，不会立刻decompse得到worldpos/worldscale/worldort,而是dirty标记起来.
    //setworld属性转换到setlocal属性
    //------------------------------------------------------------------------------------------------
    private _worldPosition: Vec3 = Vec3.create();
    get worldPosition(): Vec3
    {
        if (this.dirtyFlag & (DirtyFlagEnum.WORLDMAT | DirtyFlagEnum.WWORLD_POS))
        {
            Mat4.getTranslationing(this.worldMatrix, this._worldPosition);
            this.dirtyFlag = this.dirtyFlag & ~DirtyFlagEnum.WWORLD_POS;
        }
        return this._worldPosition;
    }
    set worldPosition(value: Vec3)
    {
        if (this.parent == null)
        {
            return;
        }
        if (this.parent.parent == null)
        {
            this._localPosition = value;
        } else
        {
            let invparentworld = Mat4.create();
            Mat4.invert(this.parent.worldMatrix, invparentworld);
            Mat4.transformPoint(value, invparentworld, this._localPosition);
            Mat4.recycle(invparentworld);
        }
        this.markDirty();
    }

    private _worldRotation: Quat = Quat.create();
    get worldRotation()
    {
        if (this.dirtyFlag & (DirtyFlagEnum.WORLDMAT | DirtyFlagEnum.WORLD_ROTATION))
        {
            Mat4.getRotationing(this.worldMatrix, this._worldRotation, this.worldScale);
            this.dirtyFlag = this.dirtyFlag & ~DirtyFlagEnum.WORLD_ROTATION;
        }
        return this._worldRotation;
    }
    set worldRotation(value: Quat)
    {
        if (this.parent == null)
        {
            return;
        }
        if (this.parent.parent == null)
        {
            this._localRotation = value;
        } else
        {
            let invparentworldrot = Quat.create();
            Quat.inverse(this.parent.worldRotation, invparentworldrot);
            Quat.multiply(invparentworldrot, value, this._localRotation);
            Quat.recycle(invparentworldrot);
        }
        this.markDirty();
    }

    private _worldScale: Vec3 = Vec3.create(1, 1, 1);
    get worldScale(): Vec3
    {
        if (this.dirtyFlag & (DirtyFlagEnum.WORLDMAT | DirtyFlagEnum.WORLD_SCALE))
        {
            Mat4.getScaling(this.worldMatrix, this._worldScale);
            this.dirtyFlag = this.dirtyFlag & ~DirtyFlagEnum.WORLD_SCALE;
        }
        return this._worldScale;
    }
    set worldScale(value: Vec3)
    {
        if (this.parent == null)
        {
            return;
        }
        if (this.parent.parent == null)
        {
            this._localScale = value;
        } else
        {
            Vec3.divide(value, this.parent.worldScale, this._localScale);
        }
        this.markDirty();
    }

    private _worldMatrix: Mat4 = Mat4.create();
    get worldMatrix(): Mat4
    {
        if (this.dirtyFlag & (DirtyFlagEnum.WORLDMAT | DirtyFlagEnum.LOCALMAT))
        {
            Mat4.multiply(this.parent.worldMatrix, this.localMatrix, this._worldMatrix);
            this.dirtyFlag = this.dirtyFlag & ~DirtyFlagEnum.WORLDMAT;
            this.dirtyFlag =
                this.dirtyFlag | DirtyFlagEnum.WORLD_ROTATION | DirtyFlagEnum.WORLD_SCALE | DirtyFlagEnum.WWORLD_POS;
        }
        return this._worldMatrix;
    }

    get worldMatrixBedirty()
    {
        return this.dirtyFlag & (DirtyFlagEnum.WORLDMAT | DirtyFlagEnum.LOCALMAT);
    }

    set worldMatrix(value: Mat4)
    {
        if (this.parent == null)
        {
            return;
        }
        Mat4.copy(value, this._worldMatrix);
        if (this.parent.parent == null)
        {
            Mat4.copy(value, this.localMatrix);
            // this.localMatrix = this._localMatrix;
        } else
        {
            let invparentworld = Mat4.create();
            Mat4.invert(this.parent.worldMatrix, invparentworld);
            Mat4.multiply(invparentworld, value, this.localMatrix);
            // this.setlocalMatrix(this._localMatrix);
            Mat4.recycle(invparentworld);
        }
        this.dirtyFlag = this.dirtyFlag & ~DirtyFlagEnum.WORLDMAT;
        this.dirtyFlag =
            this.dirtyFlag | DirtyFlagEnum.WORLD_ROTATION | DirtyFlagEnum.WORLD_SCALE | DirtyFlagEnum.WWORLD_POS;
    }

    private _worldTolocalMatrix: Mat4 = Mat4.create();
    get worldTolocalMatrix(): Mat4
    {
        Mat4.invert(this.worldMatrix, this._worldTolocalMatrix);
        return this._worldTolocalMatrix;
    }

    /**
     * 通知子节点需要计算worldmatrix
     * @param node
     */
    private static NotifyChildSelfDirty(node: Transform)
    {
        for (let child of node.children)
        {
            if (!(child.dirtyFlag & DirtyFlagEnum.WORLDMAT))
            {
                child.dirtyFlag = child.dirtyFlag | DirtyFlagEnum.WORLDMAT;
                this.NotifyChildSelfDirty(child);
            }
        }
    }

    // private static linkRefScene(node: Transform, scene: Scene)
    // {
    //     if (node.refScene != scene)
    //     {
    //         node.refScene = scene;
    //         for (let child of node.children)
    //         {
    //             this.linkRefScene(child, scene);
    //         }
    //     }
    // }

    /**
     * 修改local属性后，标记dirty
     */
    private markDirty()
    {
        this.dirtyFlag = this.dirtyFlag | DirtyFlagEnum.LOCALMAT | DirtyFlagEnum.WORLDMAT;
        Transform.NotifyChildSelfDirty(this);
    }

    ///------------------------------------------父子结构
    /**
     * 添加子物体实例
     */
    addChild(node: Transform)
    {
        if (node.parent != null)
        {
            node.parent.removeChild(node);
        }
        this.children.push(node);
        node.parent = this;
        node.markDirty();
        // Transform.linkRefScene(node, this.refScene);
    }
    /**
     * 移除所有子物体
     */
    removeAllChild()
    {
        //if(this.children==undefined||this.children.length==0) return;
        if (this.children.length == 0) return;
        for (let i = 0, len = this.children.length; i < len; i++)
        {
            this.children[i].parent = null;
        }
        this.children.length = 0;
    }
    /**
     * 移除指定子物体
     */
    removeChild(node: Transform)
    {
        if (node.parent != this || this.children.length == 0)
        {
            throw new Error("not my child.");
        }
        let i = this.children.indexOf(node);
        if (i >= 0)
        {
            this.children.splice(i, 1);
            node.parent = null;
        }
    }
    //-------易用性拓展
    /**
     * 获取世界坐标系下当前z轴的朝向
     */
    getForwardInWorld(out: Vec3): Vec3
    {
        Mat4.transformVector3(Vec3.FORWARD, this.worldMatrix, out);
        Vec3.normalize(out, out);
        return out;
    }
    getRightInWorld(out: Vec3): Vec3
    {
        Mat4.transformVector3(Vec3.RIGHT, this.worldMatrix, out);
        Vec3.normalize(out, out);
        return out;
    }
    getUpInWorld(out: Vec3): Vec3
    {
        Mat4.transformVector3(Vec3.UP, this.worldMatrix, out);
        Vec3.normalize(out, out);
        return out;
    }

    moveInWorld(dir: Vec3, amount: number)
    {
        let dirInLocal = Vec3.create();
        Mat4.transformVector3(dir, this.worldTolocalMatrix, dirInLocal);
        Vec3.AddscaledVec(this._localPosition, dirInLocal, amount, this._localPosition);
        this.markDirty();
        return this;
    }
    moveInlocal(dir: Vec3, amount: number)
    {
        Vec3.AddscaledVec(this._localPosition, dir, amount, this._localPosition);
        this.markDirty();
        return this;
    }

    lookAtPoint(pos: Vec3, up?: Vec3)
    {
        let dirz = Vec3.subtract(this.worldPosition, pos);
        Vec3.normalize(dirz, dirz);
        let dirx = Vec3.cross(up || Vec3.UP, dirz);
        if (Vec3.magnitude(dirx) == 0)
        {
            let dot = Vec3.dot(up || Vec3.UP, dirz);
            if (dot == 1)
            {
                let currentDir = this.getForwardInWorld(Vec3.create());
                this.worldRotation = Quat.fromToRotation(currentDir, dirz, this.worldRotation);
            }
        } else
        {
            Vec3.normalize(dirx, dirx);
            let diry = Vec3.cross(dirz, dirx);
            this.worldRotation = Quat.fromUnitXYZ(dirx, diry, dirz, this.worldRotation);

            Vec3.recycle(diry);
        }

        Vec3.recycle(dirz);
        Vec3.recycle(dirx);
    }

    lookAt(tran: Transform, up?: Vec3)
    {
        this.lookAtPoint(tran.worldPosition, up);
    }

    dispose(): void
    {
        this.parent = null;
        this.children = null;
    }
}
