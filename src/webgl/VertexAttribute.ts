import { VertexBuffer } from "./VertexBuffer";
import { GraphicsDevice } from "./GraphicsDevice";
import { ComponentDatatypeEnum } from "./ComponentDatatypeEnum";
import { VertexAttEnum } from "./VertexAttEnum";

export interface IvertexAttribute {
    // index: number; // 0;
    type:string|VertexAttEnum
    enabled: boolean; // true;
    // vertexBuffer: VertexBuffer; // positionBuffer;
    // value:any;
    componentsPerAttribute: number; // 3;
    componentDatatype: number; // ComponentDatatype.FLOAT;
    normalize: boolean; // false;
    offsetInBytes: number; // 0;
    strideInBytes: number; // 0; // tightly packed
    instanceDivisor: number; // 0; // not instanced
}
export interface IvertexAttributeOption {
    // index?: number; // 0;
    type:string|VertexAttEnum
    enabled?: boolean; // true;
    // vertexBuffer: VertexBuffer; // positionBuffer;
    // value:any;
    componentsPerAttribute: number; // 3;
    componentDatatype?: number; // ComponentDatatype.FLOAT;
    normalize?: boolean; // false;
    offsetInBytes?: number; // 0;
    strideInBytes?: number; // 0; // tightly packed
    instanceDivisor?: number; // 0; // not instanced
}
/**
 * 
 * @example useage
 * var attributes = new VertexAttribute(
 *     {
 *         type                  : VertexAttEnum.POSITION,
 *         componentsPerAttribute : 3,
 *         componentDatatype      : ComponentDatatype.FLOAT,
 *         offsetInBytes          : 0,
 *         strideInBytes          : 24
 *     })
 */
export class VertexAttribute implements IvertexAttribute
{
    readonly index:number;
    readonly type: string;
    readonly enabled: boolean;
    readonly componentsPerAttribute: number;
    readonly componentDatatype: number;
    readonly normalize: boolean;
    readonly offsetInBytes: number;
    readonly strideInBytes: number;
    readonly instanceDivisor: number;
    constructor(att: IvertexAttributeOption)
    {
        this.type = att.type;
        this.index=VertexLocation.fromAttributeType(this.type);
        this.enabled = att.enabled ?? true; // true;
        this.componentsPerAttribute = att.componentsPerAttribute; // 3;
        this.componentDatatype = att.componentDatatype ?? ComponentDatatypeEnum.FLOAT; // FLOAT;
        this.normalize = att.normalize ?? false; // false;
        this.offsetInBytes = att.offsetInBytes ?? 0; // 0;
        this.strideInBytes = att.strideInBytes ?? 0; // 0; // tightly packed
        this.instanceDivisor = att.instanceDivisor ?? 0; // 0; // not instanced
    }
}

export class VertexLocation{
    private static attLocationMap:{[type:string]:number}={};
    static fromAttributeType(type:VertexAttEnum|string){
        let location=this.attLocationMap[type];
        if(location==null){
            console.warn(`regist new attribute Type: ${type}`);
            this.registAttributeType(type);
        }
        return this.attLocationMap[type];
    }
    /**
     * 注册vertex attribute 类型
     * @param name 
     */
    private static locationId=-1;
    static registAttributeType(name:string){
        this.attLocationMap[name]=this.locationId++;
    }
}

