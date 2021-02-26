import { SortTypeEnum } from "./render/sortTypeEnum";
import { Irenderable } from "./render/irenderable";
import { Camera } from "./camera";
import { RenderLayerEnum } from "./renderLayer";
namespace Private {
    const sortByMatLayerIndex = (drawa: Irenderable, drawb: Irenderable): number => {
        return drawa.material.layerIndex - drawb.material.layerIndex;
    };

    const sortByZdist_FrontToBack = (drawa: Irenderable, drawb: Irenderable): number => {
        return drawa.zDist - drawb.zDist;
    };

    const sortByZdist_BackToFront = (drawa: Irenderable, drawb: Irenderable): number => {
        return drawb.zDist - drawa.zDist;
    };

    const sortByShaderId = (drawa: Irenderable, drawb: Irenderable): number => {
        return drawa.material.shader.create_id - drawb.material.shader.create_id;
    };

    export const sortTypeInfo: { [type: string]: IsortInfo } = {}; {
        sortTypeInfo[SortTypeEnum.MatLayerIndex] = { sortFunc: sortByMatLayerIndex };
        sortTypeInfo[SortTypeEnum.ShaderId] = { sortFunc: sortByShaderId };
        sortTypeInfo[SortTypeEnum.Zdist_FrontToBack] = {
            sortFunc: sortByZdist_FrontToBack,
            beforeSort: (ins: Irenderable[], cam: Camera) => {
                const camPos = cam.worldPos;
                const camFwd = cam.forwardInword;
                let i, drawCall, meshPos;
                let tempx, tempy, tempz;
                for (i = 0; i < ins.length; i++) {
                    drawCall = ins[i];
                    meshPos = drawCall.bounding.center;
                    tempx = meshPos[0] - camPos[0];
                    tempy = meshPos[1] - camPos[1];
                    tempz = meshPos[2] - camPos[2];


                    drawCall.zDist = tempx * camFwd[0] + tempy * camFwd[1] + tempz * camFwd[2];
                }
            }
        };
    }

    export interface IsortInfo {
        sortFunc: (drawa: Irenderable, drawb: Irenderable) => number,
        beforeSort?: (ins: Irenderable[], cam: Camera) => void
    }
}

export class LayerCollection {
    readonly layer: RenderLayerEnum;
    private _insArr: Irenderable[] = [];
    get insCount() { return this._insArr.length; };

    getSortedinsArr(cam: Camera) {
        this.beforeSort.forEach(func => func(this._insArr, cam));
        this.sortFunction && this._insArr.sort(this.sortFunction);
        return this._insArr;
    }

    private sortFunction: (a: Irenderable, b: Irenderable) => number;
    private sortFunctions: ((a: Irenderable, b: Irenderable) => number)[] = [];
    private beforeSort: ((ins: Irenderable[], cam: Camera) => void)[] = [];

    constructor(layer: RenderLayerEnum, sortType: number = 0) {
        this.layer = layer;
        const attch = (sortInfo: Private.IsortInfo) => {
            this.sortFunctions.push(sortInfo.sortFunc);
            if (sortInfo?.beforeSort) {
                this.beforeSort.push((ins: Irenderable[], cam: Camera) => { sortInfo.beforeSort(ins, cam); });
            }
        };
        if (sortType & SortTypeEnum.MatLayerIndex) {
            const sortInfo = Private.sortTypeInfo[SortTypeEnum.MatLayerIndex];
            attch(sortInfo);
        }
        if (sortType & SortTypeEnum.ShaderId) {
            const sortInfo = Private.sortTypeInfo[SortTypeEnum.ShaderId];
            attch(sortInfo);
        }

        if (this.sortFunctions.length > 0) {
            this.sortFunction = (a, b) => {
                let result;
                for (let i = 0; i < this.sortFunctions.length; i++) {
                    result = this.sortFunctions[i](a, b);
                    if (result != 0) break;
                }
                return result;
            };
        }
    }

    add(newIns: Irenderable) {
        this._insArr.push(newIns);
    }

    clear() {
        this._insArr = [];
    }
}
