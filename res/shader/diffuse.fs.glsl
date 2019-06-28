precision lowp float;
uniform lowp sampler2D _MainTex;
uniform lowp vec4 _MainColor;
uniform lowp float _AlphaCut;
varying mediump vec2 xlv_TEXCOORD0;


#ifdef LIGHTMAP
uniform lowp sampler2D _LightmapTex;
varying mediump vec2 lightmap_TEXCOORD;
lowp vec3 decode_hdr(lowp vec4 data)
{
    lowp float power =pow( 2.0 ,data.a * 255.0 - 128.0);
    return data.rgb * power * 2.0 ;
}
#endif

#ifdef FOG
uniform lowp vec4 glstate_fog_color; 
varying lowp float factor;
#endif


void main() 
{
    lowp vec4 basecolor = texture2D(_MainTex, xlv_TEXCOORD0);
    // lowp vec4 basecolor =vec4(1,1,1,1);
    if(basecolor.a < _AlphaCut)
        discard;
    lowp vec4 fristColor=basecolor*_MainColor;
    lowp vec4 emission = fristColor;

    //----------------------------------------------------------
    
    #ifdef LIGHTMAP
    lowp vec4 lightmap = texture2D(_LightmapTex, lightmap_TEXCOORD);
    emission.xyz *= decode_hdr(lightmap);
    #endif

    #ifdef FOG
    emission.xyz = mix(glstate_fog_color.rgb, emission.rgb, factor);
    #endif
    
    gl_FragData[0] = emission;
}