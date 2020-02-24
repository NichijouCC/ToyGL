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

    getlayers()
    {
        return Array.from(this.layers.values());
    }

    private insMap: { [insId: number]: LayerCollection } = {};
    tryAddMeshInstance(ins: MeshInstance)
    {
        if (this.insMap[ins.id] != null) return;

        let layer = ins.material.layer;
        let layerCollection = this.layers.get(layer);

        layerCollection.add(ins);
        this.insMap[ins.id] = layerCollection;
        ins.onDirty.addEventListener(this.onInsDirty);
        ins.ondispose.addEventListener(this.onInsDispose)
    }
    removeMeshInstance(ins: MeshInstance)
    {
        if (this.insMap[ins.id] == null) return;

        let layerCollection = this.insMap[ins.id];
        layerCollection.remove(ins);
        delete this.insMap[ins.id];
        ins.onDirty.removeEventListener(this.onInsDirty);
        ins.ondispose.removeEventListener(this.onInsDispose)
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

    private onInsDispose = (ins: MeshInstance) =>
    {
        this.removeMeshInstance(ins);
    }
}
