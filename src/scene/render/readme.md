
render模块封装webgl模块构建geometry、material、texture等元素概念。

## 设计
1. 封装后的元素基本都包含 初始化传入参数数据，getglTarget(完成gl对象的初始化) changeData(修改元素参数 bind(完成gl对象的更新和绑定) destroy(销毁)

元素的初始化和修改参数并不会立马执行gl对象的初始化和修改，而是在使用元素的时候即tick render，在内部完成gl对象的初始化和更新


## EXAMPLE
```
const device = new GraphicsDevice(document.getElementById("canvas") as HTMLCanvasElement);
const render = new ForwardRender(device);

var geometry = new Geometry({
    attributes: [
        {
            type: VertexAttEnum.POSITION,
            componentSize: 3,
            data: new Float32Array([
                0.0, 0.0, 0.0,
                7500000.0, 0.0, 0.0,
                0.0, 7500000.0, 0.0
            ])
        }
    ],
    indices: new Uint16Array([1, 2, 3, 2, 3, 4]),
    primitiveType: PrimitiveTypeEnum.LINE_LOOP
});

var mat = new Material({
    shader: {
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
    },
    uniformParameters: {
        "MainColor": new Color(1, 0, 0, 1)
    }
});


let cam = new Camera();
cam.node = new Transform();

render.renderCameras([cam], [{ material: mat, geometry: geometry, worldMat: mat4.fromRotationTranslationScale(mat4.create(), quat.IDENTITY, vec3.ZERO, vec3.ONE) }]);
```