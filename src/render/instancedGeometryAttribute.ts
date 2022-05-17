import { ComponentDatatypeEnum, VertexAttEnum } from "../webgl";
import { GeometryAttribute, IGeometryAttributeOptions } from "./geometryAttribute";
import { ShaderBucket } from "./shaderBucket";

export class InstancedGeometryAttribute extends GeometryAttribute {
    protected _instanceDivisor: number = 1;
    readonly shaderBucketId: number;
    constructor(options: IGeometryAttributeOptions & { shaderBucketId: number }) {
        super(options);
        this.shaderBucketId = options.shaderBucketId;
    }
}


export class InstanceWorldMat extends InstancedGeometryAttribute {
    constructor(options: Omit<IGeometryAttributeOptions, "type" | "componentDatatype" | "componentSize">) {
        super({
            ...options,
            shaderBucketId: ShaderBucket.INS_MAT4,
            type: VertexAttEnum.INS_MAT4,
            componentDatatype: ComponentDatatypeEnum.FLOAT,
            componentSize: 16,
        });
    }
}

export class InstanceColor extends InstancedGeometryAttribute {
    constructor(options: Omit<IGeometryAttributeOptions, "type" | "componentDatatype" | "componentSize">) {
        super({
            ...options,
            shaderBucketId: ShaderBucket.INS_COLOR,
            type: VertexAttEnum.INS_COLOR,
            componentDatatype: ComponentDatatypeEnum.UNSIGNED_BYTE,
            componentSize: 4,
            normalize: true,
        });
    }
}