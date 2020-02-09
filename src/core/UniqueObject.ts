import { createGuid } from "./Utils";

export class UniqueObject
{
    readonly id: string;
    protected name: string;
    constructor()
    {
        this.id = createGuid();
        this.name = this.constructor.name;
    }
}