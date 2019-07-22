attribute vec3 POSITION;
attribute vec3 TEXCOORD_0;
varying mediump vec2 xlv_TEXCOORD0;
void main()
{
    highp vec4 tmplet_1=vec4(POSITION.xyz,1.0);
    xlv_TEXCOORD0 = TEXCOORD_0.xy;
    gl_Position = tmplet_1;
}