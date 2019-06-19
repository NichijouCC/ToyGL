import { GeometryInfo } from "twebgl";
import { ToyAsset } from "../base/toyAsset";

export class Geometry extends ToyAsset {
    constructor(name: string, url: string) {
        super({ name: name, URL: url });
    }
    dispose(): void {}
    data: GeometryInfo;
}
