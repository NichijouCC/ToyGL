import { Skin } from "../../resources/skin";
import { GltfNode } from "./gltfAsset";
import { IGltfJson } from "./loadGltf";
import { ParseAccessorNode, Accessor } from "./parseAccessorNode";
import { GlTF } from "./util";

export class ParseSkinNode {
    static parse(index: number, root: GltfNode, gltf: IGltfJson): Promise<Skin> {
        const skin = new Skin();
        skin.potentialSearchRoot = root.name;// 动画的骨骼节点不一定是skin节点的child
        const skinData = gltf.skins[index];
        skin.rootBoneName = skinData.skeleton ? GlTF.getNodeName(skinData.skeleton, gltf) : root.name;
        skin.boneNames = skinData.joints.map(item => {
            return GlTF.getNodeName(item, gltf);
        });
        return ParseAccessorNode.parse(skinData.inverseBindMatrices, gltf)
            .then((res) => {
                skin.inverseBindMatrices = Accessor.getTypedData(res) as any;
                return skin;
            });
    }
}
