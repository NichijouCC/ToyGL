import { mat4, vec3 } from "../../mathD";
import { DefaultMaterial } from "../../resources";
import { BoundingBox } from "../bounds";
import { IRenderable } from "../../render/irenderable";
import { ComponentDatatypeEnum, Geometry, PrimitiveTypeEnum, VertexAttEnum } from "../../render";
import { World } from "../world";
import { BoxCollider } from "../../components";

export class Gizmos {
    private _scene: World;
    constructor(scene: World) {
        this._scene = scene;
    }

    drawPoint(point: vec3, worldMat?: mat4) {
        this._scene.addRenderIns({
            geometry: new Geometry({
                attributes: [{
                    data: [point[0], point[1], point[2]],
                    componentSize: 3,
                    componentDatatype: ComponentDatatypeEnum.FLOAT,
                    type: VertexAttEnum.POSITION
                }],
                primitiveType: PrimitiveTypeEnum.POINTS
            }),
            material: DefaultMaterial.color_3d.clone(),
            worldMat: worldMat ?? mat4.IDENTITY
        });
    }

    drawLine(from: vec3, to: vec3, worldMat?: mat4) {
        this._scene.addRenderIns({
            geometry: new Geometry({
                attributes: [{
                    data: [from[0], from[1], from[2], to[0], to[1], to[2]],
                    componentSize: 3,
                    componentDatatype: ComponentDatatypeEnum.FLOAT,
                    type: VertexAttEnum.POSITION
                }],
                primitiveType: PrimitiveTypeEnum.LINES
            }),
            material: DefaultMaterial.color_3d.clone(),
            worldMat: worldMat ?? mat4.IDENTITY
        });
    }

    private _dic = new Map<BoundingBox | BoxCollider, IRenderable>();

    drawAABB(aabb: BoundingBox | BoxCollider, worldMat?: mat4) {
        const { center, halfSize } = aabb;
        const parentMat = worldMat ?? mat4.IDENTITY;
        const selfToParent = mat4.fromTranslation(mat4.create(), center);
        const selfWorldMat = mat4.multiply(selfToParent, parentMat, selfToParent);

        if (this._dic.has(aabb)) {
            const renderIns = this._dic.get(aabb);
            renderIns.worldMat = selfWorldMat;
            this._scene.addFrameRenderIns(renderIns);
        } else {
            const x = halfSize[0]; const y = halfSize[1]; const z = halfSize[2];
            this._scene.addFrameRenderIns({
                geometry: new Geometry({
                    attributes: [{
                        data: [
                            -x, -y, -z, x, -y, -z, x, -y, -z, x, -y, z, x, -y, z, -x, -y, z, -x, -y, z, -x, -y, -z, // bottom box
                            -x, y, -z, x, y, -z, x, y, -z, x, y, z, x, y, z, -x, y, z, -x, y, z, -x, y, -z, // top box
                            -x, -y, -z, -x, y, -z, x, -y, -z, x, y, -z, x, -y, z, x, y, z, -x, -y, z, -x, y, z// 边柱子
                        ],
                        componentSize: 3,
                        componentDatatype: ComponentDatatypeEnum.FLOAT,
                        type: VertexAttEnum.POSITION
                    }],
                    primitiveType: PrimitiveTypeEnum.LINES
                }),
                material: DefaultMaterial.color_3d,
                worldMat: selfWorldMat
            });
        }
    }
}
