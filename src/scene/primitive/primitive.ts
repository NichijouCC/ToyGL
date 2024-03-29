import { GeometryInstance } from "./geometryInstance";
import { Geometry } from "../../render/geometry";
import { mat4 } from "../../mathD";
import { IRenderable } from "../../render/irenderable";
import { VertexArray } from "../../render";

/**
 * @example
 * // 1. Draw a translucent ellipse on the surface with a checkerboard pattern
 * var instance = new GeometryInstance({
 *   geometry : new EllipseGeometry({
 *       center : Cartesian3.fromDegrees(-100.0, 20.0),
 *       semiMinorAxis : 500000.0,
 *       semiMajorAxis : 1000000.0,
 *       rotation : Math.PI_OVER_FOUR,
 *       vertexFormat : VertexFormat.POSITION_AND_ST
 *   }),
 *   id : 'object returned when this instance is picked and to get/set per-instance attributes'
 * });
 * scene.primitives.add(new Primitive({
 *   geometryInstances : instance,
 *   appearance : new EllipsoidSurfaceAppearance({
 *     material : Material.fromType('Checkerboard')
 *   })
 * }));
 *
 * @example
 * // 2. Draw different instances each with a unique color
 * var rectangleInstance = new GeometryInstance({
 *   geometry : new RectangleGeometry({
 *     rectangle : Rectangle.fromDegrees(-140.0, 30.0, -100.0, 40.0),
 *     vertexFormat : PerInstanceColorAppearance.VERTEX_FORMAT
 *   }),
 *   id : 'rectangle',
 *   attributes : {
 *     color : new ColorGeometryInstanceAttribute(0.0, 1.0, 1.0, 0.5)
 *   }
 * });
 * var ellipsoidInstance = new GeometryInstance({
 *   geometry : new EllipsoidGeometry({
 *     radii : new Cartesian3(500000.0, 500000.0, 1000000.0),
 *     vertexFormat : VertexFormat.POSITION_AND_NORMAL
 *   }),
 *   modelMatrix : Matrix4.multiplyByTranslation(Transforms.eastNorthUpToFixedFrame(
 *     Cartesian3.fromDegrees(-95.59777, 40.03883)), new Cartesian3(0.0, 0.0, 500000.0), new Matrix4()),
 *   id : 'ellipsoid',
 *   attributes : {
 *     color : ColorGeometryInstanceAttribute.fromColor(Color.AQUA)
 *   }
 * });
 * scene.primitives.add(new Primitive({
 *   geometryInstances : [rectangleInstance, ellipsoidInstance],
 *   appearance : new PerInstanceColorAppearance()
 * }));
 *
 * @example
 * // 3. Create the geometry on the main thread.
 * scene.primitives.add(new Primitive({
 *   geometryInstances : new GeometryInstance({
 *       geometry : EllipsoidGeometry.createGeometry(new EllipsoidGeometry({
 *         radii : new Cartesian3(500000.0, 500000.0, 1000000.0),
 *         vertexFormat : VertexFormat.POSITION_AND_NORMAL
 *       })),
 *       modelMatrix : Matrix4.multiplyByTranslation(Transforms.eastNorthUpToFixedFrame(
 *         Cartesian3.fromDegrees(-95.59777, 40.03883)), new Cartesian3(0.0, 0.0, 500000.0), new Matrix4()),
 *       id : 'ellipsoid',
 *       attributes : {
 *         color : ColorGeometryInstanceAttribute.fromColor(Color.AQUA)
 *       }
 *   }),
 *   appearance : new PerInstanceColorAppearance()
 * }));
 */
export class Primitive {
    private _geometryInstances: GeometryInstance[];
    private geometryDirty: boolean = false;
    set geometryInstances(value: GeometryInstance[]) {
        this._geometryInstances = value;
        this.geometryDirty = true;
    }

    get geometryInstances() {
        return this._geometryInstances;
    }

    _batchedGeometries: Geometry;

    private _appearance: any;
    private appearanceDirty: boolean = false;
    set appearance(value: any) {
        if (this._appearance != value) {
            this.appearanceDirty = true;
        }
        this._appearance = value;
    }

    modelMatrix: mat4;

    show: boolean;
    interleave: boolean;
    vertexCacheOptimize: boolean;
    cull: boolean;
    private drawCommand: any[];
    vas: VertexArray;
    constructor(option: Primitive) {
        this.geometryInstances = option.geometryInstances;
        this.appearance = option.appearance;
        this.modelMatrix = option.modelMatrix || mat4.create();
        this.show = option.show ?? true;
        this.interleave = option.interleave ?? false;
        this.vertexCacheOptimize = option.vertexCacheOptimize ?? false;
        this.cull = option.cull ?? true;
    }

    update(frameState: any) {

    }
}

function batchPrimitive(primitive: Primitive) {
    const insArr = primitive.geometryInstances.map(ins => {
        // step1: clone ins  todo
        const cloneIns = ins;
        // step2: 变换顶点数据
        // return GeometryPipeline.transformToWorldCoordinates(cloneIns);
    });
    // step3: 合并ins todo
    // let batchGeometry = GeometryPipeline.combineGeometryInstances(insArr);

    // return batchGeometry
}

export interface IPrimitiveOption {
    geometryInstances: GeometryInstance | GeometryInstance[];
    appearance?: any;
    modelMatrix?: mat4;

    show?: boolean;
    interleave?: boolean;
    vertexCacheOptimize?: boolean;
    cull?: boolean;
}
