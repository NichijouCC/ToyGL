import { MeshInstance } from "./MeshInstance";
import { RenderLayerEnum } from "./RenderLayer";
import { LayerCollection } from "./LayerCollection";
import { SortTypeEnum } from "./Render";
export class LayerComposition
{
    private layers: Map<number, LayerCollection> = new Map();
    constructor()
    {
        this._addLayer(RenderLayerEnum.Background);
        this._addLayer(RenderLayerEnum.Geometry, SortTypeEnum.MatLayerIndex | SortTypeEnum.ShaderId);
        this._addLayer(RenderLayerEnum.AlphaTest, SortTypeEnum.MatLayerIndex | SortTypeEnum.Zdist_FrontToBack);
        this._addLayer(RenderLayerEnum.Transparent, SortTypeEnum.MatLayerIndex | SortTypeEnum.Zdist_FrontToBack);
    }
    _addLayer(layer: RenderLayerEnum, sortType: number = 0)
    {
        if (!this.layers.has(layer))
        {
            let collection = new LayerCollection(layer, sortType);
            this.layers.set(layer, collection);
        }
    }

    private insMap: { [insId: number]: LayerCollection } = {};
    addMeshInstance(ins: MeshInstance)
    {
        let layer = ins.material.layer;
        let layerCollection = this.layers.get(layer);

        layerCollection.add(ins);
        this.insMap[ins.id] = layerCollection;
        ins.onDirty.addEventListener(this.onInsDirty);
    }
    removeMeshInstance(ins: MeshInstance)
    {
        let layerCollection = this.insMap[ins.id];
        layerCollection.remove(ins);
        delete this.insMap[ins.id];
        ins.onDirty.removeEventListener(this.onInsDirty);
    }

    private onInsDirty = (ins: MeshInstance) =>
    {
        let layer = ins.material.layer;
        let collection = this.insMap[ins.id];
        if (collection.layer != layer)
        {
            collection.remove(ins);
            let layerCollection = this.layers.get(layer);
            layerCollection.add(ins);
            this.insMap[ins.id] = layerCollection;
        }

        this.insMap[ins.id].markDirty();
    }

    private _onInsLayerChange(ins: MeshInstance, oldLayer: RenderLayerEnum, newLayer: RenderLayerEnum)
    {
        if (oldLayer != null)
        {
            this.layers.get(oldLayer).remove(ins);
        }
        if (newLayer != null)
        {
            this.layers.get(newLayer).add(ins);
        }
    }
}
