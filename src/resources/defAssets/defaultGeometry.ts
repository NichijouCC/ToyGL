import { VertexAttEnum } from "../../render";
import { Geometry } from "../../render/geometry";

export namespace Private {
    export const plan = () => new Geometry({
        attributes: [
            {
                type: VertexAttEnum.POSITION,
                componentSize: 3,
                data: [
                    -1.0, 0, 1.0,
                    1.0, 0, 1.0,
                    1.0, 0, -1.0,
                    -1.0, 0, -1.0
                ]
            },
            {
                type: VertexAttEnum.TEXCOORD_0,
                componentSize: 2,
                data: [
                    0.0, 0.0,
                    1.0, 0.0,
                    1.0, 1.0,
                    0.0, 1.0
                ]
            },
            {
                type: VertexAttEnum.NORMAL,
                componentSize: 3,
                data: [
                    0.0, 1.0, 0.0,
                    0.0, 1.0, 0.0,
                    0.0, 1.0, 0.0,
                    0.0, 1.0, 0.0
                ]
            }
        ],
        indices: [0, 1, 2, 0, 2, 3]
    });

    export const quad = () => new Geometry({
        attributes: [
            {
                type: VertexAttEnum.POSITION,
                componentSize: 3,
                data: [
                    -1.0, -1.0, 0,
                    1.0, -1.0, 0,
                    1.0, 1.0, 0,
                    -1.0, 1.0, 0
                ]
            },
            {
                type: VertexAttEnum.TEXCOORD_0,
                componentSize: 2,
                data: [
                    0.0, 0.0,
                    1.0, 0.0,
                    1.0, 1.0,
                    0.0, 1.0
                ]
            },
            {
                type: VertexAttEnum.NORMAL,
                componentSize: 3,
                data: [
                    0.0, 0.0, 1.0,
                    0.0, 0.0, 1.0,
                    0.0, 0.0, 1.0,
                    0.0, 0.0, 1.0
                ]
            }
        ],
        indices: [0, 1, 2, 0, 2, 3]
    });

    export const quad2d = () => new Geometry({
        attributes: [
            {
                type: VertexAttEnum.POSITION,
                componentSize: 2,
                data: [
                    -1.0, -1.0,
                    1.0, -1.0,
                    1.0, 1.0,
                    1.0, 1.0,
                    -1.0, 1.0,
                    -1.0, -1.0
                ]
            },
            {
                type: VertexAttEnum.TEXCOORD_0,
                componentSize: 2,
                data: [
                    0.0, 0.0,
                    1.0, 0.0,
                    1.0, 1.0,
                    1.0, 1.0,
                    0.0, 1.0,
                    0.0, 0.0
                ]
            }
        ]
    });

    export const cube = () => new Geometry({
        attributes: [
            {
                type: VertexAttEnum.POSITION,
                componentSize: 3,
                data: [
                    // Front face
                    -1.0, -1.0, 1.0,
                    1.0, -1.0, 1.0,
                    1.0, 1.0, 1.0,
                    -1.0, 1.0, 1.0,

                    // Back face
                    -1.0, -1.0, -1.0,
                    -1.0, 1.0, -1.0,
                    1.0, 1.0, -1.0,
                    1.0, -1.0, -1.0,

                    // Top face
                    -1.0, 1.0, -1.0,
                    -1.0, 1.0, 1.0,
                    1.0, 1.0, 1.0,
                    1.0, 1.0, -1.0,

                    // Bottom face
                    -1.0, -1.0, -1.0,
                    1.0, -1.0, -1.0,
                    1.0, -1.0, 1.0,
                    -1.0, -1.0, 1.0,

                    // Right face
                    1.0, -1.0, -1.0,
                    1.0, 1.0, -1.0,
                    1.0, 1.0, 1.0,
                    1.0, -1.0, 1.0,

                    // Left face
                    -1.0, -1.0, -1.0,
                    -1.0, -1.0, 1.0,
                    -1.0, 1.0, 1.0,
                    -1.0, 1.0, -1.0
                ]
            },
            {
                type: VertexAttEnum.TEXCOORD_0,
                componentSize: 2,
                data: [
                    // Front
                    0.0, 0.0,
                    1.0, 0.0,
                    1.0, 1.0,
                    0.0, 1.0,
                    // Back
                    0.0, 0.0,
                    1.0, 0.0,
                    1.0, 1.0,
                    0.0, 1.0,
                    // Top
                    0.0, 0.0,
                    1.0, 0.0,
                    1.0, 1.0,
                    0.0, 1.0,
                    // Bottom
                    0.0, 0.0,
                    1.0, 0.0,
                    1.0, 1.0,
                    0.0, 1.0,
                    // Right
                    0.0, 0.0,
                    1.0, 0.0,
                    1.0, 1.0,
                    0.0, 1.0,
                    // Left
                    0.0, 0.0,
                    1.0, 0.0,
                    1.0, 1.0,
                    0.0, 1.0
                ]
            },
            {
                type: VertexAttEnum.NORMAL,
                componentSize: 3,
                data: [
                    // Front
                    0.0, 0.0, 1.0,
                    0.0, 0.0, 1.0,
                    0.0, 0.0, 1.0,
                    0.0, 0.0, 1.0,

                    // Back
                    0.0, 0.0, -1.0,
                    0.0, 0.0, -1.0,
                    0.0, 0.0, -1.0,
                    0.0, 0.0, -1.0,

                    // Top
                    0.0, 1.0, 0.0,
                    0.0, 1.0, 0.0,
                    0.0, 1.0, 0.0,
                    0.0, 1.0, 0.0,

                    // Bottom
                    0.0, -1.0, 0.0,
                    0.0, -1.0, 0.0,
                    0.0, -1.0, 0.0,
                    0.0, -1.0, 0.0,

                    // Right
                    1.0, 0.0, 0.0,
                    1.0, 0.0, 0.0,
                    1.0, 0.0, 0.0,
                    1.0, 0.0, 0.0,

                    // Left
                    -1.0, 0.0, 0.0,
                    -1.0, 0.0, 0.0,
                    -1.0, 0.0, 0.0,
                    -1.0, 0.0, 0.0
                ]
            }
        ],
        indices: [
            0, 1, 2, 0, 2, 3, // front
            4, 5, 6, 4, 6, 7, // back
            8, 9, 10, 8, 10, 11, // top
            12, 13, 14, 12, 14, 15, // bottom
            16, 17, 18, 16, 18, 19, // right
            20, 21, 22, 20, 22, 23 // left
        ]
    });
}

export class DefaultGeometry {
    private static _quad2d: Geometry;
    static get quad2d() {
        if (this._quad2d == null) {
            this._quad2d = Private.quad2d();
        }
        return this._quad2d;
    }

    private static _quad: Geometry;
    static get quad() {
        if (this._quad == null) {
            this._quad = Private.quad();
        }
        return this._quad;
    }

    private static _cube: Geometry;
    static get cube() {
        if (this._cube == null) {
            this._cube = Private.cube();
        }
        return this._cube;
    }

    private static _plan: Geometry;
    static get plan() {
        if (this._plan == null) {
            this._plan = Private.plan();
        }
        return this._plan;
    }
}
