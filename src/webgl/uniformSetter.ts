import { GraphicsDevice } from "./graphicsDevice";
import { UniformTypeEnum } from "./uniformType";
import { IUniformInfo } from "./shaderProgram";
import { Texture } from "src";

export class UniformSetter {
    static uniformSetter: { [uniformType: string]: (uniform: any, value: any, unit?: number) => void } = {};
    static get(uniformType: UniformTypeEnum) {
        return this.uniformSetter[uniformType];
    }

    static init(context: GraphicsDevice) {
        const { gl } = context;
        var scopeX, scopeY, scopeZ, scopeW;
        var uniformValue;
        this.uniformSetter[UniformTypeEnum.BOOL] = (uniform: IUniformInfo, value) => {
            if (uniform.value !== value) {
                gl.uniform1i(uniform.location, value);
                uniform.value = value;
            }
        };
        this.uniformSetter[UniformTypeEnum.INT] = this.uniformSetter[UniformTypeEnum.BOOL];
        this.uniformSetter[UniformTypeEnum.FLOAT] = (uniform: IUniformInfo, value) => {
            if (uniform.value !== value) {
                gl.uniform1f(uniform.location, value);
                uniform.value = value;
            }
        };
        this.uniformSetter[UniformTypeEnum.FLOAT_VEC2] = (uniform: IUniformInfo, value) => {
            uniformValue = uniform.value;
            scopeX = value[0];
            scopeY = value[1];
            if (uniformValue[0] !== scopeX || uniformValue[1] !== scopeY) {
                gl.uniform2fv(uniform.location, value);
                uniformValue[0] = scopeX;
                uniformValue[1] = scopeY;
            }
        };
        this.uniformSetter[UniformTypeEnum.FLOAT_VEC3] = (uniform: IUniformInfo, value) => {
            uniformValue = uniform.value;
            scopeX = value[0];
            scopeY = value[1];
            scopeZ = value[2];
            if (uniformValue[0] !== scopeX || uniformValue[1] !== scopeY || uniformValue[2] !== scopeZ) {
                gl.uniform3fv(uniform.location, value);
                uniformValue[0] = scopeX;
                uniformValue[1] = scopeY;
                uniformValue[2] = scopeZ;
            }
        };
        this.uniformSetter[UniformTypeEnum.FLOAT_VEC4] = (uniform: IUniformInfo, value) => {
            uniformValue = uniform.value;
            scopeX = value[0];
            scopeY = value[1];
            scopeZ = value[2];
            scopeW = value[3];
            if (uniformValue[0] !== scopeX || uniformValue[1] !== scopeY || uniformValue[2] !== scopeZ || uniformValue[3] !== scopeW) {
                gl.uniform4fv(uniform.location, value);
                uniformValue[0] = scopeX;
                uniformValue[1] = scopeY;
                uniformValue[2] = scopeZ;
                uniformValue[3] = scopeW;
            }
        };
        this.uniformSetter[UniformTypeEnum.INT_VEC2] = (uniform: IUniformInfo, value) => {
            uniformValue = uniform.value;
            scopeX = value[0];
            scopeY = value[1];
            if (uniformValue[0] !== scopeX || uniformValue[1] !== scopeY) {
                gl.uniform2iv(uniform.location, value);
                uniformValue[0] = scopeX;
                uniformValue[1] = scopeY;
            }
        };
        this.uniformSetter[UniformTypeEnum.BOOL_VEC2] = this.uniformSetter[UniformTypeEnum.INT_VEC2];
        this.uniformSetter[UniformTypeEnum.INT_VEC3] = (uniform: IUniformInfo, value) => {
            uniformValue = uniform.value;
            scopeX = value[0];
            scopeY = value[1];
            scopeZ = value[2];
            if (uniformValue[0] !== scopeX || uniformValue[1] !== scopeY || uniformValue[2] !== scopeZ) {
                gl.uniform3iv(uniform.location, value);
                uniformValue[0] = scopeX;
                uniformValue[1] = scopeY;
                uniformValue[2] = scopeZ;
            }
        };
        this.uniformSetter[UniformTypeEnum.BOOL_VEC3] = this.uniformSetter[UniformTypeEnum.INT_VEC3];
        this.uniformSetter[UniformTypeEnum.INT_VEC4] = (uniform: IUniformInfo, value) => {
            uniformValue = uniform.value;
            scopeX = value[0];
            scopeY = value[1];
            scopeZ = value[2];
            scopeW = value[3];
            if (uniformValue[0] !== scopeX || uniformValue[1] !== scopeY || uniformValue[2] !== scopeZ || uniformValue[3] !== scopeW) {
                gl.uniform4iv(uniform.location, value);
                uniformValue[0] = scopeX;
                uniformValue[1] = scopeY;
                uniformValue[2] = scopeZ;
                uniformValue[3] = scopeW;
            }
        };
        this.uniformSetter[UniformTypeEnum.BOOL_VEC4] = this.uniformSetter[UniformTypeEnum.INT_VEC4];
        this.uniformSetter[UniformTypeEnum.FLOAT_MAT2] = (uniform: IUniformInfo, value) => {
            gl.uniformMatrix2fv(uniform.location, false, value);
        };
        this.uniformSetter[UniformTypeEnum.FLOAT_MAT2_ARRAY] = this.uniformSetter[UniformTypeEnum.FLOAT_MAT2];

        this.uniformSetter[UniformTypeEnum.FLOAT_MAT3] = (uniform: IUniformInfo, value) => {
            gl.uniformMatrix3fv(uniform.location, false, value);
        };
        this.uniformSetter[UniformTypeEnum.FLOAT_MAT3_ARRAY] = this.uniformSetter[UniformTypeEnum.FLOAT_MAT3];

        this.uniformSetter[UniformTypeEnum.FLOAT_MAT4] = (uniform: IUniformInfo, value) => {
            gl.uniformMatrix4fv(uniform.location, false, value);
        };
        this.uniformSetter[UniformTypeEnum.FLOAT_MAT4_ARRAY] = this.uniformSetter[UniformTypeEnum.FLOAT_MAT4];

        this.uniformSetter[UniformTypeEnum.FLOAT_ARRAY] = (uniform: IUniformInfo, value) => {
            gl.uniform1fv(uniform.location, value);
        };
        this.uniformSetter[UniformTypeEnum.SAMPLER_2D] = (uniform: IUniformInfo, value: Texture) => {
            value.bind();
            uniformValue = uniform.value;
            if (value.unitId != uniformValue) {
                gl.uniform1i(uniform.location, value.unitId);
                uniform.value = value.unitId;
            }
        };
    }
}
