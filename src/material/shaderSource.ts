import { BuiltInGLSL } from "./czmBuiltins";

export class ShaderSource {
    private sources: string[];
    private defines: string[];

    constructor(source: string, defines: string[]) {
        this.sources = [source];
        this.defines = defines;
    }
    private _combinedShader: string;
    get combindedShader(): string {
        if (this._combinedShader == null) {
            let combinedSources = "";

            for (let i = 0; i < this.defines.length; i++) {
                if (this.defines[i] != null) {
                    combinedSources += "#define " + this.defines[i] + "\n";
                }
            }
            for (let i = 0; i < this.sources.length; i++) {
                if (this.sources[i] != null) {
                    // #line needs to be on its own line.
                    combinedSources += "\n#line 0\n" + this.sources[i];
                }
            }
            this._combinedShader = this.appendShader(new ShaderNode("main", combinedSources), []);
        }
        return this._combinedShader;
    }

    private appendShader(shader: ShaderNode, dependsOn: string[]): string {
        let combined = "";
        for (let i = 0; i < shader.dependsOn.length; i++) {
            if (dependsOn.indexOf(shader.dependsOn[i].name) == -1) {
                let appendStr = this.appendShader(shader.dependsOn[i], dependsOn);
                dependsOn.push(shader.dependsOn[i].name);
                combined += appendStr;
            }
        }
        return combined + shader.glslSource;
    }
}

export class ShaderNode {
    name: string;
    glslSource: string;
    dependsOn: ShaderNode[];
    // requiredBy: [];
    // evaluated: boolean;

    private static removeComments(source: string) {
        // remove inline comments
        source = source.replace(/\/\/.*/g, "");
        // remove multiline comment block
        return source.replace(/\/\*\*[\s\S]*?\*\//gm, match => {
            // preserve the number of lines in the comment block so the line numbers will be correct when debugging shaders
            let numberOfLines = match.match(/\n/gm).length;
            let replacement = "";
            for (let lineNumber = 0; lineNumber < numberOfLines; ++lineNumber) {
                replacement += "\n";
            }
            return replacement;
        });
    }

    constructor(name: string, source: string) {
        this.name = name;
        let glslStr = ShaderNode.removeComments(source);
        this.glslSource = glslStr;
        var czmMatches = glslStr.match(/\bczm_[a-zA-Z0-9_]*/g);
        if (czmMatches !== null) {
            // remove duplicates
            czmMatches = czmMatches.filter((elem, index) => {
                return czmMatches.indexOf(elem) === index;
            });

            czmMatches.forEach(element => {
                let node = BuiltInGLSL.getShaderNode(element);
                if (node) {
                    this.dependsOn.push(node);
                } else {
                    console.warn("czm glsl part( " + element + " )not contained by builtin glsl Dic!");
                }
            });
        }
    }
}
