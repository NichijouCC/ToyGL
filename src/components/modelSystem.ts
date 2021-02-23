import { ModelComponent } from "./modelComponent";
import { InterScene } from "../scene/Scene";
import { ForwardRender } from "../scene/render/ForwardRender";
import { Irenderable } from "../scene/render/Irenderable";
import { AbsSystem } from "../core/absSystem";

export class ModelSystem extends AbsSystem<[ModelComponent]> {
    careCompCtors = [ModelComponent]
    private scene: InterScene;
    constructor(scene: InterScene, render: ForwardRender) {
        super();
        this.scene = scene;
    }

    update(deltaTime: number): void {
        this.comps.forEach(([comp]) => {
            if (comp.entity.beActive == true) {
                comp.mesh?.sbuMeshs.forEach((submeshItem, index) => {
                    const renderIns: Irenderable = {
                        geometry: submeshItem,
                        skinIns: comp.skinIns,
                        material: comp.materials[index],
                        worldMat: comp.entity.worldMatrix,
                        bevisible: comp.entity.beActive
                    };
                    this.scene._addFrameRenderIns(renderIns);
                });
            }
        })
    }
}
