precision highp float;
uniform vec4 MainColor;

#ifdef DIFFUSE
varying vec2 xlv_TEXCOORD0;
uniform sampler2D MainTex;
#endif

void main()
{
    #ifdef DIFFUSE
    vec4 diffuse=texture2D(MainTex, xlv_TEXCOORD0);
    #elif
    vec4 diffuse=vec4(1.0);
    #endif
    gl_FragData[0] = diffuse*MainColor;
}