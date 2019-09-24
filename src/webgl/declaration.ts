export enum ShaderTypeEnum {
    VS,
    FS,
}
/**
 * shaderProgram 的uniform info
 */
export interface IuniformInfo {
    name: string;
    type: number;
    location: WebGLUniformLocation;
    setter: (value: any) => void;
    checkEqualFuc: (newValue: any, oldValue: any) => boolean;
}
/**
 * shderprogram的 attribute info
 */
export interface IattributeInfo {
    name: string;
    location: number;
}

export interface IshaderProgram {
    readonly program: any;
    readonly uniformsDic: { [name: string]: IuniformInfo };
    readonly attsDic: { [attName: string]: IattributeInfo };
}
