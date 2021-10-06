import { GeometryInstance } from "./geometryInstance";
import { mat4 } from "../../mathD";
import { Geometry } from "../../render/geometry";
import { TypedArray } from "../../core/typedArray";
import { VertexAttEnum } from "../../render";

export class GeometryPipeline {
    static transformToWorldCoordinates(instance: GeometryInstance, modelMatrix: mat4) {
        if (mat4.equals(modelMatrix, mat4.IDENTITY)) {
            return instance;
        }
        const attributes = instance.geometry.attributes;
        const posAtt = attributes[VertexAttEnum.POSITION];
        if (posAtt) {
            transformPoint(modelMatrix, posAtt.data as any);
        }
        const normalAtt = attributes[VertexAttEnum.NORMAL];
        if (normalAtt) {
            transformVector(modelMatrix, normalAtt.data as any);
        }
        const tangentAtt = attributes[VertexAttEnum.TANGENT];
        if (normalAtt) {
            transformVector(modelMatrix, tangentAtt.data as any);
        }
        return instance;
    }

    // todo
    static combineGeometryInstances(insArr: GeometryInstance[]): Geometry {
        return insArr[0].geometry;
    }
}

function transformPoint(mat: mat4, valueArray: TypedArray) {
    for (let i = 0; i < valueArray.length; i += 3) {
        const x = valueArray[i];
        const y = valueArray[i + 1];
        const z = valueArray[i + 2];
        let w = mat[3] * x + mat[7] * y + mat[11] * z + mat[15];
        w = w || 1.0;
        valueArray[i] = (mat[0] * x + mat[4] * y + mat[8] * z + mat[12]) / w;
        valueArray[i + 1] = (mat[1] * x + mat[5] * y + mat[9] * z + mat[13]) / w;
        valueArray[i + 2] = (mat[2] * x + mat[6] * y + mat[10] * z + mat[14]) / w;
    }
}

function transformVector(mat: mat4, valueArray: TypedArray) {
    for (let i = 0; i < valueArray.length; i += 3) {
        const x = valueArray[i];
        const y = valueArray[i + 1];
        const z = valueArray[i + 2];
        valueArray[i] = mat[0] * x + mat[4] * y + mat[8] * z;
        valueArray[i + 1] = mat[1] * x + mat[5] * y + mat[9] * z;
        valueArray[i + 2] = mat[2] * x + mat[6] * y + mat[10] * z;
    }
}
