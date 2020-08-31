import { EventTarget } from "../core/eventTarget";
import { Asset } from "./asset/asset";
import { DebuffAction } from "../core/debuffAction";
import { RefData } from "../core/refData";

interface Iondirty {
    onDirty: EventTarget<void>;
}

// export type AssetReference<T extends Iondirty>=RefData<T>;
export class AssetReference<T extends Iondirty> extends RefData<T> {
    onDirty = new EventTarget<void>();
    private raiseDiry = () => { this?.onDirty.raiseEvent(); };

    set current(value: T) {
        if (this._current != value) {
            const oldData = this._current;
            this._current = value;
            oldData?.onDirty.removeEventListener(this.raiseDiry);
            value?.onDirty.addEventListener(this.raiseDiry);
            this.onDataChange.raiseEvent({ newData: value, oldData });
        }
    };

    get current() { return this._current; }

    destroy() {
        super.destroy();
        this.onDirty.destroy();
    }
}
