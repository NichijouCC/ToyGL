import { GraphicsDevice } from "./graphicsDevice";

export class VertexAttSetter {
    private static _vertexAttributeSetter: { [size: number]: (index: number, value: any) => any; } = {};

    static get(attSize: number) {
        return this._vertexAttributeSetter[attSize];
    }

    static init(context: GraphicsDevice) {
        this._vertexAttributeSetter[1] = (index, value) => {
            context.gl.vertexAttrib1f(index, value);
        };
        this._vertexAttributeSetter[2] = (index, value) => {
            context.gl.vertexAttrib2fv(index, value);
        };
        this._vertexAttributeSetter[3] = (index, value) => {
            context.gl.vertexAttrib3fv(index, value);
        };
        this._vertexAttributeSetter[4] = (index, value) => {
            context.gl.vertexAttrib4fv(index, value);
        };
    }
}
