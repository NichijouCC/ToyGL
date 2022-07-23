import { loadArrayBuffer, LoadTileset3d, ToyGL, vec3 } from "TOYGL";
import { initToy } from "./util";

import { B3dmParser } from '../../src/loader/3dtiles/b3dm';

const toy = ToyGL.create(document.getElementById("canvas") as HTMLCanvasElement);
const cam = toy.world.addNewCamera();
const size = 10;
cam.entity.localPosition = vec3.fromValues(size, size, size);
cam.entity.lookAtPoint(vec3.create());

let loader = new LoadTileset3d();
loader.load("https://mine-res.oss-cn-shanghai.aliyuncs.com/3dtiles/yangzhou_20201012/Production_2.json")
    .then(res => {

    })


loadArrayBuffer("https://mine-res.oss-cn-shanghai.aliyuncs.com/3dtiles/yangzhou_20201012/Data/Tile_1/Tile_1.b3dm")
    .then(res => {
        B3dmParser.parse(res)
    })

