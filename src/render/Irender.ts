export interface Irender {
    createShaderProgram(vs: string, fs: string): WebGLProgram;
    createVertexBuffer();
    createGeometry(option: IgeometryOption): IgeometryInfo;
}

export interface IviewDataInfo {
    value?: number[] | ArrayBufferView;
    count?: number;
    glBuffer?: WebGLBuffer;
    drawType?: number;
    componentSize?: number;
    componentDataType?: number;
    normalize?: boolean;
    bytesStride?: number;
    bytesOffset?: number;
    divisor?: number;
}
export declare type IviewOption = number[] | ArrayBufferView | IviewDataInfo;

export interface IgeometryOption {
    atts: {
        [keyName: string]: IviewOption;
    };
    indices?: IviewOption;
    primitiveType?: number;
}

/**
 * 顶点属性信息
 */
export interface IvertexAttrib {
    name: string;
    viewBuffer?: ArrayBufferView;
    count?: number;
    glBuffer: WebGLBuffer;
    drawType: number;
    componentSize: number;
    componentDataType: number;
    normalize: boolean;
    bytesStride: number;
    bytesOffset: number;
    divisor?: number;
}
/**
 * 顶点索引信息
 */
export interface IvertexIndex {
    name: string;
    viewBuffer?: ArrayBufferView;
    count?: number;
    componentDataType: number;
    glBuffer: WebGLBuffer;
    drawType?: number;
}

export interface IgeometryInfo {
    atts: { [attName: string]: IvertexAttrib };
    indices?: IvertexIndex;
    vaoDic: { [programeId: number]: WebGLVertexArrayObject };
    count: number;
    offset: number;
    primitiveType: number;
}

export interface ItoyRenderOption {}
