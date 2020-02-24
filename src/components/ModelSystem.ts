import { Isystem, UniteBitkey, Ientity } from "../core/Ecs";
import { Entity } from "../core/Entity";
import { ModelComponent } from "./ModelComponent";
import { InterScene } from "../scene/Scene";
import { DebuffAction } from "../core/DebuffAction";

export class ModelSystem implements Isystem
{
    caredComps: string[] = [ModelComponent.name];
    uniteBitkey: UniteBitkey = new UniteBitkey();
    private comps: Map<number, { comp: ModelComponent, debuffAction: DebuffAction }> = new Map();

    private scene: InterScene;
    constructor(scene: InterScene)
    {
        this.scene = scene;
    }
    tryAddEntity(entity: Entity): void
    {
        if (!this.comps.has(entity.id))
        {
            let comp = entity.getComponent(ModelComponent.name) as ModelComponent;
            this.comps.set(entity.id, {
                comp,
                debuffAction: DebuffAction.create(() =>
                {
                    comp.meshInstances.forEach(ins =>
                    {
                        this.scene.tryAddMeshInstance(ins);
                    });
                    comp.onDirty.addEventListener(this.onCompDirty);
                    return () =>
                    {
                        comp.onDirty.removeEventListener(this.onCompDirty);
                        comp.meshInstances.forEach(ins =>
                        {
                            this.scene.tryAddMeshInstance(ins);
                        });
                    }
                })
            });
        }
    }
    tryRemoveEntity(entity: Entity): void
    {
        if (this.comps.has(entity.id))
        {
            this.comps.delete(entity.id);
        }
    }

    private onCompDirty = (comp: ModelComponent) =>
    {
        comp.meshInstances.forEach(ins =>
        {
            this.scene.tryAddMeshInstance(ins);
        })
    }
}