import { Asset } from "../asset";
import { Geometry } from "../../../render/geometry";
export class StaticGeometry extends Asset {
    subMeshes: Geometry[] = [];
    destroy(): void {
        this.subMeshes.forEach(item => item.destroy())
    }
}