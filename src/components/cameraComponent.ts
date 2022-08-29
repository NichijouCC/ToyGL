import { Color, mat4, quat, Rect, vec2, vec3 } from "../mathD";
import { Camera, LayerMask } from "../render/camera";
import { ISceneCamera } from "../scene/isceneCamera";
import { Component, Entity } from "../scene/entity";
import { RenderTarget } from "../render";
import { Ray } from "../scene/ray";

export const CAMERA_ASPECT = Symbol("aspect");

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

    private _far: number = 3000;
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
    renderTarget: RenderTarget;

    private _aspect: number = 16 / 9;
    get aspect(): number { return this._aspect; }
    /**
     * private
     */
    set [CAMERA_ASPECT](aspect: number) {
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
        super();
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


    viewTargetPoint(point: vec3, distance: number, angle: vec3 = vec3.fromValues(-45, 0, 0)) {
        let rot = quat.fromEuler(quat.create(), angle[0], angle[1], angle[2]);
        let forward = vec3.transformQuat(vec3.create(), vec3.FORWARD, rot);
        let camPos = vec3.scaleAndAdd(vec3.create(), point, forward, distance);
        this.entity.worldPosition = camPos;
        this.entity.worldRotation = rot;
    }

    lookAt(node: Entity, up?: vec3) {
        this.entity?.lookAt(node, up);
    }

    lookAtPoint(point: vec3, up?: vec3) {
        this.entity?.lookAtPoint(point, up);
    }

    /**
     * 左上角0,0, y down 
     * 
     * x in 0 ~ canvas.width, y in 0 ~ canvas.height
     * @param screenPos 屏幕坐标
     */
    screenPointToRay(screenPos: vec2) {
        let world = this.entity.ecs
        let { mainCamera, screen } = world;
        const ndc_x = (screenPos[0] / screen.width) * 2 - 1;
        const ndc_y = -1 * ((screenPos[1] / screen.height) * 2 - 1);
        const ndc_far = vec3.fromValues(ndc_x, ndc_y, 1);
        const world_far = mat4.ndcToWorld(vec3.create(), ndc_far, mainCamera.projectMatrix, mainCamera.worldMatrix);
        let ray = new Ray().setByTwoPoint(mainCamera.worldPos, world_far);
        world.gizmos.drawLine(mainCamera.worldPos, world_far);
        return ray;
    }

    /**
     * 左下角0,0, y up, x in 0~1,y in 0~1,
     * @param viewportPos 视口坐标
     */
    viewportPointToRay(viewportPos: vec2) {
        let world = this.entity.ecs
        let { mainCamera } = world;
        const ndc_x = viewportPos[0] - 0.5;
        const ndc_y = viewportPos[1] - 0.5;
        const ndc_near = vec3.fromValues(ndc_x, ndc_y, -1);
        const world_near = mat4.ndcToWorld(vec3.create(), ndc_near, mainCamera.projectMatrix, mainCamera.worldMatrix);
        // const ndc_far = vec3.fromValues(ndc_x, ndc_y, 1);
        // const world_far = mat4.ndcToWorld(vec3.create(), ndc_far, mainCamera.projectMatrix, mainCamera.worldMatrix);
        // let ray1 = new Ray().setByTwoPoint(world_near, world_far);
        let ray = new Ray().setByTwoPoint(mainCamera.worldPos, world_near);
        return ray;
    }

    clone(): CameraComponent {
        throw new Error("Method not implemented.");
    }
}

export enum ProjectionEnum {
    PERSPECTIVE,
    ORTHOGRAPH,
}
