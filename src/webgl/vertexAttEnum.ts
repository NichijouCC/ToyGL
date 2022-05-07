export enum VertexAttEnum {
    POSITION = 1,
    TEXCOORD_0 = 1 << 1,
    COLOR_0 = 1 << 2,
    NORMAL = 1 << 3,
    TANGENT = 1 << 4,
    TEXCOORD_1 = 1 << 5,
    TEXCOORD_2 = 1 << 6,
    WEIGHTS_0 = 1 << 7,
    JOINTS_0 = 1 << 8,
    COLOR_1 = 1 << 9,
    INS_POS = 1 << 10,
}

export interface IVertexAttInfo {
    name: string,
    componentSize: number,
    location: number,
    type: number
}

export namespace VertexAttEnum {

    const attDic: { [type: number]: IVertexAttInfo } = {
        [VertexAttEnum.POSITION]: { name: "position", componentSize: 3, location: 0, type: 1 << 0 },
        [VertexAttEnum.TEXCOORD_0]: { name: "uv", componentSize: 2, location: 1, type: 1 << 1 },
        [VertexAttEnum.COLOR_0]: { name: "color", componentSize: 4, location: 2, type: 1 << 2 },
        [VertexAttEnum.NORMAL]: { name: "normal", componentSize: 4, location: 3, type: 1 << 3 },
        [VertexAttEnum.TANGENT]: { name: "tangent", componentSize: 4, location: 4, type: 1 << 4 },
        [VertexAttEnum.TEXCOORD_1]: { name: "uv1", componentSize: 2, location: 5, type: 1 << 5 },
        [VertexAttEnum.TEXCOORD_2]: { name: "uv2", componentSize: 2, location: 6, type: 1 << 6 },
        [VertexAttEnum.WEIGHTS_0]: { name: "skinWeight", componentSize: 4, location: 7, type: 1 << 7 },
        [VertexAttEnum.JOINTS_0]: { name: "skinIndex", componentSize: 4, location: 8, type: 1 << 8 },
        [VertexAttEnum.COLOR_1]: { name: "color1", componentSize: 4, location: 9, type: 1 << 9 },
        [VertexAttEnum.INS_POS]: { name: "ins_pos", componentSize: 3, location: 10, type: 1 << 10 },
    }
    export function toName(type: VertexAttEnum | number) {
        return attDic[type]?.name ?? "未知"
    }

    export function toComponentSize(type: VertexAttEnum | number) {
        if (attDic[type]?.componentSize == null) {
            throw new Error(`无法获取顶点类型【${type}】的componentSize`);
        } else {
            return attDic[type].componentSize;
        }
    }

    export function toShaderLocation(type: VertexAttEnum | number) {
        if (attDic[type]?.location == null) {
            throw new Error(`无法获取顶点类型【${type}】的location`);
        } else {
            return attDic[type].location;
        }
    }

    let nextLocationId = 10;
    export function allocate(name: string, componentSize: number) {
        let locationId = nextLocationId++;
        let type = 1 << locationId;
        let info = { name: `${name}_${locationId}`, componentSize, location: locationId, type };
        attDic[1 << locationId] = info;
        return type;
    }
}

export type VertexFormat = number;
export namespace VertexFormat {
    //数据类型为float32
    export function toByteSize(format: VertexFormat) {
        let dic = VertexAttEnum["attDic"];
        let vertexSize = 0;
        for (let key in dic) {
            let attInfo = dic[key];
            if (attInfo.id & format) {
                vertexSize += attInfo.componentSize * Float32Array.BYTES_PER_ELEMENT;
            }
        }
        return vertexSize;
    }

    export function forEachAtt(format: number, foreach: (att: IVertexAttInfo) => void) {
        let dic = VertexAttEnum["attDic"];
        for (let key in dic) {
            let attInfo = dic[key];
            if (attInfo.id & format) {
                foreach(attInfo);
            }
        }
    }
}