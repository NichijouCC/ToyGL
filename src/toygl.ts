import { Screen } from "./core/Screen";
import { Input } from "./input/Input";
import { Timer } from "./core/Timer";
import { InterScene } from "./scene/Scene";
import { GraphicsDevice } from "./webgl/GraphicsDevice";
import { Resource } from "./resources/resource";
import { LoadGlTF } from "./resources/loader/LoadglTF";
import { Ecs } from "./core/Ecs";
import { ModelSystem } from "./components/ModelSystem";
import { Render } from "./scene/Render";
export class ToyGL
{
    static create(element: HTMLDivElement | HTMLCanvasElement): ToyGL
    {
        let canvas: HTMLCanvasElement;
        if (element instanceof HTMLDivElement)
        {
            canvas = document.createElement("canvas");
            canvas.width = element.clientWidth;
            canvas.width = element.clientHeight;

            element.appendChild(canvas);
            element.onresize = () =>
            {
                canvas.width = element.clientWidth;
                canvas.width = element.clientHeight;
            }
        } else
        {
            canvas = element;
        }

        let toy = new ToyGL();
        let timer = new Timer();
        let input = new Input(canvas);
        let screen = new Screen(canvas);
        let device = new GraphicsDevice(canvas);
        let render = new Render(device);
        let resource = new Resource();
        let scene = new InterScene(render);
        resource.registerAssetLoader(".gltf", new LoadGlTF(device));
        Ecs.addSystem(new ModelSystem(scene))

        timer.onTick.addEventListener((deltaTime) =>
        {
            scene.frameUpdate(deltaTime);
        })

        toy._timer = timer;
        toy._input = input;
        toy._screen = screen;
        toy._scene = scene;
        toy._resource = resource;

        return toy;
    }
    private _input: Input;
    get input() { return this._input }

    private _screen: Screen;
    get screen() { return this._screen }

    private _timer: Timer;
    get timer() { return this._timer }

    private _scene: InterScene;
    get scene() { return this._scene }

    private _resource: Resource;
    get resource() { return this._resource }
}
