import { Engine } from "./engine";
import { EngineCapability } from "./engineCapability";
import { UniformTypeEnum, IattributeInfo, IuniformInfo, IshaderOption } from "./Shader";

export class GraphicsDevice {
    gl:WebGLRenderingContext;
    private _caps: EngineCapability;
    get caps(): EngineCapability {
        return this._caps;
    }
   readonly commitFunction:{[uniformType:string]:(uniform:any,value:any)=>void} ={};
   readonly gltypeToUniformType:{[glType:number]:UniformTypeEnum}={};
    constructor(){
        let gl:WebGLRenderingContext;

        //------------------------uniform 


        var scopeX, scopeY, scopeZ, scopeW;
        var uniformValue;
        this.commitFunction[UniformTypeEnum.BOOL] = function (uniform, value) {
            if (uniform.value !== value) {
                gl.uniform1i(uniform.locationId, value);
                uniform.value = value;
            }
        };
        this.commitFunction[UniformTypeEnum.INT] = this.commitFunction[UniformTypeEnum.BOOL];
        this.commitFunction[UniformTypeEnum.FLOAT] = function (uniform, value) {
            if (uniform.value !== value) {
                gl.uniform1f(uniform.locationId, value);
                uniform.value = value;
            }
        };
        this.commitFunction[UniformTypeEnum.FLOAT_VEC2]  = function (uniform, value) {
            uniformValue = uniform.value;
            scopeX = value[0];
            scopeY = value[1];
            if (uniformValue[0] !== scopeX || uniformValue[1] !== scopeY) {
                gl.uniform2fv(uniform.locationId, value);
                uniformValue[0] = scopeX;
                uniformValue[1] = scopeY;
            }
        };
        this.commitFunction[UniformTypeEnum.FLOAT_VEC3]  = function (uniform, value) {
            uniformValue = uniform.value;
            scopeX = value[0];
            scopeY = value[1];
            scopeZ = value[2];
            if (uniformValue[0] !== scopeX || uniformValue[1] !== scopeY || uniformValue[2] !== scopeZ) {
                gl.uniform3fv(uniform.locationId, value);
                uniformValue[0] = scopeX;
                uniformValue[1] = scopeY;
                uniformValue[2] = scopeZ;
            }
        };
        this.commitFunction[UniformTypeEnum.FLOAT_VEC4]  = function (uniform, value) {
            uniformValue = uniform.value;
            scopeX = value[0];
            scopeY = value[1];
            scopeZ = value[2];
            scopeW = value[3];
            if (uniformValue[0] !== scopeX || uniformValue[1] !== scopeY || uniformValue[2] !== scopeZ || uniformValue[3] !== scopeW) {
                gl.uniform4fv(uniform.locationId, value);
                uniformValue[0] = scopeX;
                uniformValue[1] = scopeY;
                uniformValue[2] = scopeZ;
                uniformValue[3] = scopeW;
            }
        };
        this.commitFunction[UniformTypeEnum.INT_VEC2] = function (uniform, value) {
            uniformValue = uniform.value;
            scopeX = value[0];
            scopeY = value[1];
            if (uniformValue[0] !== scopeX || uniformValue[1] !== scopeY) {
                gl.uniform2iv(uniform.locationId, value);
                uniformValue[0] = scopeX;
                uniformValue[1] = scopeY;
            }
        };
        this.commitFunction[UniformTypeEnum.BOOL_VEC2] = this.commitFunction[UniformTypeEnum.INT_VEC2];
        this.commitFunction[UniformTypeEnum.INT_VEC3] = function (uniform, value) {
            uniformValue = uniform.value;
            scopeX = value[0];
            scopeY = value[1];
            scopeZ = value[2];
            if (uniformValue[0] !== scopeX || uniformValue[1] !== scopeY || uniformValue[2] !== scopeZ) {
                gl.uniform3iv(uniform.locationId, value);
                uniformValue[0] = scopeX;
                uniformValue[1] = scopeY;
                uniformValue[2] = scopeZ;
            }
        };
        this.commitFunction[UniformTypeEnum.BOOL_VEC3] = this.commitFunction[UniformTypeEnum.INT_VEC3];
        this.commitFunction[UniformTypeEnum.INT_VEC4] = function (uniform, value) {
            uniformValue = uniform.value;
            scopeX = value[0];
            scopeY = value[1];
            scopeZ = value[2];
            scopeW = value[3];
            if (uniformValue[0] !== scopeX || uniformValue[1] !== scopeY || uniformValue[2] !== scopeZ || uniformValue[3] !== scopeW) {
                gl.uniform4iv(uniform.locationId, value);
                uniformValue[0] = scopeX;
                uniformValue[1] = scopeY;
                uniformValue[2] = scopeZ;
                uniformValue[3] = scopeW;
            }
        };
        this.commitFunction[UniformTypeEnum.BOOL_VEC4] = this.commitFunction[UniformTypeEnum.INT_VEC4];
        this.commitFunction[UniformTypeEnum.FLOAT_MAT2]  = function (uniform, value) {
            gl.uniformMatrix2fv(uniform.locationId, false, value);
        };
        this.commitFunction[UniformTypeEnum.FLOAT_MAT3]  = function (uniform, value) {
            gl.uniformMatrix3fv(uniform.locationId, false, value);
        };
        this.commitFunction[UniformTypeEnum.FLOAT_MAT4]  = function (uniform, value) {
            gl.uniformMatrix4fv(uniform.locationId, false, value);
        };
        this.commitFunction[UniformTypeEnum.FLOAT_ARRAY] = function (uniform, value) {
            gl.uniform1fv(uniform.locationId, value);
        };

        this.gltypeToUniformType[gl.FLOAT]=UniformTypeEnum.FLOAT;
        this.gltypeToUniformType[gl.FLOAT_VEC2]=UniformTypeEnum.FLOAT_VEC2;
        this.gltypeToUniformType[gl.FLOAT_VEC3]=UniformTypeEnum.FLOAT_VEC3;
        this.gltypeToUniformType[gl.FLOAT_VEC4]=UniformTypeEnum.FLOAT_VEC4;
        this.gltypeToUniformType[gl.INT]=UniformTypeEnum.INT;
        this.gltypeToUniformType[gl.INT_VEC2]=UniformTypeEnum.INT_VEC2;
        this.gltypeToUniformType[gl.INT_VEC3]=UniformTypeEnum.INT_VEC3;
        this.gltypeToUniformType[gl.INT_VEC4]=UniformTypeEnum.INT_VEC4;
        this.gltypeToUniformType[gl.BOOL]=UniformTypeEnum.BOOL;
        this.gltypeToUniformType[gl.BOOL_VEC2]=UniformTypeEnum.BOOL_VEC2;
        this.gltypeToUniformType[gl.BOOL_VEC3]=UniformTypeEnum.BOOL_VEC3;
        this.gltypeToUniformType[gl.BOOL_VEC4]=UniformTypeEnum.BOOL_VEC4;
        this.gltypeToUniformType[gl.FLOAT_MAT2]=UniformTypeEnum.FLOAT_MAT2;
        this.gltypeToUniformType[gl.FLOAT_MAT3]=UniformTypeEnum.FLOAT_MAT3;
        this.gltypeToUniformType[gl.FLOAT_MAT4]=UniformTypeEnum.FLOAT_MAT4;
    }

