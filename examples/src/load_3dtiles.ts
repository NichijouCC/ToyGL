import { glMatrix, Tiles3d, ToyGL, vec3 } from "TOYGL";

const { world } = ToyGL.create(document.getElementById("canvas") as HTMLCanvasElement);
world.addSystem(new Tiles3d.TilesetSystem(world));

const cam = world.addNewCamera();
glMatrix.setMatrixArrayType(Float64Array as any);
let loader = new Tiles3d.Loader();
loader.load("https://mine-res.oss-cn-shanghai.aliyuncs.com/3dtiles/yangzhou_20201012/Production_2.json")
    .then(res => {
        let node = world.addNewChild();
        let comp = node.addComponent(Tiles3d.TilesetRender);
        comp.asset = res;
        cam.viewTargetPoint(res.boundingVolume.center, 1000)
    })
