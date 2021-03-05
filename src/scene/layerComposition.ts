import { RenderLayerEnum } from "./renderLayer";
import { LayerCollection } from "./layerCollection";
import { SortTypeEnum } from "./render/sortTypeEnum";
import { IRenderable } from "./render/irenderable";
export class LayerComposition {
    private layers: Map<number, LayerCollection> = new Map();
    constructor() {
        this._addLayer(RenderLayerEnum.Background);
        this._addLayer(RenderLayerEnum.Geometry, SortTypeEnum.MAT_LAYER_INDEX | SortTypeEnum.SHADER_ID);
        this._addLayer(RenderLayerEnum.AlphaTest, SortTypeEnum.MAT_LAYER_INDEX | SortTypeEnum.Z_DIST_FRONT_TO_BACK);
        this._addLayer(RenderLayerEnum.Transparent, SortTypeEnum.MAT_LAYER_INDEX | SortTypeEnum.Z_DIST_FRONT_TO_BACK);
    }

    private _addLayer(layer: RenderLayerEnum, sortType: number = 0) {
        if (!this.layers.has(layer)) {
            const collection = new LayerCollection(layer, sortType);
            this.layers.set(layer, collection);
        }
    }

    getLayers() {
        return Array.from(this.layers.values());
    }

    getSortedRenderArr() {

    }

    addRenderableItem(ins: IRenderable) {
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
