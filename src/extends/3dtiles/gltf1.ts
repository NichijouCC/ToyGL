import { BinReader } from "../../index";

export class Gltf1Loader {
    loadGltfBin(bin: ArrayBuffer, offset = 0) {
        const Binary = {
            Magic: 0x46546c67
        };
        const bReader = new BinReader(bin, offset);
        const magic = bReader.readUint32();
        console.assert(magic == Binary.Magic);
        const version = bReader.readUint32();
        console.assert(version == 1);
        const length = bReader.readUint32();
        if (length !== bReader.getLength()) {
            throw new Error(
                "Length in header does not match actual data length: " + length + " != " + bReader.getLength()
            );
        }
        let contentLength = bReader.readInt();
        let contentFormat = bReader.readInt();
        if (contentFormat != 0) {
            throw new Error("glb content format is not json")
        }

        let contentString = bReader.readUint8ArrToString(contentLength);
        let gltf = JSON.parse(contentString);
        console.log(gltf);
        return {} as any
    }
}

export interface IGltf1Json {
    scene: string,
    scenes: {
        [name: string]: {
            nodes: string[]
        }
    },
    nodes: {
        [name: string]: {
            meshes: string[]
        }
    },
    meshes: {
        [name: string]: {
            primitives: {
                attributes: { [name: string]: string },
                indices: string,
                material: string,
                mode: number,
            }[]
        }
    },
    samplers: {
        [name: string]: {
            minFilter: number
        }
    },
    accessors: {
        [name: string]: {
            bufferView: string,//'bv_ind_0'
            byteOffset: number,//0
            componentType: number,//5123
            count: number,//9549
            type: string;//'SCALAR'
        }
    },
    buffers: {
        [name: string]: {
            byteLength: number,// 72393
        }
    },
    bufferViews: {
        [name: string]: {
            buffer: string,// 'binary_glTF'
            byteLength: number,// 130
            byteOffset: number,//239
        }
    },
    materials: {
        [name: string]: {
            technique: string,
            values: {
                tex: string
            }
        }
    },
    techniques: {
        [name: string]: {
            program: string,
            parameters: {
                [pname: string]: {
                    semantic: string,
                    type: number
                }
            },
            states: {
                enable: number[]
            },
            attributes: {
                [name: string]: string
            },
            uniforms: {
                [name: string]: string
            }
        }
    },
    programs: {
        [name: string]: {
            attributes: string[],
            vertexShader: string,
            fragmentShader: string,
        }
    },
    shaders: {
        [name: string]: {
            type: number,
            extensions: {
                [name: string]: any
            }
        }
    },
    textures: {
        [name: string]: {
            format: number,// 6407,
            internalFormat: number,// 6407,
            sampler: string,// "sampler_0",
            source: string,
        }
    },
    images: {
        [name: string]: {
            extensions: {
                [name: string]: any
            }
        }
    }
    extensionsUsed: string[],
    extensions: {
        [name: string]: any
    },
}

const EXT_KHR_binary_glTF = "KHR_binary_glTF"
interface IKHRBinaryGlTF {
    bufferView: string;// "bv_img_0",
    mimeType: string;// "image/jpeg",
    height: number;// 256,
    width: number;// 256
}

