/* eslint-disable no-redeclare */
/* eslint-disable import/export */
export enum VertexAttEnum {
    POSITION = "position",
    TEXCOORD_0 = "uv",
    COLOR_0 = "color",
    NORMAL = "normal",
    TANGENT = "tangent",
    TEXCOORD_1 = "uv1",
    TEXCOORD_2 = "uv2",
    WEIGHTS_0 = "skinWeight",
    JOINTS_0 = "skinIndex"
}

export namespace VertexAttEnum {

    export const attTypeToComponentSize: { [type: string]: number } = {};
    {
        attTypeToComponentSize[VertexAttEnum.POSITION] = 3;
        attTypeToComponentSize[VertexAttEnum.TEXCOORD_0] = 2;
        attTypeToComponentSize[VertexAttEnum.TEXCOORD_1] = 2;
        attTypeToComponentSize[VertexAttEnum.TEXCOORD_2] = 2;
        attTypeToComponentSize[VertexAttEnum.COLOR_0] = 4;
        attTypeToComponentSize[VertexAttEnum.NORMAL] = 4;
        attTypeToComponentSize[VertexAttEnum.TANGENT] = 4;
        attTypeToComponentSize[VertexAttEnum.WEIGHTS_0] = 4;
        attTypeToComponentSize[VertexAttEnum.JOINTS_0] = 4;
    }

    export function fromShaderAttName(name: string): VertexAttEnum {
        // TODO
        return name as any;
    }
    let locationId = 0;
    export function regist(name: string) {
        attLocationMap[name] = locationId++;
    }
    const attLocationMap: { [type: string]: number } = {};
    {
        regist(VertexAttEnum.POSITION);
        regist(VertexAttEnum.TEXCOORD_0);
        regist(VertexAttEnum.COLOR_0);
        regist(VertexAttEnum.NORMAL);
        regist(VertexAttEnum.TANGENT);
        regist(VertexAttEnum.JOINTS_0);
        regist(VertexAttEnum.WEIGHTS_0);
        regist(VertexAttEnum.TEXCOORD_1);
        regist(VertexAttEnum.TEXCOORD_2);
    }
    export function toShaderLocation(type: VertexAttEnum | string) {
        const location = attLocationMap[type];
        if (location == null) {
            console.warn(`regist new attribute Type: ${type}`);
            regist(type);
        }
        return attLocationMap[type];
    }

    export function toComponentSize(type: VertexAttEnum | string) {
        if (attTypeToComponentSize[type] == null) {
            throw new Error(`无法推断顶点类型【${type}】的componentSize`);
        } else {
            return attTypeToComponentSize[type];
        }
    }
}
