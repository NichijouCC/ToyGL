import { vec3, mat4, quat } from '../mathD/index';
import { EventTarget } from "@mtgoo/ctool";
enum DirtyFlagEnum {
    WWORLD_POS = 0b000100,
    WORLD_ROTATION = 0b001000,
    WORLD_SCALE = 0b010000,
    LOCALMAT = 0b000001,
    WORLDMAT = 0b000010,
}

export class Transform {
    parent: Transform;
    children: Transform[] = [];
    private dirtyFlag: number = 0;
    // private bedirty() { return this.dirtyFlag != 0; }
    name: string;
    readonly id: number;
    static IdCount = 0;
    constructor(name?: string) {
        this.id = Transform.IdCount++;
        this.name = name;
        // --------attach to dirty-------

        let _this = this;
        this._localPosition = new Proxy(vec3.create(), {
            set: function (target, property, value, receiver) {
                target[property as any] = value;
                _this.markDirty();
                return true;
            }
        });

        this._localRotation = new Proxy(quat.create(), {
            set: function (target, property, value, receiver) {
                target[property as any] = value;
                _this.markDirty();
                return true;
            }
        })

        this._localScale = new Proxy(vec3.fromValues(1, 1, 1), {
            set: function (target, property, value, receiver) {
                target[property as any] = value;
                _this.markDirty();
                return true;
            }
        })
    }

    private _localPosition: vec3;
    private _localRotation: quat;
    private _localScale: vec3;

    set localPosition(value: vec3) {
        vec3.copy(this._localPosition, value);
        this.markDirty();
    }

    get localPosition(): vec3 {
        return this._localPosition;
    }

    set localRotation(value: quat) {
        quat.copy(this._localRotation, value);
        this.markDirty();
    }

    get localRotation(): quat {
        return this._localRotation;
    }

    set localScale(value: vec3) {
        vec3.copy(this._localScale, value);
        // this._localScale = value;
        this.markDirty();
    }

    get localScale(): vec3 {
        return this._localScale;
    }

    private _localMatrix: mat4 = mat4.create();
    set localMatrix(value: mat4) {
        this._localMatrix = value;
        // mat4.decompose(this._localMatrix, this._localScale, this._localRotation, this._localPosition);
        mat4.getScaling(this._localScale, this._localMatrix);
        mat4.getTranslation(this._localPosition, this._localMatrix);
        mat4.getRotation(this._localRotation, this._localMatrix);
        this.dirtyFlag = this.dirtyFlag & ~DirtyFlagEnum.LOCALMAT;
        this.dirtyFlag = this.dirtyFlag | DirtyFlagEnum.WORLDMAT;

        Transform.NotifyChildSelfDirty(this);
    }

    get localMatrix() {
        if (this.dirtyFlag & DirtyFlagEnum.LOCALMAT) {
            mat4.fromRotationTranslationScale(this._localMatrix, this._localRotation, this._localPosition, this._localScale);
            this.dirtyFlag = this.dirtyFlag & ~DirtyFlagEnum.LOCALMAT;
        }
        return this._localMatrix;
    }

    // -------------------------world属性--------------------------------------------------------------
    // ------------------------------------------------------------------------------------------------
    // 得到worldmatrix后，不会立刻decompse得到worldpos/worldscale/worldort,而是dirty标记起来.
    // setworld属性转换到setlocal属性
    // ------------------------------------------------------------------------------------------------
    private _worldPosition: vec3 = vec3.create();
    get worldPosition(): vec3 {
        if (this.dirtyFlag & (DirtyFlagEnum.WORLDMAT | DirtyFlagEnum.WWORLD_POS)) {
            mat4.getTranslation(this._worldPosition, this.worldMatrix);
            this.dirtyFlag = this.dirtyFlag & ~DirtyFlagEnum.WWORLD_POS;
        }
        return this._worldPosition;
    }

    set worldPosition(value: vec3) {
        if (this.parent == null) {
            return;
        }
        if (this.parent.parent == null) {
            this._localPosition = value;
        } else {
            const invparentworld = mat4.create();
            mat4.invert(invparentworld, this.parent.worldMatrix);
            // mat4.transformPoint(value, invparentworld, this._localPosition);
            vec3.transformMat4(this._localPosition, value, invparentworld)
            // mat4.recycle(invparentworld);
        }
        this.markDirty();
    }

    private _worldRotation: quat = quat.create();
    get worldRotation() {
        if (this.dirtyFlag & (DirtyFlagEnum.WORLDMAT | DirtyFlagEnum.WORLD_ROTATION)) {
            mat4.getRotation(this._worldRotation, this.worldMatrix);
            this.dirtyFlag = this.dirtyFlag & ~DirtyFlagEnum.WORLD_ROTATION;
        }
        return this._worldRotation;
    }

    set worldRotation(value: quat) {
        if (this.parent == null) {
            return;
        }
        if (this.parent.parent == null) {
            this._localRotation = value;
        } else {
            const invparentworldrot = quat.create();
            quat.invert(invparentworldrot, this.parent.worldRotation);
            quat.multiply(this._localRotation, invparentworldrot, value);
        }
        this.markDirty();
    }

    private _worldScale: vec3 = vec3.fromValues(1, 1, 1);
    get worldScale(): vec3 {
        if (this.dirtyFlag & (DirtyFlagEnum.WORLDMAT | DirtyFlagEnum.WORLD_SCALE)) {
            mat4.getScaling(this._worldScale, this.worldMatrix);
            this.dirtyFlag = this.dirtyFlag & ~DirtyFlagEnum.WORLD_SCALE;
        }
        return this._worldScale;
    }

