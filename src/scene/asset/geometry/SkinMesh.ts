import { Transform } from "../../../core/Transform";
import { Geometry } from "./Geometry";
import { Mat4 } from "../../../mathD/mat4";
import { Entity } from "../../../core/Entity";
import { CeilingPOT } from "../../../mathD/common";
import { GraphicsDevice } from "../../../webgl/GraphicsDevice";
import { VertexArray } from "../../../webgl/VertextArray";
import { MemoryTexture } from "../texture/MemoryTexture";
import { PixelFormatEnum } from "../../../webgl/PixelFormatEnum";
import { PixelDatatypeEnum } from "../../../webgl/PixelDatatype";
import { Material } from "../Material";

namespace Private {
    export let offsetMatrix: Mat4 = Mat4.create();
}

export class SkinMesh extends Geometry {
    inverseBindMatrices!: Float32Array;
    jointIds!: number[];
    skeleton!: Entity;

    private _bones!: Entity[];
    private _boneInverses!: Mat4[];
    private _boneMatrices!: Float32Array;
    private _boneTexture: MemoryTexture;

    create(device: GraphicsDevice): VertexArray {
        this.initMatrices(device);
        return super.create(device);
    }

    update() {
        const { offsetMatrix } = Private;
        for (let i = 0; i < this._bones.length; ++i) {
            const matrix = this._bones[i] ? this._bones[i].worldMatrix : Mat4.IDENTITY;
            Mat4.multiply(matrix, this._boneInverses[i], offsetMatrix);
            Mat4.toArray(offsetMatrix, this._boneMatrices, i * 16);
        }
        if (this._boneTexture) {
            this._boneTexture.markDirty();
        }
    }

    private initMatrices(device: GraphicsDevice) {

        this._bones = [];
        this._boneInverses = [];
        let id: number;
        let boneIndex = 0;
        for (let i = 0; i < this.jointIds.length; i++) {
            id = this.jointIds[i];
            let bone = this.skeleton.find((item) => item.id == id);
            if (bone) {
                this._bones[boneIndex++] = bone;
            } else {
                console.warn(`Bone with ID '${id}' not found`)
            }

            this._boneInverses[i] = Mat4.fromArray(this.inverseBindMatrices, i);
            if (this._boneInverses[i] == null) console.error("cannot get bone inverse mat data!");
        }


        // layout (1 matrix = 4 pixels)
        //      RGBA RGBA RGBA RGBA (=> column1, column2, column3, column4)
        //  with  8x8  pixel texture max   16 bones * 4 pixels =  (8 * 8)
        //       16x16 pixel texture max   64 bones * 4 pixels = (16 * 16)
        //       32x32 pixel texture max  256 bones * 4 pixels = (32 * 32)
        //       64x64 pixel texture max 1024 bones * 4 pixels = (64 * 64)
        let size = Math.sqrt(this._bones.length * 4); // 4 pixels needed for 1 matrix
        size = CeilingPOT(size);
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
    }
}