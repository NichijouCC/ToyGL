import { ModelComponent } from "./modelComponent";
import { InterScene } from "../scene/Scene";
import { AbstractCompSystem } from "./abstractCompSystem";
import { ForwardRender } from "../scene/render/ForwardRender";
import { Irenderable } from "../scene/render/Irenderable";

export class ModelSystem extends AbstractCompSystem<ModelComponent> {
    careCompCtors: (new () => ModelComponent)[] = [ModelComponent]
    private scene: InterScene;
    constructor(scene: InterScene, render: ForwardRender) {
        super();
        this.scene = scene;
    }

    update(deltaTime: number): void {
        const comps = Array.from(this.comps.values()).map(item => item[0]);
        comps.forEach(item => {
            if (item.entity.beActive == true) {
                item.mesh?.sbuMeshs.forEach((submeshItem, index) => {
                    const renderIns: Irenderable = {
                        geometry: submeshItem,
                        skinIns: item.skinIns,
                        material: item.materials[index],
                        worldMat: item.entity.worldMatrix,
                        bevisible: item.entity.beActive
                    };
                    this.scene._addFrameRenderIns(renderIns);
                });
            }
        });
    }
}
