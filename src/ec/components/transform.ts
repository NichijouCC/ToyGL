import { EC, Icomponent, Ientity } from "../ec";
import { Vec3 } from "../../mathD/vec3";
import { Quat } from "../../mathD/quat";
import { Mat4 } from "../../mathD/mat4";

enum DirtyFlagEnum {
    WWORLD_POS = 0b000100,
    WORLD_ROTATION = 0b001000,
    WORLD_SCALE = 0b010000,
    LOCALMAT = 0b000001,
    WORLDMAT = 0b000010,
}

@EC.RegComp
export class Transform implements Icomponent {
    entity: Ientity;
    parent: Transform;
    child: Transform[] = [];
    dirtyFlag: number = 0;

    //------------------------local属性-------------------------------------------------------------
    //----------------------------------------------------------------------------------------------
    //localposition/localrot/localscale修改之后，markDirty 一下
    //----------------------------------------------------------------------------------------------
    localPosition: Vec3 = Vec3.create();
    localRotation: Quat = Quat.create();
    localScale: Vec3 = Vec3.create(1, 1, 1);
    private _localMatrix: Mat4 = Mat4.create();
    set localMatrix(value: Mat4) {
        this._localMatrix = value;
        Mat4.decompose(this._localMatrix, this.localScale, this.localRotation, this.localPosition);
        this.dirtyFlag = this.dirtyFlag & ~DirtyFlagEnum.LOCALMAT;
        this.dirtyFlag = this.dirtyFlag | DirtyFlagEnum.WORLDMAT;

        Transform.NotifyChildSelfDirty(this);
    }

    get localMatrix() {
        if (this.dirtyFlag & DirtyFlagEnum.LOCALMAT) {
            Mat4.RTS(this.localPosition, this.localScale, this.localRotation, this._localMatrix);
            this.dirtyFlag = this.dirtyFlag & ~DirtyFlagEnum.LOCALMAT;
        }
        return this._localMatrix;
    }

    //-------------------------world属性--------------------------------------------------------------
    //------------------------------------------------------------------------------------------------
    //得到worldmatrix后，不会立刻decompse得到worldpos/worldscale/worldort,而是dirty标记起来.
    //setworld属性都是转换到setlocal属性
    //------------------------------------------------------------------------------------------------
    private _worldPosition: Vec3 = Vec3.create();
    get worldPosition(): Vec3 {
        if (this.dirtyFlag & (DirtyFlagEnum.WORLDMAT | DirtyFlagEnum.WWORLD_POS)) {
            Mat4.getTranslationing(this.worldMatrix, this._worldPosition);
            this.dirtyFlag = this.dirtyFlag & ~DirtyFlagEnum.WWORLD_POS;
        }
        return this._worldPosition;
    }
    set worldPosition(value: Vec3) {
        if (this.parent == null) {
            return;
        }
        if (this.parent.parent == null) {
            this.localPosition = value;
        } else {
            let invparentworld = Mat4.create();
            Mat4.invert(this.parent.worldMatrix, invparentworld);
            Mat4.transformPoint(value, invparentworld, this.localPosition);
            Mat4.recycle(invparentworld);
        }
        this.markdirty();
    }

    private _worldRotation: Quat = Quat.create();
    get worldRotation() {
        if (this.dirtyFlag & (DirtyFlagEnum.WORLDMAT | DirtyFlagEnum.WORLD_ROTATION)) {
            Mat4.getRotationing(this.worldMatrix, this._worldRotation, this.worldScale);
            this.dirtyFlag = this.dirtyFlag & ~DirtyFlagEnum.WORLD_ROTATION;
        }
        return this._worldRotation;
    }
    set worldRotation(value: Quat) {
        if (this.parent == null) {
            return;
        }
        if (this.parent.parent == null) {
            this.localRotation = value;
        } else {
            let invparentworldrot = Quat.create();
            Quat.inverse(this.parent.worldRotation, invparentworldrot);
            Quat.multiply(invparentworldrot, value, this.localRotation);
            Quat.recycle(invparentworldrot);
        }
        this.markdirty();
    }

    private _worldScale: Vec3 = Vec3.create(1, 1, 1);
    get worldScale(): Vec3 {
        if (this.dirtyFlag & (DirtyFlagEnum.WORLDMAT | DirtyFlagEnum.WORLD_SCALE)) {
            Mat4.getScaling(this.worldMatrix, this._worldScale);
            this.dirtyFlag = this.dirtyFlag & ~DirtyFlagEnum.WORLD_SCALE;
        }
        return this._worldScale;
    }
    set worldScale(value: Vec3) {
        if (this.parent == null) {
            return;
        }
        if (this.parent.parent == null) {
            this.localScale = value;
        } else {
            Vec3.divide(value, this.parent.worldScale, this.localScale);
        }
        this.markdirty();
    }

    private _worldMatrix: Mat4 = Mat4.create();
    get worldMatrix(): Mat4 {
        if (this.dirtyFlag & (DirtyFlagEnum.WORLDMAT | DirtyFlagEnum.LOCALMAT)) {
            Mat4.multiply(this.parent.worldMatrix, this.localMatrix, this._worldMatrix);
            this.dirtyFlag = this.dirtyFlag & ~DirtyFlagEnum.WORLDMAT;
            this.dirtyFlag =
                this.dirtyFlag | DirtyFlagEnum.WORLD_ROTATION | DirtyFlagEnum.WORLD_SCALE | DirtyFlagEnum.WWORLD_POS;
        }
        return this._worldMatrix;
    }
    set worldMatrix(value: Mat4) {
        if (this.parent == null) {
            return;
        }
        if (this.parent.parent == null) {
            Mat4.copy(value, this._localMatrix);
            this.localMatrix = this._localMatrix;
        } else {
            let invparentworld = Mat4.create();
            Mat4.invert(this.parent.worldMatrix, invparentworld);
            Mat4.multiply(invparentworld, value, this._localMatrix);
            this.localMatrix = this._localMatrix;
            Mat4.recycle(invparentworld);
            this.dirtyFlag = this.dirtyFlag & ~DirtyFlagEnum.WORLDMAT;
            this.dirtyFlag =
                this.dirtyFlag | DirtyFlagEnum.WORLD_ROTATION | DirtyFlagEnum.WORLD_SCALE | DirtyFlagEnum.WWORLD_POS;
        }
    }

    /**
     * 通知子节点需要计算worldmatrix
     * @param node
     */
    private static NotifyChildSelfDirty(node: Transform) {
        for (let key in node.child) {
            let child = node.child[key];
            if (child.dirtyFlag & DirtyFlagEnum.WORLDMAT) {
                child.dirtyFlag = child.dirtyFlag | DirtyFlagEnum.WORLDMAT;
                this.NotifyChildSelfDirty(child);
            }
        }
    }

    /**
     * 修改local属性后，标记dirty
     */
    markdirty() {
        this.dirtyFlag = this.dirtyFlag | DirtyFlagEnum.LOCALMAT | DirtyFlagEnum.WORLDMAT;
        Transform.NotifyChildSelfDirty(this);
    }

    static addChild(node: Transform, childNode: Transform) {
        if (childNode.parent != null) {
            Transform.removeChild(childNode.parent, childNode);
        }
        node.child[node.child.length] = childNode;
        childNode.markdirty();
    }

    static removeChild(node: Transform, childNode: Transform): Transform {
        let index = node.child.indexOf(childNode);
        if (index >= 0) {
            node.child.splice(index, 1);
        }
        return childNode;
    }

    dispose(): void {
        this.parent = null;
        this.child = null;
    }
}
