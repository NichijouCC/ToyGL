import { GeometryInstance } from "./GeometryInstance";
import { Mat4 } from "../mathD/mat4";
import { FrameState } from "./FrameState";
import { DrawCommand } from "./DrawCommand";
import { IvertexArray } from "../webgl/Ibase";

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
        if ()

    }
}

export interface IprimitiveOption {
    geometryInstances: GeometryInstance | GeometryInstance[];
    appearance?: any;
    modelMatrix?: Mat4;

    show?: boolean;
    interleave?: boolean;
    vertexCacheOptimize?: boolean;
    cull?: boolean;
}
