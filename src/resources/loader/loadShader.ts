import { IassetLoader, Iasset, IassetLoadInfo } from "../type";
import { getFileName } from "../base/helper";
import { Shader, UniformTypeEnum, getFeaturShderStr } from "../assets/shader";
import { loadText } from "../../io/loadtool";
import { RenderLayerEnum } from "../../ec/ec";
import { Vec2 } from "../../mathD/vec2";
import { Vec4 } from "../../mathD/vec4";
import { Vec3 } from "../../mathD/vec3";
import { GlRender, IprogramState, IprogramInfo } from "../../render/glRender";
import { DrawTypeEnum } from "../../render/renderMachine";
import { LoadEnum } from "../base/loadEnum";

//instance-fog-lightmap-SKIN

export interface IpassJson {
    state?: IprogramState;
    vs: string;
    fs: string;
}

type strLayerType = "Background" | "transparent" | "Geometry";
export interface IshaderJson {
    layer?: strLayerType;
    queue?: number;
    properties?: string[];
    feature?: string[];
    passes: IpassJson[];
}
const textureRegexp = /([_0-9a-zA-Z]+)[ ]*\([ ]*'(.+)'[ ]*,[ ]*([0-9a-zA-Z]+)[ ]*\)[ ]*=[ ]*'(.+)'[ ]*\{[ ]*([a-zA-Z]*)[ ]*([a-zA-Z]*)[ ]*\}/;
const vector4regexp = /([_0-9a-zA-Z]+)[ ]*\([ ]*'(.+)'[ ]*,[ ]*([0-9a-zA-Z]+)[ ]*\)[ ]*=[ ]*\([ ]*([0-9.-]+)[ ]*,[ ]*([0-9.-]+)[ ]*,[ ]*([0-9.-]+)[ ]*,[ ]*([0-9.-]+)[ ]*\)/;
const vector3regexp = /([_0-9a-zA-Z]+)[ ]*\([ ]*'(.+)'[ ]*,[ ]*([0-9a-zA-Z]+)[ ]*\)[ ]*=[ ]*\([ ]*([0-9.-]+)[ ]*,[ ]*([0-9.-]+)[ ]*,[ ]*([0-9.-]+)[ ]*\)/;
const vector2regexp = /([_0-9a-zA-Z]+)[ ]*\([ ]*'(.+)'[ ]*,[ ]*([0-9a-zA-Z]+)[ ]*\)[ ]*=[ ]*\([ ]*([0-9.-]+)[ ]*,[ ]*([0-9.-]+)[ ]*\)/;
const floatRegexp = /([_0-9a-zA-Z]+)[ ]*\([ ]*'(.+)'[ ]*,[ ]*([0-9a-zA-Z]+)[ ]*\)[ ]*=[ ]*([0-9.-]+)/;
const rangeRegexp = /([_0-9a-zA-Z]+)[ ]*\([ ]*'(.+)'[ ]*,[ ]*([0-9a-zA-Z]+)[ ]*\([ ]*([0-9.-]+)[ ]*,[ ]*([0-9.-]+)[ ]*\)[ ]*\)[ ]*=[ ]*([0-9.-]+)/;

function getShaderLayerFromStr(strLayer: strLayerType) {
    switch (strLayer) {
        case "Background":
            return RenderLayerEnum.Background;
        case "transparent":
            return RenderLayerEnum.Transparent;
        case "Geometry":
            return RenderLayerEnum.Geometry;
    }
}
export class LoadShader implements IassetLoader {
    private static drawtypeDic: { [type: string]: number } = {};
    constructor() {
        LoadShader.drawtypeDic["base"] = DrawTypeEnum.BASE;
        LoadShader.drawtypeDic["fog"] = DrawTypeEnum.FOG;
        LoadShader.drawtypeDic["skin"] = DrawTypeEnum.SKIN;
        LoadShader.drawtypeDic["skin_fog"] = DrawTypeEnum.SKIN | DrawTypeEnum.FOG;
        LoadShader.drawtypeDic["lightmap"] = DrawTypeEnum.LIGHTMAP;
        LoadShader.drawtypeDic["lightmap_fog"] = DrawTypeEnum.LIGHTMAP | DrawTypeEnum.FOG;
        LoadShader.drawtypeDic["instance"] = DrawTypeEnum.INSTANCe;
    }
    load(
        url: string,
        onFinish: (asset: Iasset, state: IassetLoadInfo) => void,
        onProgress: (progress: number) => void,
    ): Iasset {
        let name = getFileName(url);

        let shader: Shader = new Shader({ name: name, URL: url });
        loadText(url)
            .then(txt => {
                let json = JSON.parse(txt) as IshaderJson;
                let layer = getShaderLayerFromStr(json.layer || "Geometry");
                let queue = json.queue != null ? json.queue : 0;
                let defUniform = LoadShader.parseProperties(json.properties, name);
                let features = json.feature != null ? [...json.feature, "base"] : ["base"];

                let index = url.lastIndexOf("/");
                let shaderurl = url.substring(0, index + 1);
                LoadShader.ParseShaderPass(features, json.passes, shaderurl, name)
                    .then(progamArr => {
                        shader.layer = layer;
                        shader.queue = queue;
                        shader.mapUniformDef = defUniform;
                        shader.passes = progamArr;

                        if (onFinish) {
                            onFinish(shader, { url: url, loadState: LoadEnum.Success });
                        }
                    })
                    .catch(error => {
                        let errorMsg =
                            "ERROR: parse shader Error!\n Info: LOAD URL: " + url + "  LOAD MSG:" + error.message;
                        if (onFinish) {
                            onFinish(shader, { url: url, loadState: LoadEnum.Failed, err: new Error(errorMsg) });
                        }
                    });
            })
            .catch(err => {
                let errorMsg = "ERROR: Load shader Error!\n Info: LOAD URL: " + url + "  LOAD MSG:" + err.message;
                if (onFinish) {
                    onFinish(shader, { url: url, loadState: LoadEnum.Failed, err: new Error(errorMsg) });
                }
            });
        return shader;
    }

