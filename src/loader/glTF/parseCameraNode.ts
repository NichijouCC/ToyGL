import { CameraType } from "./gltfJsonStruct";
// import { Camera, ProjectionEnum } from "../../ec/components/camera";
import { IGltfJson } from "../loadGltf";
import { CameraComponent, ProjectionEnum } from "../../components";

export class ParseCameraNode {
    static parse(index: number, gltf: IGltfJson) {
        const node = gltf.cameras[index];
        const cam = new CameraComponent();

        switch (node.type) {
            case CameraType.PERSPECTIVE: {
                cam.projectionType = ProjectionEnum.PERSPECTIVE;

                const data = node.perspective;
                cam.fov = data.yfov;
                cam.near = data.znear;
                if (data.zfar) {
                    cam.far = data.zfar;
                }
                break;
            }
            case CameraType.ORTHOGRAPHIC: {
                cam.projectionType = ProjectionEnum.ORTHOGRAPH;
                const ortho = node.orthographic;
                cam.near = ortho.znear;
                cam.far = ortho.zfar;
                cam.size = ortho.ymag;
                break;
            }
        }
        return cam;
    }
}
