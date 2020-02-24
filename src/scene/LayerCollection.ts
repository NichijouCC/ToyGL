import { MeshInstance } from "./MeshInstance";
import { SortTypeEnum } from "./Render";
import { Camera } from "./Camera";
import { RenderLayerEnum } from "./RenderLayer";
namespace Private
{
    export const sortByMatLayerIndex = (drawa: MeshInstance, drawb: MeshInstance): number =>
    {
        return drawa.material.layerIndex - drawb.material.layerIndex;
    }

    export const sortByZdist_FrontToBack = (drawa: MeshInstance, drawb: MeshInstance): number =>
    {
        return drawa.zdist - drawb.zdist;
    }

    export const sortByZdist_BackToFront = (drawa: MeshInstance, drawb: MeshInstance): number =>
    {
        return drawb.zdist - drawa.zdist;
    }

    export const sortByMatSortId = (drawa: MeshInstance, drawb: MeshInstance): number =>
    {
        return drawb.material.sortId - drawb.material.sortId;
    }


    export const sortTypeInfo: { [type: string]: IsortInfo } = {};
    {
        sortTypeInfo[SortTypeEnum.MatLayerIndex] = { sortFunc: sortByMatLayerIndex };
        sortTypeInfo[SortTypeEnum.ShaderId] = {
            sortFunc: sortByMatSortId,
            // eventFunc: (ins: MeshInstance) => ins.onchangeShader
        };
        sortTypeInfo[SortTypeEnum.Zdist_FrontToBack] = {
            sortFunc: sortByZdist_FrontToBack,
            beforeSort: (ins: MeshInstance[], cam: Camera) =>
            {
                let camPos = cam.worldPos;
                let camFwd = cam.forwardInword;
                let i, drawCall, meshPos;
                let tempx, tempy, tempz;
                for (i = 0; i < ins.length; i++)
                {
                    drawCall = ins[i];
                    meshPos = drawCall.boundingBox.center;
                    tempx = meshPos.x - camPos.x;
                    tempy = meshPos.y - camPos.y;
                    tempz = meshPos.z - camPos.z;
                    drawCall.zdist = tempx * camFwd.x + tempy * camFwd.y + tempz * camFwd.z;
                }
            }
        };
    }

    export interface IsortInfo
    {
        sortFunc: (drawa: MeshInstance, drawb: MeshInstance) => number,
        // eventFunc?: (ins: MeshInstance) => ValueEvent<MeshInstance, any>,
        beforeSort?: (ins: MeshInstance[], cam: Camera) => void
    }
}

export class LayerCollection
{
    readonly layer: RenderLayerEnum;
    private _insArr: MeshInstance[] = [];
    getSortedinsArr(cam: Camera)
    {
        this.beforeSort.forEach(func => func(this._insArr, cam))
        if (this.beDirty && this.sortFunction)
        {
            this._insArr.sort(this.sortFunction);
        }
        return this._insArr
    }

    private sortFunction: (a: MeshInstance, b: MeshInstance) => number;
    // private onAdd: ((ins: MeshInstance) => void)[] = []
    // private onRemove: ((ins: MeshInstance) => void)[] = [];
    private beforeSort: ((ins: MeshInstance[], cam: Camera) => void)[] = [];

    constructor(layer: RenderLayerEnum, sortType: number = 0)
    {
        this.layer = layer;
        // let func = () => { this.markDirty(); };
        let attch = (sortInfo: Private.IsortInfo) =>
        {
            this.sortFunction = this.sortFunction != null ? this.sortFunction && sortInfo.sortFunc : sortInfo.sortFunc;
            // if (sortInfo?.eventFunc)
            // {
            //     this.onAdd.push((ins => { sortInfo?.eventFunc(ins).addEventListener(func) }))
            //     this.onRemove.push(ins => { sortInfo?.eventFunc(ins).removeEventListener(func) })
            // }
            if (sortInfo?.beforeSort)
            {
                this.beforeSort.push((ins: MeshInstance[], cam: Camera) => { sortInfo?.beforeSort(ins, cam); this.markDirty(); });
            }
        }
        if (sortType & SortTypeEnum.MatLayerIndex)
        {
            let sortInfo = Private.sortTypeInfo[SortTypeEnum.MatLayerIndex];
            attch(sortInfo);
        }
        if (sortType & SortTypeEnum.ShaderId)
        {
            let sortInfo = Private.sortTypeInfo[SortTypeEnum.ShaderId];
            attch(sortInfo);
        }
    }
    private beDirty: boolean = true;
    markDirty = () =>
    {
        this.beDirty = true;
    }

    add(newIns: MeshInstance)
    {
        let index = this._insArr.indexOf(newIns);
        if (index == -1)
        {
            this._insArr.push(newIns);
            this.markDirty();
            // this.onAddMeshInstance.raiseEvent(newIns)
            // this.onAdd.forEach(func => func(newIns));
        }
    }
    remove(item: MeshInstance)
    {
        let index = this._insArr.indexOf(item);
        if (index >= 0)
        {
            this._insArr.splice(index, 1);
            // this.onRemoveMeshInstance.raiseEvent(item);
            // this.onRemove.forEach(func => func(item));
        }
    }

    // onAddMeshInstance = new EventHandler<MeshInstance>();
    // onRemoveMeshInstance = new EventHandler<MeshInstance>();
}
