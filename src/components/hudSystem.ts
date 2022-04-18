import { Hud } from "./hud";
import { World } from "../scene/world";
import { DefaultGeometry, DefaultMaterial, TextureAsset } from "../resources/index";
import { mat4, quat, vec3 } from "../mathD";
import { Entity, System } from "../scene/index";
import { TextureWrapEnum } from "../render";

export class HudSystem extends System {
    caries = { comps: [Hud] };
    private context2d: CanvasRenderingContext2D;
    private _scene: World;
    constructor(scene: World, canvas: HTMLCanvasElement, options?: HudOptions) {
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
        const rot = mat4.getRotation(quat.create(), mainCamera.worldMatrix);

        this.queries.comps.forEach((node) => {
            const hud = node.getComponent(Hud);
            let { command, rect, entity, _mat, _text2d } = hud;
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
                command(this.context2d);
                const imagedata = this.context2d.getImageData(rect.x, rect.y, rect.width, rect.height);
                hud._text2d = _text2d = TextureAsset.fromImageSource({
                    image: imagedata,
                    flipY: true,
                    wrapT: TextureWrapEnum.CLAMP_TO_EDGE
                });

                if (_mat == null) {
                    hud._mat = _mat = DefaultMaterial.unlit_3d.clone();
                    _mat.renderState.blend.enabled = true;
                }
                _mat.setUniform("MainTex", _text2d);
                hud.entity.localScale = vec3.clone(hud.size);
            }
            if (_mat && _text2d) {
                this._scene.addFrameRenderIns({
                    geometry: DefaultGeometry.quad,
                    material: _mat,
                    worldMat: mat4.fromRotationTranslationScale(mat4.create(), rot, entity.worldPosition, entity.worldScale)
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
