import {
    setUpWebgl,
    createGeometryInfoFromArray,
    createBassProgramInfo,
    createProgramInfo,
    createTextureFromHtml,
    setProgram,
    setBuffersAndAttributes,
    drawBufferInfo,
} from "twebgl";
import { IprogramState } from "twebgl/dist/types/type";

window.onload = () => {
    let cc = document.getElementById("canvas") as HTMLCanvasElement;
    let gl: WebGLRenderingContext = setUpWebgl(cc, { extentions: ["OES_vertex_array_object"] });
    // let bewebgl2 = gl.beWebgl2;
    let geometry = createGeometryInfoFromArray(
        gl,
        {
            // eslint-disable-next-line @typescript-eslint/camelcase
            a_pos: [-0.5, -0.5, 0.5, -0.5, 0.5, 0, 0.5, 0.5, 0, 0.5, -0.5, 0],
            // eslint-disable-next-line @typescript-eslint/camelcase
            a_uv: [0, 1, 0, 0, 1, 0, 1, 1],
        },
        [0, 1, 2, 0, 3, 2],
    );

    let defErrorVs =
        "\
      attribute vec3 a_pos;\
      void main()\
      {\
          highp vec4 tmplet_1=vec4(a_pos.xyz,1.0);\
          gl_Position = tmplet_1;\
      }";

    let defErrorFs =
        "\
      uniform highp vec4 _MainColor;\
      void main()\
      {\
          gl_FragData[0] = _MainColor;\
      }";

    let uniforms: { [key: string]: any } = {};
    uniforms["_MainColor"] = new Float32Array([0.5, 1, 0.5, 1]);
    let bassporgram = createBassProgramInfo(gl, defErrorVs, defErrorFs, "ssxx");

    let program = createProgramInfo(gl, { program: bassporgram, uniforms: uniforms });

    let defVs =
        "\
      attribute vec3 a_pos;\
      attribute vec2 a_uv;\
      varying highp vec2 xlv_TEXCOORD0;   \
      void main()\
      {\
          highp vec4 tmplet_1=vec4(a_pos.xyz,1.0);\
          xlv_TEXCOORD0=a_uv;\
          gl_Position = tmplet_1;\
      }";

    let defFs =
        "\
      uniform highp vec4 _MainColor;\
      varying highp vec2 xlv_TEXCOORD0;   \
      uniform sampler2D _MainTex;\
      void main()\
      {\
          lowp vec4 tmplet_3= texture2D(_MainTex, xlv_TEXCOORD0);\
          gl_FragData[0] = _MainColor*tmplet_3;\
      }";

    // eslint-disable-next-line @typescript-eslint/camelcase
    let state: IprogramState = { depthTest: false };
    let imag = new Image();
    imag.src = "./dist/tes.png";
    imag.onload = (): void => {
        uniforms["_MainTex"] = createTextureFromHtml(gl, imag);
        program = createProgramInfo(gl, {
            program: { vs: defVs, fs: defFs, name: "ssxxss" },
            uniforms: uniforms,
            states: state,
        });
    };

    let render = (): void => {
        gl.clearColor(0.5, 0.1, 0.5, 1);
        gl.clearDepth(0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // gl.useProgram(program.program);
        setProgram(gl, program);
        setBuffersAndAttributes(gl, geometry, program);
        drawBufferInfo(gl, geometry);

        requestAnimationFrame(() => {
            render();
        });
    };
    render();
};
