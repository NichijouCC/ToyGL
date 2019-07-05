import { Icomponent, Ientity, Irender, CullingMask, EC } from "../ec";
import { Material } from "../../resources/assets/material";
import { Geometry } from "../../resources/assets/geometry";
import { IframeState, Irenderable } from "../../scene/frameState";
import { BoundingSphere } from "../../scene/bounds";

@EC.RegComp
export class Mesh implements Irender {
    entity: Ientity;
    mask: CullingMask = CullingMask.default;

    private _renderDirty: boolean;

    private _geometry: Geometry;
    get geometry(): Geometry {
        return this._geometry;
    }
    set geometry(value: Geometry) {
        this._geometry = value;
        this._renderDirty = true;
    }

    private _material: Material;
    get material() {
        return this._material;
    }
    set material(value: Material) {
        this._material = value;
        this._renderDirty = true;
    }

    update(frameState: IframeState): void {
        if (this._geometry && this._material) {
            frameState.renderList.push({
                maskLayer: this.entity.maskLayer,
                geometry: this._geometry,
                // program: this._material.program,
                // uniforms: this._material.uniforms,
                material: this._material,
                modelMatrix: this.entity.transform.worldMatrix,
                bouningSphere: this.boundingSphere,
            });
        }
    }

    private _boundingSphere: BoundingSphere;
    get boundingSphere() {
        if (this._boundingSphere == null) {
            if (this._geometry) {
                this._boundingSphere = new BoundingSphere();
                this._boundingSphere.setFromGeometry(this._geometry);
            }
        }
        return this._boundingSphere;
    }
    dispose(): void {}
}
