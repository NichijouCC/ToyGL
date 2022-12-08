import { TaskPool, retryPromise } from "@mtgoo/ctool";
import { ComponentDatatypeEnum, DefaultMaterial, Geometry, mat4, Material, PrimitiveTypeEnum, quat, Ray, Tempt, TextureAsset, TextureWrapEnum, Tiles3d, vec2, vec3, VertexAttEnum } from "TOYGL";
import { FrameState } from "../../../src/scene/frameState";

export class GisLineRender {
    private gpsArr: vec3[];
    private _origin: vec3;
    readonly clampToGround: boolean;
    readonly system: Tiles3d.TilesetSystem;
    private invertWorldMat: mat4;
    private worldMat: mat4;
    private material: Material;
    lineWidth: number = 10;
    get points() { return this.gpsArr; }
    constructor(options: { system: Tiles3d.TilesetSystem; origin: vec3; gpsArr: vec3[]; clampToGround?: boolean; }) {
        this.system = options.system;
        this._origin = options.origin;
        this.gpsArr = options.gpsArr;
        this.clampToGround = options.clampToGround ?? true;

        let originGps = Tiles3d.ecefToWs84(this._origin, vec3.create());
        this.worldMat = Tiles3d.transformEnuToEcef(originGps);
        this.invertWorldMat = mat4.invert(mat4.create(), this.worldMat);
        let material = DefaultMaterial.unlit_3d.clone();
        material.customSortOrder = 10;
        material.renderState.depth.depthTest = false;
        material.renderState.cull.enable = false;
        TextureAsset.fromUrl({ image: "./images/road.jpg", wrapS: TextureWrapEnum.REPEAT, wrapT: TextureWrapEnum.REPEAT })
            .then(tex => {
                material.setUniform("MainTex", tex);
            });
        this.material = material;

        if (this.gpsArr.length > 1) { this.process() }
    }
    geo: Geometry;
    private process() {
        let { lineWidth, gpsArr } = this;
        let centerPoints = gpsArr.map((el, index) => {
            let worldPos = Tiles3d.ws84ToEcef(el, vec3.create());
            let localPos = mat4.transformPoint(vec3.create(), worldPos as any, this.invertWorldMat);
            return localPos;
        });

        let points = [];
        let uvs = [];
        let indices = [];

        let currentLength = 0;
        let dir = vec3.create();
        let currentUp = vec3.fromValues(0, 0.0, 1.0);
        let expandDir = vec3.create();

        let preDir = vec3.create();
        let nextDir = vec3.create();


        let lastLeftIndex = 0;
        let lastRightIndex = 0;
        for (let i = 0; i < centerPoints.length; i++) {
            if (i == 0) {
                vec3.subtract(dir, centerPoints[1], centerPoints[0])
                vec3.normalize(dir, dir)
                vec3.cross(expandDir, dir, currentUp);
                vec3.normalize(expandDir, expandDir);
                vec3.scale(expandDir, expandDir, lineWidth / 2);

                let leftPoint = vec3.scaleAndAdd(vec3.create(), centerPoints[i], expandDir, -1);
                points.push(leftPoint[0], leftPoint[1], leftPoint[2]);
                uvs.push(currentLength / 100, 1.0);

                let rightPoint = vec3.scaleAndAdd(vec3.create(), centerPoints[i], expandDir, 1);
                points.push(rightPoint[0], rightPoint[1], rightPoint[2]);
                uvs.push(currentLength / 100, 0.0);

                lastLeftIndex = 0;
                lastRightIndex = 1;

            } else {
                vec3.subtract(preDir, centerPoints[i], centerPoints[i - 1]);
                let preLen = vec3.length(preDir);
                currentLength += preLen;

                if (i == centerPoints.length - 1) {
                    vec3.normalize(dir, preDir)
                    vec3.cross(expandDir, dir, currentUp);
                    vec3.normalize(expandDir, expandDir);
                    vec3.scale(expandDir, expandDir, lineWidth / 2);

                    let leftPoint = vec3.scaleAndAdd(vec3.create(), centerPoints[i], expandDir, -1);
                    let rightPoint = vec3.scaleAndAdd(vec3.create(), centerPoints[i], expandDir, 1);

                    let pointStartIndex = points.length / 3;
                    points.push(
                        leftPoint[0], leftPoint[1], leftPoint[2],
                        rightPoint[0], rightPoint[1], rightPoint[2]
                    );
                    uvs.push(currentLength / 100, 1.0, currentLength / 100, 0.0);
                    indices.push(
                        lastLeftIndex, pointStartIndex + 1, pointStartIndex,
                        lastLeftIndex, lastRightIndex, pointStartIndex + 1);
                } else {
                    vec3.subtract(nextDir, centerPoints[i + 1], centerPoints[i]);
                    vec3.normalize(preDir, preDir);
                    vec3.normalize(nextDir, nextDir);

                    vec3.add(dir, preDir, nextDir);
                    vec3.normalize(dir, dir);


                    let dot = vec3.dot(preDir, nextDir);
                    let halfAngle = Math.acos(dot) / 2;
                    let halfExpandLength = 0.5 * lineWidth / Math.cos(halfAngle);
                    let halfUvOffset = Math.tan(halfAngle) * 0.5 * lineWidth / 100;

                    let splitAngle = Math.PI * 5 / 180;
                    if (halfAngle < splitAngle) {
                        vec3.cross(expandDir, dir, currentUp);
                        vec3.normalize(expandDir, expandDir);
                        //corner
                        let leftPoint = vec3.scaleAndAdd(vec3.create(), centerPoints[i], expandDir, -lineWidth * 0.5);
                        let rightPoint = vec3.scaleAndAdd(vec3.create(), centerPoints[i], expandDir, lineWidth * 0.5);

                        let pointStartIndex = points.length / 3;

                        points.push(
                            leftPoint[0], leftPoint[1], leftPoint[2],
                            rightPoint[0], rightPoint[1], rightPoint[2]
                        );
                        uvs.push(
                            currentLength / 100, 1.0,
                            currentLength / 100, 0.0
                        );

                        indices.push(
                            lastLeftIndex, pointStartIndex + 1, pointStartIndex,
                            lastLeftIndex, lastRightIndex, pointStartIndex + 1,
                        );

                        lastLeftIndex = pointStartIndex;
                        lastRightIndex = pointStartIndex + 1;
                    } else if (halfAngle > Math.PI * 0.25) {
                        vec3.cross(expandDir, dir, currentUp);
                        vec3.normalize(expandDir, expandDir);
                        vec3.cross(dir, currentUp, expandDir);
                        vec3.normalize(dir, dir)

                        let tempt = Tempt.getVec3()
                        vec3.cross(tempt, preDir, nextDir)
                        if (vec3.dot(tempt, currentUp) > 0) {
                            //左拐
                            let leftPoint = vec3.scaleAndAdd(vec3.create(), centerPoints[i], dir, lineWidth * 0.5);
                            let rightPoint = vec3.scaleAndAdd(vec3.create(), centerPoints[i], dir, -lineWidth * 0.5);

                            let pointStartIndex = points.length / 3;

                            points.push(
                                leftPoint[0], leftPoint[1], leftPoint[2],
                                rightPoint[0], rightPoint[1], rightPoint[2]
                            );
                            uvs.push(
                                currentLength / 100, 1.0,
                                currentLength / 100, 0.0
                            );

                            indices.push(
                                lastLeftIndex, pointStartIndex + 1, pointStartIndex,
                                lastLeftIndex, lastRightIndex, pointStartIndex + 1,
                            );

                            lastLeftIndex = pointStartIndex + 1;
                            lastRightIndex = pointStartIndex;
                        } else {
                            //右拐
                            let leftPoint = vec3.scaleAndAdd(vec3.create(), centerPoints[i], dir, -lineWidth * 0.5);
                            let rightPoint = vec3.scaleAndAdd(vec3.create(), centerPoints[i], dir, lineWidth * 0.5);

                            let pointStartIndex = points.length / 3;

                            points.push(
                                leftPoint[0], leftPoint[1], leftPoint[2],
                                rightPoint[0], rightPoint[1], rightPoint[2]
                            );
                            uvs.push(
                                currentLength / 100, 1.0,
                                currentLength / 100, 0.0
                            );

                            indices.push(
                                lastLeftIndex, pointStartIndex + 1, pointStartIndex,
                                lastLeftIndex, lastRightIndex, pointStartIndex + 1,
                            );

                            lastLeftIndex = pointStartIndex + 1;
                            lastRightIndex = pointStartIndex;
                        }
                    }
                    else {//转大弯
                        // vec3.cross(currentUp, preDir, nextDir);
                        // vec3.normalize(currentUp, currentUp);
                        vec3.cross(expandDir, dir, currentUp);
                        vec3.normalize(expandDir, expandDir);

                        let tempt = Tempt.getVec3()
                        vec3.cross(tempt, preDir, nextDir)
                        if (vec3.dot(tempt, currentUp) > 0) {
                            //左拐
                            let jointPoint = vec3.scaleAndAdd(vec3.create(), centerPoints[i], expandDir, -halfExpandLength);
                            let jointDir = vec3.subtract(vec3.create(), centerPoints[i], jointPoint);
                            vec3.normalize(jointDir, jointDir);
                            vec3.scale(jointDir, jointDir, lineWidth);

                            //扇形画分
                            let rotAngles = [0];
                            let count = Math.ceil(halfAngle / splitAngle);
                            for (let i = 1; i <= count; i++) {
                                let angle = i * splitAngle;
                                if (angle > halfAngle) angle = halfAngle;
                                rotAngles.push(angle);
                                rotAngles.splice(0, 0, -angle);
                            }

                            //计算扇形顶点
                            let pointStartIndex = points.length / 3;
                            rotAngles.forEach(angle => {
                                let rot = quat.fromAxisAngle(quat.create(), currentUp, angle);
                                let splitPoint = vec3.transformQuat(vec3.create(), jointDir, rot);
                                vec3.add(splitPoint, jointPoint, splitPoint);
                                points.push(splitPoint[0], splitPoint[1], splitPoint[2]);
                                uvs.push(currentLength + halfUvOffset * angle / halfAngle, 1.0);
                            })

                            //放拐点
                            points.push(jointPoint[0], jointPoint[1], jointPoint[2]);
                            uvs.push(currentLength / 100, 0.0);
                            let jointIndex = points.length / 3 - 1;
                            //和前一个centerpoint形成线段
                            indices.push(
                                lastLeftIndex, pointStartIndex, jointIndex,
                                lastLeftIndex, lastRightIndex, pointStartIndex);
                            //扇形三角形
                            for (let i = 0; i < rotAngles.length - 1; i++) {
                                indices.push(jointIndex, pointStartIndex + i, pointStartIndex + i + 1);
                            }

                            lastLeftIndex = jointIndex
                            lastRightIndex = jointIndex - 1

                        } else {
                            //右拐
                            let jointPoint = vec3.scaleAndAdd(vec3.create(), centerPoints[i], expandDir, halfExpandLength);
                            let jointDir = vec3.subtract(vec3.create(), centerPoints[i], jointPoint);
                            vec3.normalize(jointDir, jointDir);
                            vec3.scale(jointDir, jointDir, lineWidth);

                            //扇形画分
                            let rotAngles = [0];
                            let count = Math.ceil(halfAngle / splitAngle);
                            for (let i = 1; i <= count; i++) {
                                let angle = i * splitAngle;
                                if (angle > halfAngle) angle = halfAngle;
                                rotAngles.push(-angle);
                                rotAngles.splice(0, 0, angle);
                            }

                            //计算扇形顶点
                            let pointStartIndex = points.length / 3;
                            rotAngles.forEach(angle => {
                                let rot = quat.fromAxisAngle(quat.create(), currentUp, angle);
                                let splitPoint = vec3.transformQuat(vec3.create(), jointDir, rot);
                                vec3.add(splitPoint, jointPoint, splitPoint);
                                points.push(splitPoint[0], splitPoint[1], splitPoint[2]);
                                uvs.push(currentLength + halfUvOffset * angle / halfAngle, 1.0);
                            })

                            //放拐点
                            points.push(jointPoint[0], jointPoint[1], jointPoint[2]);
                            uvs.push(currentLength / 100, 0.0);
                            let jointIndex = points.length / 3 - 1;
                            //和前一个centerpoint形成线段
                            indices.push(
                                lastLeftIndex, jointIndex, pointStartIndex,
                                lastLeftIndex, lastRightIndex, jointIndex,
                            );
                            //扇形三角形
                            for (let i = 0; i < rotAngles.length - 1; i++) {
                                indices.push(pointStartIndex + i, jointIndex, pointStartIndex + i + 1);
                            }

                            lastLeftIndex = jointIndex - 1
                            lastRightIndex = jointIndex
                        }
                    }
                }
            }


        }

        this.geo = new Geometry({
            attributes: [
                {
                    type: VertexAttEnum.POSITION,
                    data: points,
                    componentSize: 3,
                    componentDatatype: ComponentDatatypeEnum.FLOAT
                },
                {
                    type: VertexAttEnum.TEXCOORD_0,
                    data: uvs,
                    componentSize: 2,
                    componentDatatype: ComponentDatatypeEnum.FLOAT
                }
            ],
            indices,
            primitiveType: PrimitiveTypeEnum.TRIANGLES
        });
    }
    addGpsPoint(point: vec3) {
        this.gpsArr.push(point);
        if (this.gpsArr.length > 1) { this.process() }
    }

    render(frameState: FrameState) {
        frameState.renders.push({
            geometry: this.geo,
            material: this.material,
            worldMat: this.worldMat,
        })
    }
}

export var clamper = new TaskPool({ maxConcurrency: 1 })
export function clampToGround(system: Tiles3d.TilesetSystem, targetPos: vec3, out = vec3.create()): Promise<vec3> {
    return clamper.push(() => {
        return retryPromise<vec3>(
            () => {
                let ray = new Ray().setByTwoPoint(vec3.create(), targetPos);
                let pickResult = system.rayTest(ray);
                if (pickResult != null) {
                    let pickPoint = pickResult[pickResult.length - 1].point;
                    vec3.copy(out, pickPoint);
                    return Promise.resolve(out);
                } else {
                    return Promise.reject();
                }
            },
            { count: Number.POSITIVE_INFINITY, retryFence: 300 })
    })
}