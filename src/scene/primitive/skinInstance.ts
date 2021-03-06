import { Entity } from "../entity";
import { mat4, quat, vec3 } from "../../mathD";
import { MemoryTexture } from "../asset/texture/memoryTexture";
import { GraphicsDevice } from "../../webgl/graphicsDevice";
import { CeilingPOT, ceilPowerOfTwo } from "../../mathD/common";
import { PixelFormatEnum } from "../../webgl/pixelFormatEnum";
import { PixelDatatypeEnum } from "../../webgl/pixelDatatype";
import { Skin } from "../asset/Skin";
import { UniformState } from "../uniformState";
import { FrameState } from "../frameState";

export enum SkinWay {
    /**
     * 方式1：将骨骼的matToRoot[]到shader中
     */
    UNIFORM_MATS,
    /**
     * 方式2：将骨骼mat数据存到图片中传到shader中
     */
    UNIFORM_TEXTURE,
    /**
     * 方式3：将骨骼(rot+location)[]传递到shader中
     */
    UNIFORM_ARRAY,
}

export class SkinInstance {
    private skin: Skin;
    private bones: Entity[] = [];
    private rootBone: Entity;
    private _boneInverses!: mat4[];
    private get attachEntity() { return this.getEntity?.() };
    private getEntity: () => Entity;
    /**
     * 方式1：
     */
    private _boneMatrixes!: Float32Array;

    /**
     * 方式2：
     */
    private _boneTextureData!: Float32Array;
    private _boneTexture: MemoryTexture;

    /**
     * 方式3：
     */
    private _boneData!: Float32Array;

    static skinWay = SkinWay.UNIFORM_ARRAY;


    constructor(skin: Skin, getEntity: () => Entity) {
        this.skin = skin;
        this.getEntity = getEntity;
        // let skinMeshRoot = attachEntity.findInParents((item) => item.getComponent(Animation.name) != null);
    }

    private beInit: boolean = false;
    private init(device: GraphicsDevice) {
        const { skin, attachEntity } = this;
        this._boneInverses = [];
        let searchRoot: Entity;
        // this.rootBone = attachEntity.find(item => item.name == skin.rootBoneName);
        this.rootBone = findRootBone(attachEntity, skin.rootBoneName);
        if (this.rootBone == null) {
            console.error("cannot find rootBone");
            return;
        };

        const bones = skin.boneNames.map((boneName, i) => {
            let bone = attachEntity.find(item => item.name == boneName);
            if (bone == null) {
                if (skin.potentialSearchRoot != null && searchRoot == null) {
                    searchRoot = attachEntity.findInParents((item) => item.name == skin.potentialSearchRoot);
                }
                bone = searchRoot?.find(item => item.name == boneName);
                if (bone == null) {
                    console.warn("failed to find bone", boneName, attachEntity);
                }
            }
            // if (this._boneInverses[i] == null) console.error("cannot get bone inverse mat data!");
            return bone;
        });
        this._boneInverses = skin.inverseBindMatrices;
        this.bones = bones;

        switch (SkinInstance.skinWay) {
            case SkinWay.UNIFORM_MATS:
                this._boneMatrixes = new Float32Array(bones.length * 16);
                break;
            case SkinWay.UNIFORM_ARRAY:
                this._boneData = new Float32Array(bones.length * 7)
                break;
            case SkinWay.UNIFORM_TEXTURE:
                // layout (1 matrix = 4 pixels)
                //      RGBA RGBA RGBA RGBA (=> column1, column2, column3, column4)
                //  with  8x8  pixel texture max   16 bones * 4 pixels =  (8 * 8)
                //       16x16 pixel texture max   64 bones * 4 pixels = (16 * 16)
                //       32x32 pixel texture max  256 bones * 4 pixels = (32 * 32)
                //       64x64 pixel texture max 1024 bones * 4 pixels = (64 * 64)
                let size = Math.sqrt(bones.length * 4); // 4 pixels needed for 1 matrix
                size = ceilPowerOfTwo(size);
                size = Math.max(size, 4);
                this._boneTextureData = new Float32Array(size * size * 4); // 4 floats per RGBA pixel

                if (device.caps.textureFloat) {
                    this._boneTexture = new MemoryTexture({
                        width: size,
                        height: size,
                        arrayBufferView: this._boneTextureData,
                        pixelFormat: PixelFormatEnum.RGBA,
                        pixelDatatype: PixelDatatypeEnum.FLOAT
                    });
                }
                break;
        }

        this.beInit = true;
    }

