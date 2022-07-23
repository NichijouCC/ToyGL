import { BlendMode } from "@esotericsoftware/spine-core";
import { vec4 } from "../../mathD";
import { BlendParamEnum, BufferTargetEnum, BufferUsageEnum, ComponentDatatypeEnum, Geometry, GraphicBuffer, GraphicIndexBuffer, IGeometryAttributeOptions, IRenderable, Material, Shader, VertexAttEnum, VertexFormat } from "../../render";
import { SpineTexture } from "./spineTexture";

interface ISpinDrawParams {
    batcherIndex: number,
    start: number,
    count: number,
    slotTexture: SpineTexture,
    slotBlendMode: BlendMode,
    mainColor: vec4
}

export class SpineBatcher {
    drawParams: ISpinDrawParams[] = [];
    batchers: MeshBatcher[] = [];
    private currentBatcherIndex = 0;
    begin() {
        this.drawParams = [];
        this.currentBatcherIndex = 0;
        this.batchers.forEach(item => item.begin())
    }

    mergeData(vertices: ArrayLike<number>, indices: ArrayLike<number>, slotBlendMode: BlendMode, slotTexture: SpineTexture, mainColor: vec4) {
        let batcher = this.batchers[this.currentBatcherIndex];
        if (batcher == null) {
            batcher = this.batchers[this.currentBatcherIndex] = this.createNewBatcher();
        }
        if (!batcher.canBatch(vertices, indices)) {
            this.currentBatcherIndex++;
            batcher.end();
            batcher = this.batchers[this.currentBatcherIndex] = this.createNewBatcher();
        }
        let info = batcher.batch(vertices, indices);

        if (this.drawParams.length > 0) {
            let lastDraw = this.drawParams[this.drawParams.length - 1];
            if (lastDraw.batcherIndex == this.currentBatcherIndex && lastDraw.slotTexture == slotTexture && lastDraw.slotBlendMode == slotBlendMode && vec4.equals(mainColor, lastDraw.mainColor)) {
                lastDraw.count += info.count;
                return;
            }
        }
        this.drawParams.push({ batcherIndex: this.currentBatcherIndex, slotTexture, slotBlendMode, mainColor, ...info })
    }

    private createNewBatcher = () => {
        return new MeshBatcher([
            {
                type: VertexAttEnum.POSITION,
                componentSize: 3,
            },
            {
                type: VertexAttEnum.TEXCOORD_0,
                componentSize: 2,
            },
            {
                type: VertexAttEnum.COLOR_0,
                componentSize: 4,
            },
            {
                type: VertexAttEnum.COLOR_1,
                componentSize: 4,
            }
        ]);
    }

    end() {
        this.batchers[this.currentBatcherIndex]?.end();
    }
}

//Uint16Array 0-65535
export class MeshBatcher {
    private vertices: Float32Array;
    private verticesLength = 0;
    private indices: Uint16Array;
    private indicesLength = 0;
    readonly vertexByteSize: number;
    readonly geometry: Geometry;
    private vertexBuffer: GraphicBuffer;
    private indicesBuffer: GraphicIndexBuffer;
    readonly vertexFormat: Pick<IGeometryAttributeOptions, "type" | "componentSize">[];
    private vertexSize: number;
    constructor(vertexFormat: Pick<IGeometryAttributeOptions, "type" | "componentSize">[]) {
        this.vertexFormat = vertexFormat;
        let attOpts: IGeometryAttributeOptions[] = [];
        this.vertexSize = vertexFormat.reduce((pre, el) => pre + el.componentSize, 0);
        this.vertexByteSize = vertexFormat.reduce((pre, el) => pre + el.componentSize * Float32Array.BYTES_PER_ELEMENT, 0);

        this.indices = new Uint16Array(65535);
        this.vertices = new Float32Array(65535 * this.vertexSize);
        let vbo = new GraphicBuffer({ target: BufferTargetEnum.ARRAY_BUFFER, data: this.vertices, usage: BufferUsageEnum.DYNAMIC_DRAW });
        let ibo = new GraphicIndexBuffer({ data: this.indices, count: this.indicesLength, usage: BufferUsageEnum.DYNAMIC_DRAW });

        let offset = 0;
        vertexFormat.forEach(att => {
            attOpts.push({
                type: att.type,
                componentSize: att.componentSize,
                componentDatatype: ComponentDatatypeEnum.FLOAT,
                data: vbo,
                bytesOffset: offset,
                bytesStride: this.vertexByteSize,
            });
            offset += att.componentSize * Float32Array.BYTES_PER_ELEMENT;
        })
        let geo = new Geometry({ attributes: attOpts, indices: ibo });

        this.vertexBuffer = vbo;
        this.indicesBuffer = ibo;
        this.geometry = geo;
    }

    begin() {
        this.verticesLength = 0;
        this.indicesLength = 0;
    }

    canBatch(vertex: ArrayLike<number>, indices: ArrayLike<number>) {
        if (this.indicesLength + indices.length >= this.indices.length) return false;
        if (this.verticesLength + vertex.length >= this.vertices.length) return false;
        return true;
    }

    batch(vertices: ArrayLike<number>, indices: ArrayLike<number>) {
        let indexAdd = this.verticesLength / this.vertexSize;
        let indexStart = this.indicesLength;
        let i = this.verticesLength;
        let vertexBuffer = this.vertices;
        let j = 0;
        for (; j < vertices.length;) {
            vertexBuffer[i++] = vertices[j++];//x
            vertexBuffer[i++] = vertices[j++];//y
            vertexBuffer[i++] = 0;
            vertexBuffer[i++] = vertices[j++];//u
            vertexBuffer[i++] = vertices[j++];//v
            vertexBuffer[i++] = vertices[j++];//r
            vertexBuffer[i++] = vertices[j++];//g
            vertexBuffer[i++] = vertices[j++];//b
            vertexBuffer[i++] = vertices[j++];//a
            vertexBuffer[i++] = vertices[j++];//r
            vertexBuffer[i++] = vertices[j++];//g
            vertexBuffer[i++] = vertices[j++];//b
            vertexBuffer[i++] = vertices[j++];//a
        }
        this.verticesLength = i;
        let indicesArray = this.indices;
        for (i = this.indicesLength, j = 0; j < indices.length; i++, j++)
            indicesArray[i] = indices[j] + indexAdd;
        this.indicesLength += indices.length;
        return { start: indexStart, count: indices.length }
    }

    end() {
        this.vertexBuffer.setSubData(this.vertices.subarray(0, this.verticesLength), 0);
        this.indicesBuffer.count = this.indicesLength;
    }
}