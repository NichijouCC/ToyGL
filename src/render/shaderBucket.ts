export enum ShaderBucket {
    SKIN = 1,
    FOG = 1 << 1,
    DIFFUSE_MAP = 1 << 2,
    AlPHA_CUT = 1 << 3,
    INS_MAT4 = 1 << 4,
    INS_COLOR = 1 << 5,
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
        if (bucket & ShaderBucket.INS_MAT4) {
            str += "#define INS_MAT \n";
        }
        if (bucket & ShaderBucket.INS_COLOR) {
            str += "#define INS_COLOR \n";
        }
        return str;
    };
}
