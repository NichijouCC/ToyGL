import { Rect } from "../../mathD/rect";
import { mat4 } from "../../mathD";
import { Texture2D } from "./texture2d";
import { Camera } from "../camera";
import { Light } from "../light/light";
import { MemoryTexture } from "./memoryTexture";

export class UniformState {
    viewPortPixel: Rect = new Rect(0, 0, 0, 0); // 像素的viewport
    // campos: vec3;

    matrixModel: mat4;
    private _matrixNormalToWorld: mat4 = mat4.create();
    get matrixNormalToWorld(): mat4 {
        mat4.invert(this._matrixNormalToWorld, this.matrixModel);
        mat4.transpose(this._matrixNormalToWorld, this._matrixNormalToWorld);
        return this._matrixNormalToWorld;
    }

    private _matrixNormalToView: mat4 = mat4.create();
    get matrixNormalToView(): mat4 {
        mat4.invert(this._matrixNormalToView, this.matrixModelView);
        mat4.transpose(this._matrixNormalToView, this._matrixNormalToView);
        return this._matrixNormalToView;
    }

    private _matrixMV: mat4 = mat4.create();
    get matrixModelView(): mat4 {
        return mat4.multiply(this._matrixMV, this.curCamera.viewMatrix, this.matrixModel);
    }

    private _matMVP: mat4 = mat4.create();
    get matrixModelViewProject(): mat4 {
        return mat4.multiply(this._matMVP, this.curCamera.viewProjectMatrix, this.matrixModel);
    }

    get matrixView(): mat4 {
        return this.curCamera.viewMatrix;
    }

    get matrixProject(): mat4 {
        return this.curCamera.projectMatrix;
    }

    get matrixViewProject(): mat4 {
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

    boneMatrices: Float32Array | MemoryTexture;
}
