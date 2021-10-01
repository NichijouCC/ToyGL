import { InterScene } from "../scene/Scene";
import { CameraComponent } from "./cameraComponent";
import { Entity, Screen, System } from "../scene/index";

export class CameraSystem extends System {
    caries = { comps: [CameraComponent] };
    private scene: InterScene;
    private screen: Screen;
    constructor(scene: InterScene, screen: Screen) {
        super();
        this.scene = scene;
        this.screen = screen;
        this.on("addEntity", (e) => {
            scene._cameras.push(e.entity.getComponent(CameraComponent));
        })
    }

    update(deltaTime: number): void {
        let cameras = this.queries.comps.map((node) => {
            let cam = node.getComponent(CameraComponent);
            return cam;
        });
        this.scene._cameras = cameras.sort((a, b) => a.priority - b.priority);
    }
}
