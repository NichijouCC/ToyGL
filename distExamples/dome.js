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
            newData.bytesOffset = orginData.bytesOffset ? orginData.bytesOffset : 0;
            newData.bytesStride = orginData.bytesStride ? orginData.bytesStride : 0;
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
    var uvRE = /uv/;
    var colorRE = /color/;
    function guessNumComponentsFromName(name, length) {
        if (length === void 0) { length = null; }
        var numComponents;
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
            this.atts = {};
        }
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
    function setGeometry(gl, geometry, program) {
        for (var attName in program.attsDic) {
            program.attsDic[attName].setter(geometry.atts[attName]);
        }
        if (geometry.indices) {
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, geometry.indices.glBuffer);
        }
    }
    function setGeometryWithCached(gl, geometry, program) {
        if (gl._cachedGeometry != geometry || gl._cachedProgram != program.program) {
            setGeometry(gl, geometry, program);
            gl._cachedGeometry = geometry;
        }
    }

    function setViewPortWithCached(gl, x, y, width, height) {
        var bechanged = gl._cachedViewPortX != x ||
            gl._cachedViewPortY != y ||
            gl._cachedViewPortWidth != width ||
            gl._cachedViewPortHeight != height;
        if (!bechanged) {
            gl.viewport(x, y, width, height);
            gl._cachedViewPortX = x;
            gl._cachedViewPortY = y;
            gl._cachedViewPortWidth = width;
            gl._cachedViewPortHeight = height;
        }
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
    function setCullFaceStateWithCached(gl, enableCullFace, cullBack) {
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
        if (state.beDeduce != true) {
            deduceFullShderState(state);
        }
        //---------------------------cullface
        setCullFaceStateWithCached(gl, state.enableCullFace, state.cullBack);
        //----------------depth
        setDepthStateWithCached(gl, state.depthWrite, state.depthTest);
        //------------------------blend
        setBlendStateWithCached(gl, state.enableBlend, state.blendEquation, state.blendSrc, state.blendDst);
        //-------------------------stencil
        setStencilStateWithCached(gl, state.enableStencilTest, state.stencilFunc, state.stencilRefValue, state.stencilMask, state.stencilFail, state.stencilPassZfail, state.stencilFaileZpass);
    }
    /**
     *
     * @param state 原始 webgl state
     */
    // state 是给每个物体 render用的，是不想受前一个物体render影响，所以需要推断出完整的 webgl state，缺失的按照默认值
    function deduceFullShderState(state) {
        //----------------------------cull face
        if (state.enableCullFace == null) {
            state.enableCullFace = true;
        }
        if (state.enableCullFace) {
            if (state.cullBack == null) {
                state.cullBack = true;
            }
        }
        //------------------depth
        if (state.depthWrite == null) {
            state.depthWrite = true;
        }
        if (state.depthTest == null) {
            state.depthTest = true;
        }
        if (state.depthTest) {
            if (state.depthTestFuc == null) {
                state.depthTestFuc = GlConstants.LEQUAL;
            }
        }
        //------------------ blend
        if (state.enableBlend == true) {
            if (state.blendEquation == null) {
                state.blendEquation = GlConstants.FUNC_ADD;
            }
            if (state.blendSrc == null) {
                state.blendSrc = GlConstants.ONE;
            }
            if (state.blendDst == null) {
                state.blendDst = GlConstants.ONE_MINUS_SRC_ALPHA;
            }
        }
        //---------------------stencil
        if (state.enableStencilTest == true) {
            if (state.stencilFunc == null) {
                state.stencilFunc = GlConstants.ALWAYS;
            }
            if (state.stencilFail == null) {
                state.stencilFail = GlConstants.KEEP;
            }
            if (state.stencilFaileZpass == null) {
                state.stencilFaileZpass = GlConstants.KEEP;
            }
            if (state.stencilPassZfail == null) {
                state.stencilPassZfail = GlConstants.REPLACE;
            }
            if (state.stencilRefValue == null) {
                state.stencilRefValue = 1;
            }
            if (state.stencilMask == null) {
                state.stencilMask = 0xff;
            }
        }
        return state;
    }

    var ShaderTypeEnum;
    (function (ShaderTypeEnum) {
        ShaderTypeEnum[ShaderTypeEnum["VS"] = 0] = "VS";
        ShaderTypeEnum[ShaderTypeEnum["FS"] = 1] = "FS";
    })(ShaderTypeEnum || (ShaderTypeEnum = {}));
    function createProgramInfo(gl, op) {
        var info;
        if (op.program.program != null) {
            var bassprogram = op.program;
            info = {};
            info.program = bassprogram.program;
            info.attsDic = bassprogram.attsDic;
            info.uniformsDic = bassprogram.uniformsDic;
        }
        else {
            var bassprogramOp = op.program;
            info = createBassProgramInfo(gl, bassprogramOp.vs, bassprogramOp.fs, bassprogramOp.name);
        }
        if (op.uniforms) {
            info.uniforms = op.uniforms;
        }
        if (op.states) {
            info.states = op.states;
        }
        return info;
    }
    function setProgramWithCached(gl, program) {
        if (gl._cachedProgram != program.program) {
            gl._cachedProgram = program.program;
            gl.useProgram(program.program);
        }
        if (program.uniforms) {
            setProgramUniforms(program, program.uniforms);
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
                return { program: item, programName: name, uniformsDic: uniformsInfo, attsDic: attsInfo };
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
                        gl.uniform1f(location, value);
                    };
                }
                else {
                    return function (value) {
                        gl.uniform1fv(location, value);
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
                    gl.bindTexture(gl.TEXTURE_2D, value);
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
    function createTextureFromImageSource(gl, data, texOP) {
        texOP = texOP != null ? texOP : {};
        deduceTextureimgSourceOption(gl, data, texOP);
        var tex = gl.createTexture();
        gl.bindTexture(texOP.target, tex);
        gl.texParameteri(texOP.target, gl.TEXTURE_MAG_FILTER, texOP.filterMax);
        gl.texParameteri(texOP.target, gl.TEXTURE_MIN_FILTER, texOP.filterMin);
        gl.texParameteri(texOP.target, gl.TEXTURE_WRAP_S, texOP.wrapS);
        gl.texParameteri(texOP.target, gl.TEXTURE_WRAP_T, texOP.wrapT);
        gl.texImage2D(texOP.target, 0, texOP.pixelFormat, texOP.pixelFormat, texOP.pixelDatatype, data);
        return tex;
    }
    function dedeuceBaseTextureOption(gl, texOP) {
        texOP.target = texOP.target ? texOP.target : GlConstants.TEXTURE_2D;
        // texOP.wrap_s = texOP.wrap_s ? texOP.wrap_s : GLConstants.CLAMP_TO_EDGE;
        // texOP.wrap_t = texOP.wrap_t ? texOP.wrap_t : GLConstants.CLAMP_TO_EDGE;
        texOP.pixelFormat = texOP.pixelFormat ? texOP.pixelFormat : GlConstants.RGBA;
        if (texOP.enableMipMap && canGenerateMipmap(gl, texOP.width, texOP.height)) {
            texOP.enableMipMap = true;
        }
        else {
            texOP.enableMipMap = false;
        }
        if (texOP.filterMax == null) {
            texOP.filterMax = texOP.enableMipMap ? GlConstants.LINEAR_MIPMAP_LINEAR : GlConstants.LINEAR;
        }
        if (texOP.filterMin == null) {
            texOP.filterMin = texOP.enableMipMap ? GlConstants.LINEAR_MIPMAP_LINEAR : GlConstants.LINEAR;
        }
        if (texOP.wrapS == null) {
            texOP.wrapS = canWrapReapeat(gl, texOP.width, texOP.height) ? GlConstants.REPEAT : GlConstants.CLAMP_TO_EDGE;
        }
        if (texOP.wrapT == null) {
            texOP.wrapT = canWrapReapeat(gl, texOP.width, texOP.height) ? GlConstants.REPEAT : GlConstants.CLAMP_TO_EDGE;
        }
    }
    function deduceTextureimgSourceOption(gl, data, texOP) {
        texOP.width = data.width;
        texOP.height = data.height;
        dedeuceBaseTextureOption(gl, texOP);
        if (texOP.pixelDatatype == null) {
            texOP.pixelDatatype = GlConstants.UNSIGNED_BYTE;
        }
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
        setGeometryWithCached(gl, geometry, program);
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

    // export interface IshaderOptions extends IprogramOptions {
    //     layer?: RenderLayerEnum;
    // }
    // export interface IshaderInfo extends IprogramInfo {
    //     layer: RenderLayerEnum;
    // }
    class GlRender {
        static init(canvas, options = {}) {
            this.context = setUpWebgl(canvas, options);
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
            setViewPortWithCached(this.context, viewport[0] * this.context.drawingBufferWidth, viewport[1] * this.context.drawingBufferHeight, viewport[2] * this.context.drawingBufferWidth, viewport[3] * this.context.drawingBufferHeight);
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
            let info = createProgramInfo(this.context, op);
            // info.layer = op.layer || RenderLayerEnum.Geometry;
            return info;
        }
        static createTextureFromImg(img) {
            return createTextureFromImageSource(this.context, img);
        }
        static setGeometryAndProgram(geometry, program) {
            setGeometryAndProgramWithCached(this.context, geometry, program);
        }
        static drawObject(geometry, program, uniforms, instancecount) {
            // setProgram(this.context, program);
            setGeometryAndProgramWithCached(this.context, geometry, program);
            //set uniforms
            for (const key in program.uniformsDic) {
                let func = this.autoUniform && this.autoUniform.autoUniforms[key];
                let value = func ? func() : uniforms[key];
                program.uniformsDic[key].setter(value);
            }
            drawBufferInfo(this.context, geometry, instancecount);
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
        static copy(from, out) {
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
        static add(lhs, rhs, out) {
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
        static subtract(lhs, rhs, out) {
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
        static multiply(a, b, out) {
            out[0] = a[0] * b[0];
            out[1] = a[1] * b[1];
            out[2] = a[2] * b[2];
            return out;
        }
        static center(a, b, out) {
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
        static divide(a, b, out) {
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
        static ceil(out, a) {
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
        static floor(out, a) {
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
        static min(a, b, out) {
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
        static max(out, a, b) {
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
        static round(out, a) {
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
        static scale(a, b, out) {
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
        static AddscaledVec(lhs, rhs, scale, out) {
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
        static negate(a, out) {
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
        static inverse(a, out) {
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
        static normalize(src, out) {
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
        static cross(lhs, rhs, out) {
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
        static lerp(lhs, rhs, lerp$$1, out) {
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
        static hermite(out, a, b, c, d, t) {
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
        static bezier(out, a, b, c, d, t) {
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
        static random(out, scale = 1) {
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
        // public static transformMat3(out: vec3, a: vec3, m: mat3): vec3{
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
        // public static transformMat4(out: vec3, a: vec3, m: mat4): vec3{
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
        static transformQuat(out, a, q) {
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
        static rotateX(out, a, b, c) {
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
        static rotateY(out, a, b, c) {
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
        static rotateZ(out, a, b, c) {
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
        static copy(src, out) {
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
        static identity(out) {
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
        static transpose(a, out) {
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
        static invert(a, out) {
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
        static adjoint(a, out) {
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
        static multiply(lhs, rhs, out) {
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
        static translate(a, v, out) {
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
        static scale(a, v, out) {
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
        static rotate(a, rad, axis, out) {
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
        static rotateX(a, rad, out) {
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
        static rotateY(a, rad, out) {
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
        static rotateZ(a, rad, out) {
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
        static fromTranslation(v, out) {
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
        static fromScaling(v, out) {
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
        static fromRotation(rad, axis, out) {
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
        static fromXRotation(rad, out) {
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
        static fromYRotation(rad, out) {
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
        static fromZRotation(rad, out) {
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
        static fromRotationTranslationScaleOrigin(q, v, s, o, out) {
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
        static frustum(left, right, bottom, top, near, far, out) {
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
        static lookAt(eye, center, up, out) {
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
        static subtract(lhs, rhs, out) {
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
        //public static sub(out: mat4, a: mat4, b: mat4): mat4;
        /**
         * Multiply each element of the matrix by a scalar.
         *
         * @param {Mat4} out the receiving matrix
         * @param {Mat4} a the matrix to scale
         * @param {number} b amount to scale the matrix's elements by
         * @returns {Mat4} out
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
        static projectPerspectiveLH(fovy, aspect, near, far, out) {
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
        // static project_PerspectiveLH(fov: number, aspect: number, znear: number, zfar: number, out: mat4)
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
        // public static ortho(out: mat4, left: number, right: number,
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
        static projectOrthoLH(width, height, near, far, out) {
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
        // static project_OrthoLH(width: number, height: number, znear: number, zfar: number, out: mat4)
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
        static RTS(pos, scale, rot, out) {
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
        static RT(q, v, out) {
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
            return GameScreen.canvasheight;
        }
        /**
         * 屏幕(canvas)宽度
         */
        static get Width() {
            return GameScreen.canvaswidth;
        }
        /**
         * 窗口宽度,一般用于html
         */
        static get windowWidth() {
            return this._windowWidth;
        }
        /**
         * 窗口高度,一般用于html
         */
        static get windowHeight() {
            return this._windowHeight;
        }
        /**
         * width/height
         */
        static get aspect() {
            return this.apset;
        }
        /**
         * 修改canvas 缩放
         * 可提升画面效果，消除闪烁(最好用mipmap解决)
         * @param scale
         */
        static SetCanvasSize(scale) {
            GameScreen.scale = scale;
            this.OnResizeCanvas();
        }
        // static divcontiner: HTMLDivElement;
        static init(canvas) {
            this.canvas = canvas;
            // this.OnResizeCanvas();
            // window.onresize = () => {
            //     this.OnResizeCanvas();
            // };
            // let divcontiner = document.createElement("div");
            // divcontiner.className = "divContiner";
            // divcontiner.style.overflow = "hidden";
            // divcontiner.style.left = "0px";
            // divcontiner.style.top = "0px";
            // canvas.parentElement.appendChild(divcontiner);
            // this.divcontiner = divcontiner;
        }
        static OnResizeCanvas() {
            console.warn("canvas resize!");
            // this._windowWidth = window.innerWidth;
            // this._windowHeight = window.innerHeight;
            this._windowWidth = this.canvas.parentElement.clientWidth;
            this._windowHeight = this.canvas.parentElement.clientHeight;
            let pixelRatio = window.devicePixelRatio || 1;
            this.canvaswidth = pixelRatio * this.scale * this._windowWidth;
            this.canvasheight = pixelRatio * this.scale * this._windowHeight;
            this.canvas.width = this.canvaswidth;
            this.canvas.height = this.canvasheight;
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
    //#region canvas resize
    GameScreen.scale = 1;
    GameScreen.resizeListenerArr = [];

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
        }
        get ViewMatrix() {
            if (this.needComputeViewMat) {
                let camworld = this.entity.getCompByName("Transform").worldMatrix;
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
            return Mat4.multiply(this.matrixModel, this.curCamera.ViewProjectMatrix, this._matrixMV);
        }
        get matrixModelViewProject() {
            return Mat4.multiply(this.matrixModel, this.curCamera.ViewProjectMatrix, this._matMVP);
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
        frameRender(frameState) {
            let camerlist = frameState.cameraList;
            let renderList = frameState.renderList;
            camerlist.sort((a, b) => {
                return a.priority - b.priority;
            });
            for (let i = 0; i < camerlist.length; i++) {
                let cam = camerlist[i];
                if (this.camRenderList[cam.entity.guid] == null) {
                    this.camRenderList[cam.entity.guid] = new RenderList(cam);
                }
                let camrenderList = this.camRenderList[cam.entity.guid];
                // let newList = this.filterRenderByCamera(renderList, cam);
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
                    for (let i = 0; i < shader.passes["base"].length; i++) {
                        GlRender.drawObject(item.geometry.data, shader.passes["base"][i], item.material.uniforms);
                    }
                });
                //-----------canera render end
            }
        }
    }

    class Entity {
        constructor(name = null, compsArr = null) {
            this.maskLayer = CullingMask.default;
            this.components = {};
            this.guid = newId();
            this.name = name || "newEntity";
            this.beActive = true;
            if (compsArr != null) {
                for (let i = 0; i < compsArr.length; i++) {
                    this.addCompByName(compsArr[i]);
                }
            }
            if (this.components["Transform"] == null) {
                this.addCompByName("Transform");
            }
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
        static copy(a, out) {
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
        static identity(out) {
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
        static add(a, b, out) {
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
        static multiply(a, b, out) {
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
        static scale(a, b, out) {
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
        static normalize(src, out) {
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
        static lerp(a, b, t, out) {
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
        static slerp(a, b, t, out) {
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
        static sqlerp(a, b, c, d, t, out) {
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
        static inverse(a, out) {
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
        static conjugate(out, a) {
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
        static rotateX(a, rad, out) {
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
        static rotateY(a, rad, out) {
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
        static rotateZ(a, rad, out) {
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
        static fromMat3(m, out) {
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
        static setAxes(view, right, up, out) {
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
        static calculateW(a, out) {
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
        static FromEuler(x, y, z, out) {
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
        static AxisAngle(axis, rad, out) {
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
        static rotationTo(from, to, out) {
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
        static myLookRotation(dir, out, up = Vec3.UP) {
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
        // static lookat(pos: Vec3, targetpos: Vec3, out: Quat,up:Vec3=Vec3.UP)
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
        static unitxyzToRotation(xAxis, yAxis, zAxis, out) {
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
        }
        static lookat(pos, targetpos, out, up = Vec3.UP) {
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
            this.unitxyzToRotation(dirx, diry, dirz, out);
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
        static fromToRotation(from, to, out) {
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
        }
        set localMatrix(value) {
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
        set worldPosition(value) {
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
        set worldRotation(value) {
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
        }
        get worldScale() {
            if (this.dirtyFlag & (DirtyFlagEnum.WORLDMAT | DirtyFlagEnum.WORLD_SCALE)) {
                Mat4.getScaling(this.worldMatrix, this._worldScale);
                this.dirtyFlag = this.dirtyFlag & ~DirtyFlagEnum.WORLD_SCALE;
            }
            return this._worldScale;
        }
        set worldScale(value) {
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
        set worldMatrix(value) {
            if (this.parent == null) {
                return;
            }
            if (this.parent.parent == null) {
                Mat4.copy(value, this._localMatrix);
                this.localMatrix = this._localMatrix;
            }
            else {
                let invparentworld = Mat4.create();
                Mat4.invert(this.parent.worldMatrix, invparentworld);
                Mat4.multiply(invparentworld, value, this._localMatrix);
                this.localMatrix = this._localMatrix;
                Mat4.recycle(invparentworld);
                this.dirtyFlag = this.dirtyFlag & ~DirtyFlagEnum.WORLDMAT;
                this.dirtyFlag =
                    this.dirtyFlag | DirtyFlagEnum.WORLD_ROTATION | DirtyFlagEnum.WORLD_SCALE | DirtyFlagEnum.WWORLD_POS;
            }
        }
        /**
         * 通知子节点需要计算worldmatrix
         * @param node
         */
        static NotifyChildSelfDirty(node) {
            for (let key in node.children) {
                let child = node.children[key];
                if (child.dirtyFlag & DirtyFlagEnum.WORLDMAT) {
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
        dispose() {
            this.parent = null;
            this.children = null;
        }
    };
    Transform = Transform_1 = __decorate([
        EC.RegComp
    ], Transform);

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
            this.root = new Transform();
            this.frameState = new FrameState();
            this.render = render;
        }
        newEntity(name = null, compsArr = null) {
            let newobj = new Entity(name, compsArr);
            this.addEntity(newobj);
            return newobj;
        }
        addEntity(entity) {
            this.root.addChild(entity.getCompByName("Transform"));
        }
        foreachRootNodes(func) {
            for (let i = 0; i < this.root.children.length; i++) {
                func(this.root.children[i]);
            }
        }
        update(deltatime) {
            this.frameState.reInit();
            this.frameState.deltaTime = deltatime;
            this.foreachRootNodes(node => {
                this._updateNode(node, this.frameState);
            });
            this.render.frameRender(this.frameState);
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
    }

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
            let currentRender = (this.render && this.updateRender()) || {
                maskLayer: this.entity.maskLayer,
                geometry: this._geometry,
                // program: this._material.program,
                // uniforms: this._material.uniforms,
                material: this._material,
                modelMatrix: this.entity.getCompByName("Transform").worldMatrix,
            };
            frameState.renderList.push(currentRender);
        }
        updateRender() {
            if (this._renderDirty) {
                this.render.geometry = this._geometry;
                // this.render.program = this._material.program;
                // this.render.uniforms = this._material.uniforms;
                this.render.material = this._material;
                this._renderDirty = false;
            }
            this.render.maskLayer = this.entity.maskLayer;
            return this.render;
        }
        dispose() { }
    };
    Mesh = __decorate([
        EC.RegComp
    ], Mesh);

    // import { IassetMgr } from "./resources/type";
    class ToyGL {
        constructor() {
            this.frameUpdate = (deltaTime) => {
                this.scene.update(deltaTime);
            };
        }
        // setupRender(canvas: HTMLCanvasElement) {}
        initByHtmlElement(element) {
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
            let render = new RenderMachine(canvas);
            this.scene = new Scene(render);
            GameScreen.init(canvas);
            this.loop = new Loop();
            this.loop.update = this.frameUpdate;
        }
    }
    class Loop {
        constructor() {
            this.update = () => { };
            this.beActive = false;
            let func = () => {
                let now = Date.now();
                let deltaTime = now - this._lastTime || now;
                this._lastTime = now;
                if (this.beActive) {
                    this.update(deltaTime);
                }
                requestAnimationFrame(func);
            };
            func();
            this.beActive = true;
        }
        active() {
            this.beActive = true;
        }
        disActive() {
            this.beActive = false;
        }
    }

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
    }

    class DefGeometry {
        static fromType(type) {
            if (this.defGeometry[type] == null) {
                let gemetryinfo;
                switch (type) {
                    case "quad":
                        gemetryinfo = GlRender.createGeometry({
                            atts: {
                                aPos: [-0.5, -0.5, 0.5, -0.5, 0.5, 0, 0.5, 0.5, 0, 0.5, -0.5, 0],
                                aUv: [0, 1, 0, 0, 1, 0, 1, 1],
                            },
                            indices: [0, 1, 2, 0, 3, 2],
                        });
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
    }
    DefGeometry.defGeometry = {};

    class Shader extends ToyAsset {
        constructor(param) {
            super(param);
            this.layer = RenderLayerEnum.Geometry;
            this.queue = 0;
        }
        static fromCustomData(data) {
            let newAsset = new Shader({ name: "custom_shader" });
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
                        let colorVs = "\
                          attribute vec3 aPos;\
                          void main()\
                          {\
                              highp vec4 tmplet_1=vec4(aPos.xyz,1.0);\
                              gl_Position = tmplet_1;\
                          }";
                        let colorFs = "\
                          uniform highp vec4 MainColor;\
                          void main()\
                          {\
                              gl_FragData[0] = MainColor;\
                          }";
                        this.defShader[type] = Shader.fromCustomData({
                            passes: [
                                {
                                    program: {
                                        vs: colorVs,
                                        fs: colorFs,
                                        name: "defcolor",
                                    },
                                },
                            ],
                        });
                        break;
                    default:
                        console.warn("Unkowned default shader type:", type);
                        return null;
                }
            }
            return this.defShader[type];
        }
    }
    DefShader.defShader = {};

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
        setColor(uniform, color) {
            this.uniforms[uniform] = color;
        }
        dispose() { }
    }

    window.onload = () => {
        let toy = new ToyGL();
        toy.initByHtmlElement(document.getElementById("canvas"));
        let geometry = DefGeometry.fromType("quad");
        let shader = DefShader.fromType("color");
        let material = new Material();
        material.shader = shader;
        material.setColor("MainColor", Color.create(1, 0, 0, 1));
        let obj = new Entity();
        let mesh = obj.addCompByName("Mesh");
        mesh.geometry = geometry;
        mesh.material = material;
        toy.scene.addEntity(obj);
        let camobj = new Entity("", ["Camera"]);
        toy.scene.addEntity(camobj);
    };

})));
//# sourceMappingURL=dome.js.map
