import { Skin } from "../../../scene/asset/Skin";
import { IGltfJson } from "../loadGltf";
import { ParseAccessorNode, Accessor } from "./parseAccessorNode";
import { GlTF } from "./util";
import { Entity } from "../../../scene/entity";

export class ParseSkinNode {
    static parse(index: number, nodeName: string, root: Entity, gltf: IGltfJson): Promise<Skin> {
        const skin = new Skin();
        skin.potentialSearchRoot = root.name;// 动画的骨骼节点不一定是skin节点的child
        const skinData = gltf.skins[index];
        skin.rootBoneName = skinData.skeleton ? GlTF.getNodeName(skinData.skeleton, gltf) : nodeName;
        skin.boneNames = skinData.joints.map(item => {
            return GlTF.getNodeName(item, gltf);
        });
        return ParseAccessorNode.parse(skinData.inverseBindMatrices, gltf)
            .then((res) => {
                skin.inverseBindMatrices = Accessor.getTypedData(res);
                return skin;
            });
    }
}
