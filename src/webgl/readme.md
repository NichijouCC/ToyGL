1.基础render 可类似bgfx，可实现多种图形api，暂时只有webgl

2.引擎将各自的差异性掩藏在接口方法下，接口对象上(buffer,vertexarray等)

2.已webgl为例，
    a.实现iengine基本接口
    b.实现不同的接口对象


参考引擎:bgfx,cesium，babylonjs，threejs

参考文章:https://github.com/AnalyticalGraphicsInc/cesium/issues/766