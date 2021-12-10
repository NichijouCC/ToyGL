import { mat4, vec3, vec4 } from "./extends";

export function ndcToView(ndcPos: vec3, projectMat: mat4) {
    const inversePrjMat = mat4.invert(mat4.create(), projectMat);
    const viewPosH = vec4.transformMat4(vec4.create(), vec4.fromValues(ndcPos[0], ndcPos[1], ndcPos[2], 1), inversePrjMat);
    return vec3.fromValues(viewPosH[0] / viewPosH[3], viewPosH[1] / viewPosH[3], viewPosH[2] / viewPosH[3]);
}

export function ndcToWorld(ndcPos: vec3, projectMat: mat4, camToWorld: mat4) {
    const view_pos = ndcToView(ndcPos, projectMat);
    return vec3.transformMat4(vec3.create(), view_pos, camToWorld);
}
