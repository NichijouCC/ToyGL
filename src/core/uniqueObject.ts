import { UUID } from "@mtgoo/ctool";

export class UniqueObject {
    readonly id: string;
    protected ctorName: string;
    constructor() {
        this.id = UUID.create_v4();
        this.ctorName = this.constructor.name;
    }
}
