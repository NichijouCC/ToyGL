import { Engine } from "../webgl/engine";
import { EngineCapability } from "../webgl/engineCapability";

export class Context {
    gl:WebGLRenderingContext;
    engine: Engine;

    private _caps: EngineCapability;
    get caps(): EngineCapability {
        return this._caps;
    }
}
