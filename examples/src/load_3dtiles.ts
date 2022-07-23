import { glMatrix, loadArrayBuffer, Tiles3d, ToyGL, vec3 } from "TOYGL";

const toy = ToyGL.create(document.getElementById("canvas") as HTMLCanvasElement);
const cam = toy.world.addNewCamera();
const size = 10;
cam.entity.localPosition = vec3.fromValues(size, size, size);
cam.entity.lookAtPoint(vec3.create());

glMatrix.setMatrixArrayType(Float64Array as any);

let loader = new Tiles3d.Loader();
loader.load("https://mine-res.oss-cn-shanghai.aliyuncs.com/3dtiles/yangzhou_20201012/Production_2.json")
    .then(res => {

    })


loadArrayBuffer("https://mine-res.oss-cn-shanghai.aliyuncs.com/3dtiles/yangzhou_20201012/Data/Tile_1/Tile_1.b3dm")
    .then(res => {

    })

