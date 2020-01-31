import { BufferUsageEnum, Buffer } from "./Buffer";
import { IndexBuffer } from "./IndexBuffer";
import { GraphicsDevice } from "./GraphicsDevice";
import { Geometry } from "../core/Geometry";
import { Config } from "../core/Config";
import { VertexBuffer, IvertexData, VertexValue } from "./VertexBuffer";
import { IvertexAttribute } from "./VertexAttribute";


export class VertexArray{
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
        let vao =options.context.createVertexArray();
        if(vao){
            options.context.bindVertexArray(vao);
            this.bindVertexBufferOrValue(this.vertexbuffers, this.indexbuffer);
            options.context.bindVertexArray(null);
            this._vao=vao;

            this.bind=()=>{
                options.context.bindVertexArray(this._vao);
            }
            this.unbind=()=>{
                options.context.bindVertexArray(null);
            }
        }else{
            this.bind=()=>{
                this.bindVertexBufferOrValue(this.vertexbuffers, this.indexbuffer);
            }
            this.unbind=()=>{
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

    bind() {}
    unbind() {}

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
            //todo
        }else
        {
            let vertexbuffers= Object.keys(geAtts).map(attName=>{

                let vertexData:IvertexData;

                let geAtt=geAtts[attName];
                let att:IvertexAttribute={
                    index:Config.getAttLocationFromName(attName as any),
                    componentDatatype : geAtt.componentDatatype,
                    componentsPerAttribute : geAtt.componentsPerAttribute,
                    normalize : geAtt.normalize
                } as any;

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