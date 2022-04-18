import { IComponent } from "../core/ecs";
import { vec3 } from "../mathD";
import { Component, Entity } from "../scene";

export class LineRender extends Component {
    private _data: vec3[] = [];
    /**
     * 点数据
     */
    set points(data: vec3[]) {

    }
    get points() { return this._data }

    private _width: number = 1;
    /**
     * 线宽度
     */
    set width(width: number) {

    }
    get width() { return this._width }

    private _uvStrategy: "none" | "point-div" | "distance-div" = "point-div";
    /**
     * uv策略, 默认："point-div"
     * 
     * none：不生成UV;
     * 
     * point-div：按照点index均分UV；
     * 
     * distance-div：按照距离均分UV；
     */
    set uvStrategy(type: "none" | "point-div" | "distance-div") {

    }

    clone(): IComponent {
        throw new Error("Method not implemented.");
    }
}