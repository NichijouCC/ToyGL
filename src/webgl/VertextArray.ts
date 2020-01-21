import { VertexBuffer, IndexBuffer, BufferUsageEnum, Buffer } from "./Buffer";
import { IvertexArray } from "./Ibase";
import { Context } from "../core/context";
import { Geometry } from "../core/Geometry";

export interface IvertexAttribute {
    index: number; // 0;
    enabled: boolean; // true;
    vertexBuffer: VertexBuffer; // positionBuffer;
    value:any;
    componentsPerAttribute: number; // 3;
    componentDatatype: ComponentDatatypeEnum; // ComponentDatatype.FLOAT;
    normalize: boolean; // false;
    offsetInBytes: number; // 0;
    strideInBytes: number; // 0; // tightly packed
    instanceDivisor: number; // 0; // not instanced
}

/**
 * Creates a vertex array, which defines the attributes making up a vertex, and contains an optional index buffer
 * to select vertices for rendering.  Attributes are defined using object literals as shown in Example 1 below.
 * 
 * @example
 * // Example 1. Create a vertex array with vertices made up of three floating point
 * // values, e.g., a position, from a single vertex buffer.  No index buffer is used.
 * var positionBuffer = Buffer.createVertexBuffer({
 *     context : context,
 *     sizeInBytes : 12,
 *     usage : BufferUsage.STATIC_DRAW
 * });
 * var attributes = [
 *     {
 *         index                  : 0,
 *         enabled                : true,
 *         vertexBuffer           : positionBuffer,
 *         componentsPerAttribute : 3,
 *         componentDatatype      : ComponentDatatype.FLOAT,
 *         normalize              : false,
 *         offsetInBytes          : 0,
 *         strideInBytes          : 0 // tightly packed
 *         instanceDivisor        : 0 // not instanced
 *     }
 * ];
 * var va = new VertexArray({
 *     context : context,
 *     attributes : attributes
 * });
 *
 * @example
 * // Example 2. Create a vertex array with vertices from two different vertex buffers.
 * // Each vertex has a three-component position and three-component normal.
 * var positionBuffer = Buffer.createVertexBuffer({
 *     context : context,
 *     sizeInBytes : 12,
 *     usage : BufferUsage.STATIC_DRAW
 * });
 * var normalBuffer = Buffer.createVertexBuffer({
 *     context : context,
 *     sizeInBytes : 12,
 *     usage : BufferUsage.STATIC_DRAW
 * });
 * var attributes = [
 *     {
 *         index                  : 0,
 *         vertexBuffer           : positionBuffer,
 *         componentsPerAttribute : 3,
 *         componentDatatype      : ComponentDatatype.FLOAT
 *     },
 *     {
 *         index                  : 1,
 *         vertexBuffer           : normalBuffer,
 *         componentsPerAttribute : 3,
 *         componentDatatype      : ComponentDatatype.FLOAT
 *     }
 * ];
 * var va = new VertexArray({
 *     context : context,
 *     attributes : attributes
 * });
 *
 * @example
 * // Example 3. Creates the same vertex layout as Example 2 using a single
 * // vertex buffer, instead of two.
 * var buffer = Buffer.createVertexBuffer({
 *     context : context,
 *     sizeInBytes : 24,
 *     usage : BufferUsage.STATIC_DRAW
 * });
 * var attributes = [
 *     {
 *         vertexBuffer           : buffer,
 *         componentsPerAttribute : 3,
 *         componentDatatype      : ComponentDatatype.FLOAT,
 *         offsetInBytes          : 0,
 *         strideInBytes          : 24
 *     },
 *     {
 *         vertexBuffer           : buffer,
 *         componentsPerAttribute : 3,
 *         componentDatatype      : ComponentDatatype.FLOAT,
 *         normalize              : true,
 *         offsetInBytes          : 12,
 *         strideInBytes          : 24
 *     }
 * ];
 * var va = new VertexArray({
 *     context : context,
 *     attributes : attributes
 * });
 *
 */
export class VertexArray implements IvertexArray {
    private attributes: VertexAttribute[];
    private indexbuffer: IndexBuffer;
    private _vao: any;
    private _gl: WebGLRenderingContext;
    constructor(options: {
        context: Context;
        attributes: IvertexAttribute[];
        indexBuffer?: IndexBuffer;
    }) {
        this._gl = options.context.gl;
        this.attributes=options.attributes.map((att,index)=>{
            return new VertexAttribute({context:options.context,att,index})
        })

        this.indexbuffer = options.indexBuffer;
        if (options.context.caps.vertexArrayObject) {
            var vao = this._gl.createVertexArray();
            this._gl.bindVertexArray(vao);
            this.bindAttributes(this.attributes, this.indexbuffer);
            this._gl.bindVertexArray(null);
            this._vao=vao;
        }
    }

    private  bindAttributes(vertexBuffers: VertexAttribute[], indexBuffer?: IndexBuffer): void {
        for (let i = 0; i < vertexBuffers.length; i++) {
            let att = vertexBuffers[i];
            if (att.enabled) {
                att.bind();
            }
        }
        if (indexBuffer) {
            indexBuffer.bind();
        }
    }
    private unbindAttributes(vertexBuffers: VertexAttribute[], indexBuffer?: IndexBuffer) {
        for (let i = 0; i < vertexBuffers.length; i++) {
            let att = vertexBuffers[i];
            if (att.enabled) {
                att.unbind();
            }
        }
        if (indexBuffer) {
            indexBuffer.bind();
        }
    }

    bind() {
        if (this._vao) {
            this._gl.bindVertexArray(this._vao);
        } else {
            this.bindAttributes(this.attributes, this.indexbuffer);
        }
    }

