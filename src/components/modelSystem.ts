import { ModelComponent } from "./modelComponent";
import { InterScene } from "../scene/Scene";
import { ForwardRender } from "../scene/render/forwardRender";
import { IRenderable } from "../scene/render/irenderable";
import { System } from "../core/ecs/system";

export class ModelSystem extends System {
    caries = { comps: [ModelComponent] };
    private scene: InterScene;
    constructor(scene: InterScene, render: ForwardRender) {
        super();
        this.scene = scene;
    }

    update(deltaTime: number): void {
        this.queries.comps.forEach((node) => {
            let comp = node.getComponent(ModelComponent);
            if (comp.entity.beActive == true) {
                comp.mesh?.subMeshes.forEach((subMeshItem, index) => {
                    const renderIns: IRenderable = {
                        geometry: subMeshItem,
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
