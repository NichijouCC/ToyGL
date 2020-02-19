import { UniqueObject } from "../../core/UniqueObject";

export class Asset extends UniqueObject
{
    protected _becreated = true;
    get becreated() { return this._becreated };

    protected _becreating = false;
    get becreating() { return this._becreating };

    destroy() { }
}