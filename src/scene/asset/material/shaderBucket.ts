export enum ShaderBucket {
    SKIN = 1,
    FOG = 1 << 1,
    DIFFUSE_MAP = 1 << 2,
    AlPHA_CUT = 1 << 3,
}
export namespace ShaderBucket {
    export const packShaderStr = (buket: number) => {
        let str = "";
        if (buket & ShaderBucket.SKIN) {
            str += "#define SKIN \n";
        }
        if (buket & ShaderBucket.FOG) {
            str += "#define FOG \n";
        }
        if (buket & ShaderBucket.DIFFUSE_MAP) {
            str += "#define DIFFUSEMAP \n";
        }
        if (buket & ShaderBucket.AlPHA_CUT) {
            str += "#define AlPHACUT \n";
        }
        return str;
    };
}
