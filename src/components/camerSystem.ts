import { InterScene } from "../scene/Scene";
import { BassCompSystem } from "./bassCompSystem";
import { CameraComponent } from "./camerComponent";
import { ToyScreen } from "../scene/Index";

export class CamerSystem extends BassCompSystem<CameraComponent> {
    private scene: InterScene;
    private screen: ToyScreen;
    constructor(scene: InterScene, screen: ToyScreen) {
        super();
        this.careCompCtors = [CameraComponent];
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
