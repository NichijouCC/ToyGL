import { BassCompSystem } from "./bassCompSystem";
import { Hud } from "./hud";
import { InterScene } from "../scene/scene";
import { DefaultGeometry, DefaultMaterial } from "../resources/index";
import { Mat4 } from "../mathD/mat4";
import { Quat } from "../mathD/quat";
import { TextureAsset } from "../scene/index";
import { Vec3 } from "../mathD/vec3";
import { TextureFilterEnum, TextureWrapEnum } from "../webgl/index";

export class HudSystem extends BassCompSystem<Hud> {
    careCompCtors: (new () => Hud)[] = [Hud];
    private context2d: CanvasRenderingContext2D;
    private _scene: InterScene;
    constructor(scene: InterScene, canvas: HTMLCanvasElement, options?: HudOptions) {
        super();
        this._scene = scene;
        if (this.context2d == null) {
            const parent = canvas.parentElement;
            const canvas2d = parent.appendChild(document.createElement("canvas"));
            this.context2d = canvas2d.getContext("2d");
            const { fontOps, style } = options || {};
            if (style) {
                for (const key in style) {
                    canvas2d.style[key] = style[key];
                }
            }
            this.context2d.font = fontOps?.font ?? "Normal 40px Arial";
            this.context2d.textAlign = fontOps?.textAlign ?? "left";
            this.context2d.fillStyle = fontOps?.fillStyle ?? "rgba(245,245,245,0.75)";
            this.context2d.save();
        }
    }

    update(deltaTime: number) {
        const { mainCamera } = this._scene;
        const rot = Mat4.getRotation(mainCamera.worldMatrix, new Quat());

        this.comps.forEach(([hud]) => {
            let { commond, rect, entity, _mat, _text2d } = hud;
            if (hud._contentDirty) {
                hud._contentDirty = false;
                if (this.context2d.canvas.width < rect.x + rect.width) {
                    this.context2d.canvas.width = rect.x + rect.width;
                }
                if (this.context2d.canvas.height < rect.y + rect.height) {
                    this.context2d.canvas.height = rect.y + rect.height;
                }

                this.context2d.restore();
                this.context2d.clearRect(rect.x, rect.y, rect.width, rect.height);
                commond(this.context2d);
                const imagedata = this.context2d.getImageData(rect.x, rect.y, rect.width, rect.height);
                hud._text2d = _text2d = TextureAsset.fromImageSource({
                    image: imagedata,
                    flipY: true,
                    sampler: {
                        wrapT: TextureWrapEnum.CLAMP_TO_EDGE
                    }
                });

                if (_mat == null) {
                    hud._mat = _mat = DefaultMaterial.tex_3d.clone();
                    _mat.renderState.blend.enabled = true;
                }
                _mat.setUniformParameter("MainTex", _text2d);
                hud.entity.localScale = Vec3.clone(hud.size);
            }
            if (_mat && _text2d) {
                this._scene.addRenderIns({
                    geometry: DefaultGeometry.quad,
                    material: _mat,
                    worldMat: Mat4.RTS(entity.worldPosition, entity.worldScale, rot, new Mat4())
                });
            }
        });
    }
}

interface HudOptions {
    fontOps?: {
        font: string,
        textAlign: CanvasTextAlign,
        fillStyle: string | CanvasGradient | CanvasPattern;
    },
    style?: Partial<CSSStyleDeclaration>
}
