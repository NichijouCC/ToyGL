import { EventHandler } from "./Event";

export class RefData<T>
{
    private _data: T;
    set data(value: T)
    {
        if (this._data != value)
        {
            let oldData = this._data;
            this._data = value;

            this.onDataChange.raiseEvent(value);
        }
    };
    get data() { return this._data };
    onDataChange: EventHandler<T> = new EventHandler();

    constructor(data: T)
    {
        this._data = data;
    }

    destroy()
    {
        this._data = undefined;
        this.onDataChange.destroy();
        this.onDataChange = undefined;
    }

}