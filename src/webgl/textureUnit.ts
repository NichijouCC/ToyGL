import { Texture } from "./texture";

export class TextureUnit {
    max: number;
    constructor(max: number) {
        this.max = max;
    }
    private unitDic: { [unit: number]: Texture } = {};
    private current = 0;

    private newID() {
        if (this.current == this.max) {
            this.current = 0;
            return 0;
        } else {
            return this.current++
        }
    }

    checkNeedReAssignID(texture: Texture) {
        if (texture.unitId == null || this.unitDic[texture.unitId] != texture) {
            let id = this.newID();
            this.unitDic[id] = texture;
            texture.unitId = id;
            return id
        } else {
            return false
        }
    }
}