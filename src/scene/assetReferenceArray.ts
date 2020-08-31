import { Asset } from "./asset/asset";
import { AssetReference } from "./assetReference";
import { EventTarget } from "../core/eventTarget";
import { DebuffAction } from "../core/debuffAction";
import { RefData } from "../core/refData";

export class AssetReferenceArray<T extends Asset> {
    protected _current: AssetReference<T>[];
    onDataChange: EventTarget<{ newData: T[], oldData: T[] }> = new EventTarget();

    onDirty = new EventTarget<void>();
    private raiseDiry = () => { this?.onDirty.raiseEvent(); };

    constructor() {
        this._current = [];
    }

    set current(value: T[]) {
        let changed = false;
        const oldData = this._current.map(item => item.current);
        if (value.length != oldData.length) {
            changed = true;
        } else {
            changed = !value.every((item, index) => item == oldData[index]);
        }
        if (changed) {
            for (let i = 0; i < value.length; i++) {
                this.setValue(value[i], i);
            }
            this.onDataChange.raiseEvent({ newData: value, oldData });
            this._current = this._current.slice(0, value.length);
        }
    }

    get current() { return this._current.map(item => item.current); };

    setValue(asset: T, index = 0) {
        if (this._current == null) this._current = [] as any;
        if (this._current[index] == null) {
            this._current[index] = new AssetReference<T>();
            this._current[index].onDirty.addEventListener(this.raiseDiry);
        }
        this._current[index].current = asset;
    }

    destroy() {
        this._current = undefined;
        this.onDataChange.destroy();
        this.onDataChange = undefined;
    }
}

// export class AssetReferenceArray<T extends Asset>
// {
//     assets: AssetReference<T>[] = [];
//     setValue(asset: T, index = 0) {
//         if (this.assets[index] == null) {
//             let newRef = new AssetReference<T>();
//             this.assets[index] = newRef;
//             this.attachToItemAssetChangeAction[index] = DebuffAction.create(() => {
//                 let func = (event: AssetChangedEvent<T>) => {
//                     this.onAssetChange.raiseEvent({ ...event, index: index });
//                 }
//                 newRef.onDataChange.addEventListener(func);
//                 return () => {
//                     newRef.onDataChange.removeEventListener(func)
//                 }
//             })

//         }
//         this.assets[index].current = asset;
//     }
//     setValues(assets: T[]) {
//         assets.forEach((item, index) => this.setValue(item, index))
//     }

//     getValue(index = 0) {
//         return this.assets[index]
//     }
//     delectItem(index: number) {
//         this.assets.splice(index, 1);
//         this.attachToItemAssetChangeAction[index]?.dispose();
//         this.onItemDelect.raiseEvent(index);
//     }
//     private attachToItemAssetChangeAction: DebuffAction[] = [];
//     onAssetChange: EventTarget<ArrayAssetChangeEvent<T>> = new EventTarget();
//     onItemDelect: EventTarget<number> = new EventTarget();
// }

// export class ArrayAssetChangeEvent<T extends Asset> extends AssetChangedEvent<T>
// {
//     index: number;
// }
