import { ComponentDatatypeEnum } from "../../../webgl/componentDatatypeEnum";
import { VertexAttEnum } from "../../../webgl/vertexAttEnum";
import { TypedArray } from "../../../core/typedArray";
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
export class GeometryAttribute {
    type: VertexAttEnum | string
    componentDatatype: ComponentDatatypeEnum;
    componentsPerAttribute: number;
    normalize: boolean;
    values?: TypedArray;
    value?: any;
    beDynamic: boolean;
    constructor(option: IgeometryAttributeOptions) {
        this.value = option.value;
        this.type = option.type;
        this.componentsPerAttribute = option.componentsPerAttribute ?? VertexAttEnum.toComponentSize(option.type);
        this.normalize = option.normalize ?? false;
        this.beDynamic = option.beDynamic ?? false;

        if (option.values instanceof Array) {
            this.componentDatatype = option.componentDatatype || ComponentDatatypeEnum.FLOAT;
            this.values = TypedArray.fromGlType(this.componentDatatype, option.values);
        } else {
            this.values = option.values;
            if (option.componentDatatype != null) {
                if (option.values != null && TypedArray.getGLtype(this.values) != option.componentDatatype) {
                    throw new Error("the componentDatatype is conflict with geometryAttributeOption's value (Typedarray)");
                }
                this.componentDatatype = option.componentDatatype;
            } else {
                this.componentDatatype = this.values ? TypedArray.getGLtype(this.values) : ComponentDatatypeEnum.FLOAT;
            }
        }
    }
}

export interface IgeometryAttributeOptions {
    componentDatatype?: ComponentDatatypeEnum;
    componentsPerAttribute: number;
    normalize?: boolean;
    values?: TypedArray | Array<number>;
    value?: any;
    type: VertexAttEnum;
    beDynamic?: boolean;
}
