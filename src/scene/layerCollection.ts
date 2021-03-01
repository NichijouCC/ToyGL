import { SortTypeEnum } from "./render/sortTypeEnum";
import { Irenderable } from "./render/irenderable";
import { Camera } from "./camera";
import { RenderLayerEnum } from "./renderLayer";
import { mat4, vec3 } from "../mathD";
namespace Private {
    const sortByMatLayerIndex = (drawA: Irenderable, drawB: Irenderable): number => {
        return drawA.material.layerIndex - drawB.material.layerIndex;
    };

    const sortByZdist_FrontToBack = (drawA: Irenderable, drawB: Irenderable): number => {
        return drawA.zDist - drawB.zDist;
    };

    const sortByZdist_BackToFront = (drawA: Irenderable, drawB: Irenderable): number => {
        return drawB.zDist - drawA.zDist;
    };

    const sortByShaderId = (drawA: Irenderable, drawB: Irenderable): number => {
        return drawA.material.shader.create_id - drawB.material.shader.create_id;
    };
    const _tempt = vec3.create();
    export const sortTypeInfo: { [type: string]: IsortInfo } = {}; {
        sortTypeInfo[SortTypeEnum.MatLayerIndex] = { sortFunc: sortByMatLayerIndex };
        sortTypeInfo[SortTypeEnum.ShaderId] = { sortFunc: sortByShaderId };
        sortTypeInfo[SortTypeEnum.Zdist_FrontToBack] = {
            sortFunc: sortByZdist_FrontToBack,
            beforeSort: (ins: Irenderable[], cam: Camera) => {
                const camPos = cam.worldPos;
                const camFwd = cam.forwardInword;
                let i, drawCall, insPos;
                let tempX, tempY, tempZ;
                for (i = 0; i < ins.length; i++) {
                    drawCall = ins[i];
                    insPos = mat4.getTranslation(_tempt, drawCall.worldMat);
                    tempX = insPos[0] - camPos[0];
                    tempY = insPos[1] - camPos[1];
                    tempZ = insPos[2] - camPos[2];

                    drawCall.zDist = tempX * camFwd[0] + tempY * camFwd[1] + tempZ * camFwd[2];
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
        const attach = (sortInfo: Private.IsortInfo) => {
            this.sortFunctions.push(sortInfo.sortFunc);
            if (sortInfo?.beforeSort) {
                this.beforeSort.push((ins: Irenderable[], cam: Camera) => { sortInfo.beforeSort(ins, cam); });
            }
        };
        if (sortType & SortTypeEnum.MatLayerIndex) {
            const sortInfo = Private.sortTypeInfo[SortTypeEnum.MatLayerIndex];
            attach(sortInfo);
        }
        if (sortType & SortTypeEnum.ShaderId) {
            const sortInfo = Private.sortTypeInfo[SortTypeEnum.ShaderId];
            attach(sortInfo);
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
