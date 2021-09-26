import { ModelComponent } from "./modelComponent";
import { IRenderable } from "../render/irenderable";
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
            const comp = node.getComponent(ModelComponent);
            if (comp.entity.beActive == true && comp.mesh != null) {
                let { mesh, skinIns, materials, entity: { worldMatrix } } = comp;
                if (skinIns != null) {
                    skinIns.frameUpdate(this._toy.graphicsDevice);
                    mesh.subMeshes.forEach((subMeshItem, index) => {
                        const renderIns: IRenderable = {
                            geometry: subMeshItem,
                            material: materials[index],
                            worldMat: worldMatrix,
                            skin: {
                                worldMat: skinIns.uniformMatrixModel,
                                boneMatrices: skinIns.uniformBoneData
                            },
                        };
                        this._toy.scene._addFrameRenderIns(renderIns);
                        // this._toy.gizmos.drawAABB(subMeshItem.boundingBox, comp.entity.worldMatrix);
                    });
                } else {
                    mesh.subMeshes.forEach((subMeshItem, index) => {
                        const renderIns: IRenderable = {
                            geometry: subMeshItem,
                            material: materials[index],
                            worldMat: worldMatrix,
                        };
                        this._toy.scene._addFrameRenderIns(renderIns);
                        // this._toy.gizmos.drawAABB(subMeshItem.boundingBox, comp.entity.worldMatrix);
                    });
                }
            }
        });
    }
}
