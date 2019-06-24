import { RenderContext } from "./renderContext";

export class AutoUniform {
    private AutoUniformDic: { [name: string]: () => any } = {};
    private renderContext: RenderContext;
    constructor(renderContext: RenderContext) {
        this.renderContext = renderContext;
        this.init();
    }
    private init() {
        this.AutoUniformDic["u_mat_model"] = () => {
            return this.renderContext.matrixModel;
        };
        this.AutoUniformDic["u_mat_view"] = () => {
            return this.renderContext.matrixView;
        };
        this.AutoUniformDic["u_mat_project"] = () => {
            return this.renderContext.matrixProject;
        };
        this.AutoUniformDic["u_mat_ModelView"] = () => {
            return this.renderContext.matrixModelView;
        };
        this.AutoUniformDic["u_mat_viewproject"] = () => {
            return this.renderContext.matrixViewProject;
        };
        this.AutoUniformDic["u_mat_mvp"] = () => {
            return this.renderContext.matrixModelViewProject;
        };

        this.AutoUniformDic["u_mat_normal"] = () => {
            return this.renderContext.matrixNormalToworld;
        };

        // this.AutoUniformDic["u_timer"] = () => {
        //     return GameTimer.Time;
        // };

        // this.AutoUniformDic["u_campos"] = () => {
        //     return renderContext.campos;
        // };
        // this.AutoUniformDic["u_LightmapTex"] = () => {
        //     return renderContext.lightmap[renderContext.lightmapIndex];
        // };
        // this.AutoUniformDic["u_lightmapOffset"] = () => {
        //     return renderContext.lightmapTilingOffset;
        // };
        // this.AutoUniformDic["u_lightposs"] = () => {
        //     return renderContext.vec4LightPos;
        // };
        // this.AutoUniformDic["u_lightdirs"] = () => {
        //     return renderContext.vec4LightDir;
        // };
        // this.AutoUniformDic["u_spotangelcoss"] = () => {
        //     return renderContext.floatLightSpotAngleCos;
        // };
        // this.AutoUniformDic["u_jointMatirx"] = () => {
        //     return renderContext.jointMatrixs;
        // };
    }

    get AutoUniforms() {
        return this.AutoUniformDic;
    }
}
