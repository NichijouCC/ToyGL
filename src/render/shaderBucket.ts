export enum ShaderBucket {
    SKIN = 1,
    FOG = 1 << 1,
    DIFFUSE_MAP = 1 << 2,
    AlPHA_CUT = 1 << 3,
    INS_POS = 1 << 4,
}
export namespace ShaderBucket {
    export const packShaderStr = (bucket: number) => {
        let str = "";
        if (bucket & ShaderBucket.SKIN) {
            str += "#define SKIN \n";
        }
        if (bucket & ShaderBucket.FOG) {
            str += "#define FOG \n";
        }
        if (bucket & ShaderBucket.DIFFUSE_MAP) {
            str += "#define DIFFUSEMAP \n";
        }
        if (bucket & ShaderBucket.AlPHA_CUT) {
            str += "#define AlPHACUT \n";
        }
        if (bucket & ShaderBucket.INS_POS) {
            str += "#define INS_POS \n";
        }
        return str;
    };
}
