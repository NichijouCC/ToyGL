import { Iskin } from "../asset/geometry/skinMesh";
import { Entity } from "../../core/entity";
import { mat4 } from "../../mathD";
import { MemoryTexture } from "../asset/texture/memoryTexture";
import { GraphicsDevice } from "../../webgl/graphicsDevice";
import { CeilingPOT, ceilPowerOfTwo } from "../../mathD/common";
import { PixelFormatEnum } from "../../webgl/pixelFormatEnum";
import { PixelDatatypeEnum } from "../../webgl/pixelDatatype";
import { Skin } from "../asset/Skin";
import { UniformState } from "../uniformState";
import { FrameState } from "../frameState";

namespace Private {
    export const offsetMatrix: mat4 = mat4.create();
}

export class SkinInstance {
    private skin: Skin;
    private bones: Entity[] = [];
    private rootBone: Entity;
    private _boneInverses!: mat4[];
    private _boneMatrices!: Float32Array;
    private _boneMatricesViews: mat4[] = [];
    private _boneTexture: MemoryTexture;
    private attachEntity: Entity;

    constructor(skin: Skin, attachEntity: Entity) {
        this.skin = skin;
        this.attachEntity = attachEntity;
        // let skinMeshRoot = attachEntity.findInParents((item) => item.getComponent(Animation.name) != null);
    }

    // applyToAutoUniform(state: UniformState, device: GraphicsDevice) {
    //     state.boneMatrices = this._boneMatrices;
    //     state.boneTexture = this._boneTexture;
    //     state.matrixModel = this.rootBone.worldMatrix;
    // }
    private beInit: boolean = false;
    private init(device: GraphicsDevice) {
        const { skin, attachEntity } = this;
        this._boneInverses = [];
        let searchRoot: Entity;
        this.rootBone = attachEntity.find(item => item.name == skin.rootBoneName);

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

        // layout (1 matrix = 4 pixels)
        //      RGBA RGBA RGBA RGBA (=> column1, column2, column3, column4)
        //  with  8x8  pixel texture max   16 bones * 4 pixels =  (8 * 8)
        //       16x16 pixel texture max   64 bones * 4 pixels = (16 * 16)
        //       32x32 pixel texture max  256 bones * 4 pixels = (32 * 32)
        //       64x64 pixel texture max 1024 bones * 4 pixels = (64 * 64)
        let size = Math.sqrt(bones.length * 4); // 4 pixels needed for 1 matrix
        size = ceilPowerOfTwo(size);
        size = Math.max(size, 4);
        this._boneMatrices = new Float32Array(size * size * 4); // 4 floats per RGBA pixel

        if (device.caps.textureFloat) {
            this._boneTexture = new MemoryTexture({
                width: size,
                height: size,
                arrayBufferView: this._boneMatrices,
                pixelFormat: PixelFormatEnum.RGBA,
                pixelDatatype: PixelDatatypeEnum.FLOAT
            });
        }

        this.bones.forEach((item, index) => {
            this._boneMatricesViews[index] = this._boneMatrices.subarray(index * 16, index * 16 + 16);
        });
    }
    // get boneTexture() { this.recomputeBoneData(); return this._boneTexture }
    // get boneMatrices() { this.recomputeBoneData(); return this._boneMatrices }

    update(device: GraphicsDevice, state: UniformState, frameState: FrameState) {
        if (!this.beInit) { this.init(device); this.beInit = true; }
        const { bones, rootBone } = this;
        const { offsetMatrix } = Private;
        const mat = rootBone.worldTolocalMatrix;
        if (frameState.dirtyNode.has(rootBone)) { // root dirty 全部重新计算
            for (let i = 0; i < bones.length; i++) {
                const matrix = bones[i] ? bones[i].worldMatrix : mat4.IDENTITY;
                mat4.multiply(offsetMatrix, matrix, this._boneInverses[i]);
                mat4.multiply(offsetMatrix, mat, offsetMatrix);
                mat4.toArray(this._boneMatrices, offsetMatrix, i * 16);
            }
            if (this._boneTexture) {
                this._boneTexture.markDirty();
            }
        } else { // 哪个bone dirty了对应matrix就重新计算
            let beNeedUpdate = false;
            for (let i = 0; i < bones.length; i++) {
                if (frameState.dirtyNode.has(bones[i])) {
                    beNeedUpdate = true;
                    const matrix = bones[i] ? bones[i].worldMatrix : mat4.IDENTITY;
                    mat4.multiply(offsetMatrix, matrix, this._boneInverses[i]);
                    mat4.multiply(offsetMatrix, mat, offsetMatrix);
                    mat4.toArray(this._boneMatrices, offsetMatrix, i * 16);
                }
            }
            if (beNeedUpdate && this._boneTexture) {
                this._boneTexture.markDirty();
            }
        }
        state.boneMatrices = this._boneMatrices;
        state.boneTexture = this._boneTexture;
        state.matrixModel = this.rootBone.worldMatrix;
    }

    destroy() { }
}


function saveBoneMatrixToArray(mat: mat4, array: Float32Array) {

}
