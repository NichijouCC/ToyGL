import { EC, Icomponent, Ientity } from "../ec";
import { Vec3 } from "../../mathD/vec3";
import { Quat } from "../../mathD/quat";
import { Mat4 } from "../../mathD/mat4";
import { IframeState } from "../../scene/frameState";

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
    children: Transform[] = [];
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
        this.markDirty();
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
        this.markDirty();
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
        this.markDirty();
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
        for (let key in node.children) {
            let child = node.children[key];
            if (child.dirtyFlag & DirtyFlagEnum.WORLDMAT) {
                child.dirtyFlag = child.dirtyFlag | DirtyFlagEnum.WORLDMAT;
                this.NotifyChildSelfDirty(child);
            }
        }
    }

    /**
     * 修改local属性后，标记dirty
     */
    markDirty() {
        this.dirtyFlag = this.dirtyFlag | DirtyFlagEnum.LOCALMAT | DirtyFlagEnum.WORLDMAT;
        Transform.NotifyChildSelfDirty(this);
    }

    ///------------------------------------------父子结构
    /**
     * 添加子物体实例
     */
    addChild(node: Transform) {
        if (node.parent != null) {
            node.parent.removeChild(node);
        }
        this.children.push(node);
        node.parent = this;

        node.markDirty();
    }
    /**
     * 移除所有子物体
     */
    removeAllChild() {
        //if(this.children==undefined||this.children.length==0) return;
        if (this.children.length == 0) return;
        for (let i = 0, len = this.children.length; i < len; i++) {
            this.children[i].parent = null;
        }
        this.children.length = 0;
    }
    /**
     * 移除指定子物体
     */
    removeChild(node: Transform) {
        if (node.parent != this || this.children.length == 0) {
            throw new Error("not my child.");
        }
        let i = this.children.indexOf(node);
        if (i >= 0) {
            this.children.splice(i, 1);
            node.parent = null;
        }
    }

    update(frameState: IframeState): void {}
    dispose(): void {
        this.parent = null;
        this.children = null;
    }
}
