import { Asset } from "../asset";
import { Geometry } from "../../render/geometry";
import { BoundingSphere } from "../../scene/bounds";
import { VertexAttEnum } from "../../webgl";

export class StaticGeometry extends Asset {
    readonly subMeshes: Geometry[] = [];
    readonly boundingSphere: BoundingSphere;
    constructor(subMeshes: Geometry[]) {
        super();
        this.subMeshes = subMeshes;
        let allPoints = []
        subMeshes.forEach(item => {
            let points = item.attributes[VertexAttEnum.POSITION].elements;
            allPoints.push(...points);
        });
        this.boundingSphere = BoundingSphere.fromTypedArray(allPoints as any);
    }

    destroy(): void {
        this.subMeshes.forEach(item => item.destroy())
    }
}