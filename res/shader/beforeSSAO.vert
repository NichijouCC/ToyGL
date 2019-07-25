attribute highp vec4 POSITION;
attribute highp vec4 NORMAL;

uniform highp mat4 u_mat_mvp;
uniform highp mat4 u_mat_normal;
uniform highp mat4 u_mat_v;

varying mediump vec3 v_normal;

void main()
{
    highp vec4 position=vec4(POSITION.xyz,1.0);
    position = u_mat_mvp * position;   
    highp vec4 _normal=u_mat_v*u_mat_normal*NORMAL;
    _normal.xyz=normalize(_normal.xyz);

    // scales a normal to between 0 and 1
    v_normal = _normal.xyz*0.5+vec3(0.5);

    gl_Position =position;
}