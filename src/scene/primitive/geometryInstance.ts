import { Geometry } from "../render/geometry";
import { TypedArray } from "../../core/typedArray";

/**
 * @example
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
    constructor(options: IGeometryInstanceOption) {
        this.geometry = options.geometry;
        this.attributes = options.attributes;
        this.id = options.id;
    }
}

export interface IGeometryInstanceOption {
    geometry: Geometry;
    attributes?: { [keyName: string]: TypedArray };
    id: number;
}
