import { mat4, vec3 } from "../../mathD";
import { BinReader } from "../../io";
import { IB3dmBatchTableJson, IB3dmFeatureTableJson, ITileContent } from "./type";
import { GltfAsset, LoadGlTF } from "../glTF/index";
import { IBoundingVolume, IFeatureTile, parseBoundingVolume } from "./tile";
import { Loader } from "./loader";

export class B3dmTile implements IFeatureTile {
    boundingVolume?: IBoundingVolume
    rtc_center: vec3;
    modelMatrix: mat4;
    root: GltfAsset;
    readonly url: string
    readonly loader: Loader;
    constructor(data: ITileContent, loader: Loader) {
        this.url = data.url;
        this.loader = loader;
        if (data.boundingVolume) {
            this.boundingVolume = parseBoundingVolume(data.boundingVolume);
        }
    }
    beActive: boolean;
    loadState: "NONE" | "JSON_LOADING" | "JSON_READY" | "ASSET_LOADING" | "ASSET_READY";
    show() {
        throw new Error("Method not implemented.");
    }
    hide() {
        throw new Error("Method not implemented.");
    }

    load(arrayBuffer: ArrayBuffer) {
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
        if (featureTableJson.RTC_CENTER) {
            this.rtc_center = vec3.fromArray(featureTableJson.RTC_CENTER);
        }
        return this.loader.gltfLoader.loadGltfBin(gltfView.buffer)
            .then(asset => {
                this.root = asset;
            })
    }
}