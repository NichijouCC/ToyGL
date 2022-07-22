import { mat4, vec3 } from "../../mathD";
import { BinReader } from "../../io";
import { IB3dmBatchTableJson, IB3dmFeatureTableJson } from "./type";
import { LoadGlTF } from "..";
import { Entity } from "../../scene";

export class B3dmParser {
    static parse(arrayBuffer: ArrayBuffer) {
        let reader = new BinReader(arrayBuffer);
        let magic = reader.readUint8ArrToString(4);
        let version = reader.readUint32();
        let byteLength = reader.readUint32();
        let featureTableJsonByteLength = reader.readUint32();
        let featureTableBinaryByteLength = reader.readUint32();
        let BatchTableJsonByteLength = reader.readUint32();
        let batchTableBinaryByteLength = reader.readUint32();

        let featureTableJson: IB3dmFeatureTableJson;
        if (featureTableJsonByteLength == 0) {
            featureTableJson = {
                BATCH_LENGTH: 0
            }
        } else {
            featureTableJson = JSON.parse(reader.readUint8ArrToString(featureTableJsonByteLength))
        }
        let featureTableBinary = reader.readUint8Array(featureTableBinaryByteLength);

        let batchTableJson: IB3dmBatchTableJson;
        if (BatchTableJsonByteLength > 0) {
            batchTableJson = JSON.parse(reader.readUint8ArrToString(BatchTableJsonByteLength));
        }
        let batchTableBinary = reader.readUint8Array(batchTableBinaryByteLength);

        let readLen = reader.peek();
        var gltfByteLength = byteLength - readLen;
        if (gltfByteLength == 0) {
            throw new Error("glTF byte length must be greater than 0")
        }

        let gltfView = reader.readUint8Array(gltfByteLength);
        //tile
        let tile = new B3dmTile();
        if (featureTableJson.RTC_CENTER) {
            tile.rtc_center = vec3.fromArray(featureTableJson.RTC_CENTER);
        }

        let loader = new LoadGlTF();
        return loader.loadByArrayBuffer(gltfView.buffer, gltfView.byteOffset)
            .then(asset => {
                tile.root = asset["_root"];
                return tile;
            })
    }
}


export class B3dmTile {
    rtc_center: vec3;
    modelMatrix: mat4;
    root: Entity;
}