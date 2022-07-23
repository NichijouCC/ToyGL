import { AnimationSystem, CameraSystem, ISceneOptions, ModelSystem, Resource, Timer, World } from "./index";
import { EventTarget } from "@mtgoo/ctool";
import { LoadGlTF } from "./extends/glTF";
export * from "./extends/index";
export * from "./index";

export class ToyGL {
    onresize = new EventTarget<{ width: number, height: number }>();
    static create(element: HTMLDivElement | HTMLCanvasElement, options?: ISceneOptions): ToyGL {
        const toy = new ToyGL();
        const world = new World(element, options);
        toy._world = world;
        world.addSystem(new CameraSystem(world));
        world.addSystem(new AnimationSystem());
        world.addSystem(new ModelSystem(world), Number.POSITIVE_INFINITY);

        const resource = new Resource();
        let loader = new LoadGlTF();
        resource.registLoaderWithExt(".gltf", loader);
        resource.registLoaderWithExt(".glb", loader);
        toy._resource = resource;

        const timer = new Timer();
        timer.onTick.addEventListener(world.update);
        toy._timer = timer;

        return toy;
    }

    private _timer: Timer;
    get timer() { return this._timer; }

    private _world: World;
    get world() { return this._world; }

    private _resource: Resource;
    get resource() { return this._resource; }
}
