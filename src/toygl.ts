import { Screen } from "./core/Screen";
import { Input } from "./input/Input";
import { Timer } from "./core/Timer";
import { Scene } from "./scene/Scene";
import { GraphicsDevice } from "./webgl/GraphicsDevice";
import { Resource } from "./resources/resource";
import { LoadGlTF } from "./resources/loader/LoadglTF";
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
        let render = new GraphicsDevice(canvas);
        let resource = new Resource();

        resource.registerAssetLoader(".gltf", new LoadGlTF(render));
        timer.onTick.addEventListener((deltaTime) =>
        {

        })

        toy._timer = timer;
        toy._input = input;
        toy._screen = screen;

        return toy;
    }
    private _input: Input;
    get input() { return this._input }

    private _screen: Screen;
    get screen() { return this._screen }

    private _timer: Timer;
    get timer() { return this._timer }
}
