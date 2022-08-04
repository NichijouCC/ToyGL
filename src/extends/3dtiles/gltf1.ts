import { BinReader, BufferTargetEnum, DefaultMaterial, Geometry, GraphicBuffer, GraphicIndexBuffer, IGeometryOptions, StaticGeometry, TextureAsset, TypedArray, VertexAttEnum } from "../../index";
import { GltfNode, Mesh } from "../glTF";

export class Gltf1Loader {
    loadGltfBin(bin: ArrayBuffer, offset = 0) {
        //https://github.com/CesiumGS/cesium/blob/bd40c3179ac515cf6d2215a31d50fc88affcd200/Source/Scene/GltfPipeline/parseGlb.js#L53

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
        let binaryBuffer = bReader.readUint8Array(bReader.canRead());

        let gltf = JSON.parse(contentString) as IGltf1Json;
        let scene = gltf.scenes[gltf.scene];


        let bufferCache: { [viewName: string]: GraphicBuffer } = {};

        let parseNode = (nodeName: string) => {
            const node = new GltfNode();
            let nodeData = gltf.nodes[nodeName];
            nodeData.meshes.forEach(meshName => {
                let meshData = gltf.meshes[meshName];
                let primitives = meshData.primitives.map(el => {
                    const geoOpts: IGeometryOptions = { attributes: [] };
                    for (let key in el.attributes) {
                        let attType = MapGltfAttributeToToyAtt[key]
                        let posAttName = el.attributes[key];
                        let accessor = gltf.accessors[posAttName];

                        let newBuffer: GraphicBuffer = bufferCache[accessor.bufferView];
                        if (newBuffer == null) {

                            let bufferView = gltf.bufferViews[accessor.bufferView];
                            let buffer = gltf.buffers[bufferView.buffer];
                            if (binaryBuffer.length != buffer.byteLength) {
                                throw new Error("Length in rest glb does not match buffer.byteLength: " + binaryBuffer.length + " != " + buffer.byteLength);
                            }
                            const viewBuffer = new Uint8Array(binaryBuffer.buffer, (bufferView.byteOffset ?? 0) + binaryBuffer.byteOffset, bufferView.byteLength).slice();
                            let typedArray = TypedArray.fromGlType(accessor.componentType, viewBuffer);

                            newBuffer = new GraphicBuffer({ target: BufferTargetEnum.ARRAY_BUFFER, data: viewBuffer });
                            bufferCache[accessor.bufferView] = newBuffer;
                        }
                        geoOpts.attributes.push({
                            type: attType,
                            data: newBuffer,
                            componentSize: getComponentSize(accessor.type),
                            componentDatatype: accessor.componentType,
                            normalize: false,
                            bytesOffset: accessor.byteOffset,
                            bytesStride: accessor.byteStride ?? 0,
                            count: accessor.count,
                        })
                    }
                    if (el.indices) {
                        let accessor = gltf.accessors[el.indices];
                        let bufferView = gltf.bufferViews[accessor.bufferView];
                        let buffer = gltf.buffers[bufferView.buffer];
                        if (binaryBuffer.length != buffer.byteLength) {
                            throw new Error("Length in rest glb does not match buffer.byteLength: " + binaryBuffer.length + " != " + buffer.byteLength);
                        }
                        const viewBuffer = new Uint8Array(binaryBuffer.buffer, (bufferView.byteOffset ?? 0) + binaryBuffer.byteOffset, bufferView.byteLength);
                        geoOpts.indices = new GraphicIndexBuffer({
                            data: viewBuffer,
                            datatype: accessor.componentType,
                            byteOffset: accessor.byteOffset,
                            count: accessor.count,
                        });
                        geoOpts.bytesOffset = accessor.byteOffset;
                        geoOpts.count = accessor.count;
                    }
                    geoOpts.primitiveType = el.mode ?? 4 as any;
                    const geo = new Geometry(geoOpts);

                    let mat = DefaultMaterial.unlit_3d.clone();
                    let material = gltf.materials[el.material];
                    let tex = gltf.textures[material.values.tex];
                    let image = gltf.images[tex.source];
                    {
                        let extend = image.extensions["KHR_binary_glTF"] as IKHRBinaryGlTF;
                        let bufferView = gltf.bufferViews[extend.bufferView];
                        const viewBuffer = new Uint8Array(binaryBuffer.buffer, (bufferView.byteOffset ?? 0) + binaryBuffer.byteOffset, bufferView.byteLength);
                        let tex2d = TextureAsset.fromTypeArray({ arrayBufferView: viewBuffer, width: extend.width, height: extend.height });
                        mat.setUniform("MainTex", tex2d);
                    }
                    let technique = gltf.techniques[material.technique];
                    let program = gltf.programs[technique.program];
                    {
                        let shader = gltf.shaders[program.vertexShader];
                        let extend = shader.extensions["KHR_binary_glTF"] as IKHRBinaryGlTF;
                        let bufferView = gltf.bufferViews[extend.bufferView];
                        const viewBuffer = new Uint8Array(binaryBuffer.buffer, (bufferView.byteOffset ?? 0) + binaryBuffer.byteOffset, bufferView.byteLength);
                    }
                    {
                        let shader = gltf.shaders[program.fragmentShader];
                        let extend = shader.extensions["KHR_binary_glTF"] as IKHRBinaryGlTF;
                        let bufferView = gltf.bufferViews[extend.bufferView];
                        const viewBuffer = new Uint8Array(binaryBuffer.buffer, (bufferView.byteOffset ?? 0) + binaryBuffer.byteOffset, bufferView.byteLength);
                    }
                    return { geo, mat }
                })
                const mesh = new Mesh();
                mesh.mesh = new StaticGeometry(primitives.map(el => el.geo));
                mesh.materials = primitives.map(el => el.mat);
                node.mesh = mesh;
            })
            nodeData.children?.forEach(el => {
                let child = parseNode(el)
                node.children.push(child);
            })
            return node;
        }

        let sceneNode = new GltfNode();
        scene.nodes.forEach(el => {
            let root = parseNode(el);
            sceneNode.children.push(root);
        })
        return sceneNode
    }
}

const MapGltfAttributeToToyAtt: { [name: string]: VertexAttEnum } = {
    POSITION: VertexAttEnum.POSITION,
    NORMAL: VertexAttEnum.NORMAL,
    TANGENT: VertexAttEnum.TANGENT,
    TEXCOORD_0: VertexAttEnum.TEXCOORD_0,
    TEXCOORD_1: VertexAttEnum.TEXCOORD_1,
    COLOR_0: VertexAttEnum.COLOR_0,
    WEIGHTS_0: VertexAttEnum.WEIGHTS_0,
    JOINTS_0: VertexAttEnum.JOINTS_0
};

function getComponentSize(type: string): number {
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
export interface IGltf1Json {
    scene: string,
    scenes: {
        [name: string]: {
            nodes: string[]
        }
    },
    nodes: {
        [name: string]: {
            children?: string[]
            meshes: string[]
        }
    },
    meshes: {
        [name: string]: {
            primitives: {
                attributes: { [name: string]: string },
                indices?: string,
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
            byteStride?: number,
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

