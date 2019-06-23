import { Scene } from "./scene";
import { Transform } from "../ec/components/transform";

export class SceneMgr {
    activeScene: Scene;
    loadLevel(url: string) {}

    update(deltatime: number) {
        if (!this.activeScene) return false;
        let roots = this.activeScene.getRootTransforms();

        //----------update
        for (let i = 0; i < roots.length; i++) {
            this._updateNode(roots[i], deltatime);
        }
        //----------render
    }

    private _updateNode(node: Transform, deltatime: number) {
        let entity = node.entity;
        if (!entity.beActive) return;

        for (const key in node.entity.components) {
            node.entity.components[key].update(deltatime);
        }
        for (let i = 0, len = node.children.length; i < len; i++) {
            this._updateNode(node.children[i], deltatime);
        }
    }
}
