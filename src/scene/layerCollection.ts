import { SortTypeEnum } from "./render/sortTypeEnum";
import { IRenderable } from "./render/irenderable";
import { Camera } from "./camera";
import { RenderLayerEnum } from "./renderLayer";
import { mat4, vec3 } from "../mathD";
namespace Private {
    const sortByMatLayerIndex = (drawA: IRenderable, drawB: IRenderable): number => {
        return drawA.material.layerIndex - drawB.material.layerIndex;
    };

    const sortByzDist_FrontToBack = (drawA: IRenderable, drawB: IRenderable): number => {
        return drawA.zDist - drawB.zDist;
    };

    const sortByzDist_BackToFront = (drawA: IRenderable, drawB: IRenderable): number => {
        return drawB.zDist - drawA.zDist;
    };

    const sortByShaderId = (drawA: IRenderable, drawB: IRenderable): number => {
        return drawA.material.shader.create_id - drawB.material.shader.create_id;
    };
    const _tempt = vec3.create();
    export const sortTypeInfo: { [type: string]: ISortInfo } = {}; {
        sortTypeInfo[SortTypeEnum.MAT_LAYER_INDEX] = { sortFunc: sortByMatLayerIndex };
        sortTypeInfo[SortTypeEnum.SHADER_ID] = { sortFunc: sortByShaderId };
        sortTypeInfo[SortTypeEnum.Z_DIST_FRONT_TO_BACK] = {
            sortFunc: sortByzDist_FrontToBack,
            beforeSort: (ins: IRenderable[], cam: Camera) => {
                const camPos = cam.worldPos;
                const camFwd = cam.forwardInWorld;
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

    export interface ISortInfo {
        sortFunc: (drawA: IRenderable, drawB: IRenderable) => number,
        beforeSort?: (ins: IRenderable[], cam: Camera) => void
    }
}

export class LayerCollection {
    readonly layer: RenderLayerEnum;
    private _insArr: IRenderable[] = [];
    get insCount() { return this._insArr.length; };

    getSortedInsArr(cam: Camera) {
        this.beforeSort.forEach(func => func(this._insArr, cam));
        this.sortFunction && this._insArr.sort(this.sortFunction);
        return this._insArr;
    }

    private sortFunction: (a: IRenderable, b: IRenderable) => number;
    private sortFunctions: ((a: IRenderable, b: IRenderable) => number)[] = [];
    private beforeSort: ((ins: IRenderable[], cam: Camera) => void)[] = [];

    constructor(layer: RenderLayerEnum, sortType: number = 0) {
        this.layer = layer;
        const attach = (sortInfo: Private.ISortInfo) => {
            this.sortFunctions.push(sortInfo.sortFunc);
            if (sortInfo?.beforeSort) {
                this.beforeSort.push((ins: IRenderable[], cam: Camera) => { sortInfo.beforeSort(ins, cam); });
            }
        };
        if (sortType & SortTypeEnum.MAT_LAYER_INDEX) {
            const sortInfo = Private.sortTypeInfo[SortTypeEnum.MAT_LAYER_INDEX];
            attach(sortInfo);
        }
        if (sortType & SortTypeEnum.SHADER_ID) {
            const sortInfo = Private.sortTypeInfo[SortTypeEnum.SHADER_ID];
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

    add(newIns: IRenderable) {
        this._insArr.push(newIns);
    }

    clear() {
        this._insArr = [];
    }
}
