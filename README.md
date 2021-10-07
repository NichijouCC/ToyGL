# ToyGL
    web3d引擎造轮子
## Architecture
- Layer 1: Core,Ecs,io,input,webgl
- Layer 2: Render
- Layer 3: Scene
- Layer 4: Components,Systems


webgl模块主要对webgl图形api进行封装简化，同时尽可能在这一层做cache,免掉底层api的调用。具体见[webgl readme](https://github.com/NichijouCC/ToyGL/blob/master/src/webgl/readme.md)  

render模块封装webgl模块构建geometry、material、texture等元素概念，并增加一些tag类管理概念。具体见[render readme](https://github.com/NichijouCC/ToyGL/blob/master/src/render/readme.md)

## 案例截图
- 游戏
![](https://github.com/NichijouCC/ToyGL/blob/master/examples/public/captures/game.jpg){:height="50%" width="50%"}
- PLY点云
![](https://github.com/NichijouCC/ToyGL/blob/master/examples/public/captures/ply_point_cloud.jpg){:height="50%" width="50%"}

## 参考:
cesium.js
playcanvas
ecsy
