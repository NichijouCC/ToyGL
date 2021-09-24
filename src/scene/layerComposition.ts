import { RenderLayerEnum } from "./render/renderLayer";
import { LayerCollection } from "./layerCollection";
import { SortTypeEnum } from "./render/sortTypeEnum";
import { IRenderable } from "./render/irenderable";
import { Camera } from "./camera";
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

    getSortedRenderArr(cam: Camera) {
        let items: IRenderable[] = [];
        this._addLayerSortedResult(RenderLayerEnum.Background, cam, items);
        this._addLayerSortedResult(RenderLayerEnum.Geometry, cam, items);
        this._addLayerSortedResult(RenderLayerEnum.AlphaTest, cam, items);
        this._addLayerSortedResult(RenderLayerEnum.Transparent, cam, items);
        return items;
    }

    private _addLayerSortedResult(layerType: RenderLayerEnum, cam: Camera, items: IRenderable[]) {
        let layer = this.layers.get(layerType);
        if (layer.insCount != 0) {
            let arr = layer.getSortedInsArr(cam);
            arr.forEach(item => {
                items.push(item);
            })
        }
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
