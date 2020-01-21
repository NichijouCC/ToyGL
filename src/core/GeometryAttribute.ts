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
    componentDatatype: number;
    componentsPerAttribute: number;
    normalize: boolean;
    values?: ArrayBufferView;
    value?:any;
    constructor(option: IgeometryAttributeOptions) {
        this.values = option.values;
        this.componentDatatype = option.componentDatatype;
        this.componentsPerAttribute = option.componentsPerAttribute;
        this.normalize = option.normalize != null ? option.normalize : false;
    }
}
interface IgeometryAttributeOptions {
    componentDatatype: number;
    componentsPerAttribute: number;
    normalize?: boolean;
    values?: ArrayBufferView;
    value?:any;
}
