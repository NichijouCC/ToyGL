import { Input } from "./input/Input";
import { Timer } from "./core/Timer";
import { InterScene } from "./scene/Scene";
import { GraphicsDevice } from "./webgl/GraphicsDevice";
import { Resource } from "./resources/Resource";
import { LoadGlTF } from "./resources/loader/LoadglTF";
import { Ecs } from "./core/Ecs";
import { ModelSystem } from "./components/ModelSystem";
import { ForwardRender } from "./scene/render/ForwardRender";
import { EventTarget } from "./core/EventTarget";
import { AnimationSystem } from "./components/AnimationSystem";
import { ToyScreen } from "./core/ToyScreen";
import { CamerSystem } from "./components/CamerSystem";

export class ToyGL {
    onresize = new EventTarget<{ width: number, height: number }>();
    static create(element: HTMLDivElement | HTMLCanvasElement, options?: { autoAdaptScreenSize?: boolean }): ToyGL {
        const toy = new ToyGL();
        const screen = ToyScreen.create(element, options);
        const canvas = screen.canvas;

        const timer = new Timer();
        const input = new Input(canvas);
        const device = new GraphicsDevice(canvas);
        const render = new ForwardRender(device);
        const resource = new Resource();
        const scene = new InterScene(render, screen);
        resource.registerAssetLoader(".gltf", new LoadGlTF(device));
        Ecs.addSystem(new CamerSystem(scene, screen));
        Ecs.addSystem(new AnimationSystem());
        Ecs.addSystem(new ModelSystem(scene, render));

        timer.onTick.addEventListener((deltaTime) => {
            toy.preUpdate.raiseEvent(deltaTime);
            Ecs.update(deltaTime);
            // scene.frameUpdate(deltaTime);
        });

        toy._timer = timer;
        toy._input = input;
        toy._screen = screen;
        toy._scene = scene;
        toy._resource = resource;
        return toy;
    }

    preUpdate = new EventTarget<number>();

    private _input: Input;
    get input() { return this._input; }

    private _screen: ToyScreen;
    get screen() { return this._screen; }

    private _timer: Timer;
    get timer() { return this._timer; }

    private _scene: InterScene;
    get scene() { return this._scene; }

    private _resource: Resource;
    get resource() { return this._resource; }
}
