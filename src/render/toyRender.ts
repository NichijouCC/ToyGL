
export class ToyRender {
    private render: Irender;
    constructor(option: ItoyRenderOption) {
    }
}

export class Graphics {
    private static render: Irender;
    private static init(option:) {

    }
    static createShaderProgram(vs: string, fs: string): WebGLProgram {
        return this.render.createShaderProgram(vs, fs);
    }
}