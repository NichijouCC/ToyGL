import { Geometry } from "./Geometry";
import { Mat4 } from "../mathD/mat4";
import { GeometryAttribute } from "./GeometryAttribute";

export class GeometryInstance {
    geometry: Geometry;
    modelMatrix: Mat4;
    attributes: { [keyName: string]: GeometryAttribute };
    readonly id: number;
    constructor(options: IgeometryInstanceOption) {
        this.geometry = options.geometry;
        this.attributes = options.attributes;
        this.id = options.id;
        this.modelMatrix = options.modelMatrix || Mat4.identity();
    }
}

export interface IgeometryInstanceOption {
    geometry: Geometry;
    modelMatrix?: Mat4;
    attributes?: { [keyName: string]: GeometryAttribute };
    id: number;
}
