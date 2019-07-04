import { GlRender, GlTextrue } from "./../../render/glRender";
import { Texture } from "./../assets/texture";
export class DefTextrue {
    private static _white: Texture;
    static get WHITE(): Texture {
        if (this._white == null) {
            this._white = this.createByType("white");
        }
        return this._white;
    }
    private static _grid: Texture;
    static get GIRD(): Texture {
        if (this._grid == null) {
            this._grid = this.createByType("grid");
        }
        return this._grid;
    }

    private static createByType(type: string): Texture {
        let imaginfo;
        switch (type) {
            case "white":
                imaginfo = GlTextrue.WHITE;
                break;
            case "grid":
                imaginfo = GlTextrue.GIRD;
                break;
        }
        if (imaginfo != null) {
            let tex = new Texture();
            tex.texture = imaginfo.texture;
            tex.texDes = imaginfo.texDes;
            return tex;
        } else {
            return null;
        }
    }
}
