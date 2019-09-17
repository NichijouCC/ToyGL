import { Camera, ProjectionEnum } from "../ec/components/camera";
import { Geometry } from "../resources/assets/geometry";
import { GameScreen } from "../gameScreen";
import { GlBuffer } from "../render/webglRender";
import { Irenderable, IframeState } from "../scene/frameState";
import { DefMaterial } from "../resources/defAssets/defMaterial";
import { CullingMask } from "../ec/ec";
import { VertexAttEnum } from "../render/vertexAttType";
import { Mat4 } from "../mathD/mat4";
import { GlConstants } from "../render/GlConstant";
import { DefShader } from "../resources/defAssets/defShader";
import { Material } from "../resources/assets/material";

export class Debug {
    private static map: { [id: number]: Geometry } = {};
    static drawCameraWireframe(camera: Camera): Irenderable {
        let posArr: number[] = [];
        switch (camera.projectionType) {
            case ProjectionEnum.PERSPECTIVE:
                let aspect = GameScreen.aspect;
                let zNear = camera.near;
                let nearHalfWidth = zNear * Math.tan(camera.fov * 0.5);
                let nearHalfHeight = nearHalfWidth / aspect;
                let near0 = [-nearHalfWidth, -nearHalfHeight, -zNear];
                let near1 = [-nearHalfWidth, nearHalfHeight, -zNear];
                let near2 = [nearHalfWidth, nearHalfHeight, -zNear];
                let near3 = [nearHalfWidth, -nearHalfHeight, -zNear];

                let zFar = camera.far;
                let farHalfWidth = zFar * Math.tan(camera.fov * 0.5);
                let farHalfHeight = farHalfWidth / aspect;
                let far0 = [-farHalfWidth, -farHalfHeight, -zFar];
                let far1 = [-farHalfWidth, farHalfHeight, -zFar];
                let far2 = [farHalfWidth, farHalfHeight, -zFar];
                let far3 = [farHalfWidth, -farHalfHeight, -zFar];

                posArr = posArr.concat(near0, near1, near1, near2, near2, near3, near3, near0);
                posArr = posArr.concat(far0, far1, far1, far2, far2, far3, far3, far0);
                posArr = posArr.concat(near0, far0, near1, far1, near2, far2, near3, far3);
                break;
            case ProjectionEnum.ORTHOGRAPH:
                break;
        }
        if (this.map[camera.entity.guid] == null) {
            switch (camera.projectionType) {
                case ProjectionEnum.PERSPECTIVE:
                    let geometry = Geometry.fromCustomData({
                        atts: {
                            position: {
                                glBuffer: GlBuffer.fromViewData(GlConstants.ARRAY_BUFFER, new Float32Array(posArr))
                                    .buffer,
                                componentSize: 3,
                                count: posArr.length / 3,
                            },
                        },
                        primitiveType: GlConstants.LINES,
                    });
                    this.map[camera.entity.guid] = geometry;
                    return {
                        geometry: geometry,
                        material: DefMaterial.fromType("3dColor"),
                        modelMatrix: camera.entity.transform.worldMatrix,
                        maskLayer: CullingMask.default,
                    };
                case ProjectionEnum.ORTHOGRAPH:
                    break;
            }
        } else {
            this.map[camera.entity.guid].updateAttData(VertexAttEnum.POSITION, new Float32Array(posArr));
            return {
                geometry: this.map[camera.entity.guid],
                material: this.editorMat(),
                modelMatrix: camera.entity.transform.worldMatrix,
                maskLayer: CullingMask.default,
            };
        }
    }

    private static _edirotMat: Material;
    static editorMat() {
        if (this._edirotMat == null) {
            let mat = new Material();
            mat.shader = DefShader.fromType("3dColor");
            mat.queue = 1;
            this._edirotMat = mat;
        }
        return this._edirotMat;
    }
}
