import { MeshInstance } from "./primitive/MeshInstance";
import { RenderLayerEnum } from "./RenderLayer";
import { LayerCollection } from "./LayerCollection";
import { SortTypeEnum } from "./render/SortTypeEnum";
import { Irenderable } from "./render/Irenderable";
import { EventHandler } from "../core/Event";
export class LayerComposition {
    private layers: Map<number, LayerCollection> = new Map();
    // private nolayers: LayerCollection = new LayerCollection("nolayer" as any);
    constructor() {
        this._addLayer(RenderLayerEnum.Background);
        this._addLayer(RenderLayerEnum.Geometry, SortTypeEnum.MatLayerIndex | SortTypeEnum.ShaderId);
        this._addLayer(RenderLayerEnum.AlphaTest, SortTypeEnum.MatLayerIndex | SortTypeEnum.Zdist_FrontToBack);
        this._addLayer(RenderLayerEnum.Transparent, SortTypeEnum.MatLayerIndex | SortTypeEnum.Zdist_FrontToBack);
    }
    private _addLayer(layer: RenderLayerEnum, sortType: number = 0) {
        if (!this.layers.has(layer)) {
            let collection = new LayerCollection(layer, sortType);
            this.layers.set(layer, collection);
        }
    }
    getlayers() {
        return Array.from(this.layers.values());
    }

    getSortedRenderArr() {

    }

    addRenableItem(ins: Irenderable) {
        let layer = ins.material.layer;
        if (layer != null) {
            let layerCollection = this.layers.get(layer);
            layerCollection.add(ins);
        }
    }

    clear() {
        this.layers.forEach(item => item.clear())
    }
}
