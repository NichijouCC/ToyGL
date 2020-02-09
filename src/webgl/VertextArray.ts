import { BufferUsageEnum, Buffer } from "./Buffer";
import { IndexBuffer } from "./IndexBuffer";
import { GraphicsDevice } from "./GraphicsDevice";
import { VertexBuffer } from "./VertexBuffer";
import { IvertexAttributeOption, VertexAttribute } from "./VertexAttribute";
import { IglElement } from "../core/IglElement";
import { Geometry } from "../core/Geometry";

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
export class VertexArray implements IglElement
{
    private vertexAttributes: VertexAttribute[];
    indexbuffer: IndexBuffer;
    private _vao: any;
    constructor(options: {
        context: GraphicsDevice;
        vertexAttributes: IvertexAttributeOption[];
        indexBuffer?: IndexBuffer;
    })
    {

        this.vertexAttributes = options.vertexAttributes.map(item => new VertexAttribute(options.context, item));
        this.indexbuffer = options.indexBuffer;
        let gl = options.context.gl;

        if (options.context.caps.vertexArrayObject)
        {
            this._bind = () =>
            {
                gl.bindVertexArray(this._vao);
            }
            this._unbind = () =>
            {
                gl.bindVertexArray(null);
            }

            let vao = gl.createVertexArray();
            gl.bindVertexArray(vao)
            this.bindVertexAttributes(gl, this.vertexAttributes, this.indexbuffer);
            gl.bindVertexArray(null)
            this._vao = vao;

            this.destroy = () =>
            {
                gl.deleteVertexArray(this._vao);
            }

        } else
        {
            this._bind = () =>
            {
                this.bindVertexAttributes(gl, this.vertexAttributes, this.indexbuffer);
            }
            this._unbind = () =>
            {
                this.unbindAttributes(gl, this.vertexAttributes, this.indexbuffer);
            }
        }
    }

    setVertexAttribute()
    {

    }

    private bindVertexAttributes(gl: WebGLRenderingContext, vertexAtts: VertexAttribute[], indexBuffer?: IndexBuffer): void
    {
        for (let i = 0; i < vertexAtts.length; i++)
        {
            vertexAtts[i].bind();
        }
        if (indexBuffer)
        {
            indexBuffer.bind();
        }
    }
    private unbindAttributes(gl: WebGLRenderingContext, vertexAtts: VertexAttribute[], indexBuffer?: IndexBuffer)
    {
        for (let i = 0; i < vertexAtts.length; i++)
        {
            vertexAtts[i].unbind();
        }
        if (indexBuffer)
        {
            indexBuffer.unbind();
        }
    }
    private _bind() { }
    private _unbind() { }

    private static _cachedvertexArray: VertexArray;
    bind()
    {
        if (VertexArray._cachedvertexArray != this)
        {
            this._bind();
            VertexArray._cachedvertexArray = this;
        }
    }
    unbind()
    {
        this._unbind();
        VertexArray._cachedvertexArray = null;
    }

    destroy() { }

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
    static fromGeometry(options: {
        context: GraphicsDevice,
        geometry: Geometry,
        bufferUsage?: BufferUsageEnum,
        interleave?: boolean
    })
    {
        let usage = options.bufferUsage ?? BufferUsageEnum.STATIC_DRAW;
        let geAtts = options.geometry.attributes;
        if (options.interleave)
        {
            //TODO 
        } else
        {
            let vertexAtts = Object.keys(geAtts).map(attName =>
            {
                let geAtt = geAtts[attName];
                let att: IvertexAttributeOption = {
                    type: geAtt.type,
                    componentDatatype: geAtt.componentDatatype,
                    componentsPerAttribute: geAtt.componentsPerAttribute,
                    normalize: geAtt.normalize,
                };

                if (geAtt.values)
                {
                    att.vertexBuffer = new VertexBuffer({
                        context: options.context,
                        usage: usage,
                        typedArray: geAtt.values
                    });
                } else
                {
                    att.value = geAtt.value
                }
                return att;
            })

            let indexBuffer;
            if (options.geometry.indices)
            {
                indexBuffer = new IndexBuffer({
                    context: options.context,
                    usage: usage,
                    typedArray: options.geometry.indices,
                })
            }
            return new VertexArray({
                context: options.context,
                vertexAttributes: vertexAtts,
                indexBuffer: indexBuffer
            });
        }
    }
}