    set worldScale(value: vec3) {
        if (this.parent == null) {
            return;
        }
        if (this.parent.parent == null) {
            this._localScale = value;
        } else {
            vec3.divide(this._localScale, value, this.parent.worldScale);
        }
        this.markDirty();
    }

    private _worldMatrix: mat4 = mat4.create();
    get worldMatrix(): mat4 {
        if (this.dirtyFlag & (DirtyFlagEnum.WORLDMAT | DirtyFlagEnum.LOCALMAT)) {
            if (this.parent) {
                mat4.multiply(this._worldMatrix, this.parent.worldMatrix, this.localMatrix);
            } else {
                mat4.copy(this.localMatrix, this._worldMatrix);
            }
            this.dirtyFlag = this.dirtyFlag & ~DirtyFlagEnum.WORLDMAT;
            this.dirtyFlag =
                this.dirtyFlag | DirtyFlagEnum.WORLD_ROTATION | DirtyFlagEnum.WORLD_SCALE | DirtyFlagEnum.WWORLD_POS;
        }
        return this._worldMatrix;
    }

    get worldMatrixBedirty() {
        return this.dirtyFlag & (DirtyFlagEnum.WORLDMAT | DirtyFlagEnum.LOCALMAT);
    }

    set worldMatrix(value: mat4) {
        if (this.parent == null) {
            return;
        }
        mat4.copy(this._worldMatrix, value);
        if (this.parent.parent == null) {
            mat4.copy(this._localMatrix, value);
        } else {
            const invparentworld = mat4.create();
            mat4.invert(invparentworld, this.parent.worldMatrix);
            mat4.multiply(this.localMatrix, invparentworld, value);
            // this.setlocalMatrix(this._localMatrix);
        }
        this.dirtyFlag = this.dirtyFlag & ~DirtyFlagEnum.WORLDMAT;
        this.dirtyFlag =
            this.dirtyFlag | DirtyFlagEnum.WORLD_ROTATION | DirtyFlagEnum.WORLD_SCALE | DirtyFlagEnum.WWORLD_POS;
    }

    private _worldTolocalMatrix: mat4 = mat4.create();
    get worldTolocalMatrix(): mat4 {
        mat4.invert(this._worldTolocalMatrix, this.worldMatrix);
        return this._worldTolocalMatrix;
    }

    /**
     * 通知子节点需要计算worldmatrix
     * @param node
     */
    private static NotifyChildSelfDirty(node: Transform) {
        for (const child of node.children) {
            if (!(child.dirtyFlag & DirtyFlagEnum.WORLDMAT)) {
                child.dirtyFlag = child.dirtyFlag | DirtyFlagEnum.WORLDMAT;
                Transform.onDirty.raiseEvent(child);
                this.NotifyChildSelfDirty(child);
            }
        }
    }

    static onDirty = new EventTarget<Transform>();
    /**
     * 修改local属性后，标记dirty
     */
    private markDirty() {
        this.dirtyFlag = this.dirtyFlag | DirtyFlagEnum.LOCALMAT | DirtyFlagEnum.WORLDMAT;
        Transform.NotifyChildSelfDirty(this);
        Transform.onDirty.raiseEvent(this);
    }

    /// ------------------------------------------父子结构
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
        // Transform.linkRefScene(node, this.refScene);
    }

    /**
     * 移除所有子物体
     */
    removeAllChild() {
        // if(this.children==undefined||this.children.length==0) return;
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
        const i = this.children.indexOf(node);
        if (i >= 0) {
            this.children.splice(i, 1);
            node.parent = null;
        }
    }

    // -------易用性拓展
    /**
     * 获取世界坐标系下当前z轴的朝向
     */
    getForwardInWorld(out: vec3): vec3 {
        vec3.transformMat4(out, vec3.FORMAWORLD, this.worldMatrix);
        vec3.normalize(out, out);
        return out;
    }

    getRightInWorld(out: vec3): vec3 {
        vec3.transformMat4(out, vec3.RIGHT, this.worldMatrix);
        vec3.normalize(out, out);
        return out;
    }

    getUpInWorld(out: vec3): vec3 {
        vec3.transformMat4(out, vec3.RIGHT, this.worldMatrix);
        vec3.normalize(out, out);
        return out;
    }

    moveInWorld(dir: vec3, amount: number) {
        const dirInLocal = vec3.create();
        vec3.transformMat4(dirInLocal, dir, this.worldTolocalMatrix);
        vec3.scaleAndAdd(this._localPosition, this._localPosition, dirInLocal, amount);
        this.markDirty();
        return this;
    }

    moveInlocal(dir: vec3, amount: number) {
        vec3.scaleAndAdd(this._localPosition, this._localPosition, dir, amount);
        this.markDirty();
        return this;
    }

    lookAtPoint(pos: vec3, up?: vec3) {
        let temptMat = mat4.create();
        mat4.targetTo(temptMat, this.worldPosition, pos, up ?? vec3.UP);
        this.worldMatrix = temptMat;
    }

    lookAt(tran: Transform, up?: vec3) {
        this.lookAtPoint(tran.worldPosition, up);
    }

    dispose(): void {
        this.parent = null;
        this.children = null;
    }
}
