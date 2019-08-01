import { RenderContext } from "./renderContext";
import { Mat4 } from "../mathD/mat4";
import { Vec3 } from "../mathD/vec3";

export class AutoUniform {
    private uniformDic: { [name: string]: () => any } = {};
    private renderContext: RenderContext;
    constructor(renderContext: RenderContext) {
        this.renderContext = renderContext;
        this.init();
    }
    private init() {
        this.uniformDic["u_mat_m"] = () => {
            return this.renderContext.matrixModel;
        };
        this.uniformDic["u_mat_v"] = () => {
            return this.renderContext.matrixView;
        };
        this.uniformDic["u_mat_p"] = () => {
            return this.renderContext.matrixProject;
        };
        this.uniformDic["u_mat_mv"] = () => {
            return this.renderContext.matrixModelView;
        };
        this.uniformDic["u_mat_vp"] = () => {
            return this.renderContext.matrixViewProject;
        };
        this.uniformDic["u_mat_mvp"] = () => {
            return this.renderContext.matrixModelViewProject;
        };

        this.uniformDic["u_mat_normal"] = () => {
            // console.warn(Mat4.transformPoint(Vec3.FORWARD, this.renderContext.matrixNormalToView, Vec3.create()));
            return this.renderContext.matrixNormalToView;
        };

        this.uniformDic["u_fov"] = () => {
            return this.renderContext.curCamera.fov;
        };
        this.uniformDic["u_aspect"] = () => {
            return this.renderContext.curCamera.aspect;
        };
        this.uniformDic["u_cameraNear"] = () => {
            return this.renderContext.curCamera.near;
        };
        this.uniformDic["u_cameraFar"] = () => {
            return this.renderContext.curCamera.far;
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

    get autoUniforms() {
        return this.uniformDic;
    }
}
