
precision lowp float;
varying mediump vec4 v_normal;
void main() 
{
    gl_FragData[0] =vec4(v_normal.xyz,1.0);
}