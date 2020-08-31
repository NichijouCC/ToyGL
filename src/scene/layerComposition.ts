import { MeshInstance } from "./primitive/meshInstance";
import { RenderLayerEnum } from "./renderLayer";
import { LayerCollection } from "./layerCollection";
import { SortTypeEnum } from "./render/sortTypeEnum";
import { Irenderable } from "./render/irenderable";
import { EventTarget } from "../core/eventTarget";
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
            const collection = new LayerCollection(layer, sortType);
            this.layers.set(layer, collection);
        }
    }

    getlayers() {
        return Array.from(this.layers.values());
    }

    getSortedRenderArr() {

    }

    addRenableItem(ins: Irenderable) {
        const layer = ins.material.layer;
        if (layer != null) {
            const layerCollection = this.layers.get(layer);
            layerCollection.add(ins);
        }
    }

    clear() {
        this.layers.forEach(item => item.clear());
    }
}
