import { Rect } from "../mathD/rect";
import { Texture } from "../resources/assets/texture";
import { Camera } from "../ec/components/camera";
import { Mat4 } from "../mathD/mat4";
import { Irenderable } from "../scene/frameState";

export class RenderContext {
    activeTexCount: number = 0;

    viewPortPixel: Rect = new Rect(0, 0, 0, 0); //像素的viewport
    // campos: vec3;

    get matrixModel(): Mat4 {
        return this.curRender.modelMatrix;
    }
    private _matrixNormalToworld: Mat4 = Mat4.create();
    get matrixNormalToworld(): Mat4 {
        Mat4.invert(this.matrixModel, this._matrixNormalToworld);
        Mat4.transpose(this._matrixNormalToworld, this._matrixNormalToworld);
        return this._matrixNormalToworld;
    }
    private _matrixMV: Mat4 = Mat4.create();
    get matrixModelView(): Mat4 {
        return Mat4.multiply(this.curCamera.ViewProjectMatrix, this.matrixModel, this._matrixMV);
    }
    private _matMVP: Mat4 = Mat4.create();
    get matrixModelViewProject(): Mat4 {
        return Mat4.multiply(this.curCamera.ViewProjectMatrix, this.matrixModel, this._matMVP);
    }

    get matrixView(): Mat4 {
        return this.curCamera.ViewMatrix;
    }

    get matrixProject(): Mat4 {
        return this.curCamera.ProjectMatrix;
    }
    get matrixViewProject(): Mat4 {
        return this.curCamera.ViewProjectMatrix;
    }
    //matrixNormal: matrix = new matrix();
    //最多8灯，再多不管
    intLightCount: number = 0;
    vec4LightPos: Float32Array = new Float32Array(32);
    vec4LightDir: Float32Array = new Float32Array(32);
    floatLightSpotAngleCos: Float32Array = new Float32Array(8);

    lightmap: Texture[] = null;
    // lightmapUV: number = 1;
    // lightmapOffset: vec4 = vec4.create(1, 1, 0, 0);
    curRender: Irenderable;
    curCamera: Camera;
}
