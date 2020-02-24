import { CameraType } from "./GltfJsonStruct";
// import { Camera, ProjectionEnum } from "../../ec/components/camera";
import { IgltfJson } from "../LoadglTF";
import { Camera, ProjectionEnum } from "../../../scene/Camera";

export class ParseCameraNode
{
    static parse(index: number, gltf: IgltfJson)
    {
        let node = gltf.cameras[index];
        let cam = new Camera();

        switch (node.type)
        {
            case CameraType.PERSPECTIVE:
                cam.projectionType = ProjectionEnum.PERSPECTIVE;

                let data = node.perspective;
                cam.fov = data.yfov;
                cam.near = data.znear;
                if (data.zfar)
                {
                    cam.far = data.zfar;
                }
                // if (data.aspectRatio) {
                //     cam.aspest = data.aspectRatio;
                // }
                break;
            case CameraType.ORTHOGRAPHIC:
                cam.projectionType = ProjectionEnum.ORTHOGRAPH;
                let datao = node.orthographic;
                cam.near = datao.znear;
                cam.far = datao.zfar;
                cam._size = datao.ymag;
                // cam.aspest = datao.xmag / datao.ymag;
                break;
        }
        return cam;
    }
}
