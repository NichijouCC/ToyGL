import { Rect } from "../mathD/rect";
import { Color } from "../mathD/color";
import { Frustum } from "./frustum";
import { Transform } from "../core/transform";
import { UniqueObject } from "../core/uniqueObject";

import { vec3, mat4 } from '../mathD';
import { Entity } from "../core/ecs/entity";

export enum ProjectionEnum {
    PERSPECTIVE,
    ORTHOGRAPH,
}

export enum ClearEnum {
    COLOR = 0b001,
    DEPTH = 0b010,
    STENCIL = 0b100,
    NONE = 0b00,
}
export class Camera extends UniqueObject {

    private _projectionType: ProjectionEnum = ProjectionEnum.PERSPECTIVE;
    get projectionType() { return this._projectionType; }
    set projectionType(type: ProjectionEnum) { this._projectionType = type; this.projectMatBedirty = true; }

    // perspective 透视投影
    private _fov: number = Math.PI * 0.25; // 透视投影的fov//verticle field of view
    get fov() { return this._fov; };
    set fov(value: number) { this._fov = value; this.projectMatBedirty = true; };

    /**
     * height
     */
    private _size: number = 2;
    get size() { return this._size; };
    set size(value: number) { this._size = value; this.projectMatBedirty = true; };

    private _near: number = 0.1;
    get near(): number { return this._near; }
    set near(val: number) {
        if (this._projectionType == ProjectionEnum.PERSPECTIVE && val < 0.01) {
            val = 0.01;
        }
        if (val >= this.far) val = this.far - 0.01;
        this._near = val;
        this.projectMatBedirty = true;
    }

    private _far: number = 500;
    get far(): number { return this._far; }
    set far(val: number) {
        if (val <= this.near) val = this.near + 0.01;
        this._far = val;
        this.projectMatBedirty = true;
    }

    private _viewport: Rect = Rect.create(0, 0, 1, 1);
    get viewport() { return this._viewport; }
    set viewport(value: Rect) { Rect.copy(value, this._viewport); this.projectMatBedirty = true; }

    backgroundColor: Color = Color.create(0.3, 0.3, 0.3, 1);
    enableClearColor = true;
    dePthValue: number = 1.0;
    enableClearDepth: boolean = true;
    stencilValue: number = 0;
    enableClearStencil = false;
    priority: number = 0;
    cullingMask: CullingMask = CullingMask.default;

    private _aspect: number = 16 / 9;
    get aspect(): number { return this._aspect; }
    set aspect(aspect: number) {
        if (aspect != this._aspect) {
            this._aspect = aspect;
            this.projectMatBedirty = true;
        }
    }


    _node: Transform;
    get node() { return this._node };
    set node(value: Transform) { this._node = value; };
    /**
     * 计算相机投影矩阵
     */
    private _Projectmatrix: mat4 = mat4.create();
    get projectMatrix(): mat4 {
        if (this.projectMatBedirty) {
            if (this._projectionType == ProjectionEnum.PERSPECTIVE) {
                mat4.perspective(this._Projectmatrix, this._fov, (this._aspect * this._viewport.width) / this._viewport.height, this.near, this.far);
            } else {
                let width = 0.5 * (this._size * (this._aspect * this._viewport.width)) / this._viewport.height;
                let height = 0.5 * this._size;
                mat4.ortho(this._Projectmatrix, -width, width, -height, height, this.near, this.far)
            }
            this.projectMatBedirty = false;
        }
        return this._Projectmatrix;
    }

    private _viewProjectMatrix: mat4 = mat4.create();
    get viewProjectMatrix(): mat4 {
        mat4.multiply(this._viewProjectMatrix, this.projectMatrix, this.viewMatrix);
        return this._viewProjectMatrix;
    }

    private _viewMatrix: mat4 = mat4.create();
    get viewMatrix(): mat4 {
        const camworld = this.node.worldMatrix;
        mat4.invert(this._viewMatrix, camworld);
        return this._viewMatrix;
    }

    private projectMatBedirty = true;
    /**
     * this._frustum.setFromMatrix(this.viewProjectMatrix);
     */
    private _frustum = new Frustum();
    beActiveFrustum = true;
    get frustum() { return this._frustum; }

    get worldPos() { return this.node.worldPosition; }
    get worldMatrix() { return this.node.worldMatrix; }

    private _forward: vec3 = vec3.create();
    get forwardInword() {
        return this.node.getForwardInWorld(this._forward);
    }
    lookAtPoint(point: vec3) {
        this.node?.lookAtPoint(point);
    }

    lookAt(node: Entity) {
        this.node?.lookAt(node);
    }

    constructor() {
        super();
        Object.defineProperty(this._viewport, "x", {
            get: () => { return this._viewport[0]; },
            set: (value: number) => { this._viewport[0] = value; this.projectMatBedirty = true; }
        });
        Object.defineProperty(this._viewport, "y", {
            get: () => { return this._viewport[1]; },
            set: (value: number) => { this._viewport[1] = value; this.projectMatBedirty = true; }
        });
        Object.defineProperty(this._viewport, "z", {
            get: () => { return this._viewport[2]; },
            set: (value: number) => { this._viewport[2] = value; this.projectMatBedirty = true; }
        });
        Object.defineProperty(this._viewport, "w", {
            get: () => { return this._viewport[3]; },
            set: (value: number) => { this._viewport[3] = value; this.projectMatBedirty = true; }
        });
    }
}

/**
 * 渲染mask枚举
 */
export enum CullingMask {
    ui = 0x00000001,
    default = 0x00000002,
    editor = 0x00000004,
    model = 0x00000008,
    everything = 0xffffffff,
}
