import { EventTarget } from "@mtgoo/ctool";
import { Entity } from "./entity";
import { FrameState } from "./frameState";
import { ToyGL } from "../toygl";
import { mat4, vec2, vec3, vec4 } from "../mathD";
import { Input } from "../input";
import { ECS, COMPS, UPDATE } from "../core/ecs";
import { IRenderable, ICamera, RenderTypeEnum } from "../render";
import { CameraComponent } from "../components/cameraComponent";
import { PhysicsWorld } from "../components/colliderSystem";

export class InterScene {
    private _toy: ToyGL;
    /**
     * private
     */
    _cameras: CameraComponent[] = [];
    get mainCamera() { return this._cameras[0]; }
    addNewCamera() {
        let node = this.addNewChild();
        let comp = node.addComponent(CameraComponent)
        return comp;
    }
    private root: Entity;
    constructor(toy: ToyGL) {
        this._toy = toy;
        this.root = new Entity({ beActive: true, _parentsBeActive: true } as any);
    }

    addNewChild(): Entity {
        const trans = new Entity();
        this.root.addChild(trans);
        return trans;
    }

    addChild(item: Entity) {
        this.root.addChild(item);
        return item;
    }

    preUpdate = new EventTarget<number>();
    frameState: FrameState = new FrameState();
    _tick = (deltaTime: number) => {
        this.preUpdate.raiseEvent(deltaTime);
        this._ecsUpdate(deltaTime);
        this.tickRender(this.frameState);
        this.frameState = new FrameState();
    }

    /**
     * 单位秒
     * @param deltaTime 
     */
    private _ecsUpdate(deltaTime: number) {
        ECS.entities.forEach(item => {
            for (const key in item[COMPS]) {
                item[COMPS][key][UPDATE](deltaTime);
            }
        });
        ECS.systems.forEach(item => item.system.update(deltaTime));
    }

    private _renders: IRenderable[] = [];
    addRenderIns(render: IRenderable) {
        this._renders.push(render);
        return render;
    }

    addFrameRenderIns(render: IRenderable) {
        this.frameState.renders.push(render);
        return render;
    }

    preRender = new EventTarget();
    afterRender = new EventTarget();

    private tickRender = (state: FrameState) => {
        this.preRender.raiseEvent();
        let renders = state.renders.concat(this._renders);
        this._toy.render.renderList(this._cameras, renders, {
            onAfterFrustumCull: sortRenderItems
        });
    }

    pick(screenPos?: vec2) {
        screenPos = screenPos ?? Input.mouse.position;
        const { screen } = this._toy;
        const ndc_x = (screenPos[0] / screen.width) * 2 - 1;
        const ndc_y = -1 * ((screenPos[1] / screen.height) * 2 - 1);
        const ndc_near = vec3.fromValues(ndc_x, ndc_y, -1);
        const ndc_far = vec3.fromValues(ndc_x, ndc_y, 1);
        const world_near = ndcToWorld(ndc_near, this._toy.scene.mainCamera.projectMatrix, this._toy.scene.mainCamera.worldMatrix);
        const world_far = ndcToWorld(ndc_far, this._toy.scene.mainCamera.projectMatrix, this._toy.scene.mainCamera.worldMatrix);
        this._toy.gizmos.drawLine(world_near, world_far);
    }

    pickTestCollider() {
        const { screen } = this._toy;
        const screenPos = Input.mouse.position;
        const ndc_x = (screenPos[0] / screen.width) * 2 - 1;
        const ndc_y = -1 * ((screenPos[1] / screen.height) * 2 - 1);
        const ndc_near = vec3.fromValues(ndc_x, ndc_y, -1);
        const ndc_far = vec3.fromValues(ndc_x, ndc_y, 1);
        const world_near = ndcToWorld(ndc_near, this._toy.scene.mainCamera.projectMatrix, this._toy.scene.mainCamera.worldMatrix);
        const world_far = ndcToWorld(ndc_far, this._toy.scene.mainCamera.projectMatrix, this._toy.scene.mainCamera.worldMatrix);

        const result = PhysicsWorld.rayTest(world_near, world_far);
        console.log("pickFromRay", result);
        if (result.hasHit) {
            const posInWorld = result.hitPointWorld;
            this._toy.gizmos.drawPoint(vec3.fromValues(posInWorld.x, posInWorld.y, posInWorld.z));
        }
    }

