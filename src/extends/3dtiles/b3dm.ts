import { IB3dmBatchTableJson, IB3dmFeatureTableJson, ITileContent } from "./type";
import { GltfAsset, GltfNode, LoadGlTF } from "../glTF/index";
import { IBoundingVolume, I3DTileContent, parseBoundingVolume, LoadState } from "./tileset";
import { TileNode } from "./tileNode";
import { ITileFrameState } from "./tilesetSystem";
import { BinReader, BoundingSphere, IRenderable, loadArrayBuffer, mat4, vec3 } from "../../index";

export class B3dmTile implements I3DTileContent {
    boundingVolume?: IBoundingVolume
    rtcMatrix: mat4;
    content: GltfNode;
    beActive: boolean;
    loadState: LoadState = "NONE";

    readonly url: string
    readonly node: TileNode;
    private baseUrl: string;
    constructor(data: ITileContent, baseUrl: string, node: TileNode) {
        this.url = data.url ?? data.uri;
        this.baseUrl = baseUrl;
        this.node = node;
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
                this.collectRender(this.content, options.renders)
                break;
        }
    }

    private load() {
        this.loadState = "ASSET_LOADING"
        console.log("b3dm", `${this.baseUrl}/${this.url}`);

        return this.node.loader.queue.push(() => {
            return loadArrayBuffer(`${this.baseUrl}/${this.url}`)
                .then((data) => this.parse(data))
                .then(res => {
                    this.content = res;
                    this.loadState = "ASSET_READY";
                })
        }, this.node.geometricError);
    }

    private collectRender(data: GltfNode, renders: IRenderable[]) {
        if (data.mesh) {
            let { mesh, materials } = data.mesh;
            let baseRender: IRenderable = {
                geometry: mesh.subMeshes[0],
                material: materials[0],
                worldMat: data.matrix,
                worldBounding: (this.boundingVolume ?? this.node.boundingVolume) as BoundingSphere,
                enableCull: true
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
            this.rtcMatrix = mat4.fromTranslation(mat4.create(), featureTableJson.RTC_CENTER as any);
        }
        return this.node.loader.loadGltfBin(gltfView.buffer).then(node => {
            updateNodeMatrix(node, { rtcMat: this.rtcMatrix });
            return node;
        })
    }
}

function updateNodeMatrix(node: GltfNode, options?: { computeWorldMatrix?: boolean, transformToZUp?: boolean, rtcMat?: mat4 }) {
    let { computeWorldMatrix = true, transformToZUp = true, rtcMat } = options || {};
    if (transformToZUp) {
        //y-up to z-up
        let transformMat = mat4.fromRotation(mat4.create(), Math.PI / 2, vec3.RIGHT);
        mat4.multiply(node.matrix, node.matrix, transformMat);
    }
    if (rtcMat) {
        mat4.multiply(node.matrix, rtcMat, node.matrix);
    }
    if (computeWorldMatrix) {
        let update = (node: GltfNode, parent: GltfNode) => {
            if (parent != null) {
                mat4.multiply(node.matrix, parent.matrix, node.matrix);
            }
            node.children?.forEach(el => update(el, node))
        }
        update(node, null);
    }
}

