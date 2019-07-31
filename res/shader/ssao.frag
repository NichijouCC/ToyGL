precision highp float;

uniform float u_fov;
uniform float u_aspect;
uniform mat4 u_mat_p;

uniform lowp sampler2D uTexNormals;
uniform lowp sampler2D uTexLinearDepth;
uniform lowp sampler2D uTexRandom;
uniform vec2 uNoiseScale;

const int uSampleKernelSize=16;
uniform vec3 uSampleKernel[16];

uniform float uRadius;
varying vec2 xlv_TEXCOORD0;

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
    for(int i = 0;i < uSampleKernelSize; i++){
        vec3 sample = tbn * uSampleKernel[i];
        sample = sample * uRadius + origin;//z_view

        vec4 offset = vec4(sample,1.0);
        offset = u_mat_p * offset;
        offset.xyz /= offset.w;
        offset.xyz = offset.xyz * 0.5 + 0.5;

        float sampleDepth = texture2D(uTexLinearDepth,offset.xy).r;

        float rangeCheck = smoothstep(0.0,1.0,uRadius/abs(offset.z - sampleDepth));
        occlusion +=(sampleDepth <= offset.z?1.0:0.0)*rangeCheck;
        // occlusion +=(sampleDepth >= floatz?1.0:0.0);
    }
    occlusion=occlusion/float(uSampleKernelSize);
    gl_FragColor =vec4(vec3(1.0-occlusion),1.0);
    // gl_FragColor =texture2D(uTexNormals, xlv_TEXCOORD0);
}