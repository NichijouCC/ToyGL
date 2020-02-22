/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable @typescript-eslint/class-name-casing */
/* eslint-disable @typescript-eslint/camelcase */
interface EXT_disjoint_timer_query {
    QUERY_COUNTER_BITS_EXT: number;
    TIME_ELAPSED_EXT: number;
    TIMESTAMP_EXT: number;
    GPU_DISJOINT_EXT: number;
    QUERY_RESULT_EXT: number;
    QUERY_RESULT_AVAILABLE_EXT: number;
    queryCounterEXT(query: WebGLQuery, target: number): void;
    createQueryEXT(): WebGLQuery;
    beginQueryEXT(target: number, query: WebGLQuery): void;
    endQueryEXT(target: number): void;
    getQueryObjectEXT(query: WebGLQuery, target: number): any;
    deleteQueryEXT(query: WebGLQuery): void;
}
interface WebGLVertexArrayObject extends WebGLObject {}

interface WebGLRenderingContext {
    // beWebgl2: boolean;
    // bindpoint: number;
    // beActiveVao: boolean;
    // beActiveInstance: boolean;

    addExtension(extName: string): void;
    createVertexArray(): any;
    bindVertexArray(vao?: WebGLVertexArrayObject | null): void;
    deleteVertexArray(vao: WebGLVertexArrayObject): void;

    vertexAttribDivisor(index: number, divisor: number): void;
    drawElementsInstanced(mode: number, count: number, type: number, offset: number, instanceCount: number): void;
    drawArraysInstanced(mode: number, first: number, count: number, instanceCount: number): void;
    renderbufferStorageMultisample(
        target: number,
        samples: number,
        internalformat: number,
        width: number,
        height: number,
    ): void;

    getQuery(target: number, pname: number): any;
}
