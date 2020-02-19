import { Iasset } from "../type";

export class ResID
{
    private static idAll: number = 0;
    static next(): number
    {
        let next = ResID.idAll;
        ResID.idAll++;
        return next;
    }
}

export interface ItoyAsset
{
    name?: string;
    URL?: string;
    beDefaultAsset?: boolean;
}

export abstract class ToyAsset implements Iasset
{
    name: string;
    readonly guid: number;
    readonly URL: string;
    readonly beDefaultAsset: boolean;
    readonly type: string;

    constructor(param: ItoyAsset)
    {
        this.guid = ResID.next();
        this.name = (param && param.name) || "asset_" + this.guid;
        this.URL = param && param.URL;
        this.beDefaultAsset = (param && param.beDefaultAsset) || false;
    }
    abstract destroy(): void;
}
