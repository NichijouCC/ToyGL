# ToyGL
    web3d引擎造轮子，死扣性能，打造自由高且易拓展的轮子

webgl层主要对webgl、webgl2图形api进行简化，同时尽可能在这一层做cache,免掉底层api的调用。具体见[webgl readme](https://github.com/NichijouCC/ToyGL/blob/master/src/webgl/readme.md)  

render层构建geometry、material、texture等对象，并管理同GL对象同步数据的处理。具体见[render readme](https://github.com/NichijouCC/ToyGL/blob/master/src/render/readme.md)

scene层管理场景

comp/system 自由拓展系统
## 案例截图
![游戏](https://github.com/NichijouCC/ToyGL/blob/master/examples/public/captures/game.jpg)![SPINE](https://github.com/NichijouCC/ToyGL/blob/master/examples/public/spine_gif.gif)
![mapbox](https://github.com/NichijouCC/ToyGL/blob/master/examples/public/captures/mapbox.jpg)![PLY点云](https://github.com/NichijouCC/ToyGL/blob/master/examples/public/captures/ply_point_cloud.jpg)
![3DTILES](https://github.com/NichijouCC/ToyGL/blob/master/examples/public/captures/3dtiles.jpg)




