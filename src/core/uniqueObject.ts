import { createGuid } from "./utils";

export class UniqueObject {
    readonly id: string;
    protected ctorName: string;
    constructor() {
        this.id = createGuid();
        this.ctorName = this.constructor.name;
    }
}
