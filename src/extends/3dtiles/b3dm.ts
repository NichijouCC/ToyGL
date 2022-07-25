import { IB3dmBatchTableJson, IB3dmFeatureTableJson, ITileContent } from "./type";
import { GltfAsset, GltfNode, LoadGlTF } from "../glTF/index";
import { IBoundingVolume, I3DTileContent, parseBoundingVolume, LoadState } from "./tileset";
import { Loader } from "./loader";
import { ITileFrameState } from "./tilesetSystem";
import { BinReader, IRenderable, loadArrayBuffer, mat4, vec3 } from "../../index";

export class B3dmTile implements I3DTileContent {
    boundingVolume?: IBoundingVolume
    rtc_center: vec3;
    modelMatrix: mat4;
    content: GltfAsset;

    beActive: boolean;
    loadState: LoadState = "NONE";

    readonly url: string
    readonly loader: Loader;
    private baseUrl: string;
    constructor(data: ITileContent, baseUrl: string, loader: Loader) {
        this.url = data.url;
        this.baseUrl = baseUrl;
        this.loader = loader;
        if (data.boundingVolume) {
            this.boundingVolume = parseBoundingVolume(data.boundingVolume);
        }
    }
    update(options: ITileFrameState) {
        switch (this.loadState) {
            case "NONE":
                this.load();
                break;
            case "ASSET_READY":
                this.collectRender(this.content.data, options.renders)
                break;
        }
    }

    private load() {
        this.loadState = "ASSET_LOADING"
        return loadArrayBuffer(`${this.baseUrl}/${this.url}`)
            .then((data) => this.parse(data))
            .then(res => {
                this.content = res;
                this.loadState = "ASSET_READY";
            })
    }

    private collectRender(data: GltfNode, renders: IRenderable[]) {
        if (data.mesh) {
            let { mesh, materials } = data.mesh;
            let baseRender: IRenderable = {
                geometry: mesh.subMeshes[0],
                material: materials[0],
                worldMat: mat4.IDENTITY,
                boundingBox: mesh.boundingBox,
            }
            if (mesh.subMeshes.length > 1) {
                baseRender.children = [];
                for (let i = 1; i < mesh.subMeshes.length; i++) {
                    baseRender.children.push({
                        geometry: mesh.subMeshes[i],
                        material: materials[i],
                        worldMat: mat4.IDENTITY,
                        skin: baseRender.skin
                    })
                }
            }
            renders.push(baseRender);
        }
        data.children.forEach(el => this.collectRender(el, renders))
    }

    private parse(arrayBuffer: ArrayBuffer) {
        let reader = new BinReader(arrayBuffer);
        let magic = reader.readUint8ArrToString(4);
        let version = reader.readUint32();
        console.log("b3dm", magic, version);
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

        let gltfView = reader.readUint8Array(gltfByteLength).slice();
        //tile
        if (featureTableJson.RTC_CENTER) {
            this.rtc_center = vec3.fromArray(featureTableJson.RTC_CENTER);
        }
        return this.loader.gltfLoader.loadGltfBin(gltfView.buffer)
    }
}