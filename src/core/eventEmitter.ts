
export class EventEmitter<T=any> {
    protected _listener = {} as any;
    on<K extends keyof T>(type:K, callback: (ev:T[K])=>void) {
        if (this._listener[type] == null) this._listener[type] = [];
        this._listener[type].push(callback);
    }

    fire<K extends keyof T>(type: K, params: T[K]) {
        this._listener[type]?.forEach((func: (arg0: T[K]) => any) => func(params));
    }

    off<K extends keyof T>(type: K, callback: Function) {
        if (this._listener[type]) {
            const index = this._listener[type].indexOf(callback);
            if (index >= 0) {
                this._listener[type].splice(index, 1);
            }
        }
    }
}
