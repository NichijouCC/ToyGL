import { EngineTexture } from "./engineTexture";

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

export interface IframeBufferAttachment {
    type: "color" | "depth" | "depthWithStencil" | "stencil";
    beTexture?: boolean;
    format?: number;
    textureOptions?: {
        pixelFormat?: number;
        wrapS?: number;
        wrapT?: number;
        filterMin?: number;
        filterMax?: number;
        pixelDatatype?: number;
    };
}

export interface IframeBufferInfo {
    frameBuffer: WebGLFramebuffer;
    width: number;
    height: number;
    attachInfos: {
        attachment: WebGLRenderbuffer | EngineTexture;
        type: "color" | "depth" | "depthWithStencil" | "stencil";
        beTexture: boolean;
    }[];
}
