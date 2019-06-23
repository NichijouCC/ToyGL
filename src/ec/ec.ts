export interface Ientity {
    readonly guid: number;
    beActive: boolean;
    components: { [name: string]: Icomponent };
    addCompByName(compName: string): Icomponent;
    addComp(comp: Icomponent): Icomponent;
    // update(deltaTime: number): void;
    dispose(): void;
}

export interface IcompoentConstructor {
    new (): Icomponent;
}
export interface Icomponent {
    entity: Ientity;
    update(deltaTime: number): void;
    dispose(): void;
}

/**
 * 渲染的层级(从小到大绘制)
 */
export enum RenderLayerEnum {
    Background = 1000,
    Geometry = 2000,
    AlphaTest = 2450,
    Transparent = 3000, //透明
    Overlay = 4000, //Overlay层
}
/**
 * 渲染mask枚举
 */
export enum CullingMask {
    ui = 0x00000001,
    default = 0x00000002,
    editor = 0x00000004,
    model = 0x00000008,
    everything = 0xffffffff,
    nothing = 0x00000000,
    modelbeforeui = 0x00000008,
}
/**
 * 渲染器接口 继承自组件接口
 */
export interface Irender extends Icomponent {
    // layer: RenderLayerEnum;
    // queue: number;
    mask: CullingMask;
    render(): void;
    // materials: Material[];
    // // addToRenderList():void;
    // BeRenderable(): boolean;
    // BeInstantiable(): boolean;
    // bouningSphere: BoundingSphere;
}

export class EC {
    private static dic: { [compName: string]: IcompoentConstructor };
    static RegComp(comp: Function) {
        this.dic[comp.constructor.name] = comp.constructor as IcompoentConstructor;
    }
    static NewComponent(compname: string): Icomponent {
        return new EC.dic[compname]();
    }
}
