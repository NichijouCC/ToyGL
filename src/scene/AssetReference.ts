import { EventHandler } from "../core/Event";
import { Asset } from "./asset/Asset";
import { DebuffAction } from "../core/DebuffAction";

export class AssetReference<T extends Asset>
{
    private _asset: T;
    set asset(value: T)
    {
        if (this._asset != value)
        {
            let oldAsset = this._asset;
            this._asset = value;

            this.onAssetChange.raiseEvent({ newAsset: value, oldAsset });
            this.attachToDirtyAction.excuteAction(() =>
            {
                let func = () => { this.onDirty.raiseEvent() }
                value?.onDirty.addEventListener(func);
                return () =>
                {
                    value?.onDirty.removeEventListener(func);
                }
            });
        }
    };
    get asset() { return this._asset };
    onAssetChange: EventHandler<AssetChangedEvent<T>> = new EventHandler();
    onDirty = new EventHandler<void>();
    private attachToDirtyAction = DebuffAction.create();

    destroy()
    {
        this._asset = undefined;
        this.attachToDirtyAction.dispose();
        this.attachToDirtyAction = undefined;
        this.onAssetChange.destroy();
        this.onAssetChange = undefined;
    }

}


export class AssetChangedEvent<T extends Asset>
{
    newAsset: T;
    oldAsset: T;
}