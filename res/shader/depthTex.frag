precision highp float;

uniform highp vec4 MainColor;
uniform lowp sampler2D uTexLinearDepth;
varying mediump vec2 xlv_TEXCOORD0;

uniform float czm_near;
uniform float czm_far;


float ZbufferToZview( const float zBuffer, const float near, const float far ) {
    return ( near * far ) / ( ( far - near ) * zBuffer - far );
}
float ZviewToZLinear(const float zview,const float near,const float far)
{
    return ( zview + near ) / ( near - far );
}

float ZbufferToZLinear(const float zBuffer,const float near,const float far)
{
    float viewZ = ZbufferToZview( zBuffer, near, far);
    float depth = ZviewToZLinear( viewZ, near, far);
    return depth;
}

float linearDepthFromDepthTexture( sampler2D depthSampler, vec2 coord ,const float near,const float far) {
    float fragCoordZ = texture2D( depthSampler, coord ).x;
    float depth = ZbufferToZLinear( fragCoordZ, near, far);
    return depth;
}

void main()
{
   lowp float texDepth=linearDepthFromDepthTexture(uTexLinearDepth, xlv_TEXCOORD0,czm_near,czm_far);
    gl_FragData[0] =vec4(vec3(1.0-texDepth),1.0);
}