    unbind() {
        if (this._vao) {
            this._gl.bindVertexArray(null);
        } else {
            this.unbindAttributes(this.attributes, this.indexbuffer);
        }
    }

    /**
     * Creates a vertex array from a geometry.  A geometry contains vertex attributes and optional index data
     * in system memory, whereas a vertex array contains vertex buffers and an optional index buffer in WebGL
     * memory for use with rendering.
     *
     * @example
     * // Example 1. Creates a vertex array for rendering a box.  The default dynamic draw
     * // usage is used for the created vertex and index buffer.  The attributes are not
     * // interleaved by default.
     * var geometry = new BoxGeometry();
     * var va = VertexArray.fromGeometry({
     *     context            : context,
     *     geometry           : geometry,
     *     attributeLocations : GeometryPipeline.createAttributeLocations(geometry),
     * });
     *
     * @example
     * // Example 2. Creates a vertex array with interleaved attributes in a
     * // single vertex buffer.  The vertex and index buffer have static draw usage.
     * var va = VertexArray.fromGeometry({
     *     context            : context,
     *     geometry           : geometry,
     *     attributeLocations : GeometryPipeline.createAttributeLocations(geometry),
     *     bufferUsage        : BufferUsage.STATIC_DRAW,
     *     interleave         : true
     * });
     *
     * @example
     * // Example 3.  When the caller destroys the vertex array, it also destroys the
     * // attached vertex buffer(s) and index buffer.
     * va = va.destroy();
     *
     */
    static fromGeometry(options:{
       context:Context,
       geometry:Geometry,
       attributeLocations:{[attname:string]:number},
       bufferUsage?:BufferUsageEnum,
       interleave?:boolean}){
        if(options.interleave){
            //todo
        }else
        {
            let geAtts= options.geometry.attributes;
            let usage=options.bufferUsage??BufferUsageEnum.STATIC_DRAW;
            let attArr= Object.keys(geAtts).map(attName=>{
                let geAtt=geAtts[attName];
                let att:IvertexAttribute={
                    index:options.attributeLocations[attName],
                    componentDatatype : geAtt.componentDatatype,
                    componentsPerAttribute : geAtt.componentsPerAttribute,
                    normalize : geAtt.normalize
                } as any;

                if(geAtt.values){
                    att.vertexBuffer=Buffer.createVertexBuffer({
                        context:options.context,
                        typedArray:geAtt.values,
                        usage:usage});
                }else
                {
                    att.value=geAtt.value;
                }
                return att;
            })

            let indexBuffer;
            if(options.geometry.indices){
                indexBuffer=Buffer.createIndexBuffer({
                    context:options.context,
                    usage:usage,
                    typedArray:options.geometry.indices,
                })
            }
            return new VertexArray({
                context:options.context,
                attributes:attArr,
                indexBuffer:indexBuffer
            });
        }
    }
}


export class VertexAttribute implements IvertexAttribute{
    readonly index: number;    
    readonly enabled: boolean;
    readonly vertexBuffer: VertexBuffer;
    readonly value: any;
    readonly componentsPerAttribute: number;
    readonly componentDatatype: number;
    readonly normalize: boolean;
    readonly offsetInBytes: number;
    readonly strideInBytes: number;
    readonly instanceDivisor: number;

    private _gl:WebGLRenderingContext;
    constructor(options:{context:Context,att:IvertexAttribute,index?:number} ){

        //todo  check 
        if (options.att.vertexBuffer==null && options.att.value==null) {
            throw new Error('attribute must have a vertexBuffer or a value.');
        }

        this._gl=options.context.gl;
        let att=options.att;
        this.index= att.index??options.index;
        this.enabled= att.enabled??true;// true;
        this.vertexBuffer= att.vertexBuffer;// positionBuffer;
        this.value= att.value;
        this.componentsPerAttribute= att.componentsPerAttribute;// 3;
        this.componentsPerAttribute= att.componentsPerAttribute??ComponentDatatypeEnum.FLOAT; // ComponentDatatype.FLOAT;
        this.normalize= att.normalize??false; // false;
        this.offsetInBytes= att.offsetInBytes??0; // 0;
        this.strideInBytes= att.strideInBytes??0; // 0; // tightly packed
        this.instanceDivisor= att.instanceDivisor??0; // 0; // not instanced


        if(att.vertexBuffer){
            this.bind=()=>{
                att.vertexBuffer.bind();
                this._gl.enableVertexAttribArray(att.index);
                this._gl.vertexAttribPointer(
                    att.index,
                    att.componentsPerAttribute,
                    att.componentDatatype,
                    att.normalize,
                    att.strideInBytes,
                    att.offsetInBytes,
                );
                if (att.instanceDivisor !== undefined) {
                    this._gl.vertexAttribDivisor(att.index, att.instanceDivisor);
                }
            }
            this.unbind=()=>{
                this._gl.disableVertexAttribArray(att.index);
                if (att.instanceDivisor !== undefined) {
                    this._gl.vertexAttribDivisor(att.index, 0);
                }
            }

        }else{
            let bindFunc=VertexAttributeFuncMap[att.componentsPerAttribute](this._gl);
            this.bind=()=>{
                bindFunc(att.index,att.value);
            }
        }
    }

    bind(){}

    unbind(){}
}

const VertexAttributeFuncMap:{[size:number]:(gl:WebGLRenderingContext)=>any}={
    1:(gl:WebGLRenderingContext)=>{
        return gl.vertexAttrib1fv
    },
    2:(gl:WebGLRenderingContext)=>{
        return gl.vertexAttrib2fv
    },
    3:(gl:WebGLRenderingContext)=>{
        return gl.vertexAttrib3fv
    },
    4:(gl:WebGLRenderingContext)=>{
        return gl.vertexAttrib4fv
    },
}

export enum ComponentDatatypeEnum{
    FLOAT
}
