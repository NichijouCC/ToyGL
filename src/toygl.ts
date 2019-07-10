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
    render: RenderMachine;
    get scene(): Scene {
        return this._defScene;
    }
    // setupRender(canvas: HTMLCanvasElement) {}
    private _defScene: Scene;
    scenes: Scene[] = [];
    static initByHtmlElement(element: HTMLDivElement | HTMLCanvasElement): ToyGL {
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

        GameScreen.init(canvas);

        let toy = new ToyGL();
        toy.render = new RenderMachine(canvas);
        toy._defScene = toy.createScene();

        new GameTimer().tick = deltaTime => {
            GameScreen.update();
            toy.scenes.forEach(scene => {
                scene.update(deltaTime);
            });
        };
        return toy;
    }

    createScene(priority: number = null): Scene {
        if (priority == null) {
            let newscene = new Scene(
                this.render,
                this.scenes.length > 0 ? this.scenes[this.scenes.length - 1].priority + 1 : 0,
            );
            this.scenes.push(newscene);
            return newscene;
        } else {
            let newscene = new Scene(this.render, priority);
            this.scenes.push(newscene);
            this.scenes.sort((a, b) => {
                return a.priority - b.priority;
            });
            return newscene;
        }
    }
}
