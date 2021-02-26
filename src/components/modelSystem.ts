import { ModelComponent } from "./modelComponent";
import { InterScene } from "../scene/Scene";
import { ForwardRender } from "../scene/render/ForwardRender";
import { Irenderable } from "../scene/render/Irenderable";
import { System } from "../core/ecs/system";

export class ModelSystem extends System<{ comps: ModelComponent[][] }> {
    caries = { comps: [ModelComponent] };
    private scene: InterScene;
    constructor(scene: InterScene, render: ForwardRender) {
        super();
        this.scene = scene;
    }

    update(deltaTime: number): void {
        this.queries.comps.forEach(([comp]) => {
            if (comp.entity.beActive == true) {
                comp.mesh?.sbuMeshs.forEach((submeshItem, index) => {
                    const renderIns: Irenderable = {
                        geometry: submeshItem,
                        skinIns: comp.skinIns,
                        material: comp.materials[index],
                        worldMat: comp.entity.worldMatrix,
                        beVisible: comp.entity.beActive
                    };
                    this.scene._addFrameRenderIns(renderIns);
                });
            }
        })
    }
}
