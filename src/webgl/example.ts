import { Color } from "src/mathD";
import { GraphicsDevice, VertexAttEnum } from ".";
import { BufferUsageEnum } from "./buffer";
import { ComponentDatatypeEnum } from "./componentDatatypeEnum";
import { IndexDatatypeEnum } from "./indexBuffer";
import { DepthFuncEnum } from "./shaderState";

const device = new GraphicsDevice(document.getElementById("canvas") as HTMLCanvasElement);

// 创建shader
const shader = device.createShaderProgram({
    attributes: {
        POSITION: VertexAttEnum.POSITION
    },
    vsStr: `attribute vec3 POSITION;
    void main()
    {
        highp vec4 temp_1=vec4(POSITION.xyz,1.0);\
        gl_Position = temp_1;\
    }`,
    fsStr: `uniform highp vec4 MainColor;
    void main()
    {
        gl_FragData[0] = MainColor;
    }`
});

// 创建vbo
const positionBuffer = device.createVertexAtt({
    data: new Float32Array([1, 1, -1, 1, -1, -1, 1, -1]),
    type: VertexAttEnum.POSITION,
    componentSize: 3
});

// 创建 ibo
const indexBuffer = device.createIndexBuffer({
    data: new Uint16Array([1, 2, 3, 1, 3, 4]),
});

// 创建vao
const vao = device.createVertexArray({
    vertexAttributes: [positionBuffer],
    indices: indexBuffer
});

// 绘制
// 1.清理
device.setViewPort(0, 0, 1, 1);
device.setClear(1.0, new Color(1, 1, 1, 1), null);
// 2. 设置shader
shader.bind();
// 3. 设置uniform
shader.bindUniforms({ MainColor: new Color(1, 1, 1, 1) });
// 4. 绑定 vbo、ibo、指定数据用途
vao.bind();
// 5. 设置绘制状态
device.setCullFaceState(true, true);
device.setDepthState(true, true, DepthFuncEnum.LEQUAL);
device.setStencilState(false);
// 6 .draw call
device.draw(vao);


// texture -from image/canvas/..
let image = new Image();
image.src = "xx";
image.onload = () => {
    let tex1 = device.createTextureFromImageSource({
        image: image
    })
}
// texture -from typedArray
let tex2 = device.createTextureFromTypedArray({
    arrayBufferView: new Uint8Array([0, 0, 0, 255]),
    width: 1,
    height: 1
});
