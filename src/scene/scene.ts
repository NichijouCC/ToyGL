import { Camera } from "./../ec/components/camera";
import { Entity, Mesh } from "../ec/entity";
import { Transform } from "../core/Transform";
import { FrameState, IframeState, Irenderable } from "./frameState";
import { RenderMachine } from "../render/renderMachine";
import { CullingMask, Icomponent, ToyActor } from "../ec/ec";
import { Frustum } from "./frustum";
import { Debug } from "../debug/debug";
import { Geometry } from "../resources/assets/geometry";
import { Material } from "../resources/assets/material";
import { DefGeometry, DefGeometryType } from "../resources/defAssets/defGeometry";
import { DefMaterial } from "../resources/defAssets/defMaterial";
import { Vec3 } from "../mathD/vec3";

export class Scene {
    private root: Entity = new Entity();
    private frameState: FrameState = new FrameState();
    private render: RenderMachine;
    readonly priority: number;
    constructor(render: RenderMachine, priority: number = 0) {
        this.render = render;
        this.priority = priority;
    }
    newEntity(name: string = null, compsArr: string[] = null): Entity {
        let newobj = new Entity(name, compsArr);
        this.addEntity(newobj);
        return newobj;
    }

    creatEntityFromOpt(opt: Entity): Entity {
        let newObj = ToyActor.fromOpt<Entity>("Entity", opt);
        this.addEntity(newObj);
        return newObj;
    }

    addEntity(entity: Entity) {
        this.root.addChild(entity);
    }

    addDefMesh(type: DefGeometryType, material?: Material) {
        let geometry = DefGeometry.fromType(type);
        if (geometry != null) {
            let mesh = this.newEntity("defMesh", ["Mesh"]).getCompByName("Mesh") as Mesh;
            mesh.geometry = DefGeometry.fromType(type);
            mesh.material = material || DefMaterial.fromType("3dColor");
            return mesh;
        } else {
            return null;
        }
    }

    addCamera(pos: Vec3 = Vec3.create()): Camera {
        let entity = this.newEntity("camer", ["Camera"]);
        entity.transform.localPosition = pos;

        return entity.getCompByName("Camera") as Camera;
    }

    foreachRootNodes(func: (rootItem: Transform) => void) {
        for (let i = 0; i < this.root.children.length; i++) {
            func(this.root.children[i]);
        }
    }

    private initFrameState(frameState: FrameState) {
        frameState.renderList.length = 0;
        frameState.cameraList.length = 0;
    }

    preUpdate: (deltatime: number) => void;

    update(deltatime: number) {
        if (this.preUpdate) {
            this.preUpdate(deltatime);
        }
        this.initFrameState(this.frameState);

        this.frameState.deltaTime = deltatime;
        this.foreachRootNodes(node => {
            this._updateNode(node, this.frameState);
        });

        this.frameState.cameraList.sort((a, b) => {
            return a.priority - b.priority;
        });

        //------------------------shadow mapping
        if (this.frameState.lightList.length > 0) {
            let castShadowList = this.frameState.renderList.filter(item => {
                return item.castShadow;
            });
            for (let i = 0; i < this.frameState.lightList.length; i++) {
                let light = this.frameState.lightList[i];
                this.render.renderShadowMap(light, castShadowList);
            }
        }

        for (let i = 0; i < this.frameState.cameraList.length; i++) {
            let cam = this.frameState.cameraList[i];
            let _renderList = this.frameState.renderList.filter(item => {
                return this.maskCheck(cam.cullingMask, item) && this.frusumCheck(cam.frustum, item);
            });
            // let _frameState = { ...this.frameState, renderList: _renderList };

            // Debug.drawCameraWireframe(cam, this.frameState);
            // this.frameState.renderList = [Debug.showCameraWireframe(cam)];
            if (cam.preRender) {
                cam.preRender(this.render, _renderList);
            }
            this.render.drawCamera(cam, _renderList, this.frameState.lightList);
            if (cam.afterRender) {
                cam.afterRender(this.render, _renderList);
            }
        }
    }

    private _updateNode(node: Transform, frameState: IframeState) {
        let entity = node.entity;
        if (!entity.beActive) return;

        for (const key in node.entity.components) {
            node.entity.components[key].update(frameState);
        }
        for (let i = 0, len = node.children.length; i < len; i++) {
            this._updateNode(node.children[i], frameState);
        }
    }

    private frusumCheck(frustum: Frustum, item: Irenderable): boolean {
        return frustum.intersectRender(item);
    }

    private maskCheck(maskLayer: CullingMask, item: Irenderable): boolean {
        return (item.maskLayer & maskLayer) !== 0;
    }
}
