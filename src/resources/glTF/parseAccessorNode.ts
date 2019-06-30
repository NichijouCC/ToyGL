import { AccessorComponentType } from "./gltfJsonStruct";
import { ParseBufferNode } from "./parseBufferNode";
import { IarrayInfo } from "twebgl/dist/types/type";
import { IgltfJson } from "./loadglTF";
import { ParseBufferViewNode } from "./parseBufferViewNode";

export class ParseAccessorNode {
    static parse(index: number, gltf: IgltfJson): Promise<IarrayInfo> {
        let arrayInfo: IarrayInfo = {};
        // return new Promise<AccessorNode>((resolve,reject)=>{
        let accessor = gltf.accessors[index];

        arrayInfo.componentSize = this.getComponentSize(accessor.type);
        arrayInfo.componentDataType = accessor.componentType;
        arrayInfo.count = accessor.count;
        arrayInfo.offsetInBytes = accessor.byteOffset;
        arrayInfo.normalize = accessor.normalized;

        if (accessor.bufferView != null) {
            let viewindex = accessor.bufferView;
            // let bufferview = gltf.bufferViews[viewindex];
            // let bufferindex = bufferview.buffer;
            // arrayInfo.strideInBytes = bufferview.byteStride;

            // return ParseBufferNode.parse(bufferindex, gltf).then(buffer => {
            //     let viewBuffer = new Uint8Array(buffer, bufferview.byteOffset, bufferview.byteLength);

            //     arrayInfo.value = viewBuffer;
            //     return arrayInfo;
            // });

            return ParseBufferViewNode.parse(viewindex, gltf).then(value => {
                console.warn("parse accessor:", index, value);

                arrayInfo.value = value.buffer;
                arrayInfo.strideInBytes = value.byteStride;
                return arrayInfo;
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
}
