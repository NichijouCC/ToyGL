import { Shader } from "../webgl/Shader";
import { RenderLayerEnum } from "./RenderLayer";
import { IshaderOption } from "../webgl/GraphicsDevice";

interface IglShaderOption extends IshaderOption{
    layer?:RenderLayerEnum;
    queue?:number;
}

class GlShader extends Shader{
    layer:RenderLayerEnum;
    queue:number;
    constructor(options:IglShaderOption){
        super(options);
        this.layer=options.layer||RenderLayerEnum.Geometry;
        this.queue=options.queue??0;
    }
}
export {GlShader as Shader,IglShaderOption as IshaderOption}