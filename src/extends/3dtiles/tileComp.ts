import { IComponent } from "../../core/ecs";
import { Component } from "../../scene";
import { Cesium3dTiles } from "./loader";

export class TileRender extends Component {
    asset: Cesium3dTiles;
    clone(): IComponent {
        throw new Error("Method not implemented.");
    }
}