import { Rect } from "../mathD/rect";
import { mat4 } from "../mathD";
import { Texture2D } from "./texture2d";
import { Light } from "../scene/light/light";
import { MemoryTexture } from "./memoryTexture";
import { ICamera } from "./camera";

export class UniformState {
    matrixModel: mat4;
    private _matrixNormalToWorld: mat4 = new Float32Array(16);
    get matrixNormalToWorld(): mat4 {
        mat4.invert(this._matrixNormalToWorld, this.matrixModel);
        mat4.transpose(this._matrixNormalToWorld, this._matrixNormalToWorld);
        return this._matrixNormalToWorld;
    }

    private _matrixNormalToView: mat4 = new Float32Array(16);
    get matrixNormalToView(): mat4 {
        mat4.invert(this._matrixNormalToView, this.matrixModelView);
        mat4.transpose(this._matrixNormalToView, this._matrixNormalToView);
        return this._matrixNormalToView;
    }

    viewer: ICamera;
    matrixViewProject = new Float32Array(16);
    private _matrixMV: mat4 = new Float32Array(16);
    get matrixModelView(): mat4 {
        return mat4.multiply(this._matrixMV, this.viewer.viewMatrix, this.matrixModel);
    }

    private _matMVP: mat4 = new Float32Array(16);
    get matrixModelViewProject(): mat4 {
        return mat4.multiply(this._matMVP, this.matrixViewProject, this.matrixModel);
    }

    get matrixView(): mat4 {
        return this.viewer.viewMatrix;
    }

    get matrixProject(): mat4 {
        return this.viewer.projectMatrix;
    }
    // get fov(): number {
    //     return this.viewer.fov;
    // }

    // get aspect(): number {
    //     return this.viewer.aspect;
    // }
    // get far(): number {
    //     return this.viewer.far;
    // }
    private _lights: Light[] = [];
    set lights(value: Light[]) {
        this._lights = value;
    }

    get lightCount() { return this._lights.length; };

    lightmap: Texture2D[] = null;

    boneMatrices: Float32Array | MemoryTexture;
}
