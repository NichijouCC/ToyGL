import { ModelComponent } from "./modelComponent";
import { ForwardRender } from "../scene/render/forwardRender";
import { IRenderable } from "../scene/render/irenderable";
import { Entity, System } from "../scene";
import { ToyGL } from "../toygl";

export class ModelSystem extends System {
    caries = { comps: [ModelComponent] };
    private _toy: ToyGL;
    constructor(toy: ToyGL) {
        super();
        this._toy = toy;
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
                    this._toy.scene._addFrameRenderIns(renderIns);
                    // this._toy.gizmos.drawAABB(subMeshItem.boundingBox, comp.entity.worldMatrix);
                });
            }
        })
    }
}
