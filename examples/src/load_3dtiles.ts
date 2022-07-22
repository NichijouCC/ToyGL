import { Color, DefaultMaterial, Geometry, loadArrayBuffer, LoadPLY, LoadTileset3d, ManualCamera, mat4, Material, vec3, VertexAttEnum } from "TOYGL";
import { initToy } from "./util";

import { B3dmParser } from '../../src/loader/3dtiles/b3dm';

const toy = initToy();

let loader = new LoadTileset3d();
loader.load("https://mine-res.oss-cn-shanghai.aliyuncs.com/3dtiles/yangzhou_20201012/Production_2.json")
    .then(res => {

    })


loadArrayBuffer("https://mine-res.oss-cn-shanghai.aliyuncs.com/3dtiles/yangzhou_20201012/Data/Tile_1/Tile_1.b3dm")
    .then(res => {
        B3dmParser.parse(res)
    })

