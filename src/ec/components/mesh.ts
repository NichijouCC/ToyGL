import { Ientity, Irender, CullingMask, ToyActor } from "../ec";
import { Material } from "../../resources/assets/material";
import { Geometry } from "../../resources/assets/geometry";
import { IframeState } from "../../scene/frameState";
import { BoundingSphere } from "../../scene/bounds";

@ToyActor.Reg
export class Mesh implements Irender {
    entity: Ientity;
    mask: CullingMask = CullingMask.default;
    geometry: Geometry;
    material: Material;

    update(frameState: IframeState): void {
        if (this.geometry && this.material) {
            frameState.renderList.push({
                maskLayer: this.entity.maskLayer,
                geometry: this.geometry,
                // program: this._material.program,
                // uniforms: this._material.uniforms,
                material: this.material,
                modelMatrix: this.entity.transform.worldMatrix,
                bouningSphere: this.boundingSphere,
            });
        }
    }

    private _boundingSphere: BoundingSphere;
    get boundingSphere() {
        if (this._boundingSphere == null) {
            if (this.geometry) {
                this._boundingSphere = new BoundingSphere();
                this._boundingSphere.setFromGeometry(this.geometry);
            }
        }
        return this._boundingSphere;
    }
    dispose(): void {}
}
