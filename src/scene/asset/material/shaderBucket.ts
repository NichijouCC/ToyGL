export enum ShaderBucket {
    SKIN = 1,
    FOG = 1 << 1,
    DIFFUSEMAP = 1 << 2,
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
        if (buket & ShaderBucket.DIFFUSEMAP) {
            str += "#define Diffuse \n";
        }
        return str;
    };
}
