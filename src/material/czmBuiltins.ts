import { ShaderNode } from "./shaderSource";

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

    static addShaderNode(name: string, source: string) {
        this.sourceMap[name] = source;
    }
}

BuiltInGLSL.addShaderNode(
    "czm_materialInput",
    `struct czm_materialInput
    {
        float s;
        vec2 st;
        vec3 str;
        vec3 normalEC;
        mat3 tangentToEyeMatrix;
        vec3 positionToEyeEC;
        float height;
        float slope;
        float aspect;
    };
`,
);
BuiltInGLSL.addShaderNode(
    "czm_material",
    `struct czm_material
    {
        vec3 diffuse;
        float specular;
        float shininess;
        vec3 normal;
        vec3 emission;
        float alpha;
    };`,
);

BuiltInGLSL.addShaderNode(
    "czm_fog",
    `/**
    * Gets the color with fog at a distance from the camera.
    *
    * @name czm_fog
    * @glslFunction
    *
    * @param {float} distanceToCamera The distance to the camera in meters.
    * @param {vec3} color The original color.
    * @param {vec3} fogColor The color of the fog.
    *
    * @returns {vec3} The color adjusted for fog at the distance from the camera.
    */
    vec3 czm_fog(float distanceToCamera, vec3 color, vec3 fogColor)
    {
        float scalar = distanceToCamera * czm_fogDensity;
        float fog = 1.0 - exp(-(scalar * scalar));
        return mix(color, fogColor, fog);
    }
   `,
);
