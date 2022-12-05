import { EventTarget } from "@mtgoo/ctool";
import { Entity } from "./entity";
import { FrameState } from "./frameState";
import { mat4, vec2, vec3, vec4 } from "../mathD";
import { Input } from "../input";
import { ECS, COMPS, UPDATE } from "../core/ecs";
import { IRenderable, ICamera, RenderTypeEnum, ForwardRender, IEngineOption } from "../render";
import { CameraComponent } from "../components/cameraComponent";
import { PhysicsWorld } from "../components/colliderSystem";
import { Screen } from "./screen";
import { Gizmos } from "./gizmos/gizmos";

export type IWorldOptions = { autoAdaptScreenSize?: boolean } & IEngineOption;
export class World extends ECS {
    readonly screen: Screen;
    readonly render: ForwardRender;
    readonly gizmos: Gizmos;
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
    constructor(element: HTMLDivElement | HTMLCanvasElement, options?: IWorldOptions) {
        super();
        this.screen = Screen.create(element, options);
        this.render = new ForwardRender(this.screen.canvas, options);
        this.gizmos = new Gizmos(this);
        this.root = new Entity(this, { beActive: true, _parentsBeActive: true, beInWorld: true } as any);
    }

    addNewChild(): Entity {
        const trans = new Entity(this);
        this.root.addChild(trans);
        return trans;
    }

    addChild(item: Entity) {
        this.root.addChild(item);
        return item;
    }

    preUpdate = new EventTarget<number>();
    frameState: FrameState = new FrameState();
    beActiveTick = true;
    /**
     * 帧执行
     * @param deltaTime frame 间隔，单位秒
     * @returns 
     */
    update = (deltaTime: number) => {
        if (this.beActiveTick == false) return;
        this.preUpdate.raiseEvent(deltaTime);
        this._ecsUpdate(deltaTime);
        this.tickRender(this.frameState);
        this.frameState = new FrameState();
    }

    /**
     * ECS 系统 update
     * @param deltaTime  单位秒
     */
    private _ecsUpdate(deltaTime: number) {
        for (let key in this.entities) {
            let el = this.entities[key];
            for (const key in el[COMPS]) {
                el[COMPS][key][UPDATE](deltaTime);
            }
        }
        this.systems.forEach(item => item.system[UPDATE](deltaTime));
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

    preRender = new EventTarget<FrameState>();
    afterRender = new EventTarget();

    private tickRender = (state: FrameState) => {
        this.preRender.raiseEvent(state);
        let renders = state.renders.concat(this._renders);
        this.render.renderList(this._cameras, renders);
        this.afterRender.raiseEvent();
    }

    pick(screenPos?: vec2) {
        screenPos = screenPos ?? Input.mouse.position;
        const { screen, gizmos } = this;
        const world_near = this.mainCamera.screenPointToWorld(screenPos, -1);
        const world_far = this.mainCamera.screenPointToWorld(screenPos, 1);
        gizmos.drawLine(world_near, world_far);
    }

    pickTestCollider() {
        const { screen } = this;
        const screenPos = Input.mouse.position;
        const world_near = this.mainCamera.screenPointToWorld(screenPos, -1);
        const world_far = this.mainCamera.screenPointToWorld(screenPos, 1);

        const result = PhysicsWorld.rayTest(world_near, world_far);
        console.log("pickFromRay", result);
        if (result.hasHit) {
            const posInWorld = result.hitPointWorld;
            this.gizmos.drawPoint(vec3.fromValues(posInWorld.x, posInWorld.y, posInWorld.z));
        }
    }

    intersectCollider(from: vec3, to: vec3) {
        return PhysicsWorld.rayTest(from, to);
    }
}