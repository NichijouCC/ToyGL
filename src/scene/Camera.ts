import { Rect } from "../mathD/rect";
import { Color } from "../mathD/color";
import { Mat4 } from "../mathD/mat4";
import { GameScreen } from "../gameScreen";
import { Frustum } from "./Frustum";
import { Transform } from "./Transform";
import { Vec3 } from "../mathD/vec3";

export enum ProjectionEnum
{
    PERSPECTIVE,
    ORTHOGRAPH,
}

export enum ClearEnum
{
    COLOR = 0b001,
    DEPTH = 0b010,
    STENCIL = 0b100,
    NONE = 0b00,
}
export class Camera
{
    node: Transform;
    projectionType: ProjectionEnum = ProjectionEnum.PERSPECTIVE;
    //perspective 透视投影
    fov: number = Math.PI * 0.25; //透视投影的fov//verticle field of view

    /**
     * height
     */
    size: number = 2;

    private _near: number = 0.1;
    get near(): number
    {
        return this._near;
    }
    set near(val: number)
    {
        if (this.projectionType == ProjectionEnum.PERSPECTIVE && val < 0.01)
        {
            val = 0.01;
        }
        if (val >= this.far) val = this.far - 0.01;
        this._near = val;
    }
    private _far: number = 1000;
    get far(): number
    {
        return this._far;
    }
    set far(val: number)
    {
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

    get aspect(): number
    {
        return (GameScreen.aspect * this.viewport.width) / this.viewport.height;
    }
    /**
     * 计算相机投影矩阵
     */
    private _Projectmatrix: Mat4 = Mat4.create();
    get projectMatrix(): Mat4
    {
        if (this.needcomputeProjectMat)
        {
            if (this.projectionType == ProjectionEnum.PERSPECTIVE)
            {
                Mat4.projectPerspectiveLH(
                    this.fov,
                    (GameScreen.aspect * this.viewport.width) / this.viewport.height,
                    this.near,
                    this.far,
                    this._Projectmatrix,
                );
            } else
            {
                Mat4.projectOrthoLH(
                    (this.size * (GameScreen.aspect * this.viewport.width)) / this.viewport.height,
                    this.size,
                    this.near,
                    this.far,
                    this._Projectmatrix,
                );
            }
            this.needcomputeProjectMat = false;
        }
        return this._Projectmatrix;
    }

    private _viewProjectMatrix: Mat4 = Mat4.create();
    get viewProjectMatrix(): Mat4
    {
        if (this.needcomputeViewProjectMat)
        {
            Mat4.multiply(this.projectMatrix, this.viewMatrix, this._viewProjectMatrix);
            this.needcomputeViewProjectMat = false;
        }
        return this._viewProjectMatrix;
    }
    private _viewMatrix: Mat4 = Mat4.create();
    get viewMatrix(): Mat4
    {
        if (this.needComputeViewMat)
        {
            let camworld = this.node.worldMatrix;
            //视矩阵刚好是摄像机世界矩阵的逆
            Mat4.invert(camworld, this._viewMatrix);
            this.needComputeViewMat = false;
        }
        return this._viewMatrix;
    }
    private restToDirty()
    {
        this.needComputeViewMat = true;
        this.needcomputeProjectMat = true;
        this.needcomputeViewProjectMat = true;
    }
    private needComputeViewMat: boolean = true;
    private needcomputeProjectMat: boolean = true;
    private needcomputeViewProjectMat: boolean = true;
    /**
     * this._frustum.setFromMatrix(this.viewProjectMatrix);
     * 
     * 
     */
    private _frustum: Frustum = new Frustum();
    beActiveFrustum: boolean = true;
    get frustum(): Frustum
    {
        return this._frustum;
    }


    get worldPos()
    {
        return this.node.worldPosition;
    }

    private _forward: Vec3 = Vec3.create();
    get forwardInword()
    {
        return this.node.getForwardInWorld(this._forward);
    }
}

/**
 * 渲染mask枚举
 */
export enum CullingMask
{
    ui = 0x00000001,
    default = 0x00000002,
    editor = 0x00000004,
    model = 0x00000008,
    everything = 0xffffffff,
}