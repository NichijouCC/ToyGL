import { CullingMask } from "../camera";
import { AssetReference } from "../assetReference";
import { Material } from "../../render/material";
import { EventTarget } from "@mtgoo/ctool";
import { Skin } from "../asset/skin";
import { SkinInstance } from "./animation/skinInstance";
import { Entity } from "../entity";
import { IRenderable } from "../../render/irenderable";

// instance onDirty 触发 layerComposition 对instance 重新分层，重新sort

export class MeshInstance implements IRenderable {
    static meshInstanceId: number = 0;

    readonly id: number;
    beVisible: boolean = true;
    enableCull: boolean = false;
    layerMask?: CullingMask;
    zDist?: number;
    instanceCount?: number;
    constructor() {
        this.id = MeshInstance.meshInstanceId++;

        this.geometryRef.onDirty.addEventListener(() => { this.onDirty.raiseEvent(this); });
        this.materialRef.onDirty.addEventListener(() => { this.onDirty.raiseEvent(this); });

        this.skinRef.onDataChange.addEventListener((event) => {
            const { newData: newAsset, oldData: oldAsset } = event;
            if (this._skinInstance) { this._skinInstance.destroy(); this._skinInstance = null; };
            if (newAsset) {
                this._skinInstance = new SkinInstance(newAsset, () => this.node);
            }
        });
    }

    node: Entity;
    get worldMat() { return this.node?.worldMatrix; }

    private geometryRef = new AssetReference<IGeometry>();
    get geometry() { return this.geometryRef.current; }
    set geometry(value: IGeometry) { this.geometryRef.current = value; }
    get boundingBox() { return this.geometryRef.current.boundingBox; }

    private materialRef = new AssetReference<Material>();
    get material(): Material { return this.materialRef.current; }
    set material(mat: Material) { this.materialRef.current = mat; }

    private skinRef = new AssetReference<Skin>();
    set skin(skin: Skin) { this.skinRef.current = skin; };
    get skin() { return this.skinRef.current; }

    private _skinInstance: SkinInstance;
    get skinInstance() { return this._skinInstance; };

    dispose() { this.onDispose.raiseEvent(this); };

    onDirty = new EventTarget<MeshInstance>();
    onDispose = new EventTarget<MeshInstance>();
    beforeRender = new EventTarget<MeshInstance>();

    static create(options: { geometry: IGeometry, material: Material, node: Entity, skin?: Skin }) {
        const ins = new MeshInstance();
        ins.geometry = options.geometry;
        ins.material = options.material;
        ins.node = options.node;
        if (options.skin) ins.skin = options.skin;
        return ins;
    }
}
