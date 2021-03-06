
export namespace graphicSettings {
    export const maxDirectionalLights = 4;
    export const maxShadowCascades = 3;
    export const maxShadowDistance = 100;

    export const shadowCascadeEdges = (() => {
        return [maxShadowDistance * 0.1, maxShadowDistance * 0.25, maxShadowDistance];
    })();
}

namespace Private {
    export function getSections(glsl: string) {
        const qualifierMatches = glsl.match(/precision[' ']+(highp|mediump|lowp)[' ']+(float|int)[' ']*;/g);
        const qualifiers = qualifierMatches ? qualifierMatches.join("\n") : "";
        const closingBracketIndex = glsl.lastIndexOf("}");
        if (closingBracketIndex >= 0) {
            let coreMeat = glsl;
            if (qualifierMatches && qualifierMatches.length > 0) {
                const lastQualifier = qualifierMatches[qualifierMatches.length - 1];
                const lastQualifierIndex = glsl.indexOf(lastQualifier);
                coreMeat = glsl.substring(lastQualifierIndex + lastQualifier.length, closingBracketIndex);
            } else {
                coreMeat = glsl.substring(0, closingBracketIndex);
            }
            return {
                qualifiers: qualifiers,
                coreMeat: coreMeat
            };
        } else {
            console.error("Invalid fragment shader syntax - could not locate closing bracket of entry block");
            return null;
        }
    }
}

export class ShaderCodeInjector {
    static doVertexShader(
        vertexCode: string,
        useSkinning?: boolean,
        useFog?: boolean,
        useShadowMap?: boolean,
        useVertexColor?: boolean
    ) {
        let directives = "";
        const definitions = "";
        const statements = "";
        let needInjection = false;

        if (useSkinning === true) {
            directives = `${directives}
#define USE_SKINNING`;
            needInjection = true;
        }

        if (useFog === true) {
            directives = `${directives}
#define USE_FOG`;
            needInjection = true;
        }

        if (useShadowMap === true) {
            directives = `${directives}
#define USE_SHADOW_MAP`;
            needInjection = true;
        }

        if (useVertexColor === true) {
            directives = `${directives}
#define USE_VERTEX_COLOR`;
            needInjection = true;
        }

        if (needInjection) {
            const sections = Private.getSections(vertexCode);
            if (sections) {
                return `${directives}
                    ${sections.qualifiers}
                    ${definitions}
                    ${sections.coreMeat}
                    ${statements}
                }
                `;
            }
        }
        return vertexCode;
    }

    static doFragmentShader(
        fragmentCode: string,
        useFog?: boolean,
        useShadowMap?: boolean,
        useVertexColor?: boolean,
        useDirectionalLights?: boolean
    ) {
        let directives = "";
        const definitions = "";
        const postProcess = "";
        let needInjection = false;

        if (useDirectionalLights) {
            directives = `${directives}
#define MAX_DIRECTIONAL_LIGHTS ${graphicSettings.maxDirectionalLights}     
            `;
            needInjection = true;
        }

        if (useFog === true) {
            directives = `${directives}
            #define USE_FOG`;
            needInjection = true;
        }

        if (useShadowMap === true) {
            directives = `${directives}
#define USE_SHADOW_MAP
#define MAX_DIRECTIONAL_SHADOWMAPS ${graphicSettings.maxDirectionalLights * graphicSettings.maxShadowCascades}
#define MAX_SHADOW_CASCADES ${graphicSettings.maxShadowCascades}`;
            needInjection = true;
        }

        if (useVertexColor === true) {
            directives = `${directives}
#define USE_VERTEX_COLOR`;
            needInjection = true;
        }

        if (needInjection) {
            const sections = Private.getSections(fragmentCode);
            if (sections) {
                return `${sections.qualifiers}
${directives}
${definitions}
${sections.coreMeat}
${postProcess}
}
`;
            }
        }

        return fragmentCode;
    }
}
