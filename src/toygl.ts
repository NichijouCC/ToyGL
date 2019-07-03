import { Resource, AssetLoader } from "./resources/resource";
// import { IassetMgr } from "./resources/type";
import { RenderMachine } from "./render/renderMachine";
import { GameScreen } from "./gameScreen";
import { Scene } from "./scene/scene";
import { GlRender } from "./render/glRender";
import { Input } from "./input/Inputmgr";
import { GameTimer } from "./gameTimer";
export class ToyGL {
    // assetMgr: IassetMgr;
    scene: Scene;
    // setupRender(canvas: HTMLCanvasElement) {}

    static initByHtmlElement(element: HTMLDivElement | HTMLCanvasElement):ToyGL {
        let canvas: HTMLCanvasElement;
        if (element instanceof HTMLDivElement) {
            canvas = document.createElement("canvas");
            canvas.width = element.clientWidth;
            canvas.width = element.clientHeight;

            element.appendChild(canvas);
            canvas.style.width = "100%";
            canvas.style.height = "100%";
        } else {
            canvas = element;
        }
        Input.init(canvas);

        let render = new RenderMachine(canvas);
        let scene = new Scene(render);
        GameScreen.init(canvas);

        new GameTimer().tick = deltaTime => {
            scene.update(deltaTime);
        };

        let toy=new ToyGL();
        toy.scene=scene;
        return toy;
    }
}




