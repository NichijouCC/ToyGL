import { Input } from "./input/input";
import { Timer } from "./core/timer";
import { InterScene } from "./scene/scene";
import { GraphicsDevice } from "./webgl/graphicsDevice";
import { Resource } from "./resources/resource";
import { LoadGlTF } from "./resources/loader/loadglTF";
import { Ecs } from "./core/ecs";
import { ModelSystem } from "./components/modelSystem";
import { ForwardRender } from "./scene/render/forwardRender";
import { EventTarget } from "@mtgoo/ctool";
import { AnimationSystem } from "./components/animationSystem";
import { Screen } from "./core/toyScreen";
import { CamerSystem } from "./components/camerSystem";

export class ToyGL {
    onresize = new EventTarget<{ width: number, height: number }>();
    static create(element: HTMLDivElement | HTMLCanvasElement, options?: { autoAdaptScreenSize?: boolean }): ToyGL {
        const toy = new ToyGL();
        const screen = Screen.create(element, options);
        const canvas = screen.canvas;

        const timer = new Timer();
        const input = new Input(canvas);
        const device = new GraphicsDevice(canvas);
        const render = new ForwardRender(device);
        const resource = new Resource();
        const scene = new InterScene(render);
        resource.registerAssetLoader(".gltf", new LoadGlTF(device));
        resource.registerAssetLoader(".glb", new LoadGlTF(device));
        Ecs.addSystem(new CamerSystem(scene, screen));
        Ecs.addSystem(new AnimationSystem());
        Ecs.addSystem(new ModelSystem(scene, render));

        timer.onTick.addEventListener(scene._tick);

        toy._timer = timer;
        toy._input = input;
        toy._screen = screen;
        toy._scene = scene;
        toy._resource = resource;
        return toy;
    }

    private _input: Input;
    get input() { return this._input; }

    private _screen: Screen;
    get screen() { return this._screen; }

    private _timer: Timer;
    get timer() { return this._timer; }

    private _scene: InterScene;
    get scene() { return this._scene; }

    private _resource: Resource;
    get resource() { return this._resource; }

    get canvas() { return this._screen.canvas; }

    addSystem = Ecs.addSystem.bind(Ecs);
}
