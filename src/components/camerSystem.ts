import { InterScene } from "../scene/Scene";
import { AbstractCompSystem } from "./abstractCompSystem";
import { CameraComponent } from "./camerComponent";
import { Screen } from "../scene/Index";

export class CamerSystem extends AbstractCompSystem<CameraComponent> {
    careCompCtors: (new () => CameraComponent)[] = [CameraComponent];
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
