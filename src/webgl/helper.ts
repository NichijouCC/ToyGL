export function CheckCanRenderToFrameBuffer(gl: WebGLRenderingContext, type: number) {
    while (gl.getError() !== gl.NO_ERROR) {}

    let successful = true;

    let texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        this._getRGBABufferInternalSizedFormat(type),
        1,
        1,
        0,
        gl.RGBA,
        this._getWebGLTextureType(type),
        null,
    );
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

    let fb = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
    let status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);

    successful = successful && status === gl.FRAMEBUFFER_COMPLETE;
    successful = successful && gl.getError() === gl.NO_ERROR;

    //try render by clearing frame buffer's color buffer
    if (successful) {
        gl.clear(gl.COLOR_BUFFER_BIT);
        successful = successful && gl.getError() === gl.NO_ERROR;
    }

    //try reading from frame to ensure render occurs (just creating the FBO is not sufficient to determine if rendering is supported)
    if (successful) {
        //in practice it's sufficient to just read from the backbuffer rather than handle potentially issues reading from the texture
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        let readFormat = gl.RGBA;
        let readType = gl.UNSIGNED_BYTE;
        let buffer = new Uint8Array(4);
        gl.readPixels(0, 0, 1, 1, readFormat, readType, buffer);
        successful = successful && gl.getError() === gl.NO_ERROR;
    }

    //clean up
    gl.deleteTexture(texture);
    gl.deleteFramebuffer(fb);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    //clear accumulated errors
    while (!successful && gl.getError() !== gl.NO_ERROR) {}

    return successful;
}
