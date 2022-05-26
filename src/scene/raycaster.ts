import { Input } from "../input";
import { mat4, vec3, vec4 } from "../mathD";
import { ToyGL } from "../toygl";

export class RayCaster {
    private _toy: ToyGL;
    constructor(toy: ToyGL) {
        this._toy = toy;
    }

    raycastAll() {

    }

    pick() {
        const screenPos = Input.mouse.position;
        const { screen } = this._toy;
        const ndc_x = (screenPos[0] / screen.width) * 2 - 1;
        const ndc_y = (screenPos[1] / screen.height) * 2 - 1;
        const ndc_near = vec3.fromValues(ndc_x, ndc_y, -1);
        const ndc_far = vec3.fromValues(ndc_x, ndc_y, 1);
        const view_near = ndcToView(ndc_near, this._toy.world.mainCamera.projectMatrix);
        const view_far = ndcToView(ndc_far, this._toy.world.mainCamera.projectMatrix);
        this._toy.gizmos.drawLine(view_near, view_far);
    }
}

function ndcToView(ndcPos: vec3, projectMat: mat4) {
    const inversePrjMat = mat4.invert(mat4.create(), projectMat);
    const viewPosH = vec4.transformMat4(vec4.create(), vec4.fromValues(ndcPos[0], ndcPos[1], ndcPos[2], 1), inversePrjMat);
    return vec3.fromValues(viewPosH[0] / viewPosH[3], viewPosH[1] / viewPosH[3], viewPosH[2] / viewPosH[3]);
}
