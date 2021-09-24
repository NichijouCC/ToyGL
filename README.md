# ToyGL

## architecture
- Layer 1: Core,Ecs,io,input
- Layer 2: Graphics
- Layer 3: Scene
- Layer 4: Components,Systems


webgl模块主要对webgl图形api进行封装简化，同时尽可能在这一层做cache,免掉底层api的调用。具体见[webgl readme](https://github.com/NichijouCC/ToyGL/blob/master/src/webgl/readme.md)  
render模块封装webgl模块构建geometry、material、texture等元素概念。具体见[render readme](https://github.com/NichijouCC/ToyGL/blob/master/src/scene/render/readme.md)

## 参考:
cesium.js
playcanvas
ecsy
