

webgl模块主要对webgl图形api进行封装简化，同时尽可能在这一层做cache,最小化底层api的调用。

### 设定
1. 根据attribute type来决定 attributelocation
2. 封装后的gl对象基本都包含 bind(绑定gl对象)，unbind(解绑gl对象), destroy(销毁gl对象), update(更新gl对象)

### TODO
- [x] 全局状态缓存，具体包括：clearDepth,clearColor,clearStencil,viewport,ColorMask,CullFace,depth(test/write),blend,stencil,scissor等；  
具体参见：https://www.khronos.org/registry/webgl/specs/latest/1.0/#5.14.3
- [x] shaderProgram 缓存
- [x] shaderUniformValue 缓存
- [x] textureUnit 缓存
- [x] vao 缓存
- [x] vbo 缓存


## EXAMPLE
``` typescript
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


```
