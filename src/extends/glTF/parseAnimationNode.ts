import { IGltfJson } from "./loadGltf";
import { AnimationClip, AnimationChannel } from "../../resources/animationClip";
import { IGltfAnimationSampler, IGltfAnimationChannelTarget, AnimationChannelTargetPath } from "./gltfJsonStruct";
import { ParseAccessorNode, Accessor } from "./parseAccessorNode";
import { GlTF } from "./util";

export class ParseAnimationNode {
    static parse(index: number, gltf: IGltfJson): Promise<AnimationClip> {
        const animation = gltf.animations[index];
        const newClip = new AnimationClip(animation.name);
        const { channels, samplers } = animation;

        return Promise.all(channels.map(item => {
            const sampleNode = samplers[item.sampler];
            return this.parseChannelData(item.target, sampleNode, gltf)
                .then((channel) => {
                    newClip.channels.push(channel);
                    if (channel.endTime > newClip.totalTime) {
                        newClip.totalTime = channel.endTime;
                    }
                });
        })).then(() => { return newClip; });
    }

    private static parseChannelData(channelTarget: IGltfAnimationChannelTarget, sampleNode: IGltfAnimationSampler, gltf: IGltfJson): Promise<AnimationChannel> {
        const chan = new AnimationChannel();
        chan.targetName = GlTF.getNodeName(channelTarget.node, gltf);
        chan.propertyName = channelTarget.path;
        chan.interPolation = sampleNode.interpolation as any;

        return Promise.all([
            ParseAccessorNode.parse(sampleNode.input, gltf),
            ParseAccessorNode.parse(sampleNode.output, gltf)
        ]).then(([inputData, outputData]) => {
            const keyframes = Accessor.getTypedData(inputData);
            for (let i = 0; i < keyframes.length; i++) {
                chan.keyframes[i] = keyframes[i][0];
            }
            chan.values = Accessor.getTypedData(outputData);
            return chan;
        });
    }
}
