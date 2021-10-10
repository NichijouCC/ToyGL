import { CameraSystem, InterScene, LoadGlTF, MapBoxSystem, ModelSystem, Prefab, quat, Resource, ToyGL, vec3 } from "TOYGL";
import { ECS } from "../../src/core/ecs";

let mapboxSystem = new MapBoxSystem(
    { worldCenter: [148.9819, -35.39847, 0], worldRot: [-90, 0, 0] },
    {
        mapboxScript: "https://api.mapbox.com/mapbox-gl-js/v2.5.0/mapbox-gl.js",
        mapboxCss: "https://api.mapbox.com/mapbox-gl-js/v2.5.0/mapbox-gl.css",
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v10',
        zoom: 18,
        center: [148.9819, -35.3981],
        pitch: 60,
        antialias: true
    });
mapboxSystem.onAdd.addEventListener(({ gl, canvas }) => {
    const resource = new Resource();
    const scene = new InterScene(canvas, { gl, autoAdaptScreenSize: false });
    resource.registAssetLoader(".gltf", new LoadGlTF());
    resource.registAssetLoader(".glb", new LoadGlTF());
    ECS.addSystem(new CameraSystem(scene));
    ECS.addSystem(new ModelSystem(scene), Number.POSITIVE_INFINITY);
    mapboxSystem.initWorld(scene);
    resource.load("./A2_066.glb")
        .then(asset => {
            const newAsset = Prefab.instance(asset as Prefab);
            newAsset.localRotation = quat.fromEuler(quat.create(), 0, 0, 0);
            newAsset.localPosition = vec3.fromValues(0, 0, 0);
            scene.addChild(newAsset);
        });
})
