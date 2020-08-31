import { EventTarget } from "./eventTarget";

export class RefData<T> {
    protected _current: T;
    set current(value: T) {
        if (this._current != value) {
            const oldData = this._current;
            this._current = value;
            this.onDataChange.raiseEvent({ newData: value, oldData });
        }
    };

    get current() { return this._current; };
    onDataChange: EventTarget<{ newData: T, oldData: T }> = new EventTarget();
    constructor(data?: T) {
        this._current = data;
    }

    destroy() {
        this._current = undefined;
        this.onDataChange.destroy();
        this.onDataChange = undefined;
    }
}
