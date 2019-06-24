import { Icomponent, Ientity, CullingMask } from "../ec";
import { Rect } from "../../mathD/rect";
import { Color } from "../../mathD/color";
import { IframeState } from "../../scene/frameState";
import { Mat4 } from "../../mathD/mat4";
import { Transform } from "./transform";
import { GameScreen } from "../../gameScreen";

export enum ProjectionEnum {
    PERSPECTIVE,
    ORTHOGRAPH,
}

export enum ClearEnum {
    COLOR = 0b001,
    DEPTH = 0b010,
    STENCIL = 0b100,
}

export class Camera implements Icomponent {
    entity: Ientity;
    projectionType: ProjectionEnum = ProjectionEnum.PERSPECTIVE;
    //perspective 透视投影
    fov: number = Math.PI * 0.25; //透视投影的fov//verticle field of view

    /**
     * height
     */
    size: number = 2;

    private _near: number = 0.01;
    get near(): number {
        return this._near;
    }
    set near(val: number) {
        if (this.projectionType == ProjectionEnum.PERSPECTIVE && val < 0.01) {
            val = 0.01;
        }
        if (val >= this.far) val = this.far - 0.01;
        this._near = val;
    }
    private _far: number = 1000;
    get far(): number {
        return this._far;
    }
    set far(val: number) {
        if (val <= this.near) val = this.near + 0.01;
        this._far = val;
    }
    viewport: Rect = Rect.create(0, 0, 1, 1);
    clearFlag: ClearEnum = ClearEnum.COLOR | ClearEnum.DEPTH;
    backgroundColor: Color = Color.create(0.3, 0.3, 0.3, 1);
    dePthValue: number = 1.0;
    stencilValue: number = 0;

    priority: number = 0;
    cullingMask: CullingMask = CullingMask.default;
    update(frameState: IframeState): void {
        frameState.cameraList.push(this);
    }

    private _viewMatrix: Mat4 = Mat4.create();
    get ViewMatrix(): Mat4 {
        if (this.needComputeViewMat) {
            let camworld = (this.entity.getCompByName("Transform") as Transform).worldMatrix;
            //视矩阵刚好是摄像机世界矩阵的逆
            Mat4.invert(camworld, this._viewMatrix);
            this.needComputeViewMat = false;
        }
        return this._viewMatrix;
    }
    /**
     * 计算相机投影矩阵
     */
    private _Projectmatrix: Mat4 = Mat4.create();
    get ProjectMatrix(): Mat4 {
        if (this.needcomputeProjectMat) {
            if (this.projectionType == ProjectionEnum.PERSPECTIVE) {
                Mat4.projectPerspectiveLH(this.fov, GameScreen.aspect, this.near, this.far, this._Projectmatrix);
            } else {
                Mat4.projectOrthoLH(this.size * GameScreen.aspect, this.size, this.near, this.far, this._Projectmatrix);
            }
            this.needcomputeProjectMat = false;
        }
        return this._Projectmatrix;
    }
    // private ohMat:Mat4=Mat4.create();
    // getOrthoLH_ProjectMatrix():Mat4
    // {
    //     Mat4.project_OrthoLH(this.PixelHeight * GameScreen.aspect, this.PixelHeight, this.near, this.far, this.ohMat);
    //     return this.ohMat;
    // }
    private _viewProjectMatrix: Mat4 = Mat4.create();
    get ViewProjectMatrix(): Mat4 {
        if (this.needcomputeViewProjectMat) {
            Mat4.multiply(this.ProjectMatrix, this.ViewMatrix, this._viewProjectMatrix);
            this.needcomputeViewProjectMat = false;
        }
        return this._viewProjectMatrix;
    }

    private restToDirty() {
        this.needComputeViewMat = true;
        this.needcomputeProjectMat = true;
        this.needcomputeViewProjectMat = true;
    }
    private needComputeViewMat: boolean = true;
    private needcomputeProjectMat: boolean = true;
    private needcomputeViewProjectMat: boolean = true;

    dispose(): void {}
}
