import { Icomponent, Ientity } from "../ec";
import { Material } from "../../resources/assets/material";
import { Geometry } from "../../resources/assets/geometry";

export class Mesh implements Icomponent {
    entity: Ientity;
    private _geometry: Geometry;
    get geometry(): Geometry {
        return this._geometry;
    }
    material: Material;
    update(deltaTime: number): void {}
    dispose(): void {}
}
