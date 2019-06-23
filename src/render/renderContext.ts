import { Rect } from "../mathD/rect";

import { Texture } from "../resources/assets/texture";

import { Material } from "../resources/assets/material";

import { IRender } from "./rendermgr";

import { Camera } from "../ec/components/camera";

import { Transform } from "../ec/components/transform";

export class RenderContext {
    activeTexCount: number = 0;

    viewPortPixel: Rect = new Rect(0, 0, 0, 0); //像素的viewport
    campos: vec3;

    matrixModel: mat4;
    matrixNormalToworld: mat4 = mat4.create();
    matrixModelView: mat4 = mat4.create();
    matrixModelViewProject: mat4 = mat4.create();

    matrixView: mat4;
    matrixProject: mat4;
    matrixViewProject: mat4;

    //matrixNormal: matrix = new matrix();
    //最多8灯，再多不管
    intLightCount: number = 0;
    vec4LightPos: Float32Array = new Float32Array(32);
    vec4LightDir: Float32Array = new Float32Array(32);
    floatLightSpotAngleCos: Float32Array = new Float32Array(8);

    lightmap: Texture[] = null;
    // lightmapUV: number = 1;
    // lightmapOffset: vec4 = vec4.create(1, 1, 0, 0);

    curMat: Material;
    curPorgram: webGraph.ShaderProgram; //同一个mat，在加载完成前和完成后shader并不相同。
    curMesh: GlMesh;
    curRender: IRender;
    curCamera: Camera;

    //----------------------frame data
    lightmapIndex: number;
    lightmapTilingOffset: vec4;
    jointMatrixs: Float32Array;
    //-------------
    updateCamera(camera: Camera) {
        this.curCamera = camera;
        this.matrixView = camera.ViewMatrix;
        this.matrixProject = camera.ProjectMatrix;
        this.matrixViewProject = camera.ViewProjectMatrix;
        this.campos = camera.gameObject.transform.worldPosition;
    }

    updateOverlay() {
        mat4.identity(this.matrixModelViewProject);
    }
    updateModel(model: Transform) {
        this.matrixModel = model.worldMatrix;
        mat4.multiply(this.matrixView, this.matrixModel, this.matrixModelView);
        mat4.multiply(this.matrixViewProject, this.matrixModel, this.matrixModelViewProject);
    }

    updateModeTrail() {
        mat4.copy(this.matrixView, this.matrixModelView);
        mat4.copy(this.matrixViewProject, this.matrixModelViewProject);
    }
}
