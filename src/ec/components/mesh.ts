import { Icomponent, Ientity, Irender, CullingMask, EC } from "../ec";
import { Material } from "../../resources/assets/material";
import { Geometry } from "../../resources/assets/geometry";
import { IframeState, Irenderable } from "../../scene/frameState";
import { Transform } from "./transform";

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
    private render: Irenderable;
    update(frameState: IframeState): void {
        let currentRender = (this.render && this.updateRender()) || {
            maskLayer: this.entity.maskLayer,
            geometry: this._geometry,
            // program: this._material.program,
            // uniforms: this._material.uniforms,
            material: this._material,
            modelMatrix: (this.entity.getCompByName("Transform") as Transform).worldMatrix,
        };
        frameState.renderList.push(currentRender);
    }
    private updateRender(): Irenderable {
        if (this._renderDirty) {
            this.render.geometry = this._geometry;
            // this.render.program = this._material.program;
            // this.render.uniforms = this._material.uniforms;
            this.render.material = this._material;
            this._renderDirty = false;
        }
        this.render.maskLayer = this.entity.maskLayer;
        return this.render;
    }
    dispose(): void {}
}
