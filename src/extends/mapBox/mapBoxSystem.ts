import { CameraComponent, glMatrix, LoadCss, LoadScript, mat4, quat, System, vec3, World } from '../../index';

import map from 'mapbox-gl';
declare global {
    export const mapboxgl: typeof map;
}

export class MapboxSystem {
    caries = { comps: [CameraComponent] };
    readonly worldCenter: number[] = [];
    readonly worldRot: number[] = [-90, 0, 0];
    world: World;
    map: mapboxgl.Map;
    private _option: mapboxgl.MapboxOptions & { script: string, css: string };
    constructor(worldCenter: number[], option: mapboxgl.MapboxOptions & { script: string, css: string }) {
        this.worldCenter = worldCenter;
        this._option = option;
    }
    async start() {
        await Promise.all([LoadScript(this._option.script), LoadCss(this._option.css)])
        mapboxgl.accessToken = 'pk.eyJ1IjoibmljaGlqb3VjYyIsImEiOiJja3BnZzVwMDkwNW9rMnNudmZmMzdwaDV4In0.O5_AwAIIoI4ee5PxbY2r4A';
        const map = new mapboxgl.Map(this._option);
        this.map = map;

        const modelAsMercatorCoordinate = mapboxgl.MercatorCoordinate.fromLngLat(
            [this.worldCenter[0], this.worldCenter[1]],
            this.worldCenter[2]
        );
        let scale = modelAsMercatorCoordinate.meterInMercatorCoordinateUnits();
        let toWorldCoordinate = mat4.fromRotationTranslationScale(
            mat4.create(),
            quat.fromEuler(quat.create(), this.worldRot[0], this.worldRot[1], this.worldRot[2]),
            vec3.fromValues(modelAsMercatorCoordinate.x, modelAsMercatorCoordinate.y, modelAsMercatorCoordinate.z),
            vec3.fromValues(scale, -1 * scale, scale),
        )
        glMatrix.setMatrixArrayType(Float64Array as any);

        let toGlMat = mat4.create()
        let projectMat = mat4.create();
        let lastTime;

        let resolveTask: (data: { canvas: HTMLCanvasElement, gl: WebGLRenderingContext }) => void
        let task = new Promise<{ canvas: HTMLCanvasElement, gl: WebGLRenderingContext }>((resolve, reject) => {
            resolveTask = resolve;
        })
        const customLayer: mapboxgl.AnyLayer = {
            id: '3d-model',
            type: 'custom',
            renderingMode: '3d',
            onAdd: (map, gl) => {
                resolveTask({ canvas: map.getCanvas(), gl })
            },
            render: (gl, matrix) => {
                if (this.world?.mainCamera == null) return;
                this.world.mainCamera["_projectMatBeDirty"] = false;
                mat4.set(toGlMat, matrix[0], matrix[1], matrix[2], matrix[3],
                    matrix[4], matrix[5], matrix[6], matrix[7],
                    matrix[8], matrix[9], matrix[10], matrix[11],
                    matrix[12], matrix[13], matrix[14], matrix[15])
                const result = mat4.multiply(projectMat, toGlMat, toWorldCoordinate);
                this.world.mainCamera["_projectMatrix"] = result;
                let deltaTime = lastTime ? Date.now() - lastTime : 0;
                lastTime = Date.now();
                let device = this.world.render.device;
                device.unbindVao();
                device.unbindShaderProgram();
                device.unbindVbo();
                device.unbindTextureUnit();
                this.world.update(deltaTime);
                device.unbindVao();
                device.unbindShaderProgram();
                device.unbindVbo();
                device.unbindTextureUnit();

                this.map.triggerRepaint();
            }
        };

        map.on('style.load', () => {
            map.addLayer(customLayer, 'waterway-label');
        });

        return task;
    }
}