import { CameraSystem, World, GlTF, MapboxSystem, ModelSystem, quat, Resource, vec3 } from "TOYGL";

let system = new MapboxSystem(
    [127.71948354887672, 26.21705479691047, 25],
    {
        script: "https://api.mapbox.com/mapbox-gl-js/v2.5.0/mapbox-gl.js",
        css: "https://api.mapbox.com/mapbox-gl-js/v2.5.0/mapbox-gl.css",
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v10',
        zoom: 18,
        center: [127.71948354887672, 26.21705479691047],
        pitch: 60,
        antialias: true
    });

system.start()
    .then(({ gl, canvas }) => {
        const scene = new World(canvas, { gl, autoAdaptScreenSize: false });
        scene.addSystem(new CameraSystem(scene));
        scene.addSystem(new ModelSystem(scene), Number.POSITIVE_INFINITY);
        let cam = scene.addNewCamera();
        cam.enableClearColor = false;
        cam.enableClearDepth = false;
        cam.enableClearStencil = false;
        system.world = scene;

        const resource = new Resource();
        resource.registLoaderWithExt(".gltf", new GlTF.LoadGlTF());
        resource.registLoaderWithExt(".glb", new GlTF.LoadGlTF());
        resource.load("https://cloud-v3-oss.oss-cn-shanghai.aliyuncs.com/gltfs/castle/scene.gltf")
            .then(asset => {
                const newAsset = (asset as GlTF.GltfAsset).createInstance(scene);
                newAsset.localRotation = quat.fromEuler(quat.create(), 0, -90, 0);
                newAsset.localScale = vec3.fromValues(2, 2, 2);
                scene.addChild(newAsset);
            });
    })

