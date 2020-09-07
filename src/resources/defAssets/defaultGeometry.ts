import { VertexAttEnum } from "../../webgl/vertexAttEnum";
import { Geometry } from "../../scene/asset/geometry/geometry";

export namespace Private {
    export const plan = new Geometry({
        attributes: [
            {
                type: VertexAttEnum.POSITION,
                componentsPerAttribute: 3,
                values: [
                    -1.0, 0, 1.0,
                    1.0, 0, 1.0,
                    1.0, 0, -1.0,
                    -1.0, 0, -1.0
                ]
            },
            {
                type: VertexAttEnum.TEXCOORD_0,
                componentsPerAttribute: 2,
                values: [
                    0.0, 0.0,
                    1.0, 0.0,
                    1.0, 1.0,
                    0.0, 1.0
                ]
            },
            {
                type: VertexAttEnum.NORMAL,
                componentsPerAttribute: 3,
                values: [
                    0.0, 1.0, 0.0,
                    0.0, 1.0, 0.0,
                    0.0, 1.0, 0.0,
                    0.0, 1.0, 0.0
                ]
            }
        ],
        indices: [0, 1, 2, 0, 2, 3]
    });

    export const quad = new Geometry({
        attributes: [
            {
                type: VertexAttEnum.POSITION,
                componentsPerAttribute: 3,
                values: [
                    -1.0, -1.0, 0,
                    1.0, -1.0, 0,
                    1.0, 1.0, 0,
                    -1.0, 1.0, 0
                ]
            },
            {
                type: VertexAttEnum.TEXCOORD_0,
                componentsPerAttribute: 2,
                values: [
                    0.0, 0.0,
                    1.0, 0.0,
                    1.0, 1.0,
                    0.0, 1.0
                ]
            },
            {
                type: VertexAttEnum.NORMAL,
                componentsPerAttribute: 3,
                values: [
                    0.0, 0.0, 1.0,
                    0.0, 0.0, 1.0,
                    0.0, 0.0, 1.0,
                    0.0, 0.0, 1.0
                ]
            }
        ],
        indices: [0, 1, 2, 0, 2, 3]
    });

    export const quad2d = new Geometry({
        attributes: [
            {
                type: VertexAttEnum.POSITION,
                componentsPerAttribute: 2,
                values: [
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
                componentsPerAttribute: 2,
                values: [
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

    export const cube = new Geometry({
        attributes: [
            {
                type: VertexAttEnum.POSITION,
                componentsPerAttribute: 3,
                values: [
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
                componentsPerAttribute: 2,
                values: [
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
                componentsPerAttribute: 3,
                values: [
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
    // static get ins() { return new DefaultGeometry() }
    static get quad2d() { return Private.quad2d; }
    static get quad() { return Private.quad; }
    static get cube() { return Private.cube; }
    static get plan() { return Private.plan; }
}
