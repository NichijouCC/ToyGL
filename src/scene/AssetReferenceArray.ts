import { Asset } from "./asset/Asset";
import { AssetReference, AssetChangedEvent } from "./AssetReference";
import { EventHandler } from "../core/Event";
import { DebuffAction } from "../core/DebuffAction";

export class AssetReferenceArray<T extends Asset>
{
    assets: AssetReference<T>[] = [];
    setValue(asset: T, index = 0)
    {
        if (this.assets[index] == null)
        {
            let newRef = new AssetReference<T>();
            this.assets[index] = newRef;
            this.attachToItemAssetChangeAction[index] = DebuffAction.create(() =>
            {
                let func = (event: AssetChangedEvent<T>) =>
                {
                    this.onAssetChange.raiseEvent({ ...event, index: index });
                }
                newRef.onAssetChange.addEventListener(func);
                return () =>
                {
                    newRef.onAssetChange.removeEventListener(func)
                }
            })

        }
        this.assets[index].asset = asset;
    }
    getValue(index = 0)
    {
        return this.assets[index]
    }
    delectItem(index: number)
    {
        this.assets.splice(index, 1);
        this.attachToItemAssetChangeAction[index]?.dispose();
    }
    private attachToItemAssetChangeAction: DebuffAction[] = [];
    onAssetChange: EventHandler<ArrayAssetChangeEvent<T>> = new EventHandler();
}

export class ArrayAssetChangeEvent<T extends Asset> extends AssetChangedEvent<T>
{
    index: number;
}