    getUniformTypeFromGLtype(gltype:number,beArray?:boolean){
        let gl=this.gl;
        if(beArray){
            if(gltype==gl.FLOAT){
                return UniformTypeEnum.FLOAT_ARRAY
            }
            else if(gltype==gl.BOOL){
                return UniformTypeEnum.BOOL_ARRAY
            }else if(gltype==gl.INT){
                return UniformTypeEnum.INT
            }
        }
        let type=this.gltypeToUniformType[gltype];
        if(type==null){
            console.error("unhandle uniform GLtype:",gltype);
        }
        return type;
    }

    complileAndLinkShader(definition:IshaderOption){
        let gl=this.gl;
        let vsshader=this.compileShaderSource(gl,definition.vsStr,true);
        let fsshader=this.compileShaderSource(gl,definition.fsStr,false);
    
        if(vsshader&&fsshader){
            let shader = gl.createProgram();
            gl.attachShader(shader, vsshader);
            gl.attachShader(shader, fsshader);
            gl.linkProgram(shader);
            let check = gl.getProgramParameter(shader, gl.LINK_STATUS);
            if (check == false) {
                let debguInfo = "ERROR: compile program Error! \n" + gl.getProgramInfoLog(shader);
                console.error(debguInfo);
                gl.deleteProgram(shader);
                return null;
            } else {
                let attributes= this.getAttributesInfo(gl, shader);
                let uniforms = this.getUniformsInfo(gl, shader);
    
                return {shader,attributes,uniforms}
            }
        }
    }
    
    private  compileShaderSource(gl:WebGLRenderingContext,source: string,beVertex:boolean) {
        let target = beVertex ? gl.VERTEX_SHADER : gl.FRAGMENT_SHADER;
        let item = gl.createShader(target);
        gl.shaderSource(item, source);
        gl.compileShader(item);
        let check = gl.getShaderParameter(item, gl.COMPILE_STATUS);
        if (check == false) {
            let debug =beVertex ? "ERROR: compile  VS Shader Error! VS:" : "ERROR: compile FS Shader Error! FS:";
            debug = debug + name + ".\n";
            console.error(debug + gl.getShaderInfoLog(item));
            gl.deleteShader(item);
        } else {
            return item
        }
    }
    
    private  getAttributesInfo(
        gl: WebGLRenderingContext,
        program: WebGLProgram,
    ): { [attName: string]: IattributeInfo } {
        let attdic: { [attName: string]: IattributeInfo } = {};
        let numAttribs = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
        for (let i = 0; i < numAttribs; i++) {
            let attribInfo = gl.getActiveAttrib(program, i);
            if (!attribInfo) break;
            let attName = attribInfo.name;
            let attlocation = gl.getAttribLocation(program, attName);
    
            attdic[attName] = { name: attName, location: attlocation };
        }
        return attdic;
    }
    
    private  getUniformsInfo(gl: WebGLRenderingContext, program: WebGLProgram): { [name: string]: IuniformInfo } {
        let uniformDic: { [name: string]: IuniformInfo } = {};
        let numUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
    
        for (let i = 0; i < numUniforms; i++) {
            let uniformInfo = gl.getActiveUniform(program, i);
            if (!uniformInfo) break;
    
            let name = uniformInfo.name;
            let type = uniformInfo.type;
            let location = gl.getUniformLocation(program, name);
    
            let beArray = false;
            // remove the array suffix.
            if (name.substr(-3) === "[0]") {
                beArray = true;
                name = name.substr(0, name.length - 3);
            }
            if (location == null) continue;
    
            uniformDic[name] = { 
                name: name, 
                location: location, 
                type: this.getUniformTypeFromGLtype(type,beArray)
            };
        }
        return uniformDic;
    }

}
