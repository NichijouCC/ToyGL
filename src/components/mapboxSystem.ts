import { IComponent } from "../core/ecs";
import { glMatrix, mat4, quat, vec3 } from "../mathD";
import { InterScene, System } from "../scene";
import { CameraComponent } from "./cameraComponent";
import { EventTarget } from '@mtgoo/ctool'
import { LoadCss, LoadScript } from "../io";
export class MapBoxSystem extends System {
    caries: { [queryKey: string]: (new () => IComponent)[]; } = { comps: [CameraComponent] };
    readonly worldCenter: number[] = [];
    readonly worldRot: number[] = [-90, 0, 0];
    private _scene: InterScene;
    map: mapboxgl.Map;
    private _mapboxOption: mapboxgl.MapboxOptions & { mapboxScript: string, mapboxCss: string };
    constructor(worldCenter: number[], mapboxOption: mapboxgl.MapboxOptions & { mapboxScript: string, mapboxCss: string }) {
        super();
        this.worldCenter = worldCenter;
        this._mapboxOption = mapboxOption;
    }

    async init() {
        await Promise.all([LoadScript(this._mapboxOption.mapboxScript), LoadCss(this._mapboxOption.mapboxCss)])
        mapboxgl.accessToken = 'pk.eyJ1IjoibmljaGlqb3VjYyIsImEiOiJja3BnZzVwMDkwNW9rMnNudmZmMzdwaDV4In0.O5_AwAIIoI4ee5PxbY2r4A';
        const map = new mapboxgl.Map(this._mapboxOption);
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
        const customLayer: mapboxgl.AnyLayer = {
            id: '3d-model',
            type: 'custom',
            renderingMode: '3d',
            onAdd: (map, gl) => {
                this.onAdd.raiseEvent({
                    canvas: map.getCanvas(),
                    gl
                })
            },
            render: (gl, matrix) => {
                if (this._scene?.mainCamera == null) return;
                this._scene.mainCamera["_projectMatBeDirty"] = false;
                mat4.set(toGlMat, matrix[0], matrix[1], matrix[2], matrix[3],
                    matrix[4], matrix[5], matrix[6], matrix[7],
                    matrix[8], matrix[9], matrix[10], matrix[11],
                    matrix[12], matrix[13], matrix[14], matrix[15])
                const result = mat4.multiply(projectMat, toGlMat, toWorldCoordinate);
                this._scene.mainCamera["_projectMatrix"] = result;
                let deltaTime = lastTime ? Date.now() - lastTime : 0;
                lastTime = Date.now();
                let device = this._scene.render.device;
                device.unbindVao();
                device.unBindShaderProgram();
                device.unbindVbo();
                device.unbindTextureUnit();
                this._scene.update(deltaTime);
                device.unbindVao();
                device.unBindShaderProgram();
                device.unbindVbo();
                device.unbindTextureUnit();

                this.map.triggerRepaint();
            }
        };

        map.on('style.load', () => {
            map.addLayer(customLayer, 'waterway-label');
        });
    }
    onAdd = new EventTarget<{ canvas: HTMLCanvasElement, gl: WebGLRenderingContext }>();
    initWorld(scene: InterScene) {
        this._scene = scene;
        let cam = scene.addNewCamera();
        cam.enableClearColor = false;
        cam.enableClearDepth = false;
        cam.enableClearStencil = false;
    }
}