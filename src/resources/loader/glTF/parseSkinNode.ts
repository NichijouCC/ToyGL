import { Skin } from "../../../scene/asset/Skin";
import { IgltfJson } from "../loadglTF";
import { ParseAccessorNode, Accessor } from "./parseAccessorNode";
import { GlTF } from "./util";
import { Entity } from "../../../core/entity";

export class ParseSkinNode {
    static parse(index: number, nodeName: string, root: Entity, gltf: IgltfJson): Promise<Skin> {
        const skin = new Skin();
        skin.rootBoneName = nodeName;
        skin.potentialSearchRoot = root.name;// 动画的骨骼节点不一定是skin节点的child
        const skinData = gltf.skins[index];
        skin.boneNames = skinData.joints.map(item => {
            return GlTF.getNodeName(item, gltf);
        });
        return ParseAccessorNode.parse(skinData.inverseBindMatrices, gltf)
            .then((res) => {
                // skin.inverseBindMatrices = skinData.joints.map((item, index) => {
                //     let boneMat = mat4.fromArray(res.typedArray as any, index);
                //     if (boneMat == null) {
                //         console.error("cannot get bone inverse mat data!");
                //     }
                //     return boneMat;
                // })
                skin.inverseBindMatrices = Accessor.getTypedData(res);
                return skin;
            });
    }
}
