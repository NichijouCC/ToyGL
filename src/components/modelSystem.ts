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
                let baseRender: IRenderable = {
                    geometry: mesh.subMeshes[0],
                    material: materials[0],
                    worldMat: worldMatrix,
                    boundingBox: mesh.boundingBox,
                }
                // this._toy.gizmos.drawAABB(mesh.boundingBox, comp.entity.worldMatrix);
                if (skinIns != null) {
                    skinIns.frameUpdate(this._toy.render);
                    let skin = {
                        worldMat: skinIns.uniformMatrixModel,
                        boneMatrices: skinIns.uniformBoneData
                    };
                    baseRender.skin = skin;
                }
                if (mesh.subMeshes.length > 1) {
                    baseRender.children = [];
                    for (let i = 1; i < mesh.subMeshes.length; i++) {
                        baseRender.children.push({
                            geometry: mesh.subMeshes[i],
                            material: materials[i],
                            worldMat: worldMatrix,
                            skin: baseRender.skin
                        })
                    }
                }
                this._toy.scene.addFrameRenderIns(baseRender);
            }
        });
    }
}
