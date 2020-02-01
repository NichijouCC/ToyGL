import { GraphicsDevice } from "./GraphicsDevice";

export class DeviceLimit
{
    readonly maximumCombinedTextureImageUnits: number;
    readonly maximumCubeMapSize: number;
    readonly maximumFragmentUniformVectors: number;
    readonly maximumTextureImageUnits: number;
    readonly maximumRenderbufferSize: number;
    readonly maximumTextureSize: number;
    readonly maximumVaryingVectors: number;
    readonly maximumVertexAttributes: number;
    readonly maximumVertexTextureImageUnits: number
    readonly maximumVertexUniformVectors: number
    readonly minimumAliasedLineWidth: number
    readonly maximumAliasedLineWidth: number
    readonly minimumAliasedPointSize: number
    readonly maximumAliasedPointSize: number
    readonly maximumViewportWidth: number
    readonly maximumViewportHeight: number
    readonly highpFloatSupported: boolean
    readonly highpIntSupported: boolean
    constructor(context: GraphicsDevice)
    {
        let gl = context.gl;
        this.maximumCombinedTextureImageUnits = gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS); // min: 8
        this.maximumCubeMapSize = gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE); // min: 16
        this.maximumFragmentUniformVectors = gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS); // min: 16
        this.maximumTextureImageUnits = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS); // min: 8
        this.maximumRenderbufferSize = gl.getParameter(gl.MAX_RENDERBUFFER_SIZE); // min: 1
        this.maximumTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE); // min: 64
        this.maximumVaryingVectors = gl.getParameter(gl.MAX_VARYING_VECTORS); // min: 8
        this.maximumVertexAttributes = gl.getParameter(gl.MAX_VERTEX_ATTRIBS); // min: 8
        this.maximumVertexTextureImageUnits = gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS); // min: 0
        this.maximumVertexUniformVectors = gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS); // min: 128

        var aliasedLineWidthRange = gl.getParameter(gl.ALIASED_LINE_WIDTH_RANGE); // must include 1
        this.minimumAliasedLineWidth = aliasedLineWidthRange[0];
        this.maximumAliasedLineWidth = aliasedLineWidthRange[1];

        var aliasedPointSizeRange = gl.getParameter(gl.ALIASED_POINT_SIZE_RANGE); // must include 1
        this.minimumAliasedPointSize = aliasedPointSizeRange[0];
        this.maximumAliasedPointSize = aliasedPointSizeRange[1];

        var maximumViewportDimensions = gl.getParameter(gl.MAX_VIEWPORT_DIMS);
        this.maximumViewportWidth = maximumViewportDimensions[0];
        this.maximumViewportHeight = maximumViewportDimensions[1];

        var highpFloat = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_FLOAT);
        this.highpFloatSupported = highpFloat.precision !== 0;
        var highpInt = gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.HIGH_INT);
        this.highpIntSupported = highpInt.rangeMax !== 0;
    }
}