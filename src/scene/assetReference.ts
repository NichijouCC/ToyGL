import { EventTarget } from "@mtgoo/ctool";
import { RefData } from "../core/refData";

interface Iondirty {
    onDirty: EventTarget<void>;
}

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
            this.onDirty.raiseEvent();
        }
    };

    get current() { return this._current; }

    dispose() {
        super.dispose();
        this.onDirty.dispose();
    }
}
