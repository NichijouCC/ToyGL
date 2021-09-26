import { Shader, IShaderOption } from "./shader";
import { RenderTypeEnum } from "./renderLayer";
import { RenderState } from "./renderState";
import { Asset } from "../scene/asset/asset";

export class Material extends Asset {
    static totalCount: number = 0;
    uniformParameters: { [name: string]: any } = {};

    private _shader: Shader;
    readonly create_id: number;
    get shader() { return this._shader; };
    set shader(value: Shader) { this._shader = value; };
    renderState = new RenderState();

    /**
     * 用于覆盖shader renderType,默认：undefined
     */
    customRenderType: RenderTypeEnum;
    /**
     * 用于覆盖shader SortOrder，默认：undefined
     */
    customSortOrder: number;
    get renderType() { return this.customRenderType ?? this.shader?.renderType }
    get sortOrder() { return this.customSortOrder ?? this.shader?.sortOrder }

    constructor(options?: IMatOption) {
        super();
        this.name = options?.name;
        this.create_id = Material.totalCount++;

        if (options?.shader != null) {
            if (options?.shader instanceof Shader) {
                this.shader = options.shader;
            } else {
                this.shader = new Shader(options.shader);
            }
        }
        if (options?.uniformParameters) {
            this.uniformParameters = { ...options.uniformParameters };
        }
    }

    setUniformParameter(uniformKey: string, value: any) {
        this.uniformParameters[uniformKey] = value;
    }

    destroy(): void {
        throw new Error("Method not implemented.");
    }

    clone() {
        const mat = new Material();
        mat.shader = this.shader;
        mat.customRenderType = this.customRenderType;
        mat.customSortOrder = this.customSortOrder;
        mat.renderState = JSON.parse(JSON.stringify(this.renderState));
        for (const key in this.uniformParameters) {
            mat.uniformParameters[key] = this.uniformParameters[key];
        }
        return mat;
    }
}

export interface IMatOption {
    name?: string;
    uniformParameters?: { [name: string]: any };
    shader?: IShaderOption | Shader;
}
