import { InterScene } from "../scene/Scene";
import { CameraComponent, CAMERA_ASPECT } from "./cameraComponent";
import { Entity, Screen, System } from "../scene/index";

export class CameraSystem extends System {
    caries = { comps: [CameraComponent] };
    private scene: InterScene;
    constructor(scene: InterScene) {
        super();
        this.scene = scene;
        this.on("addEntity", (e) => {
            let cam = e.entity.getComponent(CameraComponent);
            cam[CAMERA_ASPECT] = scene.screen.width / scene.screen.height;
            scene._cameras.push(cam);
        });
        this.scene.screen.onresize.addEventListener((ev) => {
            this.scene._cameras.forEach(item => item[CAMERA_ASPECT] = ev.width / ev.height);
        });
    }

    update(deltaTime: number): void {
        let cameras = this.queries.comps.map((node) => {
            let cam = node.getComponent(CameraComponent);
            return cam;
        });
        this.scene._cameras = cameras.sort((a, b) => a.priority - b.priority);
    }
}
