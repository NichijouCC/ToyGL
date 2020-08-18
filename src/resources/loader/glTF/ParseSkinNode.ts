import { Skin } from "../../../scene/asset/Skin";
import { IgltfJson } from "../LoadglTF";
import { ParseAccessorNode, Accessor } from "./ParseAccessorNode";
import { GlTF } from "./Util";
import { Entity } from "../../../core/Entity";
import { Mat4 } from "../../../mathD/mat4";

export class ParseSkinNode {

    static parse(index: number, nodeName: string, root: Entity, gltf: IgltfJson): Promise<Skin> {
        let skin = new Skin();
        skin.rootBoneName = nodeName;
        skin.potentialSearchRoot = root.name;//动画的骨骼节点不一定是skin节点的child
        let skinData = gltf.skins[index];
        skin.boneNames = skinData.joints.map(item => {
            return GlTF.getNodeName(item, gltf);
        });
        return ParseAccessorNode.parse(skinData.inverseBindMatrices, gltf)
            .then((res) => {
                // skin.inverseBindMatrices = skinData.joints.map((item, index) => {
                //     let boneMat = Mat4.fromArray(res.typedArray as any, index);
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