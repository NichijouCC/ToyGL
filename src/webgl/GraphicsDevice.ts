import { Engine } from "./engine";
import { DeviceCapability } from "./DeviceCapability";
import { IattributeInfo, IuniformInfo, IshaderOption } from "./Shader";
import { UniformTypeEnum } from "./UniformType";
import { TypedArray } from "../core/TypedArray";
import { BufferTargetEnum, BufferUsageEnum } from "./Buffer";
import { IvertexAttribute, VertexAttEnum, ComponentDatatypeEnum } from "./VertexAttribute";

export class GraphicsDevice {
    gl:WebGLRenderingContext;
    private _caps: DeviceCapability;
    get caps(): DeviceCapability {
        return this._caps;
    }
    readonly uniformSetter:{[uniformType:string]:(uniform:any,value:any)=>void} ={};
    readonly gltypeToUniformType:{[glType:number]:UniformTypeEnum}={};
    readonly bufferUsageToGLNumber:{[useage:string]:number}={};
    readonly bufferTargetToGLNumber:{[useage:string]:number}={};
    readonly vertexAttributeFuncMap:{[size:number]:(index:number,value:any)=>any}={};
    constructor(){
        let gl:WebGLRenderingContext;

        //------------------------uniform 


        var scopeX, scopeY, scopeZ, scopeW;
        var uniformValue;
        this.uniformSetter[UniformTypeEnum.BOOL] = function (uniform, value) {
            if (uniform.value !== value) {
                gl.uniform1i(uniform.locationId, value);
                uniform.value = value;
            }
        };
        this.uniformSetter[UniformTypeEnum.INT] = this.uniformSetter[UniformTypeEnum.BOOL];
        this.uniformSetter[UniformTypeEnum.FLOAT] = function (uniform, value) {
            if (uniform.value !== value) {
                gl.uniform1f(uniform.locationId, value);
                uniform.value = value;
            }
        };
        this.uniformSetter[UniformTypeEnum.FLOAT_VEC2]  = function (uniform, value) {
            uniformValue = uniform.value;
            scopeX = value[0];
            scopeY = value[1];
            if (uniformValue[0] !== scopeX || uniformValue[1] !== scopeY) {
                gl.uniform2fv(uniform.locationId, value);
                uniformValue[0] = scopeX;
                uniformValue[1] = scopeY;
            }
        };
        this.uniformSetter[UniformTypeEnum.FLOAT_VEC3]  = function (uniform, value) {
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
        this.uniformSetter[UniformTypeEnum.FLOAT_VEC4]  = function (uniform, value) {
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
        this.uniformSetter[UniformTypeEnum.INT_VEC2] = function (uniform, value) {
            uniformValue = uniform.value;
            scopeX = value[0];
            scopeY = value[1];
            if (uniformValue[0] !== scopeX || uniformValue[1] !== scopeY) {
                gl.uniform2iv(uniform.locationId, value);
                uniformValue[0] = scopeX;
                uniformValue[1] = scopeY;
            }
        };
        this.uniformSetter[UniformTypeEnum.BOOL_VEC2] = this.uniformSetter[UniformTypeEnum.INT_VEC2];
        this.uniformSetter[UniformTypeEnum.INT_VEC3] = function (uniform, value) {
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
        this.uniformSetter[UniformTypeEnum.BOOL_VEC3] = this.uniformSetter[UniformTypeEnum.INT_VEC3];
        this.uniformSetter[UniformTypeEnum.INT_VEC4] = function (uniform, value) {
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
        this.uniformSetter[UniformTypeEnum.BOOL_VEC4] = this.uniformSetter[UniformTypeEnum.INT_VEC4];
        this.uniformSetter[UniformTypeEnum.FLOAT_MAT2]  = function (uniform, value) {
            gl.uniformMatrix2fv(uniform.locationId, false, value);
        };
        this.uniformSetter[UniformTypeEnum.FLOAT_MAT3]  = function (uniform, value) {
            gl.uniformMatrix3fv(uniform.locationId, false, value);
        };
        this.uniformSetter[UniformTypeEnum.FLOAT_MAT4]  = function (uniform, value) {
            gl.uniformMatrix4fv(uniform.locationId, false, value);
        };
        this.uniformSetter[UniformTypeEnum.FLOAT_ARRAY] = function (uniform, value) {
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

        //------------------buffer
        this.bufferTargetToGLNumber[BufferTargetEnum.ARRAY_BUFFER]=gl.ARRAY_BUFFER;
        this.bufferTargetToGLNumber[BufferTargetEnum.ELEMENT_ARRAY_BUFFER]=gl.ELEMENT_ARRAY_BUFFER;

        this.bufferUsageToGLNumber[BufferUsageEnum.STATIC_DRAW]=gl.STATIC_DRAW;
        this.bufferUsageToGLNumber[BufferUsageEnum.DYNAMIC_DRAW]=gl.DYNAMIC_DRAW;



        //------------------attribute
        this.vertexAttributeFuncMap[1]=(index,value)=>{
            this.gl.vertexAttrib1f(index,value)
        }
        this.vertexAttributeFuncMap[2]=(index,value)=>{
            this.gl.vertexAttrib2fv(index,value)
        }
        this.vertexAttributeFuncMap[3]=(index,value)=>{
            this.gl.vertexAttrib3fv(index,value)
        }
        this.vertexAttributeFuncMap[4]=(index,value)=>{
            this.gl.vertexAttrib4fv(index,value)
        }
    }
    //--------------------------------------uniform
    private getUniformTypeFromGLtype(gltype:number,beArray?:boolean){
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
    //----------------------------------------buffer
    createBuffer(target:BufferTargetEnum,sizeOrTypedArray:number|ArrayBufferView,useage:BufferUsageEnum){
        let gl=this.gl;
        let bufferTarget=this.bufferTargetToGLNumber[target];
        let bufferUseage=this.bufferUsageToGLNumber[useage];
        let buffer = gl.createBuffer();
        gl.bindBuffer(bufferTarget, buffer);
        gl.bufferData(bufferTarget, sizeOrTypedArray as any, bufferUseage);
        gl.bindBuffer(bufferTarget, null);
        return buffer
    }

    bindBuffer(buffer:WebGLBuffer,target:BufferTargetEnum){
        this.gl.bindBuffer(this.bufferTargetToGLNumber[target],buffer);
    }

    destroyBuffer(buffer:WebGLBuffer){
        this.gl.deleteBuffer(buffer);
    }

    bindVertexAttribute_Buffer(att:IvertexAttribute){
        this.gl.enableVertexAttribArray(att.index);
        this.gl.vertexAttribPointer(
            att.index,
            att.componentsPerAttribute,
            att.componentDatatype,
            att.normalize,
            att.strideInBytes,
            att.offsetInBytes,
        );
        if (att.instanceDivisor !== undefined) {
            this.gl.vertexAttribDivisor(att.index, att.instanceDivisor);
        }
    }
    unbindVertexAttribute_Buffer(att:IvertexAttribute){
        this.gl.disableVertexAttribArray(att.index);
        if (att.instanceDivisor !== undefined) {
            this.gl.vertexAttribDivisor(att.index, 0);
        }
    }

    bindVertexAttribute_Value(att:IvertexAttribute,value:[]|TypedArray){
        this.vertexAttributeFuncMap[att.componentsPerAttribute](att.index,value)
    }

    createVertexArray(){
        if (this.caps.vertexArrayObject) {
            return this.gl.createVertexArray();
        }
        return null
    }

    bindVertexArray(vao:any){
        this.gl.bindVertexArray(vao);
    }

    /**
     * 创建shader
     * @param definition 
     */
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
                //TODO :SMAPLES
                let samples={};
                return {shader,attributes,uniforms,samples}
            }
        }
    }

    bindShader(program:WebGLProgram){
        this.gl.useProgram(program);
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

    //-----------------------------gl state
    setClear(clearDepth: number | null, clearColor: Float32Array | null, clearStencil: number | null) {
        let cleartag = 0;
        if (clearDepth != null) {
            this.gl.clearDepth(clearDepth);
            cleartag |= this.gl.DEPTH_BUFFER_BIT;
        }
        if (clearColor != null) {
            this.gl.clearColor(clearColor[0], clearColor[1], clearColor[2], clearColor[3]);
            cleartag |= this.gl.COLOR_BUFFER_BIT;
        }
        if (clearStencil != null) {
            this.gl.clearStencil(0);
            cleartag |= this.gl.STENCIL_BUFFER_BIT;
        }
        if (cleartag != 0) {
            this.gl.clear(cleartag);
        }
    }

    private _cachedViewPortX: number;
    private _cachedViewPortY: number;
    private _cachedViewPortWidth: number;
    private _cachedViewPortHeight: number;
    setViewPort(x: number, y: number, width: number, height: number, force = false) {
        if (
            force ||
            x != this._cachedViewPortX ||
            y != this._cachedViewPortY ||
            width != this._cachedViewPortWidth ||
            height != this._cachedViewPortHeight
        ) {
            this.gl.viewport(x, y, width, height);
            this._cachedViewPortX = x;
            this._cachedViewPortY = y;
            this._cachedViewPortWidth = width;
            this._cachedViewPortHeight = height;
        }
    }

    private _cacheColorMaskR: boolean;
    private _cacheColorMaskG: boolean;
    private _cacheColorMaskB: boolean;
    private _cacheColorMaskA: boolean;
    setColorMaskWithCached(maskR: boolean, maskG: boolean, maskB: boolean, maskA: boolean, force = false) {
        if (
            force ||
            this._cacheColorMaskR != maskR ||
            this._cacheColorMaskG != maskG ||
            this._cacheColorMaskB != maskB ||
            this._cacheColorMaskA != maskA
        ) {
            this.gl.colorMask(maskR, maskG, maskB, maskA);
            this._cacheColorMaskR = maskR;
            this._cacheColorMaskG = maskG;
            this._cacheColorMaskB = maskB;
            this._cacheColorMaskA = maskA;
        }
    }
    _cachedEnableCullFace: boolean;
    _cachedCullFace: boolean;
    setCullFaceState(enableCullFace: boolean = true, cullBack: boolean = true, force = false) {
        if (force || this._cachedEnableCullFace != enableCullFace) {
            this._cachedEnableCullFace = enableCullFace;
            if (enableCullFace) {
                this.gl.enable(this.gl.CULL_FACE);
                if (force || this._cachedCullFace != cullBack) {
                    this._cachedCullFace = cullBack;
                    this.gl.cullFace(cullBack ? this.gl.BACK : this.gl.FRONT);
                }
            } else {
                this.gl.disable(this.gl.CULL_FACE);
            }
        } else {
            if (force || this._cachedCullFace != cullBack) {
                this._cachedCullFace = cullBack;

                this.gl.cullFace(cullBack ? this.gl.BACK : this.gl.FRONT);
            }
        }
    }
    private _cachedDepthWrite: boolean;
    private _cachedDepthTest: boolean;
    setDepthState(depthWrite: boolean = true, depthTest: boolean = true, force = false) {
        if (force || this._cachedDepthWrite != depthWrite) {
            this._cachedDepthWrite = depthWrite;
            this.gl.depthMask(depthWrite);
        }
        if (force || this._cachedDepthTest != depthTest) {
            this._cachedDepthTest = depthTest;
            if (depthTest) {
                this.gl.enable(this.gl.DEPTH_TEST);
            } else {
                this.gl.disable(this.gl.DEPTH_TEST);
            }
        }
    }

    private _cachedEnableBlend: boolean;
    private _cachedBlendEquation: number;
    private _cachedBlendFuncSrc: number;
    private _cachedBlendFuncDst: number;
    setBlendState(
        enableBlend: boolean = false,
        blendEquation: number = this.gl.FUNC_ADD,
        blendSrc: number = this.gl.ONE,
        blendDst: number = this.gl.ONE_MINUS_SRC_ALPHA,
        force = false,
    ) {
        if (force || this._cachedEnableBlend != enableBlend) {
            this._cachedEnableBlend = enableBlend;
            if (enableBlend) {
                this.gl.enable(this.gl.BLEND);

                if (force || this._cachedBlendEquation != blendEquation) {
                    this._cachedBlendEquation = blendEquation;
                    this.gl.blendEquation(blendEquation);
                }
                if (force || this._cachedBlendFuncSrc != blendSrc || this._cachedBlendFuncDst != blendDst) {
                    this._cachedBlendFuncSrc = blendSrc;
                    this._cachedBlendFuncDst = blendDst;
                    this.gl.blendFunc(blendSrc, blendDst);
                }
            } else {
                this.gl.disable(this.gl.BLEND);
            }
        }
    }

    private _cachedEnableStencilTest: boolean;
    private _cachedStencilFunc: number;
    private _cachedStencilRefValue: number;
    private _cachedStencilMask: number;
    private _cachedStencilFail: number;
    private _cachedStencilPassZfail: number;
    private _cachedStencilFaileZpass: number;
    setStencilStateWithCached(
        enableStencilTest: boolean = false,
        stencilFunc: number = this.gl.ALWAYS,
        stencilRefValue: number = 1,
        stencilMask: number = 0xff,
        stencilFail: number = this.gl.KEEP,
        stencilPassZfail: number = this.gl.REPLACE,
        stencilFaileZpass: number = this.gl.KEEP,
    ) {
        if (this._cachedEnableStencilTest != enableStencilTest) {
            this._cachedEnableStencilTest = enableStencilTest;
            this.gl.enable(this.gl.STENCIL_TEST);
            if (
                this._cachedStencilFunc != stencilFunc ||
                this._cachedStencilRefValue != stencilRefValue ||
                this._cachedStencilMask != stencilMask
            ) {
                this._cachedStencilFunc = stencilFunc;
                this._cachedStencilRefValue = stencilRefValue;
                this._cachedStencilMask = stencilMask;
                this.gl.stencilFunc(stencilFunc, stencilRefValue, stencilMask);
            }

            if (
                this._cachedStencilFail != stencilFail ||
                this._cachedStencilPassZfail != stencilPassZfail ||
                this._cachedStencilFaileZpass != stencilFaileZpass
            ) {
                this._cachedStencilFail = stencilFail;
                this._cachedStencilPassZfail = stencilPassZfail;
                this._cachedStencilFaileZpass = stencilFaileZpass;
                this.gl.stencilOp(stencilFail, stencilPassZfail, stencilFaileZpass);
            }
        }
    }

}
