declare var DracoDecoderModule: any;
declare var WebAssembly: any;
    
/**
 * Configuration for Draco compression
 */
export interface IDracoCompressionConfiguration {
    /**
     * Configuration for the decoder.
     */
    decoder?: {
        /**
         * The url to the WebAssembly module.
         */
        wasmUrl?: string;

        /**
         * The url to the WebAssembly binary.
         */
        wasmBinaryUrl?: string;

        /**
         * The url to the fallback JavaScript module.
         */
        fallbackUrl?: string;
    };
}
/**
 * Draco compression (https://google.github.io/draco/)
 * 
 * This class wraps the Draco module.
 * 
 * **Encoder**
 * 
 * The encoder is not currently implemented.
 * 
 * **Decoder**
 * 
 * By default, the configuration points to a copy of the Draco decoder files for glTF from https://preview.babylonjs.com.
 * 
 * To update the configuration, use the following code:
 * ```javascript
 *     BABYLON.DracoCompression.Configuration = {
 *         decoder: {
 *             wasmUrl: "<url to the WebAssembly library>",
 *             wasmBinaryUrl: "<url to the WebAssembly binary>",
 *             fallbackUrl: "<url to the fallback JavaScript library>",
 *         }
 *     };
 * ```
 * 
 * Draco has two versions, one for WebAssembly and one for JavaScript. The decoder configuration can be set to only support Webssembly or only support the JavaScript version.
 * Decoding will automatically fallback to the JavaScript version if WebAssembly version is not configured or if WebAssembly is not supported by the browser.
 * Use `BABYLON.DracoCompression.DecoderAvailable` to determine if the decoder is available for the current session.
 * 
 * To decode Draco compressed data, create a DracoCompression object and call decodeMeshAsync:
 * ```javascript
 *     var dracoCompression = new BABYLON.DracoCompression();
 *     var vertexData = await dracoCompression.decodeMeshAsync(data, {
 *         [BABYLON.VertexBuffer.PositionKind]: 0
 *     });
 * ```
 * 
 * @see https://www.babylonjs-playground.com/#N3EK4B#0
 */
export class DracoCompression {
    private static _DecoderModulePromise: Promise<any>;

    /**
     * The configuration. Defaults to the following urls:
     * - wasmUrl: "https://preview.babylonjs.com/draco_wasm_wrapper_gltf.js"
     * - wasmBinaryUrl: "https://preview.babylonjs.com/draco_decoder_gltf.wasm"
     * - fallbackUrl: "https://preview.babylonjs.com/draco_decoder_gltf.js"
     */
    public static Configuration: IDracoCompressionConfiguration = {
        decoder: {
            wasmUrl: "https://preview.babylonjs.com/draco_wasm_wrapper_gltf.js",
            wasmBinaryUrl: "https://preview.babylonjs.com/draco_decoder_gltf.wasm",
            fallbackUrl: "https://preview.babylonjs.com/draco_decoder_gltf.js"
        }
    };

    /**
     * Returns true if the decoder is available.
     */
    public static get DecoderAvailable(): boolean {
        if (typeof DracoDecoderModule !== "undefined") {
            return true;
        }

        const decoder = DracoCompression.Configuration.decoder;
        if (decoder) {
            if (decoder.wasmUrl && decoder.wasmBinaryUrl && typeof WebAssembly === "object") {
                return true;
            }

            if (decoder.fallbackUrl) {
                return true;
            }
        }

        return false;
    }

    /**
     * Constructor
     */
    constructor() {
    }

    /**
     * Stop all async operations and release resources.
     */
    public dispose(): void {
    }

