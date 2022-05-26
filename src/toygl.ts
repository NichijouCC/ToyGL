import { Timer } from "./core/timer";
import { World, ISceneOptions } from "./scene/world";
import { Resource } from "./resources";
import { LoadGlTF } from "./loader/loadGltf";
import { ForwardRender } from "./render/index";
import { EventTarget } from "@mtgoo/ctool";
import { AnimationSystem, ModelSystem, CameraSystem } from "./components/index";
import { ISystem } from "./core/ecs";

export class ToyGL {
    onresize = new EventTarget<{ width: number, height: number }>();
    static create(element: HTMLDivElement | HTMLCanvasElement, options?: ISceneOptions): ToyGL {
        const toy = new ToyGL();
        const timer = new Timer();
        const resource = new Resource();
        const scene = new World(element, options);
        resource.registLoaderWithExt(".gltf", new LoadGlTF(scene));
        resource.registLoaderWithExt(".glb", new LoadGlTF(scene));
        scene.addSystem(new CameraSystem(scene));
        scene.addSystem(new AnimationSystem());
        scene.addSystem(new ModelSystem(scene), Number.POSITIVE_INFINITY);
        timer.onTick.addEventListener(scene.update);
        toy._timer = timer;
        toy._world = scene;
        toy._resource = resource;
        return toy;
    }

    private _timer: Timer;
    get timer() { return this._timer; }

    private _render: ForwardRender;
    get render() { return this._world.render; }

    private _world: World;
    get world() { return this._world; }

    private _resource: Resource;
    get resource() { return this._resource; }
    addSystem(system: ISystem, priority?: number) {
        this._world?.addSystem(system, priority);
    }
}
