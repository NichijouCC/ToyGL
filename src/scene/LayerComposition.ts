import { MeshInstance } from "./MeshInstance";
import { RenderLayerEnum } from "./RenderLayer";
import { LayerCollection } from "./LayerCollection";
import { SortTypeEnum } from "./Render";
export class LayerComposition
{
    private layers: Map<number, LayerCollection> = new Map();
    constructor()
    {
        this.layers.set(RenderLayerEnum.Background, new LayerCollection());
        this.layers.set(RenderLayerEnum.Geometry, new LayerCollection(SortTypeEnum.MatLayerIndex | SortTypeEnum.ShaderId));
        this.layers.set(RenderLayerEnum.AlphaTest, new LayerCollection(SortTypeEnum.MatLayerIndex | SortTypeEnum.Zdist_FrontToBack));
        this.layers.set(RenderLayerEnum.Transparent, new LayerCollection(SortTypeEnum.MatLayerIndex | SortTypeEnum.Zdist_FrontToBack));
    }
    _addLayer(layer: RenderLayerEnum, layerCollection: LayerCollection)
    {
        if (!this.layers.has(layer))
        {
            this.layers.set(RenderLayerEnum.Background, layerCollection);
            layerCollection.onAddMeshInstance.addEventListener((ins: MeshInstance) =>
            {
                ins.onchangeLayer.addEventListener(this._onInsLayerChange);
            });
            layerCollection.onRemoveMeshInstance.addEventListener((ins: MeshInstance) =>
            {
                ins.onchangeLayer.removeEventListener(this._onInsLayerChange);
            });
        }
    }
    addMeshInstance(ins: MeshInstance)
    {
        let layer = ins.material.layer;
        let func = (oldLayer: RenderLayerEnum, newLayer: RenderLayerEnum) => { this._onInsLayerChange(ins, oldLayer, newLayer); };
        (ins as any)._onlayerAdd;
        this.layers.get(layer).add(ins);
    }
    removeMeshInstance(ins: MeshInstance)
    {
        let layer = ins.material.layer;
        this.layers.get(layer).remove(ins);
        ins.onchangeLayer;
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
