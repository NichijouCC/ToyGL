import { Timer } from "./core/timer";
import { InterScene, ISceneOptions } from "./scene/scene";
import { Resource } from "./resources";
import { LoadGlTF } from "./loader/loadGltf";
import { ECS } from "./core/ecs/ecs";
import { ForwardRender } from "./render/index";
import { EventTarget } from "@mtgoo/ctool";
import { AnimationSystem, ModelSystem, CameraSystem } from "./components/index";

export class ToyGL {
    onresize = new EventTarget<{ width: number, height: number }>();
    static create(element: HTMLDivElement | HTMLCanvasElement, options?: ISceneOptions): ToyGL {
        const toy = new ToyGL();
        const timer = new Timer();
        const resource = new Resource();
        resource.registLoaderWithExt(".gltf", new LoadGlTF());
        resource.registLoaderWithExt(".glb", new LoadGlTF());
        const scene = new InterScene(element, options);
        ECS.addSystem(new CameraSystem(scene));
        ECS.addSystem(new AnimationSystem());
        ECS.addSystem(new ModelSystem(scene), Number.POSITIVE_INFINITY);

        timer.onTick.addEventListener(scene.update);
        toy._timer = timer;
        toy._scene = scene;
        toy._resource = resource;
        return toy;
    }

    private _timer: Timer;
    get timer() { return this._timer; }

    private _render: ForwardRender;
    get render() { return this._render; }

    private _scene: InterScene;
    get scene() { return this._scene; }

    private _resource: Resource;
    get resource() { return this._resource; }
    addSystem = ECS.addSystem.bind(ECS);
}
