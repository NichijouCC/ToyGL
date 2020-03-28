import { UniteBitkey, Ientity } from "../core/Ecs";
import { Entity } from "../core/Entity";
import { ModelComponent } from "./ModelComponent";
import { InterScene } from "../scene/Scene";
import { DebuffAction } from "../core/DebuffAction";
import { EventHandler } from "../core/Event";
import { BassCompSystem, CompSymEventEnum } from "./BassCompSystem";

export class ModelSystem extends BassCompSystem {
    caredComps: string[] = [ModelComponent.name];

    private scene: InterScene;
    constructor(scene: InterScene) {
        super();
        this.scene = scene;

        this.on(CompSymEventEnum.afterAddE, (comps: ModelComponent[]) => {
            this.dirtyComp.set(comps[0].entity.id, comps[0]);
            this.beDirty = true;
            comps[0].onDirty.addEventListener(this.onCompDirty);
        });
        this.on(CompSymEventEnum.beforeRemoveE, (comps: ModelComponent[]) => {
            comps[0].onDirty.removeEventListener(this.onCompDirty);
        })

    }
    update(deltaTime: number): void {
        if (this.beDirty) {
            this.beDirty = false;
            this.dirtyComp.forEach(comp => {
                comp.meshInstances.forEach(ins => {
                    this.scene.tryAddMeshInstance(ins);
                })
            })
            this.dirtyComp.clear();
        }
    }

    private dirtyComp: Map<number, ModelComponent> = new Map();
    private beDirty: boolean = true;
    private onCompDirty = (comp: ModelComponent) => {
        this.beDirty = true;
        this.dirtyComp.set(comp.entity.id, comp);
    }
}