    /**
     * Decode Draco compressed mesh data to vertex data.
     * @param data The ArrayBuffer or ArrayBufferView for the Draco compression data
     * @param attributes A map of attributes from vertex buffer kinds to Draco unique ids
     * @returns A promise that resolves with the decoded vertex data
     */
    public decodeMeshAsync(data: ArrayBuffer | ArrayBufferView, attributes: { [kind: string]: number }): Promise<Mesh> {
        const dataView = data instanceof ArrayBuffer ? new Uint8Array(data) : data;

        return DracoCompression._GetDecoderModule().then(wrappedModule => {
            const module = wrappedModule.module;
            const newMesh = new Mesh();

            const buffer = new module.DecoderBuffer();
            buffer.Init(dataView, dataView.byteLength);

            const decoder = new module.Decoder();
            let geometry: any;
            let status: any;

            try {
                const type = decoder.GetEncodedGeometryType(buffer);
                switch (type) {
                    case module.TRIANGULAR_MESH:
                        geometry = new module.Mesh();
                        status = decoder.DecodeBufferToMesh(buffer, geometry);
                        break;
                    case module.POINT_CLOUD:
                        geometry = new module.PointCloud();
                        status = decoder.DecodeBufferToPointCloud(buffer, geometry);
                        break;
                    default:
                        throw new Error(`Invalid geometry type ${type}`);
                }

                if (!status.ok() || !geometry.ptr) {
                    throw new Error(status.error_msg());
                }

                const numPoints = geometry.num_points();

                if (type === module.TRIANGULAR_MESH) {
                    const numFaces = geometry.num_faces();
                    const faceIndices = new module.DracoInt32Array();
                    try {
                        const indices = new Uint32Array(numFaces * 3);
                        for (let i = 0; i < numFaces; i++) {
                            decoder.GetFaceFromMesh(geometry, i, faceIndices);
                            const offset = i * 3;
                            indices[offset + 0] = faceIndices.GetValue(0);
                            indices[offset + 1] = faceIndices.GetValue(1);
                            indices[offset + 2] = faceIndices.GetValue(2);
                        }
                        newMesh.setIndexData(indices);
                    } finally {
                        module.destroy(faceIndices);
                    }
                }

                for (const kind in attributes) {
                    const uniqueId = attributes[kind];
                    const attribute = decoder.GetAttributeByUniqueId(geometry, uniqueId);
                    const dracoData = new module.DracoFloat32Array();
                    try {
                        decoder.GetAttributeFloatForAllPoints(geometry, attribute, dracoData);
                        const babylonData = new Float32Array(numPoints * attribute.num_components());
                        for (let i = 0; i < babylonData.length; i++) {
                            babylonData[i] = dracoData.GetValue(i);
                        }
                        newMesh.setVertexAttData(kind as any, babylonData);
                    } finally {
                        module.destroy(dracoData);
                    }
                }
                newMesh.createVbowithAtts();
            } finally {
                if (geometry) {
                    module.destroy(geometry);
                }

                module.destroy(decoder);
                module.destroy(buffer);
            }

            // -----------------submesh info
            const submeshinfo = new subMeshInfo();
            submeshinfo.size = newMesh.trisindex.length;
            newMesh.submeshs = [];
            newMesh.submeshs.push(submeshinfo);
            return newMesh;
        });
    }

    private static _GetDecoderModule(): Promise<any> {
        if (!DracoCompression._DecoderModulePromise) {
            let promise: Promise<any>|null = null;
            const config: any = {};

            if (typeof DracoDecoderModule !== "undefined") {
                promise = Promise.resolve();
            } else {
                const decoder = DracoCompression.Configuration.decoder;
                if (decoder) {
                    if (decoder.wasmUrl && decoder.wasmBinaryUrl && typeof WebAssembly === "object") {
                        promise = Promise.all([
                            DracoCompression._LoadScriptAsync(decoder.wasmUrl),
                            DracoCompression._LoadFileAsync(decoder.wasmBinaryUrl).then(data => {
                                config.wasmBinary = data;
                            })
                        ]);
                    } else if (decoder.fallbackUrl) {
                        promise = DracoCompression._LoadScriptAsync(decoder.fallbackUrl);
                    }
                }
            }

            if (!promise) {
                throw new Error("Draco decoder module is not available");
            }

            DracoCompression._DecoderModulePromise = promise.then(() => {
                return new Promise(resolve => {
                    config.onModuleLoaded = (decoderModule: any) => {
                        // decoderModule is Promise-like. Wrap before resolving to avoid loop.
                        resolve({ module: decoderModule });
                    };

                    DracoDecoderModule(config);
                });
            });
        }

        return DracoCompression._DecoderModulePromise;
    }

    private static _LoadScriptAsync(url: string): Promise<void> {
        return new Promise((resolve, reject) => {
            LoadScript(url, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    private static _LoadFileAsync(url: string): Promise<ArrayBuffer> {
        return new Promise((resolve, reject) => {
            loadArrayBuffer(url, (data, err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }
}
    
export interface IKHR_draco_mesh_compressionNode
{
bufferView:number;
attributes: {
    [name: string]: number;
};
}
    
export class KHR_draco_mesh_compression implements IGlTFExtension {
    static extendName="KHR_draco_mesh_compression";
    private _dracoCompression:DracoCompression;

    private get dracoCompression() {
        if (this._dracoCompression == null) {
            this._dracoCompression = new DracoCompression();
        }
        return this._dracoCompression;
    }

    load(extensionNode: IKHR_draco_mesh_compressionNode, loader: LoadGlTF): Promise<Mesh> {
        const node = extensionNode as IKHR_draco_mesh_compressionNode;

        const attDic:{[type:string]:number} = {};
        for (const key in node.attributes) {
            const type = ParsePrimitiveNode.vertexAttMap[key].type;
            attDic[type] = node.attributes[key];
        }

        return ParseBufferViewNode.parse(node.bufferView, loader).then((viewdata) => {
            return this.dracoCompression.decodeMeshAsync(viewdata.view, attDic);
        });
    }
}
LoadGlTF.regExtension(KHR_draco_mesh_compression.extendName, new KHR_draco_mesh_compression());
