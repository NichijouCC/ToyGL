import { VertexBuffer, IndexBuffer } from "./buffer";
import { IvertexArray } from "./Ibase";

export interface IvertexAttribute {
    index: number; // 0;
    enabled: boolean; // true;
    vertexBuffer: VertexBuffer; // positionBuffer;
    componentsPerAttribute: number; // 3;
    componentDatatype: number; // ComponentDatatype.FLOAT;
    normalize: boolean; // false;
    offsetInBytes: number; // 0;
    strideInBytes: number; // 0; // tightly packed
    instanceDivisor: number; // 0; // not instanced
}

export class VertexArray implements IvertexArray {
    private attributes: IvertexAttribute[];
    private indexbuffer: IndexBuffer;
    private _vao: any;
    private _gl: WebGLRenderingContext;
    constructor(options: {
        gl: WebGLRenderingContext;
        vertexArrayObject: boolean;
        attributes: IvertexAttribute[];
        indexBuffer?: IndexBuffer;
    }) {
        this._gl = options.gl;
        this.attributes = this.attributes;
        this.indexbuffer = options.indexBuffer;
        if (options.vertexArrayObject) {
            var vao = this._gl.createVertexArray();
            this._gl.bindVertexArray(vao);
            this.bindVAOAttributes(this.attributes, this.indexbuffer);
            this._gl.bindVertexArray(null);
        }
    }

    private bindVAOAttributes(vertexBuffers: IvertexAttribute[], indexBuffer?: IndexBuffer): void {
        for (let i = 0; i < vertexBuffers.length; i++) {
            let att = vertexBuffers[i];
            if (att.enabled) {
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
        }
        if (indexBuffer) {
            indexBuffer.bind();
        }
    }
    private unBindeVaoAttributes(vertexBuffers: IvertexAttribute[], indexBuffer?: IndexBuffer) {
        for (let i = 0; i < vertexBuffers.length; i++) {
            let att = vertexBuffers[i];
            if (att.enabled) {
                this._gl.disableVertexAttribArray(att.index);
                if (att.instanceDivisor !== undefined) {
                    this._gl.vertexAttribDivisor(att.index, 0);
                }
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
            this.bindVAOAttributes(this.attributes, this.indexbuffer);
        }
    }

    unbind() {
        if (this._vao) {
            this._gl.bindVertexArray(null);
        } else {
            this.unBindeVaoAttributes(this.attributes, this.indexbuffer);
        }
    }
}
