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

uniform float u_kernelRadius;
uniform float minDistance;
uniform float maxDistance;

varying vec2 xlv_TEXCOORD0;

uniform float u_cameraNear;
uniform float u_cameraFar;

float ZbufferToZview( const float zBuffer, const float near, const float far ) {
    return ( near * far ) / ( ( far - near ) * zBuffer - far );
}
float ZviewToZLinear(const float zview,const float near,const float far)
{
    return ( zview + near ) / ( near - far );
}

float ZbufferToZLinear(const float zBuffer,const float near,const float far)
{
    float viewZ = ZbufferToZview( zBuffer, near, far);
    float depth = ZviewToZLinear( viewZ, near, far);
    return depth;
}

float linearDepthFromDepthTexture( sampler2D depthSampler, vec2 coord ,const float near,const float far) {
    float fragCoordZ = texture2D( depthSampler, coord ).x;
    float depth = ZbufferToZLinear( fragCoordZ, near, far);
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
        sample = sample * u_kernelRadius + origin;//z_view

        vec4 offset = vec4(sample,1.0);
        offset = u_mat_p * offset;
        offset.xyz /= offset.w;
        offset.xyz = offset.xyz * 0.5 + 0.5;

        float realDepth = texture2D(uTexLinearDepth,offset.xy).r;
        float sampleDepth=offset.z;
        float rangeCheck = smoothstep(0.0,1.0,u_kernelRadius/abs(sampleDepth - realDepth));
        occlusion +=(realDepth <= sampleDepth?1.0:0.0)*rangeCheck;


        // float realDepth=linearDepthFromDepthTexture(uTexLinearDepth,offset.xy,u_cameraNear,u_cameraFar);
        // float sampleDepth=ZbufferToZLinear(offset.z,u_cameraNear,u_cameraFar);
        // float delta = sampleDepth - realDepth;
        // if (delta > minDistance && delta < maxDistance) {
        //     occlusion += 1.0;
        // }
    }
    occlusion = occlusion/float(uSampleKernelSize);
    gl_FragColor = vec4(vec3(1.0-occlusion),1.0);
    // gl_FragColor =texture2D(uTexNormals, xlv_TEXCOORD0);
}