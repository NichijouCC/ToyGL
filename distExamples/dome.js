(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (factory());
}(this, (function () { 'use strict';

    /**
     * Enum containing WebGL Constant values by name.
     * for use without an active WebGL context, or in cases where certain constants are unavailable using the WebGL context
     * (For example, in [Safari 9]{@link https://github.com/AnalyticalGraphicsInc/cesium/issues/2989}).
     *
     * These match the constants from the [WebGL 1.0]{@link https://www.khronos.org/registry/webgl/specs/latest/1.0/}
     * and [WebGL 2.0]{@link https://www.khronos.org/registry/webgl/specs/latest/2.0/}
     * specifications.
     */
    var GlConstants;
    (function (GlConstants) {
        GlConstants[GlConstants["DEPTH_BUFFER_BIT"] = 256] = "DEPTH_BUFFER_BIT";
        GlConstants[GlConstants["STENCIL_BUFFER_BIT"] = 1024] = "STENCIL_BUFFER_BIT";
        GlConstants[GlConstants["COLOR_BUFFER_BIT"] = 16384] = "COLOR_BUFFER_BIT";
        GlConstants[GlConstants["POINTS"] = 0] = "POINTS";
        GlConstants[GlConstants["LINES"] = 1] = "LINES";
        GlConstants[GlConstants["LINE_LOOP"] = 2] = "LINE_LOOP";
        GlConstants[GlConstants["LINE_STRIP"] = 3] = "LINE_STRIP";
        GlConstants[GlConstants["TRIANGLES"] = 4] = "TRIANGLES";
        GlConstants[GlConstants["TRIANGLE_STRIP"] = 5] = "TRIANGLE_STRIP";
        GlConstants[GlConstants["TRIANGLE_FAN"] = 6] = "TRIANGLE_FAN";
        GlConstants[GlConstants["ZERO"] = 0] = "ZERO";
        GlConstants[GlConstants["ONE"] = 1] = "ONE";
        GlConstants[GlConstants["SRC_COLOR"] = 768] = "SRC_COLOR";
        GlConstants[GlConstants["ONE_MINUS_SRC_COLOR"] = 769] = "ONE_MINUS_SRC_COLOR";
        GlConstants[GlConstants["SRC_ALPHA"] = 770] = "SRC_ALPHA";
        GlConstants[GlConstants["ONE_MINUS_SRC_ALPHA"] = 771] = "ONE_MINUS_SRC_ALPHA";
        GlConstants[GlConstants["DST_ALPHA"] = 772] = "DST_ALPHA";
        GlConstants[GlConstants["ONE_MINUS_DST_ALPHA"] = 773] = "ONE_MINUS_DST_ALPHA";
        GlConstants[GlConstants["DST_COLOR"] = 774] = "DST_COLOR";
        GlConstants[GlConstants["ONE_MINUS_DST_COLOR"] = 775] = "ONE_MINUS_DST_COLOR";
        GlConstants[GlConstants["SRC_ALPHA_SATURATE"] = 776] = "SRC_ALPHA_SATURATE";
        GlConstants[GlConstants["FUNC_ADD"] = 32774] = "FUNC_ADD";
        GlConstants[GlConstants["BLEND_EQUATION"] = 32777] = "BLEND_EQUATION";
        GlConstants[GlConstants["BLEND_EQUATION_RGB"] = 32777] = "BLEND_EQUATION_RGB";
        GlConstants[GlConstants["BLEND_EQUATION_ALPHA"] = 34877] = "BLEND_EQUATION_ALPHA";
        GlConstants[GlConstants["FUNC_SUBTRACT"] = 32778] = "FUNC_SUBTRACT";
        GlConstants[GlConstants["FUNC_REVERSE_SUBTRACT"] = 32779] = "FUNC_REVERSE_SUBTRACT";
        GlConstants[GlConstants["BLEND_DST_RGB"] = 32968] = "BLEND_DST_RGB";
        GlConstants[GlConstants["BLEND_SRC_RGB"] = 32969] = "BLEND_SRC_RGB";
        GlConstants[GlConstants["BLEND_DST_ALPHA"] = 32970] = "BLEND_DST_ALPHA";
        GlConstants[GlConstants["BLEND_SRC_ALPHA"] = 32971] = "BLEND_SRC_ALPHA";
        GlConstants[GlConstants["CONSTANT_COLOR"] = 32769] = "CONSTANT_COLOR";
        GlConstants[GlConstants["ONE_MINUS_CONSTANT_COLOR"] = 32770] = "ONE_MINUS_CONSTANT_COLOR";
        GlConstants[GlConstants["CONSTANT_ALPHA"] = 32771] = "CONSTANT_ALPHA";
        GlConstants[GlConstants["ONE_MINUS_CONSTANT_ALPHA"] = 32772] = "ONE_MINUS_CONSTANT_ALPHA";
        GlConstants[GlConstants["BLEND_COLOR"] = 32773] = "BLEND_COLOR";
        GlConstants[GlConstants["ARRAY_BUFFER"] = 34962] = "ARRAY_BUFFER";
        GlConstants[GlConstants["ELEMENT_ARRAY_BUFFER"] = 34963] = "ELEMENT_ARRAY_BUFFER";
        GlConstants[GlConstants["ARRAY_BUFFER_BINDING"] = 34964] = "ARRAY_BUFFER_BINDING";
        GlConstants[GlConstants["ELEMENT_ARRAY_BUFFER_BINDING"] = 34965] = "ELEMENT_ARRAY_BUFFER_BINDING";
        GlConstants[GlConstants["STREAM_DRAW"] = 35040] = "STREAM_DRAW";
        GlConstants[GlConstants["STATIC_DRAW"] = 35044] = "STATIC_DRAW";
        GlConstants[GlConstants["DYNAMIC_DRAW"] = 35048] = "DYNAMIC_DRAW";
        GlConstants[GlConstants["BUFFER_SIZE"] = 34660] = "BUFFER_SIZE";
        GlConstants[GlConstants["BUFFER_USAGE"] = 34661] = "BUFFER_USAGE";
        GlConstants[GlConstants["CURRENT_VERTEX_ATTRIB"] = 34342] = "CURRENT_VERTEX_ATTRIB";
        GlConstants[GlConstants["FRONT"] = 1028] = "FRONT";
        GlConstants[GlConstants["BACK"] = 1029] = "BACK";
        GlConstants[GlConstants["FRONT_AND_BACK"] = 1032] = "FRONT_AND_BACK";
        GlConstants[GlConstants["CULL_FACE"] = 2884] = "CULL_FACE";
        GlConstants[GlConstants["BLEND"] = 3042] = "BLEND";
        GlConstants[GlConstants["DITHER"] = 3024] = "DITHER";
        GlConstants[GlConstants["STENCIL_TEST"] = 2960] = "STENCIL_TEST";
        GlConstants[GlConstants["DEPTH_TEST"] = 2929] = "DEPTH_TEST";
        GlConstants[GlConstants["SCISSOR_TEST"] = 3089] = "SCISSOR_TEST";
        GlConstants[GlConstants["POLYGON_OFFSET_FILL"] = 32823] = "POLYGON_OFFSET_FILL";
        GlConstants[GlConstants["SAMPLE_ALPHA_TO_COVERAGE"] = 32926] = "SAMPLE_ALPHA_TO_COVERAGE";
        GlConstants[GlConstants["SAMPLE_COVERAGE"] = 32928] = "SAMPLE_COVERAGE";
        GlConstants[GlConstants["NO_ERROR"] = 0] = "NO_ERROR";
        GlConstants[GlConstants["INVALID_ENUM"] = 1280] = "INVALID_ENUM";
        GlConstants[GlConstants["INVALID_VALUE"] = 1281] = "INVALID_VALUE";
        GlConstants[GlConstants["INVALID_OPERATION"] = 1282] = "INVALID_OPERATION";
        GlConstants[GlConstants["OUT_OF_MEMORY"] = 1285] = "OUT_OF_MEMORY";
        GlConstants[GlConstants["CW"] = 2304] = "CW";
        GlConstants[GlConstants["CCW"] = 2305] = "CCW";
        GlConstants[GlConstants["LINE_WIDTH"] = 2849] = "LINE_WIDTH";
        GlConstants[GlConstants["ALIASED_POINT_SIZE_RANGE"] = 33901] = "ALIASED_POINT_SIZE_RANGE";
        GlConstants[GlConstants["ALIASED_LINE_WIDTH_RANGE"] = 33902] = "ALIASED_LINE_WIDTH_RANGE";
        GlConstants[GlConstants["CULL_FACE_MODE"] = 2885] = "CULL_FACE_MODE";
        GlConstants[GlConstants["FRONT_FACE"] = 2886] = "FRONT_FACE";
        GlConstants[GlConstants["DEPTH_RANGE"] = 2928] = "DEPTH_RANGE";
        GlConstants[GlConstants["DEPTH_WRITEMASK"] = 2930] = "DEPTH_WRITEMASK";
        GlConstants[GlConstants["DEPTH_CLEAR_VALUE"] = 2931] = "DEPTH_CLEAR_VALUE";
        GlConstants[GlConstants["DEPTH_FUNC"] = 2932] = "DEPTH_FUNC";
        GlConstants[GlConstants["STENCIL_CLEAR_VALUE"] = 2961] = "STENCIL_CLEAR_VALUE";
        GlConstants[GlConstants["STENCIL_FUNC"] = 2962] = "STENCIL_FUNC";
        GlConstants[GlConstants["STENCIL_FAIL"] = 2964] = "STENCIL_FAIL";
        GlConstants[GlConstants["STENCIL_PASS_DEPTH_FAIL"] = 2965] = "STENCIL_PASS_DEPTH_FAIL";
        GlConstants[GlConstants["STENCIL_PASS_DEPTH_PASS"] = 2966] = "STENCIL_PASS_DEPTH_PASS";
        GlConstants[GlConstants["STENCIL_REF"] = 2967] = "STENCIL_REF";
        GlConstants[GlConstants["STENCIL_VALUE_MASK"] = 2963] = "STENCIL_VALUE_MASK";
        GlConstants[GlConstants["STENCIL_WRITEMASK"] = 2968] = "STENCIL_WRITEMASK";
        GlConstants[GlConstants["STENCIL_BACK_FUNC"] = 34816] = "STENCIL_BACK_FUNC";
        GlConstants[GlConstants["STENCIL_BACK_FAIL"] = 34817] = "STENCIL_BACK_FAIL";
        GlConstants[GlConstants["STENCIL_BACK_PASS_DEPTH_FAIL"] = 34818] = "STENCIL_BACK_PASS_DEPTH_FAIL";
        GlConstants[GlConstants["STENCIL_BACK_PASS_DEPTH_PASS"] = 34819] = "STENCIL_BACK_PASS_DEPTH_PASS";
        GlConstants[GlConstants["STENCIL_BACK_REF"] = 36003] = "STENCIL_BACK_REF";
        GlConstants[GlConstants["STENCIL_BACK_VALUE_MASK"] = 36004] = "STENCIL_BACK_VALUE_MASK";
        GlConstants[GlConstants["STENCIL_BACK_WRITEMASK"] = 36005] = "STENCIL_BACK_WRITEMASK";
        GlConstants[GlConstants["VIEWPORT"] = 2978] = "VIEWPORT";
        GlConstants[GlConstants["SCISSOR_BOX"] = 3088] = "SCISSOR_BOX";
        GlConstants[GlConstants["COLOR_CLEAR_VALUE"] = 3106] = "COLOR_CLEAR_VALUE";
        GlConstants[GlConstants["COLOR_WRITEMASK"] = 3107] = "COLOR_WRITEMASK";
        GlConstants[GlConstants["UNPACK_ALIGNMENT"] = 3317] = "UNPACK_ALIGNMENT";
        GlConstants[GlConstants["PACK_ALIGNMENT"] = 3333] = "PACK_ALIGNMENT";
        GlConstants[GlConstants["MAX_TEXTURE_SIZE"] = 3379] = "MAX_TEXTURE_SIZE";
        GlConstants[GlConstants["MAX_VIEWPORT_DIMS"] = 3386] = "MAX_VIEWPORT_DIMS";
        GlConstants[GlConstants["SUBPIXEL_BITS"] = 3408] = "SUBPIXEL_BITS";
        GlConstants[GlConstants["RED_BITS"] = 3410] = "RED_BITS";
        GlConstants[GlConstants["GREEN_BITS"] = 3411] = "GREEN_BITS";
        GlConstants[GlConstants["BLUE_BITS"] = 3412] = "BLUE_BITS";
        GlConstants[GlConstants["ALPHA_BITS"] = 3413] = "ALPHA_BITS";
        GlConstants[GlConstants["DEPTH_BITS"] = 3414] = "DEPTH_BITS";
        GlConstants[GlConstants["STENCIL_BITS"] = 3415] = "STENCIL_BITS";
        GlConstants[GlConstants["POLYGON_OFFSET_UNITS"] = 10752] = "POLYGON_OFFSET_UNITS";
        GlConstants[GlConstants["POLYGON_OFFSET_FACTOR"] = 32824] = "POLYGON_OFFSET_FACTOR";
        GlConstants[GlConstants["TEXTURE_BINDING_2D"] = 32873] = "TEXTURE_BINDING_2D";
        GlConstants[GlConstants["SAMPLE_BUFFERS"] = 32936] = "SAMPLE_BUFFERS";
        GlConstants[GlConstants["SAMPLES"] = 32937] = "SAMPLES";
        GlConstants[GlConstants["SAMPLE_COVERAGE_VALUE"] = 32938] = "SAMPLE_COVERAGE_VALUE";
        GlConstants[GlConstants["SAMPLE_COVERAGE_INVERT"] = 32939] = "SAMPLE_COVERAGE_INVERT";
        GlConstants[GlConstants["COMPRESSED_TEXTURE_FORMATS"] = 34467] = "COMPRESSED_TEXTURE_FORMATS";
        GlConstants[GlConstants["DONT_CARE"] = 4352] = "DONT_CARE";
        GlConstants[GlConstants["FASTEST"] = 4353] = "FASTEST";
        GlConstants[GlConstants["NICEST"] = 4354] = "NICEST";
        GlConstants[GlConstants["GENERATE_MIPMAP_HINT"] = 33170] = "GENERATE_MIPMAP_HINT";
        GlConstants[GlConstants["BYTE"] = 5120] = "BYTE";
        GlConstants[GlConstants["UNSIGNED_BYTE"] = 5121] = "UNSIGNED_BYTE";
        GlConstants[GlConstants["SHORT"] = 5122] = "SHORT";
        GlConstants[GlConstants["UNSIGNED_SHORT"] = 5123] = "UNSIGNED_SHORT";
        GlConstants[GlConstants["INT"] = 5124] = "INT";
        GlConstants[GlConstants["UNSIGNED_INT"] = 5125] = "UNSIGNED_INT";
        GlConstants[GlConstants["FLOAT"] = 5126] = "FLOAT";
        GlConstants[GlConstants["DEPTH_COMPONENT"] = 6402] = "DEPTH_COMPONENT";
        GlConstants[GlConstants["ALPHA"] = 6406] = "ALPHA";
        GlConstants[GlConstants["RGB"] = 6407] = "RGB";
        GlConstants[GlConstants["RGBA"] = 6408] = "RGBA";
        GlConstants[GlConstants["LUMINANCE"] = 6409] = "LUMINANCE";
        GlConstants[GlConstants["LUMINANCE_ALPHA"] = 6410] = "LUMINANCE_ALPHA";
        GlConstants[GlConstants["UNSIGNED_SHORT_4_4_4_4"] = 32819] = "UNSIGNED_SHORT_4_4_4_4";
        GlConstants[GlConstants["UNSIGNED_SHORT_5_5_5_1"] = 32820] = "UNSIGNED_SHORT_5_5_5_1";
        GlConstants[GlConstants["UNSIGNED_SHORT_5_6_5"] = 33635] = "UNSIGNED_SHORT_5_6_5";
        GlConstants[GlConstants["FRAGMENT_SHADER"] = 35632] = "FRAGMENT_SHADER";
        GlConstants[GlConstants["VERTEX_SHADER"] = 35633] = "VERTEX_SHADER";
        GlConstants[GlConstants["MAX_VERTEX_ATTRIBS"] = 34921] = "MAX_VERTEX_ATTRIBS";
        GlConstants[GlConstants["MAX_VERTEX_UNIFORM_VECTORS"] = 36347] = "MAX_VERTEX_UNIFORM_VECTORS";
        GlConstants[GlConstants["MAX_VARYING_VECTORS"] = 36348] = "MAX_VARYING_VECTORS";
        GlConstants[GlConstants["MAX_COMBINED_TEXTURE_IMAGE_UNITS"] = 35661] = "MAX_COMBINED_TEXTURE_IMAGE_UNITS";
        GlConstants[GlConstants["MAX_VERTEX_TEXTURE_IMAGE_UNITS"] = 35660] = "MAX_VERTEX_TEXTURE_IMAGE_UNITS";
        GlConstants[GlConstants["MAX_TEXTURE_IMAGE_UNITS"] = 34930] = "MAX_TEXTURE_IMAGE_UNITS";
        GlConstants[GlConstants["MAX_FRAGMENT_UNIFORM_VECTORS"] = 36349] = "MAX_FRAGMENT_UNIFORM_VECTORS";
        GlConstants[GlConstants["SHADER_TYPE"] = 35663] = "SHADER_TYPE";
        GlConstants[GlConstants["DELETE_STATUS"] = 35712] = "DELETE_STATUS";
        GlConstants[GlConstants["LINK_STATUS"] = 35714] = "LINK_STATUS";
        GlConstants[GlConstants["VALIDATE_STATUS"] = 35715] = "VALIDATE_STATUS";
        GlConstants[GlConstants["ATTACHED_SHADERS"] = 35717] = "ATTACHED_SHADERS";
        GlConstants[GlConstants["ACTIVE_UNIFORMS"] = 35718] = "ACTIVE_UNIFORMS";
        GlConstants[GlConstants["ACTIVE_ATTRIBUTES"] = 35721] = "ACTIVE_ATTRIBUTES";
        GlConstants[GlConstants["SHADING_LANGUAGE_VERSION"] = 35724] = "SHADING_LANGUAGE_VERSION";
        GlConstants[GlConstants["CURRENT_PROGRAM"] = 35725] = "CURRENT_PROGRAM";
        GlConstants[GlConstants["NEVER"] = 512] = "NEVER";
        GlConstants[GlConstants["LESS"] = 513] = "LESS";
        GlConstants[GlConstants["EQUAL"] = 514] = "EQUAL";
        GlConstants[GlConstants["LEQUAL"] = 515] = "LEQUAL";
        GlConstants[GlConstants["GREATER"] = 516] = "GREATER";
        GlConstants[GlConstants["NOTEQUAL"] = 517] = "NOTEQUAL";
        GlConstants[GlConstants["GEQUAL"] = 518] = "GEQUAL";
        GlConstants[GlConstants["ALWAYS"] = 519] = "ALWAYS";
        GlConstants[GlConstants["KEEP"] = 7680] = "KEEP";
        GlConstants[GlConstants["REPLACE"] = 7681] = "REPLACE";
        GlConstants[GlConstants["INCR"] = 7682] = "INCR";
        GlConstants[GlConstants["DECR"] = 7683] = "DECR";
        GlConstants[GlConstants["INVERT"] = 5386] = "INVERT";
        GlConstants[GlConstants["INCR_WRAP"] = 34055] = "INCR_WRAP";
        GlConstants[GlConstants["DECR_WRAP"] = 34056] = "DECR_WRAP";
        GlConstants[GlConstants["VENDOR"] = 7936] = "VENDOR";
        GlConstants[GlConstants["RENDERER"] = 7937] = "RENDERER";
        GlConstants[GlConstants["VERSION"] = 7938] = "VERSION";
        GlConstants[GlConstants["NEAREST"] = 9728] = "NEAREST";
        GlConstants[GlConstants["LINEAR"] = 9729] = "LINEAR";
        GlConstants[GlConstants["NEAREST_MIPMAP_NEAREST"] = 9984] = "NEAREST_MIPMAP_NEAREST";
        GlConstants[GlConstants["LINEAR_MIPMAP_NEAREST"] = 9985] = "LINEAR_MIPMAP_NEAREST";
        GlConstants[GlConstants["NEAREST_MIPMAP_LINEAR"] = 9986] = "NEAREST_MIPMAP_LINEAR";
        GlConstants[GlConstants["LINEAR_MIPMAP_LINEAR"] = 9987] = "LINEAR_MIPMAP_LINEAR";
        GlConstants[GlConstants["TEXTURE_MAG_FILTER"] = 10240] = "TEXTURE_MAG_FILTER";
        GlConstants[GlConstants["TEXTURE_MIN_FILTER"] = 10241] = "TEXTURE_MIN_FILTER";
        GlConstants[GlConstants["TEXTURE_WRAP_S"] = 10242] = "TEXTURE_WRAP_S";
        GlConstants[GlConstants["TEXTURE_WRAP_T"] = 10243] = "TEXTURE_WRAP_T";
        GlConstants[GlConstants["TEXTURE_2D"] = 3553] = "TEXTURE_2D";
        GlConstants[GlConstants["TEXTURE"] = 5890] = "TEXTURE";
        GlConstants[GlConstants["TEXTURE_CUBE_MAP"] = 34067] = "TEXTURE_CUBE_MAP";
        GlConstants[GlConstants["TEXTURE_BINDING_CUBE_MAP"] = 34068] = "TEXTURE_BINDING_CUBE_MAP";
        GlConstants[GlConstants["TEXTURE_CUBE_MAP_POSITIVE_X"] = 34069] = "TEXTURE_CUBE_MAP_POSITIVE_X";
        GlConstants[GlConstants["TEXTURE_CUBE_MAP_NEGATIVE_X"] = 34070] = "TEXTURE_CUBE_MAP_NEGATIVE_X";
        GlConstants[GlConstants["TEXTURE_CUBE_MAP_POSITIVE_Y"] = 34071] = "TEXTURE_CUBE_MAP_POSITIVE_Y";
        GlConstants[GlConstants["TEXTURE_CUBE_MAP_NEGATIVE_Y"] = 34072] = "TEXTURE_CUBE_MAP_NEGATIVE_Y";
        GlConstants[GlConstants["TEXTURE_CUBE_MAP_POSITIVE_Z"] = 34073] = "TEXTURE_CUBE_MAP_POSITIVE_Z";
        GlConstants[GlConstants["TEXTURE_CUBE_MAP_NEGATIVE_Z"] = 34074] = "TEXTURE_CUBE_MAP_NEGATIVE_Z";
        GlConstants[GlConstants["MAX_CUBE_MAP_TEXTURE_SIZE"] = 34076] = "MAX_CUBE_MAP_TEXTURE_SIZE";
        GlConstants[GlConstants["TEXTURE0"] = 33984] = "TEXTURE0";
        GlConstants[GlConstants["TEXTURE1"] = 33985] = "TEXTURE1";
        GlConstants[GlConstants["TEXTURE2"] = 33986] = "TEXTURE2";
        GlConstants[GlConstants["TEXTURE3"] = 33987] = "TEXTURE3";
        GlConstants[GlConstants["TEXTURE4"] = 33988] = "TEXTURE4";
        GlConstants[GlConstants["TEXTURE5"] = 33989] = "TEXTURE5";
        GlConstants[GlConstants["TEXTURE6"] = 33990] = "TEXTURE6";
        GlConstants[GlConstants["TEXTURE7"] = 33991] = "TEXTURE7";
        GlConstants[GlConstants["TEXTURE8"] = 33992] = "TEXTURE8";
        GlConstants[GlConstants["TEXTURE9"] = 33993] = "TEXTURE9";
        GlConstants[GlConstants["TEXTURE10"] = 33994] = "TEXTURE10";
        GlConstants[GlConstants["TEXTURE11"] = 33995] = "TEXTURE11";
        GlConstants[GlConstants["TEXTURE12"] = 33996] = "TEXTURE12";
        GlConstants[GlConstants["TEXTURE13"] = 33997] = "TEXTURE13";
        GlConstants[GlConstants["TEXTURE14"] = 33998] = "TEXTURE14";
        GlConstants[GlConstants["TEXTURE15"] = 33999] = "TEXTURE15";
        GlConstants[GlConstants["TEXTURE16"] = 34000] = "TEXTURE16";
        GlConstants[GlConstants["TEXTURE17"] = 34001] = "TEXTURE17";
        GlConstants[GlConstants["TEXTURE18"] = 34002] = "TEXTURE18";
        GlConstants[GlConstants["TEXTURE19"] = 34003] = "TEXTURE19";
        GlConstants[GlConstants["TEXTURE20"] = 34004] = "TEXTURE20";
        GlConstants[GlConstants["TEXTURE21"] = 34005] = "TEXTURE21";
        GlConstants[GlConstants["TEXTURE22"] = 34006] = "TEXTURE22";
        GlConstants[GlConstants["TEXTURE23"] = 34007] = "TEXTURE23";
        GlConstants[GlConstants["TEXTURE24"] = 34008] = "TEXTURE24";
        GlConstants[GlConstants["TEXTURE25"] = 34009] = "TEXTURE25";
        GlConstants[GlConstants["TEXTURE26"] = 34010] = "TEXTURE26";
        GlConstants[GlConstants["TEXTURE27"] = 34011] = "TEXTURE27";
        GlConstants[GlConstants["TEXTURE28"] = 34012] = "TEXTURE28";
        GlConstants[GlConstants["TEXTURE29"] = 34013] = "TEXTURE29";
        GlConstants[GlConstants["TEXTURE30"] = 34014] = "TEXTURE30";
        GlConstants[GlConstants["TEXTURE31"] = 34015] = "TEXTURE31";
        GlConstants[GlConstants["ACTIVE_TEXTURE"] = 34016] = "ACTIVE_TEXTURE";
        GlConstants[GlConstants["REPEAT"] = 10497] = "REPEAT";
        GlConstants[GlConstants["CLAMP_TO_EDGE"] = 33071] = "CLAMP_TO_EDGE";
        GlConstants[GlConstants["MIRRORED_REPEAT"] = 33648] = "MIRRORED_REPEAT";
        GlConstants[GlConstants["FLOAT_VEC2"] = 35664] = "FLOAT_VEC2";
        GlConstants[GlConstants["FLOAT_VEC3"] = 35665] = "FLOAT_VEC3";
        GlConstants[GlConstants["FLOAT_VEC4"] = 35666] = "FLOAT_VEC4";
        GlConstants[GlConstants["INT_VEC2"] = 35667] = "INT_VEC2";
        GlConstants[GlConstants["INT_VEC3"] = 35668] = "INT_VEC3";
        GlConstants[GlConstants["INT_VEC4"] = 35669] = "INT_VEC4";
        GlConstants[GlConstants["BOOL"] = 35670] = "BOOL";
        GlConstants[GlConstants["BOOL_VEC2"] = 35671] = "BOOL_VEC2";
        GlConstants[GlConstants["BOOL_VEC3"] = 35672] = "BOOL_VEC3";
        GlConstants[GlConstants["BOOL_VEC4"] = 35673] = "BOOL_VEC4";
        GlConstants[GlConstants["FLOAT_MAT2"] = 35674] = "FLOAT_MAT2";
        GlConstants[GlConstants["FLOAT_MAT3"] = 35675] = "FLOAT_MAT3";
        GlConstants[GlConstants["FLOAT_MAT4"] = 35676] = "FLOAT_MAT4";
        GlConstants[GlConstants["SAMPLER_2D"] = 35678] = "SAMPLER_2D";
        GlConstants[GlConstants["SAMPLER_CUBE"] = 35680] = "SAMPLER_CUBE";
        GlConstants[GlConstants["VERTEX_ATTRIB_ARRAY_ENABLED"] = 34338] = "VERTEX_ATTRIB_ARRAY_ENABLED";
        GlConstants[GlConstants["VERTEX_ATTRIB_ARRAY_SIZE"] = 34339] = "VERTEX_ATTRIB_ARRAY_SIZE";
        GlConstants[GlConstants["VERTEX_ATTRIB_ARRAY_STRIDE"] = 34340] = "VERTEX_ATTRIB_ARRAY_STRIDE";
        GlConstants[GlConstants["VERTEX_ATTRIB_ARRAY_TYPE"] = 34341] = "VERTEX_ATTRIB_ARRAY_TYPE";
        GlConstants[GlConstants["VERTEX_ATTRIB_ARRAY_NORMALIZED"] = 34922] = "VERTEX_ATTRIB_ARRAY_NORMALIZED";
        GlConstants[GlConstants["VERTEX_ATTRIB_ARRAY_POINTER"] = 34373] = "VERTEX_ATTRIB_ARRAY_POINTER";
        GlConstants[GlConstants["VERTEX_ATTRIB_ARRAY_BUFFER_BINDING"] = 34975] = "VERTEX_ATTRIB_ARRAY_BUFFER_BINDING";
        GlConstants[GlConstants["IMPLEMENTATION_COLOR_READ_TYPE"] = 35738] = "IMPLEMENTATION_COLOR_READ_TYPE";
        GlConstants[GlConstants["IMPLEMENTATION_COLOR_READ_FORMAT"] = 35739] = "IMPLEMENTATION_COLOR_READ_FORMAT";
        GlConstants[GlConstants["COMPILE_STATUS"] = 35713] = "COMPILE_STATUS";
        GlConstants[GlConstants["LOW_FLOAT"] = 36336] = "LOW_FLOAT";
        GlConstants[GlConstants["MEDIUM_FLOAT"] = 36337] = "MEDIUM_FLOAT";
        GlConstants[GlConstants["HIGH_FLOAT"] = 36338] = "HIGH_FLOAT";
        GlConstants[GlConstants["LOW_INT"] = 36339] = "LOW_INT";
        GlConstants[GlConstants["MEDIUM_INT"] = 36340] = "MEDIUM_INT";
        GlConstants[GlConstants["HIGH_INT"] = 36341] = "HIGH_INT";
        GlConstants[GlConstants["FRAMEBUFFER"] = 36160] = "FRAMEBUFFER";
        GlConstants[GlConstants["RENDERBUFFER"] = 36161] = "RENDERBUFFER";
        GlConstants[GlConstants["RGBA4"] = 32854] = "RGBA4";
        GlConstants[GlConstants["RGB5_A1"] = 32855] = "RGB5_A1";
        GlConstants[GlConstants["RGB565"] = 36194] = "RGB565";
        GlConstants[GlConstants["DEPTH_COMPONENT16"] = 33189] = "DEPTH_COMPONENT16";
        GlConstants[GlConstants["STENCIL_INDEX"] = 6401] = "STENCIL_INDEX";
        GlConstants[GlConstants["STENCIL_INDEX8"] = 36168] = "STENCIL_INDEX8";
        GlConstants[GlConstants["DEPTH_STENCIL"] = 34041] = "DEPTH_STENCIL";
        GlConstants[GlConstants["RENDERBUFFER_WIDTH"] = 36162] = "RENDERBUFFER_WIDTH";
        GlConstants[GlConstants["RENDERBUFFER_HEIGHT"] = 36163] = "RENDERBUFFER_HEIGHT";
        GlConstants[GlConstants["RENDERBUFFER_INTERNAL_FORMAT"] = 36164] = "RENDERBUFFER_INTERNAL_FORMAT";
        GlConstants[GlConstants["RENDERBUFFER_RED_SIZE"] = 36176] = "RENDERBUFFER_RED_SIZE";
        GlConstants[GlConstants["RENDERBUFFER_GREEN_SIZE"] = 36177] = "RENDERBUFFER_GREEN_SIZE";
        GlConstants[GlConstants["RENDERBUFFER_BLUE_SIZE"] = 36178] = "RENDERBUFFER_BLUE_SIZE";
        GlConstants[GlConstants["RENDERBUFFER_ALPHA_SIZE"] = 36179] = "RENDERBUFFER_ALPHA_SIZE";
        GlConstants[GlConstants["RENDERBUFFER_DEPTH_SIZE"] = 36180] = "RENDERBUFFER_DEPTH_SIZE";
        GlConstants[GlConstants["RENDERBUFFER_STENCIL_SIZE"] = 36181] = "RENDERBUFFER_STENCIL_SIZE";
        GlConstants[GlConstants["FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE"] = 36048] = "FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE";
        GlConstants[GlConstants["FRAMEBUFFER_ATTACHMENT_OBJECT_NAME"] = 36049] = "FRAMEBUFFER_ATTACHMENT_OBJECT_NAME";
        GlConstants[GlConstants["FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL"] = 36050] = "FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL";
        GlConstants[GlConstants["FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE"] = 36051] = "FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE";
        GlConstants[GlConstants["COLOR_ATTACHMENT0"] = 36064] = "COLOR_ATTACHMENT0";
        GlConstants[GlConstants["DEPTH_ATTACHMENT"] = 36096] = "DEPTH_ATTACHMENT";
        GlConstants[GlConstants["STENCIL_ATTACHMENT"] = 36128] = "STENCIL_ATTACHMENT";
        GlConstants[GlConstants["DEPTH_STENCIL_ATTACHMENT"] = 33306] = "DEPTH_STENCIL_ATTACHMENT";
        GlConstants[GlConstants["NONE"] = 0] = "NONE";
        GlConstants[GlConstants["FRAMEBUFFER_COMPLETE"] = 36053] = "FRAMEBUFFER_COMPLETE";
        GlConstants[GlConstants["FRAMEBUFFER_INCOMPLETE_ATTACHMENT"] = 36054] = "FRAMEBUFFER_INCOMPLETE_ATTACHMENT";
        GlConstants[GlConstants["FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT"] = 36055] = "FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT";
        GlConstants[GlConstants["FRAMEBUFFER_INCOMPLETE_DIMENSIONS"] = 36057] = "FRAMEBUFFER_INCOMPLETE_DIMENSIONS";
        GlConstants[GlConstants["FRAMEBUFFER_UNSUPPORTED"] = 36061] = "FRAMEBUFFER_UNSUPPORTED";
        GlConstants[GlConstants["FRAMEBUFFER_BINDING"] = 36006] = "FRAMEBUFFER_BINDING";
        GlConstants[GlConstants["RENDERBUFFER_BINDING"] = 36007] = "RENDERBUFFER_BINDING";
        GlConstants[GlConstants["MAX_RENDERBUFFER_SIZE"] = 34024] = "MAX_RENDERBUFFER_SIZE";
        GlConstants[GlConstants["INVALID_FRAMEBUFFER_OPERATION"] = 1286] = "INVALID_FRAMEBUFFER_OPERATION";
        GlConstants[GlConstants["UNPACK_FLIP_Y_WEBGL"] = 37440] = "UNPACK_FLIP_Y_WEBGL";
        GlConstants[GlConstants["UNPACK_PREMULTIPLY_ALPHA_WEBGL"] = 37441] = "UNPACK_PREMULTIPLY_ALPHA_WEBGL";
        GlConstants[GlConstants["CONTEXT_LOST_WEBGL"] = 37442] = "CONTEXT_LOST_WEBGL";
        GlConstants[GlConstants["UNPACK_COLORSPACE_CONVERSION_WEBGL"] = 37443] = "UNPACK_COLORSPACE_CONVERSION_WEBGL";
        GlConstants[GlConstants["BROWSER_DEFAULT_WEBGL"] = 37444] = "BROWSER_DEFAULT_WEBGL";
        // WEBGL_compressed_texture_s3tc
        GlConstants[GlConstants["COMPRESSED_RGB_S3TC_DXT1_EXT"] = 33776] = "COMPRESSED_RGB_S3TC_DXT1_EXT";
        GlConstants[GlConstants["COMPRESSED_RGBA_S3TC_DXT1_EXT"] = 33777] = "COMPRESSED_RGBA_S3TC_DXT1_EXT";
        GlConstants[GlConstants["COMPRESSED_RGBA_S3TC_DXT3_EXT"] = 33778] = "COMPRESSED_RGBA_S3TC_DXT3_EXT";
        GlConstants[GlConstants["COMPRESSED_RGBA_S3TC_DXT5_EXT"] = 33779] = "COMPRESSED_RGBA_S3TC_DXT5_EXT";
        // WEBGL_compressed_texture_pvrtc
        GlConstants[GlConstants["COMPRESSED_RGB_PVRTC_4BPPV1_IMG"] = 35840] = "COMPRESSED_RGB_PVRTC_4BPPV1_IMG";
        GlConstants[GlConstants["COMPRESSED_RGB_PVRTC_2BPPV1_IMG"] = 35841] = "COMPRESSED_RGB_PVRTC_2BPPV1_IMG";
        GlConstants[GlConstants["COMPRESSED_RGBA_PVRTC_4BPPV1_IMG"] = 35842] = "COMPRESSED_RGBA_PVRTC_4BPPV1_IMG";
        GlConstants[GlConstants["COMPRESSED_RGBA_PVRTC_2BPPV1_IMG"] = 35843] = "COMPRESSED_RGBA_PVRTC_2BPPV1_IMG";
        // WEBGL_compressed_texture_etc1
        GlConstants[GlConstants["COMPRESSED_RGB_ETC1_WEBGL"] = 36196] = "COMPRESSED_RGB_ETC1_WEBGL";
        // Desktop OpenGL
        GlConstants[GlConstants["DOUBLE"] = 5130] = "DOUBLE";
        // WebGL 2
        GlConstants[GlConstants["READ_BUFFER"] = 3074] = "READ_BUFFER";
        GlConstants[GlConstants["UNPACK_ROW_LENGTH"] = 3314] = "UNPACK_ROW_LENGTH";
        GlConstants[GlConstants["UNPACK_SKIP_ROWS"] = 3315] = "UNPACK_SKIP_ROWS";
        GlConstants[GlConstants["UNPACK_SKIP_PIXELS"] = 3316] = "UNPACK_SKIP_PIXELS";
        GlConstants[GlConstants["PACK_ROW_LENGTH"] = 3330] = "PACK_ROW_LENGTH";
        GlConstants[GlConstants["PACK_SKIP_ROWS"] = 3331] = "PACK_SKIP_ROWS";
        GlConstants[GlConstants["PACK_SKIP_PIXELS"] = 3332] = "PACK_SKIP_PIXELS";
        GlConstants[GlConstants["COLOR"] = 6144] = "COLOR";
        GlConstants[GlConstants["DEPTH"] = 6145] = "DEPTH";
        GlConstants[GlConstants["STENCIL"] = 6146] = "STENCIL";
        GlConstants[GlConstants["RED"] = 6403] = "RED";
        GlConstants[GlConstants["RGB8"] = 32849] = "RGB8";
        GlConstants[GlConstants["RGBA8"] = 32856] = "RGBA8";
        GlConstants[GlConstants["RGB10_A2"] = 32857] = "RGB10_A2";
        GlConstants[GlConstants["TEXTURE_BINDING_3D"] = 32874] = "TEXTURE_BINDING_3D";
        GlConstants[GlConstants["UNPACK_SKIP_IMAGES"] = 32877] = "UNPACK_SKIP_IMAGES";
        GlConstants[GlConstants["UNPACK_IMAGE_HEIGHT"] = 32878] = "UNPACK_IMAGE_HEIGHT";
        GlConstants[GlConstants["TEXTURE_3D"] = 32879] = "TEXTURE_3D";
        GlConstants[GlConstants["TEXTURE_WRAP_R"] = 32882] = "TEXTURE_WRAP_R";
        GlConstants[GlConstants["MAX_3D_TEXTURE_SIZE"] = 32883] = "MAX_3D_TEXTURE_SIZE";
        GlConstants[GlConstants["UNSIGNED_INT_2_10_10_10_REV"] = 33640] = "UNSIGNED_INT_2_10_10_10_REV";
        GlConstants[GlConstants["MAX_ELEMENTS_VERTICES"] = 33000] = "MAX_ELEMENTS_VERTICES";
        GlConstants[GlConstants["MAX_ELEMENTS_INDICES"] = 33001] = "MAX_ELEMENTS_INDICES";
        GlConstants[GlConstants["TEXTURE_MIN_LOD"] = 33082] = "TEXTURE_MIN_LOD";
        GlConstants[GlConstants["TEXTURE_MAX_LOD"] = 33083] = "TEXTURE_MAX_LOD";
        GlConstants[GlConstants["TEXTURE_BASE_LEVEL"] = 33084] = "TEXTURE_BASE_LEVEL";
        GlConstants[GlConstants["TEXTURE_MAX_LEVEL"] = 33085] = "TEXTURE_MAX_LEVEL";
        GlConstants[GlConstants["MIN"] = 32775] = "MIN";
        GlConstants[GlConstants["MAX"] = 32776] = "MAX";
        GlConstants[GlConstants["DEPTH_COMPONENT24"] = 33190] = "DEPTH_COMPONENT24";
        GlConstants[GlConstants["MAX_TEXTURE_LOD_BIAS"] = 34045] = "MAX_TEXTURE_LOD_BIAS";
        GlConstants[GlConstants["TEXTURE_COMPARE_MODE"] = 34892] = "TEXTURE_COMPARE_MODE";
        GlConstants[GlConstants["TEXTURE_COMPARE_FUNC"] = 34893] = "TEXTURE_COMPARE_FUNC";
        GlConstants[GlConstants["CURRENT_QUERY"] = 34917] = "CURRENT_QUERY";
        GlConstants[GlConstants["QUERY_RESULT"] = 34918] = "QUERY_RESULT";
        GlConstants[GlConstants["QUERY_RESULT_AVAILABLE"] = 34919] = "QUERY_RESULT_AVAILABLE";
        GlConstants[GlConstants["STREAM_READ"] = 35041] = "STREAM_READ";
        GlConstants[GlConstants["STREAM_COPY"] = 35042] = "STREAM_COPY";
        GlConstants[GlConstants["STATIC_READ"] = 35045] = "STATIC_READ";
        GlConstants[GlConstants["STATIC_COPY"] = 35046] = "STATIC_COPY";
        GlConstants[GlConstants["DYNAMIC_READ"] = 35049] = "DYNAMIC_READ";
        GlConstants[GlConstants["DYNAMIC_COPY"] = 35050] = "DYNAMIC_COPY";
        GlConstants[GlConstants["MAX_DRAW_BUFFERS"] = 34852] = "MAX_DRAW_BUFFERS";
        GlConstants[GlConstants["DRAW_BUFFER0"] = 34853] = "DRAW_BUFFER0";
        GlConstants[GlConstants["DRAW_BUFFER1"] = 34854] = "DRAW_BUFFER1";
        GlConstants[GlConstants["DRAW_BUFFER2"] = 34855] = "DRAW_BUFFER2";
        GlConstants[GlConstants["DRAW_BUFFER3"] = 34856] = "DRAW_BUFFER3";
        GlConstants[GlConstants["DRAW_BUFFER4"] = 34857] = "DRAW_BUFFER4";
        GlConstants[GlConstants["DRAW_BUFFER5"] = 34858] = "DRAW_BUFFER5";
        GlConstants[GlConstants["DRAW_BUFFER6"] = 34859] = "DRAW_BUFFER6";
        GlConstants[GlConstants["DRAW_BUFFER7"] = 34860] = "DRAW_BUFFER7";
        GlConstants[GlConstants["DRAW_BUFFER8"] = 34861] = "DRAW_BUFFER8";
        GlConstants[GlConstants["DRAW_BUFFER9"] = 34862] = "DRAW_BUFFER9";
        GlConstants[GlConstants["DRAW_BUFFER10"] = 34863] = "DRAW_BUFFER10";
        GlConstants[GlConstants["DRAW_BUFFER11"] = 34864] = "DRAW_BUFFER11";
        GlConstants[GlConstants["DRAW_BUFFER12"] = 34865] = "DRAW_BUFFER12";
        GlConstants[GlConstants["DRAW_BUFFER13"] = 34866] = "DRAW_BUFFER13";
        GlConstants[GlConstants["DRAW_BUFFER14"] = 34867] = "DRAW_BUFFER14";
        GlConstants[GlConstants["DRAW_BUFFER15"] = 34868] = "DRAW_BUFFER15";
        GlConstants[GlConstants["MAX_FRAGMENT_UNIFORM_COMPONENTS"] = 35657] = "MAX_FRAGMENT_UNIFORM_COMPONENTS";
        GlConstants[GlConstants["MAX_VERTEX_UNIFORM_COMPONENTS"] = 35658] = "MAX_VERTEX_UNIFORM_COMPONENTS";
        GlConstants[GlConstants["SAMPLER_3D"] = 35679] = "SAMPLER_3D";
        GlConstants[GlConstants["SAMPLER_2D_SHADOW"] = 35682] = "SAMPLER_2D_SHADOW";
        GlConstants[GlConstants["FRAGMENT_SHADER_DERIVATIVE_HINT"] = 35723] = "FRAGMENT_SHADER_DERIVATIVE_HINT";
        GlConstants[GlConstants["PIXEL_PACK_BUFFER"] = 35051] = "PIXEL_PACK_BUFFER";
        GlConstants[GlConstants["PIXEL_UNPACK_BUFFER"] = 35052] = "PIXEL_UNPACK_BUFFER";
        GlConstants[GlConstants["PIXEL_PACK_BUFFER_BINDING"] = 35053] = "PIXEL_PACK_BUFFER_BINDING";
        GlConstants[GlConstants["PIXEL_UNPACK_BUFFER_BINDING"] = 35055] = "PIXEL_UNPACK_BUFFER_BINDING";
        GlConstants[GlConstants["FLOAT_MAT2X3"] = 35685] = "FLOAT_MAT2X3";
        GlConstants[GlConstants["FLOAT_MAT2X4"] = 35686] = "FLOAT_MAT2X4";
        GlConstants[GlConstants["FLOAT_MAT3X2"] = 35687] = "FLOAT_MAT3X2";
        GlConstants[GlConstants["FLOAT_MAT3X4"] = 35688] = "FLOAT_MAT3X4";
        GlConstants[GlConstants["FLOAT_MAT4X2"] = 35689] = "FLOAT_MAT4X2";
        GlConstants[GlConstants["FLOAT_MAT4X3"] = 35690] = "FLOAT_MAT4X3";
        GlConstants[GlConstants["SRGB"] = 35904] = "SRGB";
        GlConstants[GlConstants["SRGB8"] = 35905] = "SRGB8";
        GlConstants[GlConstants["SRGB8_ALPHA8"] = 35907] = "SRGB8_ALPHA8";
        GlConstants[GlConstants["COMPARE_REF_TO_TEXTURE"] = 34894] = "COMPARE_REF_TO_TEXTURE";
        GlConstants[GlConstants["RGBA32F"] = 34836] = "RGBA32F";
        GlConstants[GlConstants["RGB32F"] = 34837] = "RGB32F";
        GlConstants[GlConstants["RGBA16F"] = 34842] = "RGBA16F";
        GlConstants[GlConstants["RGB16F"] = 34843] = "RGB16F";
        GlConstants[GlConstants["VERTEX_ATTRIB_ARRAY_INTEGER"] = 35069] = "VERTEX_ATTRIB_ARRAY_INTEGER";
        GlConstants[GlConstants["MAX_ARRAY_TEXTURE_LAYERS"] = 35071] = "MAX_ARRAY_TEXTURE_LAYERS";
        GlConstants[GlConstants["MIN_PROGRAM_TEXEL_OFFSET"] = 35076] = "MIN_PROGRAM_TEXEL_OFFSET";
        GlConstants[GlConstants["MAX_PROGRAM_TEXEL_OFFSET"] = 35077] = "MAX_PROGRAM_TEXEL_OFFSET";
        GlConstants[GlConstants["MAX_VARYING_COMPONENTS"] = 35659] = "MAX_VARYING_COMPONENTS";
        GlConstants[GlConstants["TEXTURE_2D_ARRAY"] = 35866] = "TEXTURE_2D_ARRAY";
        GlConstants[GlConstants["TEXTURE_BINDING_2D_ARRAY"] = 35869] = "TEXTURE_BINDING_2D_ARRAY";
        GlConstants[GlConstants["R11F_G11F_B10F"] = 35898] = "R11F_G11F_B10F";
        GlConstants[GlConstants["UNSIGNED_INT_10F_11F_11F_REV"] = 35899] = "UNSIGNED_INT_10F_11F_11F_REV";
        GlConstants[GlConstants["RGB9_E5"] = 35901] = "RGB9_E5";
        GlConstants[GlConstants["UNSIGNED_INT_5_9_9_9_REV"] = 35902] = "UNSIGNED_INT_5_9_9_9_REV";
        GlConstants[GlConstants["TRANSFORM_FEEDBACK_BUFFER_MODE"] = 35967] = "TRANSFORM_FEEDBACK_BUFFER_MODE";
        GlConstants[GlConstants["MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS"] = 35968] = "MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS";
        GlConstants[GlConstants["TRANSFORM_FEEDBACK_VARYINGS"] = 35971] = "TRANSFORM_FEEDBACK_VARYINGS";
        GlConstants[GlConstants["TRANSFORM_FEEDBACK_BUFFER_START"] = 35972] = "TRANSFORM_FEEDBACK_BUFFER_START";
        GlConstants[GlConstants["TRANSFORM_FEEDBACK_BUFFER_SIZE"] = 35973] = "TRANSFORM_FEEDBACK_BUFFER_SIZE";
        GlConstants[GlConstants["TRANSFORM_FEEDBACK_PRIMITIVES_WRITTEN"] = 35976] = "TRANSFORM_FEEDBACK_PRIMITIVES_WRITTEN";
        GlConstants[GlConstants["RASTERIZER_DISCARD"] = 35977] = "RASTERIZER_DISCARD";
        GlConstants[GlConstants["MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS"] = 35978] = "MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS";
        GlConstants[GlConstants["MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS"] = 35979] = "MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS";
        GlConstants[GlConstants["INTERLEAVED_ATTRIBS"] = 35980] = "INTERLEAVED_ATTRIBS";
        GlConstants[GlConstants["SEPARATE_ATTRIBS"] = 35981] = "SEPARATE_ATTRIBS";
        GlConstants[GlConstants["TRANSFORM_FEEDBACK_BUFFER"] = 35982] = "TRANSFORM_FEEDBACK_BUFFER";
        GlConstants[GlConstants["TRANSFORM_FEEDBACK_BUFFER_BINDING"] = 35983] = "TRANSFORM_FEEDBACK_BUFFER_BINDING";
        GlConstants[GlConstants["RGBA32UI"] = 36208] = "RGBA32UI";
        GlConstants[GlConstants["RGB32UI"] = 36209] = "RGB32UI";
        GlConstants[GlConstants["RGBA16UI"] = 36214] = "RGBA16UI";
        GlConstants[GlConstants["RGB16UI"] = 36215] = "RGB16UI";
        GlConstants[GlConstants["RGBA8UI"] = 36220] = "RGBA8UI";
        GlConstants[GlConstants["RGB8UI"] = 36221] = "RGB8UI";
        GlConstants[GlConstants["RGBA32I"] = 36226] = "RGBA32I";
        GlConstants[GlConstants["RGB32I"] = 36227] = "RGB32I";
        GlConstants[GlConstants["RGBA16I"] = 36232] = "RGBA16I";
        GlConstants[GlConstants["RGB16I"] = 36233] = "RGB16I";
        GlConstants[GlConstants["RGBA8I"] = 36238] = "RGBA8I";
        GlConstants[GlConstants["RGB8I"] = 36239] = "RGB8I";
        GlConstants[GlConstants["RED_INTEGER"] = 36244] = "RED_INTEGER";
        GlConstants[GlConstants["RGB_INTEGER"] = 36248] = "RGB_INTEGER";
        GlConstants[GlConstants["RGBA_INTEGER"] = 36249] = "RGBA_INTEGER";
        GlConstants[GlConstants["SAMPLER_2D_ARRAY"] = 36289] = "SAMPLER_2D_ARRAY";
        GlConstants[GlConstants["SAMPLER_2D_ARRAY_SHADOW"] = 36292] = "SAMPLER_2D_ARRAY_SHADOW";
        GlConstants[GlConstants["SAMPLER_CUBE_SHADOW"] = 36293] = "SAMPLER_CUBE_SHADOW";
        GlConstants[GlConstants["UNSIGNED_INT_VEC2"] = 36294] = "UNSIGNED_INT_VEC2";
        GlConstants[GlConstants["UNSIGNED_INT_VEC3"] = 36295] = "UNSIGNED_INT_VEC3";
        GlConstants[GlConstants["UNSIGNED_INT_VEC4"] = 36296] = "UNSIGNED_INT_VEC4";
        GlConstants[GlConstants["INT_SAMPLER_2D"] = 36298] = "INT_SAMPLER_2D";
        GlConstants[GlConstants["INT_SAMPLER_3D"] = 36299] = "INT_SAMPLER_3D";
        GlConstants[GlConstants["INT_SAMPLER_CUBE"] = 36300] = "INT_SAMPLER_CUBE";
        GlConstants[GlConstants["INT_SAMPLER_2D_ARRAY"] = 36303] = "INT_SAMPLER_2D_ARRAY";
        GlConstants[GlConstants["UNSIGNED_INT_SAMPLER_2D"] = 36306] = "UNSIGNED_INT_SAMPLER_2D";
        GlConstants[GlConstants["UNSIGNED_INT_SAMPLER_3D"] = 36307] = "UNSIGNED_INT_SAMPLER_3D";
        GlConstants[GlConstants["UNSIGNED_INT_SAMPLER_CUBE"] = 36308] = "UNSIGNED_INT_SAMPLER_CUBE";
        GlConstants[GlConstants["UNSIGNED_INT_SAMPLER_2D_ARRAY"] = 36311] = "UNSIGNED_INT_SAMPLER_2D_ARRAY";
        GlConstants[GlConstants["DEPTH_COMPONENT32F"] = 36012] = "DEPTH_COMPONENT32F";
        GlConstants[GlConstants["DEPTH32F_STENCIL8"] = 36013] = "DEPTH32F_STENCIL8";
        GlConstants[GlConstants["FLOAT_32_UNSIGNED_INT_24_8_REV"] = 36269] = "FLOAT_32_UNSIGNED_INT_24_8_REV";
        GlConstants[GlConstants["FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING"] = 33296] = "FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING";
        GlConstants[GlConstants["FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE"] = 33297] = "FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE";
        GlConstants[GlConstants["FRAMEBUFFER_ATTACHMENT_RED_SIZE"] = 33298] = "FRAMEBUFFER_ATTACHMENT_RED_SIZE";
        GlConstants[GlConstants["FRAMEBUFFER_ATTACHMENT_GREEN_SIZE"] = 33299] = "FRAMEBUFFER_ATTACHMENT_GREEN_SIZE";
        GlConstants[GlConstants["FRAMEBUFFER_ATTACHMENT_BLUE_SIZE"] = 33300] = "FRAMEBUFFER_ATTACHMENT_BLUE_SIZE";
        GlConstants[GlConstants["FRAMEBUFFER_ATTACHMENT_ALPHA_SIZE"] = 33301] = "FRAMEBUFFER_ATTACHMENT_ALPHA_SIZE";
        GlConstants[GlConstants["FRAMEBUFFER_ATTACHMENT_DEPTH_SIZE"] = 33302] = "FRAMEBUFFER_ATTACHMENT_DEPTH_SIZE";
        GlConstants[GlConstants["FRAMEBUFFER_ATTACHMENT_STENCIL_SIZE"] = 33303] = "FRAMEBUFFER_ATTACHMENT_STENCIL_SIZE";
        GlConstants[GlConstants["FRAMEBUFFER_DEFAULT"] = 33304] = "FRAMEBUFFER_DEFAULT";
        GlConstants[GlConstants["UNSIGNED_INT_24_8"] = 34042] = "UNSIGNED_INT_24_8";
        GlConstants[GlConstants["DEPTH24_STENCIL8"] = 35056] = "DEPTH24_STENCIL8";
        GlConstants[GlConstants["UNSIGNED_NORMALIZED"] = 35863] = "UNSIGNED_NORMALIZED";
        GlConstants[GlConstants["DRAW_FRAMEBUFFER_BINDING"] = 36006] = "DRAW_FRAMEBUFFER_BINDING";
        GlConstants[GlConstants["READ_FRAMEBUFFER"] = 36008] = "READ_FRAMEBUFFER";
        GlConstants[GlConstants["DRAW_FRAMEBUFFER"] = 36009] = "DRAW_FRAMEBUFFER";
        GlConstants[GlConstants["READ_FRAMEBUFFER_BINDING"] = 36010] = "READ_FRAMEBUFFER_BINDING";
        GlConstants[GlConstants["RENDERBUFFER_SAMPLES"] = 36011] = "RENDERBUFFER_SAMPLES";
        GlConstants[GlConstants["FRAMEBUFFER_ATTACHMENT_TEXTURE_LAYER"] = 36052] = "FRAMEBUFFER_ATTACHMENT_TEXTURE_LAYER";
        GlConstants[GlConstants["MAX_COLOR_ATTACHMENTS"] = 36063] = "MAX_COLOR_ATTACHMENTS";
        GlConstants[GlConstants["COLOR_ATTACHMENT1"] = 36065] = "COLOR_ATTACHMENT1";
        GlConstants[GlConstants["COLOR_ATTACHMENT2"] = 36066] = "COLOR_ATTACHMENT2";
        GlConstants[GlConstants["COLOR_ATTACHMENT3"] = 36067] = "COLOR_ATTACHMENT3";
        GlConstants[GlConstants["COLOR_ATTACHMENT4"] = 36068] = "COLOR_ATTACHMENT4";
        GlConstants[GlConstants["COLOR_ATTACHMENT5"] = 36069] = "COLOR_ATTACHMENT5";
        GlConstants[GlConstants["COLOR_ATTACHMENT6"] = 36070] = "COLOR_ATTACHMENT6";
        GlConstants[GlConstants["COLOR_ATTACHMENT7"] = 36071] = "COLOR_ATTACHMENT7";
        GlConstants[GlConstants["COLOR_ATTACHMENT8"] = 36072] = "COLOR_ATTACHMENT8";
        GlConstants[GlConstants["COLOR_ATTACHMENT9"] = 36073] = "COLOR_ATTACHMENT9";
        GlConstants[GlConstants["COLOR_ATTACHMENT10"] = 36074] = "COLOR_ATTACHMENT10";
        GlConstants[GlConstants["COLOR_ATTACHMENT11"] = 36075] = "COLOR_ATTACHMENT11";
        GlConstants[GlConstants["COLOR_ATTACHMENT12"] = 36076] = "COLOR_ATTACHMENT12";
        GlConstants[GlConstants["COLOR_ATTACHMENT13"] = 36077] = "COLOR_ATTACHMENT13";
        GlConstants[GlConstants["COLOR_ATTACHMENT14"] = 36078] = "COLOR_ATTACHMENT14";
        GlConstants[GlConstants["COLOR_ATTACHMENT15"] = 36079] = "COLOR_ATTACHMENT15";
        GlConstants[GlConstants["FRAMEBUFFER_INCOMPLETE_MULTISAMPLE"] = 36182] = "FRAMEBUFFER_INCOMPLETE_MULTISAMPLE";
        GlConstants[GlConstants["MAX_SAMPLES"] = 36183] = "MAX_SAMPLES";
        GlConstants[GlConstants["HALF_FLOAT"] = 5131] = "HALF_FLOAT";
        GlConstants[GlConstants["HALF_FLOAT_OES"] = 36193] = "HALF_FLOAT_OES";
        GlConstants[GlConstants["RG"] = 33319] = "RG";
        GlConstants[GlConstants["RG_INTEGER"] = 33320] = "RG_INTEGER";
        GlConstants[GlConstants["R8"] = 33321] = "R8";
        GlConstants[GlConstants["RG8"] = 33323] = "RG8";
        GlConstants[GlConstants["R16F"] = 33325] = "R16F";
        GlConstants[GlConstants["R32F"] = 33326] = "R32F";
        GlConstants[GlConstants["RG16F"] = 33327] = "RG16F";
        GlConstants[GlConstants["RG32F"] = 33328] = "RG32F";
        GlConstants[GlConstants["R8I"] = 33329] = "R8I";
        GlConstants[GlConstants["R8UI"] = 33330] = "R8UI";
        GlConstants[GlConstants["R16I"] = 33331] = "R16I";
        GlConstants[GlConstants["R16UI"] = 33332] = "R16UI";
        GlConstants[GlConstants["R32I"] = 33333] = "R32I";
        GlConstants[GlConstants["R32UI"] = 33334] = "R32UI";
        GlConstants[GlConstants["RG8I"] = 33335] = "RG8I";
        GlConstants[GlConstants["RG8UI"] = 33336] = "RG8UI";
        GlConstants[GlConstants["RG16I"] = 33337] = "RG16I";
        GlConstants[GlConstants["RG16UI"] = 33338] = "RG16UI";
        GlConstants[GlConstants["RG32I"] = 33339] = "RG32I";
        GlConstants[GlConstants["RG32UI"] = 33340] = "RG32UI";
        GlConstants[GlConstants["VERTEX_ARRAY_BINDING"] = 34229] = "VERTEX_ARRAY_BINDING";
        GlConstants[GlConstants["R8_SNORM"] = 36756] = "R8_SNORM";
        GlConstants[GlConstants["RG8_SNORM"] = 36757] = "RG8_SNORM";
        GlConstants[GlConstants["RGB8_SNORM"] = 36758] = "RGB8_SNORM";
        GlConstants[GlConstants["RGBA8_SNORM"] = 36759] = "RGBA8_SNORM";
        GlConstants[GlConstants["SIGNED_NORMALIZED"] = 36764] = "SIGNED_NORMALIZED";
        GlConstants[GlConstants["COPY_READ_BUFFER"] = 36662] = "COPY_READ_BUFFER";
        GlConstants[GlConstants["COPY_WRITE_BUFFER"] = 36663] = "COPY_WRITE_BUFFER";
        GlConstants[GlConstants["COPY_READ_BUFFER_BINDING"] = 36662] = "COPY_READ_BUFFER_BINDING";
        GlConstants[GlConstants["COPY_WRITE_BUFFER_BINDING"] = 36663] = "COPY_WRITE_BUFFER_BINDING";
        GlConstants[GlConstants["UNIFORM_BUFFER"] = 35345] = "UNIFORM_BUFFER";
        GlConstants[GlConstants["UNIFORM_BUFFER_BINDING"] = 35368] = "UNIFORM_BUFFER_BINDING";
        GlConstants[GlConstants["UNIFORM_BUFFER_START"] = 35369] = "UNIFORM_BUFFER_START";
        GlConstants[GlConstants["UNIFORM_BUFFER_SIZE"] = 35370] = "UNIFORM_BUFFER_SIZE";
        GlConstants[GlConstants["MAX_VERTEX_UNIFORM_BLOCKS"] = 35371] = "MAX_VERTEX_UNIFORM_BLOCKS";
        GlConstants[GlConstants["MAX_FRAGMENT_UNIFORM_BLOCKS"] = 35373] = "MAX_FRAGMENT_UNIFORM_BLOCKS";
        GlConstants[GlConstants["MAX_COMBINED_UNIFORM_BLOCKS"] = 35374] = "MAX_COMBINED_UNIFORM_BLOCKS";
        GlConstants[GlConstants["MAX_UNIFORM_BUFFER_BINDINGS"] = 35375] = "MAX_UNIFORM_BUFFER_BINDINGS";
        GlConstants[GlConstants["MAX_UNIFORM_BLOCK_SIZE"] = 35376] = "MAX_UNIFORM_BLOCK_SIZE";
        GlConstants[GlConstants["MAX_COMBINED_VERTEX_UNIFORM_COMPONENTS"] = 35377] = "MAX_COMBINED_VERTEX_UNIFORM_COMPONENTS";
        GlConstants[GlConstants["MAX_COMBINED_FRAGMENT_UNIFORM_COMPONENTS"] = 35379] = "MAX_COMBINED_FRAGMENT_UNIFORM_COMPONENTS";
        GlConstants[GlConstants["UNIFORM_BUFFER_OFFSET_ALIGNMENT"] = 35380] = "UNIFORM_BUFFER_OFFSET_ALIGNMENT";
        GlConstants[GlConstants["ACTIVE_UNIFORM_BLOCKS"] = 35382] = "ACTIVE_UNIFORM_BLOCKS";
        GlConstants[GlConstants["UNIFORM_TYPE"] = 35383] = "UNIFORM_TYPE";
        GlConstants[GlConstants["UNIFORM_SIZE"] = 35384] = "UNIFORM_SIZE";
        GlConstants[GlConstants["UNIFORM_BLOCK_INDEX"] = 35386] = "UNIFORM_BLOCK_INDEX";
        GlConstants[GlConstants["UNIFORM_OFFSET"] = 35387] = "UNIFORM_OFFSET";
        GlConstants[GlConstants["UNIFORM_ARRAY_STRIDE"] = 35388] = "UNIFORM_ARRAY_STRIDE";
        GlConstants[GlConstants["UNIFORM_MATRIX_STRIDE"] = 35389] = "UNIFORM_MATRIX_STRIDE";
        GlConstants[GlConstants["UNIFORM_IS_ROW_MAJOR"] = 35390] = "UNIFORM_IS_ROW_MAJOR";
        GlConstants[GlConstants["UNIFORM_BLOCK_BINDING"] = 35391] = "UNIFORM_BLOCK_BINDING";
        GlConstants[GlConstants["UNIFORM_BLOCK_DATA_SIZE"] = 35392] = "UNIFORM_BLOCK_DATA_SIZE";
        GlConstants[GlConstants["UNIFORM_BLOCK_ACTIVE_UNIFORMS"] = 35394] = "UNIFORM_BLOCK_ACTIVE_UNIFORMS";
        GlConstants[GlConstants["UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES"] = 35395] = "UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES";
        GlConstants[GlConstants["UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER"] = 35396] = "UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER";
        GlConstants[GlConstants["UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER"] = 35398] = "UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER";
        GlConstants[GlConstants["INVALID_INDEX"] = 4294967295] = "INVALID_INDEX";
        GlConstants[GlConstants["MAX_VERTEX_OUTPUT_COMPONENTS"] = 37154] = "MAX_VERTEX_OUTPUT_COMPONENTS";
        GlConstants[GlConstants["MAX_FRAGMENT_INPUT_COMPONENTS"] = 37157] = "MAX_FRAGMENT_INPUT_COMPONENTS";
        GlConstants[GlConstants["MAX_SERVER_WAIT_TIMEOUT"] = 37137] = "MAX_SERVER_WAIT_TIMEOUT";
        GlConstants[GlConstants["OBJECT_TYPE"] = 37138] = "OBJECT_TYPE";
        GlConstants[GlConstants["SYNC_CONDITION"] = 37139] = "SYNC_CONDITION";
        GlConstants[GlConstants["SYNC_STATUS"] = 37140] = "SYNC_STATUS";
        GlConstants[GlConstants["SYNC_FLAGS"] = 37141] = "SYNC_FLAGS";
        GlConstants[GlConstants["SYNC_FENCE"] = 37142] = "SYNC_FENCE";
        GlConstants[GlConstants["SYNC_GPU_COMMANDS_COMPLETE"] = 37143] = "SYNC_GPU_COMMANDS_COMPLETE";
        GlConstants[GlConstants["UNSIGNALED"] = 37144] = "UNSIGNALED";
        GlConstants[GlConstants["SIGNALED"] = 37145] = "SIGNALED";
        GlConstants[GlConstants["ALREADY_SIGNALED"] = 37146] = "ALREADY_SIGNALED";
        GlConstants[GlConstants["TIMEOUT_EXPIRED"] = 37147] = "TIMEOUT_EXPIRED";
        GlConstants[GlConstants["CONDITION_SATISFIED"] = 37148] = "CONDITION_SATISFIED";
        GlConstants[GlConstants["WAIT_FAILED"] = 37149] = "WAIT_FAILED";
        GlConstants[GlConstants["SYNC_FLUSH_COMMANDS_BIT"] = 1] = "SYNC_FLUSH_COMMANDS_BIT";
        GlConstants[GlConstants["VERTEX_ATTRIB_ARRAY_DIVISOR"] = 35070] = "VERTEX_ATTRIB_ARRAY_DIVISOR";
        GlConstants[GlConstants["ANY_SAMPLES_PASSED"] = 35887] = "ANY_SAMPLES_PASSED";
        GlConstants[GlConstants["ANY_SAMPLES_PASSED_CONSERVATIVE"] = 36202] = "ANY_SAMPLES_PASSED_CONSERVATIVE";
        GlConstants[GlConstants["SAMPLER_BINDING"] = 35097] = "SAMPLER_BINDING";
        GlConstants[GlConstants["RGB10_A2UI"] = 36975] = "RGB10_A2UI";
        GlConstants[GlConstants["INT_2_10_10_10_REV"] = 36255] = "INT_2_10_10_10_REV";
        GlConstants[GlConstants["TRANSFORM_FEEDBACK"] = 36386] = "TRANSFORM_FEEDBACK";
        GlConstants[GlConstants["TRANSFORM_FEEDBACK_PAUSED"] = 36387] = "TRANSFORM_FEEDBACK_PAUSED";
        GlConstants[GlConstants["TRANSFORM_FEEDBACK_ACTIVE"] = 36388] = "TRANSFORM_FEEDBACK_ACTIVE";
        GlConstants[GlConstants["TRANSFORM_FEEDBACK_BINDING"] = 36389] = "TRANSFORM_FEEDBACK_BINDING";
        GlConstants[GlConstants["COMPRESSED_R11_EAC"] = 37488] = "COMPRESSED_R11_EAC";
        GlConstants[GlConstants["COMPRESSED_SIGNED_R11_EAC"] = 37489] = "COMPRESSED_SIGNED_R11_EAC";
        GlConstants[GlConstants["COMPRESSED_RG11_EAC"] = 37490] = "COMPRESSED_RG11_EAC";
        GlConstants[GlConstants["COMPRESSED_SIGNED_RG11_EAC"] = 37491] = "COMPRESSED_SIGNED_RG11_EAC";
        GlConstants[GlConstants["COMPRESSED_RGB8_ETC2"] = 37492] = "COMPRESSED_RGB8_ETC2";
        GlConstants[GlConstants["COMPRESSED_SRGB8_ETC2"] = 37493] = "COMPRESSED_SRGB8_ETC2";
        GlConstants[GlConstants["COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2"] = 37494] = "COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2";
        GlConstants[GlConstants["COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2"] = 37495] = "COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2";
        GlConstants[GlConstants["COMPRESSED_RGBA8_ETC2_EAC"] = 37496] = "COMPRESSED_RGBA8_ETC2_EAC";
        GlConstants[GlConstants["COMPRESSED_SRGB8_ALPHA8_ETC2_EAC"] = 37497] = "COMPRESSED_SRGB8_ALPHA8_ETC2_EAC";
        GlConstants[GlConstants["TEXTURE_IMMUTABLE_FORMAT"] = 37167] = "TEXTURE_IMMUTABLE_FORMAT";
        GlConstants[GlConstants["MAX_ELEMENT_INDEX"] = 36203] = "MAX_ELEMENT_INDEX";
        GlConstants[GlConstants["TEXTURE_IMMUTABLE_LEVELS"] = 33503] = "TEXTURE_IMMUTABLE_LEVELS";
        // Extensions
        GlConstants[GlConstants["MAX_TEXTURE_MAX_ANISOTROPY_EXT"] = 34047] = "MAX_TEXTURE_MAX_ANISOTROPY_EXT";
    })(GlConstants || (GlConstants = {}));

    /**
     * Get the GL type for a typedArray
     */
    function getGLTypeForTypedArray(typedArray) {
        if (typedArray instanceof Int8Array) {
            return GlConstants.BYTE;
        }
        if (typedArray instanceof Uint8Array) {
            return GlConstants.UNSIGNED_BYTE;
        }
        if (typedArray instanceof Uint8ClampedArray) {
            return GlConstants.UNSIGNED_BYTE;
        }
        if (typedArray instanceof Int16Array) {
            return GlConstants.SHORT;
        }
        if (typedArray instanceof Uint16Array) {
            return GlConstants.UNSIGNED_SHORT;
        }
        if (typedArray instanceof Int32Array) {
            return GlConstants.INT;
        }
        if (typedArray instanceof Uint32Array) {
            return GlConstants.UNSIGNED_INT;
        }
        if (typedArray instanceof Float32Array) {
            return GlConstants.FLOAT;
        }
        throw "unsupported typed array to gl type";
    }
    function getArrayTypeForGLtype(glType) {
        if (glType == GlConstants.BYTE) {
            return Int8Array;
        }
        if (glType == GlConstants.UNSIGNED_BYTE) {
            return Uint8Array;
        }
        if (glType == GlConstants.UNSIGNED_BYTE) {
            return Uint8ClampedArray;
        }
        if (glType == GlConstants.SHORT) {
            return Int16Array;
        }
        if (glType == GlConstants.UNSIGNED_SHORT) {
            return Uint16Array;
        }
        if (glType == GlConstants.INT) {
            return Int32Array;
        }
        if (glType == GlConstants.UNSIGNED_INT) {
            return Uint32Array;
        }
        if (glType == GlConstants.FLOAT) {
            return Float32Array;
        }
        throw "unsupported gltype to array type";
    }
    function getbytesForGLtype(glType) {
        switch (glType) {
            case GlConstants.BYTE:
                return 1;
            case GlConstants.UNSIGNED_BYTE:
                return 1;
            case GlConstants.SHORT:
                return 2;
            case GlConstants.UNSIGNED_SHORT_4_4_4_4:
                return 2;
            case GlConstants.UNSIGNED_SHORT:
                return 2;
            case GlConstants.INT:
                return 4;
            case GlConstants.UNSIGNED_INT:
                return 4;
            case GlConstants.HALF_FLOAT:
                return 2;
            case GlConstants.HALF_FLOAT_OES:
                return 2;
            case GlConstants.FLOAT:
                return 4;
            default:
                throw "unsupported gltype to bytesPerElement";
        }
    }

    var VertexIndex = /** @class */ (function () {
        function VertexIndex() {
        }
        VertexIndex.fromTarrayInfo = function (data) {
            var newData = new VertexIndex();
            newData.name = "indices";
            if (data instanceof Array) {
                newData.viewBuffer = new Uint16Array(data);
            }
            else if (ArrayBuffer.isView(data)) {
                newData.viewBuffer = data;
            }
            else {
                var arraydata = data.value;
                if (arraydata instanceof Array) {
                    var type = data.componentDataType ? getArrayTypeForGLtype(data.componentDataType) : Uint16Array;
                    newData.viewBuffer = new type(arraydata);
                }
                else {
                    newData.viewBuffer = arraydata;
                }
            }
            var orginData = data;
            if (orginData.componentDataType == null) {
                newData.componentDataType = newData.viewBuffer
                    ? getGLTypeForTypedArray(newData.viewBuffer)
                    : GlConstants.UNSIGNED_SHORT;
            }
            else {
                newData.componentDataType = orginData.componentDataType;
            }
            if (orginData.count == null) {
                newData.count = newData.viewBuffer ? newData.viewBuffer.length : null;
            }
            else {
                newData.count = orginData.count;
            }
            newData.drawType = orginData.drawType ? newData.drawType : GlConstants.STATIC_DRAW;
            if (newData.count == null) {
                throw new Error("can not deduce geometry Indices count.");
            }
            // vertexData.count = newData.indexCount ? newData.indexCount : vertexData.length;
            return newData;
        };
        return VertexIndex;
    }());
    function createIndexBufferInfo(gl, data) {
        var vertexdata = VertexIndex.fromTarrayInfo(data);
        if (vertexdata.glBuffer == null) {
            var buffer = gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, vertexdata.viewBuffer, vertexdata.drawType);
            vertexdata.glBuffer = buffer;
        }
        return vertexdata;
    }

    var VertexAtt = /** @class */ (function () {
        function VertexAtt() {
        }
        VertexAtt.fromTarrayInfo = function (attName, data) {
            var newData = new VertexAtt();
            newData.name = attName;
            if (data instanceof Array) {
                newData.viewBuffer = new Float32Array(data);
            }
            else if (ArrayBuffer.isView(data)) {
                newData.viewBuffer = data;
            }
            else {
                var arraydata = data.value;
                if (arraydata instanceof Array) {
                    var type = data.componentDataType ? getArrayTypeForGLtype(data.componentDataType) : Float32Array;
                    newData.viewBuffer = new type(arraydata);
                }
                else {
                    newData.viewBuffer = arraydata;
                }
            }
            var orginData = data;
            if (orginData.componentDataType == null) {
                newData.componentDataType = newData.viewBuffer
                    ? getGLTypeForTypedArray(newData.viewBuffer)
                    : GlConstants.FLOAT;
            }
            else {
                newData.componentDataType = orginData.componentDataType;
            }
            newData.componentSize = orginData.componentSize ? orginData.componentSize : guessNumComponentsFromName(attName);
            newData.normalize = orginData.normalize != null ? orginData.normalize : false;
            newData.bytesOffset = orginData.offsetInBytes ? orginData.offsetInBytes : 0;
            newData.bytesStride = orginData.strideInBytes ? orginData.strideInBytes : 0;
            newData.drawType = orginData.drawType ? orginData.drawType : GlConstants.STATIC_DRAW;
            newData.divisor = orginData.divisor;
            if (orginData.count == null) {
                var elementBytes = getbytesForGLtype(newData.componentDataType) * newData.componentSize;
                newData.count = newData.viewBuffer
                    ? newData.viewBuffer.byteLength / elementBytes
                    : undefined;
            }
            else {
                newData.count = orginData.count;
            }
            return newData;
        };
        return VertexAtt;
    }());
    function createAttributeBufferInfo(gl, attName, data) {
        var vertexdata = VertexAtt.fromTarrayInfo(attName, data);
        if (vertexdata.glBuffer == null) {
            var buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
            gl.bufferData(gl.ARRAY_BUFFER, vertexdata.viewBuffer, vertexdata.drawType);
            vertexdata.glBuffer = buffer;
        }
        return vertexdata;
    }
    var uvRE = /(uv|texcoord)/;
    var colorRE = /color/;
    function guessNumComponentsFromName(name, length) {
        if (length === void 0) { length = null; }
        var numComponents;
        name = name.toLowerCase();
        if (uvRE.test(name)) {
            numComponents = 2;
        }
        else if (colorRE.test(name)) {
            numComponents = 4;
        }
        else {
            numComponents = 3; // position, normals, indices ...
        }
        // if (length % numComponents > 0)
        // {
        //     throw "Can not guess numComponents for attribute '" + name + "'. Tried " +
        //     numComponents + " but " + length +
        //     " values is not evenly divisible by " + numComponents +
        //     ". You should specify it.";
        // }
        return numComponents;
    }

    var GeometryInfo = /** @class */ (function () {
        function GeometryInfo() {
            this.vaoDic = {};
            this.atts = {};
            this.id = GeometryInfo.nextID();
        }
        GeometryInfo.nextID = function () {
            return GeometryInfo.count++;
        };
        GeometryInfo.count = 0;
        return GeometryInfo;
    }());
    function createGeometryInfo(gl, op) {
        var info = new GeometryInfo();
        info.primitiveType = op.primitiveType ? op.primitiveType : gl.TRIANGLES;
        if (op.indices != null) {
            info.indices = createIndexBufferInfo(gl, op.indices);
            if (info.count == null) {
                info.count = info.indices.count;
            }
        }
        for (var attName in op.atts) {
            info.atts[attName] = createAttributeBufferInfo(gl, attName, op.atts[attName]);
            if (info.count == null) {
                info.count = info.atts[attName].count;
            }
        }
        return info;
    }
    /**
     *  tips : setProgrameWithcached need behind (setGeometryWithAdvanced/setGeometryWithCached)，when draw obj
     * @param gl
     * @param geometry
     * @param program
     */
    function setGeometryWithAdvanced(gl, geometry, program) {
        var bechanged = gl._cachedGeometry != geometry || gl._cachedProgram != program.bassProgram.program;
        if (bechanged) {
            if (geometry.vaoDic[program.bassProgram.id]) {
                gl.bindVertexArray(geometry.vaoDic[program.bassProgram.id]);
            }
            else {
                if (gl.beActiveVao) {
                    var vao = createVaoByPrograme(gl, program, geometry);
                    gl.bindVertexArray(vao);
                    geometry.vaoDic[program.bassProgram.id] = vao;
                }
                else {
                    setGeometry(gl, geometry, program);
                }
            }
            gl._cachedGeometry = geometry;
        }
    }
    function setGeometry(gl, geometry, program) {
        var programAtts = program.bassProgram.attsDic;
        for (var attName in programAtts) {
            if (geometry.atts[attName]) {
                programAtts[attName].setter(geometry.atts[attName]);
            }
        }
        if (geometry.indices) {
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, geometry.indices.glBuffer);
        }
    }
    //------------program和vao是一一对应的，geometry可以有多个vao
    /**
     * 创建vao将geometry和program绑定
     */
    function createVaoByPrograme(gl, program, geometry) {
        var vao = gl.createVertexArray();
        gl.bindVertexArray(vao);
        setGeometry(gl, geometry, program);
        gl.bindVertexArray(null);
        return vao;
    }

    function setClear(gl, clearDepth, clearColor, clearStencil) {
        if (clearStencil === void 0) { clearStencil = false; }
        var cleartag = 0;
        if (clearDepth) {
            gl.clearDepth(1.0);
            cleartag |= gl.DEPTH_BUFFER_BIT;
        }
        if (clearColor) {
            gl.clearColor(clearColor[0], clearColor[1], clearColor[2], clearColor[3]);
            cleartag |= gl.COLOR_BUFFER_BIT;
        }
        if (clearStencil) {
            gl.clearStencil(0);
            cleartag |= gl.STENCIL_BUFFER_BIT;
        }
        gl.clear(cleartag);
    }
    function setViewPortWithCached(gl, x, y, width, height) {
        var bechanged = gl._cachedViewPortX != x ||
            gl._cachedViewPortY != y ||
            gl._cachedViewPortWidth != width ||
            gl._cachedViewPortHeight != height;
        if (bechanged) {
            gl.viewport(x, y, width, height);
            gl._cachedViewPortX = x;
            gl._cachedViewPortY = y;
            gl._cachedViewPortWidth = width;
            gl._cachedViewPortHeight = height;
        }
    }
    function setCullFaceStateWithCached(gl, enableCullFace, cullBack) {
        if (enableCullFace === void 0) { enableCullFace = true; }
        if (cullBack === void 0) { cullBack = true; }
        if (gl._cachedEnableCullFace != enableCullFace) {
            gl._cachedEnableCullFace = enableCullFace;
            if (enableCullFace) {
                gl.enable(gl.CULL_FACE);
                if (gl._cachedCullFace != cullBack) {
                    gl._cachedCullFace = cullBack;
                    gl.cullFace(cullBack ? gl.BACK : gl.FRONT);
                }
            }
            else {
                gl.disable(gl.CULL_FACE);
            }
        }
        else {
            if (gl._cachedCullFace != cullBack) {
                gl._cachedCullFace = cullBack;
                gl.cullFace(cullBack ? gl.BACK : gl.FRONT);
            }
        }
    }
    function setDepthStateWithCached(gl, depthWrite, depthTest) {
        if (depthWrite === void 0) { depthWrite = true; }
        if (depthTest === void 0) { depthTest = true; }
        if (gl._cachedDepthWrite != depthWrite) {
            gl._cachedDepthWrite = depthWrite;
            gl.depthMask(depthWrite);
        }
        if (gl._cachedDepthTest != depthTest) {
            gl._cachedDepthTest = depthTest;
            if (depthTest) {
                gl.enable(gl.DEPTH_TEST);
            }
            else {
                gl.disable(gl.DEPTH_TEST);
            }
        }
    }
    function setBlendStateWithCached(gl, enableBlend, blendEquation, blendSrc, blendDst) {
        if (enableBlend === void 0) { enableBlend = false; }
        if (blendEquation === void 0) { blendEquation = GlConstants.FUNC_ADD; }
        if (blendSrc === void 0) { blendSrc = GlConstants.ONE; }
        if (blendDst === void 0) { blendDst = GlConstants.ONE_MINUS_SRC_ALPHA; }
        if (gl._cachedEnableBlend != enableBlend) {
            gl._cachedEnableBlend = enableBlend;
            if (enableBlend) {
                gl.enable(gl.BLEND);
                if (gl._cachedBlendEquation != blendEquation) {
                    gl._cachedBlendEquation = blendEquation;
                    gl.blendEquation(blendEquation);
                }
                if (gl._cachedBlendFuncSrc != blendSrc || gl._cachedBlendFuncDst != blendDst) {
                    gl._cachedBlendFuncSrc = blendSrc;
                    gl._cachedBlendFuncDst = blendDst;
                    gl.blendFunc(blendSrc, blendDst);
                }
            }
            else {
                gl.disable(gl.BLEND);
            }
        }
    }
    function setStencilStateWithCached(gl, enableStencilTest, stencilFunc, stencilRefValue, stencilMask, stencilFail, stencilPassZfail, stencilFaileZpass) {
        if (enableStencilTest === void 0) { enableStencilTest = false; }
        if (stencilFunc === void 0) { stencilFunc = gl.ALWAYS; }
        if (stencilRefValue === void 0) { stencilRefValue = 1; }
        if (stencilMask === void 0) { stencilMask = 0xff; }
        if (stencilFail === void 0) { stencilFail = gl.KEEP; }
        if (stencilPassZfail === void 0) { stencilPassZfail = gl.REPLACE; }
        if (stencilFaileZpass === void 0) { stencilFaileZpass = gl.KEEP; }
        if (gl._cachedEnableStencilTest != enableStencilTest) {
            gl._cachedEnableStencilTest = enableStencilTest;
            gl.enable(gl.STENCIL_TEST);
            if (gl._cachedStencilFunc != stencilFunc ||
                gl._cachedStencilRefValue != stencilRefValue ||
                gl._cachedStencilMask != stencilMask) {
                gl._cachedStencilFunc = stencilFunc;
                gl._cachedStencilRefValue = stencilRefValue;
                gl._cachedStencilMask = stencilMask;
                gl.stencilFunc(stencilFunc, stencilRefValue, stencilMask);
            }
            if (gl._cachedStencilFail != stencilFail ||
                gl._cachedStencilPassZfail != stencilPassZfail ||
                gl._cachedStencilFaileZpass != stencilFaileZpass) {
                gl._cachedStencilFail = stencilFail;
                gl._cachedStencilPassZfail = stencilPassZfail;
                gl._cachedStencilFaileZpass = stencilFaileZpass;
                gl.stencilOp(stencilFail, stencilPassZfail, stencilFaileZpass);
            }
        }
    }
    function setProgramStatesWithCached(gl, state) {
        //---------------------------cullface
        setCullFaceStateWithCached(gl, state.enableCullFace, state.cullBack);
        //----------------depth
        setDepthStateWithCached(gl, state.depthWrite, state.depthTest);
        //------------------------blend
        setBlendStateWithCached(gl, state.enableBlend, state.blendEquation, state.blendSrc, state.blendDst);
        //-------------------------stencil
        setStencilStateWithCached(gl, state.enableStencilTest, state.stencilFunc, state.stencilRefValue, state.stencilMask, state.stencilFail, state.stencilPassZfail, state.stencilFaileZpass);
    }
    // /**
    //  *
    //  * @param state 原始 webgl state
    //  */
    // // state 是给每个物体 render用的，是不想受前一个物体render影响，所以需要推断出完整的 webgl state，缺失的按照默认值
    // function deduceFullShderState(state: IprogramState): IprogramState {
    //     //----------------------------cull face
    //     if (state.enableCullFace == null) {
    //         state.enableCullFace = true;
    //     }
    //     if (state.enableCullFace) {
    //         if (state.cullBack == null) {
    //             state.cullBack = true;
    //         }
    //     }
    //     //------------------depth
    //     if (state.depthWrite == null) {
    //         state.depthWrite = true;
    //     }
    //     if (state.depthTest == null) {
    //         state.depthTest = true;
    //     }
    //     if (state.depthTest) {
    //         if (state.depthTestFuc == null) {
    //             state.depthTestFuc = GlConstants.LEQUAL;
    //         }
    //     }
    //     //------------------ blend
    //     if (state.enableBlend == true) {
    //         if (state.blendEquation == null) {
    //             state.blendEquation = GlConstants.FUNC_ADD;
    //         }
    //         if (state.blendSrc == null) {
    //             state.blendSrc = GlConstants.ONE;
    //         }
    //         if (state.blendDst == null) {
    //             state.blendDst = GlConstants.ONE_MINUS_SRC_ALPHA;
    //         }
    //     }
    //     //---------------------stencil
    //     if (state.enableStencilTest == true) {
    //         if (state.stencilFunc == null) {
    //             state.stencilFunc = GlConstants.ALWAYS;
    //         }
    //         if (state.stencilFail == null) {
    //             state.stencilFail = GlConstants.KEEP;
    //         }
    //         if (state.stencilFaileZpass == null) {
    //             state.stencilFaileZpass = GlConstants.KEEP;
    //         }
    //         if (state.stencilPassZfail == null) {
    //             state.stencilPassZfail = GlConstants.REPLACE;
    //         }
    //         if (state.stencilRefValue == null) {
    //             state.stencilRefValue = 1;
    //         }
    //         if (state.stencilMask == null) {
    //             state.stencilMask = 0xff;
    //         }
    //     }
    //     return state;
    // }

    var ShaderTypeEnum;
    (function (ShaderTypeEnum) {
        ShaderTypeEnum[ShaderTypeEnum["VS"] = 0] = "VS";
        ShaderTypeEnum[ShaderTypeEnum["FS"] = 1] = "FS";
    })(ShaderTypeEnum || (ShaderTypeEnum = {}));
    function createProgramInfo(gl, op) {
        var bassProgram;
        if (!(op.program instanceof BassProgram)) {
            var bassprogramOp = op.program;
            bassProgram = createBassProgramInfo(gl, bassprogramOp.vs, bassprogramOp.fs, bassprogramOp.name);
        }
        else {
            bassProgram = op.program;
        }
        if (bassProgram) {
            var info = new Program();
            info.bassProgram = bassProgram;
            info.uniforms = op.uniforms;
            info.states = op.states;
            return info;
        }
        else {
            return null;
        }
    }
    function setProgramWithCached(gl, program) {
        if (gl._cachedProgram != program.bassProgram.program) {
            gl._cachedProgram = program.bassProgram.program;
            gl.useProgram(program.bassProgram.program);
        }
        if (program.uniforms) {
            setProgramUniforms(program.bassProgram, program.uniforms);
        }
        if (program.states) {
            setProgramStatesWithCached(gl, program.states);
        }
    }
    function setProgramUniforms(info, uniforms) {
        for (var key in uniforms) {
            var setter = info.uniformsDic[key].setter;
            var value = uniforms[key];
            setter(value);
        }
    }
    var Program = /** @class */ (function () {
        function Program() {
        }
        return Program;
    }());
    var BassProgram = /** @class */ (function () {
        function BassProgram(programName, program, uniformsDic, attsDic) {
            this.id = BassProgram.nextID();
            this.programName = programName;
            this.program = program;
            this.uniformsDic = uniformsDic;
            this.attsDic = attsDic;
        }
        BassProgram.nextID = function () {
            return BassProgram.count++;
        };
        BassProgram.count = 0;
        return BassProgram;
    }());
    function createBassProgramInfo(gl, vs, fs, name) {
        var vsShader = createShader(gl, ShaderTypeEnum.VS, vs, name + "_vs");
        var fsShader = createShader(gl, ShaderTypeEnum.FS, fs, name + "_fs");
        if (vsShader && fsShader) {
            var item = gl.createProgram();
            gl.attachShader(item, vsShader.shader);
            gl.attachShader(item, fsShader.shader);
            gl.linkProgram(item);
            var check = gl.getProgramParameter(item, gl.LINK_STATUS);
            if (check == false) {
                var debguInfo = "ERROR: compile program Error!" + "VS:" + vs + "   FS:" + fs + "\n" + gl.getProgramInfoLog(item);
                console.error(debguInfo);
                gl.deleteProgram(item);
                return null;
            }
            else {
                var attsInfo = getAttributesInfo(gl, item);
                var uniformsInfo = getUniformsInfo(gl, item);
                return new BassProgram(name, item, uniformsInfo, attsInfo);
                // return { program: item, programName: name, uniformsDic: uniformsInfo, attsDic: attsInfo };
            }
        }
    }
    function getAttributesInfo(gl, program) {
        var attdic = {};
        var numAttribs = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
        for (var i = 0; i < numAttribs; i++) {
            var attribInfo = gl.getActiveAttrib(program, i);
            if (!attribInfo)
                break;
            var attName = attribInfo.name;
            var attlocation = gl.getAttribLocation(program, attName);
            var func = getAttributeSetter(gl, attlocation);
            attdic[attName] = { name: attName, location: attlocation, setter: func };
        }
        return attdic;
    }
    function getUniformsInfo(gl, program) {
        var uniformDic = {};
        var numUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
        gl.bindpoint = 0;
        for (var i = 0; i < numUniforms; i++) {
            var uniformInfo = gl.getActiveUniform(program, i);
            if (!uniformInfo)
                break;
            var name_1 = uniformInfo.name;
            var type = uniformInfo.type;
            var location_1 = gl.getUniformLocation(program, name_1);
            var beArray = false;
            // remove the array suffix.
            if (name_1.substr(-3) === "[0]") {
                beArray = true;
                // name = name.substr(0, name.length - 3);
            }
            if (location_1 == null)
                continue;
            var bindpoint = gl.bindpoint;
            var func = getUniformSetter(gl, type, beArray, location_1, bindpoint);
            uniformDic[name_1] = { name: name_1, location: location_1, type: type, setter: func };
        }
        return uniformDic;
    }
    function createShader(gl, type, source, name) {
        if (name === void 0) { name = null; }
        var target = type == ShaderTypeEnum.VS ? GlConstants.VERTEX_SHADER : GlConstants.FRAGMENT_SHADER;
        var item = gl.createShader(target);
        gl.shaderSource(item, source);
        gl.compileShader(item);
        var check = gl.getShaderParameter(item, gl.COMPILE_STATUS);
        if (check == false) {
            var debug = type == ShaderTypeEnum.VS ? "ERROR: compile  VS Shader Error! VS:" : "ERROR: compile FS Shader Error! FS:";
            debug = debug + name + ".\n";
            console.error(debug + gl.getShaderInfoLog(item));
            gl.deleteShader(item);
            return null;
        }
        else {
            return { shaderType: type, shaderName: name, shader: item };
        }
    }
    function getUniformSetter(gl, uniformType, beArray, location, bindpoint) {
        switch (uniformType) {
            case gl.FLOAT:
                if (beArray) {
                    return function (value) {
                        gl.uniform1fv(location, value);
                    };
                }
                else {
                    return function (value) {
                        gl.uniform1f(location, value);
                    };
                }
                break;
            case gl.FLOAT_VEC2:
                return function (value) {
                    gl.uniform2fv(location, value);
                };
                break;
            case gl.FLOAT_VEC3:
                return function (value) {
                    gl.uniform3fv(location, value);
                };
                break;
            case gl.FLOAT_VEC4:
                return function (value) {
                    gl.uniform4fv(location, value);
                };
                break;
            case gl.INT:
            case gl.BOOL:
                if (beArray) {
                    return function (value) {
                        gl.uniform1iv(location, value);
                    };
                }
                else {
                    return function (value) {
                        gl.uniform1i(location, value);
                    };
                }
                break;
            case gl.INT_VEC2:
            case gl.BOOL_VEC2:
                return function (value) {
                    gl.uniform2iv(location, value);
                };
                break;
            case gl.INT_VEC3:
            case gl.BOOL_VEC3:
                return function (value) {
                    gl.uniform3iv(location, value);
                };
                break;
            case gl.INT_VEC4:
            case gl.BOOL_VEC4:
                return function (value) {
                    gl.uniform4fv(location, value);
                };
                break;
            case gl.FLOAT_MAT2:
                return function (value) {
                    gl.uniformMatrix2fv(location, false, value);
                };
            case gl.FLOAT_MAT3:
                return function (value) {
                    gl.uniformMatrix3fv(location, false, value);
                };
                break;
            case gl.FLOAT_MAT4:
                return function (value) {
                    gl.uniformMatrix4fv(location, false, value);
                };
                break;
            case gl.SAMPLER_2D:
                return function (value) {
                    gl.activeTexture(gl.TEXTURE0 + bindpoint);
                    gl.bindTexture(gl.TEXTURE_2D, value.texture);
                    gl.uniform1i(location, bindpoint);
                    gl.bindpoint = gl.bindpoint + 1;
                };
            default:
                console.error("uniformSetter not handle type:" + uniformType + " yet!");
                break;
        }
    }
    function getAttributeSetter(gl, location) {
        return function (value) {
            gl.bindBuffer(gl.ARRAY_BUFFER, value.glBuffer);
            gl.enableVertexAttribArray(location);
            gl.vertexAttribPointer(location, value.componentSize, value.componentDataType, value.normalize, value.bytesStride, value.bytesOffset);
            if (value.divisor !== undefined) {
                gl.vertexAttribDivisor(location, value.divisor);
            }
        };
    }

    /**
     * Enum containing WebGL Constant values by name.
     * for use without an active WebGL context, or in cases where certain constants are unavailable using the WebGL context
     * (For example, in [Safari 9]{@link https://github.com/AnalyticalGraphicsInc/cesium/issues/2989}).
     *
     * These match the constants from the [WebGL 1.0]{@link https://www.khronos.org/registry/webgl/specs/latest/1.0/}
     * and [WebGL 2.0]{@link https://www.khronos.org/registry/webgl/specs/latest/2.0/}
     * specifications.
     */
    var GlConstants$1;
    (function (GlConstants) {
        GlConstants[GlConstants["DEPTH_BUFFER_BIT"] = 256] = "DEPTH_BUFFER_BIT";
        GlConstants[GlConstants["STENCIL_BUFFER_BIT"] = 1024] = "STENCIL_BUFFER_BIT";
        GlConstants[GlConstants["COLOR_BUFFER_BIT"] = 16384] = "COLOR_BUFFER_BIT";
        GlConstants[GlConstants["POINTS"] = 0] = "POINTS";
        GlConstants[GlConstants["LINES"] = 1] = "LINES";
        GlConstants[GlConstants["LINE_LOOP"] = 2] = "LINE_LOOP";
        GlConstants[GlConstants["LINE_STRIP"] = 3] = "LINE_STRIP";
        GlConstants[GlConstants["TRIANGLES"] = 4] = "TRIANGLES";
        GlConstants[GlConstants["TRIANGLE_STRIP"] = 5] = "TRIANGLE_STRIP";
        GlConstants[GlConstants["TRIANGLE_FAN"] = 6] = "TRIANGLE_FAN";
        GlConstants[GlConstants["ZERO"] = 0] = "ZERO";
        GlConstants[GlConstants["ONE"] = 1] = "ONE";
        GlConstants[GlConstants["SRC_COLOR"] = 768] = "SRC_COLOR";
        GlConstants[GlConstants["ONE_MINUS_SRC_COLOR"] = 769] = "ONE_MINUS_SRC_COLOR";
        GlConstants[GlConstants["SRC_ALPHA"] = 770] = "SRC_ALPHA";
        GlConstants[GlConstants["ONE_MINUS_SRC_ALPHA"] = 771] = "ONE_MINUS_SRC_ALPHA";
        GlConstants[GlConstants["DST_ALPHA"] = 772] = "DST_ALPHA";
        GlConstants[GlConstants["ONE_MINUS_DST_ALPHA"] = 773] = "ONE_MINUS_DST_ALPHA";
        GlConstants[GlConstants["DST_COLOR"] = 774] = "DST_COLOR";
        GlConstants[GlConstants["ONE_MINUS_DST_COLOR"] = 775] = "ONE_MINUS_DST_COLOR";
        GlConstants[GlConstants["SRC_ALPHA_SATURATE"] = 776] = "SRC_ALPHA_SATURATE";
        GlConstants[GlConstants["FUNC_ADD"] = 32774] = "FUNC_ADD";
        GlConstants[GlConstants["BLEND_EQUATION"] = 32777] = "BLEND_EQUATION";
        GlConstants[GlConstants["BLEND_EQUATION_RGB"] = 32777] = "BLEND_EQUATION_RGB";
        GlConstants[GlConstants["BLEND_EQUATION_ALPHA"] = 34877] = "BLEND_EQUATION_ALPHA";
        GlConstants[GlConstants["FUNC_SUBTRACT"] = 32778] = "FUNC_SUBTRACT";
        GlConstants[GlConstants["FUNC_REVERSE_SUBTRACT"] = 32779] = "FUNC_REVERSE_SUBTRACT";
        GlConstants[GlConstants["BLEND_DST_RGB"] = 32968] = "BLEND_DST_RGB";
        GlConstants[GlConstants["BLEND_SRC_RGB"] = 32969] = "BLEND_SRC_RGB";
        GlConstants[GlConstants["BLEND_DST_ALPHA"] = 32970] = "BLEND_DST_ALPHA";
        GlConstants[GlConstants["BLEND_SRC_ALPHA"] = 32971] = "BLEND_SRC_ALPHA";
        GlConstants[GlConstants["CONSTANT_COLOR"] = 32769] = "CONSTANT_COLOR";
        GlConstants[GlConstants["ONE_MINUS_CONSTANT_COLOR"] = 32770] = "ONE_MINUS_CONSTANT_COLOR";
        GlConstants[GlConstants["CONSTANT_ALPHA"] = 32771] = "CONSTANT_ALPHA";
        GlConstants[GlConstants["ONE_MINUS_CONSTANT_ALPHA"] = 32772] = "ONE_MINUS_CONSTANT_ALPHA";
        GlConstants[GlConstants["BLEND_COLOR"] = 32773] = "BLEND_COLOR";
        GlConstants[GlConstants["ARRAY_BUFFER"] = 34962] = "ARRAY_BUFFER";
        GlConstants[GlConstants["ELEMENT_ARRAY_BUFFER"] = 34963] = "ELEMENT_ARRAY_BUFFER";
        GlConstants[GlConstants["ARRAY_BUFFER_BINDING"] = 34964] = "ARRAY_BUFFER_BINDING";
        GlConstants[GlConstants["ELEMENT_ARRAY_BUFFER_BINDING"] = 34965] = "ELEMENT_ARRAY_BUFFER_BINDING";
        GlConstants[GlConstants["STREAM_DRAW"] = 35040] = "STREAM_DRAW";
        GlConstants[GlConstants["STATIC_DRAW"] = 35044] = "STATIC_DRAW";
        GlConstants[GlConstants["DYNAMIC_DRAW"] = 35048] = "DYNAMIC_DRAW";
        GlConstants[GlConstants["BUFFER_SIZE"] = 34660] = "BUFFER_SIZE";
        GlConstants[GlConstants["BUFFER_USAGE"] = 34661] = "BUFFER_USAGE";
        GlConstants[GlConstants["CURRENT_VERTEX_ATTRIB"] = 34342] = "CURRENT_VERTEX_ATTRIB";
        GlConstants[GlConstants["FRONT"] = 1028] = "FRONT";
        GlConstants[GlConstants["BACK"] = 1029] = "BACK";
        GlConstants[GlConstants["FRONT_AND_BACK"] = 1032] = "FRONT_AND_BACK";
        GlConstants[GlConstants["CULL_FACE"] = 2884] = "CULL_FACE";
        GlConstants[GlConstants["BLEND"] = 3042] = "BLEND";
        GlConstants[GlConstants["DITHER"] = 3024] = "DITHER";
        GlConstants[GlConstants["STENCIL_TEST"] = 2960] = "STENCIL_TEST";
        GlConstants[GlConstants["DEPTH_TEST"] = 2929] = "DEPTH_TEST";
        GlConstants[GlConstants["SCISSOR_TEST"] = 3089] = "SCISSOR_TEST";
        GlConstants[GlConstants["POLYGON_OFFSET_FILL"] = 32823] = "POLYGON_OFFSET_FILL";
        GlConstants[GlConstants["SAMPLE_ALPHA_TO_COVERAGE"] = 32926] = "SAMPLE_ALPHA_TO_COVERAGE";
        GlConstants[GlConstants["SAMPLE_COVERAGE"] = 32928] = "SAMPLE_COVERAGE";
        GlConstants[GlConstants["NO_ERROR"] = 0] = "NO_ERROR";
        GlConstants[GlConstants["INVALID_ENUM"] = 1280] = "INVALID_ENUM";
        GlConstants[GlConstants["INVALID_VALUE"] = 1281] = "INVALID_VALUE";
        GlConstants[GlConstants["INVALID_OPERATION"] = 1282] = "INVALID_OPERATION";
        GlConstants[GlConstants["OUT_OF_MEMORY"] = 1285] = "OUT_OF_MEMORY";
        GlConstants[GlConstants["CW"] = 2304] = "CW";
        GlConstants[GlConstants["CCW"] = 2305] = "CCW";
        GlConstants[GlConstants["LINE_WIDTH"] = 2849] = "LINE_WIDTH";
        GlConstants[GlConstants["ALIASED_POINT_SIZE_RANGE"] = 33901] = "ALIASED_POINT_SIZE_RANGE";
        GlConstants[GlConstants["ALIASED_LINE_WIDTH_RANGE"] = 33902] = "ALIASED_LINE_WIDTH_RANGE";
        GlConstants[GlConstants["CULL_FACE_MODE"] = 2885] = "CULL_FACE_MODE";
        GlConstants[GlConstants["FRONT_FACE"] = 2886] = "FRONT_FACE";
        GlConstants[GlConstants["DEPTH_RANGE"] = 2928] = "DEPTH_RANGE";
        GlConstants[GlConstants["DEPTH_WRITEMASK"] = 2930] = "DEPTH_WRITEMASK";
        GlConstants[GlConstants["DEPTH_CLEAR_VALUE"] = 2931] = "DEPTH_CLEAR_VALUE";
        GlConstants[GlConstants["DEPTH_FUNC"] = 2932] = "DEPTH_FUNC";
        GlConstants[GlConstants["STENCIL_CLEAR_VALUE"] = 2961] = "STENCIL_CLEAR_VALUE";
        GlConstants[GlConstants["STENCIL_FUNC"] = 2962] = "STENCIL_FUNC";
        GlConstants[GlConstants["STENCIL_FAIL"] = 2964] = "STENCIL_FAIL";
        GlConstants[GlConstants["STENCIL_PASS_DEPTH_FAIL"] = 2965] = "STENCIL_PASS_DEPTH_FAIL";
        GlConstants[GlConstants["STENCIL_PASS_DEPTH_PASS"] = 2966] = "STENCIL_PASS_DEPTH_PASS";
        GlConstants[GlConstants["STENCIL_REF"] = 2967] = "STENCIL_REF";
        GlConstants[GlConstants["STENCIL_VALUE_MASK"] = 2963] = "STENCIL_VALUE_MASK";
        GlConstants[GlConstants["STENCIL_WRITEMASK"] = 2968] = "STENCIL_WRITEMASK";
        GlConstants[GlConstants["STENCIL_BACK_FUNC"] = 34816] = "STENCIL_BACK_FUNC";
        GlConstants[GlConstants["STENCIL_BACK_FAIL"] = 34817] = "STENCIL_BACK_FAIL";
        GlConstants[GlConstants["STENCIL_BACK_PASS_DEPTH_FAIL"] = 34818] = "STENCIL_BACK_PASS_DEPTH_FAIL";
        GlConstants[GlConstants["STENCIL_BACK_PASS_DEPTH_PASS"] = 34819] = "STENCIL_BACK_PASS_DEPTH_PASS";
        GlConstants[GlConstants["STENCIL_BACK_REF"] = 36003] = "STENCIL_BACK_REF";
        GlConstants[GlConstants["STENCIL_BACK_VALUE_MASK"] = 36004] = "STENCIL_BACK_VALUE_MASK";
        GlConstants[GlConstants["STENCIL_BACK_WRITEMASK"] = 36005] = "STENCIL_BACK_WRITEMASK";
        GlConstants[GlConstants["VIEWPORT"] = 2978] = "VIEWPORT";
        GlConstants[GlConstants["SCISSOR_BOX"] = 3088] = "SCISSOR_BOX";
        GlConstants[GlConstants["COLOR_CLEAR_VALUE"] = 3106] = "COLOR_CLEAR_VALUE";
        GlConstants[GlConstants["COLOR_WRITEMASK"] = 3107] = "COLOR_WRITEMASK";
        GlConstants[GlConstants["UNPACK_ALIGNMENT"] = 3317] = "UNPACK_ALIGNMENT";
        GlConstants[GlConstants["PACK_ALIGNMENT"] = 3333] = "PACK_ALIGNMENT";
        GlConstants[GlConstants["MAX_TEXTURE_SIZE"] = 3379] = "MAX_TEXTURE_SIZE";
        GlConstants[GlConstants["MAX_VIEWPORT_DIMS"] = 3386] = "MAX_VIEWPORT_DIMS";
        GlConstants[GlConstants["SUBPIXEL_BITS"] = 3408] = "SUBPIXEL_BITS";
        GlConstants[GlConstants["RED_BITS"] = 3410] = "RED_BITS";
        GlConstants[GlConstants["GREEN_BITS"] = 3411] = "GREEN_BITS";
        GlConstants[GlConstants["BLUE_BITS"] = 3412] = "BLUE_BITS";
        GlConstants[GlConstants["ALPHA_BITS"] = 3413] = "ALPHA_BITS";
        GlConstants[GlConstants["DEPTH_BITS"] = 3414] = "DEPTH_BITS";
        GlConstants[GlConstants["STENCIL_BITS"] = 3415] = "STENCIL_BITS";
        GlConstants[GlConstants["POLYGON_OFFSET_UNITS"] = 10752] = "POLYGON_OFFSET_UNITS";
        GlConstants[GlConstants["POLYGON_OFFSET_FACTOR"] = 32824] = "POLYGON_OFFSET_FACTOR";
        GlConstants[GlConstants["TEXTURE_BINDING_2D"] = 32873] = "TEXTURE_BINDING_2D";
        GlConstants[GlConstants["SAMPLE_BUFFERS"] = 32936] = "SAMPLE_BUFFERS";
        GlConstants[GlConstants["SAMPLES"] = 32937] = "SAMPLES";
        GlConstants[GlConstants["SAMPLE_COVERAGE_VALUE"] = 32938] = "SAMPLE_COVERAGE_VALUE";
        GlConstants[GlConstants["SAMPLE_COVERAGE_INVERT"] = 32939] = "SAMPLE_COVERAGE_INVERT";
        GlConstants[GlConstants["COMPRESSED_TEXTURE_FORMATS"] = 34467] = "COMPRESSED_TEXTURE_FORMATS";
        GlConstants[GlConstants["DONT_CARE"] = 4352] = "DONT_CARE";
        GlConstants[GlConstants["FASTEST"] = 4353] = "FASTEST";
        GlConstants[GlConstants["NICEST"] = 4354] = "NICEST";
        GlConstants[GlConstants["GENERATE_MIPMAP_HINT"] = 33170] = "GENERATE_MIPMAP_HINT";
        GlConstants[GlConstants["BYTE"] = 5120] = "BYTE";
        GlConstants[GlConstants["UNSIGNED_BYTE"] = 5121] = "UNSIGNED_BYTE";
        GlConstants[GlConstants["SHORT"] = 5122] = "SHORT";
        GlConstants[GlConstants["UNSIGNED_SHORT"] = 5123] = "UNSIGNED_SHORT";
        GlConstants[GlConstants["INT"] = 5124] = "INT";
        GlConstants[GlConstants["UNSIGNED_INT"] = 5125] = "UNSIGNED_INT";
        GlConstants[GlConstants["FLOAT"] = 5126] = "FLOAT";
        GlConstants[GlConstants["DEPTH_COMPONENT"] = 6402] = "DEPTH_COMPONENT";
        GlConstants[GlConstants["ALPHA"] = 6406] = "ALPHA";
        GlConstants[GlConstants["RGB"] = 6407] = "RGB";
        GlConstants[GlConstants["RGBA"] = 6408] = "RGBA";
        GlConstants[GlConstants["LUMINANCE"] = 6409] = "LUMINANCE";
        GlConstants[GlConstants["LUMINANCE_ALPHA"] = 6410] = "LUMINANCE_ALPHA";
        GlConstants[GlConstants["UNSIGNED_SHORT_4_4_4_4"] = 32819] = "UNSIGNED_SHORT_4_4_4_4";
        GlConstants[GlConstants["UNSIGNED_SHORT_5_5_5_1"] = 32820] = "UNSIGNED_SHORT_5_5_5_1";
        GlConstants[GlConstants["UNSIGNED_SHORT_5_6_5"] = 33635] = "UNSIGNED_SHORT_5_6_5";
        GlConstants[GlConstants["FRAGMENT_SHADER"] = 35632] = "FRAGMENT_SHADER";
        GlConstants[GlConstants["VERTEX_SHADER"] = 35633] = "VERTEX_SHADER";
        GlConstants[GlConstants["MAX_VERTEX_ATTRIBS"] = 34921] = "MAX_VERTEX_ATTRIBS";
        GlConstants[GlConstants["MAX_VERTEX_UNIFORM_VECTORS"] = 36347] = "MAX_VERTEX_UNIFORM_VECTORS";
        GlConstants[GlConstants["MAX_VARYING_VECTORS"] = 36348] = "MAX_VARYING_VECTORS";
        GlConstants[GlConstants["MAX_COMBINED_TEXTURE_IMAGE_UNITS"] = 35661] = "MAX_COMBINED_TEXTURE_IMAGE_UNITS";
        GlConstants[GlConstants["MAX_VERTEX_TEXTURE_IMAGE_UNITS"] = 35660] = "MAX_VERTEX_TEXTURE_IMAGE_UNITS";
        GlConstants[GlConstants["MAX_TEXTURE_IMAGE_UNITS"] = 34930] = "MAX_TEXTURE_IMAGE_UNITS";
        GlConstants[GlConstants["MAX_FRAGMENT_UNIFORM_VECTORS"] = 36349] = "MAX_FRAGMENT_UNIFORM_VECTORS";
        GlConstants[GlConstants["SHADER_TYPE"] = 35663] = "SHADER_TYPE";
        GlConstants[GlConstants["DELETE_STATUS"] = 35712] = "DELETE_STATUS";
        GlConstants[GlConstants["LINK_STATUS"] = 35714] = "LINK_STATUS";
        GlConstants[GlConstants["VALIDATE_STATUS"] = 35715] = "VALIDATE_STATUS";
        GlConstants[GlConstants["ATTACHED_SHADERS"] = 35717] = "ATTACHED_SHADERS";
        GlConstants[GlConstants["ACTIVE_UNIFORMS"] = 35718] = "ACTIVE_UNIFORMS";
        GlConstants[GlConstants["ACTIVE_ATTRIBUTES"] = 35721] = "ACTIVE_ATTRIBUTES";
        GlConstants[GlConstants["SHADING_LANGUAGE_VERSION"] = 35724] = "SHADING_LANGUAGE_VERSION";
        GlConstants[GlConstants["CURRENT_PROGRAM"] = 35725] = "CURRENT_PROGRAM";
        GlConstants[GlConstants["NEVER"] = 512] = "NEVER";
        GlConstants[GlConstants["LESS"] = 513] = "LESS";
        GlConstants[GlConstants["EQUAL"] = 514] = "EQUAL";
        GlConstants[GlConstants["LEQUAL"] = 515] = "LEQUAL";
        GlConstants[GlConstants["GREATER"] = 516] = "GREATER";
        GlConstants[GlConstants["NOTEQUAL"] = 517] = "NOTEQUAL";
        GlConstants[GlConstants["GEQUAL"] = 518] = "GEQUAL";
        GlConstants[GlConstants["ALWAYS"] = 519] = "ALWAYS";
        GlConstants[GlConstants["KEEP"] = 7680] = "KEEP";
        GlConstants[GlConstants["REPLACE"] = 7681] = "REPLACE";
        GlConstants[GlConstants["INCR"] = 7682] = "INCR";
        GlConstants[GlConstants["DECR"] = 7683] = "DECR";
        GlConstants[GlConstants["INVERT"] = 5386] = "INVERT";
        GlConstants[GlConstants["INCR_WRAP"] = 34055] = "INCR_WRAP";
        GlConstants[GlConstants["DECR_WRAP"] = 34056] = "DECR_WRAP";
        GlConstants[GlConstants["VENDOR"] = 7936] = "VENDOR";
        GlConstants[GlConstants["RENDERER"] = 7937] = "RENDERER";
        GlConstants[GlConstants["VERSION"] = 7938] = "VERSION";
        GlConstants[GlConstants["NEAREST"] = 9728] = "NEAREST";
        GlConstants[GlConstants["LINEAR"] = 9729] = "LINEAR";
        GlConstants[GlConstants["NEAREST_MIPMAP_NEAREST"] = 9984] = "NEAREST_MIPMAP_NEAREST";
        GlConstants[GlConstants["LINEAR_MIPMAP_NEAREST"] = 9985] = "LINEAR_MIPMAP_NEAREST";
        GlConstants[GlConstants["NEAREST_MIPMAP_LINEAR"] = 9986] = "NEAREST_MIPMAP_LINEAR";
        GlConstants[GlConstants["LINEAR_MIPMAP_LINEAR"] = 9987] = "LINEAR_MIPMAP_LINEAR";
        GlConstants[GlConstants["TEXTURE_MAG_FILTER"] = 10240] = "TEXTURE_MAG_FILTER";
        GlConstants[GlConstants["TEXTURE_MIN_FILTER"] = 10241] = "TEXTURE_MIN_FILTER";
        GlConstants[GlConstants["TEXTURE_WRAP_S"] = 10242] = "TEXTURE_WRAP_S";
        GlConstants[GlConstants["TEXTURE_WRAP_T"] = 10243] = "TEXTURE_WRAP_T";
        GlConstants[GlConstants["TEXTURE_2D"] = 3553] = "TEXTURE_2D";
        GlConstants[GlConstants["TEXTURE"] = 5890] = "TEXTURE";
        GlConstants[GlConstants["TEXTURE_CUBE_MAP"] = 34067] = "TEXTURE_CUBE_MAP";
        GlConstants[GlConstants["TEXTURE_BINDING_CUBE_MAP"] = 34068] = "TEXTURE_BINDING_CUBE_MAP";
        GlConstants[GlConstants["TEXTURE_CUBE_MAP_POSITIVE_X"] = 34069] = "TEXTURE_CUBE_MAP_POSITIVE_X";
        GlConstants[GlConstants["TEXTURE_CUBE_MAP_NEGATIVE_X"] = 34070] = "TEXTURE_CUBE_MAP_NEGATIVE_X";
        GlConstants[GlConstants["TEXTURE_CUBE_MAP_POSITIVE_Y"] = 34071] = "TEXTURE_CUBE_MAP_POSITIVE_Y";
        GlConstants[GlConstants["TEXTURE_CUBE_MAP_NEGATIVE_Y"] = 34072] = "TEXTURE_CUBE_MAP_NEGATIVE_Y";
        GlConstants[GlConstants["TEXTURE_CUBE_MAP_POSITIVE_Z"] = 34073] = "TEXTURE_CUBE_MAP_POSITIVE_Z";
        GlConstants[GlConstants["TEXTURE_CUBE_MAP_NEGATIVE_Z"] = 34074] = "TEXTURE_CUBE_MAP_NEGATIVE_Z";
        GlConstants[GlConstants["MAX_CUBE_MAP_TEXTURE_SIZE"] = 34076] = "MAX_CUBE_MAP_TEXTURE_SIZE";
        GlConstants[GlConstants["TEXTURE0"] = 33984] = "TEXTURE0";
        GlConstants[GlConstants["TEXTURE1"] = 33985] = "TEXTURE1";
        GlConstants[GlConstants["TEXTURE2"] = 33986] = "TEXTURE2";
        GlConstants[GlConstants["TEXTURE3"] = 33987] = "TEXTURE3";
        GlConstants[GlConstants["TEXTURE4"] = 33988] = "TEXTURE4";
        GlConstants[GlConstants["TEXTURE5"] = 33989] = "TEXTURE5";
        GlConstants[GlConstants["TEXTURE6"] = 33990] = "TEXTURE6";
        GlConstants[GlConstants["TEXTURE7"] = 33991] = "TEXTURE7";
        GlConstants[GlConstants["TEXTURE8"] = 33992] = "TEXTURE8";
        GlConstants[GlConstants["TEXTURE9"] = 33993] = "TEXTURE9";
        GlConstants[GlConstants["TEXTURE10"] = 33994] = "TEXTURE10";
        GlConstants[GlConstants["TEXTURE11"] = 33995] = "TEXTURE11";
        GlConstants[GlConstants["TEXTURE12"] = 33996] = "TEXTURE12";
        GlConstants[GlConstants["TEXTURE13"] = 33997] = "TEXTURE13";
        GlConstants[GlConstants["TEXTURE14"] = 33998] = "TEXTURE14";
        GlConstants[GlConstants["TEXTURE15"] = 33999] = "TEXTURE15";
        GlConstants[GlConstants["TEXTURE16"] = 34000] = "TEXTURE16";
        GlConstants[GlConstants["TEXTURE17"] = 34001] = "TEXTURE17";
        GlConstants[GlConstants["TEXTURE18"] = 34002] = "TEXTURE18";
        GlConstants[GlConstants["TEXTURE19"] = 34003] = "TEXTURE19";
        GlConstants[GlConstants["TEXTURE20"] = 34004] = "TEXTURE20";
        GlConstants[GlConstants["TEXTURE21"] = 34005] = "TEXTURE21";
        GlConstants[GlConstants["TEXTURE22"] = 34006] = "TEXTURE22";
        GlConstants[GlConstants["TEXTURE23"] = 34007] = "TEXTURE23";
        GlConstants[GlConstants["TEXTURE24"] = 34008] = "TEXTURE24";
        GlConstants[GlConstants["TEXTURE25"] = 34009] = "TEXTURE25";
        GlConstants[GlConstants["TEXTURE26"] = 34010] = "TEXTURE26";
        GlConstants[GlConstants["TEXTURE27"] = 34011] = "TEXTURE27";
        GlConstants[GlConstants["TEXTURE28"] = 34012] = "TEXTURE28";
        GlConstants[GlConstants["TEXTURE29"] = 34013] = "TEXTURE29";
        GlConstants[GlConstants["TEXTURE30"] = 34014] = "TEXTURE30";
        GlConstants[GlConstants["TEXTURE31"] = 34015] = "TEXTURE31";
        GlConstants[GlConstants["ACTIVE_TEXTURE"] = 34016] = "ACTIVE_TEXTURE";
        GlConstants[GlConstants["REPEAT"] = 10497] = "REPEAT";
        GlConstants[GlConstants["CLAMP_TO_EDGE"] = 33071] = "CLAMP_TO_EDGE";
        GlConstants[GlConstants["MIRRORED_REPEAT"] = 33648] = "MIRRORED_REPEAT";
        GlConstants[GlConstants["FLOAT_VEC2"] = 35664] = "FLOAT_VEC2";
        GlConstants[GlConstants["FLOAT_VEC3"] = 35665] = "FLOAT_VEC3";
        GlConstants[GlConstants["FLOAT_VEC4"] = 35666] = "FLOAT_VEC4";
        GlConstants[GlConstants["INT_VEC2"] = 35667] = "INT_VEC2";
        GlConstants[GlConstants["INT_VEC3"] = 35668] = "INT_VEC3";
        GlConstants[GlConstants["INT_VEC4"] = 35669] = "INT_VEC4";
        GlConstants[GlConstants["BOOL"] = 35670] = "BOOL";
        GlConstants[GlConstants["BOOL_VEC2"] = 35671] = "BOOL_VEC2";
        GlConstants[GlConstants["BOOL_VEC3"] = 35672] = "BOOL_VEC3";
        GlConstants[GlConstants["BOOL_VEC4"] = 35673] = "BOOL_VEC4";
        GlConstants[GlConstants["FLOAT_MAT2"] = 35674] = "FLOAT_MAT2";
        GlConstants[GlConstants["FLOAT_MAT3"] = 35675] = "FLOAT_MAT3";
        GlConstants[GlConstants["FLOAT_MAT4"] = 35676] = "FLOAT_MAT4";
        GlConstants[GlConstants["SAMPLER_2D"] = 35678] = "SAMPLER_2D";
        GlConstants[GlConstants["SAMPLER_CUBE"] = 35680] = "SAMPLER_CUBE";
        GlConstants[GlConstants["VERTEX_ATTRIB_ARRAY_ENABLED"] = 34338] = "VERTEX_ATTRIB_ARRAY_ENABLED";
        GlConstants[GlConstants["VERTEX_ATTRIB_ARRAY_SIZE"] = 34339] = "VERTEX_ATTRIB_ARRAY_SIZE";
        GlConstants[GlConstants["VERTEX_ATTRIB_ARRAY_STRIDE"] = 34340] = "VERTEX_ATTRIB_ARRAY_STRIDE";
        GlConstants[GlConstants["VERTEX_ATTRIB_ARRAY_TYPE"] = 34341] = "VERTEX_ATTRIB_ARRAY_TYPE";
        GlConstants[GlConstants["VERTEX_ATTRIB_ARRAY_NORMALIZED"] = 34922] = "VERTEX_ATTRIB_ARRAY_NORMALIZED";
        GlConstants[GlConstants["VERTEX_ATTRIB_ARRAY_POINTER"] = 34373] = "VERTEX_ATTRIB_ARRAY_POINTER";
        GlConstants[GlConstants["VERTEX_ATTRIB_ARRAY_BUFFER_BINDING"] = 34975] = "VERTEX_ATTRIB_ARRAY_BUFFER_BINDING";
        GlConstants[GlConstants["IMPLEMENTATION_COLOR_READ_TYPE"] = 35738] = "IMPLEMENTATION_COLOR_READ_TYPE";
        GlConstants[GlConstants["IMPLEMENTATION_COLOR_READ_FORMAT"] = 35739] = "IMPLEMENTATION_COLOR_READ_FORMAT";
        GlConstants[GlConstants["COMPILE_STATUS"] = 35713] = "COMPILE_STATUS";
        GlConstants[GlConstants["LOW_FLOAT"] = 36336] = "LOW_FLOAT";
        GlConstants[GlConstants["MEDIUM_FLOAT"] = 36337] = "MEDIUM_FLOAT";
        GlConstants[GlConstants["HIGH_FLOAT"] = 36338] = "HIGH_FLOAT";
        GlConstants[GlConstants["LOW_INT"] = 36339] = "LOW_INT";
        GlConstants[GlConstants["MEDIUM_INT"] = 36340] = "MEDIUM_INT";
        GlConstants[GlConstants["HIGH_INT"] = 36341] = "HIGH_INT";
        GlConstants[GlConstants["FRAMEBUFFER"] = 36160] = "FRAMEBUFFER";
        GlConstants[GlConstants["RENDERBUFFER"] = 36161] = "RENDERBUFFER";
        GlConstants[GlConstants["RGBA4"] = 32854] = "RGBA4";
        GlConstants[GlConstants["RGB5_A1"] = 32855] = "RGB5_A1";
        GlConstants[GlConstants["RGB565"] = 36194] = "RGB565";
        GlConstants[GlConstants["DEPTH_COMPONENT16"] = 33189] = "DEPTH_COMPONENT16";
        GlConstants[GlConstants["STENCIL_INDEX"] = 6401] = "STENCIL_INDEX";
        GlConstants[GlConstants["STENCIL_INDEX8"] = 36168] = "STENCIL_INDEX8";
        GlConstants[GlConstants["DEPTH_STENCIL"] = 34041] = "DEPTH_STENCIL";
        GlConstants[GlConstants["RENDERBUFFER_WIDTH"] = 36162] = "RENDERBUFFER_WIDTH";
        GlConstants[GlConstants["RENDERBUFFER_HEIGHT"] = 36163] = "RENDERBUFFER_HEIGHT";
        GlConstants[GlConstants["RENDERBUFFER_INTERNAL_FORMAT"] = 36164] = "RENDERBUFFER_INTERNAL_FORMAT";
        GlConstants[GlConstants["RENDERBUFFER_RED_SIZE"] = 36176] = "RENDERBUFFER_RED_SIZE";
        GlConstants[GlConstants["RENDERBUFFER_GREEN_SIZE"] = 36177] = "RENDERBUFFER_GREEN_SIZE";
        GlConstants[GlConstants["RENDERBUFFER_BLUE_SIZE"] = 36178] = "RENDERBUFFER_BLUE_SIZE";
        GlConstants[GlConstants["RENDERBUFFER_ALPHA_SIZE"] = 36179] = "RENDERBUFFER_ALPHA_SIZE";
        GlConstants[GlConstants["RENDERBUFFER_DEPTH_SIZE"] = 36180] = "RENDERBUFFER_DEPTH_SIZE";
        GlConstants[GlConstants["RENDERBUFFER_STENCIL_SIZE"] = 36181] = "RENDERBUFFER_STENCIL_SIZE";
        GlConstants[GlConstants["FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE"] = 36048] = "FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE";
        GlConstants[GlConstants["FRAMEBUFFER_ATTACHMENT_OBJECT_NAME"] = 36049] = "FRAMEBUFFER_ATTACHMENT_OBJECT_NAME";
        GlConstants[GlConstants["FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL"] = 36050] = "FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL";
        GlConstants[GlConstants["FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE"] = 36051] = "FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE";
        GlConstants[GlConstants["COLOR_ATTACHMENT0"] = 36064] = "COLOR_ATTACHMENT0";
        GlConstants[GlConstants["DEPTH_ATTACHMENT"] = 36096] = "DEPTH_ATTACHMENT";
        GlConstants[GlConstants["STENCIL_ATTACHMENT"] = 36128] = "STENCIL_ATTACHMENT";
        GlConstants[GlConstants["DEPTH_STENCIL_ATTACHMENT"] = 33306] = "DEPTH_STENCIL_ATTACHMENT";
        GlConstants[GlConstants["NONE"] = 0] = "NONE";
        GlConstants[GlConstants["FRAMEBUFFER_COMPLETE"] = 36053] = "FRAMEBUFFER_COMPLETE";
        GlConstants[GlConstants["FRAMEBUFFER_INCOMPLETE_ATTACHMENT"] = 36054] = "FRAMEBUFFER_INCOMPLETE_ATTACHMENT";
        GlConstants[GlConstants["FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT"] = 36055] = "FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT";
        GlConstants[GlConstants["FRAMEBUFFER_INCOMPLETE_DIMENSIONS"] = 36057] = "FRAMEBUFFER_INCOMPLETE_DIMENSIONS";
        GlConstants[GlConstants["FRAMEBUFFER_UNSUPPORTED"] = 36061] = "FRAMEBUFFER_UNSUPPORTED";
        GlConstants[GlConstants["FRAMEBUFFER_BINDING"] = 36006] = "FRAMEBUFFER_BINDING";
        GlConstants[GlConstants["RENDERBUFFER_BINDING"] = 36007] = "RENDERBUFFER_BINDING";
        GlConstants[GlConstants["MAX_RENDERBUFFER_SIZE"] = 34024] = "MAX_RENDERBUFFER_SIZE";
        GlConstants[GlConstants["INVALID_FRAMEBUFFER_OPERATION"] = 1286] = "INVALID_FRAMEBUFFER_OPERATION";
        GlConstants[GlConstants["UNPACK_FLIP_Y_WEBGL"] = 37440] = "UNPACK_FLIP_Y_WEBGL";
        GlConstants[GlConstants["UNPACK_PREMULTIPLY_ALPHA_WEBGL"] = 37441] = "UNPACK_PREMULTIPLY_ALPHA_WEBGL";
        GlConstants[GlConstants["CONTEXT_LOST_WEBGL"] = 37442] = "CONTEXT_LOST_WEBGL";
        GlConstants[GlConstants["UNPACK_COLORSPACE_CONVERSION_WEBGL"] = 37443] = "UNPACK_COLORSPACE_CONVERSION_WEBGL";
        GlConstants[GlConstants["BROWSER_DEFAULT_WEBGL"] = 37444] = "BROWSER_DEFAULT_WEBGL";
        // WEBGL_compressed_texture_s3tc
        GlConstants[GlConstants["COMPRESSED_RGB_S3TC_DXT1_EXT"] = 33776] = "COMPRESSED_RGB_S3TC_DXT1_EXT";
        GlConstants[GlConstants["COMPRESSED_RGBA_S3TC_DXT1_EXT"] = 33777] = "COMPRESSED_RGBA_S3TC_DXT1_EXT";
        GlConstants[GlConstants["COMPRESSED_RGBA_S3TC_DXT3_EXT"] = 33778] = "COMPRESSED_RGBA_S3TC_DXT3_EXT";
        GlConstants[GlConstants["COMPRESSED_RGBA_S3TC_DXT5_EXT"] = 33779] = "COMPRESSED_RGBA_S3TC_DXT5_EXT";
        // WEBGL_compressed_texture_pvrtc
        GlConstants[GlConstants["COMPRESSED_RGB_PVRTC_4BPPV1_IMG"] = 35840] = "COMPRESSED_RGB_PVRTC_4BPPV1_IMG";
        GlConstants[GlConstants["COMPRESSED_RGB_PVRTC_2BPPV1_IMG"] = 35841] = "COMPRESSED_RGB_PVRTC_2BPPV1_IMG";
        GlConstants[GlConstants["COMPRESSED_RGBA_PVRTC_4BPPV1_IMG"] = 35842] = "COMPRESSED_RGBA_PVRTC_4BPPV1_IMG";
        GlConstants[GlConstants["COMPRESSED_RGBA_PVRTC_2BPPV1_IMG"] = 35843] = "COMPRESSED_RGBA_PVRTC_2BPPV1_IMG";
        // WEBGL_compressed_texture_etc1
        GlConstants[GlConstants["COMPRESSED_RGB_ETC1_WEBGL"] = 36196] = "COMPRESSED_RGB_ETC1_WEBGL";
        // Desktop OpenGL
        GlConstants[GlConstants["DOUBLE"] = 5130] = "DOUBLE";
        // WebGL 2
        GlConstants[GlConstants["READ_BUFFER"] = 3074] = "READ_BUFFER";
        GlConstants[GlConstants["UNPACK_ROW_LENGTH"] = 3314] = "UNPACK_ROW_LENGTH";
        GlConstants[GlConstants["UNPACK_SKIP_ROWS"] = 3315] = "UNPACK_SKIP_ROWS";
        GlConstants[GlConstants["UNPACK_SKIP_PIXELS"] = 3316] = "UNPACK_SKIP_PIXELS";
        GlConstants[GlConstants["PACK_ROW_LENGTH"] = 3330] = "PACK_ROW_LENGTH";
        GlConstants[GlConstants["PACK_SKIP_ROWS"] = 3331] = "PACK_SKIP_ROWS";
        GlConstants[GlConstants["PACK_SKIP_PIXELS"] = 3332] = "PACK_SKIP_PIXELS";
        GlConstants[GlConstants["COLOR"] = 6144] = "COLOR";
        GlConstants[GlConstants["DEPTH"] = 6145] = "DEPTH";
        GlConstants[GlConstants["STENCIL"] = 6146] = "STENCIL";
        GlConstants[GlConstants["RED"] = 6403] = "RED";
        GlConstants[GlConstants["RGB8"] = 32849] = "RGB8";
        GlConstants[GlConstants["RGBA8"] = 32856] = "RGBA8";
        GlConstants[GlConstants["RGB10_A2"] = 32857] = "RGB10_A2";
        GlConstants[GlConstants["TEXTURE_BINDING_3D"] = 32874] = "TEXTURE_BINDING_3D";
        GlConstants[GlConstants["UNPACK_SKIP_IMAGES"] = 32877] = "UNPACK_SKIP_IMAGES";
        GlConstants[GlConstants["UNPACK_IMAGE_HEIGHT"] = 32878] = "UNPACK_IMAGE_HEIGHT";
        GlConstants[GlConstants["TEXTURE_3D"] = 32879] = "TEXTURE_3D";
        GlConstants[GlConstants["TEXTURE_WRAP_R"] = 32882] = "TEXTURE_WRAP_R";
        GlConstants[GlConstants["MAX_3D_TEXTURE_SIZE"] = 32883] = "MAX_3D_TEXTURE_SIZE";
        GlConstants[GlConstants["UNSIGNED_INT_2_10_10_10_REV"] = 33640] = "UNSIGNED_INT_2_10_10_10_REV";
        GlConstants[GlConstants["MAX_ELEMENTS_VERTICES"] = 33000] = "MAX_ELEMENTS_VERTICES";
        GlConstants[GlConstants["MAX_ELEMENTS_INDICES"] = 33001] = "MAX_ELEMENTS_INDICES";
        GlConstants[GlConstants["TEXTURE_MIN_LOD"] = 33082] = "TEXTURE_MIN_LOD";
        GlConstants[GlConstants["TEXTURE_MAX_LOD"] = 33083] = "TEXTURE_MAX_LOD";
        GlConstants[GlConstants["TEXTURE_BASE_LEVEL"] = 33084] = "TEXTURE_BASE_LEVEL";
        GlConstants[GlConstants["TEXTURE_MAX_LEVEL"] = 33085] = "TEXTURE_MAX_LEVEL";
        GlConstants[GlConstants["MIN"] = 32775] = "MIN";
        GlConstants[GlConstants["MAX"] = 32776] = "MAX";
        GlConstants[GlConstants["DEPTH_COMPONENT24"] = 33190] = "DEPTH_COMPONENT24";
        GlConstants[GlConstants["MAX_TEXTURE_LOD_BIAS"] = 34045] = "MAX_TEXTURE_LOD_BIAS";
        GlConstants[GlConstants["TEXTURE_COMPARE_MODE"] = 34892] = "TEXTURE_COMPARE_MODE";
        GlConstants[GlConstants["TEXTURE_COMPARE_FUNC"] = 34893] = "TEXTURE_COMPARE_FUNC";
        GlConstants[GlConstants["CURRENT_QUERY"] = 34917] = "CURRENT_QUERY";
        GlConstants[GlConstants["QUERY_RESULT"] = 34918] = "QUERY_RESULT";
        GlConstants[GlConstants["QUERY_RESULT_AVAILABLE"] = 34919] = "QUERY_RESULT_AVAILABLE";
        GlConstants[GlConstants["STREAM_READ"] = 35041] = "STREAM_READ";
        GlConstants[GlConstants["STREAM_COPY"] = 35042] = "STREAM_COPY";
        GlConstants[GlConstants["STATIC_READ"] = 35045] = "STATIC_READ";
        GlConstants[GlConstants["STATIC_COPY"] = 35046] = "STATIC_COPY";
        GlConstants[GlConstants["DYNAMIC_READ"] = 35049] = "DYNAMIC_READ";
        GlConstants[GlConstants["DYNAMIC_COPY"] = 35050] = "DYNAMIC_COPY";
        GlConstants[GlConstants["MAX_DRAW_BUFFERS"] = 34852] = "MAX_DRAW_BUFFERS";
        GlConstants[GlConstants["DRAW_BUFFER0"] = 34853] = "DRAW_BUFFER0";
        GlConstants[GlConstants["DRAW_BUFFER1"] = 34854] = "DRAW_BUFFER1";
        GlConstants[GlConstants["DRAW_BUFFER2"] = 34855] = "DRAW_BUFFER2";
        GlConstants[GlConstants["DRAW_BUFFER3"] = 34856] = "DRAW_BUFFER3";
        GlConstants[GlConstants["DRAW_BUFFER4"] = 34857] = "DRAW_BUFFER4";
        GlConstants[GlConstants["DRAW_BUFFER5"] = 34858] = "DRAW_BUFFER5";
        GlConstants[GlConstants["DRAW_BUFFER6"] = 34859] = "DRAW_BUFFER6";
        GlConstants[GlConstants["DRAW_BUFFER7"] = 34860] = "DRAW_BUFFER7";
        GlConstants[GlConstants["DRAW_BUFFER8"] = 34861] = "DRAW_BUFFER8";
        GlConstants[GlConstants["DRAW_BUFFER9"] = 34862] = "DRAW_BUFFER9";
        GlConstants[GlConstants["DRAW_BUFFER10"] = 34863] = "DRAW_BUFFER10";
        GlConstants[GlConstants["DRAW_BUFFER11"] = 34864] = "DRAW_BUFFER11";
        GlConstants[GlConstants["DRAW_BUFFER12"] = 34865] = "DRAW_BUFFER12";
        GlConstants[GlConstants["DRAW_BUFFER13"] = 34866] = "DRAW_BUFFER13";
        GlConstants[GlConstants["DRAW_BUFFER14"] = 34867] = "DRAW_BUFFER14";
        GlConstants[GlConstants["DRAW_BUFFER15"] = 34868] = "DRAW_BUFFER15";
        GlConstants[GlConstants["MAX_FRAGMENT_UNIFORM_COMPONENTS"] = 35657] = "MAX_FRAGMENT_UNIFORM_COMPONENTS";
        GlConstants[GlConstants["MAX_VERTEX_UNIFORM_COMPONENTS"] = 35658] = "MAX_VERTEX_UNIFORM_COMPONENTS";
        GlConstants[GlConstants["SAMPLER_3D"] = 35679] = "SAMPLER_3D";
        GlConstants[GlConstants["SAMPLER_2D_SHADOW"] = 35682] = "SAMPLER_2D_SHADOW";
        GlConstants[GlConstants["FRAGMENT_SHADER_DERIVATIVE_HINT"] = 35723] = "FRAGMENT_SHADER_DERIVATIVE_HINT";
        GlConstants[GlConstants["PIXEL_PACK_BUFFER"] = 35051] = "PIXEL_PACK_BUFFER";
        GlConstants[GlConstants["PIXEL_UNPACK_BUFFER"] = 35052] = "PIXEL_UNPACK_BUFFER";
        GlConstants[GlConstants["PIXEL_PACK_BUFFER_BINDING"] = 35053] = "PIXEL_PACK_BUFFER_BINDING";
        GlConstants[GlConstants["PIXEL_UNPACK_BUFFER_BINDING"] = 35055] = "PIXEL_UNPACK_BUFFER_BINDING";
        GlConstants[GlConstants["FLOAT_MAT2X3"] = 35685] = "FLOAT_MAT2X3";
        GlConstants[GlConstants["FLOAT_MAT2X4"] = 35686] = "FLOAT_MAT2X4";
        GlConstants[GlConstants["FLOAT_MAT3X2"] = 35687] = "FLOAT_MAT3X2";
        GlConstants[GlConstants["FLOAT_MAT3X4"] = 35688] = "FLOAT_MAT3X4";
        GlConstants[GlConstants["FLOAT_MAT4X2"] = 35689] = "FLOAT_MAT4X2";
        GlConstants[GlConstants["FLOAT_MAT4X3"] = 35690] = "FLOAT_MAT4X3";
        GlConstants[GlConstants["SRGB"] = 35904] = "SRGB";
        GlConstants[GlConstants["SRGB8"] = 35905] = "SRGB8";
        GlConstants[GlConstants["SRGB8_ALPHA8"] = 35907] = "SRGB8_ALPHA8";
        GlConstants[GlConstants["COMPARE_REF_TO_TEXTURE"] = 34894] = "COMPARE_REF_TO_TEXTURE";
        GlConstants[GlConstants["RGBA32F"] = 34836] = "RGBA32F";
        GlConstants[GlConstants["RGB32F"] = 34837] = "RGB32F";
        GlConstants[GlConstants["RGBA16F"] = 34842] = "RGBA16F";
        GlConstants[GlConstants["RGB16F"] = 34843] = "RGB16F";
        GlConstants[GlConstants["VERTEX_ATTRIB_ARRAY_INTEGER"] = 35069] = "VERTEX_ATTRIB_ARRAY_INTEGER";
        GlConstants[GlConstants["MAX_ARRAY_TEXTURE_LAYERS"] = 35071] = "MAX_ARRAY_TEXTURE_LAYERS";
        GlConstants[GlConstants["MIN_PROGRAM_TEXEL_OFFSET"] = 35076] = "MIN_PROGRAM_TEXEL_OFFSET";
        GlConstants[GlConstants["MAX_PROGRAM_TEXEL_OFFSET"] = 35077] = "MAX_PROGRAM_TEXEL_OFFSET";
        GlConstants[GlConstants["MAX_VARYING_COMPONENTS"] = 35659] = "MAX_VARYING_COMPONENTS";
        GlConstants[GlConstants["TEXTURE_2D_ARRAY"] = 35866] = "TEXTURE_2D_ARRAY";
        GlConstants[GlConstants["TEXTURE_BINDING_2D_ARRAY"] = 35869] = "TEXTURE_BINDING_2D_ARRAY";
        GlConstants[GlConstants["R11F_G11F_B10F"] = 35898] = "R11F_G11F_B10F";
        GlConstants[GlConstants["UNSIGNED_INT_10F_11F_11F_REV"] = 35899] = "UNSIGNED_INT_10F_11F_11F_REV";
        GlConstants[GlConstants["RGB9_E5"] = 35901] = "RGB9_E5";
        GlConstants[GlConstants["UNSIGNED_INT_5_9_9_9_REV"] = 35902] = "UNSIGNED_INT_5_9_9_9_REV";
        GlConstants[GlConstants["TRANSFORM_FEEDBACK_BUFFER_MODE"] = 35967] = "TRANSFORM_FEEDBACK_BUFFER_MODE";
        GlConstants[GlConstants["MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS"] = 35968] = "MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS";
        GlConstants[GlConstants["TRANSFORM_FEEDBACK_VARYINGS"] = 35971] = "TRANSFORM_FEEDBACK_VARYINGS";
        GlConstants[GlConstants["TRANSFORM_FEEDBACK_BUFFER_START"] = 35972] = "TRANSFORM_FEEDBACK_BUFFER_START";
        GlConstants[GlConstants["TRANSFORM_FEEDBACK_BUFFER_SIZE"] = 35973] = "TRANSFORM_FEEDBACK_BUFFER_SIZE";
        GlConstants[GlConstants["TRANSFORM_FEEDBACK_PRIMITIVES_WRITTEN"] = 35976] = "TRANSFORM_FEEDBACK_PRIMITIVES_WRITTEN";
        GlConstants[GlConstants["RASTERIZER_DISCARD"] = 35977] = "RASTERIZER_DISCARD";
        GlConstants[GlConstants["MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS"] = 35978] = "MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS";
        GlConstants[GlConstants["MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS"] = 35979] = "MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS";
        GlConstants[GlConstants["INTERLEAVED_ATTRIBS"] = 35980] = "INTERLEAVED_ATTRIBS";
        GlConstants[GlConstants["SEPARATE_ATTRIBS"] = 35981] = "SEPARATE_ATTRIBS";
        GlConstants[GlConstants["TRANSFORM_FEEDBACK_BUFFER"] = 35982] = "TRANSFORM_FEEDBACK_BUFFER";
        GlConstants[GlConstants["TRANSFORM_FEEDBACK_BUFFER_BINDING"] = 35983] = "TRANSFORM_FEEDBACK_BUFFER_BINDING";
        GlConstants[GlConstants["RGBA32UI"] = 36208] = "RGBA32UI";
        GlConstants[GlConstants["RGB32UI"] = 36209] = "RGB32UI";
        GlConstants[GlConstants["RGBA16UI"] = 36214] = "RGBA16UI";
        GlConstants[GlConstants["RGB16UI"] = 36215] = "RGB16UI";
        GlConstants[GlConstants["RGBA8UI"] = 36220] = "RGBA8UI";
        GlConstants[GlConstants["RGB8UI"] = 36221] = "RGB8UI";
        GlConstants[GlConstants["RGBA32I"] = 36226] = "RGBA32I";
        GlConstants[GlConstants["RGB32I"] = 36227] = "RGB32I";
        GlConstants[GlConstants["RGBA16I"] = 36232] = "RGBA16I";
        GlConstants[GlConstants["RGB16I"] = 36233] = "RGB16I";
        GlConstants[GlConstants["RGBA8I"] = 36238] = "RGBA8I";
        GlConstants[GlConstants["RGB8I"] = 36239] = "RGB8I";
        GlConstants[GlConstants["RED_INTEGER"] = 36244] = "RED_INTEGER";
        GlConstants[GlConstants["RGB_INTEGER"] = 36248] = "RGB_INTEGER";
        GlConstants[GlConstants["RGBA_INTEGER"] = 36249] = "RGBA_INTEGER";
        GlConstants[GlConstants["SAMPLER_2D_ARRAY"] = 36289] = "SAMPLER_2D_ARRAY";
        GlConstants[GlConstants["SAMPLER_2D_ARRAY_SHADOW"] = 36292] = "SAMPLER_2D_ARRAY_SHADOW";
        GlConstants[GlConstants["SAMPLER_CUBE_SHADOW"] = 36293] = "SAMPLER_CUBE_SHADOW";
        GlConstants[GlConstants["UNSIGNED_INT_VEC2"] = 36294] = "UNSIGNED_INT_VEC2";
        GlConstants[GlConstants["UNSIGNED_INT_VEC3"] = 36295] = "UNSIGNED_INT_VEC3";
        GlConstants[GlConstants["UNSIGNED_INT_VEC4"] = 36296] = "UNSIGNED_INT_VEC4";
        GlConstants[GlConstants["INT_SAMPLER_2D"] = 36298] = "INT_SAMPLER_2D";
        GlConstants[GlConstants["INT_SAMPLER_3D"] = 36299] = "INT_SAMPLER_3D";
        GlConstants[GlConstants["INT_SAMPLER_CUBE"] = 36300] = "INT_SAMPLER_CUBE";
        GlConstants[GlConstants["INT_SAMPLER_2D_ARRAY"] = 36303] = "INT_SAMPLER_2D_ARRAY";
        GlConstants[GlConstants["UNSIGNED_INT_SAMPLER_2D"] = 36306] = "UNSIGNED_INT_SAMPLER_2D";
        GlConstants[GlConstants["UNSIGNED_INT_SAMPLER_3D"] = 36307] = "UNSIGNED_INT_SAMPLER_3D";
        GlConstants[GlConstants["UNSIGNED_INT_SAMPLER_CUBE"] = 36308] = "UNSIGNED_INT_SAMPLER_CUBE";
        GlConstants[GlConstants["UNSIGNED_INT_SAMPLER_2D_ARRAY"] = 36311] = "UNSIGNED_INT_SAMPLER_2D_ARRAY";
        GlConstants[GlConstants["DEPTH_COMPONENT32F"] = 36012] = "DEPTH_COMPONENT32F";
        GlConstants[GlConstants["DEPTH32F_STENCIL8"] = 36013] = "DEPTH32F_STENCIL8";
        GlConstants[GlConstants["FLOAT_32_UNSIGNED_INT_24_8_REV"] = 36269] = "FLOAT_32_UNSIGNED_INT_24_8_REV";
        GlConstants[GlConstants["FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING"] = 33296] = "FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING";
        GlConstants[GlConstants["FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE"] = 33297] = "FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE";
        GlConstants[GlConstants["FRAMEBUFFER_ATTACHMENT_RED_SIZE"] = 33298] = "FRAMEBUFFER_ATTACHMENT_RED_SIZE";
        GlConstants[GlConstants["FRAMEBUFFER_ATTACHMENT_GREEN_SIZE"] = 33299] = "FRAMEBUFFER_ATTACHMENT_GREEN_SIZE";
        GlConstants[GlConstants["FRAMEBUFFER_ATTACHMENT_BLUE_SIZE"] = 33300] = "FRAMEBUFFER_ATTACHMENT_BLUE_SIZE";
        GlConstants[GlConstants["FRAMEBUFFER_ATTACHMENT_ALPHA_SIZE"] = 33301] = "FRAMEBUFFER_ATTACHMENT_ALPHA_SIZE";
        GlConstants[GlConstants["FRAMEBUFFER_ATTACHMENT_DEPTH_SIZE"] = 33302] = "FRAMEBUFFER_ATTACHMENT_DEPTH_SIZE";
        GlConstants[GlConstants["FRAMEBUFFER_ATTACHMENT_STENCIL_SIZE"] = 33303] = "FRAMEBUFFER_ATTACHMENT_STENCIL_SIZE";
        GlConstants[GlConstants["FRAMEBUFFER_DEFAULT"] = 33304] = "FRAMEBUFFER_DEFAULT";
        GlConstants[GlConstants["UNSIGNED_INT_24_8"] = 34042] = "UNSIGNED_INT_24_8";
        GlConstants[GlConstants["DEPTH24_STENCIL8"] = 35056] = "DEPTH24_STENCIL8";
        GlConstants[GlConstants["UNSIGNED_NORMALIZED"] = 35863] = "UNSIGNED_NORMALIZED";
        GlConstants[GlConstants["DRAW_FRAMEBUFFER_BINDING"] = 36006] = "DRAW_FRAMEBUFFER_BINDING";
        GlConstants[GlConstants["READ_FRAMEBUFFER"] = 36008] = "READ_FRAMEBUFFER";
        GlConstants[GlConstants["DRAW_FRAMEBUFFER"] = 36009] = "DRAW_FRAMEBUFFER";
        GlConstants[GlConstants["READ_FRAMEBUFFER_BINDING"] = 36010] = "READ_FRAMEBUFFER_BINDING";
        GlConstants[GlConstants["RENDERBUFFER_SAMPLES"] = 36011] = "RENDERBUFFER_SAMPLES";
        GlConstants[GlConstants["FRAMEBUFFER_ATTACHMENT_TEXTURE_LAYER"] = 36052] = "FRAMEBUFFER_ATTACHMENT_TEXTURE_LAYER";
        GlConstants[GlConstants["MAX_COLOR_ATTACHMENTS"] = 36063] = "MAX_COLOR_ATTACHMENTS";
        GlConstants[GlConstants["COLOR_ATTACHMENT1"] = 36065] = "COLOR_ATTACHMENT1";
        GlConstants[GlConstants["COLOR_ATTACHMENT2"] = 36066] = "COLOR_ATTACHMENT2";
        GlConstants[GlConstants["COLOR_ATTACHMENT3"] = 36067] = "COLOR_ATTACHMENT3";
        GlConstants[GlConstants["COLOR_ATTACHMENT4"] = 36068] = "COLOR_ATTACHMENT4";
        GlConstants[GlConstants["COLOR_ATTACHMENT5"] = 36069] = "COLOR_ATTACHMENT5";
        GlConstants[GlConstants["COLOR_ATTACHMENT6"] = 36070] = "COLOR_ATTACHMENT6";
        GlConstants[GlConstants["COLOR_ATTACHMENT7"] = 36071] = "COLOR_ATTACHMENT7";
        GlConstants[GlConstants["COLOR_ATTACHMENT8"] = 36072] = "COLOR_ATTACHMENT8";
        GlConstants[GlConstants["COLOR_ATTACHMENT9"] = 36073] = "COLOR_ATTACHMENT9";
        GlConstants[GlConstants["COLOR_ATTACHMENT10"] = 36074] = "COLOR_ATTACHMENT10";
        GlConstants[GlConstants["COLOR_ATTACHMENT11"] = 36075] = "COLOR_ATTACHMENT11";
        GlConstants[GlConstants["COLOR_ATTACHMENT12"] = 36076] = "COLOR_ATTACHMENT12";
        GlConstants[GlConstants["COLOR_ATTACHMENT13"] = 36077] = "COLOR_ATTACHMENT13";
        GlConstants[GlConstants["COLOR_ATTACHMENT14"] = 36078] = "COLOR_ATTACHMENT14";
        GlConstants[GlConstants["COLOR_ATTACHMENT15"] = 36079] = "COLOR_ATTACHMENT15";
        GlConstants[GlConstants["FRAMEBUFFER_INCOMPLETE_MULTISAMPLE"] = 36182] = "FRAMEBUFFER_INCOMPLETE_MULTISAMPLE";
        GlConstants[GlConstants["MAX_SAMPLES"] = 36183] = "MAX_SAMPLES";
        GlConstants[GlConstants["HALF_FLOAT"] = 5131] = "HALF_FLOAT";
        GlConstants[GlConstants["HALF_FLOAT_OES"] = 36193] = "HALF_FLOAT_OES";
        GlConstants[GlConstants["RG"] = 33319] = "RG";
        GlConstants[GlConstants["RG_INTEGER"] = 33320] = "RG_INTEGER";
        GlConstants[GlConstants["R8"] = 33321] = "R8";
        GlConstants[GlConstants["RG8"] = 33323] = "RG8";
        GlConstants[GlConstants["R16F"] = 33325] = "R16F";
        GlConstants[GlConstants["R32F"] = 33326] = "R32F";
        GlConstants[GlConstants["RG16F"] = 33327] = "RG16F";
        GlConstants[GlConstants["RG32F"] = 33328] = "RG32F";
        GlConstants[GlConstants["R8I"] = 33329] = "R8I";
        GlConstants[GlConstants["R8UI"] = 33330] = "R8UI";
        GlConstants[GlConstants["R16I"] = 33331] = "R16I";
        GlConstants[GlConstants["R16UI"] = 33332] = "R16UI";
        GlConstants[GlConstants["R32I"] = 33333] = "R32I";
        GlConstants[GlConstants["R32UI"] = 33334] = "R32UI";
        GlConstants[GlConstants["RG8I"] = 33335] = "RG8I";
        GlConstants[GlConstants["RG8UI"] = 33336] = "RG8UI";
        GlConstants[GlConstants["RG16I"] = 33337] = "RG16I";
        GlConstants[GlConstants["RG16UI"] = 33338] = "RG16UI";
        GlConstants[GlConstants["RG32I"] = 33339] = "RG32I";
        GlConstants[GlConstants["RG32UI"] = 33340] = "RG32UI";
        GlConstants[GlConstants["VERTEX_ARRAY_BINDING"] = 34229] = "VERTEX_ARRAY_BINDING";
        GlConstants[GlConstants["R8_SNORM"] = 36756] = "R8_SNORM";
        GlConstants[GlConstants["RG8_SNORM"] = 36757] = "RG8_SNORM";
        GlConstants[GlConstants["RGB8_SNORM"] = 36758] = "RGB8_SNORM";
        GlConstants[GlConstants["RGBA8_SNORM"] = 36759] = "RGBA8_SNORM";
        GlConstants[GlConstants["SIGNED_NORMALIZED"] = 36764] = "SIGNED_NORMALIZED";
        GlConstants[GlConstants["COPY_READ_BUFFER"] = 36662] = "COPY_READ_BUFFER";
        GlConstants[GlConstants["COPY_WRITE_BUFFER"] = 36663] = "COPY_WRITE_BUFFER";
        GlConstants[GlConstants["COPY_READ_BUFFER_BINDING"] = 36662] = "COPY_READ_BUFFER_BINDING";
        GlConstants[GlConstants["COPY_WRITE_BUFFER_BINDING"] = 36663] = "COPY_WRITE_BUFFER_BINDING";
        GlConstants[GlConstants["UNIFORM_BUFFER"] = 35345] = "UNIFORM_BUFFER";
        GlConstants[GlConstants["UNIFORM_BUFFER_BINDING"] = 35368] = "UNIFORM_BUFFER_BINDING";
        GlConstants[GlConstants["UNIFORM_BUFFER_START"] = 35369] = "UNIFORM_BUFFER_START";
        GlConstants[GlConstants["UNIFORM_BUFFER_SIZE"] = 35370] = "UNIFORM_BUFFER_SIZE";
        GlConstants[GlConstants["MAX_VERTEX_UNIFORM_BLOCKS"] = 35371] = "MAX_VERTEX_UNIFORM_BLOCKS";
        GlConstants[GlConstants["MAX_FRAGMENT_UNIFORM_BLOCKS"] = 35373] = "MAX_FRAGMENT_UNIFORM_BLOCKS";
        GlConstants[GlConstants["MAX_COMBINED_UNIFORM_BLOCKS"] = 35374] = "MAX_COMBINED_UNIFORM_BLOCKS";
        GlConstants[GlConstants["MAX_UNIFORM_BUFFER_BINDINGS"] = 35375] = "MAX_UNIFORM_BUFFER_BINDINGS";
        GlConstants[GlConstants["MAX_UNIFORM_BLOCK_SIZE"] = 35376] = "MAX_UNIFORM_BLOCK_SIZE";
        GlConstants[GlConstants["MAX_COMBINED_VERTEX_UNIFORM_COMPONENTS"] = 35377] = "MAX_COMBINED_VERTEX_UNIFORM_COMPONENTS";
        GlConstants[GlConstants["MAX_COMBINED_FRAGMENT_UNIFORM_COMPONENTS"] = 35379] = "MAX_COMBINED_FRAGMENT_UNIFORM_COMPONENTS";
        GlConstants[GlConstants["UNIFORM_BUFFER_OFFSET_ALIGNMENT"] = 35380] = "UNIFORM_BUFFER_OFFSET_ALIGNMENT";
        GlConstants[GlConstants["ACTIVE_UNIFORM_BLOCKS"] = 35382] = "ACTIVE_UNIFORM_BLOCKS";
        GlConstants[GlConstants["UNIFORM_TYPE"] = 35383] = "UNIFORM_TYPE";
        GlConstants[GlConstants["UNIFORM_SIZE"] = 35384] = "UNIFORM_SIZE";
        GlConstants[GlConstants["UNIFORM_BLOCK_INDEX"] = 35386] = "UNIFORM_BLOCK_INDEX";
        GlConstants[GlConstants["UNIFORM_OFFSET"] = 35387] = "UNIFORM_OFFSET";
        GlConstants[GlConstants["UNIFORM_ARRAY_STRIDE"] = 35388] = "UNIFORM_ARRAY_STRIDE";
        GlConstants[GlConstants["UNIFORM_MATRIX_STRIDE"] = 35389] = "UNIFORM_MATRIX_STRIDE";
        GlConstants[GlConstants["UNIFORM_IS_ROW_MAJOR"] = 35390] = "UNIFORM_IS_ROW_MAJOR";
        GlConstants[GlConstants["UNIFORM_BLOCK_BINDING"] = 35391] = "UNIFORM_BLOCK_BINDING";
        GlConstants[GlConstants["UNIFORM_BLOCK_DATA_SIZE"] = 35392] = "UNIFORM_BLOCK_DATA_SIZE";
        GlConstants[GlConstants["UNIFORM_BLOCK_ACTIVE_UNIFORMS"] = 35394] = "UNIFORM_BLOCK_ACTIVE_UNIFORMS";
        GlConstants[GlConstants["UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES"] = 35395] = "UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES";
        GlConstants[GlConstants["UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER"] = 35396] = "UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER";
        GlConstants[GlConstants["UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER"] = 35398] = "UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER";
        GlConstants[GlConstants["INVALID_INDEX"] = 4294967295] = "INVALID_INDEX";
        GlConstants[GlConstants["MAX_VERTEX_OUTPUT_COMPONENTS"] = 37154] = "MAX_VERTEX_OUTPUT_COMPONENTS";
        GlConstants[GlConstants["MAX_FRAGMENT_INPUT_COMPONENTS"] = 37157] = "MAX_FRAGMENT_INPUT_COMPONENTS";
        GlConstants[GlConstants["MAX_SERVER_WAIT_TIMEOUT"] = 37137] = "MAX_SERVER_WAIT_TIMEOUT";
        GlConstants[GlConstants["OBJECT_TYPE"] = 37138] = "OBJECT_TYPE";
        GlConstants[GlConstants["SYNC_CONDITION"] = 37139] = "SYNC_CONDITION";
        GlConstants[GlConstants["SYNC_STATUS"] = 37140] = "SYNC_STATUS";
        GlConstants[GlConstants["SYNC_FLAGS"] = 37141] = "SYNC_FLAGS";
        GlConstants[GlConstants["SYNC_FENCE"] = 37142] = "SYNC_FENCE";
        GlConstants[GlConstants["SYNC_GPU_COMMANDS_COMPLETE"] = 37143] = "SYNC_GPU_COMMANDS_COMPLETE";
        GlConstants[GlConstants["UNSIGNALED"] = 37144] = "UNSIGNALED";
        GlConstants[GlConstants["SIGNALED"] = 37145] = "SIGNALED";
        GlConstants[GlConstants["ALREADY_SIGNALED"] = 37146] = "ALREADY_SIGNALED";
        GlConstants[GlConstants["TIMEOUT_EXPIRED"] = 37147] = "TIMEOUT_EXPIRED";
        GlConstants[GlConstants["CONDITION_SATISFIED"] = 37148] = "CONDITION_SATISFIED";
        GlConstants[GlConstants["WAIT_FAILED"] = 37149] = "WAIT_FAILED";
        GlConstants[GlConstants["SYNC_FLUSH_COMMANDS_BIT"] = 1] = "SYNC_FLUSH_COMMANDS_BIT";
        GlConstants[GlConstants["VERTEX_ATTRIB_ARRAY_DIVISOR"] = 35070] = "VERTEX_ATTRIB_ARRAY_DIVISOR";
        GlConstants[GlConstants["ANY_SAMPLES_PASSED"] = 35887] = "ANY_SAMPLES_PASSED";
        GlConstants[GlConstants["ANY_SAMPLES_PASSED_CONSERVATIVE"] = 36202] = "ANY_SAMPLES_PASSED_CONSERVATIVE";
        GlConstants[GlConstants["SAMPLER_BINDING"] = 35097] = "SAMPLER_BINDING";
        GlConstants[GlConstants["RGB10_A2UI"] = 36975] = "RGB10_A2UI";
        GlConstants[GlConstants["INT_2_10_10_10_REV"] = 36255] = "INT_2_10_10_10_REV";
        GlConstants[GlConstants["TRANSFORM_FEEDBACK"] = 36386] = "TRANSFORM_FEEDBACK";
        GlConstants[GlConstants["TRANSFORM_FEEDBACK_PAUSED"] = 36387] = "TRANSFORM_FEEDBACK_PAUSED";
        GlConstants[GlConstants["TRANSFORM_FEEDBACK_ACTIVE"] = 36388] = "TRANSFORM_FEEDBACK_ACTIVE";
        GlConstants[GlConstants["TRANSFORM_FEEDBACK_BINDING"] = 36389] = "TRANSFORM_FEEDBACK_BINDING";
        GlConstants[GlConstants["COMPRESSED_R11_EAC"] = 37488] = "COMPRESSED_R11_EAC";
        GlConstants[GlConstants["COMPRESSED_SIGNED_R11_EAC"] = 37489] = "COMPRESSED_SIGNED_R11_EAC";
        GlConstants[GlConstants["COMPRESSED_RG11_EAC"] = 37490] = "COMPRESSED_RG11_EAC";
        GlConstants[GlConstants["COMPRESSED_SIGNED_RG11_EAC"] = 37491] = "COMPRESSED_SIGNED_RG11_EAC";
        GlConstants[GlConstants["COMPRESSED_RGB8_ETC2"] = 37492] = "COMPRESSED_RGB8_ETC2";
        GlConstants[GlConstants["COMPRESSED_SRGB8_ETC2"] = 37493] = "COMPRESSED_SRGB8_ETC2";
        GlConstants[GlConstants["COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2"] = 37494] = "COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2";
        GlConstants[GlConstants["COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2"] = 37495] = "COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2";
        GlConstants[GlConstants["COMPRESSED_RGBA8_ETC2_EAC"] = 37496] = "COMPRESSED_RGBA8_ETC2_EAC";
        GlConstants[GlConstants["COMPRESSED_SRGB8_ALPHA8_ETC2_EAC"] = 37497] = "COMPRESSED_SRGB8_ALPHA8_ETC2_EAC";
        GlConstants[GlConstants["TEXTURE_IMMUTABLE_FORMAT"] = 37167] = "TEXTURE_IMMUTABLE_FORMAT";
        GlConstants[GlConstants["MAX_ELEMENT_INDEX"] = 36203] = "MAX_ELEMENT_INDEX";
        GlConstants[GlConstants["TEXTURE_IMMUTABLE_LEVELS"] = 33503] = "TEXTURE_IMMUTABLE_LEVELS";
        // Extensions
        GlConstants[GlConstants["MAX_TEXTURE_MAX_ANISOTROPY_EXT"] = 34047] = "MAX_TEXTURE_MAX_ANISOTROPY_EXT";
    })(GlConstants$1 || (GlConstants$1 = {}));

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function createTextureFromTypedArray(gl, texOP) {
        // deduceTextureTypedArrayOption(gl, data, texOP);
        var tex = gl.createTexture();
        var texDes = checkTextureOption(gl, texOP);
        gl.bindTexture(texDes.target, tex);
        gl.texParameteri(texDes.target, gl.TEXTURE_MAG_FILTER, texDes.filterMax);
        gl.texParameteri(texDes.target, gl.TEXTURE_MIN_FILTER, texDes.filterMin);
        gl.texParameteri(texDes.target, gl.TEXTURE_WRAP_S, texDes.wrapS);
        gl.texParameteri(texDes.target, gl.TEXTURE_WRAP_T, texDes.wrapT);
        if (texOP.mipmaps) {
            for (var i = 0; i < texOP.mipmaps.length; i++) {
                var levelData = texOP.mipmaps[i];
                gl.texImage2D(texDes.target, i, texDes.pixelFormat, levelData.width, levelData.height, 0, texDes.pixelFormat, texDes.pixelDatatype, levelData.viewData);
            }
        }
        else {
            gl.texImage2D(texDes.target, 0, texDes.pixelFormat, texOP.width, texOP.height, 0, texDes.pixelFormat, texDes.pixelDatatype, texOP.viewData);
            if (texDes.enableMipMap) {
                gl.generateMipmap(texDes.target);
            }
        }
        return {
            texture: tex,
            texDes: texDes,
        };
    }
    function createTextureFromImageSource(gl, texOP) {
        var tex = gl.createTexture();
        texOP.width = texOP.img.width;
        texOP.height = texOP.img.height;
        var texDes = checkTextureOption(gl, texOP);
        gl.bindTexture(texDes.target, tex);
        gl.texParameteri(texDes.target, gl.TEXTURE_MAG_FILTER, texDes.filterMax);
        gl.texParameteri(texDes.target, gl.TEXTURE_MIN_FILTER, texDes.filterMin);
        gl.texParameteri(texDes.target, gl.TEXTURE_WRAP_S, texDes.wrapS);
        gl.texParameteri(texDes.target, gl.TEXTURE_WRAP_T, texDes.wrapT);
        if (texOP.mipmaps != null) {
            for (var i = 0; i < texOP.mipmaps.length; i++) {
                var levelData = texOP.mipmaps[i];
                gl.texImage2D(texDes.target, i, texDes.pixelFormat, texDes.pixelFormat, texDes.pixelDatatype, levelData.img);
            }
        }
        else {
            gl.texImage2D(texDes.target, 0, texDes.pixelFormat, texDes.pixelFormat, texDes.pixelDatatype, texOP.img);
            if (texDes.enableMipMap) {
                gl.generateMipmap(texDes.target);
            }
        }
        return {
            texture: tex,
            texDes: texDes,
        };
    }
    function isPowerOf2(value) {
        return (value & (value - 1)) === 0;
    }
    function canGenerateMipmap(gl, width, height) {
        if (!gl.beWebgl2) {
            return isPowerOf2(width) && isPowerOf2(height);
        }
        return true;
    }
    function canWrapReapeat(gl, width, height) {
        if (!gl.beWebgl2) {
            return isPowerOf2(width) && isPowerOf2(height);
        }
        return true;
    }
    function filterFallback(gl, filter) {
        if (filter === gl.NEAREST || filter === gl.NEAREST_MIPMAP_LINEAR || filter === gl.NEAREST_MIPMAP_NEAREST) {
            return gl.NEAREST;
        }
        return gl.LINEAR;
    }
    function checkTextureOption(gl, texOP) {
        var texdes = __assign({}, texOP);
        texdes.target = (texOP && texOP.target) || gl.TEXTURE_2D;
        texdes.pixelFormat = (texOP && texOP.pixelFormat) || gl.RGBA;
        texdes.pixelDatatype = (texOP && texOP.pixelDatatype) || gl.UNSIGNED_BYTE;
        var beCanWrapReapt = canWrapReapeat(gl, texdes.width, texdes.height);
        var beCanGenerateMipmap = canGenerateMipmap(gl, texdes.width, texdes.height);
        if (texdes.mipmaps != null) {
            texdes.enableMipMap = true;
        }
        else {
            texdes.enableMipMap = texOP.enableMipMap != false && beCanGenerateMipmap;
        }
        if (beCanWrapReapt) {
            texdes.wrapS = (texOP && texOP.wrapS) || gl.REPEAT;
            texdes.wrapT = (texOP && texOP.wrapT) || gl.REPEAT;
        }
        else {
            texdes.wrapS = texdes.wrapT = gl.CLAMP_TO_EDGE;
            if ((texOP && texOP.wrapS && texOP.wrapS == gl.REPEAT) || (texOP && texOP.wrapT && texOP.wrapT == gl.REPEAT)) {
                console.warn("texture repeat need Img size be power of 2!");
            }
        }
        if (texdes.enableMipMap) {
            texdes.filterMax = (texOP && texOP.filterMax) || gl.LINEAR;
            texdes.filterMin = (texOP && texOP.filterMin) || gl.NEAREST_MIPMAP_LINEAR;
        }
        else {
            texdes.filterMax = texOP && texOP.filterMax ? filterFallback(gl, texOP.filterMax) : gl.LINEAR;
            texdes.filterMin = texOP && texOP.filterMin ? filterFallback(gl, texOP.filterMax) : gl.LINEAR;
            if (texOP && texOP.filterMin && (texOP.filterMin != gl.NEAREST || texOP.filterMin != gl.LINEAR)) {
                console.warn("texture mimap filter need Img size be power of 2 And enable mimap option!");
            }
        }
        return texdes;
    }

    WebGLRenderingContext.prototype.addExtension = function (extname) {
        var ext = this.getExtension(extname);
        if (ext) {
            switch (extname) {
                case "OES_vertex_array_object":
                    this.bindVertexArray = ext.bindVertexArrayOES.bind(ext);
                    this.createVertexArray = ext.createVertexArrayOES.bind(ext);
                    this.deleteVertexArray = ext.deleteVertexArrayOES.bind(ext);
                    this.beActiveVao = true;
                    return true;
                case "ANGLE_instanced_arrays":
                    this.vertexAttribDivisor = ext.vertexAttribDivisorANGLE.bind(ext);
                    this.drawElementsInstanced = ext.drawElementsInstancedANGLE.bind(ext);
                    this.drawArraysInstanced = ext.drawArraysInstancedANGLE.bind(ext);
                    this.beActiveInstance = true;
                    return true;
                default:
                    console.warn("Not handle in addExtension, type: " + extname);
                    return false;
            }
        }
        return false;
    };
    Object.defineProperty(WebGLRenderingContext, "beWebgl2", {
        get: function () {
            if (this.beWebgl2 == null) {
                var version = this.getParameter(this.VERSION);
                this.beWebgl2 = version.indexOf("WebGL 2.0") === 0;
            }
            return this._beWebgl2;
        },
        set: function (value) {
            this._beWebgl2 = value;
        },
    });
    function setUpWebgl(canvas, options) {
        if (options === void 0) { options = {}; }
        var type = options.context || "webgl";
        var gl = canvas.getContext(type, options.contextAtts);
        if (options.extentions != null) {
            options.extentions.forEach(function (ext) {
                gl.addExtension(ext);
            });
        }
        if (type == "webgl2") {
            gl.beActiveInstance = true;
            gl.beActiveVao = true;
        }
        // canvas.addEventListener('webglcontextlost', function (e)
        // {
        //     console.log(e);
        // }, false);
        return gl;
    }
    function setGeometryAndProgramWithCached(gl, geometry, program) {
        setGeometryWithAdvanced(gl, geometry, program);
        setProgramWithCached(gl, program);
    }
    function drawBufferInfo(gl, geometry, instanceCount) {
        if (geometry.indices != null) {
            if (instanceCount != null) {
                gl.drawElementsInstanced(geometry.primitiveType, geometry.count, geometry.indices.componentDataType, geometry.offset || 0, instanceCount);
            }
            else {
                gl.drawElements(geometry.primitiveType, geometry.count, geometry.indices.componentDataType, geometry.offset || 0);
            }
        }
        else {
            if (instanceCount != null) {
                gl.drawArraysInstanced(geometry.primitiveType, geometry.offset || 0, geometry.count, instanceCount);
            }
            else {
                gl.drawArrays(geometry.primitiveType, geometry.offset || 0, geometry.count);
            }
        }
    }
    function createGlBuffer(gl, target, viewData) {
        var buffer = gl.createBuffer();
        gl.bindBuffer(target, buffer);
        gl.bufferData(target, viewData, gl.STATIC_DRAW);
        return buffer;
    }

    // export interface IshaderOptions extends IprogramOptions {
    //     layer?: RenderLayerEnum;
    // }
    // export interface IshaderInfo extends IprogramInfo {
    //     layer: RenderLayerEnum;
    // }
    class GlRender {
        static init(canvas, options = {}) {
            this.context = setUpWebgl(canvas, options);
            this.canvas = canvas;
        }
        static get maxVertexAttribs() {
            if (this._maxVertexAttribs == null) {
                this.context.getParameter(this.context.MAX_VERTEX_ATTRIBS);
            }
            return this._maxVertexAttribs;
        }
        static get maxTexturesImageUnits() {
            if (this._maxTexturesImageUnits == null) {
                this.context.getParameter(this.context.MAX_TEXTURE_IMAGE_UNITS);
            }
            return this._maxTexturesImageUnits;
        }
        static setViewPort(viewport) {
            setViewPortWithCached(this.context, viewport[0] * this.canvas.width, viewport[1] * this.canvas.height, viewport[2] * this.canvas.width, viewport[3] * this.canvas.height);
        }
        static setClear(clearDepth, clearColor, clearStencil) {
            setClear(this.context, clearDepth, clearColor, clearStencil);
        }
        static setState() {
            throw new Error("Method not implemented.");
        }
        static createGeometry(op) {
            let info = createGeometryInfo(this.context, op);
            return info;
        }
        static createProgram(op) {
            op.states = op.states || {};
            let info = createProgramInfo(this.context, op);
            // info.layer = op.layer || RenderLayerEnum.Geometry;
            return info;
        }
        static createTextureFromImg(img, texop) {
            return createTextureFromImageSource(this.context, Object.assign({}, texop, { img: img }));
        }
        static createTextureFromViewData(viewData, width, height, texop) {
            return createTextureFromTypedArray(this.context, Object.assign({}, texop, { viewData: viewData, width: width, height: height }));
        }
        static setGeometryAndProgram(geometry, program) {
            setGeometryAndProgramWithCached(this.context, geometry, program);
        }
        static drawObject(geometry, program, uniforms, mapUniformDef, instancecount) {
            // setProgram(this.context, program);
            // setProgram(this.context,program);
            // setGeometry(this.context,geometry,program);
            setGeometryAndProgramWithCached(this.context, geometry, program);
            //set uniforms
            let uniformsDic = program.bassProgram.uniformsDic;
            for (const key in uniformsDic) {
                if (uniforms[key] != null) {
                    uniformsDic[key].setter(uniforms[key]);
                }
                else if (this.autoUniform && this.autoUniform.autoUniforms[key]) {
                    let value = this.autoUniform.autoUniforms[key]();
                    uniformsDic[key].setter(value);
                }
                else {
                    uniformsDic[key].setter(mapUniformDef && mapUniformDef[key].value);
                }
            }
            drawBufferInfo(this.context, geometry, instancecount);
        }
        static createBuffer(target, viewData) {
            return createGlBuffer(this.context, target, viewData);
        }
    }
    class GlBuffer {
        static fromViewData(target, data) {
            let newBuferr = new GlBuffer();
            newBuferr.buffer = GlRender.createBuffer(target, data);
            newBuferr.viewData = data;
            return newBuferr;
        }
    }
    class GlTextrue {
        static get WHITE() {
            if (this._white == null) {
                this._white = GlRender.createTextureFromViewData(new Uint8Array([255, 255, 255, 255]), 1, 1);
            }
            return this._white;
        }
        static get GIRD() {
            if (this._grid == null) {
                let width = 256;
                let height = 256;
                let data = new Uint8Array(width * width * 4);
                for (let y = 0; y < height; y++) {
                    for (let x = 0; x < width; x++) {
                        let seek = (y * width + x) * 4;
                        if ((x - width * 0.5) * (y - height * 0.5) > 0) {
                            data[seek] = 0;
                            data[seek + 1] = 0;
                            data[seek + 2] = 0;
                            data[seek + 3] = 255;
                        }
                        else {
                            data[seek] = 255;
                            data[seek + 1] = 0;
                            data[seek + 2] = 0;
                            data[seek + 3] = 255;
                        }
                    }
                }
                this._grid = GlRender.createTextureFromViewData(data, width, height);
            }
            return this._grid;
        }
    }

    /**
     * 渲染的层级(从小到大绘制)
     */
    var RenderLayerEnum;
    (function (RenderLayerEnum) {
        RenderLayerEnum[RenderLayerEnum["Background"] = 1000] = "Background";
        RenderLayerEnum[RenderLayerEnum["Geometry"] = 2000] = "Geometry";
        RenderLayerEnum[RenderLayerEnum["AlphaTest"] = 2450] = "AlphaTest";
        RenderLayerEnum[RenderLayerEnum["Transparent"] = 3000] = "Transparent";
        RenderLayerEnum[RenderLayerEnum["Overlay"] = 4000] = "Overlay";
    })(RenderLayerEnum || (RenderLayerEnum = {}));
    /**
     * 渲染mask枚举
     */
    var CullingMask;
    (function (CullingMask) {
        CullingMask[CullingMask["ui"] = 1] = "ui";
        CullingMask[CullingMask["default"] = 2] = "default";
        CullingMask[CullingMask["editor"] = 4] = "editor";
        CullingMask[CullingMask["model"] = 8] = "model";
        CullingMask[CullingMask["everything"] = 4294967295] = "everything";
        CullingMask[CullingMask["nothing"] = 0] = "nothing";
        CullingMask[CullingMask["modelbeforeui"] = 8] = "modelbeforeui";
    })(CullingMask || (CullingMask = {}));
    class EC {
        static NewComponent(compname) {
            let contr = EC.dic[compname];
            if (contr) {
                return new contr();
            }
            else {
                return null;
            }
        }
    }
    EC.dic = {};
    EC.RegComp = (constructor) => {
        let target = constructor.prototype;
        EC.dic[target.constructor.name] = target.constructor;
    };

    const EPSILON = 0.000001;
    function clamp(v, min = 0, max = 1) {
        if (v <= min)
            return min;
        else if (v >= max)
            return max;
        else
            return v;
    }
    // export function disposeAllRecyle() {
    //     color.disposeRecycledItems();
    //     mat2d.disposeRecycledItems();
    //     mat3.disposeRecycledItems();
    //     mat4.disposeRecycledItems();
    //     quat.disposeRecycledItems();
    //     vec2.disposeRecycledItems();
    //     vec3.disposeRecycledItems();
    //     vec4.disposeRecycledItems();
    // }

    class Vec3 extends Float32Array {
        constructor(x = 0, y = 0, z = 0) {
            super(3);
            this[0] = x;
            this[1] = y;
            this[2] = z;
        }
        get x() {
            return this[0];
        }
        set x(value) {
            this[0] = value;
        }
        get y() {
            return this[1];
        }
        set y(value) {
            this[1] = value;
        }
        get z() {
            return this[2];
        }
        set z(value) {
            this[2] = value;
        }
        static create(x = 0, y = 0, z = 0) {
            if (Vec3.Recycle && Vec3.Recycle.length > 0) {
                let item = Vec3.Recycle.pop();
                item[0] = x;
                item[1] = y;
                item[2] = z;
                return item;
            }
            else {
                // let item=new Float32Array(3);
                // item[0]=x;
                // item[1]=y;
                // item[2]=z;
                let item = new Vec3(x, y, z);
                return item;
            }
        }
        static clone(from) {
            if (Vec3.Recycle.length > 0) {
                let item = Vec3.Recycle.pop();
                Vec3.copy(from, item);
                return item;
            }
            else {
                //let item=new Float32Array(3);
                let item = new Vec3(from[0], from[1], from[2]);
                // item[0]=from[0];
                // item[1]=from[1];
                // item[2]=from[2];
                return item;
            }
        }
        static recycle(item) {
            Vec3.Recycle.push(item);
        }
        static disposeRecycledItems() {
            Vec3.Recycle.length = 0;
        }
        /**
         * Copy the values from one vec3 to another
         *
         * @param out the receiving vector
         * @param src the source vector
         * @returns out
         */
        static copy(from, out = Vec3.create()) {
            out[0] = from[0];
            out[1] = from[1];
            out[2] = from[2];
            return out;
        }
        /**
         * Adds two vec3's
         *
         * @param out the receiving vector
         * @param lhs the first operand
         * @param rhs the second operand
         * @returns out
         */
        static add(lhs, rhs, out = Vec3.create()) {
            out[0] = lhs[0] + rhs[0];
            out[1] = lhs[1] + rhs[1];
            out[2] = lhs[2] + rhs[2];
            return out;
        }
        static toZero(a) {
            a[0] = a[1] = a[2] = 0;
        }
        /**
         * Subtracts vector b from vector a
         *
         * @param out the receiving vector
         * @param lhs the first operand
         * @param rhs the second operand
         * @returns out
         */
        static subtract(lhs, rhs, out = Vec3.create()) {
            out[0] = lhs[0] - rhs[0];
            out[1] = lhs[1] - rhs[1];
            out[2] = lhs[2] - rhs[2];
            return out;
        }
        /**
         * Multiplies two vec3's
         *
         * @param out the receiving vector
         * @param a the first operand
         * @param b the second operand
         * @returns out
         */
        static multiply(a, b, out = Vec3.create()) {
            out[0] = a[0] * b[0];
            out[1] = a[1] * b[1];
            out[2] = a[2] * b[2];
            return out;
        }
        static center(a, b, out = Vec3.create()) {
            this.add(a, b, out);
            this.scale(out, 0.5, out);
            return out;
        }
        /**
         * Divides two vec3's
         *
         * @param out the receiving vector
         * @param a the first operand
         * @param b the second operand
         * @returns out
         */
        static divide(a, b, out = Vec3.create()) {
            out[0] = a[0] / b[0];
            out[1] = a[1] / b[1];
            out[2] = a[2] / b[2];
            return out;
        }
        /**
         * Math.ceil the components of a vec3
         *
         * @param {Vec3} out the receiving vector
         * @param {Vec3} a vector to ceil
         * @returns {Vec3} out
         */
        static ceil(out = Vec3.create(), a) {
            out[0] = Math.ceil(a[0]);
            out[1] = Math.ceil(a[1]);
            out[2] = Math.ceil(a[2]);
            return out;
        }
        /**
         * Math.floor the components of a vec3
         *
         * @param {Vec3} out the receiving vector
         * @param {Vec3} a vector to floor
         * @returns {Vec3} out
         */
        static floor(out = Vec3.create(), a) {
            out[0] = Math.floor(a[0]);
            out[1] = Math.floor(a[1]);
            out[2] = Math.floor(a[2]);
            return out;
        }
        /**
         * Returns the minimum of two vec3's
         *
         * @param out the receiving vector
         * @param a the first operand
         * @param b the second operand
         * @returns out
         */
        static min(a, b, out = Vec3.create()) {
            out[0] = Math.min(a[0], b[0]);
            out[1] = Math.min(a[1], b[1]);
            out[2] = Math.min(a[2], b[2]);
            return out;
        }
        /**
         * Returns the maximum of two vec3's
         *
         * @param out the receiving vector
         * @param a the first operand
         * @param b the second operand
         * @returns out
         */
        static max(out = Vec3.create(), a, b) {
            out[0] = Math.max(a[0], b[0]);
            out[1] = Math.max(a[1], b[1]);
            out[2] = Math.max(a[2], b[2]);
            return out;
        }
        /**
         * Math.round the components of a vec3
         *
         * @param {Vec3} out the receiving vector
         * @param {Vec3} a vector to round
         * @returns {Vec3} out
         */
        static round(out = Vec3.create(), a) {
            out[0] = Math.round(a[0]);
            out[1] = Math.round(a[1]);
            out[2] = Math.round(a[2]);
            return out;
        }
        /**
         * Scales a vec3 by a scalar number
         *
         * @param out the receiving vector
         * @param a the vector to scale
         * @param b amount to scale the vector by
         * @returns out
         */
        static scale(a, b, out = Vec3.create()) {
            out[0] = a[0] * b;
            out[1] = a[1] * b;
            out[2] = a[2] * b;
            return out;
        }
        /**
         * Adds two vec3's after scaling the second operand by a scalar value
         *
         * @param out the receiving vector
         * @param lhs the first operand
         * @param rhs the second operand
         * @param scale the amount to scale b by before adding
         * @returns out
         */
        static AddscaledVec(lhs, rhs, scale, out = Vec3.create()) {
            out[0] = lhs[0] + rhs[0] * scale;
            out[1] = lhs[1] + rhs[1] * scale;
            out[2] = lhs[2] + rhs[2] * scale;
            return out;
        }
        /**
         * Calculates the euclidian distance between two vec3's
         *
         * @param a the first operand
         * @param b the second operand
         * @returns distance between a and b
         */
        static distance(a, b) {
            let x = b[0] - a[0];
            let y = b[1] - a[1];
            let z = b[2] - a[2];
            return Math.sqrt(x * x + y * y + z * z);
        }
        /**
         * Calculates the squared euclidian distance between two vec3's
         *
         * @param a the first operand
         * @param b the second operand
         * @returns squared distance between a and b
         */
        static squaredDistance(a, b) {
            let x = b[0] - a[0];
            let y = b[1] - a[1];
            let z = b[2] - a[2];
            return x * x + y * y + z * z;
        }
        /**
         * Calculates the length of a vec3
         *
         * @param a vector to calculate length of
         * @returns length of a
         */
        static magnitude(a) {
            let x = a[0];
            let y = a[1];
            let z = a[2];
            return Math.sqrt(x * x + y * y + z * z);
        }
        /**
         * Calculates the squared length of a vec3
         *
         * @param a vector to calculate squared length of
         * @returns squared length of a
         */
        static squaredLength(a) {
            let x = a[0];
            let y = a[1];
            let z = a[2];
            return x * x + y * y + z * z;
        }
        /**
         * Negates the components of a vec3
         *
         * @param out the receiving vector
         * @param a vector to negate
         * @returns out
         */
        static negate(a, out = Vec3.create()) {
            out[0] = -a[0];
            out[1] = -a[1];
            out[2] = -a[2];
            return out;
        }
        /**
         * Returns the inverse of the components of a vec3
         *
         * @param out the receiving vector
         * @param a vector to invert
         * @returns out
         */
        static inverse(a, out = Vec3.create()) {
            out[0] = 1.0 / a[0];
            out[1] = 1.0 / a[1];
            out[2] = 1.0 / a[2];
            return out;
        }
        /**
         * Normalize a vec3
         *
         * @param out the receiving vector
         * @param src vector to normalize
         * @returns out
         */
        static normalize(src, out = Vec3.create()) {
            let x = src[0];
            let y = src[1];
            let z = src[2];
            let len = x * x + y * y + z * z;
            if (len > 0) {
                //TODO: evaluate use of glm_invsqrt here?
                len = 1 / Math.sqrt(len);
                out[0] = src[0] * len;
                out[1] = src[1] * len;
                out[2] = src[2] * len;
            }
            return out;
        }
        /**
         * Calculates the dot product of two vec3's
         *
         * @param a the first operand
         * @param b the second operand
         * @returns dot product of a and b
         */
        static dot(a, b) {
            return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
        }
        /**
         * Computes the cross product of two vec3's
         *
         * @param out the receiving vector
         * @param lhs the first operand
         * @param rhs the second operand
         * @returns out
         */
        static cross(lhs, rhs, out = Vec3.create()) {
            let ax = lhs[0], ay = lhs[1], az = lhs[2];
            let bx = rhs[0], by = rhs[1], bz = rhs[2];
            out[0] = ay * bz - az * by;
            out[1] = az * bx - ax * bz;
            out[2] = ax * by - ay * bx;
            return out;
        }
        /**
         * Performs a linear interpolation between two vec3's
         *
         * @param out the receiving vector
         * @param lhs the first operand
         * @param rhs the second operand
         * @param lerp interpolation amount between the two inputs
         * @returns out
         */
        static lerp(lhs, rhs, lerp$$1, out = Vec3.create()) {
            let ax = lhs[0];
            let ay = lhs[1];
            let az = lhs[2];
            out[0] = ax + lerp$$1 * (rhs[0] - ax);
            out[1] = ay + lerp$$1 * (rhs[1] - ay);
            out[2] = az + lerp$$1 * (rhs[2] - az);
            return out;
        }
        /**
         * Performs a hermite interpolation with two control points
         *
         * @param {Vec3} out the receiving vector
         * @param {Vec3} a the first operand
         * @param {Vec3} b the second operand
         * @param {Vec3} c the third operand
         * @param {Vec3} d the fourth operand
         * @param {number} t interpolation amount between the two inputs
         * @returns {Vec3} out
         */
        static hermite(a, b, c, d, t, out = Vec3.create()) {
            let factorTimes2 = t * t;
            let factor1 = factorTimes2 * (2 * t - 3) + 1;
            let factor2 = factorTimes2 * (t - 2) + t;
            let factor3 = factorTimes2 * (t - 1);
            let factor4 = factorTimes2 * (3 - 2 * t);
            out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
            out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
            out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
            return out;
        }
        /**
         * Performs a bezier interpolation with two control points
         *
         * @param {Vec3} out the receiving vector
         * @param {Vec3} a the first operand
         * @param {Vec3} b the second operand
         * @param {Vec3} c the third operand
         * @param {Vec3} d the fourth operand
         * @param {number} t interpolation amount between the two inputs
         * @returns {Vec3} out
         */
        static bezier(a, b, c, d, t, out = Vec3.create()) {
            let inverseFactor = 1 - t;
            let inverseFactorTimesTwo = inverseFactor * inverseFactor;
            let factorTimes2 = t * t;
            let factor1 = inverseFactorTimesTwo * inverseFactor;
            let factor2 = 3 * t * inverseFactorTimesTwo;
            let factor3 = 3 * factorTimes2 * inverseFactor;
            let factor4 = factorTimes2 * t;
            out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
            out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
            out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
            return out;
        }
        /**
         * Generates a random vector with the given scale
         *
         * @param out the receiving vector
         * @param [scale] Length of the resulting vector. If omitted, a unit vector will be returned
         * @returns out
         */
        static random(scale = 1, out = Vec3.create()) {
            scale = scale || 1.0;
            let r = Math.random() * 2.0 * Math.PI;
            let z = Math.random() * 2.0 - 1.0;
            let zScale = Math.sqrt(1.0 - z * z) * scale;
            out[0] = Math.cos(r) * zScale;
            out[1] = Math.sin(r) * zScale;
            out[2] = z * scale;
            return out;
        }
        // /**
        //  * Transforms the vec3 with a mat3.
        //  *
        //  * @param out the receiving vector
        //  * @param a the vector to transform
        //  * @param m the 3x3 matrix to transform with
        //  * @returns out
        //  */
        // public static transformMat3(out: Vec3 = Vec3.create(), a: vec3, m: mat3): vec3{
        //     let x = a[0],
        //     y = a[1],
        //     z = a[2];
        // out[0] = x * m[0] + y * m[3] + z * m[6];
        // out[1] = x * m[1] + y * m[4] + z * m[7];
        // out[2] = x * m[2] + y * m[5] + z * m[8];
        // return out;
        // }
        // /**
        //  * 转到mat4中
        //  * Transforms the vec3 with a mat4.
        //  * 4th vector component is implicitly '1'
        //  *
        //  * @param out the receiving vector
        //  * @param a the vector to transform
        //  * @param m matrix to transform with
        //  * @returns out
        //  */
        // public static transformMat4(out: Vec3 = Vec3.create(), a: vec3, m: mat4): vec3{
        //     let x = a[0],
        //         y = a[1],
        //         z = a[2];
        //     let w = m[3] * x + m[7] * y + m[11] * z + m[15];
        //     w = w || 1.0;
        //     out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
        //     out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
        //     out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
        //     return out;
        // }
        /**
         * Transforms the vec3 with a Quat
         *
         * @param out the receiving vector
         * @param a the vector to transform
         * @param q Quaternion to transform with
         * @returns out
         */
        static transformQuat(a, q, out = Vec3.create()) {
            // benchmarks: http://jsperf.com/Quaternion-transform-vec3-implementations
            let x = a[0], y = a[1], z = a[2];
            let qx = q[0], qy = q[1], qz = q[2], qw = q[3];
            // calculate Quat * vec
            let ix = qw * x + qy * z - qz * y;
            let iy = qw * y + qz * x - qx * z;
            let iz = qw * z + qx * y - qy * x;
            let iw = -qx * x - qy * y - qz * z;
            // calculate result * inverse Quat
            out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
            out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
            out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
            return out;
        }
        /**
         * Rotate a 3D vector around the x-axis
         * @param out The receiving vec3
         * @param a The vec3 point to rotate
         * @param b The origin of the rotation
         * @param c The angle of rotation
         * @returns out
         */
        static rotateX(a, b, c, out = Vec3.create()) {
            let p = [], r = [];
            //Translate point to the origin
            p[0] = a[0] - b[0];
            p[1] = a[1] - b[1];
            p[2] = a[2] - b[2];
            //perform rotation
            r[0] = p[0];
            r[1] = p[1] * Math.cos(c) - p[2] * Math.sin(c);
            r[2] = p[1] * Math.sin(c) + p[2] * Math.cos(c);
            //translate to correct position
            out[0] = r[0] + b[0];
            out[1] = r[1] + b[1];
            out[2] = r[2] + b[2];
            return out;
        }
        /**
         * Rotate a 3D vector around the y-axis
         * @param out The receiving vec3
         * @param a The vec3 point to rotate
         * @param b The origin of the rotation
         * @param c The angle of rotation
         * @returns out
         */
        static rotateY(a, b, c, out = Vec3.create()) {
            let p = [], r = [];
            //Translate point to the origin
            p[0] = a[0] - b[0];
            p[1] = a[1] - b[1];
            p[2] = a[2] - b[2];
            //perform rotation
            r[0] = p[2] * Math.sin(c) + p[0] * Math.cos(c);
            r[1] = p[1];
            r[2] = p[2] * Math.cos(c) - p[0] * Math.sin(c);
            //translate to correct position
            out[0] = r[0] + b[0];
            out[1] = r[1] + b[1];
            out[2] = r[2] + b[2];
            return out;
        }
        /**
         * Rotate a 3D vector around the z-axis
         * @param out The receiving vec3
         * @param a The vec3 point to rotate
         * @param b The origin of the rotation
         * @param c The angle of rotation
         * @returns out
         */
        static rotateZ(a, b, c, out = Vec3.create()) {
            let p = [], r = [];
            //Translate point to the origin
            p[0] = a[0] - b[0];
            p[1] = a[1] - b[1];
            p[2] = a[2] - b[2];
            //perform rotation
            r[0] = p[0] * Math.cos(c) - p[1] * Math.sin(c);
            r[1] = p[0] * Math.sin(c) + p[1] * Math.cos(c);
            r[2] = p[2];
            //translate to correct position
            out[0] = r[0] + b[0];
            out[1] = r[1] + b[1];
            out[2] = r[2] + b[2];
            return out;
        }
        // /**
        //  * Perform some operation over an array of vec3s.
        //  *
        //  * @param a the array of vectors to iterate over
        //  * @param stride Number of elements between the start of each vec3. If 0 assumes tightly packed
        //  * @param offset Number of elements to skip at the beginning of the array
        //  * @param count Number of vec3s to iterate over. If 0 iterates over entire array
        //  * @param fn Function to call for each vector in the array
        //  * @param arg additional argument to pass to fn
        //  * @returns a
        //  * @function
        //  */
        // public static forEach(a: Float32Array, stride: number, offset: number, count: number,
        //                       fn: (a: vec3, b: vec3, arg: any) => void, arg: any): Float32Array;
        // /**
        //  * Perform some operation over an array of vec3s.
        //  *
        //  * @param a the array of vectors to iterate over
        //  * @param stride Number of elements between the start of each vec3. If 0 assumes tightly packed
        //  * @param offset Number of elements to skip at the beginning of the array
        //  * @param count Number of vec3s to iterate over. If 0 iterates over entire array
        //  * @param fn Function to call for each vector in the array
        //  * @returns a
        //  * @function
        //  */
        // public static forEach(a: Float32Array, stride: number, offset: number, count: number,
        //                       fn: (a: vec3, b: vec3) => void): Float32Array;
        /**
         * Get the angle between two 3D vectors
         * @param a The first operand
         * @param b The second operand
         * @returns The angle in radians
         */
        static angle(a, b) {
            let tempA = Vec3.clone(a);
            let tempB = Vec3.clone(b);
            // let tempA = vec3.fromValues(a[0], a[1], a[2]);
            // let tempB = vec3.fromValues(b[0], b[1], b[2]);
            Vec3.normalize(tempA, tempA);
            Vec3.normalize(tempB, tempB);
            let cosine = Vec3.dot(tempA, tempB);
            if (cosine > 1.0) {
                return 0;
            }
            else if (cosine < -1.0) {
                return Math.PI;
            }
            else {
                return Math.acos(cosine);
            }
        }
        /**
         * Returns a string representation of a vector
         *
         * @param a vector to represent as a string
         * @returns string representation of the vector
         */
        static str(a) {
            return "vec3(" + a[0] + ", " + a[1] + ", " + a[2] + ")";
        }
        /**
         * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
         *
         * @param {Vec3} a The first vector.
         * @param {Vec3} b The second vector.
         * @returns {boolean} True if the vectors are equal, false otherwise.
         */
        static exactEquals(a, b) {
            return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
        }
        /**
         * Returns whether or not the vectors have approximately the same elements in the same position.
         *
         * @param {Vec3} a The first vector.
         * @param {Vec3} b The second vector.
         * @returns {boolean} True if the vectors are equal, false otherwise.
         */
        static equals(a, b) {
            let a0 = a[0], a1 = a[1], a2 = a[2];
            let b0 = b[0], b1 = b[1], b2 = b[2];
            return Math.abs(a0 - b0) <= EPSILON && Math.abs(a1 - b1) <= EPSILON && Math.abs(a2 - b2) <= EPSILON;
        }
    }
    Vec3.UP = Vec3.create(0, 1, 0);
    Vec3.DOWN = Vec3.create(0, -1, 0);
    Vec3.RIGHT = Vec3.create(1, 0, 0);
    Vec3.LEFT = Vec3.create(-1, 0, 0);
    Vec3.FORWARD = Vec3.create(0, 0, 1);
    Vec3.BACKWARD = Vec3.create(0, 0, -1);
    Vec3.ONE = Vec3.create(1, 1, 1);
    Vec3.ZERO = Vec3.create(0, 0, 0);
    Vec3.Recycle = [];

    class Mat4 extends Float32Array {
        static create() {
            if (Mat4.Recycle && Mat4.Recycle.length > 0) {
                let item = Mat4.Recycle.pop();
                Mat4.identity(item);
                return item;
            }
            else {
                let item = new Float32Array(16);
                item[0] = 1;
                item[5] = 1;
                item[10] = 1;
                item[15] = 1;
                return item;
            }
        }
        static fromArray(array) {
            if (array.length != 16)
                return null;
            return new Float32Array(array);
        }
        static clone(from) {
            if (Mat4.Recycle.length > 0) {
                let item = Mat4.Recycle.pop();
                Mat4.copy(from, item);
                return item;
            }
            else {
                let out = new Float32Array(16);
                out[0] = from[0];
                out[1] = from[1];
                out[2] = from[2];
                out[3] = from[3];
                out[4] = from[4];
                out[5] = from[5];
                out[6] = from[6];
                out[7] = from[7];
                out[8] = from[8];
                out[9] = from[9];
                out[10] = from[10];
                out[11] = from[11];
                out[12] = from[12];
                out[13] = from[13];
                out[14] = from[14];
                out[15] = from[15];
                return out;
            }
        }
        static recycle(item) {
            Mat4.Recycle.push(item);
        }
        static disposeRecycledItems() {
            Mat4.Recycle.length = 0;
        }
        // private  constructor()
        // {
        //     super(16);
        //     this[0] = 1;
        //     // this[1] = 0;
        //     // this[2] = 0;
        //     // this[3] = 0;
        //     // this[4] = 0;
        //     this[5] = 1;
        //     // this[6] = 0;
        //     // this[7] = 0;
        //     // this[8] = 0;
        //     // this[9] = 0;
        //     this[10] = 1;
        //     // this[11] = 0;
        //     // this[12] = 0;
        //     // this[13] = 0;
        //     // this[14] = 0;
        //     this[15] = 1;
        // }
        /**
         * Copy the values from one mat4 to another
         *
         * @param out the receiving matrix
         * @param src the source matrix
         * @returns out
         */
        static copy(src, out = Mat4.create()) {
            out[0] = src[0];
            out[1] = src[1];
            out[2] = src[2];
            out[3] = src[3];
            out[4] = src[4];
            out[5] = src[5];
            out[6] = src[6];
            out[7] = src[7];
            out[8] = src[8];
            out[9] = src[9];
            out[10] = src[10];
            out[11] = src[11];
            out[12] = src[12];
            out[13] = src[13];
            out[14] = src[14];
            out[15] = src[15];
            return out;
        }
        /**
         * Set a mat4 to the identity matrix
         *
         * @param out the receiving matrix
         * @returns out
         */
        static identity(out = Mat4.create()) {
            out[0] = 1;
            out[1] = 0;
            out[2] = 0;
            out[3] = 0;
            out[4] = 0;
            out[5] = 1;
            out[6] = 0;
            out[7] = 0;
            out[8] = 0;
            out[9] = 0;
            out[10] = 1;
            out[11] = 0;
            out[12] = 0;
            out[13] = 0;
            out[14] = 0;
            out[15] = 1;
            return out;
        }
        /**
         * Transpose the values of a mat4
         *
         * @param out the receiving matrix
         * @param a the source matrix
         * @returns out
         */
        static transpose(a, out = Mat4.create()) {
            // If we are transposing ourselves we can skip a few steps but have to cache some values
            if (out === a) {
                let a01 = a[1], a02 = a[2], a03 = a[3];
                let a12 = a[6], a13 = a[7];
                let a23 = a[11];
                out[1] = a[4];
                out[2] = a[8];
                out[3] = a[12];
                out[4] = a01;
                out[6] = a[9];
                out[7] = a[13];
                out[8] = a02;
                out[9] = a12;
                out[11] = a[14];
                out[12] = a03;
                out[13] = a13;
                out[14] = a23;
            }
            else {
                out[0] = a[0];
                out[1] = a[4];
                out[2] = a[8];
                out[3] = a[12];
                out[4] = a[1];
                out[5] = a[5];
                out[6] = a[9];
                out[7] = a[13];
                out[8] = a[2];
                out[9] = a[6];
                out[10] = a[10];
                out[11] = a[14];
                out[12] = a[3];
                out[13] = a[7];
                out[14] = a[11];
                out[15] = a[15];
            }
            return out;
        }
        /**
         * Inverts a mat4
         *
         * @param out the receiving matrix
         * @param a the source matrix
         * @returns out
         */
        static invert(a, out = Mat4.create()) {
            let a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
            let a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
            let a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
            let a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
            let b00 = a00 * a11 - a01 * a10;
            let b01 = a00 * a12 - a02 * a10;
            let b02 = a00 * a13 - a03 * a10;
            let b03 = a01 * a12 - a02 * a11;
            let b04 = a01 * a13 - a03 * a11;
            let b05 = a02 * a13 - a03 * a12;
            let b06 = a20 * a31 - a21 * a30;
            let b07 = a20 * a32 - a22 * a30;
            let b08 = a20 * a33 - a23 * a30;
            let b09 = a21 * a32 - a22 * a31;
            let b10 = a21 * a33 - a23 * a31;
            let b11 = a22 * a33 - a23 * a32;
            // Calculate the determinant
            let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
            if (!det) {
                return null;
            }
            det = 1.0 / det;
            out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
            out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
            out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
            out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
            out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
            out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
            out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
            out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
            out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
            out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
            out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
            out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
            out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
            out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
            out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
            out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
            return out;
        }
        /**
         * Calculates the adjugate of a mat4
         *
         * @param out the receiving matrix
         * @param a the source matrix
         * @returns out
         */
        static adjoint(a, out = Mat4.create()) {
            let a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
            let a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
            let a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
            let a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
            out[0] = a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22);
            out[1] = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
            out[2] = a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12);
            out[3] = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
            out[4] = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
            out[5] = a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22);
            out[6] = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
            out[7] = a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12);
            out[8] = a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21);
            out[9] = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
            out[10] = a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11);
            out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
            out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
            out[13] = a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21);
            out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
            out[15] = a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11);
            return out;
        }
        /**
         * Calculates the determinant of a mat4
         *
         * @param a the source matrix
         * @returns determinant of a
         */
        static determinant(a) {
            let a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
            let a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
            let a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
            let a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
            let b00 = a00 * a11 - a01 * a10;
            let b01 = a00 * a12 - a02 * a10;
            let b02 = a00 * a13 - a03 * a10;
            let b03 = a01 * a12 - a02 * a11;
            let b04 = a01 * a13 - a03 * a11;
            let b05 = a02 * a13 - a03 * a12;
            let b06 = a20 * a31 - a21 * a30;
            let b07 = a20 * a32 - a22 * a30;
            let b08 = a20 * a33 - a23 * a30;
            let b09 = a21 * a32 - a22 * a31;
            let b10 = a21 * a33 - a23 * a31;
            let b11 = a22 * a33 - a23 * a32;
            // Calculate the determinant
            return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
        }
        /**
         * Multiplies two mat4's
         *
         * @param out the receiving matrix
         * @param lhs the first operand
         * @param rhs the second operand
         * @returns out
         */
        static multiply(lhs, rhs, out = Mat4.create()) {
            let a00 = lhs[0], a01 = lhs[1], a02 = lhs[2], a03 = lhs[3];
            let a10 = lhs[4], a11 = lhs[5], a12 = lhs[6], a13 = lhs[7];
            let a20 = lhs[8], a21 = lhs[9], a22 = lhs[10], a23 = lhs[11];
            let a30 = lhs[12], a31 = lhs[13], a32 = lhs[14], a33 = lhs[15];
            // Cache only the current line of the second matrix
            let b0 = rhs[0], b1 = rhs[1], b2 = rhs[2], b3 = rhs[3];
            out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
            out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
            out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
            out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
            b0 = rhs[4];
            b1 = rhs[5];
            b2 = rhs[6];
            b3 = rhs[7];
            out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
            out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
            out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
            out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
            b0 = rhs[8];
            b1 = rhs[9];
            b2 = rhs[10];
            b3 = rhs[11];
            out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
            out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
            out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
            out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
            b0 = rhs[12];
            b1 = rhs[13];
            b2 = rhs[14];
            b3 = rhs[15];
            out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
            out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
            out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
            out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
            return out;
        }
        /**
         * Translate a mat4 by the given vector
         *
         * @param out the receiving matrix
         * @param a the matrix to translate
         * @param v vector to translate by
         * @returns out
         */
        static translate(a, v, out = Mat4.create()) {
            let x = v[0], y = v[1], z = v[2];
            let a00 = void 0, a01 = void 0, a02 = void 0, a03 = void 0;
            let a10 = void 0, a11 = void 0, a12 = void 0, a13 = void 0;
            let a20 = void 0, a21 = void 0, a22 = void 0, a23 = void 0;
            if (a === out) {
                out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
                out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
                out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
                out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
            }
            else {
                a00 = a[0];
                a01 = a[1];
                a02 = a[2];
                a03 = a[3];
                a10 = a[4];
                a11 = a[5];
                a12 = a[6];
                a13 = a[7];
                a20 = a[8];
                a21 = a[9];
                a22 = a[10];
                a23 = a[11];
                out[0] = a00;
                out[1] = a01;
                out[2] = a02;
                out[3] = a03;
                out[4] = a10;
                out[5] = a11;
                out[6] = a12;
                out[7] = a13;
                out[8] = a20;
                out[9] = a21;
                out[10] = a22;
                out[11] = a23;
                out[12] = a00 * x + a10 * y + a20 * z + a[12];
                out[13] = a01 * x + a11 * y + a21 * z + a[13];
                out[14] = a02 * x + a12 * y + a22 * z + a[14];
                out[15] = a03 * x + a13 * y + a23 * z + a[15];
            }
            return out;
        }
        /**
         * Scales the mat4 by the dimensions in the given Vec3
         *
         * @param out the receiving matrix
         * @param a the matrix to scale
         * @param v the Vec3 to scale the matrix by
         * @returns out
         **/
        static scale(a, v, out = Mat4.create()) {
            let x = v[0], y = v[1], z = v[2];
            out[0] = a[0] * x;
            out[1] = a[1] * x;
            out[2] = a[2] * x;
            out[3] = a[3] * x;
            out[4] = a[4] * y;
            out[5] = a[5] * y;
            out[6] = a[6] * y;
            out[7] = a[7] * y;
            out[8] = a[8] * z;
            out[9] = a[9] * z;
            out[10] = a[10] * z;
            out[11] = a[11] * z;
            out[12] = a[12];
            out[13] = a[13];
            out[14] = a[14];
            out[15] = a[15];
            return out;
        }
        /**
         * Rotates a mat4 by the given angle
         *
         * @param out the receiving matrix
         * @param a the matrix to rotate
         * @param rad the angle to rotate the matrix by
         * @param axis the axis to rotate around
         * @returns out
         */
        static rotate(a, rad, axis, out = Mat4.create()) {
            let x = axis[0], y = axis[1], z = axis[2];
            let len = Math.sqrt(x * x + y * y + z * z);
            let s = void 0, c = void 0, t = void 0;
            let a00 = void 0, a01 = void 0, a02 = void 0, a03 = void 0;
            let a10 = void 0, a11 = void 0, a12 = void 0, a13 = void 0;
            let a20 = void 0, a21 = void 0, a22 = void 0, a23 = void 0;
            let b00 = void 0, b01 = void 0, b02 = void 0;
            let b10 = void 0, b11 = void 0, b12 = void 0;
            let b20 = void 0, b21 = void 0, b22 = void 0;
            if (Math.abs(len) < 0.000001) {
                return null;
            }
            len = 1 / len;
            x *= len;
            y *= len;
            z *= len;
            s = Math.sin(rad);
            c = Math.cos(rad);
            t = 1 - c;
            a00 = a[0];
            a01 = a[1];
            a02 = a[2];
            a03 = a[3];
            a10 = a[4];
            a11 = a[5];
            a12 = a[6];
            a13 = a[7];
            a20 = a[8];
            a21 = a[9];
            a22 = a[10];
            a23 = a[11];
            // Construct the elements of the rotation matrix
            b00 = x * x * t + c;
            b01 = y * x * t + z * s;
            b02 = z * x * t - y * s;
            b10 = x * y * t - z * s;
            b11 = y * y * t + c;
            b12 = z * y * t + x * s;
            b20 = x * z * t + y * s;
            b21 = y * z * t - x * s;
            b22 = z * z * t + c;
            // Perform rotation-specific matrix multiplication
            out[0] = a00 * b00 + a10 * b01 + a20 * b02;
            out[1] = a01 * b00 + a11 * b01 + a21 * b02;
            out[2] = a02 * b00 + a12 * b01 + a22 * b02;
            out[3] = a03 * b00 + a13 * b01 + a23 * b02;
            out[4] = a00 * b10 + a10 * b11 + a20 * b12;
            out[5] = a01 * b10 + a11 * b11 + a21 * b12;
            out[6] = a02 * b10 + a12 * b11 + a22 * b12;
            out[7] = a03 * b10 + a13 * b11 + a23 * b12;
            out[8] = a00 * b20 + a10 * b21 + a20 * b22;
            out[9] = a01 * b20 + a11 * b21 + a21 * b22;
            out[10] = a02 * b20 + a12 * b21 + a22 * b22;
            out[11] = a03 * b20 + a13 * b21 + a23 * b22;
            if (a !== out) {
                // If the source and destination differ, copy the unchanged last row
                out[12] = a[12];
                out[13] = a[13];
                out[14] = a[14];
                out[15] = a[15];
            }
            return out;
        }
        /**
         * Rotates a matrix by the given angle around the X axis
         *
         * @param out the receiving matrix
         * @param a the matrix to rotate
         * @param rad the angle to rotate the matrix by
         * @returns out
         */
        static rotateX(a, rad, out = Mat4.create()) {
            let s = Math.sin(rad);
            let c = Math.cos(rad);
            let a10 = a[4];
            let a11 = a[5];
            let a12 = a[6];
            let a13 = a[7];
            let a20 = a[8];
            let a21 = a[9];
            let a22 = a[10];
            let a23 = a[11];
            if (a !== out) {
                // If the source and destination differ, copy the unchanged rows
                out[0] = a[0];
                out[1] = a[1];
                out[2] = a[2];
                out[3] = a[3];
                out[12] = a[12];
                out[13] = a[13];
                out[14] = a[14];
                out[15] = a[15];
            }
            // Perform axis-specific matrix multiplication
            out[4] = a10 * c + a20 * s;
            out[5] = a11 * c + a21 * s;
            out[6] = a12 * c + a22 * s;
            out[7] = a13 * c + a23 * s;
            out[8] = a20 * c - a10 * s;
            out[9] = a21 * c - a11 * s;
            out[10] = a22 * c - a12 * s;
            out[11] = a23 * c - a13 * s;
            return out;
        }
        /**
         * Rotates a matrix by the given angle around the Y axis
         *
         * @param out the receiving matrix
         * @param a the matrix to rotate
         * @param rad the angle to rotate the matrix by
         * @returns out
         */
        static rotateY(a, rad, out = Mat4.create()) {
            let s = Math.sin(rad);
            let c = Math.cos(rad);
            let a00 = a[0];
            let a01 = a[1];
            let a02 = a[2];
            let a03 = a[3];
            let a20 = a[8];
            let a21 = a[9];
            let a22 = a[10];
            let a23 = a[11];
            if (a !== out) {
                // If the source and destination differ, copy the unchanged rows
                out[4] = a[4];
                out[5] = a[5];
                out[6] = a[6];
                out[7] = a[7];
                out[12] = a[12];
                out[13] = a[13];
                out[14] = a[14];
                out[15] = a[15];
            }
            // Perform axis-specific matrix multiplication
            out[0] = a00 * c - a20 * s;
            out[1] = a01 * c - a21 * s;
            out[2] = a02 * c - a22 * s;
            out[3] = a03 * c - a23 * s;
            out[8] = a00 * s + a20 * c;
            out[9] = a01 * s + a21 * c;
            out[10] = a02 * s + a22 * c;
            out[11] = a03 * s + a23 * c;
            return out;
        }
        /**
         * Rotates a matrix by the given angle around the Z axis
         *
         * @param out the receiving matrix
         * @param a the matrix to rotate
         * @param rad the angle to rotate the matrix by
         * @returns out
         */
        static rotateZ(a, rad, out = Mat4.create()) {
            let s = Math.sin(rad);
            let c = Math.cos(rad);
            let a00 = a[0];
            let a01 = a[1];
            let a02 = a[2];
            let a03 = a[3];
            let a10 = a[4];
            let a11 = a[5];
            let a12 = a[6];
            let a13 = a[7];
            if (a !== out) {
                // If the source and destination differ, copy the unchanged last row
                out[8] = a[8];
                out[9] = a[9];
                out[10] = a[10];
                out[11] = a[11];
                out[12] = a[12];
                out[13] = a[13];
                out[14] = a[14];
                out[15] = a[15];
            }
            // Perform axis-specific matrix multiplication
            out[0] = a00 * c + a10 * s;
            out[1] = a01 * c + a11 * s;
            out[2] = a02 * c + a12 * s;
            out[3] = a03 * c + a13 * s;
            out[4] = a10 * c - a00 * s;
            out[5] = a11 * c - a01 * s;
            out[6] = a12 * c - a02 * s;
            out[7] = a13 * c - a03 * s;
            return out;
        }
        /**
         * Creates a matrix from a vector translation
         * This is equivalent to (but much faster than):
         *
         *     mat4.identity(dest);
         *     mat4.translate(dest, dest, vec);
         *
         * @param {Mat4} out mat4 receiving operation result
         * @param {Vec3} v Translation vector
         * @returns {Mat4} out
         */
        static fromTranslation(v, out = Mat4.create()) {
            out[0] = 1;
            out[1] = 0;
            out[2] = 0;
            out[3] = 0;
            out[4] = 0;
            out[5] = 1;
            out[6] = 0;
            out[7] = 0;
            out[8] = 0;
            out[9] = 0;
            out[10] = 1;
            out[11] = 0;
            out[12] = v[0];
            out[13] = v[1];
            out[14] = v[2];
            out[15] = 1;
            return out;
        }
        /**
         * Creates a matrix from a vector scaling
         * This is equivalent to (but much faster than):
         *
         *     mat4.identity(dest);
         *     mat4.scale(dest, dest, vec);
         *
         * @param {Mat4} out mat4 receiving operation result
         * @param {Vec3} v Scaling vector
         * @returns {Mat4} out
         */
        static fromScaling(v, out = Mat4.create()) {
            out[0] = v[0];
            out[1] = 0;
            out[2] = 0;
            out[3] = 0;
            out[4] = 0;
            out[5] = v[1];
            out[6] = 0;
            out[7] = 0;
            out[8] = 0;
            out[9] = 0;
            out[10] = v[2];
            out[11] = 0;
            out[12] = 0;
            out[13] = 0;
            out[14] = 0;
            out[15] = 1;
            return out;
        }
        /**
         * Creates a matrix from a given angle around a given axis
         * This is equivalent to (but much faster than):
         *
         *     mat4.identity(dest);
         *     mat4.rotate(dest, dest, rad, axis);
         *
         * @param {Mat4} out mat4 receiving operation result
         * @param {number} rad the angle to rotate the matrix by
         * @param {Vec3} axis the axis to rotate around
         * @returns {Mat4} out
         */
        static fromRotation(rad, axis, out = Mat4.create()) {
            let x = axis[0], y = axis[1], z = axis[2];
            let len = Math.sqrt(x * x + y * y + z * z);
            let s = void 0, c = void 0, t = void 0;
            if (Math.abs(len) < 0.000001) {
                return null;
            }
            len = 1 / len;
            x *= len;
            y *= len;
            z *= len;
            s = Math.sin(rad);
            c = Math.cos(rad);
            t = 1 - c;
            // Perform rotation-specific matrix multiplication
            out[0] = x * x * t + c;
            out[1] = y * x * t + z * s;
            out[2] = z * x * t - y * s;
            out[3] = 0;
            out[4] = x * y * t - z * s;
            out[5] = y * y * t + c;
            out[6] = z * y * t + x * s;
            out[7] = 0;
            out[8] = x * z * t + y * s;
            out[9] = y * z * t - x * s;
            out[10] = z * z * t + c;
            out[11] = 0;
            out[12] = 0;
            out[13] = 0;
            out[14] = 0;
            out[15] = 1;
            return out;
        }
        /**
         * Creates a matrix from the given angle around the X axis
         * This is equivalent to (but much faster than):
         *
         *     mat4.identity(dest);
         *     mat4.rotateX(dest, dest, rad);
         *
         * @param {Mat4} out mat4 receiving operation result
         * @param {number} rad the angle to rotate the matrix by
         * @returns {Mat4} out
         */
        static fromXRotation(rad, out = Mat4.create()) {
            let s = Math.sin(rad);
            let c = Math.cos(rad);
            // Perform axis-specific matrix multiplication
            out[0] = 1;
            out[1] = 0;
            out[2] = 0;
            out[3] = 0;
            out[4] = 0;
            out[5] = c;
            out[6] = s;
            out[7] = 0;
            out[8] = 0;
            out[9] = -s;
            out[10] = c;
            out[11] = 0;
            out[12] = 0;
            out[13] = 0;
            out[14] = 0;
            out[15] = 1;
            return out;
        }
        /**
         * Creates a matrix from the given angle around the Y axis
         * This is equivalent to (but much faster than):
         *
         *     mat4.identity(dest);
         *     mat4.rotateY(dest, dest, rad);
         *
         * @param {Mat4} out mat4 receiving operation result
         * @param {number} rad the angle to rotate the matrix by
         * @returns {Mat4} out
         */
        static fromYRotation(rad, out = Mat4.create()) {
            let s = Math.sin(rad);
            let c = Math.cos(rad);
            // Perform axis-specific matrix multiplication
            out[0] = c;
            out[1] = 0;
            out[2] = -s;
            out[3] = 0;
            out[4] = 0;
            out[5] = 1;
            out[6] = 0;
            out[7] = 0;
            out[8] = s;
            out[9] = 0;
            out[10] = c;
            out[11] = 0;
            out[12] = 0;
            out[13] = 0;
            out[14] = 0;
            out[15] = 1;
            return out;
        }
        /**
         * Creates a matrix from the given angle around the Z axis
         * This is equivalent to (but much faster than):
         *
         *     mat4.identity(dest);
         *     mat4.rotateZ(dest, dest, rad);
         *
         * @param {Mat4} out mat4 receiving operation result
         * @param {number} rad the angle to rotate the matrix by
         * @returns {Mat4} out
         */
        static fromZRotation(rad, out = Mat4.create()) {
            let s = Math.sin(rad);
            let c = Math.cos(rad);
            // Perform axis-specific matrix multiplication
            out[0] = c;
            out[1] = s;
            out[2] = 0;
            out[3] = 0;
            out[4] = -s;
            out[5] = c;
            out[6] = 0;
            out[7] = 0;
            out[8] = 0;
            out[9] = 0;
            out[10] = 1;
            out[11] = 0;
            out[12] = 0;
            out[13] = 0;
            out[14] = 0;
            out[15] = 1;
            return out;
        }
        /**
         * Returns the translation vector component of a transformation
         *  matrix. If a matrix is built with fromRotationTranslation,
         *  the returned vector will be the same as the translation vector
         *  originally supplied.
         * @param  {Vec3} out Vector to receive translation component
         * @param  {Mat4} mat Matrix to be decomposed (input)
         * @return {Vec3} out
         */
        static getTranslationing(mat, out) {
            out[0] = mat[12];
            out[1] = mat[13];
            out[2] = mat[14];
            return out;
        }
        /**
         * Returns the scaling factor component of a transformation matrix.
         * If a matrix is built with fromRotationTranslationScale with a
         * normalized Quaternion parameter, the returned vector will be
         * the same as the scaling vector originally supplied.
         * @param {Vec3} out Vector to receive scaling factor component
         * @param {Mat4} mat Matrix to be decomposed (input)
         * @return {Vec3} out
         */
        static getScaling(mat, out) {
            let m11 = mat[0];
            let m12 = mat[1];
            let m13 = mat[2];
            let m21 = mat[4];
            let m22 = mat[5];
            let m23 = mat[6];
            let m31 = mat[8];
            let m32 = mat[9];
            let m33 = mat[10];
            out[0] = Math.sqrt(m11 * m11 + m12 * m12 + m13 * m13);
            out[1] = Math.sqrt(m21 * m21 + m22 * m22 + m23 * m23);
            out[2] = Math.sqrt(m31 * m31 + m32 * m32 + m33 * m33);
            return out;
        }
        /**
         * Returns a Quaternion representing the rotational component
         *  of a transformation matrix. If a matrix is built with
         *  fromRotationTranslation, the returned Quaternion will be the
         *  same as the Quaternion originally supplied.
         * @param {Quat} out Quaternion to receive the rotation component
         * @param {Mat4} mat Matrix to be decomposed (input)
         * @return {Quat} out
         */
        static getRotation(mat, out) {
            // Algorithm taken from http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm
            let trace = mat[0] + mat[5] + mat[10];
            let S = 0;
            if (trace > 0) {
                S = Math.sqrt(trace + 1.0) * 2;
                out[3] = 0.25 * S;
                out[0] = (mat[6] - mat[9]) / S;
                out[1] = (mat[8] - mat[2]) / S;
                out[2] = (mat[1] - mat[4]) / S;
            }
            else if (mat[0] > mat[5] && mat[0] > mat[10]) {
                S = Math.sqrt(1.0 + mat[0] - mat[5] - mat[10]) * 2;
                out[3] = (mat[6] - mat[9]) / S;
                out[0] = 0.25 * S;
                out[1] = (mat[1] + mat[4]) / S;
                out[2] = (mat[8] + mat[2]) / S;
            }
            else if (mat[5] > mat[10]) {
                S = Math.sqrt(1.0 + mat[5] - mat[0] - mat[10]) * 2;
                out[3] = (mat[8] - mat[2]) / S;
                out[0] = (mat[1] + mat[4]) / S;
                out[1] = 0.25 * S;
                out[2] = (mat[6] + mat[9]) / S;
            }
            else {
                S = Math.sqrt(1.0 + mat[10] - mat[0] - mat[5]) * 2;
                out[3] = (mat[1] - mat[4]) / S;
                out[0] = (mat[8] + mat[2]) / S;
                out[1] = (mat[6] + mat[9]) / S;
                out[2] = 0.25 * S;
            }
            return out;
        }
        /**
         * Creates a matrix from a Quaternion rotation, vector translation and vector scale, rotating and scaling around the given origin
         * This is equivalent to (but much faster than):
         *
         *     mat4.identity(dest);
         *     mat4.translate(dest, vec);
         *     mat4.translate(dest, origin);
         *     let QuatMat = mat4.create();
         *     Quat4.toMat4(Quat, QuatMat);
         *     mat4.multiply(dest, QuatMat);
         *     mat4.scale(dest, scale)
         *     mat4.translate(dest, negativeOrigin);
         *
         * @param {Mat4} out mat4 receiving operation result
         * @param {Quat} q Rotation Quaternion
         * @param {Vec3} v Translation vector
         * @param {Vec3} s Scaling vector
         * @param {Vec3} o The origin vector around which to scale and rotate
         * @returns {Mat4} out
         */
        static fromRotationTranslationScaleOrigin(q, v, s, o, out = Mat4.create()) {
            // Quaternion math
            let x = q[0], y = q[1], z = q[2], w = q[3];
            let x2 = x + x;
            let y2 = y + y;
            let z2 = z + z;
            let xx = x * x2;
            let xy = x * y2;
            let xz = x * z2;
            let yy = y * y2;
            let yz = y * z2;
            let zz = z * z2;
            let wx = w * x2;
            let wy = w * y2;
            let wz = w * z2;
            let sx = s[0];
            let sy = s[1];
            let sz = s[2];
            let ox = o[0];
            let oy = o[1];
            let oz = o[2];
            out[0] = (1 - (yy + zz)) * sx;
            out[1] = (xy + wz) * sx;
            out[2] = (xz - wy) * sx;
            out[3] = 0;
            out[4] = (xy - wz) * sy;
            out[5] = (1 - (xx + zz)) * sy;
            out[6] = (yz + wx) * sy;
            out[7] = 0;
            out[8] = (xz + wy) * sz;
            out[9] = (yz - wx) * sz;
            out[10] = (1 - (xx + yy)) * sz;
            out[11] = 0;
            out[12] = v[0] + ox - (out[0] * ox + out[4] * oy + out[8] * oz);
            out[13] = v[1] + oy - (out[1] * ox + out[5] * oy + out[9] * oz);
            out[14] = v[2] + oz - (out[2] * ox + out[6] * oy + out[10] * oz);
            out[15] = 1;
            return out;
        }
        /**
         * Calculates a 4x4 matrix from the given Quaternion
         *
         * @param {Mat4} out mat4 receiving operation result
         * @param {Quat} q Quaternion to create matrix from
         *
         * @returns {Mat4} out
         */
        static fromQuat(q, out = Mat4.create()) {
            let x = q[0], y = q[1], z = q[2], w = q[3];
            let x2 = x + x;
            let y2 = y + y;
            let z2 = z + z;
            let xx = x * x2;
            let yx = y * x2;
            let yy = y * y2;
            let zx = z * x2;
            let zy = z * y2;
            let zz = z * z2;
            let wx = w * x2;
            let wy = w * y2;
            let wz = w * z2;
            out[0] = 1 - yy - zz;
            out[1] = yx + wz;
            out[2] = zx - wy;
            out[3] = 0;
            out[4] = yx - wz;
            out[5] = 1 - xx - zz;
            out[6] = zy + wx;
            out[7] = 0;
            out[8] = zx + wy;
            out[9] = zy - wx;
            out[10] = 1 - xx - yy;
            out[11] = 0;
            out[12] = 0;
            out[13] = 0;
            out[14] = 0;
            out[15] = 1;
            return out;
        }
        /**
         * Generates a frustum matrix with the given bounds
         *
         * @param out mat4 frustum matrix will be written into
         * @param left Left bound of the frustum
         * @param right Right bound of the frustum
         * @param bottom Bottom bound of the frustum
         * @param top Top bound of the frustum
         * @param near Near bound of the frustum
         * @param far Far bound of the frustum
         * @returns out
         */
        static frustum(left, right, bottom, top, near, far, out = Mat4.create()) {
            let rl = 1 / (right - left);
            let tb = 1 / (top - bottom);
            let nf = 1 / (near - far);
            out[0] = near * 2 * rl;
            out[1] = 0;
            out[2] = 0;
            out[3] = 0;
            out[4] = 0;
            out[5] = near * 2 * tb;
            out[6] = 0;
            out[7] = 0;
            out[8] = (right + left) * rl;
            out[9] = (top + bottom) * tb;
            out[10] = (far + near) * nf;
            out[11] = -1;
            out[12] = 0;
            out[13] = 0;
            out[14] = far * near * 2 * nf;
            out[15] = 0;
            return out;
        }
        /**
         * Generates a look-at matrix with the given eye position, focal point, and up axis
         *
         * @param out mat4 frustum matrix will be written into
         * @param eye Position of the viewer
         * @param center Point the viewer is looking at
         * @param up Vec3 pointing up
         * @returns out
         */
        static lookAt(eye, center, up, out = Mat4.create()) {
            let x0 = void 0, x1 = void 0, x2 = void 0, y0 = void 0, y1 = void 0, y2 = void 0, z0 = void 0, z1 = void 0, z2 = void 0, len = void 0;
            let eyex = eye[0];
            let eyey = eye[1];
            let eyez = eye[2];
            let upx = up[0];
            let upy = up[1];
            let upz = up[2];
            let centerx = center[0];
            let centery = center[1];
            let centerz = center[2];
            if (Math.abs(eyex - centerx) < 0.000001 &&
                Math.abs(eyey - centery) < 0.000001 &&
                Math.abs(eyez - centerz) < 0.000001) {
                return Mat4.identity(out);
            }
            z0 = eyex - centerx;
            z1 = eyey - centery;
            z2 = eyez - centerz;
            len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
            z0 *= len;
            z1 *= len;
            z2 *= len;
            x0 = upy * z2 - upz * z1;
            x1 = upz * z0 - upx * z2;
            x2 = upx * z1 - upy * z0;
            len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
            if (!len) {
                x0 = 0;
                x1 = 0;
                x2 = 0;
            }
            else {
                len = 1 / len;
                x0 *= len;
                x1 *= len;
                x2 *= len;
            }
            y0 = z1 * x2 - z2 * x1;
            y1 = z2 * x0 - z0 * x2;
            y2 = z0 * x1 - z1 * x0;
            len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
            if (!len) {
                y0 = 0;
                y1 = 0;
                y2 = 0;
            }
            else {
                len = 1 / len;
                y0 *= len;
                y1 *= len;
                y2 *= len;
            }
            out[0] = x0;
            out[1] = y0;
            out[2] = z0;
            out[3] = 0;
            out[4] = x1;
            out[5] = y1;
            out[6] = z1;
            out[7] = 0;
            out[8] = x2;
            out[9] = y2;
            out[10] = z2;
            out[11] = 0;
            out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
            out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
            out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
            out[15] = 1;
            return out;
        }
        /**
         * Generates a matrix that makes something look at something else.
         *
         * @param {Mat4} out mat4 frustum matrix will be written into
         * @param {Vec3} eye Position of the viewer
         * @param {Vec3} center Point the viewer is looking at
         * @param {Vec3} up Vec3 pointing up
         * @returns {Mat4} out
         */
        static targetTo(eye, target, up, out) {
            let eyex = eye[0], eyey = eye[1], eyez = eye[2], upx = up[0], upy = up[1], upz = up[2];
            let z0 = eyex - target[0], z1 = eyey - target[1], z2 = eyez - target[2];
            let len = z0 * z0 + z1 * z1 + z2 * z2;
            if (len > 0) {
                len = 1 / Math.sqrt(len);
                z0 *= len;
                z1 *= len;
                z2 *= len;
            }
            let x0 = upy * z2 - upz * z1, x1 = upz * z0 - upx * z2, x2 = upx * z1 - upy * z0;
            out[0] = x0;
            out[1] = x1;
            out[2] = x2;
            out[3] = 0;
            out[4] = z1 * x2 - z2 * x1;
            out[5] = z2 * x0 - z0 * x2;
            out[6] = z0 * x1 - z1 * x0;
            out[7] = 0;
            out[8] = z0;
            out[9] = z1;
            out[10] = z2;
            out[11] = 0;
            out[12] = eyex;
            out[13] = eyey;
            out[14] = eyez;
            out[15] = 1;
            return out;
        }
        /**
         * Returns a string representation of a mat4
         *
         * @param mat matrix to represent as a string
         * @returns string representation of the matrix
         */
        static str(a) {
            return ("mat4(" +
                a[0] +
                ", " +
                a[1] +
                ", " +
                a[2] +
                ", " +
                a[3] +
                ", " +
                a[4] +
                ", " +
                a[5] +
                ", " +
                a[6] +
                ", " +
                a[7] +
                ", " +
                a[8] +
                ", " +
                a[9] +
                ", " +
                a[10] +
                ", " +
                a[11] +
                ", " +
                a[12] +
                ", " +
                a[13] +
                ", " +
                a[14] +
                ", " +
                a[15] +
                ")");
        }
        /**
         * Returns Frobenius norm of a mat4
         *
         * @param a the matrix to calculate Frobenius norm of
         * @returns Frobenius norm
         */
        static frob(a) {
            return Math.sqrt(Math.pow(a[0], 2) +
                Math.pow(a[1], 2) +
                Math.pow(a[2], 2) +
                Math.pow(a[3], 2) +
                Math.pow(a[4], 2) +
                Math.pow(a[5], 2) +
                Math.pow(a[6], 2) +
                Math.pow(a[7], 2) +
                Math.pow(a[8], 2) +
                Math.pow(a[9], 2) +
                Math.pow(a[10], 2) +
                Math.pow(a[11], 2) +
                Math.pow(a[12], 2) +
                Math.pow(a[13], 2) +
                Math.pow(a[14], 2) +
                Math.pow(a[15], 2));
        }
        /**
         * Adds two mat4's
         *
         * @param {Mat4} out the receiving matrix
         * @param {Mat4} a the first operand
         * @param {Mat4} b the second operand
         * @returns {Mat4} out
         */
        static add(a, b, out = Mat4.create()) {
            out[0] = a[0] + b[0];
            out[1] = a[1] + b[1];
            out[2] = a[2] + b[2];
            out[3] = a[3] + b[3];
            out[4] = a[4] + b[4];
            out[5] = a[5] + b[5];
            out[6] = a[6] + b[6];
            out[7] = a[7] + b[7];
            out[8] = a[8] + b[8];
            out[9] = a[9] + b[9];
            out[10] = a[10] + b[10];
            out[11] = a[11] + b[11];
            out[12] = a[12] + b[12];
            out[13] = a[13] + b[13];
            out[14] = a[14] + b[14];
            out[15] = a[15] + b[15];
            return out;
        }
        /**
         * Subtracts matrix b from matrix a
         *
         * @param {Mat4} out the receiving matrix
         * @param {Mat4} lhs the first operand
         * @param {Mat4} rhs the second operand
         * @returns {Mat4} out
         */
        static subtract(lhs, rhs, out = Mat4.create()) {
            out[0] = lhs[0] - rhs[0];
            out[1] = lhs[1] - rhs[1];
            out[2] = lhs[2] - rhs[2];
            out[3] = lhs[3] - rhs[3];
            out[4] = lhs[4] - rhs[4];
            out[5] = lhs[5] - rhs[5];
            out[6] = lhs[6] - rhs[6];
            out[7] = lhs[7] - rhs[7];
            out[8] = lhs[8] - rhs[8];
            out[9] = lhs[9] - rhs[9];
            out[10] = lhs[10] - rhs[10];
            out[11] = lhs[11] - rhs[11];
            out[12] = lhs[12] - rhs[12];
            out[13] = lhs[13] - rhs[13];
            out[14] = lhs[14] - rhs[14];
            out[15] = lhs[15] - rhs[15];
            return out;
        }
        /**
         * Subtracts matrix b from matrix a
         *
         * @param {Mat4} out the receiving matrix
         * @param {Mat4} a the first operand
         * @param {Mat4} b the second operand
         * @returns {Mat4} out
         */
        //public static sub(out: Mat4=Mat4.create(), a: mat4, b: mat4): mat4;
        /**
         * Multiply each element of the matrix by a scalar.
         *
         * @param {Mat4} out the receiving matrix
         * @param {Mat4} a the matrix to scale
         * @param {number} b amount to scale the matrix's elements by
         * @returns {Mat4} out
         */
        static multiplyScalar(a, b, out = Mat4.create()) {
            out[0] = a[0] * b;
            out[1] = a[1] * b;
            out[2] = a[2] * b;
            out[3] = a[3] * b;
            out[4] = a[4] * b;
            out[5] = a[5] * b;
            out[6] = a[6] * b;
            out[7] = a[7] * b;
            out[8] = a[8] * b;
            out[9] = a[9] * b;
            out[10] = a[10] * b;
            out[11] = a[11] * b;
            out[12] = a[12] * b;
            out[13] = a[13] * b;
            out[14] = a[14] * b;
            out[15] = a[15] * b;
            return out;
        }
        /**
         * Adds two mat4's after multiplying each element of the second operand by a scalar value.
         *
         * @param {Mat4} out the receiving vector
         * @param {Mat4} a the first operand
         * @param {Mat4} b the second operand
         * @param {number} scale the amount to scale b's elements by before adding
         * @returns {Mat4} out
         */
        static multiplyScalarAndAdd(a, b, scale, out = Mat4.create()) {
            out[0] = a[0] + b[0] * scale;
            out[1] = a[1] + b[1] * scale;
            out[2] = a[2] + b[2] * scale;
            out[3] = a[3] + b[3] * scale;
            out[4] = a[4] + b[4] * scale;
            out[5] = a[5] + b[5] * scale;
            out[6] = a[6] + b[6] * scale;
            out[7] = a[7] + b[7] * scale;
            out[8] = a[8] + b[8] * scale;
            out[9] = a[9] + b[9] * scale;
            out[10] = a[10] + b[10] * scale;
            out[11] = a[11] + b[11] * scale;
            out[12] = a[12] + b[12] * scale;
            out[13] = a[13] + b[13] * scale;
            out[14] = a[14] + b[14] * scale;
            out[15] = a[15] + b[15] * scale;
            return out;
        }
        /**
         * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
         *
         * @param {Mat4} a The first matrix.
         * @param {Mat4} b The second matrix.
         * @returns {boolean} True if the matrices are equal, false otherwise.
         */
        static exactEquals(a, b) {
            return (a[0] === b[0] &&
                a[1] === b[1] &&
                a[2] === b[2] &&
                a[3] === b[3] &&
                a[4] === b[4] &&
                a[5] === b[5] &&
                a[6] === b[6] &&
                a[7] === b[7] &&
                a[8] === b[8] &&
                a[9] === b[9] &&
                a[10] === b[10] &&
                a[11] === b[11] &&
                a[12] === b[12] &&
                a[13] === b[13] &&
                a[14] === b[14] &&
                a[15] === b[15]);
        }
        /**
         * Returns whether or not the matrices have approximately the same elements in the same position.
         *
         * @param {Mat4} a The first matrix.
         * @param {Mat4} b The second matrix.
         * @returns {boolean} True if the matrices are equal, false otherwise.
         */
        static equals(a, b) {
            let a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
            let a4 = a[4], a5 = a[5], a6 = a[6], a7 = a[7];
            let a8 = a[8], a9 = a[9], a10 = a[10], a11 = a[11];
            let a12 = a[12], a13 = a[13], a14 = a[14], a15 = a[15];
            let b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
            let b4 = b[4], b5 = b[5], b6 = b[6], b7 = b[7];
            let b8 = b[8], b9 = b[9], b10 = b[10], b11 = b[11];
            let b12 = b[12], b13 = b[13], b14 = b[14], b15 = b[15];
            return (Math.abs(a0 - b0) <= EPSILON &&
                Math.abs(a1 - b1) <= EPSILON &&
                Math.abs(a2 - b2) <= EPSILON &&
                Math.abs(a3 - b3) <= EPSILON &&
                Math.abs(a4 - b4) <= EPSILON &&
                Math.abs(a5 - b5) <= EPSILON &&
                Math.abs(a6 - b6) <= EPSILON &&
                Math.abs(a7 - b7) <= EPSILON &&
                Math.abs(a8 - b8) <= EPSILON &&
                Math.abs(a9 - b9) <= EPSILON &&
                Math.abs(a10 - b10) <= EPSILON &&
                Math.abs(a11 - b11) <= EPSILON &&
                Math.abs(a12 - b12) <= EPSILON &&
                Math.abs(a13 - b13) <= EPSILON &&
                Math.abs(a14 - b14) <= EPSILON &&
                Math.abs(a15 - b15) <= EPSILON);
        }
        /**
         * 变换顶点
         * Transforms the point with a mat4.
         * 4th vector component is implicitly '1'
         *
         * @param out the receiving vector
         * @param a the vector to transform
         * @param m matrix to transform with
         * @returns out
         */
        static transformPoint(vector, mat, out) {
            let x = vector[0], y = vector[1], z = vector[2];
            let w = mat[3] * x + mat[7] * y + mat[11] * z + mat[15];
            w = w || 1.0;
            out[0] = (mat[0] * x + mat[4] * y + mat[8] * z + mat[12]) / w;
            out[1] = (mat[1] * x + mat[5] * y + mat[9] * z + mat[13]) / w;
            out[2] = (mat[2] * x + mat[6] * y + mat[10] * z + mat[14]) / w;
            return out;
        }
        /**
         * 变换向量
         * Transforms the Vec3 with a mat4.
         * 4th vector component is implicitly '1'
         *
         * @param out the receiving vector
         * @param a the vector to transform
         * @param m matrix to transform with
         * @returns out
         */
        static transformVector3(vector, mat, out) {
            let x = vector[0], y = vector[1], z = vector[2];
            out[0] = mat[0] * x + mat[4] * y + mat[8] * z;
            out[1] = mat[1] * x + mat[5] * y + mat[9] * z;
            out[2] = mat[2] * x + mat[6] * y + mat[10] * z;
            return out;
        }
        // /**
        //  * Generates a perspective projection matrix with the given bounds
        //  *
        //  * @param out mat4 frustum matrix will be written into
        //  * @param fovy Vertical field of view in radians
        //  * @param aspect Aspect rat typically viewport width/height
        //  * @param near Near bound of the frustum
        //  * @param far Far bound of the frustum
        //  * @returns out
        //  */
        static projectPerspectiveLH(fovy, aspect, near, far, out = Mat4.create()) {
            let f = 1.0 / Math.tan(fovy / 2);
            let nf = 1 / (near - far);
            out[0] = f / aspect;
            out[1] = 0;
            out[2] = 0;
            out[3] = 0;
            out[4] = 0;
            out[5] = f;
            out[6] = 0;
            out[7] = 0;
            out[8] = 0;
            out[9] = 0;
            out[10] = (far + near) * nf;
            out[11] = -1;
            out[12] = 0;
            out[13] = 0;
            out[14] = 2 * far * near * nf;
            out[15] = 0;
            return out;
        }
        /**
         * Generates a perspective projection matrix with the given bounds
         * @param fov 上下夹角
         * @param aspect 左右夹角
         * @param znear 近视点距离
         * @param zfar 远视点距离
         * @returns {Mat4} out
         */
        // static project_PerspectiveLH(fov: number, aspect: number, znear: number, zfar: number, out: Mat4=Mat4.create())
        // {
        //     let tan = 1.0 / (Math.tan(fov * 0.5));
        //     let nf=zfar / (znear - zfar);
        //     out[0] = tan / aspect;
        //     out[1] = out[2] = out[3] =out[4]=0;
        //     out[5] = tan;
        //     out[6] = out[7] = out[8] = out[9]=0;
        //     out[10] = -nf;
        //     out[11] = 1.0;
        //     out[12] = out[13] = out[15] = 0.0;
        //     out[14] = znear * nf;
        // }
        // /**
        //  * Generates a orthogonal projection matrix with the given bounds
        //  *
        //  * @param out mat4 frustum matrix will be written into
        //  * @param left Left bound of the frustum
        //  * @param right Right bound of the frustum
        //  * @param bottom Bottom bound of the frustum
        //  * @param top Top bound of the frustum
        //  * @param near Near bound of the frustum
        //  * @param far Far bound of the frustum
        //  * @returns out
        //  */
        // public static ortho(out: Mat4=Mat4.create(), left: number, right: number,
        //     bottom: number, top: number, near: number, far: number): mat4{
        //         let lr = 1 / (left - right);
        //         let bt = 1 / (bottom - top);
        //         let nf = 1 / (near - far);
        //         out[0] = -2 * lr;
        //         out[1] = 0;
        //         out[2] = 0;
        //         out[3] = 0;
        //         out[4] = 0;
        //         out[5] = -2 * bt;
        //         out[6] = 0;
        //         out[7] = 0;
        //         out[8] = 0;
        //         out[9] = 0;
        //         out[10] = 2 * nf;
        //         out[11] = 0;
        //         out[12] = (left + right) * lr;
        //         out[13] = (top + bottom) * bt;
        //         out[14] = (far + near) * nf;
        //         out[15] = 1;
        //         return out;
        //       }
        static projectOrthoLH(width, height, near, far, out = Mat4.create()) {
            let lr = -1 / width;
            let bt = -1 / height;
            let nf = 1 / (near - far);
            out[0] = -2 * lr;
            out[1] = 0;
            out[2] = 0;
            out[3] = 0;
            out[4] = 0;
            out[5] = -2 * bt;
            out[6] = 0;
            out[7] = 0;
            out[8] = 0;
            out[9] = 0;
            out[10] = 2 * nf;
            out[11] = 0;
            out[12] = 0;
            out[13] = 0;
            out[14] = (far + near) * nf;
            out[15] = 1;
            return out;
        }
        /**
         * Generates a orthogonal projection matrix with the given bounds
         * @param width 宽
         * @param height 高
         * @param znear 近视点
         * @param zfar 远视点
         * @param out
         */
        // static project_OrthoLH(width: number, height: number, znear: number, zfar: number, out: Mat4=Mat4.create())
        // {
        //     let hw = 2.0 / width;
        //     let hh = 2.0 / height;
        //     let id = 1.0 / (zfar - znear);
        //     let nid = znear / (znear - zfar);
        //     out[0]=hw;
        //     out[5]=hh;
        //     out[10]=id;
        //     out[11]=nid;
        //     out[15]=1;
        //     out[1]=out[2]=out[3]=out[4]=out[6]=out[7]=out[8]=out[8]=out[12]=out[13]=out[14]=0;
        // }
        /** ----------copy glmatrix
         * Creates a matrix from a Quaternion rotation, vector translation and vector scale
         *  This is equivalent to (but much faster than):
         * mat4.identity(dest);
         * mat4.translate(dest, vec);
         * let QuatMat = mat4.create();
         * Quat4.toMat4(Quat, QuatMat);
         * mat4.multiply(dest, QuatMat);
         * mat4.scale(dest, scale)
         *
         * @param pos Translation vector
         * @param scale Scaling vector
         * @param rot Rotation Quaternion
         * @param out
         */
        static RTS(pos, scale, rot, out = Mat4.create()) {
            let x = rot[0], y = rot[1], z = rot[2], w = rot[3];
            let x2 = x + x;
            let y2 = y + y;
            let z2 = z + z;
            let xx = x * x2;
            let xy = x * y2;
            let xz = x * z2;
            let yy = y * y2;
            let yz = y * z2;
            let zz = z * z2;
            let wx = w * x2;
            let wy = w * y2;
            let wz = w * z2;
            let sx = scale[0];
            let sy = scale[1];
            let sz = scale[2];
            out[0] = (1 - (yy + zz)) * sx;
            out[1] = (xy + wz) * sx;
            out[2] = (xz - wy) * sx;
            out[3] = 0;
            out[4] = (xy - wz) * sy;
            out[5] = (1 - (xx + zz)) * sy;
            out[6] = (yz + wx) * sy;
            out[7] = 0;
            out[8] = (xz + wy) * sz;
            out[9] = (yz - wx) * sz;
            out[10] = (1 - (xx + yy)) * sz;
            out[11] = 0;
            out[12] = pos[0];
            out[13] = pos[1];
            out[14] = pos[2];
            out[15] = 1;
            return out;
        }
        /**----copy glmatrix
         * Creates a matrix from a Quaternion rotation and vector translation
         * This is equivalent to (but much faster than):
         *
         *     mat4.identity(dest);
         *     mat4.translate(dest, vec);
         *     let QuatMat = mat4.create();
         *     Quat4.toMat4(Quat, QuatMat);
         *     mat4.multiply(dest, QuatMat);
         *
         * @param out mat4 receiving operation result
         * @param q Rotation Quaternion
         * @param v Translation vector
         * @returns out
         */
        static RT(q, v, out = Mat4.create()) {
            // Quaternion math
            let x = q[0], y = q[1], z = q[2], w = q[3];
            let x2 = x + x;
            let y2 = y + y;
            let z2 = z + z;
            let xx = x * x2;
            let xy = x * y2;
            let xz = x * z2;
            let yy = y * y2;
            let yz = y * z2;
            let zz = z * z2;
            let wx = w * x2;
            let wy = w * y2;
            let wz = w * z2;
            out[0] = 1 - (yy + zz);
            out[1] = xy + wz;
            out[2] = xz - wy;
            out[3] = 0;
            out[4] = xy - wz;
            out[5] = 1 - (xx + zz);
            out[6] = yz + wx;
            out[7] = 0;
            out[8] = xz + wy;
            out[9] = yz - wx;
            out[10] = 1 - (xx + yy);
            out[11] = 0;
            out[12] = v[0];
            out[13] = v[1];
            out[14] = v[2];
            out[15] = 1;
            return out;
        }
        /**use glmatrix separate function
         * Returns the translation、scale、rotation  component  of a transformation
         *
         * @param src
         * @param scale
         * @param rotation
         * @param translation
         */
        static decompose(src, scale, rotation, translation) {
            Mat4.getTranslationing(src, translation);
            Mat4.getScaling(src, scale);
            Mat4.getRotationing(src, rotation, scale);
        }
        /**
         * get normalize Quaternion with the given rotation matrix values
         * @param matrix defines the source matrix
         * @param result defines the target Quaternion
         */
        static getRotationing(matrix, result, scale = null) {
            let scalex = 1, scaley = 1, scalez = 1;
            if (scale == null) {
                scalex = Math.sqrt(matrix[0] * matrix[0] + matrix[1] * matrix[1] + matrix[2] * matrix[2]);
                scaley = Math.sqrt(matrix[4] * matrix[4] + matrix[5] * matrix[5] + matrix[6] * matrix[6]);
                scalez = Math.sqrt(matrix[8] * matrix[8] + matrix[9] * matrix[9] + matrix[10] * matrix[10]);
            }
            else {
                scalex = scale[0];
                scaley = scale[1];
                scalez = scale[2];
            }
            if (scale.x === 0 || scale.y === 0 || scale.z === 0) {
                result[0] = 0;
                result[1] = 0;
                result[2] = 0;
                result[3] = 1;
                return;
            }
            // var data = matrix.m;
            let m11 = matrix[0] / scalex, m12 = matrix[4] / scaley, m13 = matrix[8] / scalez;
            let m21 = matrix[1] / scalex, m22 = matrix[5] / scaley, m23 = matrix[9] / scalez;
            let m31 = matrix[2] / scalex, m32 = matrix[6] / scaley, m33 = matrix[10] / scalez;
            let trace = m11 + m22 + m33;
            let s;
            if (trace > 0) {
                s = 0.5 / Math.sqrt(trace + 1.0);
                result[3] = 0.25 / s;
                result[0] = (m32 - m23) * s;
                result[1] = (m13 - m31) * s;
                result[2] = (m21 - m12) * s;
            }
            else if (m11 > m22 && m11 > m33) {
                s = 2.0 * Math.sqrt(1.0 + m11 - m22 - m33);
                result[3] = (m32 - m23) / s;
                result[0] = 0.25 * s;
                result[1] = (m12 + m21) / s;
                result[2] = (m13 + m31) / s;
            }
            else if (m22 > m33) {
                s = 2.0 * Math.sqrt(1.0 + m22 - m11 - m33);
                result[3] = (m13 - m31) / s;
                result[0] = (m12 + m21) / s;
                result[1] = 0.25 * s;
                result[2] = (m23 + m32) / s;
            }
            else {
                s = 2.0 * Math.sqrt(1.0 + m33 - m11 - m22);
                result[3] = (m21 - m12) / s;
                result[0] = (m13 + m31) / s;
                result[1] = (m23 + m32) / s;
                result[2] = 0.25 * s;
            }
        }
    }
    Mat4.Recycle = [];
    Mat4.Identity = Mat4.create();

    /**
     * @private
     */
    class RenderList {
        constructor(camera) {
            this.layerLists = {};
            this.layerLists[RenderLayerEnum.Background] = new RenderContainer("Background");
            this.layerLists[RenderLayerEnum.Geometry] = new RenderContainer("Geometry");
            this.layerLists[RenderLayerEnum.AlphaTest] = new RenderContainer("AlphaTest");
            this.layerLists[RenderLayerEnum.Transparent] = new RenderContainer("Transparent", (arr) => {
                arr.sort((a, b) => {
                    let aRenderQueue = a.material.layer + a.material.queue;
                    let bRenderQueue = b.material.layer + b.material.queue;
                    if (aRenderQueue != bRenderQueue) {
                        return aRenderQueue - bRenderQueue;
                    }
                    else {
                        let viewmat = camera.ViewMatrix;
                        let aWorldPos = Mat4.getTranslationing(a.modelMatrix, Vec3.create());
                        let bWorldPos = Mat4.getTranslationing(b.modelMatrix, Vec3.create());
                        let aView = Mat4.transformPoint(aWorldPos, viewmat, Vec3.create());
                        let bView = Mat4.transformPoint(bWorldPos, viewmat, Vec3.create());
                        let out = aView[2] - bView[2];
                        Vec3.recycle(aWorldPos);
                        Vec3.recycle(bWorldPos);
                        Vec3.recycle(aView);
                        Vec3.recycle(bView);
                        return out;
                    }
                });
                return arr;
            });
            this.layerLists[RenderLayerEnum.Overlay] = new RenderContainer("Overlay");
        }
        clear() {
            for (let key in this.layerLists) {
                this.layerLists[key].clear();
            }
        }
        addRenderer(renderer) {
            this.layerLists[renderer.material.layer].addRender(renderer);
        }
        sort() {
            for (const key in this.layerLists) {
                this.layerLists[key].sort();
            }
            return this;
        }
        foreach(func) {
            this.layerLists[RenderLayerEnum.Background].foreach(func);
            this.layerLists[RenderLayerEnum.Geometry].foreach(func);
            this.layerLists[RenderLayerEnum.AlphaTest].foreach(func);
            this.layerLists[RenderLayerEnum.Transparent].foreach(func);
            this.layerLists[RenderLayerEnum.Overlay].foreach(func);
        }
    }
    class RenderContainer {
        constructor(layerType, queueSortFunc = null) {
            this.renderArr = [];
            this.layer = layerType;
            this._queueSortFunc = queueSortFunc || RenderContainer.defaultSortFunc;
        }
        addRender(render) {
            this.renderArr.push(render);
        }
        sort() {
            this.renderArr = this._queueSortFunc(this.renderArr);
            return this;
        }
        foreach(fuc) {
            for (let i = 0; i < this.renderArr.length; i++) {
                fuc(this.renderArr[i]);
            }
        }
        clear() {
            this.renderArr.length = 0;
        }
    }
    RenderContainer.defaultSortFunc = (arr) => {
        arr.sort((a, b) => {
            let aRenderQueue = a.material.layer + a.material.queue;
            let bRenderQueue = b.material.layer + b.material.queue;
            if (aRenderQueue != bRenderQueue) {
                return aRenderQueue - bRenderQueue;
            }
            else {
                return a.material.guid - b.material.guid;
            }
        });
        return arr;
    };
    /**
     * 按照Geometry-》AlphaTest-》Background-》Transparent-》Overlay的顺序进行渲染
     * 非透明物体/透明物体都要按照queue排序
     * 非透明物体暂时没发现需要按照距离排序（近到远）
     * 透明物体按照距离排序（远到近）
     */

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    class Rect extends Float32Array {
        constructor(x = 0, y = 0, w = 0, h = 0) {
            super(4);
            this[0] = x;
            this[1] = y;
            this[2] = w;
            this[3] = h;
        }
        get x() {
            return this[0];
        }
        set x(value) {
            this[0] = value;
        }
        get y() {
            return this[1];
        }
        set y(value) {
            this[1] = value;
        }
        get z() {
            return this[2];
        }
        set z(value) {
            this[2] = value;
        }
        get width() {
            return this[2];
        }
        get height() {
            return this[3];
        }
        get w() {
            return this[3];
        }
        set w(value) {
            this[3] = value;
        }
        static create(x = 0, y = 0, w = 0, h = 0) {
            if (Rect.Recycle && Rect.Recycle.length > 0) {
                let item = Rect.Recycle.pop();
                item[0] = x;
                item[1] = y;
                item[2] = w;
                item[3] = h;
                return item;
            }
            else {
                let item = new Rect(x, y, w, h);
                return item;
            }
        }
        static clone(from) {
            if (Rect.Recycle.length > 0) {
                let item = Rect.Recycle.pop();
                Rect.copy(from, item);
                return item;
            }
            else {
                let item = new Rect(from[0], from[1], from[2], from[3]);
                return item;
            }
        }
        static recycle(item) {
            Rect.Recycle.push(item);
        }
        static disposeRecycledItems() {
            Rect.Recycle.length = 0;
        }
        static copy(a, out) {
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            out[3] = a[3];
            return out;
        }
        static euqal(a, b) {
            if (a[0] != b[0])
                return false;
            if (a[1] != b[1])
                return false;
            if (a[2] != b[2])
                return false;
            if (a[3] != b[3])
                return false;
            return true;
        }
    }
    Rect.Recycle = [];

    class Color extends Float32Array {
        constructor(r = 1, g, b = 1, a = 1) {
            super(4);
            this[0] = r;
            this[1] = g;
            this[2] = b;
            this[3] = a;
        }
        get r() {
            return this[0];
        }
        set r(value) {
            this[0] = value;
        }
        get g() {
            return this[1];
        }
        set g(value) {
            this[1] = value;
        }
        get b() {
            return this[2];
        }
        set b(value) {
            this[2] = value;
        }
        get a() {
            return this[3];
        }
        set a(value) {
            this[3] = value;
        }
        static create(r = 1, g = 1, b = 1, a = 1) {
            if (Color.Recycle && Color.Recycle.length > 0) {
                let item = Color.Recycle.pop();
                item[0] = r;
                item[1] = g;
                item[2] = b;
                item[3] = a;
                return item;
            }
            else {
                let item = new Color(r, g, b, a);
                return item;
            }
        }
        static clone(from) {
            if (Color.Recycle.length > 0) {
                let item = Color.Recycle.pop();
                Color.copy(from, item);
                return item;
            }
            else {
                let item = new Color(from[0], from[1], from[2], from[3]);
                return item;
            }
        }
        static recycle(item) {
            Color.Recycle.push(item);
        }
        static disposeRecycledItems() {
            Color.Recycle.length = 0;
        }
        static setWhite(out) {
            out[0] = 1;
            out[1] = 1;
            out[2] = 1;
            out[3] = 1;
            return out;
        }
        static setBlack(out) {
            out[0] = 0;
            out[1] = 0;
            out[2] = 0;
            out[3] = 1;
        }
        static setGray(out) {
            out[0] = 0.5;
            out[1] = 0.5;
            out[2] = 0.5;
            out[3] = 1;
        }
        static multiply(srca, srcb, out) {
            out[0] = srca[0] * srcb[0];
            out[1] = srca[1] * srcb[1];
            out[2] = srca[2] * srcb[2];
            out[3] = srca[3] * srcb[3];
        }
        static scaleToRef(src, scale, out) {
            out[0] = src[0] * scale;
            out[1] = src[1] * scale;
            out[2] = src[2] * scale;
            out[3] = src[3] * scale;
        }
        static lerp(srca, srcb, t, out) {
            t = clamp(t);
            out[0] = t * (srcb[0] - srca[0]) + srca[0];
            out[1] = t * (srcb[1] - srca[1]) + srca[1];
            out[2] = t * (srcb[2] - srca[2]) + srca[2];
            out[3] = t * (srcb[3] - srca[3]) + srca[3];
        }
        /**
         * Copy the values from one color to another
         *
         * @param out the receiving vector
         * @param a the source vector
         * @returns out
         */
        static copy(a, out) {
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            out[3] = a[3];
            return out;
        }
        /**
         * Returns whether or not the vectors have approximately the same elements in the same color.
         *
         * @param {vec4} a The first vector.
         * @param {vec4} b The second vector.
         * @returns {boolean} True if the vectors are equal, false otherwise.
         */
        static equals(a, b) {
            let a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
            let b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
            return (Math.abs(a0 - b0) <= EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
                Math.abs(a1 - b1) <= EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
                Math.abs(a2 - b2) <= EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) &&
                Math.abs(a3 - b3) <= EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3)));
        }
    }
    Color.WHITE = new Color(1, 1, 1, 1);
    Color.Recycle = [];

    /**
     *
     * (0,0)-----|
     * |         |
     * |         |
     * |------(w,h)
     *
     */
    class GameScreen {
        /**
         * 屏幕(canvas)高度
         */
        static get Height() {
            return this.canvasheight;
        }
        /**
         * 屏幕(canvas)宽度
         */
        static get Width() {
            return this.canvaswidth;
        }
        /**
         * width/height
         */
        static get aspect() {
            return this.apset;
        }
        // static divcontiner: HTMLDivElement;
        static init(canvas) {
            this.canvas = canvas;
            this.OnResizeCanvas();
            // canvas.onresize = () => {
            //     this.OnResizeCanvas();
            // };
        }
        static update() {
            if (this.canvasheight != this.canvas.height || this.canvaswidth != this.canvas.width) {
                this.OnResizeCanvas();
            }
        }
        static OnResizeCanvas() {
            console.warn("canvas resize!");
            this.canvaswidth = this.canvas.clientWidth;
            this.canvasheight = this.canvas.clientHeight;
            this.apset = this.canvaswidth / this.canvasheight;
            for (let i = 0; i < this.resizeListenerArr.length; i++) {
                let fuc = this.resizeListenerArr[i];
                fuc();
            }
        }
        static addListenertoCanvasResize(fuc) {
            this.resizeListenerArr.push(fuc);
        }
    }
    GameScreen.resizeListenerArr = [];

    class Plane {
        constructor() {
            //ax+by+cz+d=0;
            this.normal = Vec3.create(0, 1, 0);
            this.constant = 0;
        }
        distanceToPoint(point) {
            return Vec3.dot(point, this.normal) + this.constant;
        }
        copy(to) {
            Vec3.copy(this.normal, to.normal);
            to.constant = this.constant;
        }
        setComponents(nx, ny, nz, ds) {
            this.normal[0] = nx;
            this.normal[1] = ny;
            this.normal[2] = nz;
            let inverseNormalLength = 1.0 / Vec3.magnitude(this.normal);
            Vec3.scale(this.normal, inverseNormalLength, this.normal);
            this.constant = ds * inverseNormalLength;
        }
    }

    var VertexAttEnum;
    (function (VertexAttEnum) {
        VertexAttEnum["POSITION"] = "position";
        VertexAttEnum["NORMAL"] = "normal";
        VertexAttEnum["TANGENT"] = "tangent";
        VertexAttEnum["TEXCOORD_0"] = "uv";
        VertexAttEnum["TEXCOORD_1"] = "uv2";
        VertexAttEnum["COLOR_0"] = "color";
        VertexAttEnum["WEIGHTS_0"] = "skinWeight";
        VertexAttEnum["JOINTS_0"] = "skinIndex";
    })(VertexAttEnum || (VertexAttEnum = {}));

    class Bounds {
        constructor() {
            this.maxPoint = Vec3.create();
            this.minPoint = Vec3.create();
            // centerPoint: Vec3 = Vec3.create();
            this._center = Vec3.create();
        }
        get centerPoint() {
            Vec3.center(this.minPoint, this.maxPoint, this._center);
            return this._center;
        }
        setMaxPoint(pos) {
            Vec3.copy(pos, this.maxPoint);
        }
        setMinPoint(pos) {
            Vec3.copy(pos, this.minPoint);
        }
        setFromPoints(pos) {
            for (let key in pos) {
                Vec3.min(this.minPoint, pos[key], this.minPoint);
                Vec3.max(this.maxPoint, pos[key], this.maxPoint);
            }
            // Vec3.center(this.minPoint, this.maxPoint, this.centerPoint);
            return this;
        }
        setFromMesh(geometry) {
            let points = geometry.getAttArr(VertexAttEnum.POSITION);
            this.setFromPoints(points);
            return this;
        }
        addAABB(box) {
            Vec3.min(this.minPoint, box.minPoint, this.minPoint);
            Vec3.max(this.maxPoint, box.maxPoint, this.maxPoint);
            // Vec3.center(this.minPoint, this.maxPoint, this.centerPoint);
            return this;
        }
        beEmpty() {
            return (this.minPoint[0] > this.maxPoint[0] ||
                this.minPoint[1] > this.maxPoint[1] ||
                this.minPoint[2] > this.maxPoint[2]);
        }
        containPoint(point) {
            return (point[0] >= this.minPoint[0] &&
                point[0] <= this.maxPoint[0] &&
                point[1] >= this.minPoint[1] &&
                point[1] <= this.maxPoint[1] &&
                point[2] >= this.minPoint[2] &&
                point[2] <= this.maxPoint[2]);
        }
        intersect(box) {
            let interMin = box.minPoint;
            let interMax = box.maxPoint;
            if (this.minPoint[0] > interMax[0])
                return false;
            if (this.minPoint[1] > interMax[1])
                return false;
            if (this.minPoint[2] > interMax[2])
                return false;
            if (this.maxPoint[0] > interMin[0])
                return false;
            if (this.maxPoint[1] > interMin[1])
                return false;
            if (this.maxPoint[2] > interMin[2])
                return false;
            return true;
        }
        applyMatrix(mat) {
            if (this.beEmpty())
                return;
            let min = Vec3.create();
            let max = Vec3.create();
            min[0] += mat[12];
            max[0] += mat[12];
            min[1] += mat[13];
            max[1] += mat[13];
            min[2] += mat[14];
            max[2] += mat[14];
            for (let i = 0; i < 3; i++) {
                for (let k = 0; k < 3; k++) {
                    if (mat[k + i * 4] > 0) {
                        min[i] += mat[k + i * 4] * this.minPoint[i];
                        max[i] += mat[k + i * 4] * this.maxPoint[i];
                    }
                    else {
                        min[i] += mat[k + i * 4] * this.maxPoint[i];
                        max[i] += mat[k + i * 4] * this.minPoint[i];
                    }
                }
            }
            Vec3.recycle(this.minPoint);
            Vec3.recycle(this.maxPoint);
            this.minPoint = min;
            this.maxPoint = max;
        }
    }
    class BoundingSphere {
        constructor() {
            this.center = Vec3.create();
            this.radius = 0;
        }
        applyMatrix(mat) {
            Mat4.transformPoint(this.center, mat, this.center);
        }
        setFromPoints(points, center = null) {
            if (center != null) {
                Vec3.copy(center, this.center);
            }
            else {
                let center = new Bounds().setFromPoints(points).centerPoint;
                Vec3.copy(center, this.center);
            }
            for (let i = 0; i < points.length; i++) {
                let dis = Vec3.distance(points[i], this.center);
                if (dis > this.radius) {
                    this.radius = dis;
                }
            }
        }
        setFromGeometry(geometry, center = null) {
            let points = geometry.getAttArr(VertexAttEnum.POSITION);
            this.setFromPoints(points, center);
            return this;
        }
        copyTo(to) {
            Vec3.copy(this.center, to.center);
            to.radius = this.radius;
        }
        clone() {
            let newSphere = BoundingSphere.create();
            this.copyTo(newSphere);
            return newSphere;
        }
        static create() {
            if (this.pool.length > 0) {
                return this.pool.pop();
            }
            else {
                return new BoundingSphere();
            }
        }
        static recycle(item) {
            this.pool.push(item);
        }
    }
    BoundingSphere.pool = [];

    class Frustum {
        constructor(p0 = null, p1 = null, p2 = null, p3 = null, p4 = null, p5 = null) {
            this.planes = [];
            this.planes[0] = p0 != null ? p0 : new Plane();
            this.planes[1] = p1 != null ? p1 : new Plane();
            this.planes[2] = p2 != null ? p2 : new Plane();
            this.planes[3] = p3 != null ? p3 : new Plane();
            this.planes[4] = p4 != null ? p4 : new Plane();
            this.planes[5] = p5 != null ? p5 : new Plane();
        }
        set(p0, p1, p2, p3, p4, p5) {
            this.planes[0].copy(p0);
            this.planes[1].copy(p1);
            this.planes[2].copy(p2);
            this.planes[3].copy(p3);
            this.planes[4].copy(p4);
            this.planes[5].copy(p5);
        }
        setFromMatrix(me) {
            let planes = this.planes;
            let me0 = me[0], me1 = me[1], me2 = me[2], me3 = me[3];
            let me4 = me[4], me5 = me[5], me6 = me[6], me7 = me[7];
            let me8 = me[8], me9 = me[9], me10 = me[10], me11 = me[11];
            let me12 = me[12], me13 = me[13], me14 = me[14], me15 = me[15];
            planes[0].setComponents(me3 - me0, me7 - me4, me11 - me8, me15 - me12);
            planes[1].setComponents(me3 + me0, me7 + me4, me11 + me8, me15 + me12);
            planes[2].setComponents(me3 + me1, me7 + me5, me11 + me9, me15 + me13);
            planes[3].setComponents(me3 - me1, me7 - me5, me11 - me9, me15 - me13);
            planes[4].setComponents(me3 - me2, me7 - me6, me11 - me10, me15 - me14);
            planes[5].setComponents(me3 + me2, me7 + me6, me11 + me10, me15 + me14);
            return this;
        }
        intersectRender(render) {
            if (render.bouningSphere != null) {
                let sphere = render.bouningSphere.clone();
                sphere.applyMatrix(render.modelMatrix);
                let result = this.intersectSphere(sphere);
                return result;
            }
            else {
                return true;
            }
        }
        /**
         * 和包围球检测相交
         * @param sphere 包围球
         * @param mat 用于变换包围球
         */
        intersectSphere(sphere, mat = null) {
            let planes = this.planes;
            if (mat != null) {
                let clonesphere = sphere.clone();
                clonesphere.applyMatrix(mat);
                let center = clonesphere.center;
                let negRadius = -clonesphere.radius;
                for (let i = 0; i < 6; i++) {
                    let distance = planes[i].distanceToPoint(center);
                    if (distance < negRadius) {
                        return false;
                    }
                }
                BoundingSphere.recycle(sphere);
            }
            else {
                let center = sphere.center;
                let negRadius = -sphere.radius;
                for (let i = 0; i < 6; i++) {
                    let distance = planes[i].distanceToPoint(center);
                    if (distance < negRadius) {
                        return false;
                    }
                }
            }
            return true;
        }
    }

    var ProjectionEnum;
    (function (ProjectionEnum) {
        ProjectionEnum[ProjectionEnum["PERSPECTIVE"] = 0] = "PERSPECTIVE";
        ProjectionEnum[ProjectionEnum["ORTHOGRAPH"] = 1] = "ORTHOGRAPH";
    })(ProjectionEnum || (ProjectionEnum = {}));
    var ClearEnum;
    (function (ClearEnum) {
        ClearEnum[ClearEnum["COLOR"] = 1] = "COLOR";
        ClearEnum[ClearEnum["DEPTH"] = 2] = "DEPTH";
        ClearEnum[ClearEnum["STENCIL"] = 4] = "STENCIL";
    })(ClearEnum || (ClearEnum = {}));
    let Camera = class Camera {
        constructor() {
            this.projectionType = ProjectionEnum.PERSPECTIVE;
            //perspective 透视投影
            this.fov = Math.PI * 0.25; //透视投影的fov//verticle field of view
            /**
             * height
             */
            this.size = 2;
            this._near = 0.01;
            this._far = 1000;
            this.viewport = Rect.create(0, 0, 1, 1);
            this.clearFlag = ClearEnum.COLOR | ClearEnum.DEPTH;
            this.backgroundColor = Color.create(0.3, 0.3, 0.3, 1);
            this.dePthValue = 1.0;
            this.stencilValue = 0;
            this.priority = 0;
            this.cullingMask = CullingMask.default;
            this._viewMatrix = Mat4.create();
            /**
             * 计算相机投影矩阵
             */
            this._Projectmatrix = Mat4.create();
            // private ohMat:Mat4=Mat4.create();
            // getOrthoLH_ProjectMatrix():Mat4
            // {
            //     Mat4.project_OrthoLH(this.PixelHeight * GameScreen.aspect, this.PixelHeight, this.near, this.far, this.ohMat);
            //     return this.ohMat;
            // }
            this._viewProjectMatrix = Mat4.create();
            this.needComputeViewMat = true;
            this.needcomputeProjectMat = true;
            this.needcomputeViewProjectMat = true;
            this._frustum = new Frustum();
            this.beActiveFrustum = true;
        }
        get near() {
            return this._near;
        }
        set near(val) {
            if (this.projectionType == ProjectionEnum.PERSPECTIVE && val < 0.01) {
                val = 0.01;
            }
            if (val >= this.far)
                val = this.far - 0.01;
            this._near = val;
        }
        get far() {
            return this._far;
        }
        set far(val) {
            if (val <= this.near)
                val = this.near + 0.01;
            this._far = val;
        }
        update(frameState) {
            frameState.cameraList.push(this);
            this.restToDirty();
        }
        get ViewMatrix() {
            if (this.needComputeViewMat) {
                let camworld = this.entity.transform.worldMatrix;
                //视矩阵刚好是摄像机世界矩阵的逆
                Mat4.invert(camworld, this._viewMatrix);
                this.needComputeViewMat = false;
            }
            return this._viewMatrix;
        }
        get ProjectMatrix() {
            if (this.needcomputeProjectMat) {
                if (this.projectionType == ProjectionEnum.PERSPECTIVE) {
                    Mat4.projectPerspectiveLH(this.fov, GameScreen.aspect, this.near, this.far, this._Projectmatrix);
                }
                else {
                    Mat4.projectOrthoLH(this.size * GameScreen.aspect, this.size, this.near, this.far, this._Projectmatrix);
                }
                this.needcomputeProjectMat = false;
            }
            return this._Projectmatrix;
        }
        get ViewProjectMatrix() {
            if (this.needcomputeViewProjectMat) {
                Mat4.multiply(this.ProjectMatrix, this.ViewMatrix, this._viewProjectMatrix);
                this.needcomputeViewProjectMat = false;
            }
            return this._viewProjectMatrix;
        }
        restToDirty() {
            this.needComputeViewMat = true;
            this.needcomputeProjectMat = true;
            this.needcomputeViewProjectMat = true;
        }
        get frustum() {
            return this._frustum;
        }
        dispose() { }
    };
    Camera = __decorate([
        EC.RegComp
    ], Camera);

    class RenderContext {
        constructor() {
            this.activeTexCount = 0;
            this.viewPortPixel = new Rect(0, 0, 0, 0); //像素的viewport
            this._matrixNormalToworld = Mat4.create();
            this._matrixMV = Mat4.create();
            this._matMVP = Mat4.create();
            //matrixNormal: matrix = new matrix();
            //最多8灯，再多不管
            this.intLightCount = 0;
            this.vec4LightPos = new Float32Array(32);
            this.vec4LightDir = new Float32Array(32);
            this.floatLightSpotAngleCos = new Float32Array(8);
            this.lightmap = null;
        }
        // campos: vec3;
        get matrixModel() {
            return this.curRender.modelMatrix;
        }
        get matrixNormalToworld() {
            Mat4.invert(this.matrixModel, this._matrixNormalToworld);
            Mat4.transpose(this._matrixNormalToworld, this._matrixNormalToworld);
            return this._matrixNormalToworld;
        }
        get matrixModelView() {
            return Mat4.multiply(this.curCamera.ViewProjectMatrix, this.matrixModel, this._matrixMV);
        }
        get matrixModelViewProject() {
            return Mat4.multiply(this.curCamera.ViewProjectMatrix, this.matrixModel, this._matMVP);
        }
        get matrixView() {
            return this.curCamera.ViewMatrix;
        }
        get matrixProject() {
            return this.curCamera.ProjectMatrix;
        }
        get matrixViewProject() {
            return this.curCamera.ViewProjectMatrix;
        }
    }

    class AutoUniform {
        constructor(renderContext) {
            this.uniformDic = {};
            this.renderContext = renderContext;
            this.init();
        }
        init() {
            this.uniformDic["u_mat_model"] = () => {
                return this.renderContext.matrixModel;
            };
            this.uniformDic["u_mat_view"] = () => {
                return this.renderContext.matrixView;
            };
            this.uniformDic["u_mat_project"] = () => {
                return this.renderContext.matrixProject;
            };
            this.uniformDic["u_mat_ModelView"] = () => {
                return this.renderContext.matrixModelView;
            };
            this.uniformDic["u_mat_viewproject"] = () => {
                return this.renderContext.matrixViewProject;
            };
            this.uniformDic["u_mat_mvp"] = () => {
                return this.renderContext.matrixModelViewProject;
            };
            this.uniformDic["u_mat_normal"] = () => {
                return this.renderContext.matrixNormalToworld;
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

    class RenderMachine {
        constructor(cancvas) {
            this.camRenderList = {};
            this.rendercontext = new RenderContext();
            GlRender.autoUniform = new AutoUniform(this.rendercontext);
            GlRender.init(cancvas);
        }
        drawCamera(cam, renderList) {
            if (this.camRenderList[cam.entity.guid] == null) {
                this.camRenderList[cam.entity.guid] = new RenderList(cam);
            }
            let camrenderList = this.camRenderList[cam.entity.guid];
            camrenderList.clear();
            for (let i = 0; i < renderList.length; i++) {
                if (renderList[i].maskLayer & cam.cullingMask) {
                    camrenderList.addRenderer(renderList[i]);
                }
            }
            //----------- set global State
            GlRender.setViewPort(cam.viewport);
            GlRender.setClear(cam.clearFlag & ClearEnum.DEPTH ? true : false, cam.clearFlag & ClearEnum.COLOR ? cam.backgroundColor : null, cam.clearFlag & ClearEnum.STENCIL ? true : false);
            //-----------camera render before
            this.rendercontext.curCamera = cam;
            //-----------camera render ing
            camrenderList.sort().foreach((item) => {
                this.rendercontext.curRender = item;
                let shader = item.material.shader;
                if (shader != null) {
                    let passes = shader.passes && shader.passes["base"];
                    if (passes != null) {
                        for (let i = 0; i < passes.length; i++) {
                            GlRender.drawObject(item.geometry.data, passes[i], item.material.uniforms, shader.mapUniformDef);
                        }
                    }
                }
            });
            //-----------canera render end
        }
    }
    var DrawTypeEnum;
    (function (DrawTypeEnum) {
        DrawTypeEnum[DrawTypeEnum["BASE"] = 0] = "BASE";
        DrawTypeEnum[DrawTypeEnum["SKIN"] = 1] = "SKIN";
        DrawTypeEnum[DrawTypeEnum["LIGHTMAP"] = 2] = "LIGHTMAP";
        DrawTypeEnum[DrawTypeEnum["FOG"] = 4] = "FOG";
        DrawTypeEnum[DrawTypeEnum["INSTANCe"] = 8] = "INSTANCe";
        DrawTypeEnum[DrawTypeEnum["NOFOG"] = 3] = "NOFOG";
        DrawTypeEnum[DrawTypeEnum["NOLIGHTMAP"] = 5] = "NOLIGHTMAP";
    })(DrawTypeEnum || (DrawTypeEnum = {}));

    class Mat3 extends Float32Array {
        static create() {
            if (Mat3.Recycle && Mat3.Recycle.length > 0) {
                let item = Mat3.Recycle.pop();
                Mat3.identity(item);
                return item;
            }
            else {
                let item = new Float32Array(9);
                item[0] = 1;
                item[4] = 1;
                item[8] = 1;
                return item;
            }
        }
        static clone(from) {
            if (Mat3.Recycle.length > 0) {
                let item = Mat3.Recycle.pop();
                Mat3.copy(from, item);
                return item;
            }
            else {
                let out = new Float32Array(9);
                out[0] = from[0];
                out[1] = from[1];
                out[2] = from[2];
                out[3] = from[3];
                out[4] = from[4];
                out[5] = from[5];
                out[6] = from[6];
                out[7] = from[7];
                out[8] = from[8];
                return out;
            }
        }
        static recycle(item) {
            Mat3.Recycle.push(item);
        }
        static disposeRecycledItems() {
            Mat3.Recycle.length = 0;
        }
        // public constructor()
        // {
        //     super(9);
        //     this[0]=1;
        //     this[4]=1;
        //     this[8]=1;
        // }
        /**
         * Copies the upper-left 3x3 values into the given mat3.
         *
         * @param {Mat3} out the receiving 3x3 matrix
         * @param {mat4} a   the source 4x4 matrix
         * @returns {Mat3} out
         */
        static fromMat4(a, out) {
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            out[3] = a[4];
            out[4] = a[5];
            out[5] = a[6];
            out[6] = a[8];
            out[7] = a[9];
            out[8] = a[10];
            return out;
        }
        /**
         * Copy the values from one mat3 to another
         *
         * @param {Mat3} out the receiving matrix
         * @param {Mat3} a the source matrix
         * @returns {Mat3} out
         */
        static copy(a, out) {
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            out[3] = a[3];
            out[4] = a[4];
            out[5] = a[5];
            out[6] = a[6];
            out[7] = a[7];
            out[8] = a[8];
            return out;
        }
        /**
         * Set a mat3 to the identity matrix
         *
         * @param {Mat3} out the receiving matrix
         * @returns {Mat3} out
         */
        static identity(out) {
            out[0] = 1;
            out[1] = 0;
            out[2] = 0;
            out[3] = 0;
            out[4] = 1;
            out[5] = 0;
            out[6] = 0;
            out[7] = 0;
            out[8] = 1;
            return out;
        }
        /**
         * Transpose the values of a mat3
         *
         * @param {Mat3} out the receiving matrix
         * @param {Mat3} a the source matrix
         * @returns {Mat3} out
         */
        static transpose(a, out) {
            // If we are transposing ourselves we can skip a few steps but have to cache some values
            if (out === a) {
                let a01 = a[1], a02 = a[2], a12 = a[5];
                out[1] = a[3];
                out[2] = a[6];
                out[3] = a01;
                out[5] = a[7];
                out[6] = a02;
                out[7] = a12;
            }
            else {
                out[0] = a[0];
                out[1] = a[3];
                out[2] = a[6];
                out[3] = a[1];
                out[4] = a[4];
                out[5] = a[7];
                out[6] = a[2];
                out[7] = a[5];
                out[8] = a[8];
            }
            return out;
        }
        /**
         * Inverts a mat3
         *
         * @param {Mat3} out the receiving matrix
         * @param {Mat3} a the source matrix
         * @returns {Mat3} out
         */
        static invert(a, out) {
            let a00 = a[0], a01 = a[1], a02 = a[2];
            let a10 = a[3], a11 = a[4], a12 = a[5];
            let a20 = a[6], a21 = a[7], a22 = a[8];
            let b01 = a22 * a11 - a12 * a21;
            let b11 = -a22 * a10 + a12 * a20;
            let b21 = a21 * a10 - a11 * a20;
            // Calculate the determinant
            let det = a00 * b01 + a01 * b11 + a02 * b21;
            if (!det) {
                return null;
            }
            det = 1.0 / det;
            out[0] = b01 * det;
            out[1] = (-a22 * a01 + a02 * a21) * det;
            out[2] = (a12 * a01 - a02 * a11) * det;
            out[3] = b11 * det;
            out[4] = (a22 * a00 - a02 * a20) * det;
            out[5] = (-a12 * a00 + a02 * a10) * det;
            out[6] = b21 * det;
            out[7] = (-a21 * a00 + a01 * a20) * det;
            out[8] = (a11 * a00 - a01 * a10) * det;
            return out;
        }
        /**
         * Calculates the adjugate of a mat3
         *
         * @param {Mat3} out the receiving matrix
         * @param {Mat3} a the source matrix
         * @returns {Mat3} out
         */
        static adjoint(a, out) {
            let a00 = a[0], a01 = a[1], a02 = a[2];
            let a10 = a[3], a11 = a[4], a12 = a[5];
            let a20 = a[6], a21 = a[7], a22 = a[8];
            out[0] = a11 * a22 - a12 * a21;
            out[1] = a02 * a21 - a01 * a22;
            out[2] = a01 * a12 - a02 * a11;
            out[3] = a12 * a20 - a10 * a22;
            out[4] = a00 * a22 - a02 * a20;
            out[5] = a02 * a10 - a00 * a12;
            out[6] = a10 * a21 - a11 * a20;
            out[7] = a01 * a20 - a00 * a21;
            out[8] = a00 * a11 - a01 * a10;
            return out;
        }
        /**
         * Calculates the determinant of a mat3
         *
         * @param {Mat3} a the source matrix
         * @returns {Number} determinant of a
         */
        static determinant(a) {
            let a00 = a[0], a01 = a[1], a02 = a[2];
            let a10 = a[3], a11 = a[4], a12 = a[5];
            let a20 = a[6], a21 = a[7], a22 = a[8];
            return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
        }
        /**
         * Multiplies two mat3's
         *
         * @param {Mat3} out the receiving matrix
         * @param {Mat3} a the first operand
         * @param {Mat3} b the second operand
         * @returns {Mat3} out
         */
        static multiply(a, b, out) {
            let a00 = a[0], a01 = a[1], a02 = a[2];
            let a10 = a[3], a11 = a[4], a12 = a[5];
            let a20 = a[6], a21 = a[7], a22 = a[8];
            let b00 = b[0], b01 = b[1], b02 = b[2];
            let b10 = b[3], b11 = b[4], b12 = b[5];
            let b20 = b[6], b21 = b[7], b22 = b[8];
            out[0] = b00 * a00 + b01 * a10 + b02 * a20;
            out[1] = b00 * a01 + b01 * a11 + b02 * a21;
            out[2] = b00 * a02 + b01 * a12 + b02 * a22;
            out[3] = b10 * a00 + b11 * a10 + b12 * a20;
            out[4] = b10 * a01 + b11 * a11 + b12 * a21;
            out[5] = b10 * a02 + b11 * a12 + b12 * a22;
            out[6] = b20 * a00 + b21 * a10 + b22 * a20;
            out[7] = b20 * a01 + b21 * a11 + b22 * a21;
            out[8] = b20 * a02 + b21 * a12 + b22 * a22;
            return out;
        }
        /**
         * Translate a mat3 by the given vector
         *
         * @param {Mat3} out the receiving matrix
         * @param {Mat3} a the matrix to translate
         * @param {vec2} v vector to translate by
         * @returns {Mat3} out
         */
        static translate(a, v, out) {
            let a00 = a[0], a01 = a[1], a02 = a[2], a10 = a[3], a11 = a[4], a12 = a[5], a20 = a[6], a21 = a[7], a22 = a[8], x = v[0], y = v[1];
            out[0] = a00;
            out[1] = a01;
            out[2] = a02;
            out[3] = a10;
            out[4] = a11;
            out[5] = a12;
            out[6] = x * a00 + y * a10 + a20;
            out[7] = x * a01 + y * a11 + a21;
            out[8] = x * a02 + y * a12 + a22;
            return out;
        }
        /**
         * Rotates a mat3 by the given angle
         *
         * @param {Mat3} out the receiving matrix
         * @param {Mat3} a the matrix to rotate
         * @param {Number} rad the angle to rotate the matrix by
         * @returns {Mat3} out
         */
        static rotate(a, rad, out) {
            let a00 = a[0], a01 = a[1], a02 = a[2], a10 = a[3], a11 = a[4], a12 = a[5], a20 = a[6], a21 = a[7], a22 = a[8], s = Math.sin(rad), c = Math.cos(rad);
            out[0] = c * a00 + s * a10;
            out[1] = c * a01 + s * a11;
            out[2] = c * a02 + s * a12;
            out[3] = c * a10 - s * a00;
            out[4] = c * a11 - s * a01;
            out[5] = c * a12 - s * a02;
            out[6] = a20;
            out[7] = a21;
            out[8] = a22;
            return out;
        }
        /**
         * Scales the mat3 by the dimensions in the given vec2
         *
         * @param {Mat3} out the receiving matrix
         * @param {Mat3} a the matrix to rotate
         * @param {vec2} v the vec2 to scale the matrix by
         * @returns {Mat3} out
         **/
        static scale(a, v, out) {
            let x = v[0], y = v[1];
            out[0] = x * a[0];
            out[1] = x * a[1];
            out[2] = x * a[2];
            out[3] = y * a[3];
            out[4] = y * a[4];
            out[5] = y * a[5];
            out[6] = a[6];
            out[7] = a[7];
            out[8] = a[8];
            return out;
        }
        /**
         * Creates a matrix from a vector translation
         * This is equivalent to (but much faster than):
         *
         *     mat3.identity(dest);
         *     mat3.translate(dest, dest, vec);
         *
         * @param {Mat3} out mat3 receiving operation result
         * @param {vec2} v Translation vector
         * @returns {Mat3} out
         */
        static fromTranslation(v, out) {
            out[0] = 1;
            out[1] = 0;
            out[2] = 0;
            out[3] = 0;
            out[4] = 1;
            out[5] = 0;
            out[6] = v[0];
            out[7] = v[1];
            out[8] = 1;
            return out;
        }
        /**
         * Creates a matrix from a given angle
         * This is equivalent to (but much faster than):
         *
         *     mat3.identity(dest);
         *     mat3.rotate(dest, dest, rad);
         *
         * @param {Mat3} out mat3 receiving operation result
         * @param {Number} rad the angle to rotate the matrix by
         * @returns {Mat3} out
         */
        static fromRotation(rad, out) {
            let s = Math.sin(rad), c = Math.cos(rad);
            out[0] = c;
            out[1] = s;
            out[2] = 0;
            out[3] = -s;
            out[4] = c;
            out[5] = 0;
            out[6] = 0;
            out[7] = 0;
            out[8] = 1;
            return out;
        }
        /**
         * Creates a matrix from a vector scaling
         * This is equivalent to (but much faster than):
         *
         *     mat3.identity(dest);
         *     mat3.scale(dest, dest, vec);
         *
         * @param {Mat3} out mat3 receiving operation result
         * @param {vec2} v Scaling vector
         * @returns {Mat3} out
         */
        static fromScaling(v, out) {
            out[0] = v[0];
            out[1] = 0;
            out[2] = 0;
            out[3] = 0;
            out[4] = v[1];
            out[5] = 0;
            out[6] = 0;
            out[7] = 0;
            out[8] = 1;
            return out;
        }
        /**
         * Copies the values from a mat2d into a mat3
         *
         * @param {Mat3} out the receiving matrix
         * @param {mat2d} a the matrix to copy
         * @returns {Mat3} out
         **/
        static fromMat2d(a, out) {
            out[0] = a[0];
            out[1] = a[1];
            out[2] = 0;
            out[3] = a[2];
            out[4] = a[3];
            out[5] = 0;
            out[6] = a[4];
            out[7] = a[5];
            out[8] = 1;
            return out;
        }
        /**
         * Calculates a 3x3 matrix from the given quaternion
         *
         * @param {Mat3} out mat3 receiving operation result
         * @param {quat} q Quaternion to create matrix from
         *
         * @returns {Mat3} out
         */
        static fromQuat(q, out) {
            let x = q[0], y = q[1], z = q[2], w = q[3];
            let x2 = x + x;
            let y2 = y + y;
            let z2 = z + z;
            let xx = x * x2;
            let yx = y * x2;
            let yy = y * y2;
            let zx = z * x2;
            let zy = z * y2;
            let zz = z * z2;
            let wx = w * x2;
            let wy = w * y2;
            let wz = w * z2;
            out[0] = 1 - yy - zz;
            out[3] = yx - wz;
            out[6] = zx + wy;
            out[1] = yx + wz;
            out[4] = 1 - xx - zz;
            out[7] = zy - wx;
            out[2] = zx - wy;
            out[5] = zy + wx;
            out[8] = 1 - xx - yy;
            return out;
        }
        /**
         * Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix
         *
         * @param {Mat3} out mat3 receiving operation result
         * @param {mat4} a Mat4 to derive the normal matrix from
         *
         * @returns {Mat3} out
         */
        static normalFromMat4(a, out) {
            let a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
            let a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
            let a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
            let a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
            let b00 = a00 * a11 - a01 * a10;
            let b01 = a00 * a12 - a02 * a10;
            let b02 = a00 * a13 - a03 * a10;
            let b03 = a01 * a12 - a02 * a11;
            let b04 = a01 * a13 - a03 * a11;
            let b05 = a02 * a13 - a03 * a12;
            let b06 = a20 * a31 - a21 * a30;
            let b07 = a20 * a32 - a22 * a30;
            let b08 = a20 * a33 - a23 * a30;
            let b09 = a21 * a32 - a22 * a31;
            let b10 = a21 * a33 - a23 * a31;
            let b11 = a22 * a33 - a23 * a32;
            // Calculate the determinant
            let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
            if (!det) {
                return null;
            }
            det = 1.0 / det;
            out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
            out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
            out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
            out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
            out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
            out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
            out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
            out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
            out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
            return out;
        }
        /**
         * Generates a 2D projection matrix with the given bounds
         *
         * @param {Mat3} out mat3 frustum matrix will be written into
         * @param {number} width Width of your gl context
         * @param {number} height Height of gl context
         * @returns {Mat3} out
         */
        static projection(width, height, out) {
            out[0] = 2 / width;
            out[1] = 0;
            out[2] = 0;
            out[3] = 0;
            out[4] = -2 / height;
            out[5] = 0;
            out[6] = -1;
            out[7] = 1;
            out[8] = 1;
            return out;
        }
        /**
         * Returns a string representation of a mat3
         *
         * @param {Mat3} a matrix to represent as a string
         * @returns {String} string representation of the matrix
         */
        static str(a) {
            return ("mat3(" +
                a[0] +
                ", " +
                a[1] +
                ", " +
                a[2] +
                ", " +
                a[3] +
                ", " +
                a[4] +
                ", " +
                a[5] +
                ", " +
                a[6] +
                ", " +
                a[7] +
                ", " +
                a[8] +
                ")");
        }
        /**
         * Returns Frobenius norm of a mat3
         *
         * @param {Mat3} a the matrix to calculate Frobenius norm of
         * @returns {Number} Frobenius norm
         */
        static frob(a) {
            return Math.sqrt(Math.pow(a[0], 2) +
                Math.pow(a[1], 2) +
                Math.pow(a[2], 2) +
                Math.pow(a[3], 2) +
                Math.pow(a[4], 2) +
                Math.pow(a[5], 2) +
                Math.pow(a[6], 2) +
                Math.pow(a[7], 2) +
                Math.pow(a[8], 2));
        }
        /**
         * Adds two mat3's
         *
         * @param {Mat3} out the receiving matrix
         * @param {Mat3} a the first operand
         * @param {Mat3} b the second operand
         * @returns {Mat3} out
         */
        static add(a, b, out) {
            out[0] = a[0] + b[0];
            out[1] = a[1] + b[1];
            out[2] = a[2] + b[2];
            out[3] = a[3] + b[3];
            out[4] = a[4] + b[4];
            out[5] = a[5] + b[5];
            out[6] = a[6] + b[6];
            out[7] = a[7] + b[7];
            out[8] = a[8] + b[8];
            return out;
        }
        /**
         * Subtracts matrix b from matrix a
         *
         * @param {Mat3} out the receiving matrix
         * @param {Mat3} a the first operand
         * @param {Mat3} b the second operand
         * @returns {Mat3} out
         */
        static subtract(a, b, out) {
            out[0] = a[0] - b[0];
            out[1] = a[1] - b[1];
            out[2] = a[2] - b[2];
            out[3] = a[3] - b[3];
            out[4] = a[4] - b[4];
            out[5] = a[5] - b[5];
            out[6] = a[6] - b[6];
            out[7] = a[7] - b[7];
            out[8] = a[8] - b[8];
            return out;
        }
        /**
         * Multiply each element of the matrix by a scalar.
         *
         * @param {Mat3} out the receiving matrix
         * @param {Mat3} a the matrix to scale
         * @param {Number} b amount to scale the matrix's elements by
         * @returns {Mat3} out
         */
        static multiplyScalar(a, b, out) {
            out[0] = a[0] * b;
            out[1] = a[1] * b;
            out[2] = a[2] * b;
            out[3] = a[3] * b;
            out[4] = a[4] * b;
            out[5] = a[5] * b;
            out[6] = a[6] * b;
            out[7] = a[7] * b;
            out[8] = a[8] * b;
            return out;
        }
        /**
         * Adds two mat3's after multiplying each element of the second operand by a scalar value.
         *
         * @param {Mat3} out the receiving vector
         * @param {Mat3} a the first operand
         * @param {Mat3} b the second operand
         * @param {Number} scale the amount to scale b's elements by before adding
         * @returns {Mat3} out
         */
        static multiplyScalarAndAdd(a, b, scale, out) {
            out[0] = a[0] + b[0] * scale;
            out[1] = a[1] + b[1] * scale;
            out[2] = a[2] + b[2] * scale;
            out[3] = a[3] + b[3] * scale;
            out[4] = a[4] + b[4] * scale;
            out[5] = a[5] + b[5] * scale;
            out[6] = a[6] + b[6] * scale;
            out[7] = a[7] + b[7] * scale;
            out[8] = a[8] + b[8] * scale;
            return out;
        }
        /**
         * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
         *
         * @param {Mat3} a The first matrix.
         * @param {Mat3} b The second matrix.
         * @returns {Boolean} True if the matrices are equal, false otherwise.
         */
        static exactEquals(a, b) {
            return (a[0] === b[0] &&
                a[1] === b[1] &&
                a[2] === b[2] &&
                a[3] === b[3] &&
                a[4] === b[4] &&
                a[5] === b[5] &&
                a[6] === b[6] &&
                a[7] === b[7] &&
                a[8] === b[8]);
        }
        /**
         * Returns whether or not the matrices have approximately the same elements in the same position.
         *
         * @param {Mat3} a The first matrix.
         * @param {Mat3} b The second matrix.
         * @returns {Boolean} True if the matrices are equal, false otherwise.
         */
        static equals(a, b) {
            let a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5], a6 = a[6], a7 = a[7], a8 = a[8];
            let b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5], b6 = b[6], b7 = b[7], b8 = b[8];
            return (Math.abs(a0 - b0) <= EPSILON &&
                Math.abs(a1 - b1) <= EPSILON &&
                Math.abs(a2 - b2) <= EPSILON &&
                Math.abs(a3 - b3) <= EPSILON &&
                Math.abs(a4 - b4) <= EPSILON &&
                Math.abs(a5 - b5) <= EPSILON &&
                Math.abs(a6 - b6) <= EPSILON &&
                Math.abs(a7 - b7) <= EPSILON &&
                Math.abs(a8 - b8) <= EPSILON);
        }
    }
    Mat3.Recycle = [];

    class Quat extends Float32Array {
        constructor() {
            super(4);
            // this[0]=0;
            // this[1]=0;
            // this[2]=0;
            this[3] = 1;
        }
        get x() {
            return this[0];
        }
        set x(value) {
            this[0] = value;
        }
        get y() {
            return this[1];
        }
        set y(value) {
            this[1] = value;
        }
        get z() {
            return this[2];
        }
        set z(value) {
            this[2] = value;
        }
        get w() {
            return this[3];
        }
        set w(value) {
            this[3] = value;
        }
        static create() {
            if (Quat.Recycle && Quat.Recycle.length > 0) {
                let item = Quat.Recycle.pop();
                Quat.identity(item);
                return item;
            }
            else {
                let item = new Quat();
                return item;
            }
        }
        static clone(from) {
            if (Quat.Recycle.length > 0) {
                let item = Quat.Recycle.pop();
                Quat.copy(from, item);
                return item;
            }
            else {
                let item = new Quat();
                item[0] = from[0];
                item[1] = from[1];
                item[2] = from[2];
                item[3] = from[3];
                return item;
            }
        }
        static recycle(item) {
            Quat.Recycle.push(item);
        }
        static disposeRecycledItems() {
            Quat.Recycle.length = 0;
        }
        /**
         * Copy the values from one Quat to another
         *
         * @param out the receiving Quaternion
         * @param a the source Quaternion
         * @returns out
         * @function
         */
        static copy(a, out = Quat.create()) {
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            out[3] = a[3];
            return out;
        }
        /**
         * Set a Quat to the identity Quaternion
         *
         * @param out the receiving Quaternion
         * @returns out
         */
        static identity(out = Quat.create()) {
            out[0] = 0;
            out[1] = 0;
            out[2] = 0;
            out[3] = 1;
            return out;
        }
        /**
         * Gets the rotation axis and angle for a given
         *  Quaternion. If a Quaternion is created with
         *  setAxisAngle, this method will return the same
         *  values as providied in the original parameter list
         *  OR functionally equivalent values.
         * Example: The Quaternion formed by axis [0, 0, 1] and
         *  angle -90 is the same as the Quaternion formed by
         *  [0, 0, 1] and 270. This method favors the latter.
         * @param  {Vec3} axis  Vector receiving the axis of rotation
         * @param  {Quat} q     Quaternion to be decomposed
         * @return {number}     Angle, in radians, of the rotation
         */
        static getAxisAngle(axis, q) {
            let rad = Math.acos(q[3]) * 2.0;
            let s = Math.sin(rad / 2.0);
            if (s != 0.0) {
                axis[0] = q[0] / s;
                axis[1] = q[1] / s;
                axis[2] = q[2] / s;
            }
            else {
                // If s is zero, return any axis (no rotation - axis does not matter)
                axis[0] = 1;
                axis[1] = 0;
                axis[2] = 0;
            }
            return rad;
        }
        /**
         * Adds two Quat's
         *
         * @param out the receiving Quaternion
         * @param a the first operand
         * @param b the second operand
         * @returns out
         * @function
         */
        static add(a, b, out = Quat.create()) {
            out[0] = a[0] + b[0];
            out[1] = a[1] + b[1];
            out[2] = a[2] + b[2];
            out[3] = a[3] + b[3];
            return out;
        }
        /**
         * Multiplies two Quat's
         *
         * @param out the receiving Quaternion
         * @param a the first operand
         * @param b the second operand
         * @returns out
         */
        static multiply(a, b, out = Quat.create()) {
            let ax = a[0], ay = a[1], az = a[2], aw = a[3];
            let bx = b[0], by = b[1], bz = b[2], bw = b[3];
            out[0] = ax * bw + aw * bx + ay * bz - az * by;
            out[1] = ay * bw + aw * by + az * bx - ax * bz;
            out[2] = az * bw + aw * bz + ax * by - ay * bx;
            out[3] = aw * bw - ax * bx - ay * by - az * bz;
            return out;
        }
        /**
         * Scales a Quat by a scalar number
         *
         * @param out the receiving vector
         * @param a the vector to scale
         * @param b amount to scale the vector by
         * @returns out
         * @function
         */
        static scale(a, b, out = Quat.create()) {
            out[0] = a[0] * b;
            out[1] = a[1] * b;
            out[2] = a[2] * b;
            out[3] = a[3] * b;
            return out;
        }
        /**
         * Calculates the length of a Quat
         *
         * @param a vector to calculate length of
         * @returns length of a
         * @function
         */
        static length_(a) {
            let x = a[0];
            let y = a[1];
            let z = a[2];
            let w = a[3];
            return Math.sqrt(x * x + y * y + z * z + w * w);
        }
        /**
         * Calculates the squared length of a Quat
         *
         * @param a vector to calculate squared length of
         * @returns squared length of a
         * @function
         */
        static squaredLength(a) {
            let x = a[0];
            let y = a[1];
            let z = a[2];
            let w = a[3];
            return x * x + y * y + z * z + w * w;
        }
        /**
         * Normalize a Quat
         *
         * @param out the receiving Quaternion
         * @param src Quaternion to normalize
         * @returns out
         * @function
         */
        static normalize(src, out = Quat.create()) {
            let x = src[0];
            let y = src[1];
            let z = src[2];
            let w = src[3];
            let len = x * x + y * y + z * z + w * w;
            if (len > 0) {
                len = 1 / Math.sqrt(len);
                out[0] = x * len;
                out[1] = y * len;
                out[2] = z * len;
                out[3] = w * len;
            }
            return out;
        }
        /**
         * Calculates the dot product of two Quat's
         *
         * @param a the first operand
         * @param b the second operand
         * @returns dot product of a and b
         * @function
         */
        static dot(a, b) {
            return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
        }
        /**
         * Performs a linear interpolation between two Quat's
         *
         * @param out the receiving Quaternion
         * @param a the first operand
         * @param b the second operand
         * @param t interpolation amount between the two inputs
         * @returns out
         * @function
         */
        static lerp(a, b, t, out = Quat.create()) {
            let ax = a[0];
            let ay = a[1];
            let az = a[2];
            let aw = a[3];
            out[0] = ax + t * (b[0] - ax);
            out[1] = ay + t * (b[1] - ay);
            out[2] = az + t * (b[2] - az);
            out[3] = aw + t * (b[3] - aw);
            return out;
        }
        /**
         * Performs a spherical linear interpolation between two Quat
         *
         * @param out the receiving Quaternion
         * @param a the first operand
         * @param b the second operand
         * @param t interpolation amount between the two inputs
         * @returns out
         */
        static slerp(a, b, t, out = Quat.create()) {
            // benchmarks:
            //    http://jsperf.com/Quaternion-slerp-implementations
            let ax = a[0], ay = a[1], az = a[2], aw = a[3];
            let bx = b[0], by = b[1], bz = b[2], bw = b[3];
            let omega = void 0, cosom = void 0, sinom = void 0, scale0 = void 0, scale1 = void 0;
            // calc cosine
            cosom = ax * bx + ay * by + az * bz + aw * bw;
            // adjust signs (if necessary)
            if (cosom < 0.0) {
                cosom = -cosom;
                bx = -bx;
                by = -by;
                bz = -bz;
                bw = -bw;
            }
            // calculate coefficients
            if (1.0 - cosom > 0.000001) {
                // standard case (slerp)
                omega = Math.acos(cosom);
                sinom = Math.sin(omega);
                scale0 = Math.sin((1.0 - t) * omega) / sinom;
                scale1 = Math.sin(t * omega) / sinom;
            }
            else {
                // "from" and "to" Quaternions are very close
                //  ... so we can do a linear interpolation
                scale0 = 1.0 - t;
                scale1 = t;
            }
            // calculate final values
            out[0] = scale0 * ax + scale1 * bx;
            out[1] = scale0 * ay + scale1 * by;
            out[2] = scale0 * az + scale1 * bz;
            out[3] = scale0 * aw + scale1 * bw;
            return out;
        }
        /**
         * Performs a spherical linear interpolation with two control points
         *
         * @param {Quat} out the receiving Quaternion
         * @param {Quat} a the first operand
         * @param {Quat} b the second operand
         * @param {Quat} c the third operand
         * @param {Quat} d the fourth operand
         * @param {number} t interpolation amount
         * @returns {Quat} out
         */
        static sqlerp(a, b, c, d, t, out = Quat.create()) {
            let temp1 = Quat.create();
            let temp2 = Quat.create();
            Quat.slerp(a, d, t, temp1);
            Quat.slerp(b, c, t, temp2);
            Quat.slerp(temp1, temp2, 2 * t * (1 - t), out);
            return out;
        }
        /**
         * Calculates the inverse of a Quat
         *
         * @param out the receiving Quaternion
         * @param a Quat to calculate inverse of
         * @returns out
         */
        static inverse(a, out = Quat.create()) {
            let a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
            let dot = a0 * a0 + a1 * a1 + a2 * a2 + a3 * a3;
            let invDot = dot ? 1.0 / dot : 0;
            // TODO: Would be faster to return [0,0,0,0] immediately if dot == 0
            out[0] = -a0 * invDot;
            out[1] = -a1 * invDot;
            out[2] = -a2 * invDot;
            out[3] = a3 * invDot;
            return out;
        }
        /**
         * Calculates the conjugate of a Quat
         * If the Quaternion is normalized, this function is faster than Quat.inverse and produces the same result.
         *
         * @param out the receiving Quaternion
         * @param a Quat to calculate conjugate of
         * @returns out
         */
        static conjugate(a, out = Quat.create()) {
            out[0] = -a[0];
            out[1] = -a[1];
            out[2] = -a[2];
            out[3] = a[3];
            return out;
        }
        /**
         * Returns a string representation of a Quaternion
         *
         * @param a Quat to represent as a string
         * @returns string representation of the Quat
         */
        static str(a) {
            return "Quat(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")";
        }
        /**
         * Rotates a Quaternion by the given angle about the X axis
         *
         * @param out Quat receiving operation result
         * @param a Quat to rotate
         * @param rad angle (in radians) to rotate
         * @returns out
         */
        static rotateX(a, rad, out = Quat.create()) {
            rad *= 0.5;
            let ax = a[0], ay = a[1], az = a[2], aw = a[3];
            let bx = Math.sin(rad), bw = Math.cos(rad);
            out[0] = ax * bw + aw * bx;
            out[1] = ay * bw + az * bx;
            out[2] = az * bw - ay * bx;
            out[3] = aw * bw - ax * bx;
            return out;
        }
        /**
         * Rotates a Quaternion by the given angle about the Y axis
         *
         * @param out Quat receiving operation result
         * @param a Quat to rotate
         * @param rad angle (in radians) to rotate
         * @returns out
         */
        static rotateY(a, rad, out = Quat.create()) {
            rad *= 0.5;
            let ax = a[0], ay = a[1], az = a[2], aw = a[3];
            let by = Math.sin(rad), bw = Math.cos(rad);
            out[0] = ax * bw - az * by;
            out[1] = ay * bw + aw * by;
            out[2] = az * bw + ax * by;
            out[3] = aw * bw - ay * by;
            return out;
        }
        /**
         * Rotates a Quaternion by the given angle about the Z axis
         *
         * @param out Quat receiving operation result
         * @param a Quat to rotate
         * @param rad angle (in radians) to rotate
         * @returns out
         */
        static rotateZ(a, rad, out = Quat.create()) {
            rad *= 0.5;
            let ax = a[0], ay = a[1], az = a[2], aw = a[3];
            let bz = Math.sin(rad), bw = Math.cos(rad);
            out[0] = ax * bw + ay * bz;
            out[1] = ay * bw - ax * bz;
            out[2] = az * bw + aw * bz;
            out[3] = aw * bw - az * bz;
            return out;
        }
        /**
         * Creates a Quaternion from the given 3x3 rotation matrix.
         *
         * NOTE: The resultant Quaternion is not normalized, so you should be sure
         * to renormalize the Quaternion yourself where necessary.
         *
         * @param out the receiving Quaternion
         * @param m rotation matrix
         * @returns out
         * @function
         */
        static fromMat3(m, out = Quat.create()) {
            // Algorithm in Ken Shoemake's article in 1987 SIGGRAPH course notes
            // article "Quaternion Calculus and Fast Animation".
            let fTrace = m[0] + m[4] + m[8];
            let fRoot = void 0;
            if (fTrace > 0.0) {
                // |w| > 1/2, may as well choose w > 1/2
                fRoot = Math.sqrt(fTrace + 1.0); // 2w
                out[3] = 0.5 * fRoot;
                fRoot = 0.5 / fRoot; // 1/(4w)
                out[0] = (m[5] - m[7]) * fRoot;
                out[1] = (m[6] - m[2]) * fRoot;
                out[2] = (m[1] - m[3]) * fRoot;
            }
            else {
                // |w| <= 1/2
                let i = 0;
                if (m[4] > m[0])
                    i = 1;
                if (m[8] > m[i * 3 + i])
                    i = 2;
                let j = (i + 1) % 3;
                let k = (i + 2) % 3;
                fRoot = Math.sqrt(m[i * 3 + i] - m[j * 3 + j] - m[k * 3 + k] + 1.0);
                out[i] = 0.5 * fRoot;
                fRoot = 0.5 / fRoot;
                out[3] = (m[j * 3 + k] - m[k * 3 + j]) * fRoot;
                out[j] = (m[j * 3 + i] + m[i * 3 + j]) * fRoot;
                out[k] = (m[k * 3 + i] + m[i * 3 + k]) * fRoot;
            }
            return out;
        }
        /**
         * Sets the specified Quaternion with values corresponding to the given
         * axes. Each axis is a Vec3 and is expected to be unit length and
         * perpendicular to all other specified axes.
         *
         * @param out the receiving Quat
         * @param view  the vector representing the viewing direction
         * @param right the vector representing the local "right" direction
         * @param up    the vector representing the local "up" direction
         * @returns out
         */
        static setAxes(view, right, up, out = Quat.create()) {
            let matr = Mat3.create();
            matr[0] = right[0];
            matr[3] = right[1];
            matr[6] = right[2];
            matr[1] = up[0];
            matr[4] = up[1];
            matr[7] = up[2];
            matr[2] = -view[0];
            matr[5] = -view[1];
            matr[8] = -view[2];
            Quat.fromMat3(matr, out);
            matr = null;
            return Quat.normalize(out, out);
        }
        /**
         * Calculates the W component of a Quat from the X, Y, and Z components.
         * Assumes that Quaternion is 1 unit in length.
         * Any existing W component will be ignored.
         *
         * @param out the receiving Quaternion
         * @param a Quat to calculate W component of
         * @returns out
         */
        static calculateW(a, out = Quat.create()) {
            let x = a[0], y = a[1], z = a[2];
            out[0] = x;
            out[1] = y;
            out[2] = z;
            out[3] = Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z));
            return out;
        }
        /**
         * Returns whether or not the Quaternions have exactly the same elements in the same position (when compared with ===)
         *
         * @param {Quat} a The first vector.
         * @param {Quat} b The second vector.
         * @returns {boolean} True if the Quaternions are equal, false otherwise.
         */
        static exactEquals(a, b) {
            return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
        }
        // /**
        //  * Returns whether or not the Quaternions have approximately the same elements in the same position.
        //  *
        //  * @param {Quat} a The first vector.
        //  * @param {Quat} b The second vector.
        //  * @returns {boolean} True if the Quaternions are equal, false otherwise.
        //  */
        // public static equals (a: Quat, b: Quat): boolean{
        //     let a0 = a[0],
        //     a1 = a[1],
        //     a2 = a[2],
        //     a3 = a[3];
        // let b0 = b[0],
        //     b1 = b[1],
        //     b2 = b[2],
        //     b3 = b[3];
        // return Math.abs(a0 - b0) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) && Math.abs(a1 - b1) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) && Math.abs(a2 - b2) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) && Math.abs(a3 - b3) <= glMatrix.EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3));
        // }
        static fromYawPitchRoll(yaw, pitch, roll, result) {
            // Produces a Quaternion from Euler angles in the z-y-x orientation (Tait-Bryan angles)
            let halfRoll = roll * 0.5;
            let halfPitch = pitch * 0.5;
            let halfYaw = yaw * 0.5;
            let sinRoll = Math.sin(halfRoll);
            let cosRoll = Math.cos(halfRoll);
            let sinPitch = Math.sin(halfPitch);
            let cosPitch = Math.cos(halfPitch);
            let sinYaw = Math.sin(halfYaw);
            let cosYaw = Math.cos(halfYaw);
            result[0] = cosYaw * sinPitch * cosRoll + sinYaw * cosPitch * sinRoll;
            result[1] = sinYaw * cosPitch * cosRoll - cosYaw * sinPitch * sinRoll;
            result[2] = cosYaw * cosPitch * sinRoll - sinYaw * sinPitch * cosRoll;
            result[3] = cosYaw * cosPitch * cosRoll + sinYaw * sinPitch * sinRoll;
        }
        /**舍弃glmatrix 的fromeuler  （坐标系不同算法不同）
         * Creates a Quaternion from the given euler angle x, y, z.
         * rot order： z-y-x
         * @param {x} Angle to rotate around X axis in degrees.
         * @param {y} Angle to rotate around Y axis in degrees.
         * @param {z} Angle to rotate around Z axis in degrees.
         * @param {Quat} out the receiving Quaternion
         * @returns {Quat} out
         * @function
         */
        static FromEuler(x, y, z, out = Quat.create()) {
            x *= (0.5 * Math.PI) / 180;
            y *= (0.5 * Math.PI) / 180;
            z *= (0.5 * Math.PI) / 180;
            let cosX = Math.cos(x), sinX = Math.sin(x);
            let cosY = Math.cos(y), sinY = Math.sin(y);
            let cosZ = Math.cos(z), sinZ = Math.sin(z);
            out[0] = sinX * cosY * cosZ + cosX * sinY * sinZ;
            out[1] = cosX * sinY * cosZ - sinX * cosY * sinZ;
            out[2] = cosX * cosY * sinZ - sinX * sinY * cosZ;
            out[3] = cosX * cosY * cosZ + sinX * sinY * sinZ;
            this.normalize(out, out);
            return out;
        }
        static ToEuler(src, out) {
            let x = src[0], y = src[1], z = src[2], w = src[3];
            let temp = 2.0 * (w * x - y * z);
            temp = clamp(temp, -1.0, 1.0);
            out[0] = Math.asin(temp);
            out[1] = Math.atan2(2.0 * (w * y + z * x), 1.0 - 2.0 * (y * y + x * x));
            out[2] = Math.atan2(2.0 * (w * z + y * x), 1.0 - 2.0 * (x * x + z * z));
            out[0] /= Math.PI / 180;
            out[1] /= Math.PI / 180;
            out[2] /= Math.PI / 180;
        }
        /**
         * Sets a Quat from the given angle and rotation axis,
         * then returns it.
         *
         * @param out the receiving Quaternion
         * @param axis the axis around which to rotate
         * @param rad （弧度）the angle in radians
         * @returns out
         **/
        static AxisAngle(axis, rad, out = Quat.create()) {
            rad = rad * 0.5;
            let s = Math.sin(rad);
            out[0] = s * axis[0];
            out[1] = s * axis[1];
            out[2] = s * axis[2];
            out[3] = Math.cos(rad);
            return out;
        }
        /**
         * Sets a Quaternion to represent the shortest rotation from one
         * vector to another.
         *
         * Both vectors are assumed to be unit length.
         *
         * @param out the receiving Quaternion.
         * @param from the initial vector
         * @param to the destination vector
         * @returns out
         */
        static rotationTo(from, to, out = Quat.create()) {
            let tmpVec3 = Vec3.create();
            let xUnitVec3 = Vec3.RIGHT;
            let yUnitVec3 = Vec3.UP;
            let dot = Vec3.dot(from, to);
            if (dot < -0.999999) {
                Vec3.cross(tmpVec3, xUnitVec3, from);
                if (Vec3.magnitude(tmpVec3) < 0.000001)
                    Vec3.cross(tmpVec3, yUnitVec3, from);
                Vec3.normalize(tmpVec3, tmpVec3);
                Quat.AxisAngle(tmpVec3, Math.PI, out);
                return out;
            }
            else if (dot > 0.999999) {
                out[0] = 0;
                out[1] = 0;
                out[2] = 0;
                out[3] = 1;
                return out;
            }
            else {
                Vec3.cross(tmpVec3, from, to);
                out[0] = tmpVec3[0];
                out[1] = tmpVec3[1];
                out[2] = tmpVec3[2];
                out[3] = 1 + dot;
                return Quat.normalize(out, out);
            }
        }
        static myLookRotation(dir, out = Quat.create(), up = Vec3.UP) {
            if (Vec3.exactEquals(dir, Vec3.ZERO)) {
                console.log("Zero direction in MyLookRotation");
                return Quat.norot;
            }
            if (!Vec3.exactEquals(dir, up)) {
                let tempv = Vec3.create();
                Vec3.scale(up, Vec3.dot(up, dir), tempv);
                Vec3.subtract(dir, tempv, tempv);
                let qu = Quat.create();
                this.rotationTo(Vec3.FORWARD, tempv, qu);
                let qu2 = Quat.create();
                this.rotationTo(tempv, dir, qu2);
                Quat.multiply(qu, qu2, out);
            }
            else {
                this.rotationTo(Vec3.FORWARD, dir, out);
            }
        }
        // /**
        //  *
        //  * @param pos transform self pos
        //  * @param targetpos targetpos
        //  * @param out
        //  * @param up
        //  */
        // static lookat(pos: Vec3, targetpos: Vec3, out: Quat = Quat.create(),up:Vec3=Vec3.UP)
        // {
        //     let baseDir=Vec3.BACKWARD;
        //     let dir = Vec3.create();
        //     Vec3.subtract(targetpos, pos, dir);
        //     Vec3.normalize(dir, dir);
        //     let dot = Vec3.dot(baseDir, dir);
        //     if (Math.abs(dot - (-1.0)) < 0.000001)
        //     {
        //         this.AxisAngle(Vec3.UP, Math.PI, out);
        //     }else if(Math.abs(dot - 1.0) < 0.000001)
        //     {
        //         Quat.identity(out);
        //     }else
        //     {
        //         dot = clamp(dot, -1, 1);
        //         let rotangle = Math.acos(dot);
        //         let rotAxis = Vec3.create();
        //         Vec3.cross(baseDir, dir, rotAxis);
        //         Vec3.normalize(rotAxis,rotAxis);
        //         Quat.AxisAngle(rotAxis, rotangle, out);
        //     }
        //     let targetdirx:Vec3=Vec3.create();
        //     Vec3.cross(up,out,targetdirx);
        //     let dotx = Vec3.dot(targetdirx,Vec3.RIGHT);
        //     let rot2=Quat.create();
        //     if (Math.abs(dotx - 1.0) < 0.000001)
        //     {
        //     }else if(Math.abs(dotx - 1.0) < 0.000001)
        //     {
        //         this.AxisAngle(Vec3.FORWARD, Math.PI, rot2);
        //         Quat.multiply(out,rot2,out);
        //     }else
        //     {
        //         let rotAxis=Vec3.create();
        //         Vec3.cross(Vec3.RIGHT,targetdirx,rotAxis);
        //         dotx = clamp(dotx, -1, 1);
        //         let rotangle = Math.acos(dotx);
        //         Quat.AxisAngle(rotAxis, rotangle, rot2);
        //         Quat.multiply(out,rot2,out);
        //     }
        //     Vec3.recycle(dir);
        //     // Vec3.recycle(rotAxis);
        //     // let dir = Vec3.create();
        //     // Vec3.subtract(targetpos, pos, dir);
        //     // Vec3.normalize(dir, dir);
        //     // this.rotationTo(Vec3.BACKWARD,dir,out);
        // }
        static LookRotation(lookAt, up = Vec3.UP) {
            /*Vector forward = lookAt.Normalized();
                Vector right = Vector::Cross(up.Normalized(), forward);
                Vector up = Vector::Cross(forward, right);*/
            // Vector forward = lookAt.Normalized();
            // Vector::OrthoNormalize(&up, &forward); // Keeps up the same, make forward orthogonal to up
            // Vector right = Vector::Cross(up, forward);
            // Quaternion ret;
            // ret.w = sqrtf(1.0f + right.x + up.y + forward.z) * 0.5f;
            // float w4_recip = 1.0f / (4.0f * ret.w);
            // ret.x = (forward.y - up.z) * w4_recip;
            // ret.y = (right.z - forward.x) * w4_recip;
            // ret.z = (up.x - right.y) * w4_recip;
            // return ret;
            let forward = Vec3.create();
            Vec3.normalize(lookAt, forward);
            let right = Vec3.create();
            Vec3.cross(up, forward, right);
        }
        static transformVector(src, vector, out) {
            var x1, y1, z1, w1;
            var x2 = vector[0], y2 = vector[1], z2 = vector[2];
            w1 = -src[0] * x2 - src[1] * y2 - src[2] * z2;
            x1 = src[3] * x2 + src[1] * z2 - src[2] * y2;
            y1 = src[3] * y2 - src[0] * z2 + src[2] * x2;
            z1 = src[3] * z2 + src[0] * y2 - src[1] * x2;
            out.x = -w1 * src[0] + x1 * src[3] - y1 * src[2] + z1 * src[1];
            out.y = -w1 * src[1] + x1 * src[2] + y1 * src[3] - z1 * src[0];
            out.z = -w1 * src[2] - x1 * src[1] + y1 * src[0] + z1 * src[3];
        }
        static fromUnitXYZ(xAxis, yAxis, zAxis, out = Quat.create()) {
            var m11 = xAxis[0], m12 = yAxis[0], m13 = zAxis[0];
            var m21 = xAxis[1], m22 = yAxis[1], m23 = zAxis[1];
            var m31 = xAxis[2], m32 = yAxis[2], m33 = zAxis[2];
            var trace = m11 + m22 + m33;
            var s;
            if (trace > 0) {
                s = 0.5 / Math.sqrt(trace + 1.0);
                out.w = 0.25 / s;
                out.x = (m32 - m23) * s;
                out.y = (m13 - m31) * s;
                out.z = (m21 - m12) * s;
            }
            else if (m11 > m22 && m11 > m33) {
                s = 2.0 * Math.sqrt(1.0 + m11 - m22 - m33);
                out.w = (m32 - m23) / s;
                out.x = 0.25 * s;
                out.y = (m12 + m21) / s;
                out.z = (m13 + m31) / s;
            }
            else if (m22 > m33) {
                s = 2.0 * Math.sqrt(1.0 + m22 - m11 - m33);
                out.w = (m13 - m31) / s;
                out.x = (m12 + m21) / s;
                out.y = 0.25 * s;
                out.z = (m23 + m32) / s;
            }
            else {
                s = 2.0 * Math.sqrt(1.0 + m33 - m11 - m22);
                out.w = (m21 - m12) / s;
                out.x = (m13 + m31) / s;
                out.y = (m23 + m32) / s;
                out.z = 0.25 * s;
            }
            return out;
        }
        static lookat(pos, targetpos, out = Quat.create(), up = Vec3.UP) {
            // let baseDir=Vec3.BACKWARD;
            let dirz = Vec3.create();
            Vec3.subtract(pos, targetpos, dirz);
            Vec3.normalize(dirz, dirz);
            let dirx = Vec3.create();
            Vec3.cross(up, dirz, dirx);
            Vec3.normalize(dirx, dirx);
            let diry = Vec3.create();
            Vec3.cross(dirz, dirx, diry);
            // Vec3.normalize(diry, diry);
            this.fromUnitXYZ(dirx, diry, dirz, out);
            Vec3.recycle(dirx);
            Vec3.recycle(diry);
            Vec3.recycle(dirz);
        }
        /**
         * Returns whether or not the vectors have approximately the same elements in the same Quat.
         *
         * @param {vec4} a The first vector.
         * @param {vec4} b The second vector.
         * @returns {boolean} True if the vectors are equal, false otherwise.
         */
        static equals(a, b) {
            let a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
            let b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
            return (Math.abs(a0 - b0) <= EPSILON &&
                Math.abs(a1 - b1) <= EPSILON &&
                Math.abs(a2 - b2) <= EPSILON &&
                Math.abs(a3 - b3) <= EPSILON);
        }
        /**
         *
         * @param from
         * @param to
         * @param out
         */
        static fromToRotation(from, to, out = Quat.create()) {
            let dir1 = Vec3.create();
            let dir2 = Vec3.create();
            Vec3.normalize(from, dir1);
            Vec3.normalize(to, dir2);
            let dir = Vec3.create();
            Vec3.cross(dir1, dir2, dir);
            if (Vec3.magnitude(dir) < 0.001) {
                Quat.identity(out);
            }
            else {
                let dot = Vec3.dot(dir1, dir2);
                Vec3.normalize(dir, dir);
                Quat.AxisAngle(dir, Math.acos(dot), out);
            }
            Vec3.recycle(dir);
            Vec3.recycle(dir1);
            Vec3.recycle(dir2);
        }
    }
    Quat.Recycle = [];
    Quat.norot = Quat.create();

    var Transform_1;
    var DirtyFlagEnum;
    (function (DirtyFlagEnum) {
        DirtyFlagEnum[DirtyFlagEnum["WWORLD_POS"] = 4] = "WWORLD_POS";
        DirtyFlagEnum[DirtyFlagEnum["WORLD_ROTATION"] = 8] = "WORLD_ROTATION";
        DirtyFlagEnum[DirtyFlagEnum["WORLD_SCALE"] = 16] = "WORLD_SCALE";
        DirtyFlagEnum[DirtyFlagEnum["LOCALMAT"] = 1] = "LOCALMAT";
        DirtyFlagEnum[DirtyFlagEnum["WORLDMAT"] = 2] = "WORLDMAT";
    })(DirtyFlagEnum || (DirtyFlagEnum = {}));
    let Transform = Transform_1 = class Transform {
        constructor() {
            this.children = [];
            this.dirtyFlag = 0;
            //------------------------local属性-------------------------------------------------------------
            //----------------------------------------------------------------------------------------------
            //localposition/localrot/localscale修改之后，markDirty 一下
            //----------------------------------------------------------------------------------------------
            this.localPosition = Vec3.create();
            this.localRotation = Quat.create();
            this.localScale = Vec3.create(1, 1, 1);
            this._localMatrix = Mat4.create();
            //-------------------------world属性--------------------------------------------------------------
            //------------------------------------------------------------------------------------------------
            //得到worldmatrix后，不会立刻decompse得到worldpos/worldscale/worldort,而是dirty标记起来.
            //setworld属性都是转换到setlocal属性
            //------------------------------------------------------------------------------------------------
            this._worldPosition = Vec3.create();
            this._worldRotation = Quat.create();
            this._worldScale = Vec3.create(1, 1, 1);
            this._worldMatrix = Mat4.create();
            this._worldTolocalMatrix = Mat4.create();
        }
        setlocalMatrix(value) {
            this._localMatrix = value;
            Mat4.decompose(this._localMatrix, this.localScale, this.localRotation, this.localPosition);
            this.dirtyFlag = this.dirtyFlag & ~DirtyFlagEnum.LOCALMAT;
            this.dirtyFlag = this.dirtyFlag | DirtyFlagEnum.WORLDMAT;
            Transform_1.NotifyChildSelfDirty(this);
        }
        get localMatrix() {
            if (this.dirtyFlag & DirtyFlagEnum.LOCALMAT) {
                Mat4.RTS(this.localPosition, this.localScale, this.localRotation, this._localMatrix);
                this.dirtyFlag = this.dirtyFlag & ~DirtyFlagEnum.LOCALMAT;
            }
            return this._localMatrix;
        }
        get worldPosition() {
            if (this.dirtyFlag & (DirtyFlagEnum.WORLDMAT | DirtyFlagEnum.WWORLD_POS)) {
                Mat4.getTranslationing(this.worldMatrix, this._worldPosition);
                this.dirtyFlag = this.dirtyFlag & ~DirtyFlagEnum.WWORLD_POS;
            }
            return this._worldPosition;
        }
        setworldPosition(value) {
            if (this.parent == null) {
                return;
            }
            if (this.parent.parent == null) {
                this.localPosition = value;
            }
            else {
                let invparentworld = Mat4.create();
                Mat4.invert(this.parent.worldMatrix, invparentworld);
                Mat4.transformPoint(value, invparentworld, this.localPosition);
                Mat4.recycle(invparentworld);
            }
            this.markDirty();
        }
        get worldRotation() {
            if (this.dirtyFlag & (DirtyFlagEnum.WORLDMAT | DirtyFlagEnum.WORLD_ROTATION)) {
                Mat4.getRotationing(this.worldMatrix, this._worldRotation, this.worldScale);
                this.dirtyFlag = this.dirtyFlag & ~DirtyFlagEnum.WORLD_ROTATION;
            }
            return this._worldRotation;
        }
        setworldRotation(value) {
            if (this.parent == null) {
                return;
            }
            if (this.parent.parent == null) {
                this.localRotation = value;
            }
            else {
                let invparentworldrot = Quat.create();
                Quat.inverse(this.parent.worldRotation, invparentworldrot);
                Quat.multiply(invparentworldrot, value, this.localRotation);
                Quat.recycle(invparentworldrot);
            }
            this.markDirty();
            return this;
        }
        get worldScale() {
            if (this.dirtyFlag & (DirtyFlagEnum.WORLDMAT | DirtyFlagEnum.WORLD_SCALE)) {
                Mat4.getScaling(this.worldMatrix, this._worldScale);
                this.dirtyFlag = this.dirtyFlag & ~DirtyFlagEnum.WORLD_SCALE;
            }
            return this._worldScale;
        }
        setworldScale(value) {
            if (this.parent == null) {
                return;
            }
            if (this.parent.parent == null) {
                this.localScale = value;
            }
            else {
                Vec3.divide(value, this.parent.worldScale, this.localScale);
            }
            this.markDirty();
            return this;
        }
        get worldMatrix() {
            if (this.dirtyFlag & (DirtyFlagEnum.WORLDMAT | DirtyFlagEnum.LOCALMAT)) {
                Mat4.multiply(this.parent.worldMatrix, this.localMatrix, this._worldMatrix);
                this.dirtyFlag = this.dirtyFlag & ~DirtyFlagEnum.WORLDMAT;
                this.dirtyFlag =
                    this.dirtyFlag | DirtyFlagEnum.WORLD_ROTATION | DirtyFlagEnum.WORLD_SCALE | DirtyFlagEnum.WWORLD_POS;
            }
            return this._worldMatrix;
        }
        setworldMatrix(value) {
            if (this.parent == null) {
                return;
            }
            Mat4.copy(value, this._worldMatrix);
            if (this.parent.parent == null) {
                Mat4.copy(value, this._localMatrix);
                this.setlocalMatrix(this._localMatrix);
            }
            else {
                let invparentworld = Mat4.create();
                Mat4.invert(this.parent.worldMatrix, invparentworld);
                Mat4.multiply(invparentworld, value, this._localMatrix);
                this.setlocalMatrix(this._localMatrix);
                Mat4.recycle(invparentworld);
            }
            this.dirtyFlag = this.dirtyFlag & ~DirtyFlagEnum.WORLDMAT;
            this.dirtyFlag =
                this.dirtyFlag | DirtyFlagEnum.WORLD_ROTATION | DirtyFlagEnum.WORLD_SCALE | DirtyFlagEnum.WWORLD_POS;
            return this;
        }
        get worldTolocalMatrix() {
            Mat4.invert(this.worldMatrix, this._worldTolocalMatrix);
            return this._worldTolocalMatrix;
        }
        /**
         * 通知子节点需要计算worldmatrix
         * @param node
         */
        static NotifyChildSelfDirty(node) {
            for (let key in node.children) {
                let child = node.children[key];
                if (!(child.dirtyFlag & DirtyFlagEnum.WORLDMAT)) {
                    child.dirtyFlag = child.dirtyFlag | DirtyFlagEnum.WORLDMAT;
                    this.NotifyChildSelfDirty(child);
                }
            }
        }
        /**
         * 修改local属性后，标记dirty
         */
        markDirty() {
            this.dirtyFlag = this.dirtyFlag | DirtyFlagEnum.LOCALMAT | DirtyFlagEnum.WORLDMAT;
            Transform_1.NotifyChildSelfDirty(this);
        }
        ///------------------------------------------父子结构
        /**
         * 添加子物体实例
         */
        addChild(node) {
            if (node.parent != null) {
                node.parent.removeChild(node);
            }
            this.children.push(node);
            node.parent = this;
            node.markDirty();
        }
        /**
         * 移除所有子物体
         */
        removeAllChild() {
            //if(this.children==undefined||this.children.length==0) return;
            if (this.children.length == 0)
                return;
            for (let i = 0, len = this.children.length; i < len; i++) {
                this.children[i].parent = null;
            }
            this.children.length = 0;
        }
        /**
         * 移除指定子物体
         */
        removeChild(node) {
            if (node.parent != this || this.children.length == 0) {
                throw new Error("not my child.");
            }
            let i = this.children.indexOf(node);
            if (i >= 0) {
                this.children.splice(i, 1);
                node.parent = null;
            }
        }
        update(frameState) { }
        //-------易用性拓展
        /**
         * 获取世界坐标系下当前z轴的朝向
         */
        getForwardInWorld(out) {
            Mat4.transformVector3(Vec3.FORWARD, this.worldMatrix, out);
            Vec3.normalize(out, out);
        }
        getRightInWorld(out) {
            Mat4.transformVector3(Vec3.RIGHT, this.worldMatrix, out);
            Vec3.normalize(out, out);
        }
        getUpInWorld(out) {
            Mat4.transformVector3(Vec3.UP, this.worldMatrix, out);
            Vec3.normalize(out, out);
        }
        moveInWorld(dir, amount) {
            let dirInLocal = Vec3.create();
            Mat4.transformVector3(dir, this.worldTolocalMatrix, dirInLocal);
            Vec3.AddscaledVec(this.localPosition, dirInLocal, amount, this.localPosition);
            this.markDirty();
            return this;
        }
        moveInlocal(dir, amount) {
            Vec3.AddscaledVec(this.localPosition, dir, amount, this.localPosition);
            this.markDirty();
            return this;
        }
        lookAtPoint(pos, up) {
            let dirz = Vec3.subtract(this.worldPosition, pos);
            Vec3.normalize(dirz, dirz);
            let dirx = Vec3.cross(up || Vec3.UP, dirz);
            let diry = Vec3.cross(dirz, dirx);
            let quat = Quat.fromUnitXYZ(dirx, diry, dirz);
            this.setworldRotation(quat);
            Vec3.recycle(dirz);
            Vec3.recycle(dirx);
            Vec3.recycle(diry);
        }
        lookAt(tran, up) {
            this.lookAtPoint(tran.worldPosition, up);
        }
        dispose() {
            this.parent = null;
            this.children = null;
        }
    };
    Transform = Transform_1 = __decorate([
        EC.RegComp,
        __metadata("design:paramtypes", [])
    ], Transform);

    let Mesh = class Mesh {
        constructor() {
            this.mask = CullingMask.default;
        }
        get geometry() {
            return this._geometry;
        }
        set geometry(value) {
            this._geometry = value;
            this._renderDirty = true;
        }
        get material() {
            return this._material;
        }
        set material(value) {
            this._material = value;
            this._renderDirty = true;
        }
        update(frameState) {
            if (this._geometry && this._material) {
                frameState.renderList.push({
                    maskLayer: this.entity.maskLayer,
                    geometry: this._geometry,
                    // program: this._material.program,
                    // uniforms: this._material.uniforms,
                    material: this._material,
                    modelMatrix: this.entity.transform.worldMatrix,
                    bouningSphere: this.boundingSphere,
                });
            }
        }
        get boundingSphere() {
            if (this._boundingSphere == null) {
                if (this._geometry) {
                    this._boundingSphere = new BoundingSphere();
                    this._boundingSphere.setFromGeometry(this._geometry);
                }
            }
            return this._boundingSphere;
        }
        dispose() { }
    };
    Mesh = __decorate([
        EC.RegComp
    ], Mesh);

    var MouseKeyEnum;
    (function (MouseKeyEnum) {
        MouseKeyEnum["Left"] = "MouseLeft";
        MouseKeyEnum["Middle"] = "MouseMiddle";
        MouseKeyEnum["Right"] = "MouseRight";
        MouseKeyEnum["None"] = "MouseNone";
    })(MouseKeyEnum || (MouseKeyEnum = {}));
    var MouseEventEnum;
    (function (MouseEventEnum) {
        MouseEventEnum["Up"] = "mouseUp";
        MouseEventEnum["Down"] = "mouseDown";
        MouseEventEnum["Move"] = "mouseMove";
        MouseEventEnum["Rotate"] = "mouseRotate";
    })(MouseEventEnum || (MouseEventEnum = {}));
    class ClickEvent {
    }
    class Mouse {
        static init(canvas) {
            // this.keyDic[0] = MouseKeyEnum.Left;
            // this.keyDic[1] = MouseKeyEnum.Middle;
            // this.keyDic[2] = MouseKeyEnum.Right;
            /**
             * 屏蔽网页原生鼠标事件
             */
            document.oncontextmenu = e => {
                return false;
            };
            // canvas.onmousedown=(ev: MouseEvent) => {
            //     this.OnMouseDown(ev);
            // };
            // canvas.onmouseup=(ev: MouseEvent) => {
            //     this.OnMouseUp(ev);
            // };
            // canvas.onmousemove=(ev: MouseEvent) => {
            //     this.OnMouseMove(ev);
            // };
            // canvas.onmousewheel=(ev: MouseEvent) => {
            //     this.OnMouseWheel(ev);
            // };
            // canvas.onmouseout=(ev: MouseEvent) => {
            //     this.OnMouseOut(ev);
            // };
            // canvas.onmouseenter=(ev: MouseEvent) => {
            //     this.OnMouseEnter(ev);
            // };
            canvas.addEventListener("mousedown", (ev) => {
                let key = ev.button;
                let keyEnum = this.keyDic[key];
                this.StateInfo[keyEnum] = true;
                let event = this.getClickEventByMouseEvent(ev);
                this.executeMouseEvent(keyEnum, MouseEventEnum.Down, event);
                this.executeMouseEvent(MouseKeyEnum.None, MouseEventEnum.Up, event);
            });
            canvas.addEventListener("mouseup", (ev) => {
                let key = ev.button;
                let keyEnum = this.keyDic[key];
                this.StateInfo[keyEnum] = false;
                let event = this.getClickEventByMouseEvent(ev);
                this.executeMouseEvent(keyEnum, MouseEventEnum.Up, event);
                this.executeMouseEvent(MouseKeyEnum.None, MouseEventEnum.Up, event);
            });
            canvas.addEventListener("mousemove", (ev) => {
                let event = this.getClickEventByMouseEvent(ev);
                this.executeMouseEvent(MouseKeyEnum.None, MouseEventEnum.Move, event);
            });
            canvas.addEventListener("mousewheel", (ev) => {
                let event = this.getClickEventByMouseEvent(ev);
                this.executeMouseEvent(MouseKeyEnum.None, MouseEventEnum.Rotate, event);
            });
        }
        static executeMouseEvent(key, event, ev) {
            if (this.MouseEvent[key] == null)
                return;
            let funcArr = this.MouseEvent[key][event];
            if (funcArr == null)
                return;
            for (let key in funcArr) {
                let func = funcArr[key];
                func(ev);
            }
        }
        static getClickEventByMouseEvent(ev) {
            let event = new ClickEvent();
            event.pointx = ev.offsetX; //鼠标指针相对于目标节点内边位置的X坐标
            event.pointy = ev.offsetY; //鼠标指针相对于目标节点内边位置的Y坐标
            // Input.mousePosition.x = ev.offsetX;
            // Input.mousePosition.y = ev.offsetY;
            event.movementX = ev.movementX;
            event.movementY = ev.movementY;
            event.rotateDelta = ev.detail | ev.wheelDelta;
            return event;
        }
    }
    Mouse.StateInfo = {};
    Mouse.MouseEvent = {};
    Mouse.keyDic = {
        0: MouseKeyEnum.Left,
        1: MouseKeyEnum.Middle,
        2: MouseKeyEnum.Right
    };

    var KeyCodeEnum;
    (function (KeyCodeEnum) {
        KeyCodeEnum["A"] = "A";
        KeyCodeEnum["B"] = "B";
        KeyCodeEnum["C"] = "C";
        KeyCodeEnum["D"] = "D";
        KeyCodeEnum["E"] = "E";
        KeyCodeEnum["F"] = "F";
        KeyCodeEnum["G"] = "G";
        KeyCodeEnum["H"] = "H";
        KeyCodeEnum["I"] = "I";
        KeyCodeEnum["J"] = "J";
        KeyCodeEnum["K"] = "K";
        KeyCodeEnum["L"] = "L";
        KeyCodeEnum["M"] = "M";
        KeyCodeEnum["N"] = "N";
        KeyCodeEnum["O"] = "O";
        KeyCodeEnum["P"] = "P";
        KeyCodeEnum["Q"] = "Q";
        KeyCodeEnum["R"] = "R";
        KeyCodeEnum["S"] = "S";
        KeyCodeEnum["T"] = "T";
        KeyCodeEnum["U"] = "U";
        KeyCodeEnum["V"] = "V";
        KeyCodeEnum["W"] = "W";
        KeyCodeEnum["X"] = "X";
        KeyCodeEnum["Y"] = "Y";
        KeyCodeEnum["Z"] = "Z";
        KeyCodeEnum["SPACE"] = " ";
        KeyCodeEnum["ESC"] = "ESC";
    })(KeyCodeEnum || (KeyCodeEnum = {}));
    var KeyCodeEventEnum;
    (function (KeyCodeEventEnum) {
        KeyCodeEventEnum["Up"] = "KeyUp";
        KeyCodeEventEnum["Down"] = "KeyDown";
    })(KeyCodeEventEnum || (KeyCodeEventEnum = {}));
    class Keyboard {
        static init() {
            // this.initKeyCodeMap();
            document.onkeydown = (ev) => {
                this.OnKeyDown(ev);
            };
            document.onkeyup = (ev) => {
                this.OnKeyUp(ev);
            };
            // document.addEventListener("keydown", (ev: KeyboardEvent) => {
            //     this.OnKeyDown(ev);
            // }, false);
            // document.addEventListener("keyup", (ev: KeyboardEvent) => {
            //     this.OnKeyUp(ev);
            // }, false);
        }
        static OnKeyDown(ev) {
            let key = ev.keyCode;
            let keystr = ev.key.toUpperCase(); //safari浏览器不支持keypress事件中的key属性
            this.StateInfo[keystr] = true;
            this.executeKeyboardEvent(keystr, KeyCodeEventEnum.Down, ev);
            this.excuteAnyKeyEvent(KeyCodeEventEnum.Down, ev);
        }
        static OnKeyUp(ev) {
            let key = ev.keyCode;
            let keystr = ev.key.toUpperCase(); //safari浏览器不支持keypress事件中的key属性
            this.StateInfo[keystr] = false;
            this.executeKeyboardEvent(keystr, KeyCodeEventEnum.Up, ev);
            this.excuteAnyKeyEvent(KeyCodeEventEnum.Up, ev);
        }
        static executeKeyboardEvent(key, event, ev) {
            if (this.KeyEvent[key] == null)
                return;
            let funcArr = this.KeyEvent[key][event];
            for (let key in funcArr) {
                let func = funcArr[key];
                func(ev);
            }
        }
        static excuteAnyKeyEvent(event, ev) {
            let fucArr = this.anyKeyEvent[event];
            if (fucArr == null)
                return;
            for (let key in fucArr) {
                let func = fucArr[key];
                func(ev);
            }
        }
        static initKeyCodeMap() {
            this.KeyCodeDic[65] = "A";
            this.KeyCodeDic[66] = "B";
            this.KeyCodeDic[67] = "C";
            this.KeyCodeDic[68] = "D";
            this.KeyCodeDic[69] = "E";
            this.KeyCodeDic[70] = "F";
            this.KeyCodeDic[71] = "G";
            this.KeyCodeDic[72] = "H";
            this.KeyCodeDic[73] = "I";
            this.KeyCodeDic[74] = "J";
            this.KeyCodeDic[75] = "K";
            this.KeyCodeDic[76] = "L";
            this.KeyCodeDic[77] = "M";
            this.KeyCodeDic[78] = "N";
            this.KeyCodeDic[79] = "O";
            this.KeyCodeDic[80] = "P";
            this.KeyCodeDic[81] = "Q";
            this.KeyCodeDic[82] = "R";
            this.KeyCodeDic[83] = "S";
            this.KeyCodeDic[84] = "T";
            this.KeyCodeDic[85] = "U";
            this.KeyCodeDic[86] = "V";
            this.KeyCodeDic[87] = "W";
            this.KeyCodeDic[88] = "X";
            this.KeyCodeDic[89] = "Y";
            this.KeyCodeDic[90] = "Z";
            this.KeyCodeDic[32] = "SPACE";
            this.KeyCodeDic[27] = "ESC";
        }
    }
    Keyboard.KeyCodeDic = {
        65: "A",
        66: "B",
        67: "C",
        68: "D",
        69: "E",
        70: "F",
        71: "G",
        72: "H",
        73: "I",
        74: "J",
        75: "K",
        76: "L",
        77: "M",
        78: "N",
        79: "O",
        80: "P",
        81: "Q",
        82: "R",
        83: "S",
        84: "T",
        85: "U",
        86: "V",
        87: "W",
        88: "X",
        89: "Y",
        90: "Z",
        32: "SPACE",
        27: "ESC",
    };
    Keyboard.StateInfo = {};
    Keyboard.KeyEvent = {};
    Keyboard.anyKeyEvent = {};
    Keyboard.keyDic = {};

    /**
     * 对应mouseevent 的button
     */
    class Input {
        // static mousePosition: Vec2 = Vec2.create();
        static init(canvas) {
            Mouse.init(canvas);
            Keyboard.init();
        }
        static getKeyDown(key) {
            let state = Keyboard.StateInfo[key];
            return state || false;
        }
        static getMouseDown(key) {
            let state = Mouse.StateInfo[key];
            return state || false;
        }
        static addMouseEventListener(eventType, func, key = MouseKeyEnum.None) {
            if (Mouse.MouseEvent[key] == null) {
                Mouse.MouseEvent[key] = {};
            }
            if (Mouse.MouseEvent[key][eventType] == null) {
                Mouse.MouseEvent[key][eventType] = [];
            }
            Mouse.MouseEvent[key][eventType].push(func);
        }
        //    static addMouseWheelEventListener(func:(ev:MouseWheelEvent)=>void)
        //    {
        //        let key=MouseKeyEnum.None;
        //        let ev=MouseEventEnum.Rotate;
        //        if(Mouse.MouseEvent[key]==null)
        //        {
        //            Mouse.MouseEvent[key]={};
        //        }
        //        if(Mouse.MouseEvent[key][ev]==null)
        //        {
        //            Mouse.MouseEvent[key][ev]=[];
        //        }
        //        Mouse.MouseEvent[key][ev].push(func);
        //    }
        static addKeyCodeEventListener(eventType, func, key = null) {
            if (key == null) {
                if (Keyboard.anyKeyEvent[eventType] == null) {
                    Keyboard.anyKeyEvent[eventType] = [];
                }
                Keyboard.anyKeyEvent[eventType].push(func);
            }
            else {
                if (Keyboard.KeyEvent[key] == null) {
                    Keyboard.KeyEvent[key] = {};
                }
                if (Keyboard.KeyEvent[key][eventType] == null) {
                    Keyboard.KeyEvent[key][eventType] = [];
                }
                Keyboard.KeyEvent[key][eventType].push(func);
            }
        }
    }

    let CameraController = class CameraController {
        constructor() {
            this.moveSpeed = 0.2;
            this.movemul = 5;
            this.wheelSpeed = 1;
            this.rotateSpeed = 0.1;
            this.keyMap = {};
            this.beRightClick = false;
            this.rotAngle = Vec3.create();
            this.inverseDir = -1;
            this.moveVector = Vec3.create();
            this.camrot = Quat.create();
        }
        update(frameState) {
            this.doMove(frameState.deltaTime);
        }
        dispose() { }
        active() {
            Quat.ToEuler(this.entity.transform.localRotation, this.rotAngle);
            Input.addMouseEventListener(MouseEventEnum.Move, ev => {
                if (Input.getMouseDown(MouseKeyEnum.Right)) {
                    this.doRotate(ev.movementX, ev.movementY);
                }
            });
            Input.addKeyCodeEventListener(KeyCodeEventEnum.Up, ev => {
                this.moveSpeed = 0.2;
            });
            Input.addMouseEventListener(MouseEventEnum.Rotate, ev => {
                this.doMouseWheel(ev);
            });
            // Input.addMouseWheelEventListener((ev)=>{
            //     this.doMouseWheel(ev);
            // })
        }
        doMove(delta) {
            if (this.entity.getCompByName("Camera") == null)
                return;
            if (Input.getMouseDown(MouseKeyEnum.Right)) {
                if (Input.getKeyDown(KeyCodeEnum.A)) {
                    this.moveSpeed += this.movemul * delta;
                    this.entity.transform.getRightInWorld(this.moveVector);
                    Vec3.scale(this.moveVector, -1 * this.moveSpeed * delta, this.moveVector);
                    // vec3.scale(this.moveVector,this.inverseDir,this.moveVector);
                    Vec3.add(this.entity.transform.localPosition, this.moveVector, this.entity.transform.localPosition);
                }
                if (Input.getKeyDown(KeyCodeEnum.D)) {
                    this.moveSpeed += this.movemul * delta;
                    this.entity.transform.getRightInWorld(this.moveVector);
                    Vec3.scale(this.moveVector, this.moveSpeed * delta, this.moveVector);
                    // vec3.scale(this.moveVector,this.inverseDir,this.moveVector);
                    Vec3.add(this.entity.transform.localPosition, this.moveVector, this.entity.transform.localPosition);
                }
                if (Input.getKeyDown(KeyCodeEnum.W)) {
                    this.moveSpeed += this.movemul * delta;
                    this.entity.transform.getForwardInWorld(this.moveVector);
                    Vec3.scale(this.moveVector, this.moveSpeed * delta, this.moveVector);
                    Vec3.scale(this.moveVector, this.inverseDir, this.moveVector);
                    Vec3.add(this.entity.transform.localPosition, this.moveVector, this.entity.transform.localPosition);
                }
                if (Input.getKeyDown(KeyCodeEnum.S)) {
                    this.moveSpeed += this.movemul * delta;
                    this.entity.transform.getForwardInWorld(this.moveVector);
                    Vec3.scale(this.moveVector, -1 * this.moveSpeed * delta, this.moveVector);
                    Vec3.scale(this.moveVector, this.inverseDir, this.moveVector);
                    Vec3.add(this.entity.transform.localPosition, this.moveVector, this.entity.transform.localPosition);
                }
                if (Input.getKeyDown(KeyCodeEnum.E)) {
                    this.moveSpeed += this.movemul * delta;
                    Vec3.scale(Vec3.UP, this.moveSpeed * delta, this.moveVector);
                    Vec3.add(this.entity.transform.localPosition, this.moveVector, this.entity.transform.localPosition);
                }
                if (Input.getKeyDown(KeyCodeEnum.Q)) {
                    this.moveSpeed += this.movemul * delta;
                    Vec3.scale(Vec3.DOWN, this.moveSpeed * delta, this.moveVector);
                    Vec3.add(this.entity.transform.localPosition, this.moveVector, this.entity.transform.localPosition);
                }
                this.entity.transform.markDirty();
            }
        }
        doRotate(rotateX, rotateY) {
            // this.rotAngle[0] += rotateY * this.rotateSpeed;
            // this.rotAngle[1] += rotateX * this.rotateSpeed;
            // this.rotAngle[0] %= 360;
            // this.rotAngle[1] %= 360;
            Quat.FromEuler(0, rotateX * this.rotateSpeed * this.inverseDir, 0, this.camrot);
            Quat.multiply(this.camrot, this.entity.transform.localRotation, this.entity.transform.localRotation);
            Quat.FromEuler(rotateY * this.rotateSpeed * this.inverseDir, 0, 0, this.camrot);
            Quat.multiply(this.entity.transform.localRotation, this.camrot, this.entity.transform.localRotation);
            this.entity.transform.markDirty();
        }
        doMouseWheel(ev) {
            if (this.entity.getCompByName("Camera") == null)
                return;
            this.entity.transform.getForwardInWorld(this.moveVector);
            Vec3.scale(this.moveVector, this.wheelSpeed * ev.rotateDelta * 0.01 * this.inverseDir, this.moveVector);
            Vec3.add(this.entity.transform.localPosition, this.moveVector, this.entity.transform.localPosition);
            this.entity.transform.markDirty();
        }
        Dispose() { }
    };
    CameraController = __decorate([
        EC.RegComp
    ], CameraController);

    class Entity {
        constructor(name = null, compsArr = null) {
            this.maskLayer = CullingMask.default;
            this.components = {};
            this.guid = newId();
            this.name = name != null ? name : "newEntity";
            this.beActive = true;
            this._transform = EC.NewComponent("Transform");
            this._transform.entity = this;
            if (compsArr != null) {
                for (let i = 0; i < compsArr.length; i++) {
                    this.addCompByName(compsArr[i]);
                }
            }
        }
        get transform() {
            return this._transform;
        }
        addCompByName(name) {
            let comp = EC.NewComponent(name);
            this.components[name] = comp;
            comp.entity = this;
            return comp;
        }
        getCompByName(compName) {
            return this.components[compName];
        }
        addComp(comp) {
            this.components[comp.constructor.name] = comp;
            comp.entity = this;
            return comp;
        }
        removeCompByName(name) {
            if (this.components[name]) {
                this.components[name].dispose();
                delete this.components[name];
            }
        }
        dispose() {
            for (let key in this.components) {
                this.components[key].dispose();
            }
            this.components = null;
        }
    }
    function newId() {
        return newId.prototype.id++;
    }
    newId.prototype.id = -1;

    class FrameState {
        constructor() {
            this.renderList = [];
            this.cameraList = [];
        }
        reInit() {
            this.renderList.length = 0;
            this.cameraList.length = 0;
        }
    }

    class Scene {
        constructor(render) {
            this.root = new Entity().transform;
            this.frameState = new FrameState();
            this.render = render;
        }
        newEntity(name = null, compsArr = null) {
            let newobj = new Entity(name, compsArr);
            this.addEntity(newobj);
            return newobj;
        }
        addEntity(entity) {
            this.root.addChild(entity.transform);
        }
        addCamera() {
            let entity = this.newEntity("camer", ["Camera"]);
            return entity.getCompByName("Camera");
        }
        foreachRootNodes(func) {
            for (let i = 0; i < this.root.children.length; i++) {
                func(this.root.children[i]);
            }
        }
        update(deltatime) {
            if (this.preUpdate) {
                this.preUpdate(deltatime);
            }
            this.frameState.reInit();
            this.frameState.deltaTime = deltatime;
            this.foreachRootNodes(node => {
                this._updateNode(node, this.frameState);
            });
            this.frameState.cameraList.sort((a, b) => {
                return a.priority - b.priority;
            });
            for (let i = 0; i < this.frameState.cameraList.length; i++) {
                let cam = this.frameState.cameraList[i];
                let arr = this.frameState.renderList.filter(item => {
                    return this.maskCheck(cam.cullingMask, item) && this.frusumCheck(cam.frustum, item);
                });
                this.render.drawCamera(cam, arr);
            }
        }
        _updateNode(node, frameState) {
            let entity = node.entity;
            if (!entity.beActive)
                return;
            for (const key in node.entity.components) {
                node.entity.components[key].update(frameState);
            }
            for (let i = 0, len = node.children.length; i < len; i++) {
                this._updateNode(node.children[i], frameState);
            }
        }
        frusumCheck(frustum, item) {
            return frustum.intersectRender(item);
        }
        maskCheck(maskLayer, item) {
            return (item.maskLayer & maskLayer) !== 0;
        }
    }

    /**
     * The game time class.
     */
    class GameTimer {
        constructor() {
            this.beActive = false;
            this.TimeScale = 1.0;
            this.updateList = [];
            this.FPS = 60;
            this.active();
        }
        active() {
            this.beActive = true;
            this.frameUpdate();
        }
        disActive() {
            this.beActive = false;
        }
        get Time() {
            return this.totalTime * 0.001;
        }
        get DeltaTime() {
            return this.deltaTime * this.TimeScale * 0.001;
        }
        update() {
            let now = Date.now();
            this.deltaTime = now - this.lastTimer;
            this.lastTimer = now;
            let realDetal = this.deltaTime * this.TimeScale;
            if (this.beActive != null) {
                if (this.tick != null) {
                    this.tick(realDetal);
                }
                for (let i = 0; i < this.updateList.length; i++) {
                    this.updateList[i](realDetal);
                }
            }
        }
        addListenToTimerUpdate(func) {
            this.updateList.push(func);
        }
        removeListenToTimerUpdate(func) {
            this.updateList.forEach(item => {
                if (item == func) {
                    let index = this.updateList.indexOf(func);
                    this.updateList.splice(index, 1);
                    return;
                }
            });
        }
        removeAllListener() {
            this.updateList.length = 0;
        }
        frameUpdate() {
            if (this.FPS != this._lastFrameRate) {
                //----------帧率被修改
                this.FPS = Math.min(this.FPS, 60);
                this.FPS = Math.max(this.FPS, 0);
                if (this.IntervalLoop != null) {
                    clearInterval(this.IntervalLoop);
                    this.IntervalLoop = null;
                }
                this._lastFrameRate = this.FPS;
            }
            if (this.FPS == 60) {
                this.update();
                requestAnimationFrame(this.frameUpdate.bind(this));
            }
            else {
                if (this.IntervalLoop == null) {
                    this.IntervalLoop = setInterval(() => {
                        this.update();
                        this.frameUpdate();
                    }, 1000 / this.FPS);
                }
            }
        }
    }

    // import { IassetMgr } from "./resources/type";
    class ToyGL {
        // setupRender(canvas: HTMLCanvasElement) {}
        static initByHtmlElement(element) {
            let canvas;
            if (element instanceof HTMLDivElement) {
                canvas = document.createElement("canvas");
                canvas.width = element.clientWidth;
                canvas.width = element.clientHeight;
                element.appendChild(canvas);
                canvas.style.width = "100%";
                canvas.style.height = "100%";
            }
            else {
                canvas = element;
            }
            Input.init(canvas);
            let render = new RenderMachine(canvas);
            let scene = new Scene(render);
            GameScreen.init(canvas);
            new GameTimer().tick = deltaTime => {
                GameScreen.update();
                scene.update(deltaTime);
            };
            let toy = new ToyGL();
            toy.scene = scene;
            return toy;
        }
    }

    var LoadEnum;
    (function (LoadEnum) {
        LoadEnum["Success"] = "Success";
        LoadEnum["Failed"] = "Failed";
        LoadEnum["Loading"] = "Loading";
        LoadEnum["None"] = "None";
    })(LoadEnum || (LoadEnum = {}));

    //通过url获取资源的名称(包含尾缀)
    function getFileName(url) {
        let filei = url.lastIndexOf("/");
        let file = url.substr(filei + 1);
        return file;
    }
    // static getAssetExtralType(url: string): AssetExtralEnum {
    //     let index = url.lastIndexOf("/");
    //     let filename = url.substr(index + 1);
    //     index = filename.indexOf(".", 0);
    //     let extname = filename.substr(index);
    //     let type = this.ExtendNameDic[extname];
    //     if (type == null) {
    //         console.warn("Load Asset Failed.type:(" + type + ") not have loader yet");
    //     }
    //     return type;
    // }
    function getAssetExtralName(url) {
        let index = url.lastIndexOf("/");
        let filename = url.substr(index + 1);
        index = filename.indexOf(".", 0);
        let extname = filename.substr(index);
        return extname;
    }
    function getAssetFlode(url) {
        let filei = url.lastIndexOf("/");
        let file = url.substr(0, filei);
        return file;
    }

    /**
     * 资源都继承web3dAsset 实现Iasset接口,有唯一ID
     *
     * assetmgr仅仅管理load进来的资源
     * load过的资源再次load不会造成重复加载
     * 所有的资源都是从资源管理器load（url）出来，其他接口全部封闭
     * 资源的来源有三种：new、load、内置资源
     * bundle包不会shared asset,bundle不会相互依赖。即如果多个bundle引用同一个asset,每个包都包含一份该资源.
     *
     *
     * 资源释放：
     * gameobject（new或instance的）通过dispose 销毁自己的内存，不销毁引用的asset
     * asset 可以通过dispose 销毁自己的内存。包释放(prefab/scene/gltfbundle)也属于asset的释放,包会释放自己依赖的asset。
     *
     */
    class AssetLoader {
        static RegisterAssetLoader(extral, factory) {
            // this.ExtendNameDic[extral] = type;
            console.warn("loader type:", extral);
            this.RESLoadDic[extral] = factory;
        }
        static getAssetLoader(url) {
            let extralType = getAssetExtralName(url);
            let factory = this.RESLoadDic[extralType];
            return factory;
        }
        // //-------------------资源加载拓展
        // static RegisterAssetExtensionLoader(extral: string, factory: () => IassetLoader) {
        //     this.RESExtensionLoadDic[extral] = factory;
        // }
        // private static RESExtensionLoadDic: { [ExtralName: string]: () => IassetLoader } = {};
        static addLoader() {
            return __awaiter(this, void 0, void 0, function* () {
                yield Promise.resolve().then(function () { return loadTxt; }).then(mod => {
                    this.RegisterAssetLoader(".txt", new mod.LoadTxt());
                });
                yield Promise.resolve().then(function () { return loadShader; }).then(mod => {
                    this.RegisterAssetLoader(".shader.json", new mod.LoadShader());
                });
                yield Promise.resolve().then(function () { return loadTexture; }).then(mod => {
                    this.RegisterAssetLoader(".png", new mod.LoadTextureSample());
                    this.RegisterAssetLoader(".jpg", new mod.LoadTextureSample());
                });
                yield Promise.resolve().then(function () { return loadglTF; }).then(mod => {
                    this.RegisterAssetLoader(".gltf", new mod.LoadGlTF());
                });
            });
        }
    }
    //private static ExtendNameDic: { [name: string]: AssetExtralEnum } = {};
    AssetLoader.RESLoadDic = {};
    //<<<<<<<--------1.  new出来的自己管理,如果进行管控,assetmgr必然持有该资源的引用。当用该资源的对象被释放,该对象对该资源的引用也就没了,但是assetmgr持有它的引用，资源也就是没被释放;
    //释放对象的时候我们又不能对资源进行释放，不然其他对象使用该资源就会报错，对于new出的资源,没被使用就会被系统自动释放或者自己释放-------------------->>>>>>>>>
    //<<<<<<<------- 2.  资源的name不作为asset的标识.不然造成一大堆麻烦。如果允许重名资源在assetmgr获取资源的需要通过bundlename /assetname才能正确获取资源,bundlename于asset来说不一定有;
    //new asset的时候还要检查重名资源,允许还是不允许都是麻烦—--->>>>>>>>>>>>>>>>>>>>>>>
    //<<<<<<<--------3.  资源本身的描述json，不会被作为资源被assetmgr管理起来-->>>

    class ResID {
        static next() {
            let next = ResID.idAll;
            ResID.idAll++;
            return next;
        }
    }
    ResID.idAll = 0;
    class ToyAsset {
        constructor(param) {
            this.guid = ResID.next();
            this.name = (param && param.name) || "asset_" + this.guid;
            this.URL = param && param.URL;
            this.beDefaultAsset = (param && param.beDefaultAsset) || false;
        }
    }

    class Geometry extends ToyAsset {
        constructor(param) {
            super(param);
        }
        dispose() { }
        static fromCustomData(data) {
            let geometry = GlRender.createGeometry(data);
            let newAsset = new Geometry({ name: "custom_Mesh" });
            newAsset.data = geometry;
            return newAsset;
        }
        getAttArr(type) {
            if (this.attDic[type] != null) {
                return this.attDic[type];
            }
            else {
                if (this.data.atts[type] != null) {
                    this.attDic[type] = getTypedValueArr(type, this.data.atts[VertexAttEnum.POSITION]);
                }
                else {
                    console.warn("geometry don't contain vertex type:", type);
                }
                return this.attDic[type];
            }
        }
    }
    /**
     * 将buffer数据分割成对应的 typedarray，例如 positions[i]=new floa32array();
     * @param newGeometry
     * @param geometryOp
     */
    function getTypedValueArr(key, element) {
        let strideInBytes = element.strideInBytes || glTypeToByteSize(element.componentDataType) * element.componentSize;
        let dataArr = [];
        for (let i = 0; i < element.count; i++) {
            let value = getTypedArry(element.componentDataType, element.value, i * strideInBytes + element.offsetInBytes, element.componentSize);
            dataArr.push(value);
        }
        return dataArr;
    }
    function glTypeToByteSize(type) {
        switch (type) {
            case GlConstants$1.BYTE:
                return Int8Array.BYTES_PER_ELEMENT;
            case GlConstants$1.UNSIGNED_BYTE:
                return Uint8Array.BYTES_PER_ELEMENT;
            case GlConstants$1.SHORT:
                return Int16Array.BYTES_PER_ELEMENT;
            case GlConstants$1.UNSIGNED_SHORT:
                return Uint16Array.BYTES_PER_ELEMENT;
            case GlConstants$1.UNSIGNED_INT:
                return Uint32Array.BYTES_PER_ELEMENT;
            case GlConstants$1.FLOAT:
                return Float32Array.BYTES_PER_ELEMENT;
            default:
                throw new Error(`Invalid component type ${type}`);
        }
    }
    function getTypedArry(componentType, bufferview, byteOffset, Len) {
        let buffer = bufferview.buffer;
        byteOffset = bufferview.byteOffset + (byteOffset || 0);
        switch (componentType) {
            case GlConstants$1.BYTE:
                return new Int8Array(buffer, byteOffset, Len);
            case GlConstants$1.UNSIGNED_BYTE:
                return new Uint8Array(buffer, byteOffset, Len);
            case GlConstants$1.SHORT:
                return new Int16Array(buffer, byteOffset, Len);
            case GlConstants$1.UNSIGNED_SHORT:
                return new Uint16Array(buffer, byteOffset, Len);
            case GlConstants$1.UNSIGNED_INT:
                return new Uint32Array(buffer, byteOffset, Len);
            case GlConstants$1.FLOAT: {
                if ((byteOffset / 4) % 1 != 0) {
                    console.error("??");
                }
                return new Float32Array(buffer, byteOffset, Len);
            }
            default:
                throw new Error(`Invalid component type ${componentType}`);
        }
    }

    class DefGeometry {
        static fromType(type) {
            if (this.defGeometry[type] == null) {
                let gemetryinfo;
                switch (type) {
                    case "quad":
                        gemetryinfo = GlRender.createGeometry({
                            atts: {
                                POSITION: [-0.5, -0.5, 0, -0.5, 0.5, 0, 0.5, 0.5, 0, 0.5, -0.5, 0],
                                TEXCOORD_0: [0, 1, 0, 0, 1, 0, 1, 1],
                            },
                            indices: [0, 2, 1, 0, 3, 2],
                        });
                        break;
                    case "cube":
                        gemetryinfo = this.createCube();
                        break;
                    default:
                        console.warn("Unkowned default mesh type:", type);
                        return null;
                }
                if (gemetryinfo != null) {
                    this.defGeometry[type] = new Geometry({ name: "def_" + type, beDefaultAsset: true });
                    this.defGeometry[type].data = gemetryinfo;
                }
            }
            return this.defGeometry[type];
        }
        static createCube() {
            let bassInf = {
                posarr: [],
                uvArray: [],
                indices: [],
            };
            this.addQuad(bassInf, [-0.5, -0.5, 0.5, -0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, -0.5, 0.5], [0, 1, 0, 0, 1, 0, 1, 1], [0, 2, 1, 0, 3, 2]); //前
            this.addQuad(bassInf, [-0.5, -0.5, -0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5, 0.5, -0.5, -0.5], [0, 1, 0, 0, 1, 0, 1, 1], [0, 1, 2, 0, 2, 3]); //后
            this.addQuad(bassInf, [-0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5, 0.5, -0.5, -0.5, -0.5, -0.5], [0, 1, 0, 0, 1, 0, 1, 1], [0, 1, 2, 0, 2, 3]); //左
            this.addQuad(bassInf, [0.5, -0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, -0.5, 0.5, -0.5, -0.5], [0, 1, 0, 0, 1, 0, 1, 1], [0, 2, 1, 0, 3, 2]); //右
            this.addQuad(bassInf, [-0.5, 0.5, 0.5, -0.5, 0.5, -0.5, 0.5, 0.5, -0.5, 0.5, 0.5, 0.5], [0, 1, 0, 0, 1, 0, 1, 1], [0, 2, 1, 0, 3, 2]); //上
            this.addQuad(bassInf, [-0.5, -0.5, 0.5, -0.5, -0.5, -0.5, 0.5, -0.5, -0.5, 0.5, -0.5, 0.5], [0, 1, 0, 0, 1, 0, 1, 1], [0, 1, 2, 0, 2, 3]); //上
            return GlRender.createGeometry({
                atts: {
                    POSITION: bassInf.posarr,
                    TEXCOORD_0: bassInf.uvArray,
                },
                indices: bassInf.indices,
            });
        }
        static addQuad(bassInf, posarr, uvArray, indices) {
            let maxIndex = bassInf.posarr.length / 3;
            for (let i = 0; i < posarr.length; i++) {
                bassInf.posarr.push(posarr[i]);
            }
            for (let i = 0; i < uvArray.length; i++) {
                bassInf.uvArray.push(uvArray[i]);
            }
            for (let i = 0; i < indices.length; i++) {
                bassInf.indices.push(maxIndex + indices[i]);
            }
        }
    }
    DefGeometry.defGeometry = {};

    class Material extends ToyAsset {
        constructor(param) {
            super(param);
            this.uniforms = {};
            this._dirty = false;
            this.queue = 0;
        }
        set shader(value) {
            this._program = value;
            this._dirty = true;
        }
        get shader() {
            return this._program;
        }
        set layer(value) {
            this._layer = value;
        }
        get layer() {
            return this._layer || (this._program && this._program.layer) || RenderLayerEnum.Geometry;
        }
        setColor(key, value) {
            this.uniforms[key] = value;
        }
        setTexture(key, value) {
            this.uniforms[key] = value;
        }
        setVector4(key, value) {
            this.uniforms[key] = value;
        }
        setVector3(key, value) {
            this.uniforms[key] = value;
        }
        setFloat(key, value) {
            this.uniforms[key] = value;
        }
        dispose() { }
    }

    class Shader extends ToyAsset {
        constructor(param) {
            super(param);
            this.layer = RenderLayerEnum.Geometry;
            this.queue = 0;
        }
        static fromCustomData(data) {
            let newAsset = new Shader({ name: data.name || "custom_shader" });
            newAsset.layer = data.layer || RenderLayerEnum.Geometry;
            newAsset.queue = data.queue != null ? data.queue : 0;
            let features = data.feature != null ? [...data.feature, "base"] : ["base"];
            let passes = data.passes;
            let featurePasses = {};
            for (let i = 0; i < features.length; i++) {
                let type = features[i];
                let featureStr = getFeaturShderStr(type);
                let programArr = [];
                for (let i = 0; i < passes.length; i++) {
                    let passitem = passes[i];
                    let program = GlRender.createProgram({
                        program: {
                            vs: featureStr + passitem.program.vs,
                            fs: featureStr + passitem.program.fs,
                            name: null,
                        },
                        states: passitem.states,
                        uniforms: passitem.uniforms,
                    });
                    programArr.push(program);
                }
                featurePasses[type] = programArr;
            }
            newAsset.passes = featurePasses;
            if (data.mapUniformDef != null) {
                newAsset.mapUniformDef = {};
                for (const key in data.mapUniformDef) {
                    const _value = data.mapUniformDef[key];
                    newAsset.mapUniformDef[key] = { value: _value, type: UniformTypeEnum.UNKOWN };
                }
            }
            return newAsset;
        }
        dispose() { }
    }
    var UniformTypeEnum;
    (function (UniformTypeEnum) {
        UniformTypeEnum[UniformTypeEnum["FLOAT"] = 0] = "FLOAT";
        UniformTypeEnum[UniformTypeEnum["FLOAT_VEC2"] = 1] = "FLOAT_VEC2";
        UniformTypeEnum[UniformTypeEnum["FLOAT_VEC3"] = 2] = "FLOAT_VEC3";
        UniformTypeEnum[UniformTypeEnum["FLOAT_VEC4"] = 3] = "FLOAT_VEC4";
        UniformTypeEnum[UniformTypeEnum["TEXTURE"] = 4] = "TEXTURE";
        UniformTypeEnum[UniformTypeEnum["UNKOWN"] = 5] = "UNKOWN";
    })(UniformTypeEnum || (UniformTypeEnum = {}));
    function getFeaturShderStr(type) {
        switch (type) {
            case "base":
                return "";
            case "fog":
                return "#define FOG \n";
            case "skin":
                return "#define SKIN \n";
            case "skin_fog":
                return "#define SKIN \n" + "#define FOG \n";
            case "lightmap":
                return "#define LIGHTMAP \n";
            case "lightmap_fog":
                return "#define LIGHTMAP \n" + "#define FOG \n";
            case "instance":
                return "#define INSTANCE \n";
        }
    }

    class DefShader {
        static fromType(type) {
            if (this.defShader[type] == null) {
                switch (type) {
                    case "color":
                        this.defShader[type] = this.createColorShader();
                        break;
                    case "base":
                        this.defShader[type] = this.createBaseShder();
                        break;
                    case "baseTex":
                        this.defShader[type] = this.createBaseTexShder();
                        break;
                    case "alphaTex":
                        this.defShader[type] = this.createAlphaTestShder();
                        break;
                    default:
                        console.warn("Unkowned default shader type:", type);
                        return null;
                }
            }
            return this.defShader[type];
        }
        static createColorShader() {
            let colorVs = "\
          attribute vec3 POSITION;\
          void main()\
          {\
              highp vec4 tmplet_1=vec4(POSITION.xyz,1.0);\
              gl_Position = tmplet_1;\
          }";
            let colorFs = "\
            uniform highp vec4 MainColor;\
            void main()\
            {\
                gl_FragData[0] = MainColor;\
            }";
            return Shader.fromCustomData({
                passes: [
                    {
                        program: {
                            vs: colorVs,
                            fs: colorFs,
                            name: "defcolor",
                        },
                        states: {
                            enableCullFace: false,
                        },
                    },
                ],
                name: "def_color",
            });
        }
        static createBaseShder() {
            let baseVs = "\
          attribute vec3 POSITION;\
          uniform highp mat4 u_mat_mvp;\
          void main()\
          {\
              highp vec4 tmplet_1=vec4(POSITION.xyz,1.0);\
              gl_Position = u_mat_mvp * tmplet_1;\
          }";
            let baseFs = "\
            uniform highp vec4 MainColor;\
            void main()\
            {\
                gl_FragData[0] = MainColor;\
            }";
            return Shader.fromCustomData({
                passes: [
                    {
                        program: {
                            vs: baseVs,
                            fs: baseFs,
                        },
                        states: {
                            enableCullFace: false,
                        },
                    },
                ],
                name: "def_base",
            });
        }
        static createBaseTexShder() {
            let baseVs = "\
          attribute vec3 POSITION;\
          attribute vec3 TEXCOORD_0;\
          uniform highp mat4 u_mat_mvp;\
          varying mediump vec2 xlv_TEXCOORD0;\
          void main()\
          {\
              highp vec4 tmplet_1=vec4(POSITION.xyz,1.0);\
              xlv_TEXCOORD0 = TEXCOORD_0.xy;\
              gl_Position = u_mat_mvp * tmplet_1;\
          }";
            let baseFs = "\
            uniform highp vec4 MainColor;\
            varying mediump vec2 xlv_TEXCOORD0;\
            uniform lowp sampler2D _MainTex;\
            void main()\
            {\
                gl_FragData[0] = texture2D(_MainTex, xlv_TEXCOORD0);\
            }";
            return Shader.fromCustomData({
                passes: [
                    {
                        program: {
                            vs: baseVs,
                            fs: baseFs,
                        },
                        states: {
                        // enableCullFace: false,
                        },
                    },
                ],
                name: "def_baseTex",
            });
        }
        static createAlphaTestShder() {
            let baseVs = "\
          attribute vec3 POSITION;\
          attribute vec2 TEXCOORD_0;\
          uniform highp mat4 u_mat_mvp;\
          varying mediump vec2 xlv_TEXCOORD0;\
          void main()\
          {\
              highp vec4 tmplet_1=vec4(POSITION.xyz,1.0);\
              xlv_TEXCOORD0 = TEXCOORD_0.xy;\
              gl_Position = u_mat_mvp * tmplet_1;\
          }";
            let baseFs = "\
            uniform highp vec4 MainColor;\
            uniform lowp float _AlphaCut;\
            varying mediump vec2 xlv_TEXCOORD0;\
            uniform lowp sampler2D _MainTex;\
            void main()\
            {\
                lowp vec4 basecolor = texture2D(_MainTex, xlv_TEXCOORD0);\
                if(basecolor.a < _AlphaCut)\
                {\
                    discard;\
                }\
                gl_FragData[0] = basecolor;\
            }";
            return Shader.fromCustomData({
                passes: [
                    {
                        program: {
                            vs: baseVs,
                            fs: baseFs,
                        },
                        states: {
                            enableCullFace: false,
                        },
                    },
                ],
                mapUniformDef: {
                    _AlphaCut: 0.5,
                },
                name: "def_alphaTex",
            });
        }
    }
    DefShader.defShader = {};

    class Texture extends ToyAsset {
        get texture() {
            return this._textrue || GlTextrue.WHITE;
        }
        set texture(value) {
            this._textrue = value;
        }
        // samplerInfo: TextureOption = new TextureOption();
        constructor(param) {
            super(param);
        }
        dispose() { }
    }

    class DefTextrue {
        static get WHITE() {
            if (this._white == null) {
                this._white = this.createByType("white");
            }
            return this._white;
        }
        static get GIRD() {
            if (this._grid == null) {
                this._grid = this.createByType("grid");
            }
            return this._grid;
        }
        static createByType(type) {
            let imaginfo;
            switch (type) {
                case "white":
                    imaginfo = GlTextrue.WHITE;
                    break;
                case "grid":
                    imaginfo = GlTextrue.GIRD;
                    break;
            }
            if (imaginfo != null) {
                let tex = new Texture();
                tex.texture = imaginfo.texture;
                tex.texDes = imaginfo.texDes;
                return tex;
            }
            else {
                return null;
            }
        }
    }

    class LookAt {
        static done(toy) {
            let geometry = DefGeometry.fromType("cube");
            let centerEnity = toy.scene.newEntity("center", ["Mesh"]);
            let rotEntity = toy.scene.newEntity("center", ["Mesh"]);
            let mesh = centerEnity.getCompByName("Mesh");
            mesh.geometry = geometry;
            mesh.material = new Material();
            mesh.material.shader = DefShader.fromType("baseTex");
            mesh.material.setTexture("_MainTex", DefTextrue.GIRD);
            let rotMesh = rotEntity.getCompByName("Mesh");
            rotMesh.geometry = geometry;
            rotMesh.material = mesh.material;
            rotMesh.entity.transform.localScale.z = 3;
            let cam = toy.scene.addCamera();
            cam.entity.transform.localPosition.y = 20;
            cam.entity.transform.localRotation = Quat.FromEuler(-90, 0, 0);
            cam.entity.transform.markDirty();
            let rot = 0;
            toy.scene.preUpdate = delta => {
                rot += delta * 0.1;
                rotEntity.transform.localPosition.x = 10 * Math.cos((rot * Math.PI) / 180);
                rotEntity.transform.localPosition.z = 10 * Math.sin((rot * Math.PI) / 180);
                rotEntity.transform.markDirty();
                rotEntity.transform.lookAtPoint(Vec3.ZERO);
            };
        }
    }

    window.onload = () => {
        let toy = ToyGL.initByHtmlElement(document.getElementById("canvas"));
        AssetLoader.addLoader().then(() => {
            // Base.done(toy);
            // LoadGltf.done(toy);
            LookAt.done(toy);
        });
    };

    class TextAsset extends ToyAsset {
        constructor(name, url) {
            super({ name: name, URL: url });
            this.content = null;
        }
        dispose() {
            if (this.beDefaultAsset)
                return;
            this.content = null;
        }
    }

    var ResponseTypeEnum;
    (function (ResponseTypeEnum) {
        ResponseTypeEnum["text"] = "text";
        ResponseTypeEnum["json"] = "json";
        ResponseTypeEnum["blob"] = "blob";
        ResponseTypeEnum["arraybuffer"] = "arraybuffer";
    })(ResponseTypeEnum || (ResponseTypeEnum = {}));
    function httpRequeset(url, type, onProgress = null) {
        return new Promise((resolve, reject) => {
            let req = new XMLHttpRequest();
            req.open("GET", url);
            req.responseType = type;
            req.onprogress = e => {
                if (onProgress) {
                    onProgress({ loaded: e.loaded, total: e.total });
                }
            };
            req.onerror = e => {
                reject(e);
            };
            req.send();
            req.onreadystatechange = () => {
                if (req.readyState == 4) {
                    if (req.status == 404) {
                        reject(new Error("got a 404:" + url));
                        return;
                    }
                    resolve(req.response);
                }
            };
        });
    }
    function loadJson(url, onProgress = null) {
        return httpRequeset(url, ResponseTypeEnum.json, onProgress);
    }
    function loadText(url, onProgress = null) {
        return httpRequeset(url, ResponseTypeEnum.text, onProgress);
    }
    function loadArrayBuffer(url, onProgress = null) {
        return httpRequeset(url, ResponseTypeEnum.arraybuffer, onProgress);
    }
    function loadImg(url, onProgress = null) {
        return new Promise((resolve, reject) => {
            let img = new Image();
            img.src = url;
            img.onerror = error => {
                reject(error);
            };
            img.onload = () => {
                resolve(img);
            };
            img.onprogress = e => {
                if (onProgress) {
                    onProgress({ loaded: e.loaded, total: e.total });
                }
            };
        });
    }

    class LoadTxt {
        load(url, onFinish, onProgress) {
            let name = getFileName(url);
            let text = new TextAsset(name, url);
            loadText(url, info => {
                if (onProgress) {
                    onProgress(info.loaded / info.total);
                }
            })
                .then(value => {
                text.content = value;
                if (onFinish) {
                    onFinish(text, { url: url, loadState: LoadEnum.Success });
                }
            })
                .catch(error => {
                let errorMsg = "ERROR:Load Txt/json Error!\n  Info: LOAD URL: " + url + "  LOAD MSG:" + error.message;
                if (onFinish) {
                    onFinish(text, { url: url, loadState: LoadEnum.Failed, err: new Error(errorMsg) });
                }
            });
            return text;
        }
    }
    // const _loadtxt: LoadTxt = new LoadTxt();
    // AssetMgr.RegisterAssetLoader(".vs.glsl", () => _loadtxt);
    // AssetMgr.RegisterAssetLoader(".fs.glsl", () => _loadtxt);
    // AssetMgr.RegisterAssetLoader(".txt", () => _loadtxt);

    var loadTxt = /*#__PURE__*/Object.freeze({
        LoadTxt: LoadTxt
    });

    class Vec2 extends Float32Array {
        constructor(x = 0, y = 0) {
            super(2);
            this[0] = x;
            this[1] = y;
        }
        get x() {
            return this[0];
        }
        set x(value) {
            this[0] = value;
        }
        get y() {
            return this[1];
        }
        set y(value) {
            this[1] = value;
        }
        static create(x = 0, y = 0) {
            if (Vec2.Recycle && Vec2.Recycle.length > 0) {
                let item = Vec2.Recycle.pop();
                item[0] = x;
                item[1] = y;
                return item;
            }
            else {
                let item = new Vec2(x, y);
                // item[0]=x;
                // item[1]=y;
                return item;
            }
        }
        static clone(from) {
            if (Vec2.Recycle.length > 0) {
                let item = Vec2.Recycle.pop();
                Vec2.copy(from, item);
                return item;
            }
            else {
                let item = new Vec2(from[0], from[1]);
                // item[0]=from[0];
                // item[1]=from[1];
                return item;
            }
        }
        static recycle(item) {
            Vec2.Recycle.push(item);
        }
        static disposeRecycledItems() {
            Vec2.Recycle.length = 0;
        }
        /**
         * Copy the values from one vec2 to another
         *
         * @param out the receiving vector
         * @param a the source vector
         * @returns out
         */
        static copy(a, out = Vec2.create()) {
            out[0] = a[0];
            out[1] = a[1];
            return out;
        }
        /**
         * Adds two vec2's
         *
         * @param out the receiving vector
         * @param a the first operand
         * @param b the second operand
         * @returns out
         */
        static add(a, b, out = Vec2.create()) {
            out[0] = a[0] + b[0];
            out[1] = a[1] + b[1];
            return out;
        }
        /**
         * Subtracts vector b from vector a
         *
         * @param out the receiving vector
         * @param a the first operand
         * @param b the second operand
         * @returns out
         */
        static subtract(a, b, out = Vec2.create()) {
            out[0] = a[0] - b[0];
            out[1] = a[1] - b[1];
            return out;
        }
        /**
         * Multiplies two vec2's
         *
         * @param out the receiving vector
         * @param a the first operand
         * @param b the second operand
         * @returns out
         */
        static multiply(a, b, out = Vec2.create()) {
            out[0] = a[0] * b[0];
            out[1] = a[1] * b[1];
            return out;
        }
        /**
         * Multiplies two vec2's
         *
         * @param out the receiving vector
         * @param a the first operand
         * @param b the second operand
         * @returns out
         */
        //public static mul(a: vec2, b: vec2,out: Vec2 = Vec2.create()): vec2 { return; }
        /**
         * Divides two vec2's
         *
         * @param out the receiving vector
         * @param a the first operand
         * @param b the second operand
         * @returns out
         */
        static divide(a, b, out = Vec2.create()) {
            out[0] = a[0] / b[0];
            out[1] = a[1] / b[1];
            return out;
        }
        /**
         * Divides two vec2's
         *
         * @param out the receiving vector
         * @param a the first operand
         * @param b the second operand
         * @returns out
         */
        //public static div(a: vec2, b: vec2,out: Vec2 = Vec2.create()): vec2 { return; }
        /**
         * Math.ceil the components of a vec2
         *
         * @param {Vec2} out the receiving vector
         * @param {Vec2} a vector to ceil
         * @returns {Vec2} out
         */
        static ceil(a, out = Vec2.create()) {
            out[0] = Math.ceil(a[0]);
            out[1] = Math.ceil(a[1]);
            return out;
        }
        /**
         * Math.floor the components of a vec2
         *
         * @param {Vec2} out the receiving vector
         * @param {Vec2} a vector to floor
         * @returns {Vec2} out
         */
        static floor(a, out = Vec2.create()) {
            out[0] = Math.floor(a[0]);
            out[1] = Math.floor(a[1]);
            return out;
        }
        /**
         * Returns the minimum of two vec2's
         *
         * @param out the receiving vector
         * @param a the first operand
         * @param b the second operand
         * @returns out
         */
        static min(a, b, out = Vec2.create()) {
            out[0] = Math.min(a[0], b[0]);
            out[1] = Math.min(a[1], b[1]);
            return out;
        }
        /**
         * Returns the maximum of two vec2's
         *
         * @param out the receiving vector
         * @param a the first operand
         * @param b the second operand
         * @returns out
         */
        static max(a, b, out = Vec2.create()) {
            out[0] = Math.max(a[0], b[0]);
            out[1] = Math.max(a[1], b[1]);
            return out;
        }
        /**
         * Math.round the components of a vec2
         *
         * @param {Vec2} out the receiving vector
         * @param {Vec2} a vector to round
         * @returns {Vec2} out
         */
        static round(a, out = Vec2.create()) {
            out[0] = Math.round(a[0]);
            out[1] = Math.round(a[1]);
            return out;
        }
        /**
         * Scales a vec2 by a scalar number
         *
         * @param out the receiving vector
         * @param a the vector to scale
         * @param b amount to scale the vector by
         * @returns out
         */
        static scale(a, b, out = Vec2.create()) {
            out[0] = a[0] * b;
            out[1] = a[1] * b;
            return out;
        }
        static scaleByVec2(a, b, out = Vec2.create()) {
            out[0] = a[0] * b[0];
            out[1] = a[1] * b[1];
            return out;
        }
        /**
         * Adds two vec2's after scaling the second operand by a scalar value
         *
         * @param out the receiving vector
         * @param a the first operand
         * @param b the second operand
         * @param scale the amount to scale b by before adding
         * @returns out
         */
        static scaleAndAdd(a, b, scale, out = Vec2.create()) {
            out[0] = a[0] + b[0] * scale;
            out[1] = a[1] + b[1] * scale;
            return out;
        }
        /**
         * Calculates the euclidian distance between two vec2's
         *
         * @param a the first operand
         * @param b the second operand
         * @returns distance between a and b
         */
        static distance(a, b) {
            let x = b[0] - a[0], y = b[1] - a[1];
            return Math.sqrt(x * x + y * y);
        }
        /**
         * Calculates the euclidian distance between two vec2's
         *
         * @param a the first operand
         * @param b the second operand
         * @returns distance between a and b
         */
        //public static dist(a: vec2, b: vec2): number { return; }
        /**
         * Calculates the squared euclidian distance between two vec2's
         *
         * @param a the first operand
         * @param b the second operand
         * @returns squared distance between a and b
         */
        static squaredDistance(a, b) {
            let x = b[0] - a[0], y = b[1] - a[1];
            return x * x + y * y;
        }
        /**
         * Calculates the squared euclidian distance between two vec2's
         *
         * @param a the first operand
         * @param b the second operand
         * @returns squared distance between a and b
         */
        //public static sqrDist(a: vec2, b: vec2): number { return; }
        /**
         * Calculates the length of a vec2
         *
         * @param a vector to calculate length of
         * @returns length of a
         */
        static length_(a) {
            let x = a[0], y = a[1];
            return Math.sqrt(x * x + y * y);
        }
        /**
         * Calculates the length of a vec2
         *
         * @param a vector to calculate length of
         * @returns length of a
         */
        //public static len(a: vec2): number { return; }
        /**
         * Calculates the squared length of a vec2
         *
         * @param a vector to calculate squared length of
         * @returns squared length of a
         */
        static squaredLength(a) {
            let x = a[0], y = a[1];
            return x * x + y * y;
        }
        /**
         * Calculates the squared length of a vec2
         *
         * @param a vector to calculate squared length of
         * @returns squared length of a
         */
        //public static sqrLen(a: vec2): number { return; }
        /**
         * Negates the components of a vec2
         *
         * @param out the receiving vector
         * @param a vector to negate
         * @returns out
         */
        static negate(a, out = Vec2.create()) {
            out[0] = -a[0];
            out[1] = -a[1];
            return out;
        }
        /**
         * Returns the inverse of the components of a vec2
         *
         * @param out the receiving vector
         * @param a vector to invert
         * @returns out
         */
        static inverse(a, out = Vec2.create()) {
            out[0] = 1.0 / a[0];
            out[1] = 1.0 / a[1];
            return out;
        }
        /**
         * Normalize a vec2
         *
         * @param out the receiving vector
         * @param a vector to normalize
         * @returns out
         */
        static normalize(a, out = Vec2.create()) {
            let x = a[0], y = a[1];
            let len = x * x + y * y;
            if (len > 0) {
                //TODO: evaluate use of glm_invsqrt here?
                len = 1 / Math.sqrt(len);
                out[0] = a[0] * len;
                out[1] = a[1] * len;
            }
            return out;
        }
        /**
         * Calculates the dot product of two vec2's
         *
         * @param a the first operand
         * @param b the second operand
         * @returns dot product of a and b
         */
        static dot(a, b) {
            return a[0] * b[0] + a[1] * b[1];
        }
        /**
         * Computes the cross product of two vec2's
         * Note that the cross product must by definition produce a 3D vector
         *
         * @param out the receiving vector
         * @param a the first operand
         * @param b the second operand
         * @returns out
         */
        static cross(a, b, out) {
            let z = a[0] * b[1] - a[1] * b[0];
            out[0] = out[1] = 0;
            out[2] = z;
            return out;
        }
        /**
         * Performs a linear interpolation between two vec2's
         *
         * @param out the receiving vector
         * @param from the first operand
         * @param to the second operand
         * @param lerp interpolation amount between the two inputs
         * @returns out
         */
        static lerp(from, to, lerp$$1, out = Vec2.create()) {
            let ax = from[0], ay = from[1];
            out[0] = ax + lerp$$1 * (to[0] - ax);
            out[1] = ay + lerp$$1 * (to[1] - ay);
            return out;
        }
        /**
         * Generates a random vector with the given scale
         *
         * @param out the receiving vector
         * @param scale Length of the resulting vector. If ommitted, a unit vector will be returned
         * @returns out
         */
        static random(scale = 1, out = Vec2.create()) {
            scale = scale || 1.0;
            let r = Math.random() * 2.0 * Math.PI;
            out[0] = Math.cos(r) * scale;
            out[1] = Math.sin(r) * scale;
            return out;
        }
        // /**
        //  * Transforms the vec2 with a mat2
        //  *
        //  * @param out the receiving vector
        //  * @param a the vector to transform
        //  * @param m matrix to transform with
        //  * @returns out
        //  */
        // public static transformMat2(out: Vec2 = Vec2.create(), a: vec2, m: mat2): vec2 {
        //     let x = a[0],
        //     y = a[1];
        //     out[0] = m[0] * x + m[2] * y;
        //     out[1] = m[1] * x + m[3] * y;
        //     return out;
        // }
        /**
         * Transforms the vec2 with a Mat2d
         *
         * @param out the receiving vector
         * @param a the vector to transform
         * @param m matrix to transform with
         * @returns out
         */
        static transformMat2d(a, m, out = Vec2.create()) {
            let x = a[0], y = a[1];
            out[0] = m[0] * x + m[2] * y + m[4];
            out[1] = m[1] * x + m[3] * y + m[5];
            return out;
        }
        // /**
        //  * Transforms the vec2 with a mat3
        //  * 3rd vector component is implicitly '1'
        //  *
        //  * @param out the receiving vector
        //  * @param a the vector to transform
        //  * @param m matrix to transform with
        //  * @returns out
        //  */
        // public static transformMat3(out: Vec2 = Vec2.create(), a: vec2, m: mat3): vec2 {
        //     let x = a[0],
        //     y = a[1];
        //     out[0] = m[0] * x + m[3] * y + m[6];
        //     out[1] = m[1] * x + m[4] * y + m[7];
        //     return out;
        // }
        /**
         * Transforms the vec2 with a Mat4
         * 3rd vector component is implicitly '0'
         * 4th vector component is implicitly '1'
         *
         * @param out the receiving vector
         * @param a the vector to transform
         * @param m matrix to transform with
         * @returns out
         */
        static transformMat4(a, m, out = Vec2.create()) {
            let x = a[0];
            let y = a[1];
            out[0] = m[0] * x + m[4] * y + m[12];
            out[1] = m[1] * x + m[5] * y + m[13];
            return out;
        }
        // /**
        //  * Perform some operation over an array of vec2s.
        //  *
        //  * @param a the array of vectors to iterate over
        //  * @param stride Number of elements between the start of each vec2. If 0 assumes tightly packed
        //  * @param offset Number of elements to skip at the beginning of the array
        //  * @param count Number of vec2s to iterate over. If 0 iterates over entire array
        //  * @param fn Function to call for each vector in the array
        //  * @param arg additional argument to pass to fn
        //  * @returns a
        //  */
        // public static forEach(a: Float32Array, stride: number, offset: number, count: number,
        //     fn: (a: vec2, b: vec2, arg: any) => void, arg: any): Float32Array { return; }
        // /**
        //  * Perform some operation over an array of vec2s.
        //  *
        //  * @param a the array of vectors to iterate over
        //  * @param stride Number of elements between the start of each vec2. If 0 assumes tightly packed
        //  * @param offset Number of elements to skip at the beginning of the array
        //  * @param count Number of vec2s to iterate over. If 0 iterates over entire array
        //  * @param fn Function to call for each vector in the array
        //  * @returns a
        //  */
        // public static forEach(a: Float32Array, stride: number, offset: number, count: number,
        //     fn: (a: vec2, b: vec2) => void): Float32Array {
        // }
        /**
         * Returns a string representation of a vector
         *
         * @param a vector to represent as a string
         * @returns string representation of the vector
         */
        static str(a) {
            return "vec2(" + a[0] + ", " + a[1] + ")";
        }
        /**
         * Returns whether or not the vectors exactly have the same elements in the same position (when compared with ===)
         *
         * @param {Vec2} a The first vector.
         * @param {Vec2} b The second vector.
         * @returns {boolean} True if the vectors are equal, false otherwise.
         */
        static exactEquals(a, b) {
            return a[0] === b[0] && a[1] === b[1];
        }
        /**
         * Returns whether or not the vectors have approximately the same elements in the same position.
         *
         * @param {Vec2} a The first vector.
         * @param {Vec2} b The second vector.
         * @returns {boolean} True if the vectors are equal, false otherwise.
         */
        static equals(a, b) {
            let a0 = a[0], a1 = a[1];
            let b0 = b[0], b1 = b[1];
            return Math.abs(a0 - b0) <= EPSILON && Math.abs(a1 - b1) <= EPSILON;
        }
    }
    Vec2.Recycle = [];

    class Vec4 extends Float32Array {
        constructor(x = 0, y = 0, z = 0, w = 0) {
            super(4);
            this[0] = x;
            this[1] = y;
            this[2] = z;
            this[3] = w;
        }
        get x() {
            return this[0];
        }
        set x(value) {
            this[0] = value;
        }
        get y() {
            return this[1];
        }
        set y(value) {
            this[1] = value;
        }
        get z() {
            return this[2];
        }
        set z(value) {
            this[2] = value;
        }
        get w() {
            return this[3];
        }
        set w(value) {
            this[3] = value;
        }
        static create(x = 0, y = 0, z = 0, w = 0) {
            if (Vec4.Recycle && Vec4.Recycle.length > 0) {
                let item = Vec4.Recycle.pop();
                item[0] = x;
                item[1] = y;
                item[2] = z;
                item[3] = w;
                return item;
            }
            else {
                let item = new Vec4(x, y, z, w);
                // item[0]=x;
                // item[1]=y;
                // item[2]=z;
                // item[3]=w;
                return item;
            }
        }
        static clone(from) {
            if (Vec4.Recycle.length > 0) {
                let item = Vec4.Recycle.pop();
                Vec4.copy(from, item);
                return item;
            }
            else {
                let item = new Vec4(from[0], from[1], from[2], from[3]);
                // item[0]=from[0];
                // item[1]=from[1];
                // item[2]=from[2];
                // item[3]=from[3];
                return item;
            }
        }
        static recycle(item) {
            Vec4.Recycle.push(item);
        }
        static disposeRecycledItems() {
            Vec4.Recycle.length = 0;
        }
        /**
         * Copy the values from one vec4 to another
         *
         * @param out the receiving vector
         * @param a the source vector
         * @returns out
         */
        static copy(a, out = Vec4.create()) {
            out[0] = a[0];
            out[1] = a[1];
            out[2] = a[2];
            out[3] = a[3];
            return out;
        }
        /**
         * Adds two vec4's
         *
         * @param out the receiving vector
         * @param a the first operand
         * @param b the second operand
         * @returns out
         */
        static add(a, b, out = Vec4.create()) {
            out[0] = a[0] + b[0];
            out[1] = a[1] + b[1];
            out[2] = a[2] + b[2];
            out[3] = a[3] + b[3];
            return out;
        }
        /**
         * Subtracts vector b from vector a
         *
         * @param a the first operand
         * @param b the second operand
         * @param out the receiving vector
         * @returns out
         */
        static subtract(a, b, out = Vec4.create()) {
            out[0] = a[0] - b[0];
            out[1] = a[1] - b[1];
            out[2] = a[2] - b[2];
            out[3] = a[3] - b[3];
            return out;
        }
        /**
         * Multiplies two vec4's
         *
         * @param a the first operand
         * @param b the second operand
         * @param out the receiving vector         *
         * @returns out
         */
        static multiply(a, b, out = Vec4.create()) {
            out[0] = a[0] * b[0];
            out[1] = a[1] * b[1];
            out[2] = a[2] * b[2];
            out[3] = a[3] * b[3];
            return out;
        }
        /**
         * Divides two vec4's
         *
         * @param out the receiving vector
         * @param a the first operand
         * @param b the second operand
         * @returns out
         */
        static divide(a, b, out = Vec4.create()) {
            out[0] = a[0] / b[0];
            out[1] = a[1] / b[1];
            out[2] = a[2] / b[2];
            out[3] = a[3] / b[3];
            return out;
        }
        /**
         * Math.ceil the components of a vec4
         *
         * @param {Vec4} a vector to ceil
         * @param {Vec4} out the receiving vector
         * @returns {Vec4} out
         */
        static ceil(a, out = Vec4.create()) {
            out[0] = Math.ceil(a[0]);
            out[1] = Math.ceil(a[1]);
            out[2] = Math.ceil(a[2]);
            out[3] = Math.ceil(a[3]);
            return out;
        }
        /**
         * Math.floor the components of a vec4
         *
         * @param {Vec4} a vector to floor
         * @param {Vec4} out the receiving vector         *
         * @returns {Vec4} out
         */
        static floor(a, out = Vec4.create()) {
            out[0] = Math.floor(a[0]);
            out[1] = Math.floor(a[1]);
            out[2] = Math.floor(a[2]);
            out[3] = Math.floor(a[3]);
            return out;
        }
        /**
         * Returns the minimum of two vec4's
         *
         * @param out the receiving vector
         * @param a the first operand
         * @param b the second operand
         * @returns out
         */
        static min(a, b, out = Vec4.create()) {
            out[0] = Math.min(a[0], b[0]);
            out[1] = Math.min(a[1], b[1]);
            out[2] = Math.min(a[2], b[2]);
            out[3] = Math.min(a[3], b[3]);
            return out;
        }
        /**
         * Returns the maximum of two vec4's
         *
         * @param out the receiving vector
         * @param a the first operand
         * @param b the second operand
         * @returns out
         */
        static max(a, b, out = Vec4.create()) {
            out[0] = Math.max(a[0], b[0]);
            out[1] = Math.max(a[1], b[1]);
            out[2] = Math.max(a[2], b[2]);
            out[3] = Math.max(a[3], b[3]);
            return out;
        }
        /**
         * Math.round the components of a vec4
         *
         * @param {Vec4} out the receiving vector
         * @param {Vec4} a vector to round
         * @returns {Vec4} out
         */
        static round(a, out = Vec4.create()) {
            out[0] = Math.round(a[0]);
            out[1] = Math.round(a[1]);
            out[2] = Math.round(a[2]);
            out[3] = Math.round(a[3]);
            return out;
        }
        /**
         * Scales a vec4 by a scalar number
         *
         * @param out the receiving vector
         * @param a the vector to scale
         * @param b amount to scale the vector by
         * @returns out
         */
        static scale(a, b, out = Vec4.create()) {
            out[0] = a[0] * b;
            out[1] = a[1] * b;
            out[2] = a[2] * b;
            out[3] = a[3] * b;
            return out;
        }
        /**
         * Adds two vec4's after scaling the second operand by a scalar value
         *
         * @param out the receiving vector
         * @param a the first operand
         * @param b the second operand
         * @param scale the amount to scale b by before adding
         * @returns out
         */
        static scaleAndAdd(a, b, scale, out = Vec4.create()) {
            out[0] = a[0] + b[0] * scale;
            out[1] = a[1] + b[1] * scale;
            out[2] = a[2] + b[2] * scale;
            out[3] = a[3] + b[3] * scale;
            return out;
        }
        /**
         * Calculates the euclidian distance between two vec4's
         *
         * @param a the first operand
         * @param b the second operand
         * @returns distance between a and b
         */
        static distance(a, b) {
            let x = b[0] - a[0];
            let y = b[1] - a[1];
            let z = b[2] - a[2];
            let w = b[3] - a[3];
            return Math.sqrt(x * x + y * y + z * z + w * w);
        }
        /**
         * Calculates the squared euclidian distance between two vec4's
         *
         * @param a the first operand
         * @param b the second operand
         * @returns squared distance between a and b
         */
        static squaredDistance(a, b) {
            let x = b[0] - a[0];
            let y = b[1] - a[1];
            let z = b[2] - a[2];
            let w = b[3] - a[3];
            return x * x + y * y + z * z + w * w;
        }
        /**
         * Calculates the length of a vec4
         *
         * @param a vector to calculate length of
         * @returns length of a
         */
        static length_(a) {
            let x = a[0];
            let y = a[1];
            let z = a[2];
            let w = a[3];
            return Math.sqrt(x * x + y * y + z * z + w * w);
        }
        /**
         * Calculates the squared length of a vec4
         *
         * @param a vector to calculate squared length of
         * @returns squared length of a
         */
        static squaredLength(a) {
            let x = a[0];
            let y = a[1];
            let z = a[2];
            let w = a[3];
            return x * x + y * y + z * z + w * w;
        }
        /**
         * Negates the components of a vec4
         *
         * @param out the receiving vector
         * @param a vector to negate
         * @returns out
         */
        static negate(a, out = Vec4.create()) {
            out[0] = -a[0];
            out[1] = -a[1];
            out[2] = -a[2];
            out[3] = -a[3];
            return out;
        }
        /**
         * Returns the inverse of the components of a vec4
         *
         * @param out the receiving vector
         * @param a vector to invert
         * @returns out
         */
        static inverse(a, out = Vec4.create()) {
            out[0] = 1.0 / a[0];
            out[1] = 1.0 / a[1];
            out[2] = 1.0 / a[2];
            out[3] = 1.0 / a[3];
            return out;
        }
        /**
         * Normalize a vec4
         *
         * @param out the receiving vector
         * @param a vector to normalize
         * @returns out
         */
        static normalize(a, out = Vec4.create()) {
            let x = a[0];
            let y = a[1];
            let z = a[2];
            let w = a[3];
            let len = x * x + y * y + z * z + w * w;
            if (len > 0) {
                len = 1 / Math.sqrt(len);
                out[0] = x * len;
                out[1] = y * len;
                out[2] = z * len;
                out[3] = w * len;
            }
            return out;
        }
        /**
         * Calculates the dot product of two vec4's
         *
         * @param a the first operand
         * @param b the second operand
         * @returns dot product of a and b
         */
        static dot(a, b) {
            return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
        }
        /**
         * Performs a linear interpolation between two vec4's
         *
         * @param out the receiving vector
         * @param lhs the first operand
         * @param rhs the second operand
         * @param lerp interpolation amount between the two inputs
         * @returns out
         */
        static lerp(lhs, rhs, lerp$$1, out = Vec4.create()) {
            let ax = lhs[0];
            let ay = lhs[1];
            let az = lhs[2];
            let aw = lhs[3];
            out[0] = ax + lerp$$1 * (rhs[0] - ax);
            out[1] = ay + lerp$$1 * (rhs[1] - ay);
            out[2] = az + lerp$$1 * (rhs[2] - az);
            out[3] = aw + lerp$$1 * (rhs[3] - aw);
            return out;
        }
        /**
         * Generates a random vector with the given scale
         *
         * @param out the receiving vector
         * @param scale length of the resulting vector. If ommitted, a unit vector will be returned
         * @returns out
         */
        static random(scale, out = Vec4.create()) {
            scale = scale || 1.0;
            //TODO: This is a pretty awful way of doing this. Find something better.
            out[0] = Math.random();
            out[1] = Math.random();
            out[2] = Math.random();
            out[3] = Math.random();
            Vec4.normalize(out, out);
            Vec4.scale(out, scale, out);
            return out;
        }
        /**
         * Transforms the vec4 with a Mat4.
         *
         * @param out the receiving vector
         * @param a the vector to transform
         * @param m matrix to transform with
         * @returns out
         */
        static transformMat4(a, m, out = Vec4.create()) {
            let x = a[0], y = a[1], z = a[2], w = a[3];
            out[0] = m[0] * x + m[4] * y + m[8] * z + m[12] * w;
            out[1] = m[1] * x + m[5] * y + m[9] * z + m[13] * w;
            out[2] = m[2] * x + m[6] * y + m[10] * z + m[14] * w;
            out[3] = m[3] * x + m[7] * y + m[11] * z + m[15] * w;
            return out;
        }
        /**
         * Transforms the vec4 with a Quat
         *
         * @param out the receiving vector
         * @param a the vector to transform
         * @param q Quaternion to transform with
         * @returns out
         */
        static transformQuat(a, q, out = Vec4.create()) {
            let x = a[0], y = a[1], z = a[2];
            let qx = q[0], qy = q[1], qz = q[2], qw = q[3];
            // calculate Quat * vec
            let ix = qw * x + qy * z - qz * y;
            let iy = qw * y + qz * x - qx * z;
            let iz = qw * z + qx * y - qy * x;
            let iw = -qx * x - qy * y - qz * z;
            // calculate result * inverse Quat
            out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
            out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
            out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
            out[3] = a[3];
            return out;
        }
        // /**
        //  * Perform some operation over an array of vec4s.
        //  *
        //  * @param a the array of vectors to iterate over
        //  * @param stride Number of elements between the start of each vec4. If 0 assumes tightly packed
        //  * @param offset Number of elements to skip at the beginning of the array
        //  * @param count Number of vec4s to iterate over. If 0 iterates over entire array
        //  * @param fn Function to call for each vector in the array
        //  * @param arg additional argument to pass to fn
        //  * @returns a
        //  * @function
        //  */
        // public static forEach(a: Float32Array, stride: number, offset: number, count: number,
        //                       fn: (a: vec4, b: vec4, arg: any) => void, arg: any): Float32Array;
        // /**
        //  * Perform some operation over an array of vec4s.
        //  *
        //  * @param a the array of vectors to iterate over
        //  * @param stride Number of elements between the start of each vec4. If 0 assumes tightly packed
        //  * @param offset Number of elements to skip at the beginning of the array
        //  * @param count Number of vec4s to iterate over. If 0 iterates over entire array
        //  * @param fn Function to call for each vector in the array
        //  * @returns a
        //  * @function
        //  */
        // public static forEach(a: Float32Array, stride: number, offset: number, count: number,
        //                       fn: (a: vec4, b: vec4) => void): Float32Array;
        /**
         * Returns a string representation of a vector
         *
         * @param a vector to represent as a string
         * @returns string representation of the vector
         */
        static str(a) {
            return "vec4(" + a[0] + ", " + a[1] + ", " + a[2] + ", " + a[3] + ")";
        }
        /**
         * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
         *
         * @param {Vec4} a The first vector.
         * @param {Vec4} b The second vector.
         * @returns {boolean} True if the vectors are equal, false otherwise.
         */
        static exactEquals(a, b) {
            return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
        }
        /**
         * Returns whether or not the vectors have approximately the same elements in the same position.
         *
         * @param {Vec4} a The first vector.
         * @param {Vec4} b The second vector.
         * @returns {boolean} True if the vectors are equal, false otherwise.
         */
        static equals(a, b) {
            let a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
            let b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
            return (Math.abs(a0 - b0) <= EPSILON * Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
                Math.abs(a1 - b1) <= EPSILON * Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
                Math.abs(a2 - b2) <= EPSILON * Math.max(1.0, Math.abs(a2), Math.abs(b2)) &&
                Math.abs(a3 - b3) <= EPSILON * Math.max(1.0, Math.abs(a3), Math.abs(b3)));
        }
    }
    Vec4.Recycle = [];

    const textureRegexp = /([_0-9a-zA-Z]+)[ ]*\([ ]*'(.+)'[ ]*,[ ]*([0-9a-zA-Z]+)[ ]*\)[ ]*=[ ]*'(.+)'[ ]*\{[ ]*([a-zA-Z]*)[ ]*([a-zA-Z]*)[ ]*\}/;
    const vector4regexp = /([_0-9a-zA-Z]+)[ ]*\([ ]*'(.+)'[ ]*,[ ]*([0-9a-zA-Z]+)[ ]*\)[ ]*=[ ]*\([ ]*([0-9.-]+)[ ]*,[ ]*([0-9.-]+)[ ]*,[ ]*([0-9.-]+)[ ]*,[ ]*([0-9.-]+)[ ]*\)/;
    const vector3regexp = /([_0-9a-zA-Z]+)[ ]*\([ ]*'(.+)'[ ]*,[ ]*([0-9a-zA-Z]+)[ ]*\)[ ]*=[ ]*\([ ]*([0-9.-]+)[ ]*,[ ]*([0-9.-]+)[ ]*,[ ]*([0-9.-]+)[ ]*\)/;
    const vector2regexp = /([_0-9a-zA-Z]+)[ ]*\([ ]*'(.+)'[ ]*,[ ]*([0-9a-zA-Z]+)[ ]*\)[ ]*=[ ]*\([ ]*([0-9.-]+)[ ]*,[ ]*([0-9.-]+)[ ]*\)/;
    const floatRegexp = /([_0-9a-zA-Z]+)[ ]*\([ ]*'(.+)'[ ]*,[ ]*([0-9a-zA-Z]+)[ ]*\)[ ]*=[ ]*([0-9.-]+)/;
    const rangeRegexp = /([_0-9a-zA-Z]+)[ ]*\([ ]*'(.+)'[ ]*,[ ]*([0-9a-zA-Z]+)[ ]*\([ ]*([0-9.-]+)[ ]*,[ ]*([0-9.-]+)[ ]*\)[ ]*\)[ ]*=[ ]*([0-9.-]+)/;
    function getShaderLayerFromStr(strLayer) {
        switch (strLayer) {
            case "Background":
                return RenderLayerEnum.Background;
            case "transparent":
                return RenderLayerEnum.Transparent;
            case "Geometry":
                return RenderLayerEnum.Geometry;
        }
    }
    class LoadShader {
        constructor() {
            LoadShader.drawtypeDic["base"] = DrawTypeEnum.BASE;
            LoadShader.drawtypeDic["fog"] = DrawTypeEnum.FOG;
            LoadShader.drawtypeDic["skin"] = DrawTypeEnum.SKIN;
            LoadShader.drawtypeDic["skin_fog"] = DrawTypeEnum.SKIN | DrawTypeEnum.FOG;
            LoadShader.drawtypeDic["lightmap"] = DrawTypeEnum.LIGHTMAP;
            LoadShader.drawtypeDic["lightmap_fog"] = DrawTypeEnum.LIGHTMAP | DrawTypeEnum.FOG;
            LoadShader.drawtypeDic["instance"] = DrawTypeEnum.INSTANCe;
        }
        load(url, onFinish, onProgress) {
            let name = getFileName(url);
            let shader = new Shader({ name: name, URL: url });
            loadText(url)
                .then(txt => {
                let json = JSON.parse(txt);
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
                    let errorMsg = "ERROR: parse shader Error!\n Info: LOAD URL: " + url + "  LOAD MSG:" + error.message;
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
        static parseProperties(properties, name) {
            let mapUniformDef = {};
            for (let index in properties) {
                let property = properties[index];
                //检测字符串格式有无错误
                let words = property.match(floatRegexp);
                if (words == null)
                    words = property.match(rangeRegexp);
                if (words == null)
                    words = property.match(vector4regexp);
                if (words == null)
                    words = property.match(vector3regexp);
                if (words == null)
                    words = property.match(vector2regexp);
                if (words == null)
                    words = property.match(textureRegexp);
                if (words == null) {
                    let errorMsg = "ERROR:  parse shader(" +
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
                            let _vector = Vec4.create(parseFloat(words[4]), parseFloat(words[5]), parseFloat(words[6]), parseFloat(words[7]));
                            mapUniformDef[key] = { type: UniformTypeEnum.FLOAT_VEC4, value: _vector };
                            break;
                        case "texture":
                            mapUniformDef[key] = { type: UniformTypeEnum.TEXTURE, value: null }; //words[4]
                            break;
                        case "cubetexture":
                            mapUniformDef[key] = { type: UniformTypeEnum.TEXTURE, value: null };
                            break;
                        default:
                            let errorMsg = "ERROR: parse shader(" +
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
        static ParseShaderPass(features, json, shaderFolderUrl, name) {
            let passes = {};
            let featureArr = [];
            for (let i = 0; i < features.length; i++) {
                let type = features[i];
                let featureStr = getFeaturShderStr(type);
                let taskArr = [];
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
    LoadShader.drawtypeDic = {};

    var loadShader = /*#__PURE__*/Object.freeze({
        LoadShader: LoadShader
    });

    class LoadTextureSample {
        load(url, onFinish, onProgress) {
            let name = getFileName(url);
            let texture = new Texture({ name: name, URL: url });
            loadImg(url)
                .then(img => {
                let imaginfo = GlRender.createTextureFromImg(img);
                texture.texture = imaginfo.texture;
                texture.texDes = imaginfo.texDes;
                if (onFinish) {
                    onFinish(texture, { url: url, loadState: LoadEnum.Success });
                }
            })
                .catch(err => {
                let errorMsg = "ERROR: Load Image Error!\n Info: LOAD URL: " + url + "  LOAD MSG:" + err.message;
                if (onFinish) {
                    onFinish(texture, { url: url, loadState: LoadEnum.Failed, err: new Error(errorMsg) });
                }
            });
            return texture;
        }
    }
    class LoadTextureDes {
        load(url, onFinish, onProgress) {
            let name = getFileName(url);
            let texture = new Texture({ name: name, URL: url });
            //-------------load image des
            loadText(url)
                .then(txt => {
                let desjson = JSON.parse(txt);
                let imgName = desjson.texture;
                let desname = getFileName(url);
                let imgurl = url.replace(desname, imgName);
                loadImg(imgurl)
                    .then(img => {
                    let imaginfo = GlRender.createTextureFromImg(img);
                    texture.texture = imaginfo.texture;
                    texture.texDes = imaginfo.texDes;
                    if (onFinish) {
                        onFinish(texture, { url: url, loadState: LoadEnum.Success });
                    }
                })
                    .catch(err => {
                    let errorMsg = "ERROR: Load Image Error!\n Info: LOAD URL: " + url + "  LOAD MSG:" + err.message;
                    if (onFinish) {
                        onFinish(texture, { url: url, loadState: LoadEnum.Failed, err: new Error(errorMsg) });
                    }
                });
            })
                .catch(err => {
                let errorMsg = "ERROR: Load Image Des Error!\n Info: LOAD URL: " + url + "  LOAD MSG:" + err.message;
            });
            return texture;
        }
    }

    var loadTexture = /*#__PURE__*/Object.freeze({
        LoadTextureSample: LoadTextureSample,
        LoadTextureDes: LoadTextureDes
    });

    class GltfAsset extends ToyAsset {
        constructor(param) {
            super(param);
        }
        dispose() { }
    }

    class BinReader {
        constructor(buf, seek = 0) {
            this._arrayBuffer = buf;
            this._byteOffset = seek;
            this._data = new DataView(buf, seek);
        }
        seek(seek) {
            this._byteOffset = seek;
        }
        peek() {
            return this._byteOffset;
        }
        getPosition() {
            return this._byteOffset;
        }
        getLength() {
            return this._data.byteLength;
        }
        canread() {
            //LogManager.Warn(this._buf.byteLength + "  &&&&&&&&&&&   " + this._seek + "    " + this._buf.buffer.byteLength);
            return this._data.byteLength - this._byteOffset;
        }
        skipBytes(len) {
            this._byteOffset += len;
        }
        readString() {
            let slen = this._data.getUint8(this._byteOffset);
            this._byteOffset++;
            let bs = "";
            for (let i = 0; i < slen; i++) {
                bs += String.fromCharCode(this._data.getUint8(this._byteOffset));
                this._byteOffset++;
            }
            return bs;
        }
        readStrLenAndContent() {
            let leng = this.readByte();
            return this.readUint8ArrToString(leng);
        }
        static _decodeBufferToText(buffer) {
            let result = "";
            const length = buffer.byteLength;
            for (let i = 0; i < length; i++) {
                result += String.fromCharCode(buffer[i]);
            }
            return result;
        }
        static utf8ArrayToString(array) {
            let ret = [];
            for (let i = 0; i < array.length; i++) {
                let cc = array[i];
                if (cc == 0)
                    break;
                let ct = 0;
                if (cc > 0xe0) {
                    ct = (cc & 0x0f) << 12;
                    cc = array[++i];
                    ct |= (cc & 0x3f) << 6;
                    cc = array[++i];
                    ct |= cc & 0x3f;
                    ret.push(String.fromCharCode(ct));
                }
                else if (cc > 0xc0) {
                    ct = (cc & 0x1f) << 6;
                    cc = array[++i];
                    ct |= (cc & 0x3f) << 6;
                    ret.push(String.fromCharCode(ct));
                }
                else if (cc > 0x80) {
                    throw new Error("InvalidCharacterError");
                }
                else {
                    ret.push(String.fromCharCode(array[i]));
                }
            }
            return ret.join("");
            //                let b = array[i];
            //    if (b > 0 && b < 16)
            //    {
            //        uri += '%0' + b.toString(16);
            //    }
            //    else if (b > 16)
            //    {
            //        uri += '%' + b.toString(16);
            //    }
            //}
            //return decodeURIComponent(uri);
        }
        // readStringUtf8(): string
        // {
        //     let length = this._data.getInt8(this._byteOffset);
        //     this._byteOffset++;
        //     let arr = new Uint8Array(length);
        //     this.readUint8Array(arr);
        //     return binReader.utf8ArrayToString(arr);
        // }
        readUint8ArrToString(length) {
            let arr = this.readUint8Array(length);
            return BinReader._decodeBufferToText(arr);
        }
        readSingle() {
            let num = this._data.getFloat32(this._byteOffset, true);
            this._byteOffset += 4;
            return num;
        }
        readDouble() {
            let num = this._data.getFloat64(this._byteOffset, true);
            this._byteOffset += 8;
            return num;
        }
        readInt8() {
            let num = this._data.getInt8(this._byteOffset);
            this._byteOffset += 1;
            return num;
        }
        readUInt8() {
            //LogManager.Warn(this._data.byteLength + "  @@@@@@@@@@@@@@@@@  " + this._seek);
            let num = this._data.getUint8(this._byteOffset);
            this._byteOffset += 1;
            return num;
        }
        readInt16() {
            //LogManager.Log(this._seek + "   " + this.length());
            let num = this._data.getInt16(this._byteOffset, true);
            this._byteOffset += 2;
            return num;
        }
        readUInt16() {
            let num = this._data.getUint16(this._byteOffset, true);
            this._byteOffset += 2;
            //LogManager.Warn("readUInt16 " + this._seek);
            return num;
        }
        readInt32() {
            let num = this._data.getInt32(this._byteOffset, true);
            this._byteOffset += 4;
            return num;
        }
        readUint32() {
            let num = this._data.getUint32(this._byteOffset, true);
            this._byteOffset += 4;
            return num;
        }
        readUint8Array(length) {
            const value = new Uint8Array(this._arrayBuffer, this._byteOffset, length);
            this._byteOffset += length;
            return value;
        }
        readUint8ArrayByOffset(target, offset, length = 0) {
            if (length < 0)
                length = target.length;
            for (let i = 0; i < length; i++) {
                target[i] = this._data.getUint8(offset);
                offset++;
            }
            return target;
        }
        set position(value) {
            this.seek(value);
        }
        get position() {
            return this.peek();
        }
        readBoolean() {
            return this.readUInt8() > 0;
        }
        readByte() {
            return this.readUInt8();
        }
        // readBytes(target: Uint8Array = null, length: number = -1): Uint8Array
        // {
        //     return this.readUint8Array(target, length);
        // }
        readUnsignedShort() {
            return this.readUInt16();
        }
        readUnsignedInt() {
            return this.readUint32();
        }
        readFloat() {
            return this.readSingle();
        }
        /// <summary>
        /// 有符号 Byte
        /// </summary>
        readSymbolByte() {
            return this.readInt8();
        }
        readShort() {
            return this.readInt16();
        }
        readInt() {
            return this.readInt32();
        }
    }

    var AccessorComponentType;
    (function (AccessorComponentType) {
        /**
         * Byte
         */
        AccessorComponentType[AccessorComponentType["BYTE"] = 5120] = "BYTE";
        /**
         * Unsigned Byte
         */
        AccessorComponentType[AccessorComponentType["UNSIGNED_BYTE"] = 5121] = "UNSIGNED_BYTE";
        /**
         * Short
         */
        AccessorComponentType[AccessorComponentType["SHORT"] = 5122] = "SHORT";
        /**
         * Unsigned Short
         */
        AccessorComponentType[AccessorComponentType["UNSIGNED_SHORT"] = 5123] = "UNSIGNED_SHORT";
        /**
         * Unsigned Int
         */
        AccessorComponentType[AccessorComponentType["UNSIGNED_INT"] = 5125] = "UNSIGNED_INT";
        /**
         * Float
         */
        AccessorComponentType[AccessorComponentType["FLOAT"] = 5126] = "FLOAT";
    })(AccessorComponentType || (AccessorComponentType = {}));
    /**
     * Specifies if the attirbute is a scalar, vector, or matrix
     */
    var AccessorType;
    (function (AccessorType) {
        /**
         * Scalar
         */
        AccessorType["SCALAR"] = "SCALAR";
        /**
         * Vector2
         */
        AccessorType["VEC2"] = "VEC2";
        /**
         * Vector3
         */
        AccessorType["VEC3"] = "VEC3";
        /**
         * Vector4
         */
        AccessorType["VEC4"] = "VEC4";
        /**
         * Matrix2x2
         */
        AccessorType["MAT2"] = "MAT2";
        /**
         * Matrix3x3
         */
        AccessorType["MAT3"] = "MAT3";
        /**
         * Matrix4x4
         */
        AccessorType["MAT4"] = "MAT4";
    })(AccessorType || (AccessorType = {}));
    /**
     * The name of the node's TRS property to modify, or the weights of the Morph Targets it instantiates
     */
    var AnimationChannelTargetPath;
    (function (AnimationChannelTargetPath) {
        /**
         * Translation
         */
        AnimationChannelTargetPath["TRANSLATION"] = "translation";
        /**
         * Rotation
         */
        AnimationChannelTargetPath["ROTATION"] = "rotation";
        /**
         * Scale
         */
        AnimationChannelTargetPath["SCALE"] = "scale";
        /**
         * Weights
         */
        AnimationChannelTargetPath["WEIGHTS"] = "weights";
    })(AnimationChannelTargetPath || (AnimationChannelTargetPath = {}));
    /**
     * Interpolation algorithm
     */
    var AnimationSamplerInterpolation;
    (function (AnimationSamplerInterpolation) {
        /**
         * The animated values are linearly interpolated between keyframes
         */
        AnimationSamplerInterpolation["LINEAR"] = "LINEAR";
        /**
         * The animated values remain constant to the output of the first keyframe, until the next keyframe
         */
        AnimationSamplerInterpolation["STEP"] = "STEP";
        /**
         * The animation's interpolation is computed using a cubic spline with specified tangents
         */
        AnimationSamplerInterpolation["CUBICSPLINE"] = "CUBICSPLINE";
    })(AnimationSamplerInterpolation || (AnimationSamplerInterpolation = {}));
    /**
     * A camera's projection.  A node can reference a camera to apply a transform to place the camera in the scene
     */
    var CameraType;
    (function (CameraType) {
        /**
         * A perspective camera containing properties to create a perspective projection matrix
         */
        CameraType["PERSPECTIVE"] = "perspective";
        /**
         * An orthographic camera containing properties to create an orthographic projection matrix
         */
        CameraType["ORTHOGRAPHIC"] = "orthographic";
    })(CameraType || (CameraType = {}));
    /**
     * The mime-type of the image
     */
    var ImageMimeType;
    (function (ImageMimeType) {
        /**
         * JPEG Mime-type
         */
        ImageMimeType["JPEG"] = "image/jpeg";
        /**
         * PNG Mime-type
         */
        ImageMimeType["PNG"] = "image/png";
    })(ImageMimeType || (ImageMimeType = {}));
    /**
     * The alpha rendering mode of the material
     */
    var MaterialAlphaMode;
    (function (MaterialAlphaMode) {
        /**
         * The alpha value is ignored and the rendered output is fully opaque
         */
        MaterialAlphaMode["OPAQUE"] = "OPAQUE";
        /**
         * The rendered output is either fully opaque or fully transparent depending on the alpha value and the specified alpha cutoff value
         */
        MaterialAlphaMode["MASK"] = "MASK";
        /**
         * The alpha value is used to composite the source and destination areas. The rendered output is combined with the background using the normal painting operation (i.e. the Porter and Duff over operator)
         */
        MaterialAlphaMode["BLEND"] = "BLEND";
    })(MaterialAlphaMode || (MaterialAlphaMode = {}));
    /**
     * The type of the primitives to render
     */
    var MeshPrimitiveMode;
    (function (MeshPrimitiveMode) {
        /**
         * Points
         */
        MeshPrimitiveMode[MeshPrimitiveMode["POINTS"] = 0] = "POINTS";
        /**
         * Lines
         */
        MeshPrimitiveMode[MeshPrimitiveMode["LINES"] = 1] = "LINES";
        /**
         * Line Loop
         */
        MeshPrimitiveMode[MeshPrimitiveMode["LINE_LOOP"] = 2] = "LINE_LOOP";
        /**
         * Line Strip
         */
        MeshPrimitiveMode[MeshPrimitiveMode["LINE_STRIP"] = 3] = "LINE_STRIP";
        /**
         * Triangles
         */
        MeshPrimitiveMode[MeshPrimitiveMode["TRIANGLES"] = 4] = "TRIANGLES";
        /**
         * Triangle Strip
         */
        MeshPrimitiveMode[MeshPrimitiveMode["TRIANGLE_STRIP"] = 5] = "TRIANGLE_STRIP";
        /**
         * Triangle Fan
         */
        MeshPrimitiveMode[MeshPrimitiveMode["TRIANGLE_FAN"] = 6] = "TRIANGLE_FAN";
    })(MeshPrimitiveMode || (MeshPrimitiveMode = {}));
    /**
     * Magnification filter.  Valid values correspond to WebGL enums: 9728 (NEAREST) and 9729 (LINEAR)
     */
    var TextureMagFilter;
    (function (TextureMagFilter) {
        /**
         * Nearest
         */
        TextureMagFilter[TextureMagFilter["NEAREST"] = 9728] = "NEAREST";
        /**
         * Linear
         */
        TextureMagFilter[TextureMagFilter["LINEAR"] = 9729] = "LINEAR";
    })(TextureMagFilter || (TextureMagFilter = {}));
    /**
     * Minification filter.  All valid values correspond to WebGL enums
     */
    var TextureMinFilter;
    (function (TextureMinFilter) {
        /**
         * Nearest
         */
        TextureMinFilter[TextureMinFilter["NEAREST"] = 9728] = "NEAREST";
        /**
         * Linear
         */
        TextureMinFilter[TextureMinFilter["LINEAR"] = 9729] = "LINEAR";
        /**
         * Nearest Mip-Map Nearest
         */
        TextureMinFilter[TextureMinFilter["NEAREST_MIPMAP_NEAREST"] = 9984] = "NEAREST_MIPMAP_NEAREST";
        /**
         * Linear Mipmap Nearest
         */
        TextureMinFilter[TextureMinFilter["LINEAR_MIPMAP_NEAREST"] = 9985] = "LINEAR_MIPMAP_NEAREST";
        /**
         * Nearest Mipmap Linear
         */
        TextureMinFilter[TextureMinFilter["NEAREST_MIPMAP_LINEAR"] = 9986] = "NEAREST_MIPMAP_LINEAR";
        /**
         * Linear Mipmap Linear
         */
        TextureMinFilter[TextureMinFilter["LINEAR_MIPMAP_LINEAR"] = 9987] = "LINEAR_MIPMAP_LINEAR";
    })(TextureMinFilter || (TextureMinFilter = {}));
    /**
     * S (U) wrapping mode.  All valid values correspond to WebGL enums
     */
    var TextureWrapMode;
    (function (TextureWrapMode) {
        /**
         * Clamp to Edge
         */
        TextureWrapMode[TextureWrapMode["CLAMP_TO_EDGE"] = 33071] = "CLAMP_TO_EDGE";
        /**
         * Mirrored Repeat
         */
        TextureWrapMode[TextureWrapMode["MIRRORED_REPEAT"] = 33648] = "MIRRORED_REPEAT";
        /**
         * Repeat
         */
        TextureWrapMode[TextureWrapMode["REPEAT"] = 10497] = "REPEAT";
    })(TextureWrapMode || (TextureWrapMode = {}));

    class ParseCameraNode {
        static parse(index, gltf) {
            let node = gltf.cameras[index];
            let cam = new Camera();
            switch (node.type) {
                case CameraType.PERSPECTIVE:
                    cam.projectionType = ProjectionEnum.PERSPECTIVE;
                    let data = node.perspective;
                    cam.fov = data.yfov;
                    cam.near = data.znear;
                    if (data.zfar) {
                        cam.far = data.zfar;
                    }
                    // if (data.aspectRatio) {
                    //     cam.aspest = data.aspectRatio;
                    // }
                    break;
                case CameraType.ORTHOGRAPHIC:
                    cam.projectionType = ProjectionEnum.ORTHOGRAPH;
                    let datao = node.orthographic;
                    cam.near = datao.znear;
                    cam.far = datao.zfar;
                    cam.size = datao.ymag;
                    // cam.aspest = datao.xmag / datao.ymag;
                    break;
            }
            return cam;
        }
    }

    class ParseBufferNode {
        static parse(index, gltf) {
            if (gltf.cache.bufferNodeCache[index]) {
                return gltf.cache.bufferNodeCache[index];
            }
            else {
                let bufferNode = gltf.buffers[index];
                let url = gltf.rootURL + "/" + bufferNode.uri;
                let task = loadArrayBuffer(url).then(buffer => {
                    return buffer;
                });
                gltf.cache.bufferNodeCache[index] = task;
                return task;
            }
        }
    }

    class ParseBufferViewNode {
        static parse(index, gltf) {
            if (gltf.cache.bufferviewNodeCache[index]) {
                return gltf.cache.bufferviewNodeCache[index];
            }
            else {
                let bufferview = gltf.bufferViews[index];
                let bufferindex = bufferview.buffer;
                let task = ParseBufferNode.parse(bufferindex, gltf).then(buffer => {
                    let viewbuffer = new Uint8Array(buffer, bufferview.byteOffset, bufferview.byteLength);
                    let stride = bufferview.byteStride;
                    // let glbuffer = bufferview.target && GlRender.createBuffer(bufferview.target, viewbuffer);
                    let glbuffer = bufferview.target && GlBuffer.fromViewData(bufferview.target, viewbuffer);
                    return { viewBuffer: viewbuffer, byteStride: stride, glBuffer: glbuffer };
                });
                gltf.cache.bufferviewNodeCache[index] = task;
                return task;
            }
        }
    }

    class ParseTextureNode {
        static parse(index, gltf) {
            if (gltf.cache.textrueNodeCache[index]) {
                return gltf.cache.textrueNodeCache[index];
            }
            else {
                if (gltf.textures == null)
                    return null;
                let node = gltf.textures[index];
                if (gltf.images == null)
                    return null;
                let imageNode = gltf.images[node.source];
                if (imageNode.uri != null) {
                    let imagUrl = gltf.rootURL + "/" + imageNode.uri;
                    let texture = new Texture({ name: name, URL: imagUrl });
                    let task = loadImg(imagUrl).then(img => {
                        let texOp = {};
                        if (node.sampler != null) {
                            let samplerinfo = gltf.samplers[node.sampler];
                            if (samplerinfo.wrapS != null) {
                                texOp.wrapS = samplerinfo.wrapS;
                            }
                            if (samplerinfo.wrapT) {
                                texOp.wrapT = samplerinfo.wrapT;
                            }
                            if (samplerinfo.magFilter) {
                                texOp.filterMax = samplerinfo.magFilter;
                            }
                            if (samplerinfo.minFilter) {
                                texOp.filterMin = samplerinfo.minFilter;
                            }
                        }
                        let imaginfo = GlRender.createTextureFromImg(img, texOp);
                        texture.texture = imaginfo.texture;
                        texture.texDes = imaginfo.texDes;
                        return texture;
                    });
                    gltf.cache.textrueNodeCache[index] = task;
                    return task;
                }
                else {
                    let texture = new Texture({ name: name });
                    let task = ParseBufferViewNode.parse(imageNode.bufferView, gltf).then(viewnode => {
                        //    let bob=new Blob([viewnode.view], { type: imageNode.mimeType })
                        //    let url = URL.createObjectURL(bob);
                        //    asset= loader.loadDependAsset(url) as Texture;
                        let texOp = {}; //todo
                        if (node.sampler != null) {
                            let samplerinfo = gltf.samplers[node.sampler];
                            if (samplerinfo.wrapS != null) {
                                texOp.wrapS = samplerinfo.wrapS;
                            }
                            if (samplerinfo.wrapT) {
                                texOp.wrapT = samplerinfo.wrapT;
                            }
                            if (samplerinfo.magFilter) {
                                texOp.filterMax = samplerinfo.magFilter;
                            }
                            if (samplerinfo.minFilter) {
                                texOp.filterMin = samplerinfo.minFilter;
                            }
                        }
                        let imaginfo = GlRender.createTextureFromViewData(viewnode.viewBuffer, 100, 100, texOp);
                        texture.texture = imaginfo.texture;
                        texture.texDes = imaginfo.texDes;
                        return texture;
                    });
                    gltf.cache.textrueNodeCache[index] = task;
                    return task;
                }
                // let asset=assetMgr.load(bundle.rootURL+"/"+uri.uri) as Texture;
            }
        }
    }

    class ParseMaterialNode {
        static parse(index, gltf) {
            if (gltf.cache.materialNodeCache[index]) {
                return gltf.cache.materialNodeCache[index];
            }
            else {
                if (gltf.materials == null) {
                    return Promise.resolve(null);
                }
                let node = gltf.materials[index];
                let mat = new Material({ name: node.name });
                let shader = DefShader.fromType("alphaTex");
                mat.shader = shader;
                mat.setColor("MainColor", Color.create());
                mat.setTexture("_MainTex", DefTextrue.GIRD);
                //-------------loadshader
                // let pbrShader = assetMgr.load("resource/shader/pbr_glTF.shader.json") as Shader;
                // mat.setShader(pbrShader);
                if (node.pbrMetallicRoughness) {
                    let nodeMR = node.pbrMetallicRoughness;
                    if (nodeMR.baseColorFactor) {
                        let baseColorFactor = Vec4.create();
                        Vec4.copy(nodeMR.baseColorFactor, baseColorFactor);
                        mat.setVector4("u_BaseColorFactor", baseColorFactor);
                    }
                    if (nodeMR.metallicFactor != null) {
                        mat.setFloat("u_metalFactor", nodeMR.metallicFactor);
                    }
                    if (nodeMR.roughnessFactor != null) {
                        mat.setFloat("u_roughnessFactor", nodeMR.roughnessFactor);
                    }
                    if (nodeMR.baseColorTexture != null) {
                        let tex = ParseTextureNode.parse(nodeMR.baseColorTexture.index, gltf).then(tex => {
                            mat.setTexture("u_BaseColorSampler", tex);
                            mat.setTexture("_MainTex", tex);
                            console.warn("@@@@@@@@@", mat);
                        });
                    }
                    if (nodeMR.metallicRoughnessTexture) {
                        let tex = ParseTextureNode.parse(nodeMR.metallicRoughnessTexture.index, gltf).then(tex => {
                            mat.setTexture("u_MetallicRoughnessSampler", tex);
                        });
                    }
                }
                if (node.normalTexture) {
                    let nodet = node.normalTexture;
                    let tex = ParseTextureNode.parse(nodet.index, gltf).then(tex => {
                        mat.setTexture("u_NormalSampler", tex);
                    });
                    // mat.setTexture("u_NormalSampler",tex);
                    if (nodet.scale) {
                        mat.setFloat("u_NormalScale", nodet.scale);
                    }
                }
                if (node.emissiveTexture) {
                    let nodet = node.emissiveTexture;
                    let tex = ParseTextureNode.parse(nodet.index, gltf).then(tex => {
                        mat.setTexture("u_EmissiveSampler", tex);
                    });
                }
                if (node.emissiveFactor) {
                    let ve3 = Vec3.create();
                    Vec3.copy(node.emissiveFactor, ve3);
                    mat.setVector3("u_EmissiveFactor", ve3);
                }
                if (node.occlusionTexture) {
                    let nodet = node.occlusionTexture;
                    if (nodet.strength) {
                        mat.setFloat("u_OcclusionStrength", nodet.strength);
                    }
                }
                // let brdfTex = assetMgr.load("resource/texture/brdfLUT.imgdes.json") as Texture;
                // mat.setTexture("u_brdfLUT", brdfTex);
                // let e_cubeDiff: CubeTexture = new CubeTexture();
                // let e_diffuseArr: string[] = [];
                // e_diffuseArr.push("resource/texture/papermill/diffuse/diffuse_right_0.jpg");
                // e_diffuseArr.push("resource/texture/papermill/diffuse/diffuse_left_0.jpg");
                // e_diffuseArr.push("resource/texture/papermill/diffuse/diffuse_top_0.jpg");
                // e_diffuseArr.push("resource/texture/papermill/diffuse/diffuse_bottom_0.jpg");
                // e_diffuseArr.push("resource/texture/papermill/diffuse/diffuse_front_0.jpg");
                // e_diffuseArr.push("resource/texture/papermill/diffuse/diffuse_back_0.jpg");
                // e_cubeDiff.groupCubeTexture(e_diffuseArr);
                // let env_speTex = new CubeTexture();
                // for (let i = 0; i < 10; i++) {
                //     let urlarr = [];
                //     urlarr.push("resource/texture/papermill/specular/specular_right_" + i + ".jpg");
                //     urlarr.push("resource/texture/papermill/specular/specular_left_" + i + ".jpg");
                //     urlarr.push("resource/texture/papermill/specular/specular_top_" + i + ".jpg");
                //     urlarr.push("resource/texture/papermill/specular/specular_bottom_" + i + ".jpg");
                //     urlarr.push("resource/texture/papermill/specular/specular_front_" + i + ".jpg");
                //     urlarr.push("resource/texture/papermill/specular/specular_back_" + i + ".jpg");
                //     env_speTex.groupMipmapCubeTexture(urlarr, i, 9);
                // }
                // mat.setCubeTexture("u_DiffuseEnvSampler", e_cubeDiff);
                // mat.setCubeTexture("u_SpecularEnvSampler", env_speTex);
                return Promise.resolve(mat);
            }
        }
    }

    class ParseAccessorNode {
        static parse(index, gltf) {
            let arrayInfo = {};
            // return new Promise<AccessorNode>((resolve,reject)=>{
            let accessor = gltf.accessors[index];
            arrayInfo.componentSize = this.getComponentSize(accessor.type);
            arrayInfo.componentDataType = accessor.componentType;
            arrayInfo.count = accessor.count;
            arrayInfo.normalize = accessor.normalized;
            if (accessor.bufferView != null) {
                let viewindex = accessor.bufferView;
                return ParseBufferViewNode.parse(viewindex, gltf).then(value => {
                    if (accessor.sparse != null) {
                        let cloneArr = value.viewBuffer.slice(accessor.byteOffset);
                        arrayInfo.offsetInBytes = 0;
                        arrayInfo.value = cloneArr;
                        arrayInfo.strideInBytes = value.byteStride;
                        let indicesInfo = accessor.sparse.indices;
                        let valuesInfo = accessor.sparse.values;
                        Promise.all([
                            ParseBufferViewNode.parse(indicesInfo.bufferView, gltf),
                            ParseBufferViewNode.parse(valuesInfo.bufferView, gltf),
                        ]).then(arr => {
                            let indicesArr = this.getTypedArr(arr[0].viewBuffer, indicesInfo.byteOffset, indicesInfo.componentType, accessor.count);
                            let valueArr = arr[1].viewBuffer;
                            let elementByte = this.getBytesForAccessor(accessor.type, accessor.componentType);
                            let realStride = arrayInfo.strideInBytes != null && arrayInfo.strideInBytes != 0
                                ? arrayInfo.strideInBytes
                                : elementByte;
                            for (let i = 0; i < indicesArr.length; i++) {
                                let index = indicesArr[i];
                                for (let k = 0; k < elementByte; k++) {
                                    cloneArr[index * realStride + k] = valueArr[index * elementByte + k];
                                }
                            }
                        });
                    }
                    else {
                        arrayInfo.offsetInBytes = accessor.byteOffset;
                        arrayInfo.value = value.viewBuffer;
                        arrayInfo.strideInBytes = value.byteStride;
                        arrayInfo.buffer = value.glBuffer.buffer;
                        return arrayInfo;
                    }
                });
            }
            else {
                let viewBuffer = this.GetTyedArryByLen(accessor.componentType, accessor.count);
                arrayInfo.value = viewBuffer;
                return Promise.resolve(arrayInfo);
            }
        }
        static GetTyedArryByLen(componentType, Len) {
            switch (componentType) {
                case AccessorComponentType.BYTE:
                    return new Int8Array(Len);
                case AccessorComponentType.UNSIGNED_BYTE:
                    return new Uint8Array(Len);
                case AccessorComponentType.SHORT:
                    return new Int16Array(Len);
                case AccessorComponentType.UNSIGNED_SHORT:
                    return new Uint16Array(Len);
                case AccessorComponentType.UNSIGNED_INT:
                    return new Uint32Array(Len);
                case AccessorComponentType.FLOAT:
                    return new Float32Array(Len);
                default:
                    throw new Error(`Invalid component type ${componentType}`);
            }
        }
        static getComponentSize(type) {
            switch (type) {
                case "SCALAR":
                    return 1;
                case "VEC2":
                    return 2;
                case "VEC3":
                    return 3;
                case "VEC4":
                case "MAT2":
                    return 4;
                case "MAT3":
                    return 9;
                case "MAT4":
                    return 16;
            }
        }
        static getBytesForAccessor(type, componentType) {
            let componentNumber = this.getComponentSize(type);
            let byte = this.getbytesFormGLtype(componentType);
            return componentNumber * byte;
        }
        static getTypedArr(viewBuffer, offset, componentType, count) {
            offset = offset != null ? offset : 0;
            switch (componentType) {
                case AccessorComponentType.BYTE:
                    return new Int8Array(viewBuffer, offset, count);
                case AccessorComponentType.UNSIGNED_BYTE:
                    return new Uint8Array(viewBuffer, offset, count);
                case AccessorComponentType.SHORT:
                    return new Int16Array(viewBuffer, offset, count);
                case AccessorComponentType.UNSIGNED_SHORT:
                    return new Uint16Array(viewBuffer, offset, count);
                case AccessorComponentType.UNSIGNED_INT:
                    return new Uint32Array(viewBuffer, offset, count);
                case AccessorComponentType.FLOAT:
                    return new Float32Array(viewBuffer, offset, count);
                default:
                    throw new Error(`Invalid component type ${componentType}`);
            }
        }
        static getbytesFormGLtype(componentType) {
            switch (componentType) {
                case AccessorComponentType.BYTE:
                    return 1;
                case AccessorComponentType.UNSIGNED_BYTE:
                    return 1;
                case AccessorComponentType.SHORT:
                    return 2;
                case AccessorComponentType.UNSIGNED_SHORT:
                    return 2;
                case AccessorComponentType.UNSIGNED_INT:
                    return 4;
                case AccessorComponentType.FLOAT:
                    return 4;
                default:
                    throw "unsupported AccessorComponentType to bytesPerElement";
            }
        }
    }

    const MapGltfAttributeToToyAtt = {
        POSITION: VertexAttEnum.POSITION,
        NORMAL: VertexAttEnum.NORMAL,
        TANGENT: VertexAttEnum.TANGENT,
        TEXCOORD_0: VertexAttEnum.TEXCOORD_0,
        TEXCOORD_1: VertexAttEnum.TEXCOORD_1,
        COLOR_0: VertexAttEnum.COLOR_0,
        WEIGHTS_0: VertexAttEnum.WEIGHTS_0,
        JOINTS_0: VertexAttEnum.JOINTS_0,
    };
    class ParseMeshNode {
        static parse(index, gltf) {
            if (gltf.cache.meshNodeCache[index]) {
                return gltf.cache.meshNodeCache[index];
            }
            else {
                let node = gltf.meshes[index];
                let dataArr = [];
                if (node.primitives) {
                    for (let key in node.primitives) {
                        let primitive = node.primitives[key];
                        let data = this.parsePrimitive(primitive, gltf);
                        dataArr.push(data);
                    }
                }
                let task = Promise.all(dataArr).then(value => {
                    //---------------add to cache
                    return value;
                });
                gltf.cache.meshNodeCache[index] = task;
                return task;
            }
        }
        static parsePrimitive(node, gltf) {
            return Promise.all([this.parseGeometry(node, gltf), this.parseMaterial(node, gltf)]).then(([geometry, material]) => {
                return { geometry: geometry, material: material };
            });
        }
        static parseMaterial(node, gltf) {
            let matindex = node.material;
            if (matindex != null) {
                return ParseMaterialNode.parse(matindex, gltf);
            }
            else {
                return Promise.resolve(null);
            }
        }
        static parseGeometry(node, gltf) {
            let attributes = node.attributes;
            let index = node.indices;
            let geometryOp = { atts: {} };
            let taskAtts = [];
            for (let attName in attributes) {
                let attIndex = attributes[attName];
                let attTask = ParseAccessorNode.parse(attIndex, gltf).then(arrayInfo => {
                    geometryOp.atts[attName] = arrayInfo;
                });
                taskAtts.push(attTask);
            }
            if (index != null) {
                let indexTask = ParseAccessorNode.parse(index, gltf).then(arrayInfo => {
                    geometryOp.indices = arrayInfo;
                });
                taskAtts.push(indexTask);
            }
            return Promise.all(taskAtts).then(() => {
                let newGeometry = Geometry.fromCustomData(geometryOp);
                // this.getTypedValueArr(newGeometry, geometryOp);
                return newGeometry;
            });
        }
        /**
         * 将buffer数据分割成对应的 typedarray，例如 positions[i]=new floa32array();
         * @param newGeometry
         * @param geometryOp
         */
        static getTypedValueArr(newGeometry, geometryOp) {
            for (const key in geometryOp.atts) {
                const element = geometryOp.atts[key];
                let strideInBytes = element.strideInBytes || this.getByteSize(element.componentDataType, element.componentSize);
                let dataArr = [];
                for (let i = 0; i < element.count; i++) {
                    let value = this.GetTypedArry(element.componentDataType, element.value, i * strideInBytes + element.offsetInBytes, element.componentSize);
                    dataArr.push(value);
                }
                newGeometry[key] = dataArr;
            }
            if (geometryOp.indices) {
                const element = geometryOp.indices;
                let strideInBytes = element.strideInBytes || this.getByteSize(element.componentDataType, element.componentSize);
                let dataArr = [];
                for (let i = 0; i < element.count; i++) {
                    let value = this.GetTypedArry(element.componentDataType, element.value, i * strideInBytes + element.offsetInBytes, element.componentSize);
                    dataArr.push(value);
                }
                newGeometry["indices"] = dataArr;
            }
            console.warn(newGeometry);
        }
        static GetTypedArry(componentType, bufferview, byteOffset, Len) {
            let buffer = bufferview.buffer;
            byteOffset = bufferview.byteOffset + (byteOffset || 0);
            switch (componentType) {
                case AccessorComponentType.BYTE:
                    return new Int8Array(buffer, byteOffset, Len);
                case AccessorComponentType.UNSIGNED_BYTE:
                    return new Uint8Array(buffer, byteOffset, Len);
                case AccessorComponentType.SHORT:
                    return new Int16Array(buffer, byteOffset, Len);
                case AccessorComponentType.UNSIGNED_SHORT:
                    return new Uint16Array(buffer, byteOffset, Len);
                case AccessorComponentType.UNSIGNED_INT:
                    return new Uint32Array(buffer, byteOffset, Len);
                case AccessorComponentType.FLOAT: {
                    if ((byteOffset / 4) % 1 != 0) {
                        console.error("??");
                    }
                    return new Float32Array(buffer, byteOffset, Len);
                }
                default:
                    throw new Error(`Invalid component type ${componentType}`);
            }
        }
        static getByteSize(componentType, componentSize) {
            switch (componentType) {
                case AccessorComponentType.BYTE:
                    return componentSize * Int8Array.BYTES_PER_ELEMENT;
                case AccessorComponentType.UNSIGNED_BYTE:
                    return componentSize * Uint8Array.BYTES_PER_ELEMENT;
                case AccessorComponentType.SHORT:
                    return componentSize * Int16Array.BYTES_PER_ELEMENT;
                case AccessorComponentType.UNSIGNED_SHORT:
                    return componentSize * Uint16Array.BYTES_PER_ELEMENT;
                case AccessorComponentType.UNSIGNED_INT:
                    return componentSize * Uint32Array.BYTES_PER_ELEMENT;
                case AccessorComponentType.FLOAT:
                    return componentSize * Float32Array.BYTES_PER_ELEMENT;
                default:
                    throw new Error(`Invalid component type ${componentType}`);
            }
        }
    }

    class ParseNode {
        static parse(index, gltf) {
            let node = gltf.nodes[index];
            let name = node.name || "node" + index;
            let trans = new Entity(name).transform;
            if (node.matrix) {
                trans.setlocalMatrix(Mat4.fromArray(node.matrix));
            }
            if (node.translation) {
                Vec3.copy(node.translation, trans.localPosition);
                trans.markDirty();
            }
            if (node.rotation) {
                Quat.copy(node.rotation, trans.localRotation);
                trans.markDirty();
            }
            if (node.scale) {
                Vec3.copy(node.scale, trans.localScale);
                trans.markDirty();
            }
            if (node.camera != null) {
                let cam = ParseCameraNode.parse(node.camera, gltf);
                trans.entity.addComp(cam);
            }
            let allTask = [];
            if (node.mesh != null) {
                let task = ParseMeshNode.parse(node.mesh, gltf).then(primitives => {
                    for (let item of primitives) {
                        let entity = new Entity("subPrimitive", ["Mesh"]);
                        let mesh = entity.getCompByName("Mesh");
                        mesh.geometry = item.geometry;
                        mesh.material = item.material;
                        trans.addChild(entity.transform);
                    }
                });
                allTask.push(task);
            }
            if (node.children) {
                for (let i = 0; i < node.children.length; i++) {
                    let nodeindex = node.children[i];
                    let childTask = this.parse(nodeindex, gltf).then(child => {
                        trans.addChild(child);
                    });
                    allTask.push(childTask);
                }
            }
            return Promise.all(allTask).then(() => {
                return trans;
            });
            // if (node.skin != null && node.mesh != null) {
            //     let nodemeshdata: PrimitiveNode[] = bundle.meshNodeCache[node.mesh];
            //     let skindata = bundle.skinNodeCache[node.skin];
            //     for (let key in nodemeshdata) {
            //         let data = nodemeshdata[key];
            //         //-----------------------------
            //         let obj = new GameObject();
            //         trans.addChild(obj.transform);
            //         let meshr = obj.addComponent<SkinMeshRender>("SkinMeshRender");
            //         // let mat=assetMgr.load("resource/mat/diff.mat.json") as Material;
            //         // meshr.material=mat;
            //         meshr.mesh = data.mesh;
            //         meshr.material = data.mat;
            //         // meshr.joints=skindata.joints;
            //         for (let i = 0; i < skindata.jointIndexs.length; i++) {
            //             let trans = bundle.nodeDic[skindata.jointIndexs[i]];
            //             if (trans == null) {
            //                 console.error("解析gltf 异常！");
            //             }
            //             meshr.joints.push(trans);
            //         }
            //         meshr.bindPoses = skindata.inverseBindMat;
            //         meshr.bindPlayer = bundle.bundleAnimator;
            //     }
            // } else
        }
    }

    class ParseSceneNode {
        static parse(index, gltf) {
            let node = gltf.scenes[index];
            let rootNodes = node.nodes.map(item => {
                return ParseNode.parse(item, gltf);
            });
            return Promise.all(rootNodes);
        }
    }

    class GltfNodeCache {
        constructor() {
            this.meshNodeCache = {};
            this.bufferviewNodeCache = {};
            this.bufferNodeCache = {};
            this.materialNodeCache = {};
            this.textrueNodeCache = {};
            // beContainAnimation: boolean = false;
            // skinNodeCache: { [index: number]: SkinNode } = {};
            // animationNodeCache: { [index: number]: AnimationClip } = {};
        }
    }
    class LoadGlTF {
        load(url, onFinish, onProgress) {
            let name = getFileName(url);
            let asset = new GltfAsset({ name: name, URL: url });
            this.onProgress = onProgress;
            this.onFinish = onFinish;
            this.loadAsync(url)
                .then(gltfJson => {
                let scene = gltfJson.scene ? gltfJson.scene : 0;
                ParseSceneNode.parse(scene, gltfJson).then(trans => {
                    asset.roots = trans;
                    if (this.onFinish) {
                        this.onFinish(asset, { loadState: LoadEnum.Success, url: url });
                    }
                });
            })
                .catch(error => {
                let errorMsg = "ERROR: Load GLTFAsset Error!\n Info: LOAD URL: " + url + "  LOAD MSG:" + error.message;
                console.error(errorMsg);
            });
            return asset;
        }
        static regExtension(type, extension) {
            this.ExtensionDic[type] = extension;
        }
        getExtensionData(node, extendname) {
            if (node.extensions == null)
                return null;
            let extension = LoadGlTF.ExtensionDic[extendname];
            if (extension == null)
                return null;
            let info = node.extensions[extendname];
            if (info == null)
                return null;
            return extension.load(info, this);
        }
        //------------------------------------load bundle asset
        loadAsync(url) {
            if (url.endsWith(".gltf")) {
                return loadJson(url).then(json => {
                    let gltfJson = json;
                    gltfJson.cache = new GltfNodeCache();
                    gltfJson.rootURL = getAssetFlode(url);
                    return gltfJson;
                });
            }
            else {
                return this.loadglTFBin(url).then((value) => {
                    let gltfJson = value.json;
                    gltfJson.cache = new GltfNodeCache();
                    gltfJson.rootURL = getAssetFlode(url);
                    for (let i = 0; i < value.chunkbin.length; i++) {
                        gltfJson.cache.bufferNodeCache[i] = Promise.resolve(value.chunkbin[i].buffer);
                    }
                    return gltfJson;
                });
            }
        }
        loadglTFBin(url) {
            return __awaiter(this, void 0, void 0, function* () {
                return loadArrayBuffer(url).then(bin => {
                    const Binary = {
                        Magic: 0x46546c67,
                    };
                    let breader = new BinReader(bin);
                    let magic = breader.readUint32();
                    if (magic !== Binary.Magic) {
                        throw new Error("Unexpected magic: " + magic);
                    }
                    let version = breader.readUint32();
                    if (version != 2) {
                        throw new Error("Unsupported version:" + version);
                    }
                    let length = breader.readUint32();
                    if (length !== breader.getLength()) {
                        throw new Error("Length in header does not match actual data length: " + length + " != " + breader.getLength());
                    }
                    let ChunkFormat = {
                        JSON: 0x4e4f534a,
                        BIN: 0x004e4942,
                    };
                    // JSON chunk
                    let chunkLength = breader.readUint32();
                    let chunkFormat = breader.readUint32();
                    if (chunkFormat !== ChunkFormat.JSON) {
                        throw new Error("First chunk format is not JSON");
                    }
                    let _json = JSON.parse(breader.readUint8ArrToString(chunkLength));
                    let _chunkbin = [];
                    while (breader.canread() > 0) {
                        const chunkLength = breader.readUint32();
                        const chunkFormat = breader.readUint32();
                        switch (chunkFormat) {
                            case ChunkFormat.JSON:
                                throw new Error("Unexpected JSON chunk");
                            case ChunkFormat.BIN:
                                _chunkbin.push(breader.readUint8Array(chunkLength));
                                break;
                            default:
                                // ignore unrecognized chunkFormat
                                breader.skipBytes(chunkLength);
                                break;
                        }
                    }
                    return { json: _json, chunkbin: _chunkbin };
                });
            });
        }
    }
    //------------------extensions
    LoadGlTF.ExtensionDic = {};

    var loadglTF = /*#__PURE__*/Object.freeze({
        GltfNodeCache: GltfNodeCache,
        LoadGlTF: LoadGlTF
    });

})));
//# sourceMappingURL=dome.js.map
