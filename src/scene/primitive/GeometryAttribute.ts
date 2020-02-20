import { VertexAttEnum } from "../../webgl/VertexAttEnum";
import { TypedArray } from "../../core/TypedArray";
import { IvertexAttributeOption } from "../../webgl/VertexAttribute";
import { VertexBuffer } from "../../webgl/VertexBuffer";
import { ComponentDatatypeEnum } from "../../webgl/ComponentDatatypeEnum";

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
    componentDatatype: ComponentDatatypeEnum;
    componentsPerAttribute: number;
    normalize: boolean;
    values?: TypedArray;
    value?: any;
    beDynamic: boolean;
    constructor(option: IgeometryAttributeOptions)
    {
        this.value = option.value;
        if (option.values instanceof Array)
        {
            this.componentDatatype = option.componentDatatype || ComponentDatatypeEnum.FLOAT;
            this.values = TypedArray.fromGlType(this.componentDatatype, option.values);
        } else
        {
            this.values = option.values;
            if (option.componentDatatype != null)
            {
                if (option.values != null && TypedArray.glType(this.values) != option.componentDatatype)
                {
                    throw new Error("the componentDatatype is conflict with geometryAttributeOption's value (Typedarray)")
                }
                this.componentDatatype = option.componentDatatype;
            } else
            {
                this.componentDatatype = this.values ? TypedArray.glType(this.values) : ComponentDatatypeEnum.FLOAT;
            }
        }
        this.componentsPerAttribute = option.componentsPerAttribute;
        this.normalize = option.normalize ?? false;
        this.beDynamic = option.beDynamic ?? false;
    }
}

export interface IgeometryAttributeOptions
{
    componentDatatype?: ComponentDatatypeEnum;
    componentsPerAttribute: number;
    normalize?: boolean;
    values?: TypedArray | Array<number>;
    value?: any;
    type: VertexAttEnum;
    beDynamic?: boolean;
}


