import { ToyGL } from "../src/toygl";
import { DefGeometry } from "../src/resources/defGeometry";
import { DefShader } from "../src/resources/defShader";
import { Material } from "../src/resources/assets/material";
import { Entity } from "../src/ec/entity";
import { Mesh } from "../src/ec/components/mesh";
import { Color } from "../src/mathD/color";

window.onload = () => {
    let toy = new ToyGL();
    toy.initByHtmlElement(document.getElementById("canvas") as HTMLCanvasElement);

    let geometry = DefGeometry.fromType("quad");
    let shader = DefShader.fromType("color");
    let material = new Material();
    material.shader = shader;
    material.setColor("MainColor", Color.create(1, 0, 0, 1));

    let obj = new Entity();
    let mesh = obj.addCompByName("Mesh") as Mesh;
    mesh.geometry = geometry;
    mesh.material = material;

    toy.scene.addEntity(obj);

    let camobj = new Entity("", ["Camera"]);
    toy.scene.addEntity(camobj);
};
