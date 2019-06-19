import { Entity } from "../ec/entity";
import { Camera } from "../ec/components/camera";
import { Transform } from "../ec/components/transform";
import { SceneMgr } from "./sceneMgr";

export class Scene {
    name: string;
    private root: Transform = new Transform();

    newEntity(name: string = null, compsArr: string[] = null): Entity {
        let newobj = new Entity(name, compsArr);
        this.addEntity(newobj);
        return newobj;
    }

    addEntity(entity: Entity) {
        this.root.addChild(entity.transform);
    }

    getRootTransforms() {
        return this.root.children;
    }
}