    update(device: GraphicsDevice, state: UniformState, frameState: FrameState) {
        if (this.attachEntity.beActive == false) return;
        if (!this.beInit) { this.init(device); }
        const { bones, rootBone } = this;
        if (SkinInstance.skinWay == SkinWay.UNIFORM_MATS) {
            boneUpdate_a(frameState, rootBone, bones, this._boneInverses, this._boneMatrixes);
            state.boneMatrices = this._boneMatrixes;
            state.matrixModel = this.rootBone.worldMatrix;
        } else if (SkinInstance.skinWay == SkinWay.UNIFORM_ARRAY) {
            boneUpdate_c(frameState, rootBone, bones, this._boneInverses, this._boneData);
            state.boneMatrices = this._boneData;
            state.matrixModel = this.rootBone.worldMatrix;
        } else if (SkinInstance.skinWay == SkinWay.UNIFORM_TEXTURE) {
            boneUpdate_a(frameState, rootBone, bones, this._boneInverses, this._boneTextureData);
            this._boneTexture.markDirty();
            state.boneTexture = this._boneTexture;
            state.matrixModel = this.rootBone.worldMatrix;
        }
    }
    destroy() { }
}
/**
 * 每个骨骼计算对应的mat4ToRoot
 */
const boneUpdate_a = (() => {
    let offsetMatrix = mat4.create();
    return (frameState: FrameState, rootBone: Entity, bones: Entity[], boneInverses: mat4[], data: Float32Array) => {
        const mat = rootBone.worldToLocalMatrix;
        if (frameState.dirtyNode.has(rootBone)) { // root dirty 全部重新计算
            for (let i = 0; i < bones.length; i++) {
                const matrix = bones[i] ? bones[i].worldMatrix : mat4.IDENTITY;
                mat4.multiply(offsetMatrix, matrix, boneInverses[i]);
                mat4.multiply(offsetMatrix, mat, offsetMatrix);
                mat4.toArray(data, offsetMatrix, i * 16);
            }
        } else {
            for (let i = 0; i < bones.length; i++) {
                if (frameState.dirtyNode.has(bones[i])) {
                    const matrix = bones[i] ? bones[i].worldMatrix : mat4.IDENTITY;
                    mat4.multiply(offsetMatrix, matrix, boneInverses[i]);
                    mat4.multiply(offsetMatrix, mat, offsetMatrix);
                    mat4.toArray(data, offsetMatrix, i * 16);
                }
            }
        }
    }
})()


/**
 * 每个骨骼计算对应的worldLocation,worldRot
 */
const boneUpdate_c = (() => {
    let offsetMatrix = mat4.create();
    return (frameState: FrameState, rootBone: Entity, bones: Entity[], boneInverses: mat4[], data: Float32Array) => {
        const mat = rootBone.worldToLocalMatrix;
        if (frameState.dirtyNode.has(rootBone)) { // root dirty 全部重新计算
            for (let i = 0; i < bones.length; i++) {
                const matrix = bones[i] ? bones[i].worldMatrix : mat4.IDENTITY;

                mat4.multiply(offsetMatrix, matrix, boneInverses[i]);
                mat4.multiply(offsetMatrix, mat, offsetMatrix);
                saveBoneMatToArray(data, offsetMatrix, i);
            }
        } else {
            for (let i = 0; i < bones.length; i++) {
                if (frameState.dirtyNode.has(bones[i])) {
                    const matrix = bones[i] ? bones[i].worldMatrix : mat4.IDENTITY;

                    mat4.multiply(offsetMatrix, matrix, boneInverses[i]);
                    mat4.multiply(offsetMatrix, mat, offsetMatrix);
                    saveBoneMatToArray(data, offsetMatrix, i);
                }
            }
        }
    }
})()

const saveBoneMatToArray = (() => {
    let temptMove = vec3.create();
    let temptRot = quat.create();

    return (array: Float32Array, mat: mat4, index: number) => {
        let move = mat4.getTranslation(temptMove, mat);
        let rot = mat4.getRotation(temptRot, mat);
        array[index * 7 + 0] = move[0];
        array[index * 7 + 1] = move[1];
        array[index * 7 + 2] = move[2];
        array[index * 7 + 3] = rot[0];
        array[index * 7 + 4] = rot[1];
        array[index * 7 + 5] = rot[2];
        array[index * 7 + 6] = rot[3];
    }
})()


const findRootBone = (start: Entity, rootName: string) => {
    let target = start.find((item) => item.name == rootName);
    if (target != null) return target;
    let checked = new Set<Entity>();
    checked.add(start);
    let parent = start.parent;
    while (parent != null && target == null) {
        for (let i = 0; i < parent.children.length; i++) {
            let child = parent.children[i] as Entity;
            if (!checked.has(child)) {
                target = child.find((item) => item.name == rootName);
                if (target != null) return target;
            }
        }
        checked.add(parent);
        parent = parent.parent;
    }
    return target;
}