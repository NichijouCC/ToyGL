import { ModelComponent } from "./modelComponent";
import { IRenderable } from "../render/irenderable";
import { Entity, World, System } from "../scene";

export class ModelSystem extends System {
    caries = { comps: [ModelComponent] };
    private _scene: World;
    constructor(scene: World) {
        super();
        this._scene = scene;
    }

    update(deltaTime: number): void {
        this.queries.comps.filter(el => el.beActive && el.beInWorld).forEach((node) => {
            const comp = node.getComponent(ModelComponent);
            if (comp.geometry != null) {
                let { geometry: mesh, skinIns, materials, entity: { worldMatrix } } = comp;
                let baseRender: IRenderable = {
                    geometry: mesh.subMeshes[0],
                    material: materials[0],
                    worldMat: worldMatrix,
                }
                // this._toy.gizmos.drawAABB(mesh.boundingBox, comp.entity.worldMatrix);
                if (skinIns != null) {
                    skinIns.frameUpdate(this._scene.render);
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
                this._scene.addFrameRenderIns(baseRender);
            }
        });
    }
}
