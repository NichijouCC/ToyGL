import { CameraType } from "./GltfJsonStruct";
// import { Camera, ProjectionEnum } from "../../ec/components/camera";
import { IgltfJson } from "../LoadglTF";
import { Camera, ProjectionEnum } from "../../../scene/Camera";

export class ParseCameraNode {
    static parse(index: number, gltf: IgltfJson) {
        const node = gltf.cameras[index];
        const cam = new Camera();

        switch (node.type) {
        case CameraType.PERSPECTIVE: {
            cam.projectionType = ProjectionEnum.PERSPECTIVE;

            const data = node.perspective;
            cam.fov = data.yfov;
            cam.near = data.znear;
            if (data.zfar) {
                cam.far = data.zfar;
            }
            // if (data.aspectRatio) {
            //     cam.aspest = data.aspectRatio;
            // }
            break;
        }
        case CameraType.ORTHOGRAPHIC: {
            cam.projectionType = ProjectionEnum.ORTHOGRAPH;
            const datao = node.orthographic;
            cam.near = datao.znear;
            cam.far = datao.zfar;
            cam.size = datao.ymag;
            // cam.aspest = datao.xmag / datao.ymag;
            break;
        }
        }
        return cam;
    }
}
