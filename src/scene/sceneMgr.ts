import { Scene } from "./scene";

export class SceneMgr {
    activeScene: Scene;
    loadLevel(url: string) {}

    update(deltatime: number) {
        if (!this.activeScene) return false;
        let roots = this.activeScene.getRootTransforms();
        for (let i = 0; i < roots.length; i++) {
            roots[i].entity.update(deltatime);
        }
    }
}
