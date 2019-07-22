precision highp float;

uniform lowp sampler2D _MainTex;
varying mediump vec2 xlv_TEXCOORD0;

void main()
{
    vec3 basecolor=texture2D(_MainTex, xlv_TEXCOORD0).rgb;
    gl_FragData[0] =vec4(basecolor,1.0);
}