    private static parseProperties(
        properties: any,
        name: string,
    ): { [key: string]: { type: UniformTypeEnum; value: any } } {
        let mapUniformDef: { [key: string]: { type: UniformTypeEnum; value: any } } = {};
        for (let index in properties) {
            let property = properties[index] as string;

            //检测字符串格式有无错误
            let words = property.match(floatRegexp);
            if (words == null) words = property.match(rangeRegexp);
            if (words == null) words = property.match(vector4regexp);
            if (words == null) words = property.match(vector3regexp);
            if (words == null) words = property.match(vector2regexp);
            if (words == null) words = property.match(textureRegexp);
            if (words == null) {
                let errorMsg =
                    "ERROR:  parse shader(" +
                    name +
                    " )Property json Error! \n" +
                    " Info:" +
                    property +
                    "check match failed.";
                console.error(errorMsg);
                return null;
            }

            if (words != null && words.length >= 4) {
                let key = words[1];
                let showName = words[2];
                let type = words[3].toLowerCase();
                switch (type) {
                    case "float":
                        mapUniformDef[key] = { type: UniformTypeEnum.FLOAT, value: parseFloat(words[4]) };
                        break;
                    case "range":
                        //this.mapUniformDef[key] = { type: type, min: parseFloat(words[4]), max: parseFloat(words[5]), value: parseFloat(words[6]) };
                        mapUniformDef[key] = { type: UniformTypeEnum.FLOAT, value: parseFloat(words[6]) };
                        break;
                    case "vector2":
                        let vector2 = Vec2.create(parseFloat(words[4]), parseFloat(words[5]));
                        mapUniformDef[key] = { type: UniformTypeEnum.FLOAT_VEC2, value: vector2 };
                        break;
                    case "vector3":
                        let vector3 = Vec3.create(parseFloat(words[4]), parseFloat(words[5]), parseFloat(words[6]));
                        mapUniformDef[key] = { type: UniformTypeEnum.FLOAT_VEC3, value: vector3 };
                        break;
                    case "vector4":
                    case "color":
                        let _vector = Vec4.create(
                            parseFloat(words[4]),
                            parseFloat(words[5]),
                            parseFloat(words[6]),
                            parseFloat(words[7]),
                        );
                        mapUniformDef[key] = { type: UniformTypeEnum.FLOAT_VEC4, value: _vector };
                        break;
                    case "texture":
                        mapUniformDef[key] = { type: UniformTypeEnum.TEXTURE, value: null }; //words[4]
                        break;
                    case "cubetexture":
                        mapUniformDef[key] = { type: UniformTypeEnum.TEXTURE, value: null };
                        break;
                    default:
                        let errorMsg =
                            "ERROR: parse shader(" +
                            name +
                            " )Property json Error! \n" +
                            "Info: unknown type : " +
                            type;
                        console.error(errorMsg);
                        return null;
                }
            }
        }
        return mapUniformDef;
    }

    private static ParseShaderPass(features: string[], json: IpassJson[], shaderFolderUrl: string, name: string) {
        let passes: { [feature: string]: IprogramInfo[] } = {};

        let featureArr: Promise<void>[] = [];
        for (let i = 0; i < features.length; i++) {
            let type = features[i];
            let featureStr = getFeaturShderStr(type);
            let taskArr: Promise<IprogramInfo>[] = [];

            for (let i = 0; i < json.length; i++) {
                let passJson = json[i];
                let vsurl = shaderFolderUrl + passJson.vs + ".vs.glsl";
                let fsurl = shaderFolderUrl + passJson.fs + ".fs.glsl";

                let vstask = loadText(vsurl);
                let fstask = loadText(fsurl);
                let protask = Promise.all([vstask, fstask]).then(str => {
                    let vsStr = featureStr + str[0];
                    let fsStr = featureStr + str[1];

                    return GlRender.createProgram({
                        program: {
                            vs: vsStr,
                            fs: fsStr,
                            name: passJson.vs + "_" + passJson.fs,
                        },
                        states: passJson.state,
                    });
                });
                taskArr.push(protask);
            }
            let feature = Promise.all(taskArr).then(programArr => {
                passes[type] = programArr;
            });
            featureArr.push(feature);
        }
        return Promise.all(featureArr).then(() => passes);
    }
}
