import { ToyAsset } from "../base/toyAsset";

export class TextAsset extends ToyAsset {
    constructor(name: string, url: string) {
        super({ name: name, URL: url });
    }
    content: string = null;

    dispose() {
        if (this.beDefaultAsset) return;
        this.content = null;
    }
}