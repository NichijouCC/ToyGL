import { EventTarget } from "@mtgoo/ctool";
import { Camera } from "./camera";
import { Entity } from "./entity";
import { ECS } from "../core/ecs/ecs";
import { IRenderable } from "./render/irenderable";
import { FrameState } from "./frameState";
import { ToyGL } from "../toygl";
import { mat4, vec2, vec3, vec4 } from "../mathD";
import { PhysicsWorld } from "../components";
import { Input } from "../input";
import { LayerComposition } from "./layerComposition";

export class InterScene {
    private _cameras: Map<string, Camera> = new Map();
    private _mainCam: Camera
    private _toy: ToyGL;
    get mainCamera() { return this._mainCam; }
    set mainCamera(cam: Camera) { this._mainCam = cam; }
    addNewCamera() {
        const cam = new Camera();
        cam.node = this.addNewChild();
        this.addCamera(cam);
        return cam;
    }

    addCamera(cam: Camera) {
        if (this._cameras.size == 0) {
            this._mainCam = cam;
        }
        if (!this._cameras.has(cam.id)) {
            this._cameras.set(cam.id, cam);
        }
    }

    get cameras() { return this._cameras; }
    private root: Entity;
    constructor(toy: ToyGL) {
        this._toy = toy;
        this.root = new Entity({ beActive: true, _parentsBeActive: true } as any);
        // Entity.onDirty.addEventListener((node) => {
        //     this.frameState.dirtyNode.add(node as Entity);
        // });
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
        ECS.update(deltaTime);
        this.tickRender(this.frameState);
        this.frameState = new FrameState();
    }

    private _renders: IRenderable[] = [];
    addRenderIns(render: IRenderable) {
        this._renders.push(render);
        return render;
    }

    _addFrameRenderIns(render: IRenderable) {
        this.frameState.renders.push(render);
        return render;
    }

    _addFrameMesh() {

    }

    preRender = new EventTarget();
    afterRender = new EventTarget();

    private tickRender = (state: FrameState) => {
        this.preRender.raiseEvent();
        let renders = state.renders.concat(this._renders);
        const { cameras } = this;
        this._toy.render.renderCameras(Array.from(cameras.values()), renders, {
            onAfterFrustumCull: (() => {
                let cameraRenderLayers = new Map<Camera, LayerComposition>();
                return (items: IRenderable[], cam: Camera) => {
                    let layerComps: LayerComposition
                    if (!cameraRenderLayers.has(cam)) {
                        layerComps = new LayerComposition();
                        cameraRenderLayers.set(cam, layerComps);
                    } else {
                        layerComps = cameraRenderLayers.get(cam);
                        layerComps.clear();
                    }
                    items.forEach(item => {
                        layerComps.addRenderableItem(item);
                    })
                    return layerComps.getSortedRenderArr(cam);
                }
            })()
        });
        this.afterRender.raiseEvent();
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
