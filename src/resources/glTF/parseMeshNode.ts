import { IgltfJson, IgltfPrimitive } from "./loadglTF";
import { IgltfMeshPrimitive } from "./gltfJsonStruct";
import { Material } from "../assets/material";
import { ParseMaterialNode } from "./parseMaterialNode";
import { Geometry } from "../assets/geometry";
import { IgeometryOptions, GlRender } from "../../render/glRender";
import { ParseAccessorNode } from "./parseAccessorNode";

export class ParseMeshNode {
    static parse(index: number, gltf: IgltfJson): Promise<IgltfPrimitive[]> {
        if (gltf.cache.meshNodeCache[index]) {
            return Promise.resolve(gltf.cache.meshNodeCache[index]);
        } else {
            let node = gltf.meshes[index];

            let dataArr: Promise<IgltfPrimitive>[] = [];
            if (node.primitives) {
                for (let key in node.primitives) {
                    let primitive = node.primitives[key];
                    let data = this.parsePrimitive(primitive, gltf);
                    dataArr.push(data);
                }
            }
            return Promise.all(dataArr).then(value => {
                //---------------add to cache
                gltf.cache.meshNodeCache[index] = value;
                return value;
            });
        }
    }

    static parsePrimitive(node: IgltfMeshPrimitive, gltf: IgltfJson): Promise<IgltfPrimitive> {
        return Promise.all([this.parseGeometry(node, gltf), this.parseMaterial(node, gltf)]).then(
            ([geometry, material]) => {
                return { geometry: geometry, material: material };
            },
        );
    }

    static parseMaterial(node: IgltfMeshPrimitive, gltf: IgltfJson): Promise<Material> {
        let matindex = node.material;
        if (matindex != null) {
            return ParseMaterialNode.parse(matindex, gltf);
        } else {
            return Promise.resolve(null);
        }
    }

    static parseGeometry(node: IgltfMeshPrimitive, gltf: IgltfJson): Promise<Geometry> {
        let attributes = node.attributes;
        let index = node.indices;

        let geometryOp: IgeometryOptions = { atts: {} };
        let taskAtts: Promise<void>[] = [];

        for (let key in attributes) {
            let index = attributes[key];
            let attTask = ParseAccessorNode.parse(index, gltf).then(arrayInfo => {
                geometryOp.atts[key] = arrayInfo;
            });
            taskAtts.push(attTask);
        }
        if (index != null) {
            let indexTask = ParseAccessorNode.parse(index, gltf).then(arrayInfo => {
                geometryOp.indices = arrayInfo;
            });
            taskAtts.push(indexTask);
        }
        return Promise.all(taskAtts).then(() => {
            let geometryInfo = GlRender.createGeometry(geometryOp);
            let newGeometry = new Geometry();
            newGeometry.data = geometryInfo;
            return newGeometry;
        });
    }
}
