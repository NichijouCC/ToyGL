import { ModelComponent } from "./ModelComponent";
import { InterScene } from "../scene/Scene";
import { BassCompSystem, CompSymEventEnum } from "./BassCompSystem";
import { LayerComposition } from "../scene/LayerComposition";
import { ForwardRender } from "../scene/render/ForwardRender";

export class ModelSystem extends BassCompSystem {
    caredComps: string[] = [ModelComponent.name];
    private layers: LayerComposition = new LayerComposition();
    private scene: InterScene;
    private render: ForwardRender;
    constructor(scene: InterScene, render: ForwardRender) {
        super();
        this.scene = scene;
        this.render = render;

        this.on(CompSymEventEnum.afterAddE, (comps: ModelComponent[]) => {
            comps[0].onMeshinsCountChange.addEventListener(this.onCompMeshinsChange);
            this.onCompMeshinsChange(comps[0]);
        });
        this.on(CompSymEventEnum.beforeRemoveE, (comps: ModelComponent[]) => {
            comps[0].onMeshinsCountChange.removeEventListener(this.onCompMeshinsChange);
        })

    }
    update(deltaTime: number): void {
        if (this.beDirty) {
            this.beDirty = false;
            this.dirtyComp.forEach(comp => {
                comp.meshInstances.forEach(ins => {
                    this.layers.tryAddMeshInstance(ins);
                })
            })
            this.dirtyComp.clear();
        }
        let { cameras } = this.scene;
        cameras.forEach(cam => {
            this.render.setCamera(cam);
            this.layers.getlayers().forEach(layer => {
                if (layer.insCount == 0) return;
                let commands = layer.getSortedinsArr(cam);
                this.render.render(cam, commands);
                // this.render.renderLayers(cam, layer)
            })
        })
    }

    private dirtyComp: Map<number, ModelComponent> = new Map();
    private beDirty: boolean = true;
    private onCompMeshinsChange = (comp: ModelComponent) => {
        this.beDirty = true;
        this.dirtyComp.set(comp.entity.id, comp);
    }
}


