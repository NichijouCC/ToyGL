import { VertexArray } from "../../../webgl/VertextArray";
import { GraphicsDevice } from "../../../webgl/GraphicsDevice";
import { GeometryAsset } from "./baseGeometry";
import { Asset } from "../asset";
export class StaticMesh extends Asset {
    sbuMeshs: SubMesh[] = [];
    destroy(): void {
        throw new Error("Method not implemented.");
    }
}

export class SubMesh extends GeometryAsset {
    protected create(device: GraphicsDevice): VertexArray {
        throw new Error("Method not implemented.");
    }

    protected updateDirtyAtts(device: GraphicsDevice): void {
        throw new Error("Method not implemented.");
    }

    bind(device: GraphicsDevice): void {
        this.graphicAsset?.bind();
    }

    unbind(): void {
        this.graphicAsset?.unbind();
    }

    destroy(): void {
        this.graphicAsset?.destroy();
    }

    set vertexArray(value: VertexArray) { this.graphicAsset = value; }
}
