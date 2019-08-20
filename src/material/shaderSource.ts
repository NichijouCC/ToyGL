export class ShaderSource {
    defines: string[];
    source: string;

    static getDependencyNode(name, glslSource, nodes) {
        var dependencyNode;

        // check if already loaded
        for (var i = 0; i < nodes.length; ++i) {
            if (nodes[i].name === name) {
                dependencyNode = nodes[i];
            }
        }

        if (!defined(dependencyNode)) {
            // strip doc comments so we don't accidentally try to determine a dependency for something found
            // in a comment
            glslSource = removeComments(glslSource);

            // create new node
            dependencyNode = {
                name: name,
                glslSource: glslSource,
                dependsOn: [],
                requiredBy: [],
                evaluated: false,
            };
            nodes.push(dependencyNode);
        }

        return dependencyNode;
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
        return source.replace(/\/\*\*[\s\S]*?\*\//gm, function (match) {
            // preserve the number of lines in the comment block so the line numbers will be correct when debugging shaders
            var numberOfLines = match.match(/\n/gm).length;
            var replacement = "";
            for (var lineNumber = 0; lineNumber < numberOfLines; ++lineNumber) {
                replacement += "\n";
            }
            return replacement;
        });
    }

    constructor(name: string, source: string) {
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

export class BuiltInGLSL {
    static sourceMap: { [name: string]: string };

    static nodeMap: { [name: string]: ShaderNode } = {};

    static beContain(name: string): boolean {
        return this.sourceMap[name] != null;
    }

    static getShaderNode(name: string): ShaderNode {
        if (this.nodeMap[name] != null) {
            return this.nodeMap[name];
        } else if (this.sourceMap[name] != null) {
            let node = new ShaderNode(name, this.sourceMap[name]);
            this.nodeMap[name] = node;
            return node;
        } else {
            return null;
        }
    }
}
