import { ToyAsset, ItoyAsset } from "../base/toyAsset";
import { WebglRender, IgeometryInfo, IgeometryOptions } from "../../render/webglRender";
import { VertexAttEnum } from "../../render/vertexAttType";
import { IvertexAttrib, IvertexIndex } from "twebgl/dist/types/type";
import { GlConstants } from "../../render/GlConstant";

export class Geometry extends ToyAsset implements IgeometryInfo {
    atts: { [attName: string]: IvertexAttrib };
    indices?: IvertexIndex;
    vaoDic: { [programeId: number]: WebGLVertexArrayObject };
    count: number;
    offset: number;
    primitiveType: number;
    constructor(param?: ItoyAsset) {
        super(param);
    }
    dispose(): void { }

    static fromCustomData(data: IgeometryOptions) {
        let geometry = WebglRender.createGeometry(data);
        let newAsset = new Geometry({ name: "custom_Mesh" });
        Object.assign(newAsset, geometry);
        return newAsset;
    }
    private attDic: { [att: string]: any[] } = {};
    getAttDataArr(type: VertexAttEnum) {
        if (this.attDic[type] != null) {
            return this.attDic[type];
        } else {
            if (this.atts[type] != null) {
                this.attDic[type] = getTypedValueArr(type, this.atts[VertexAttEnum.POSITION]);
            } else {
                console.warn("geometry don't contain vertex type:", type);
            }
            return this.attDic[type];
        }
    }

    updateAttData(type: VertexAttEnum, data: number[] | ArrayBufferView) {
        if (data instanceof Array) {
            WebglRender.updateGeometry(this, type, new Float32Array(data));
        } else {
            WebglRender.updateGeometry(this, type, data);
        }
    }
}

export class VertexAtt implements IvertexAttrib {
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
 * 将buffer数据分割成对应的 typedarray，例如 positions[i]=new floa32array();
 * @param newGeometry
 * @param geometryOp
 */
export function getTypedValueArr(key: string, element: IvertexAttrib) {
    let strideInBytes = element.bytesStride || glTypeToByteSize(element.componentDataType) * element.componentSize;
    let dataArr = [];
    for (let i = 0; i < element.count; i++) {
        let value = getTypedArry(
            element.componentDataType,
            element.viewBuffer as Uint8Array,
            i * strideInBytes + element.bytesOffset,
            element.componentSize,
        );
        dataArr.push(value);
    }
    return dataArr;
}

export function glTypeToByteSize(type: number) {
    switch (type) {
        case GlConstants.BYTE:
            return Int8Array.BYTES_PER_ELEMENT;
        case GlConstants.UNSIGNED_BYTE:
            return Uint8Array.BYTES_PER_ELEMENT;
        case GlConstants.SHORT:
            return Int16Array.BYTES_PER_ELEMENT;
        case GlConstants.UNSIGNED_SHORT:
            return Uint16Array.BYTES_PER_ELEMENT;
        case GlConstants.UNSIGNED_INT:
            return Uint32Array.BYTES_PER_ELEMENT;
        case GlConstants.FLOAT:
            return Float32Array.BYTES_PER_ELEMENT;
        default:
            throw new Error(`Invalid component type ${type}`);
    }
}
export function getTypedArry(componentType: number, bufferview: ArrayBufferView, byteOffset: number, Len?: number) {
    let buffer = bufferview.buffer;
    byteOffset = bufferview.byteOffset + (byteOffset || 0);
    switch (componentType) {
        case GlConstants.BYTE:
            return new Int8Array(buffer, byteOffset, Len);
        case GlConstants.UNSIGNED_BYTE:
            return new Uint8Array(buffer, byteOffset, Len);
        case GlConstants.SHORT:
            return new Int16Array(buffer, byteOffset, Len);
        case GlConstants.UNSIGNED_SHORT:
            return new Uint16Array(buffer, byteOffset, Len);
        case GlConstants.UNSIGNED_INT:
            return new Uint32Array(buffer, byteOffset, Len);
        case GlConstants.FLOAT: {
            if ((byteOffset / 4) % 1 != 0) {
                console.error("??");
            }
            return new Float32Array(buffer, byteOffset, Len);
        }
        default:
            throw new Error(`Invalid component type ${componentType}`);
    }
}
