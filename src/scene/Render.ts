import { Camera } from "./Camera";
import { DrawCommand } from "./DrawCommand";
import { Material } from "./Material";
import { GraphicsDevice } from "../webgl/GraphicsDevice";
import { RenderState } from "./RenderState";
import { Frustum } from "./Frustum";
import { Vec3 } from "../mathD/vec3";
import { BoundingSphere } from "./Bounds";
import { StaticMesh } from "./mesh/StaticMesh";
import { MeshInstance } from "./MeshInstance";
import { RenderLayerEnum } from "./RenderLayer";
import { LayerCollection } from "./LayerCollection";
import { IlayerIndexEvent } from "./Shader";


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


    export const sortByMatLayerIndex = (drawa: DrawCommand, drawb: DrawCommand): boolean =>
    {
        return drawa.material.layerIndex - drawb.material.layerIndex as any;
    }

    export const sortByZdist_FrontToBack = (drawa: DrawCommand, drawb: DrawCommand): boolean =>
    {
        return drawa.zdist - drawb.zdist as any;
    }
    export const sortByZdist_BackToFront = (drawa: DrawCommand, drawb: DrawCommand): boolean =>
    {
        return drawb.zdist - drawa.zdist as any;
    }


    export const sortByShaderId = (drawa: DrawCommand, drawb: DrawCommand): boolean =>
    {
        return drawb.material.shader.id - drawb.material.shader.id as any;
    }

    export const sortTypeInfo: { [type: string]: { sortFunc: (drawa: DrawCommand, drawb: DrawCommand) => boolean } } = {};
    {
        sortTypeInfo[SortTypeEnum.MatLayerIndex] = { sortFunc: sortByMatLayerIndex };
        sortTypeInfo[SortTypeEnum.ShaderId] = { sortFunc: sortByShaderId };
        sortTypeInfo[SortTypeEnum.Zdist_FrontToBack] = { sortFunc: sortByZdist_FrontToBack };
    }
}


export class Render
{
    private device: GraphicsDevice;
    constructor(device: GraphicsDevice)
    {
        this.device = device;
        this.layers.set(RenderLayerEnum.Background, new LayerCollection());
        this.layers.set(RenderLayerEnum.Geometry, new LayerCollection(SortTypeEnum.MatLayerIndex | SortTypeEnum.ShaderId));
        this.layers.set(RenderLayerEnum.AlphaTest, new LayerCollection(SortTypeEnum.MatLayerIndex | SortTypeEnum.Zdist_FrontToBack));
        this.layers.set(RenderLayerEnum.Transparent, new LayerCollection(SortTypeEnum.MatLayerIndex | SortTypeEnum.Zdist_FrontToBack));
    }

    private layers: Map<number, LayerCollection> = new Map();
    createMeshInstance(mesh: StaticMesh, mat: Material)
    {
        let newIns = new MeshInstance();
        newIns.mesh = mesh;
        newIns.material = mat;

        this.layers.get(mat.layer).add(newIns);
        newIns.onchangeLayer.addEventListener((oldLayer, newLayer) =>
        {
            if (oldLayer != null)
            {
                this.layers.get(oldLayer).remove(newIns);
            }
            if (newLayer != null)
            {
                this.layers.get(newLayer).add(newIns);
            }
        });

        return newIns;
    }
    renderLayers(camera: Camera)
    {
        var commands = this.layers.get(RenderLayerEnum.Background).getSortedinsArr(camera);
        this.render(camera, commands);
        commands = this.layers.get(RenderLayerEnum.Geometry).getSortedinsArr(camera);
        this.render(camera, commands);
        commands = this.layers.get(RenderLayerEnum.AlphaTest).getSortedinsArr(camera);
        this.render(camera, commands);
        commands = this.layers.get(RenderLayerEnum.Transparent).getSortedinsArr(camera);
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

                shader.bind();
                shader.bindUniforms(uniforms);

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
            if (drawcall.cullingMask != null && ((drawcall.cullingMask & cullingMask) == 0)) continue;
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

    private calculateDistancesTocamera(drawCalls: DrawCommand[], camPos: Vec3, camFwd: Vec3)
    {
        let i, drawCall, meshPos;
        let tempx, tempy, tempz;
        for (i = 0; i < drawCalls.length; i++)
        {
            drawCall = drawCalls[i];
            meshPos = drawCall.boundingBox.center;
            tempx = meshPos.x - camPos.x;
            tempy = meshPos.y - camPos.y;
            tempz = meshPos.z - camPos.z;
            drawCall.zdist = tempx * camFwd.x + tempy * camFwd.y + tempz * camFwd.z;
        }
    };
}