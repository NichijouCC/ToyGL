import { CullingMask } from "../camera";
import { AssetReference } from "../assetReference";
import { Igeometry } from "../asset/geometry/abstractGeometryAsset";
import { Material } from "../asset/material/material";
import { EventTarget } from "@mtgoo/ctool";
import { Skin } from "../asset/Skin";
import { SkinInstance } from "./skinInstance";
import { Entity } from "../../core/ecs/entity";
import { Irenderable } from "../render/irenderable";

// instance ondirty 触发 layercomposition 对instance 重新分层，重新sort

export class MeshInstance implements Irenderable {
    static meshInstanceId: number = 0;

    readonly id: number;
    beVisible: boolean = true;
    enableCull: boolean = false;
    cullingMask?: CullingMask;
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

    private geometryRef = new AssetReference<Igeometry>();
    get geometry() { return this.geometryRef.current; }
    set geometry(value: Igeometry) { this.geometryRef.current = value; }
    get boundingBox() { return this.geometryRef.current.boundingBox; }

    private materialRef = new AssetReference<Material>();
    get material(): Material { return this.materialRef.current; }
    set material(mat: Material) { this.materialRef.current = mat; }

    private skinRef = new AssetReference<Skin>();
    set skin(skin: Skin) { this.skinRef.current = skin; };
    get skin() { return this.skinRef.current; }

    private _skinInstance: SkinInstance;
    get skinInstance() { return this._skinInstance; };

    dispose() { this.ondispose.raiseEvent(this); };

    onDirty = new EventTarget<MeshInstance>();
    ondispose = new EventTarget<MeshInstance>();
    beforeRender = new EventTarget<MeshInstance>();

    static create(options: { geometry: Igeometry, material: Material, node: Entity, skin?: Skin }) {
        const ins = new MeshInstance();
        ins.geometry = options.geometry;
        ins.material = options.material;
        ins.node = options.node;
        if (options.skin) ins.skin = options.skin;
        return ins;
    }
}
