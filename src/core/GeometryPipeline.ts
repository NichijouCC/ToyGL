import { GeometryInstance } from "./GeometryInstance";
import { Mat4 } from "../mathD/mat4";
import { TypedArray } from "./TypedArray";
import { Vec3 } from "../mathD/vec3";
import { Geometry } from "./Geometry";
import { VertexAttEnum } from "../webgl/VertexAttEnum";

export class GeometryPipeline{
    static transformToWorldCoordinates(instance:GeometryInstance,modelMatrix:Mat4){

        if (Mat4.equals(modelMatrix, Mat4.IDENTITY)) {
            return instance;
        }
        let attributes = instance.geometry.attributes;
        let posAtt=attributes[VertexAttEnum.POSITION];
        if(posAtt){
            transformPoint(modelMatrix, posAtt.values as any);
        }
        let normalAtt=attributes[VertexAttEnum.NORMAL];
        if(normalAtt){
            transformVector(modelMatrix,normalAtt.values as any);
        }
        let tangentAtt=attributes[VertexAttEnum.TANGENT];
        if(normalAtt){
            transformVector(modelMatrix,tangentAtt.values as any);
        }
        return instance
    }
    //todo
    static combineGeometryInstances(insArr:GeometryInstance[]):Geometry{
        return insArr[0].geometry;
    }
}

function transformPoint(mat:Mat4,valueArray:TypedArray){
    for(let i=0;i<valueArray.length;i+=3){

        //------------------------- mat4.transfomPoint

        let x = valueArray[i],
            y = valueArray[i+1],
            z = valueArray[i+2];
        let w = mat[3] * x + mat[7] * y + mat[11] * z + mat[15];
        w = w || 1.0;
        valueArray[i] = (mat[0] * x + mat[4] * y + mat[8] * z + mat[12]) / w;
        valueArray[i+1] = (mat[1] * x + mat[5] * y + mat[9] * z + mat[13]) / w;
        valueArray[i+2] = (mat[2] * x + mat[6] * y + mat[10] * z + mat[14]) / w;
    }
}

function transformVector(mat:Mat4,valueArray:TypedArray){
    for(let i=0;i<valueArray.length;i+=3){

        //------------------------- mat4.transformVector

        let x = valueArray[i],
            y = valueArray[i+1],
            z = valueArray[i+2];
        valueArray[i] = mat[0] * x + mat[4] * y + mat[8] * z;
        valueArray[i+1]= mat[1] * x + mat[5] * y + mat[9] * z;
        valueArray[i+2]= mat[2] * x + mat[6] * y + mat[10] * z;
    }
}