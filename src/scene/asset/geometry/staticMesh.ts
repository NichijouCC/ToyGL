import { VertexArray } from "../../../webgl/vertexArray";
import { GraphicsDevice } from "../../../webgl/graphicsDevice";
import { AbstractGeometryAsset } from "./abstractGeometryAsset";
import { Asset } from "../asset";
export class StaticMesh extends Asset {
    subMeshes: PrimitiveMesh[] = [];
    destroy(): void {
        throw new Error("Method not implemented.");
    }
}

export class PrimitiveMesh extends AbstractGeometryAsset {
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
