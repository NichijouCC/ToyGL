precision highp float;

uniform highp vec4 MainColor;
uniform lowp sampler2D uTexLinearDepth;
varying mediump vec2 xlv_TEXCOORD0;

const float cameraNear = 0.01;
const float cameraFar = 1000.0;


float depth_ZbufferToZview( const float invClipZ, const float near, const float far ) {
    return ( near * far ) / ( ( far - near ) * invClipZ - far );
}

float depth_ToLinear(const float viewZ, const float near, const float far ) {
    return ( viewZ + near ) / ( near - far );
}

float readDepth( sampler2D depthSampler, vec2 coord ) {
    float fragCoordZ = texture2D( depthSampler, coord ).x;
    float viewZ = depth_ZbufferToZview( fragCoordZ, cameraNear, cameraFar);
    float depth = depth_ToLinear( viewZ, cameraNear, cameraFar);
    return depth;
}

void main()
{
   lowp float texDepth=readDepth(uTexLinearDepth, xlv_TEXCOORD0);
    gl_FragData[0] =vec4(vec3(1.0-texDepth),1.0);
}