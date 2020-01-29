import { Geometry } from "./Geometry";
import { Mat4 } from "../mathD/mat4";
import { GeometryAttribute } from "./GeometryAttribute";
import { TypedArray } from "./TypedArray";

/**
 * @example
 * // Create geometry for a box, and two instances that refer to it.
 * // One instance positions the box on the bottom and colored aqua.
 * // The other instance positions the box on the top and color white.
 * var geometry = BoxGeometry.fromDimensions({
 *   vertexFormat : VertexFormat.POSITION_AND_NORMAL,
 *   dimensions : new Cartesian3(1000000.0, 1000000.0, 500000.0)
 * });
 * var instanceBottom = new GeometryInstance({
 *   geometry : geometry,
 *   attributes : {
 *     color : ColorGeometryInstanceAttribute.fromColor(Color.AQUA)
 *   },
 *   id : 'bottom'
 * });
 * var instanceTop = new GeometryInstance({
 *   geometry : geometry,
 *   attributes : {
 *     color : ColorGeometryInstanceAttribute.fromColor(Color.AQUA)
 *   },
 *   id : 'top'
 * }); 
 *
 */
export class GeometryInstance {
    readonly geometry: Geometry;
    attributes: { [keyName: string]: TypedArray };
    readonly id: number;
    constructor(options: IgeometryInstanceOption) {
        this.geometry = options.geometry;
        this.attributes = options.attributes;
        this.id = options.id;
    }
}

export interface IgeometryInstanceOption {
    geometry: Geometry;
    attributes?: { [keyName: string]: TypedArray };
    id: number;
}
