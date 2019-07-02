import { AccessorComponentType } from "./gltfJsonStruct";
import { ParseBufferNode } from "./parseBufferNode";
import { IgltfJson } from "./loadglTF";
import { ParseBufferViewNode } from "./parseBufferViewNode";
import { IarrayInfo } from "../../render/glRender";

export class ParseAccessorNode {
    static parse(index: number, gltf: IgltfJson): Promise<IarrayInfo> {
        let arrayInfo: IarrayInfo = {};
        // return new Promise<AccessorNode>((resolve,reject)=>{
        let accessor = gltf.accessors[index];

        arrayInfo.componentSize = this.getComponentSize(accessor.type);
        arrayInfo.componentDataType = accessor.componentType;
        arrayInfo.count = accessor.count;
        arrayInfo.normalize = accessor.normalized;

        if (accessor.bufferView != null) {
            let viewindex = accessor.bufferView;
            

            return ParseBufferViewNode.parse(viewindex, gltf).then(value => {
                if(accessor.sparse!=null)
                {
                    let cloneArr=value.viewBuffer.slice(accessor.byteOffset); 
                    arrayInfo.offsetInBytes=0;
                    arrayInfo.value=cloneArr;
                    arrayInfo.strideInBytes = value.byteStride;

                    let indicesInfo=accessor.sparse.indices;
                    let valueInfo=accessor.sparse.values;
                    Promise.all([
                        ParseBufferViewNode.parse(indicesInfo.bufferView,gltf),
                        ParseBufferNode.parse(valueInfo.bufferView,gltf)
                    ]).then(
                        (arr)=>{
                            let indicesArr=this.getTypedArr(arr[0].viewBuffer,indicesInfo.byteOffset,indicesInfo.componentType,accessor.count);
                            for(let i=0;i<indicesArr.length;i++)
                            {
                                let index=indicesArr[i];
                            }
                        }
                    );
                }else
                {
                    arrayInfo.offsetInBytes = accessor.byteOffset;
                    arrayInfo.value = value.viewBuffer;
                    arrayInfo.strideInBytes = value.byteStride;
                    arrayInfo.buffer = value.glBuffer;
                    return arrayInfo;
                }
            });
        } else {
            let viewBuffer = this.GetTyedArryByLen(accessor.componentType, accessor.count);
            arrayInfo.value = viewBuffer;
            return Promise.resolve(arrayInfo);
        }
    }

    static GetTyedArryByLen(componentType: AccessorComponentType, Len: number) {
        switch (componentType) {
            case AccessorComponentType.BYTE:
                return new Int8Array(Len);
            case AccessorComponentType.UNSIGNED_BYTE:
                return new Uint8Array(Len);
            case AccessorComponentType.SHORT:
                return new Int16Array(Len);
            case AccessorComponentType.UNSIGNED_SHORT:
                return new Uint16Array(Len);
            case AccessorComponentType.UNSIGNED_INT:
                return new Uint32Array(Len);
            case AccessorComponentType.FLOAT:
                return new Float32Array(Len);
            default:
                throw new Error(`Invalid component type ${componentType}`);
        }
    }

    private static getComponentSize(type: string): number {
        switch (type) {
            case "SCALAR":
                return 1;
            case "VEC2":
                return 2;
            case "VEC3":
                return 3;
            case "VEC4":
            case "MAT2":
                return 4;
            case "MAT3":
                return 9;
            case "MAT4":
                return 16;
        }
    }

    private static getTypedArr(viewBuffer:Uint8Array,offset:number,componentType: AccessorComponentType,count?:number)
    {
        offset=offset!=null?offset:0;
        switch (componentType) {
            case AccessorComponentType.BYTE:
                return new Int8Array(viewBuffer,offset,count);
            case AccessorComponentType.UNSIGNED_BYTE:
                return new Uint8Array(viewBuffer,offset,count);
            case AccessorComponentType.SHORT:
                return new Int16Array(viewBuffer,offset,count);
            case AccessorComponentType.UNSIGNED_SHORT:
                return new Uint16Array(viewBuffer,offset,count);
            case AccessorComponentType.UNSIGNED_INT:
                return new Uint32Array(viewBuffer,offset,count);
            case AccessorComponentType.FLOAT:
                return new Float32Array(viewBuffer,offset,count);
            default:
                throw new Error(`Invalid component type ${componentType}`);
        }
    }
}
