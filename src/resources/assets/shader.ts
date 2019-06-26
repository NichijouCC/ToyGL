import { ToyAsset, ItoyAsset } from "../base/toyAsset";
import { IprogramInfo, GlRender, IshaderOptions, IshaderInfo } from "../../render/glRender";
import { RenderLayerEnum } from "../../ec/ec";
import { IprogramState, IuniformInfo, IattributeInfo } from "twebgl/dist/types/type";

export class Shader extends ToyAsset implements IshaderInfo {
    layer: RenderLayerEnum;
    states: IprogramState;
    programName: string;
    program: WebGLProgram;
    uniformsDic: { [name: string]: IuniformInfo };
    attsDic: { [name: string]: IattributeInfo };

    constructor(param?: ItoyAsset) {
        super(param);
    }
    data: IshaderInfo;

    static fromCustomData(data: IshaderOptions) {
        let program = GlRender.createProgram(data);
        let newAsset = new Shader({ name: "custom_shader" });
        for (const key in program) {
            (newAsset as any)[key] = (program as any)[key];
        }
        return newAsset;
    }
    dispose(): void {}
}
