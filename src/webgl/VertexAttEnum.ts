export enum VertexAttEnum
{
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


export namespace VertexAttEnum
{
    export function fromShaderAttName(name: string): VertexAttEnum
    {
        //TODO
        return name as any;
    }
    let locationId = 0;
    export function regist(name: string)
    {
        attLocationMap[name] = locationId++;
    }
    let attLocationMap: { [type: string]: number } = {};
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
    export function toShaderLocation(type: VertexAttEnum | string)
    {
        let location = attLocationMap[type];
        if (location == null)
        {
            console.warn(`regist new attribute Type: ${type}`);
            regist(type);
        }
        return attLocationMap[type];
    }
}