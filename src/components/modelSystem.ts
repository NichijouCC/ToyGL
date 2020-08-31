import { ModelComponent } from "./modelComponent";
import { InterScene } from "../scene/Scene";
import { BassCompSystem, CompSymEventEnum } from "./bassCompSystem";
import { LayerComposition } from "../scene/LayerComposition";
import { ForwardRender } from "../scene/render/ForwardRender";
import { Irenderable } from "../scene/render/Irenderable";

export class ModelSystem extends BassCompSystem {
    caredComps: string[] = [ModelComponent.name];
    // private layers: LayerComposition = new LayerComposition();
    private scene: InterScene;
    private render: ForwardRender;
    constructor(scene: InterScene, render: ForwardRender) {
        super();
        this.scene = scene;
        this.render = render;
    }

    update(deltaTime: number): void {
        const comps: ModelComponent[] = Array.from(this.comps.values()).map(item => item[0] as any);

        const renderArr: Irenderable[] = [];
        comps.forEach(item => {
            item.mesh?.sbuMeshs.forEach((submeshItem, index) => {
                const renderIns = {} as Irenderable;
                renderIns.geometry = submeshItem;
                renderIns.skinIns = item.skinIns;
                renderIns.material = item.materials[index];
                renderIns.worldMat = item.entity.worldMatrix;
                renderIns.bevisible = item.entity.beActive;
                renderArr.push(renderIns);
            });
        });

        const { cameras } = this.scene;
        this.render.render(Array.from(cameras.values()), renderArr);
    }
}
