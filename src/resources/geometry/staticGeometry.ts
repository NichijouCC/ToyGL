import { Asset } from "../asset";
import { Geometry } from "../../render/geometry";
import { BoundingBox, Bounds, computeMinMax } from "../../scene/bounds";
import { VertexAttEnum } from "../../webgl";
import { vec3 } from "../../mathD";
export class StaticGeometry extends Asset {
    readonly subMeshes: Geometry[] = [];
    readonly boundingBox: BoundingBox;
    constructor(subMeshes: Geometry[]) {
        super();
        this.subMeshes = subMeshes;
        let min = vec3.create();
        let max = vec3.create();
        subMeshes.forEach(item => {
            let points = item.attributes[VertexAttEnum.POSITION].elements;
            computeMinMax(points, min, max);
        });
        this.boundingBox = BoundingBox.fromMinMax(min, max);
    }

    destroy(): void {
        this.subMeshes.forEach(item => item.destroy())
    }
}