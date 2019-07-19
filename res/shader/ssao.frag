precision highp float;

uniform float u_fov;
uniform float u_aspect;
uniform mat4 u_mat_p;

uniform lowp sampler2D uTexNormals;
uniform lowp sampler2D uTexLinearDepth;
uniform lowp sampler2D uTexRandom;
uniform vec2 uNoiseScale;

uniform int uSampleKernelSize;
uniform vec3 uSampleKernel[16];

uniform float uRadius;
varying vec2 xlv_TEXCOORD0;

void main()
{
    vec2 ndc= xlv_TEXCOORD0 * 2.0 - vec2(1.0);
    float thfov = tan(u_fov / 2.0); // can do this on the CPU
    vec3 viewray = vec3(ndc.x * thfov * u_aspect,ndc.y * thfov,1.0);

    vec3 origin = viewray * texture2D(uTexLinearDepth, xlv_TEXCOORD0).r;

    vec3 normal = texture2D(uTexNormals, xlv_TEXCOORD0).xyz * 2.0 - 1.0;
    normal = normalize(normal);

    vec3 rvec = texture2D(uTexRandom, xlv_TEXCOORD0 * uNoiseScale).xyz * 2.0 - vec3(1.0);
    vec3 tangent = normalize(rvec - normal * dot(rvec, normal));
    vec3 bitangent = cross(normal, tangent);
    mat3 tbn = mat3(tangent, bitangent, normal);

    float occlusion = 0.0;
    for(int i = 0;i < 16; i++){
        vec3 sample = tbn * uSampleKernel[i];
        sample = sample * uRadius + origin;

        vec4 offset = vec4(sample,1.0);
        offset = u_mat_p * offset;
        offset.xy /= offset.w;
        offset.xy = offset.xy * 0.5 + 0.5;
        
        float sampleDepth = texture2D(uTexLinearDepth,offset.xy).r;
        
        float rangeCheck = abs(origin.z - sampleDepth)<uRadius?1.0:0.0;
        occlusion +=(sampleDepth <= sample.z?1.0:0.0)*rangeCheck;
    }
    gl_FragColor =vec4(vec3(occlusion),1.0);
}