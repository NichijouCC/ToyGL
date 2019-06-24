import { RenderLayerEnum } from "../ec/ec";
import { Camera } from "../ec/components/camera";
import { Vec3 } from "../mathD/vec3";
import { Mat4 } from "../mathD/mat4";
import { Irenderable } from "../scene/frameState";

/**
 * @private
 */
export class RenderList {
    private layerLists: { [layer: number]: RenderContainer } = {};
    constructor(camera: Camera) {
        this.layerLists[RenderLayerEnum.Background] = new RenderContainer("Background");
        this.layerLists[RenderLayerEnum.Geometry] = new RenderContainer("Geometry");
        this.layerLists[RenderLayerEnum.AlphaTest] = new RenderContainer("AlphaTest");
        this.layerLists[RenderLayerEnum.Transparent] = new RenderContainer("Transparent", (arr: Irenderable[]) => {
            arr.sort((a, b) => {
                let aRenderQueue = a.material.layer + a.material.queue;
                let bRenderQueue = b.material.layer + b.material.queue;
                if (aRenderQueue != bRenderQueue) {
                    return aRenderQueue - bRenderQueue;
                } else {
                    let viewmat = camera.ViewMatrix;
                    let aWorldPos = Mat4.getTranslationing(a.modelMatrix, Vec3.create());
                    let bWorldPos = Mat4.getTranslationing(b.modelMatrix, Vec3.create());

                    let aView = Mat4.transformPoint(aWorldPos, viewmat, Vec3.create());
                    let bView = Mat4.transformPoint(bWorldPos, viewmat, Vec3.create());
                    let out = aView[2] - bView[2];

                    Vec3.recycle(aWorldPos);
                    Vec3.recycle(bWorldPos);
                    Vec3.recycle(aView);
                    Vec3.recycle(bView);
                    return out;
                }
            });
            return arr;
        });
        this.layerLists[RenderLayerEnum.Overlay] = new RenderContainer("Overlay");
    }
    clear() {
        for (let key in this.layerLists) {
            this.layerLists[key].clear();
        }
    }
    addRenderer(renderer: Irenderable) {
        this.layerLists[renderer.material.layer].addRender(renderer);
    }

    sort() {
        for (const key in this.layerLists) {
            this.layerLists[key].sort();
        }
        return this;
    }
    foreach(func: (value: Irenderable) => void) {
        this.layerLists[RenderLayerEnum.Background].foreach(func);
        this.layerLists[RenderLayerEnum.Geometry].foreach(func);
        this.layerLists[RenderLayerEnum.AlphaTest].foreach(func);
        this.layerLists[RenderLayerEnum.Transparent].foreach(func);
        this.layerLists[RenderLayerEnum.Overlay].foreach(func);
    }
}

export class RenderContainer {
    private layer: string;

    private renderArr: Irenderable[] = [];

    addRender(render: Irenderable) {
        this.renderArr.push(render);
    }

    constructor(layerType: string, queueSortFunc: (arr: Irenderable[]) => Irenderable[] = null) {
        this.layer = layerType;
        this._queueSortFunc = queueSortFunc || RenderContainer.defaultSortFunc;
    }
    private _queueSortFunc: (arr: Irenderable[]) => Irenderable[];

    sort() {
        this.renderArr = this._queueSortFunc(this.renderArr);
        return this;
    }
    foreach(fuc: (value: Irenderable) => void) {
        for (let i = 0; i < this.renderArr.length; i++) {
            fuc(this.renderArr[i]);
        }
    }

    clear() {
        this.renderArr.length = 0;
    }

    private static defaultSortFunc = (arr: Irenderable[]) => {
        arr.sort((a, b) => {
            let aRenderQueue = a.material.layer + a.material.queue;
            let bRenderQueue = b.material.layer + b.material.queue;
            if (aRenderQueue != bRenderQueue) {
                return aRenderQueue - bRenderQueue;
            } else {
                return a.material.guid - b.material.guid;
            }
        });
        return arr;
    };
}

/**
 * 按照Geometry-》AlphaTest-》Background-》Transparent-》Overlay的顺序进行渲染
 * 非透明物体/透明物体都要按照queue排序
 * 非透明物体暂时没发现需要按照距离排序（近到远）
 * 透明物体按照距离排序（远到近）
 */
