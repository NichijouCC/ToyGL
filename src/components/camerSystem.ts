import { ModelComponent } from "./modelComponent";
import { InterScene } from "../scene/Scene";
import { BassCompSystem, CompSymEventEnum } from "./bassCompSystem";
import { Irenderable } from "../scene/render/Irenderable";
import { CameraComponent } from "./camerComponent";
import { ToyScreen } from "../scene/Index";

export class CamerSystem extends BassCompSystem {
    caredComps: string[] = [CameraComponent.name];
    private scene: InterScene;
    private screen: ToyScreen;
    constructor(scene: InterScene, screen: ToyScreen) {
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
