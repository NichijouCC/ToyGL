import { DefaultGeometry, DefaultMaterial, Geometry, mat4, Material, quat, Texture2D, TextureAsset, Transform, vec3, VertexAttEnum, } from "TOYGL"
import { FrameState } from "../../../src/scene/frameState";

export class Billboard {
    private mat: Material;
    private worldPos: vec3;
    private geo: Geometry;
    constructor(url: string, worldPos: vec3, scale?: number, width?: number, height?: number) {
        this.worldPos = worldPos;
        TextureAsset.fromUrl({ image: url })
            .then(tex => {
                let mat = DefaultMaterial.unlit_3d.clone();
                mat.renderState.cull.enable = false;
                mat.renderState.depth.depthTest = false;
                mat.setUniform("MainTex", tex);
                this.mat = mat;
                if (width != null && height != null) {
                    this.localMat = mat4.fromScaling(mat4.create(), vec3.fromValues(width, height, 1.0));
                } else {
                    scale = scale ?? 1
                    this.localMat = mat4.fromScaling(mat4.create(), vec3.fromValues(tex.width * scale, tex.height * scale, 1.0));
                }

                this.geo = new Geometry({
                    attributes: [
                        {
                            type: VertexAttEnum.POSITION,
                            componentSize: 3,
                            data: [
                                -0.5, 0, 0,
                                0.5, 0, 0,
                                0.5, 1.0, 0,
                                -0.5, 1.0, 0
                            ]
                        },
                        {
                            type: VertexAttEnum.TEXCOORD_0,
                            componentSize: 2,
                            data: [
                                0.0, 0.0,
                                1.0, 0.0,
                                1.0, 1.0,
                                0.0, 1.0
                            ]
                        }
                    ],
                    indices: [0, 1, 2, 0, 2, 3]
                });
            })
    }
    private worldMat = mat4.create();
    private localMat: mat4;
    render(state: FrameState, target: Transform) {
        if (this.mat) {
            mat4.targetTo(this.worldMat, this.worldPos, target.worldPosition, target.getUpInWorld(vec3.create()));
            mat4.multiply(this.worldMat, this.worldMat, this.localMat);
            state.renders.push({
                geometry: this.geo,
                material: this.mat,
                worldMat: this.worldMat,
                sortOrder: 10
            })
        }
    }

}