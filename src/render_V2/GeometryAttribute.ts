export class GeometryAttribute {
    componentDatatype: number;
    componentsPerAttribute: number;
    normalize: boolean = false;
    values: ArrayBufferView;
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
    values: ArrayBufferView;
}
