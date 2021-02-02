import { IgltfJson } from "../loadglTF";
import { AnimationClip, AnimationChannel } from "../../../scene/asset/animationClip";
import { IgltfAnimationSampler, IgltfAnimationChannelTarget, AnimationChannelTargetPath } from "./gltfJsonStruct";
import { ParseNode } from "./parseNode";
import { ParseAccessorNode, Accessor } from "./parseAccessorNode";
import { GlTF } from "./util";
import { TypedArray } from "../../../core/typedArray";

export class ParseAnimationNode {
    static parse(index: number, gltf: IgltfJson): Promise<AnimationClip> {
        const animation = gltf.animations[index];
        const newAniclip = new AnimationClip(animation.name);
        const { channels, samplers } = animation;

        return Promise.all(channels.map(item => {
            const sampleNode = samplers[item.sampler];
            return this.parseChannelData(item.target, sampleNode, gltf)
                .then((channel) => {
                    newAniclip.channels.push(channel);
                    if (channel.endFrame > newAniclip.totalFrame) {
                        newAniclip.totalFrame = channel.endFrame;
                    }
                });
        })).then(() => { return newAniclip; });
    }

    private static parseChannelData(channeltarget: IgltfAnimationChannelTarget, sampleNode: IgltfAnimationSampler, gltf: IgltfJson): Promise<AnimationChannel> {
        const chan = new AnimationChannel();
        chan.targetName = GlTF.getNodeName(channeltarget.node, gltf);
        chan.propertyName = channeltarget.path;
        chan.interPolation = sampleNode.interpolation;

        return Promise.all([
            ParseAccessorNode.parse(sampleNode.input, gltf),
            ParseAccessorNode.parse(sampleNode.output, gltf)
        ]).then(([inputdata, outputdata]) => {

            const keyframes = Accessor.getTypedData(inputdata);
            for (let i = 0; i < keyframes.length; i++) {
                chan.keyframes[i] = (keyframes[i] * AnimationClip.FPS) | 0;// 变成frame
            }
            chan.values = Accessor.getTypedData(outputdata);
            return chan;
        });
    }
}