    intersectCollider(from: vec3, to: vec3) {
        return PhysicsWorld.rayTest(from, to);
    }
}


function ndcToView(ndcPos: vec3, projectMat: mat4) {
    const inversePrjMat = mat4.invert(mat4.create(), projectMat);
    const viewPosH = vec4.transformMat4(vec4.create(), vec4.fromValues(ndcPos[0], ndcPos[1], ndcPos[2], 1), inversePrjMat);
    return vec3.fromValues(viewPosH[0] / viewPosH[3], viewPosH[1] / viewPosH[3], viewPosH[2] / viewPosH[3]);
}

function ndcToWorld(ndcPos: vec3, projectMat: mat4, camToWorld: mat4) {
    const view_pos = ndcToView(ndcPos, projectMat);
    return vec3.transformMat4(vec3.create(), view_pos, camToWorld);
}

function sortRenderItems(items: IRenderable[], cam: ICamera) {
    if (items.length <= 1) return items;
    let zdistDic: Map<IRenderable, number> = new Map();
    let camera: CameraComponent = cam as any;
    const camPos = camera.worldPos;
    const camFwd = camera.forwardInWorld;
    let tempX, tempY, tempZ;

    items.sort((a, b) => {
        let firstSortOrder = a.sortOrder - b.sortOrder;
        if (!isNaN(firstSortOrder) && firstSortOrder != 0) return firstSortOrder;
        let renderType = a.material.renderType - b.material.renderType;
        if (renderType != 0) return renderType;
        let sortOrder = a.material.sortOrder - b.material.sortOrder
        if (!isNaN(sortOrder) && sortOrder) return sortOrder;
        if (a.material.renderType == RenderTypeEnum.OPAQUE) {
            //先shader排序
            let shaderId = a.material.shader.create_id - b.material.shader.create_id;
            if (shaderId != 0) return shaderId;

            //由近到远
            let aZdist: number = zdistDic.get(a);
            let bZdist: number = zdistDic.get(b);
            if (aZdist == null) {
                let insPos = mat4.getTranslation(vec3.create(), a.worldMat);
                tempX = insPos[0] - camPos[0];
                tempY = insPos[1] - camPos[1];
                tempZ = insPos[2] - camPos[2];
                aZdist = tempX * camFwd[0] + tempY * camFwd[1] + tempZ * camFwd[2];
                zdistDic.set(a, aZdist);
            }
            if (bZdist == null) {
                let insPos = mat4.getTranslation(vec3.create(), b.worldMat);
                tempX = insPos[0] - camPos[0];
                tempY = insPos[1] - camPos[1];
                tempZ = insPos[2] - camPos[2];
                bZdist = tempX * camFwd[0] + tempY * camFwd[1] + tempZ * camFwd[2];
                zdistDic.set(b, bZdist);
            }
            return bZdist - aZdist;
        } else if (a.material.renderType == RenderTypeEnum.TRANSPARENT || a.material.renderType == RenderTypeEnum.ALPHA_CUT) {
            //由远到近
            let aZdist: number = zdistDic.get(a);
            let bZdist: number = zdistDic.get(b);
            if (aZdist == null) {
                let insPos = mat4.getTranslation(vec3.create(), a.worldMat);
                tempX = insPos[0] - camPos[0];
                tempY = insPos[1] - camPos[1];
                tempZ = insPos[2] - camPos[2];
                aZdist = tempX * camFwd[0] + tempY * camFwd[1] + tempZ * camFwd[2];
                zdistDic.set(a, aZdist);
            }
            if (bZdist == null) {
                let insPos = mat4.getTranslation(vec3.create(), b.worldMat);
                tempX = insPos[0] - camPos[0];
                tempY = insPos[1] - camPos[1];
                tempZ = insPos[2] - camPos[2];
                bZdist = tempX * camFwd[0] + tempY * camFwd[1] + tempZ * camFwd[2];
                zdistDic.set(b, bZdist);
            }
            return aZdist - bZdist;
        }
        return 0;
    });
    return items;
}