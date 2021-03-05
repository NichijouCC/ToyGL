import { IGltfJson } from "../loadGltf";

export namespace GlTF {
    export function getNodeName(index: number, gltf: IGltfJson) {
        return gltf.nodes[index].name || "node" + index;
    }
}
