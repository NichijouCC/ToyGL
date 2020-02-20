import { VertexAttEnum } from "../../webgl/VertexAttEnum";
import { TypedArray } from "../../core/TypedArray";
import { IvertexAttributeOption } from "../../webgl/VertexAttribute";
import { VertexBuffer } from "../../webgl/VertexBuffer";

/**
 * 
 * @example useage
 * ```
 * let pos= new GeometryAttribute({
 *       componentDatatype : ComponentDatatype.FLOAT,
 *       componentsPerAttribute : 3,
 *       values : new Float32Array([
 *         0.0, 0.0, 0.0,
 *         7500000.0, 0.0, 0.0,
 *         0.0, 7500000.0, 0.0
 *       ])
 *     })
 * 
 */
export class GeometryAttribute
{
    type: VertexAttEnum | string
    componentDatatype: number;
    componentsPerAttribute: number;
    normalize: boolean;
    values?: TypedArray;
    value?: any;
    beDynamic: boolean;
    constructor(option: IgeometryAttributeOptions)
    {
        this.value = option.value;
        this.values = option.values;
        this.componentDatatype = option.componentDatatype;
        this.componentsPerAttribute = option.componentsPerAttribute;
        this.normalize = option.normalize ?? false;
        this.beDynamic = option.beDynamic ?? false;
    }
}
export interface IgeometryAttributeOptions
{
    componentDatatype: number;
    componentsPerAttribute: number;
    normalize?: boolean;
    values?: TypedArray;
    value?: any;
    type?: VertexAttEnum | string;
    beDynamic?: boolean;
}


