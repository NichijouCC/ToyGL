import { Camera } from "./Camera";
import { DrawCommand } from "./DrawCommand";
import { Material } from "./asset/Material";
import { GraphicsDevice } from "../webgl/GraphicsDevice";
import { RenderState } from "./RenderState";
import { Frustum } from "./Frustum";
import { Vec3 } from "../mathD/vec3";
import { BoundingSphere } from "./Bounds";
import { StaticMesh } from "./asset/StaticMesh";
import { MeshInstance } from "./MeshInstance";
import { RenderLayerEnum } from "./RenderLayer";
import { LayerCollection } from "./LayerCollection";
import { IlayerIndexEvent } from "./asset/Shader";


export enum SortTypeEnum
{
    MatLayerIndex = 0b10000,
    ShaderId = 0b01000,
    Zdist_FrontToBack = 0b00100
}

namespace Private
{
    export let preMaterial: Material;
    export let preRenderState: RenderState;
    export let temptSphere: BoundingSphere = new BoundingSphere();
}


export class Render
{
    private device: GraphicsDevice;
    constructor(device: GraphicsDevice)
    {
        this.device = device;
    }

    renderLayers(camera: Camera, layer: LayerCollection)
    {
        var commands = layer.getSortedinsArr(camera);
        this.render(camera, commands);
    }

    render(camera: Camera, drawCalls: DrawCommand[], lights?: any, )
    {
        let culledDrawcalls = this.cull(camera, drawCalls);
        let drawcall, shader, uniforms, renderState, vertexArray
        for (let i = 0; i < culledDrawcalls.length; i++)
        {
            drawcall = culledDrawcalls[i];
            if (drawcall.material != Private.preMaterial)
            {
                Private.preMaterial = drawcall.material;

                shader = drawcall.material.shader;
                uniforms = drawcall.material.uniformParameters;
                renderState = drawcall.material.renderState;

                shader.glShader.bind();
                shader.glShader.bindUniforms(uniforms);

                if (Private.preRenderState != renderState)
                {
                    this.device.setCullFaceState(renderState.cull.enabled, renderState.cull.cullBack);
                    this.device.setDepthState(renderState.depthWrite, renderState.depthTest.enabled, renderState.depthTest.depthFunc);
                    this.device.setColorMask(renderState.colorWrite.red, renderState.colorWrite.green, renderState.colorWrite.blue, renderState.colorWrite.alpha);
                    this.device.setBlendState(
                        renderState.blend.enabled,
                        renderState.blend.blendEquation,
                        renderState.blend.blendSrc,
                        renderState.blend.blendDst,
                        renderState.blend.enableSeparateBlend,
                        renderState.blend.blendAlphaEquation,
                        renderState.blend.blendSrcAlpha,
                        renderState.blend.blendDstAlpha,
                    );
                    this.device.setStencilState(
                        renderState.stencilTest.enabled,
                        renderState.stencilTest.stencilFunction,
                        renderState.stencilTest.stencilRefValue,
                        renderState.stencilTest.stencilMask,
                        renderState.stencilTest.stencilFail,
                        renderState.stencilTest.stencilFaileZpass,
                        renderState.stencilTest.stencilPassZfail,
                        renderState.stencilTest.enableSeparateStencil,
                        renderState.stencilTest.stencilFunctionBack,
                        renderState.stencilTest.stencilRefValueBack,
                        renderState.stencilTest.stencilMaskBack,
                        renderState.stencilTest.stencilFailBack,
                        renderState.stencilTest.stencilFaileZpassBack,
                        renderState.stencilTest.stencilPassZfailBack,
                    );
                }

            }
            drawcall.vertexArray.bind();
            this.device.draw(drawcall.vertexArray, drawcall.instanceCount);
        }
    }
    /**
     * 使用camera cullingMask和frustum 剔除不可见物体
     * @param camera 
     * @param drawCalls 
     */
    cull(camera: Camera, drawCalls: DrawCommand[])
    {
        let visualArr = [];
        let { cullingMask, frustum } = camera;
        let drawcall
        for (let i = 0; i < drawCalls.length; i++)
        {
            drawcall = drawCalls[i];
            if (!drawcall.bevisible || (drawcall.cullingMask != null && ((drawcall.cullingMask & cullingMask) == 0))) continue;
            if (drawcall.enableCull)
            {
                if (this.frustumCull(frustum, drawcall))
                {
                    visualArr.push(drawcall);
                }
            }
        }
        return visualArr;
    }

    private frustumCull(frustum: Frustum, drawcall: DrawCommand)
    {
        BoundingSphere.fromBoundingBox(drawcall.boundingBox, Private.temptSphere);
        return frustum.containSphere(Private.temptSphere, drawcall.worldMat);
    }
}