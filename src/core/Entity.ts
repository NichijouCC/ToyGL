import { Icomponent, Ecs, Ientity, UniteBitkey } from "./Ecs";
import { Transform } from "./Transform";
import { EventHandler } from "./Event";

namespace Private
{
    export let id = 0;
}

export class Entity extends Transform implements Ientity
{
    name: string;
    private _beActive: boolean = true;
    get beActive() { return this._beActive };
    set beActive(value: boolean)
    {
        if (this._beActive != value)
        {
            this._beActive = value;
            this.onChangeActiveState.raiseEvent(this._beActive);
            this.traverseChild((node) => { node._beActive = value });
        }
    }
    onChangeActiveState = new EventHandler();
    readonly id: number;
    constructor(name?: string)
    {
        super();
        this.name = name;
        this.id = Private.id++;
    }
    _uniteBitkey: UniteBitkey = new UniteBitkey();
    addComponent(comp: string): Icomponent
    {
        let newComp = Ecs.addComp(this, comp);
        return newComp;
    }
    removeComponent(comp: string): void
    {
        Ecs.removeComp(this, comp);
    }

    traverseChild(func: (node: Entity) => any)
    {
        let child;
        for (let i = 0; i < this.children.length; i++)
        {
            child = this.children[i] as Entity;
            func(child);
            child.traverseChild(func);
        }
    }

    clone(): Entity
    {
        //TODO
        return new Entity();
    }
}
