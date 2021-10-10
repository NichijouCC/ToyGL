
render模块封装webgl模块构建geometry、material、texture、camera等基本元素概念。

## 设计
1. 封装后的元素基本都包含 初始化传入参数数据，getglTarget(完成gl对象的初始化) changeData(修改元素参数 bind(完成gl对象的更新和绑定) destroy(销毁)
2. camera添加culingMask概念,配合renderable的layerMask可以选择性绘制对应层.
3. shader添加RenderType概念,将场景的物体分类为 背景层、几何体层、ALPHATEST层、透明层、UI层.
4. 绘制过程添加视锥剔除

元素的初始化和修改参数并不会立马执行gl对象的初始化和修改，而是在使用元素的时候即tick render，在内部完成gl对象的初始化和更新

## EXAMPLE
```
const render = new ForwardRender(document.getElementById("canvas") as HTMLCanvasElement);

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

var material = new Material({
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

let object: IRenderable = {
    geometry,
    material,
    worldMat: mat4.fromRotationTranslationScale(mat4.create(), quat.IDENTITY, vec3.ZERO, vec3.ONE)
}

let eyePos = vec3.create();
vec3.set(eyePos, 0, 0, -1);
let targetPos = vec3.create();
let viewMatrix = mat4.targetTo(mat4.create(), eyePos, targetPos, vec3.UP)
let projectMatrix = mat4.perspective(mat4.create(), Math.PI * 0.25, 16 / 9, 0.5, 1000);
let viewer = new Camera({ viewMatrix, projectMatrix });

render.renderList(viewer, [object]);
```