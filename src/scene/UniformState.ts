import { Rect } from "../mathD/rect";
import { Mat4 } from "../mathD/mat4";
import { Texture2D } from "./asset/texture/Texture2d";
import { Camera } from "./Camera";
import { Light } from "./light/Light";
import { MemoryTexture } from "./asset/texture/MemoryTexture";

export class UniformState {
    viewPortPixel: Rect = new Rect(0, 0, 0, 0); // 像素的viewport
    // campos: vec3;

    matrixModel: Mat4;
    private _matrixNormalToworld: Mat4 = Mat4.create();
    get matrixNormalToworld(): Mat4 {
        Mat4.invert(this.matrixModel, this._matrixNormalToworld);
        Mat4.transpose(this._matrixNormalToworld, this._matrixNormalToworld);
        return this._matrixNormalToworld;
    }

    private _matrixNormalToView: Mat4 = Mat4.create();
    get matrixNormalToView(): Mat4 {
        Mat4.invert(this.matrixModelView, this._matrixNormalToView);
        Mat4.transpose(this._matrixNormalToView, this._matrixNormalToView);
        return this._matrixNormalToView;
    }

    private _matrixMV: Mat4 = Mat4.create();
    get matrixModelView(): Mat4 {
        return Mat4.multiply(this.curCamera.viewMatrix, this.matrixModel, this._matrixMV);
    }

    private _matMVP: Mat4 = Mat4.create();
    get matrixModelViewProject(): Mat4 {
        return Mat4.multiply(this.curCamera.viewProjectMatrix, this.matrixModel, this._matMVP);
    }

    get matrixView(): Mat4 {
        return this.curCamera.viewMatrix;
    }

    get matrixProject(): Mat4 {
        return this.curCamera.projectMatrix;
    }

    get matrixViewProject(): Mat4 {
        return this.curCamera.viewProjectMatrix;
    }

    get fov(): number {
        return this.curCamera.fov;
    }

    get aspect(): number {
        return this.curCamera.aspect;
    }
    // matrixNormal: matrix = new matrix();

    private _lights: Light[] = [];
    set lights(value: Light[]) {
        this._lights = value;
    }

    get lightCount() { return this._lights.length; };

    lightmap: Texture2D[] = null;
    // lightmapUV: number = 1;
    // lightmapOffset: vec4 = vec4.create(1, 1, 0, 0);
    // curRender: Irenderable;
    curCamera: Camera;

    // lightShadowTex: RenderTexture[] = [];

    boneMatrices: Float32Array;
    boneTexture: MemoryTexture;
}
