import { BufferUsageEnum, Buffer } from "./Buffer";
import { IndexBuffer } from "./IndexBuffer";
import { GraphicsDevice } from "./GraphicsDevice";
import { Geometry } from "../core/Geometry";
import { VertexBuffer, IvertexData, VertexValue } from "./VertexBuffer";
import { IvertexAttributeOption } from "./VertexAttribute";
import { IglElement } from "../core/IglElement";


export class VertexArray implements IglElement{
    private vertexbuffers: IvertexData[];
    private indexbuffer: IndexBuffer;
    private _vao: any;
    constructor(options: {
        context: GraphicsDevice;
        vertexbuffers: IvertexData[];
        indexBuffer?: IndexBuffer;
    }) {

        this.vertexbuffers=options.vertexbuffers;
        this.indexbuffer = options.indexBuffer;
        let gl=options.context.gl;

        if (options.context.caps.vertexArrayObject) {

            this._bind=()=>{
                gl.bindVertexArray(this._vao);
            }
            this._unbind=()=>{
                gl.bindVertexArray(null);
            }

            let vao=gl.createVertexArray();
            gl.bindVertexArray(vao)
            this.bindVertexBufferOrValue(this.vertexbuffers, this.indexbuffer);
            gl.bindVertexArray(null)
            this._vao=vao;

            this.destroy=()=>{
                gl.deleteVertexArray(this._vao);
            }

        }else
        {
            this._bind=()=>{
                this.bindVertexBufferOrValue(this.vertexbuffers, this.indexbuffer);
            }
            this._unbind=()=>{
                this.unbindAttributes(this.vertexbuffers, this.indexbuffer);
            }
        }
    }

    private  bindVertexBufferOrValue(vertexBuffers: IvertexData[], indexBuffer?: IndexBuffer): void {
        for (let i = 0; i < vertexBuffers.length; i++) {
            vertexBuffers[i].bind()
        }
        if (indexBuffer) {
            indexBuffer.bind();
        }
    }
    private unbindAttributes(vertexBuffers: IvertexData[], indexBuffer?: IndexBuffer) {
        for (let i = 0; i < vertexBuffers.length; i++) {
            vertexBuffers[i].unbind()
        }
        if (indexBuffer) {
            indexBuffer.unbind();
        }
    }
    private _bind() {}
    private _unbind() {}

    private static _cachedvertexArray:VertexArray;
    bind() {
        if(VertexArray._cachedvertexArray!=this){
            this._bind();
            VertexArray._cachedvertexArray=this;
        }
    }
    unbind() {
        this._unbind();
        VertexArray._cachedvertexArray=null;
    }

    destroy(){}

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
     * });
     *
     * @example
     * // Example 2. Creates a vertex array with interleaved attributes in a
     * // single vertex buffer.  The vertex and index buffer have static draw usage.
     * var va = VertexArray.fromGeometry({
     *     context            : context,
     *     geometry           : geometry,
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
       context:GraphicsDevice,
       geometry:Geometry,
       bufferUsage?:BufferUsageEnum,
       interleave?:boolean}){

        let usage=options.bufferUsage??BufferUsageEnum.STATIC_DRAW;
        let geAtts= options.geometry.attributes;


        if(options.interleave){
            //TODO 
        }else
        {
            let vertexbuffers= Object.keys(geAtts).map(attName=>{

                let vertexData:IvertexData;

                let geAtt=geAtts[attName];
                let att:IvertexAttributeOption={
                    type:geAtt.type,
                    componentDatatype : geAtt.componentDatatype,
                    componentsPerAttribute : geAtt.componentsPerAttribute,
                    normalize : geAtt.normalize
                };

                if(geAtt.values){
                    vertexData=new VertexBuffer({
                        context:options.context,
                        bufferFormat:[att],
                        usage:BufferUsageEnum.STATIC_DRAW,
                        typedArray:geAtt.values
                    });
                }else
                {
                    vertexData=new VertexValue({
                        context:options.context,
                        value:geAtt.value,
                        attribute:att
                    });
                }
                return vertexData;
            })

            let indexBuffer;
            if(options.geometry.indices){
                indexBuffer=new IndexBuffer({
                    context:options.context,
                    usage:usage,
                    typedArray:options.geometry.indices,
                })
            }
            return new VertexArray({
                context:options.context,
                vertexbuffers:vertexbuffers,
                indexBuffer:indexBuffer
            });
        }
    }
}