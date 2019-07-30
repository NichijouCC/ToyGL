precision highp float;

uniform float u_fov;
uniform float u_aspect;
uniform mat4 u_mat_p;

uniform lowp sampler2D uTexNormals;
uniform lowp sampler2D uTexLinearDepth;
uniform lowp sampler2D uTexRandom;
uniform vec2 uNoiseScale;

uniform int uSampleKernelSize;
uniform vec3 uSampleKernel[48];

uniform float uRadius;
varying vec2 xlv_TEXCOORD0;

mat4 inverse_mat4(mat4 m)
{
    float Coef00 = m[2][2] * m[3][3] - m[3][2] * m[2][3];
    float Coef02 = m[1][2] * m[3][3] - m[3][2] * m[1][3];
    float Coef03 = m[1][2] * m[2][3] - m[2][2] * m[1][3];
    
    float Coef04 = m[2][1] * m[3][3] - m[3][1] * m[2][3];
    float Coef06 = m[1][1] * m[3][3] - m[3][1] * m[1][3];
    float Coef07 = m[1][1] * m[2][3] - m[2][1] * m[1][3];
    
    float Coef08 = m[2][1] * m[3][2] - m[3][1] * m[2][2];
    float Coef10 = m[1][1] * m[3][2] - m[3][1] * m[1][2];
    float Coef11 = m[1][1] * m[2][2] - m[2][1] * m[1][2];
    
    float Coef12 = m[2][0] * m[3][3] - m[3][0] * m[2][3];
    float Coef14 = m[1][0] * m[3][3] - m[3][0] * m[1][3];
    float Coef15 = m[1][0] * m[2][3] - m[2][0] * m[1][3];
    
    float Coef16 = m[2][0] * m[3][2] - m[3][0] * m[2][2];
    float Coef18 = m[1][0] * m[3][2] - m[3][0] * m[1][2];
    float Coef19 = m[1][0] * m[2][2] - m[2][0] * m[1][2];
    
    float Coef20 = m[2][0] * m[3][1] - m[3][0] * m[2][1];
    float Coef22 = m[1][0] * m[3][1] - m[3][0] * m[1][1];
    float Coef23 = m[1][0] * m[2][1] - m[2][0] * m[1][1];
    
    const vec4 SignA = vec4( 1.0, -1.0,  1.0, -1.0);
    const vec4 SignB = vec4(-1.0,  1.0, -1.0,  1.0);
    
    vec4 Fac0 = vec4(Coef00, Coef00, Coef02, Coef03);
    vec4 Fac1 = vec4(Coef04, Coef04, Coef06, Coef07);
    vec4 Fac2 = vec4(Coef08, Coef08, Coef10, Coef11);
    vec4 Fac3 = vec4(Coef12, Coef12, Coef14, Coef15);
    vec4 Fac4 = vec4(Coef16, Coef16, Coef18, Coef19);
    vec4 Fac5 = vec4(Coef20, Coef20, Coef22, Coef23);
    
    vec4 Vec0 = vec4(m[1][0], m[0][0], m[0][0], m[0][0]);
    vec4 Vec1 = vec4(m[1][1], m[0][1], m[0][1], m[0][1]);
    vec4 Vec2 = vec4(m[1][2], m[0][2], m[0][2], m[0][2]);
    vec4 Vec3 = vec4(m[1][3], m[0][3], m[0][3], m[0][3]);
    
    vec4 Inv0 = SignA * (Vec1 * Fac0 - Vec2 * Fac1 + Vec3 * Fac2);
    vec4 Inv1 = SignB * (Vec0 * Fac0 - Vec2 * Fac3 + Vec3 * Fac4);
    vec4 Inv2 = SignA * (Vec0 * Fac1 - Vec1 * Fac3 + Vec3 * Fac5);
    vec4 Inv3 = SignB * (Vec0 * Fac2 - Vec1 * Fac4 + Vec2 * Fac5);
    
    mat4 Inverse = mat4(Inv0, Inv1, Inv2, Inv3);
    
    vec4 Row0 = vec4(Inverse[0][0], Inverse[1][0], Inverse[2][0], Inverse[3][0]);
    
    float Determinant = dot(m[0], Row0);
    
    Inverse /= Determinant;
    
    return Inverse;
}


const float cameraNear = 0.01;
const float cameraFar = 1000.0;


float depth_ZbufferToZview( const float invClipZ, const float near, const float far ) {
    return ( near * far ) / ( ( far - near ) * invClipZ - far );
}

float depth_ToLinear(const float viewZ, const float near, const float far ) {
    return ( viewZ + near ) / ( near - far );
}

float readDepth( sampler2D depthSampler, vec2 coord ) {
    float fragCoordZ = texture2D( depthSampler, coord ).x;
    float viewZ = depth_ZbufferToZview( fragCoordZ, cameraNear, cameraFar);
    float depth = depth_ToLinear( viewZ, cameraNear, cameraFar);
    return depth;
}



void main()
{
    
    vec2 ndc= xlv_TEXCOORD0 * 2.0 - vec2(1.0);
    // float thfov = tan(u_fov / 2.0); // can do this on the CPU
    // vec3 viewray = vec3(ndc.x * thfov * u_aspect,ndc.y * thfov,-1.0);


    // vec3 origin = viewray * texture2D(uTexLinearDepth, xlv_TEXCOORD0).r;

    float depth=texture2D(uTexLinearDepth, xlv_TEXCOORD0).r;
    float A= u_mat_p[2][2];
    float B= u_mat_p[3][2];
    float z_ndc = 2.0 * depth - 1.0;
    float z_eye = B/(A + z_ndc);

    vec3 viewray = vec3(ndc.x/u_mat_p[0][0],ndc.y/u_mat_p[1][1],-1.0);
    vec3 origin = viewray * z_eye;

    // float ndc_z = texture2D(uTexLinearDepth, xlv_TEXCOORD0).r;
    // mat4 inversePrjMat = inverse_mat4(u_mat_p);
    // vec4 viewPosH = inversePrjMat * vec4( ndc.x, ndc.y, 2.0 * ndc_z - 1.0, 1.0);
    // vec3 origin = viewPosH.xyz / viewPosH.w;

    vec3 normal = texture2D(uTexNormals, xlv_TEXCOORD0).xyz * 2.0 - 1.0;
    normal = normalize(normal);

    vec3 rvec = texture2D(uTexRandom, xlv_TEXCOORD0 * uNoiseScale).xyz * 2.0 - vec3(1.0);
    vec3 tangent = normalize(rvec - normal * dot(rvec, normal));
    vec3 bitangent = cross(normal, tangent);
    mat3 tbn = mat3(tangent, bitangent, normal);

    float occlusion = 0.0;
    for(int i = 0;i < 48; i++){
        vec3 sample = tbn * uSampleKernel[i];
        sample = sample * uRadius + origin;//z_view

        vec4 offset = vec4(sample,1.0);
        offset = u_mat_p * offset;
        offset.xyz /= offset.w;
        offset.xyz = offset.xyz * 0.5 + 0.5;
        float floatz = offset.z;

        float sampleDepth = texture2D(uTexLinearDepth,offset.xy).r;

        float rangeCheck = smoothstep(0.0,1.0,uRadius/abs(floatz - sampleDepth));
        occlusion +=(sampleDepth <= floatz?1.0:0.0)*rangeCheck;
        // occlusion +=(sampleDepth >= floatz?1.0:0.0);
    }
    occlusion=occlusion/48.0;
    gl_FragColor =vec4(vec3(1.0-occlusion),1.0);
}