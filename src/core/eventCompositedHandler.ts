export class EventCompositedHandler {
    private _listener: { [event: string]: Function[] } = {};
    on(type: string | string[], callback: Function) {
        if (type instanceof Array) type = type.join();
        if (this._listener[type] == null) this._listener[type] = [];
        this._listener[type].push(callback);
    }

    fire(type: string | string[], params: any) {
        if (type instanceof Array) type = type.join();
        this._listener[type]?.forEach(func => func(params));
    }

    off(type: string | string[], callback: Function) {
        if (type instanceof Array) type = type.join();
        if (this._listener[type]) {
            const index = this._listener[type].indexOf(callback);
            if (index >= 0) {
                this._listener[type].splice(index, 1);
            }
        }
    }
}
