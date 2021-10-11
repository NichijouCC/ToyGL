import { CameraSystem, InterScene, LoadGlTF, MapBoxSystem, ModelSystem, Prefab, quat, Resource, vec3 } from "TOYGL";
import { ECS } from "../../src/core/ecs";

let mapboxSystem = new MapBoxSystem(
    [127.71948354887672, 26.21705479691047, 25],
    {
        mapboxScript: "https://api.mapbox.com/mapbox-gl-js/v2.5.0/mapbox-gl.js",
        mapboxCss: "https://api.mapbox.com/mapbox-gl-js/v2.5.0/mapbox-gl.css",
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v10',
        zoom: 18,
        center: [127.71948354887672, 26.21705479691047],
        pitch: 60,
        antialias: true
    });
mapboxSystem.onAdd.addEventListener(({ gl, canvas }) => {
    const scene = new InterScene(canvas, { gl, autoAdaptScreenSize: false });
    ECS.addSystem(new CameraSystem(scene));
    ECS.addSystem(new ModelSystem(scene), Number.POSITIVE_INFINITY);
    mapboxSystem.initWorld(scene);

    const resource = new Resource();
    resource.registAssetLoader(".gltf", new LoadGlTF());
    resource.registAssetLoader(".glb", new LoadGlTF());
    resource.load("https://cloud-v3-oss.oss-cn-shanghai.aliyuncs.com/gltfs/castle/scene.gltf")
        .then(asset => {
            const newAsset = Prefab.instance(asset as Prefab);
            newAsset.localRotation = quat.fromEuler(quat.create(), 0, -90, 0);
            newAsset.localScale = vec3.fromValues(2, 2, 2);
            scene.addChild(newAsset);
        });
})
