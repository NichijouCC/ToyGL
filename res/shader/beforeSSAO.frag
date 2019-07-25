
precision lowp float;
varying mediump vec3 v_normal;
void main() 
{
    gl_FragData[0] =vec4(v_normal,1.0);
}