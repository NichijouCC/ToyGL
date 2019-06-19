import { IprogramInfo } from "twebgl/dist/types/type";
import { ToyAsset } from "../base/toyAsset";

export class Material extends ToyAsset {
    constructor(name: string, url: string) {
        super({ name: name, URL: url });
    }
    dispose(): void {}
    programe: IprogramInfo;
}
