import { IgltfJson } from "../LoadglTF";

export namespace GlTF {
    export function getNodeName(index: number, gltf: IgltfJson) {
        return gltf.nodes[index].name || "node" + index;
    }
}