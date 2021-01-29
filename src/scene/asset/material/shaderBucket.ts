export enum ShaderBucket {
    SKIN = 1,
    FOG = 1 << 1,
    DIFFUSEMAP = 1 << 2,
    AlPHACUT = 1 << 3,
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
            str += "#define DIFFUSEMAP \n";
        }
        if (buket & ShaderBucket.AlPHACUT) {
            str += "#define AlPHACUT \n";
        }
        return str;
    };
}
