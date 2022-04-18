import { AnimationState, AnimationStateData, ClippingAttachment, Color, MeshAttachment, NumberArrayLike, RegionAttachment, Skeleton, SkeletonClipping, SkeletonData, TextureAtlasPage, TextureAtlasRegion, Vector2, VertexEffect } from "@esotericsoftware/spine-core";
import { IComponent } from "../../core/ecs";
import { mat4, vec4 } from "../../mathD";
import { Component } from "../../scene";
import { SpineTexture } from "./spineTexture";

export class SpineComp extends Component {
    private _skeletonData: SkeletonData;
    set skeletonData(value: SkeletonData) {
        this._skeletonData = value;
        this._skeleton = new Skeleton(value);
        this._stateData = new AnimationStateData(value);
        this._state = new AnimationState(this._stateData);
    }
    get skeletonData() { return this._skeletonData }

    private _skeleton: Skeleton;
    get skeleton() { return this._skeleton }

    private _stateData: AnimationStateData;
    get animationStateData() { return this._stateData }

    private _state: AnimationState;
    get animationState() { return this._state }
    vertexEffect: VertexEffect;
    clone(): IComponent {
        throw new Error("Method not implemented.");
    }
    mainColor = vec4.fromValues(1, 1, 1, 1);

    changeSlotTexture(slotName: string, texture: SpineTexture) {
        if (this._skeleton == null) return;
        let slot = this._skeleton.findSlot(slotName);
        if (slot == null) {
            console.warn(`changeSlotTexture failed, cannot find slot by name=${slotName}`);
            return;
        }
        let att = slot.attachment;
        if (att instanceof MeshAttachment) {
            let copy = att.copy() as MeshAttachment;
            let region = this.createTextureRegion(texture);
            copy.region = region;
            copy.updateUVs();
            slot.setAttachment(copy);
        } else if (att instanceof RegionAttachment) {
            let copy = att.copy() as RegionAttachment;
            let region = this.createTextureRegion(texture);
            copy.setRegion(region);
            copy.updateOffset();
            slot.setAttachment(copy);
        } else {
            console.warn("changeSlotTexture failed,unsupported attachment type", att);
        }
    }

    private createTextureRegion(texture: SpineTexture) {
        let page = new TextureAtlasPage()
        page.width = texture.width;
        page.height = texture.height;
        page.setTexture(texture);
        let region = new TextureAtlasRegion()
        region.page = page
        region.width = texture.width
        region.height = texture.height
        region.originalWidth = texture.width
        region.originalHeight = texture.height
        region.degrees = 0;
        region.u = 0
        region.v = 0
        region.u2 = 1
        region.v2 = 1
        region.renderObject = region;
        return region;
    }
}