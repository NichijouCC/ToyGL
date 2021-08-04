
将graphicDevice的功能分割到各个小的class中.

### 设定
1. 根据attribute type来决定 attributelocation


## TODO
1.texture unit 命中缓存


## EXAMPLE
``` typescript
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
const positionBuffer = device.createVertexBuffer({
    usage: BufferUsageEnum.STATIC_DRAW,
    typedArray: new Float32Array([1, 1, -1, 1, -1, -1, 1, -1])
});

// 创建 ibo
const indexBuffer = device.createIndexBuffer({
    typedArray: new Uint16Array([1, 2, 3, 1, 3, 4]),
    indexDatatype: IndexDatatypeEnum.Uint16Array
});

// 创建vao
const vao = device.createVertexArray({
    vertexAttributes: [{
        type: VertexAttEnum.POSITION,
        vertexBuffer: positionBuffer,
        componentDatatype: ComponentDatatypeEnum.FLOAT,
        componentsPerAttribute: 3
    }],
    indexBuffer: indexBuffer
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
```
