import { ToyAsset, ItoyAsset } from "../base/toyAsset";
import { GlRender, IgeometryInfo, IgeometryOptions } from "../../render/glRender";

export class Geometry extends ToyAsset {
    constructor(param?: ItoyAsset) {
        super(param);
    }
    dispose(): void {}
    data: IgeometryInfo;

    static fromCustomData(data: IgeometryOptions) {
        let geometry = GlRender.createGeometry(data);
        let newAsset = new Geometry({ name: "custom_Mesh" });
        newAsset.data = geometry;
        return newAsset;
    }
}
