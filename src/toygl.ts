import { Timer } from "./core/timer";
import { InterScene } from "./scene/scene";
import { Resource } from "./resources";
import { LoadGlTF } from "./loader/loadGltf";
import { ECS } from "./core/ecs/ecs";
import { ForwardRender } from "./render/index";
import { EventTarget } from "@mtgoo/ctool";
import { AnimationSystem, ModelSystem, CameraSystem } from "./components/index";
import { Screen } from "./core/toyScreen";
import { Gizmos } from "./gizmos/gizmos";

export class ToyGL {
    onresize = new EventTarget<{ width: number, height: number }>();
    static create(element: HTMLDivElement | HTMLCanvasElement, options?: { autoAdaptScreenSize?: boolean }): ToyGL {
        const toy = new ToyGL();
        const screen = Screen.create(element, options);
        const canvas = screen.canvas;

        const timer = new Timer();
        const render = new ForwardRender(canvas);
        const resource = new Resource();
        const scene = new InterScene(toy);
        resource.registAssetLoader(".gltf", new LoadGlTF());
        resource.registAssetLoader(".glb", new LoadGlTF());
        ECS.addSystem(new CameraSystem(scene, screen));
        ECS.addSystem(new AnimationSystem());
        ECS.addSystem(new ModelSystem(toy), Number.POSITIVE_INFINITY);

        timer.onTick.addEventListener(scene._tick);
        toy._render = render;
        toy._timer = timer;
        toy._screen = screen;
        toy._scene = scene;
        toy._resource = resource;

        toy._gizmos = new Gizmos(toy);
        return toy;
    }

    private _screen: Screen;
    get screen() { return this._screen; }

    private _timer: Timer;
    get timer() { return this._timer; }

    private _render: ForwardRender;
    get render() { return this._render; }

    private _scene: InterScene;
    get scene() { return this._scene; }

    private _resource: Resource;
    get resource() { return this._resource; }

    get canvas() { return this._screen.canvas; }

    private _gizmos: Gizmos;
    get gizmos() { return this._gizmos; }

    addSystem = ECS.addSystem.bind(ECS);
}
