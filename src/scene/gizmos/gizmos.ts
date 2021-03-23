import { mat4, vec3 } from "../../mathD";
import { DefaultMaterial } from "../../resources";
import { ToyGL } from "../../toygl";
import { VertexArray, VertexBuffer, BufferUsageEnum, VertexAttEnum, ComponentDatatypeEnum, PrimitiveTypeEnum } from "../../webgl";
import { Geometry } from "../asset";
import { BoundingBox } from "../bounds";
import { IRenderable } from "../render/irenderable";

export class Gizmos {
    private _toy: ToyGL;
    constructor(toy: ToyGL) {
        this._toy = toy;
    }
    drawLine(start: vec3, end: vec3, worldMat?: mat4) {
        let { scene } = this._toy;
        scene._addFrameRenderIns({
            geometry: new Geometry({
                attributes: [{
                    values: [start[0], start[1], start[2], end[0], end[1], end[2]],
                    componentsPerAttribute: 3,
                    componentDatatype: ComponentDatatypeEnum.FLOAT,
                    type: VertexAttEnum.POSITION
                }]
            }),
            material: DefaultMaterial.color_3d.clone(),
            worldMat: worldMat ?? mat4.IDENTITY
        });
    }

    private _dic = new Map<BoundingBox, IRenderable>();

    drawAABB(aabb: BoundingBox, worldMat?: mat4) {
        let { scene } = this._toy;
        let { center, halfSize } = aabb;
        let parentMat = worldMat ?? mat4.IDENTITY;
        let selfToParent = mat4.fromTranslation(mat4.create(), center);
        let selfWorldMat = mat4.multiply(selfToParent, parentMat, selfToParent);

        if (this._dic.has(aabb)) {
            let renderIns = this._dic.get(aabb);
            renderIns.worldMat = selfWorldMat;
            scene._addFrameRenderIns(renderIns);
        } else {
            let x = halfSize[0], y = halfSize[1], z = halfSize[2];
            scene._addFrameRenderIns({
                geometry: new Geometry({
                    attributes: [{
                        values: [
                            -x, -y, -z, x, -y, -z, x, -y, -z, x, -y, z, x, -y, z, -x, -y, z, -x, -y, z, -x, -y, -z,//bottom box
                            -x, y, -z, x, y, -z, x, y, -z, x, y, z, x, y, z, -x, y, z, -x, y, z, -x, y, -z,//top box
                            -x, -y, -z, -x, y, -z, x, -y, -z, x, y, -z, x, -y, z, x, y, z, -x, -y, z, -x, y, z//边柱子
                        ],
                        componentsPerAttribute: 3,
                        componentDatatype: ComponentDatatypeEnum.FLOAT,
                        type: VertexAttEnum.POSITION
                    }],
                    primitiveType: PrimitiveTypeEnum.LINES
                }),
                material: DefaultMaterial.color_3d.clone(),
                worldMat: selfWorldMat
            });
        }
    }
}