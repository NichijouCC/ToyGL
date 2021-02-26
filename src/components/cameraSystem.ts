import { InterScene } from "../scene/Scene";
import { CameraComponent } from "./cameraComponent";
import { Screen } from "../scene/Index";
import { System } from "../core/ecs/system";

export class CameraSystem extends System<{ "comps": CameraComponent[][] }> {
    caries = { "comps": [CameraComponent] };
    private scene: InterScene;
    private screen: Screen;
    constructor(scene: InterScene, screen: Screen) {
        super();
        this.scene = scene;
        this.screen = screen;
    }

    update(deltaTime: number): void {
        const { cameras } = this.scene;
        cameras.forEach(item => {
            item.aspect = this.screen.aspect;
        });
    }
}
