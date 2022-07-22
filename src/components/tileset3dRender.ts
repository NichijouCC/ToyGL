import { IComponent } from "../core/ecs";
import { Cesium3dTiles } from "../loader/3dtiles/tileset3d";
import { Component } from "../scene";

export class Tileset3dRender extends Component {
    asset: Cesium3dTiles;
    clone(): IComponent {
        throw new Error("Method not implemented.");
    }
}