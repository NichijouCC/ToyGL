import { IComponent } from "../../core/ecs";
import { Component } from "../../scene";
import { Cesium3dTileset } from "./loader";

export class TilesetRender extends Component {
    asset: Cesium3dTileset;
    clone(): IComponent {
        throw new Error("Method not implemented.");
    }
}