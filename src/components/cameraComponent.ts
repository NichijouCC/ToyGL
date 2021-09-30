import { Color, mat4, Rect, vec3 } from "../mathD";
import { ECS } from "../core/ecs/ecs";
import { applyMixins } from "../core/util";
import { Component, Entity } from "../scene";
import { Camera, LayerMask, ProjectionEnum } from "../render/camera";
import { ISceneCamera } from "../scene/isceneCamera";

@ECS.registerComp
export class CameraComponent extends Component implements ISceneCamera {
    private _projectMatBeDirty = true;
    private _projectionType: ProjectionEnum = ProjectionEnum.PERSPECTIVE;
    get projectionType() { return this._projectionType; }
    set projectionType(type: ProjectionEnum) { this._projectionType = type; this._projectMatBeDirty = true; }

    // perspective 透视投影
    private _fov: number = Math.PI * 0.25; // 透视投影的fov//vertical field of view
    get fov() { return this._fov; };
    set fov(value: number) { this._fov = value; this._projectMatBeDirty = true; };

    /**
     * height
     */
    private _size: number = 2;
    get size() { return this._size; };
    set size(value: number) { this._size = value; this._projectMatBeDirty = true; };

    private _near: number = 0.1;
    get near(): number { return this._near; }
    set near(val: number) {
        if (this._projectionType == ProjectionEnum.PERSPECTIVE && val < 0.01) {
            val = 0.01;
        }
        if (val >= this.far) val = this.far - 0.01;
        this._near = val;
        this._projectMatBeDirty = true;
    }

    private _far: number = 500;
    get far(): number { return this._far; }
    set far(val: number) {
        if (val <= this.near) val = this.near + 0.01;
        this._far = val;
        this._projectMatBeDirty = true;
    }

    private _viewport: Rect = Rect.create(0, 0, 1, 1);
    get viewport() { return this._viewport; }
    set viewport(value: Rect) { Rect.copy(value, this._viewport); this._projectMatBeDirty = true; }

    enableClearColor = true;
    backgroundColor: Color = Color.create(0.3, 0.3, 0.3, 1);
    dePthValue: number = 1.0;
    enableClearDepth: boolean = true;
    stencilValue: number = 0;
    enableClearStencil = false;
    cullingMask: LayerMask = LayerMask.default;

    private _aspect: number = 16 / 9;
    get aspect(): number { return this._aspect; }
    set aspect(aspect: number) {
        if (aspect != this._aspect) {
            this._aspect = aspect;
            this._projectMatBeDirty = true;
        }
    }

    private _viewMatrix: mat4 = mat4.create();

    get viewMatrix() {
        return mat4.invert(this._viewMatrix, this.worldMatrix);
    }
    /**
     * 计算相机投影矩阵
     */
    private _projectMatrix: mat4 = mat4.create();
    get projectMatrix(): mat4 {
        if (this._projectMatBeDirty) {
            if (this._projectionType == ProjectionEnum.PERSPECTIVE) {
                mat4.perspective(this._projectMatrix, this._fov, (this._aspect * this._viewport.width) / this._viewport.height, this.near, this.far);
            } else {
                const width = 0.5 * (this._size * (this._aspect * this._viewport.width)) / this._viewport.height;
                const height = 0.5 * this._size;
                mat4.ortho(this._projectMatrix, -width, width, -height, height, this.near, this.far);
            }
            this._projectMatBeDirty = false;
        }
        return this._projectMatrix;
    }

    priority: number = 0;
    get worldPos() { return this.entity.worldPosition; }
    get worldMatrix() { return this.entity.worldMatrix; }

    private _forward: vec3 = vec3.create();
    get forwardInWorld() {
        return this.entity.getForwardInWorld(this._forward);
    }

    private _right: vec3 = vec3.create();
    get rightInWorld() {
        return this.entity.getRightInWorld(this._right);
    }

    private _up: vec3 = vec3.create();
    get upInWorld() {
        return this.entity.getUpInWorld(this._up);
    }
    constructor(props?: Partial<Camera>) {
        super(props as any);
        Object.defineProperty(this._viewport, "x", {
            get: () => { return this._viewport[0]; },
            set: (value: number) => { this._viewport[0] = value; this._projectMatBeDirty = true; }
        });
        Object.defineProperty(this._viewport, "y", {
            get: () => { return this._viewport[1]; },
            set: (value: number) => { this._viewport[1] = value; this._projectMatBeDirty = true; }
        });
        Object.defineProperty(this._viewport, "z", {
            get: () => { return this._viewport[2]; },
            set: (value: number) => { this._viewport[2] = value; this._projectMatBeDirty = true; }
        });
        Object.defineProperty(this._viewport, "w", {
            get: () => { return this._viewport[3]; },
            set: (value: number) => { this._viewport[3] = value; this._projectMatBeDirty = true; }
        });
    }

    lookAtPoint(point: vec3) {
        this.entity?.lookAtPoint(point);
    }

    lookAt(node: Entity) {
        this.entity?.lookAt(node);
    }

    clone(): CameraComponent {
        throw new Error("Method not implemented.");
    }
}