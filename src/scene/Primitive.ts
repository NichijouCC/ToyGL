import { GeometryInstance } from "../core/GeometryInstance";
import { Mat4 } from "../mathD/mat4";
import { FrameState } from "../render_V2/FrameState";
import { DrawCommand } from "../render_V2/DrawCommand";
import { IvertexArray } from "../webgl/Ibase";


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
    private _geometryInstances: GeometryInstance | GeometryInstance[];
    private geometryDirty: boolean = false;
    set geometryInstances(value: GeometryInstance | GeometryInstance[]) {
        if (this._geometryInstances != value) {
            this.geometryDirty = true;
        } else {
            if (value instanceof Array && this._geometryInstances instanceof Array) {
                if (value.length != this._geometryInstances.length) {
                    this.geometryDirty = true;
                } else {
                    for (let i = 0; i < value.length; i++) {
                        if (value[i] != this._geometryInstances[i]) {
                            this.geometryDirty = true;
                            break;
                        }
                    }
                }
            }
        }
        this._geometryInstances = value;
    }
    private _appearance: any;
    private appearanceDirty: boolean = false;
    set appearance(value: any) {
        if (this._appearance != value) {
            this.appearanceDirty = true;
        }
        this._appearance = value;
    }
    modelMatrix: Mat4;

    show: boolean;
    interleave: boolean;
    vertexCacheOptimize: boolean;
    cull: boolean;
    private drawCommand: DrawCommand[];
    private _va: IvertexArray;
    constructor(option: Primitive) {
        this.geometryInstances = option.geometryInstances;
        this.appearance = option.appearance;
        this.modelMatrix = option.modelMatrix || Mat4.identity();
        // eslint-disable-next-line prettier/prettier
        this.show = option.show ?? true;
        this.interleave = option.interleave ?? false;
        this.vertexCacheOptimize = option.vertexCacheOptimize ?? false;
        this.cull = option.cull ?? true;
    }

    update(frameState: FrameState) {
        //----------------------------------------------------
        //                  load batch createvao
        //----------------------------------------------------



        //------------check show



        //----------------------------------------------------
        //                draw commond      
        //----------------------------------------------------
        if (this.appearanceDirty) {
            //creat shader program
        }
    }
}


// export function createVertexArray(primitive:Primitive, frameState:FrameState) {
//     var attributeLocations = primitive._attributeLocations;
//     var geometries = primitive._geometries;
//     var scene3DOnly = frameState.scene3DOnly;
//     var context = frameState.context;

//     var va = [];
//     var length = geometries.length;
//     for (var i = 0; i < length; ++i) {
//         var geometry = geometries[i];

//         va.push(VertexArray.fromGeometry({
//             context : context,
//             geometry : geometry,
//             attributeLocations : attributeLocations,
//             bufferUsage : BufferUsage.STATIC_DRAW,
//             interleave : primitive._interleave
//         }));

//         if (defined(primitive._createBoundingVolumeFunction)) {
//             primitive._createBoundingVolumeFunction(frameState, geometry);
//         } else {
//             primitive._boundingSpheres.push(BoundingSphere.clone(geometry.boundingSphere));
//             primitive._boundingSphereWC.push(new BoundingSphere());

//             if (!scene3DOnly) {
//                 var center = geometry.boundingSphereCV.center;
//                 var x = center.x;
//                 var y = center.y;
//                 var z = center.z;
//                 center.x = z;
//                 center.y = x;
//                 center.z = y;

//                 primitive._boundingSphereCV.push(BoundingSphere.clone(geometry.boundingSphereCV));
//                 primitive._boundingSphere2D.push(new BoundingSphere());
//                 primitive._boundingSphereMorph.push(new BoundingSphere());
//             }
//         }
//     }

//     primitive._va = va;
//     primitive._primitiveType = geometries[0].primitiveType;

//     if (primitive.releaseGeometryInstances) {
//         primitive.geometryInstances = undefined;
//     }

//     primitive._geometries = undefined;
//     setReady(primitive, frameState, PrimitiveState.COMPLETE, undefined);
// }


export interface IprimitiveOption {
    geometryInstances: GeometryInstance | GeometryInstance[];
    appearance?: any;
    modelMatrix?: Mat4;

    show?: boolean;
    interleave?: boolean;
    vertexCacheOptimize?: boolean;
    cull?: boolean;
}
