precision highp float;

attribute vec4 POSITION;
attribute vec2 TEXCOORD_0;

uniform mat4 czm_modelViewP;
varying mediump vec2 xlv_TEXCOORD0;
#ifdef SKIN
attribute vec4 skinIndex;
attribute vec4 skinWeight;
uniform mat4 czm_boneMatrices[40];
vec4 calcVertex(vec4 srcVertex,vec4 blendIndex,vec4 blendWeight)
{
    int i = int(blendIndex.x);  
    int i2 =int(blendIndex.y);
    int i3 =int(blendIndex.z);
    int i4 =int(blendIndex.w);
    
    mat4 mat = czm_boneMatrices[i]*blendWeight.x 
            + czm_boneMatrices[i2]*blendWeight.y 
            + czm_boneMatrices[i3]*blendWeight.z 
            + czm_boneMatrices[i4]*blendWeight.w;
    return mat* srcVertex;
}
#endif
void main()
{
    vec4 position=POSITION;
    #ifdef SKIN
    position =calcVertex(position,skinIndex,skinWeight);
    #endif

    xlv_TEXCOORD0 = TEXCOORD_0.xy;
    gl_Position = czm_modelViewP * position;
}