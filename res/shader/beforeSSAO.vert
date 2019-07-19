attribute highp vec4 POSITION;
attribute highp vec4 NORMAL;

uniform highp mat4 u_mat_mvp;
uniform highp mat4 u_mat_normal;
uniform highp mat4 u_mat_v;

varying mediump vec4 v_normal;

void main()
{
    highp vec4 position=vec4(POSITION.xyz,1.0);
    position = u_mat_mvp * position;   
    v_normal=u_mat_v*u_mat_normal*NORMAL;
    gl_Position =position;
}