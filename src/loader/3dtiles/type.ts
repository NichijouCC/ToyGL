
export type IBoundingVolume = IRegionVolume | IBoxVolume | ISphereVolume;
export interface IRegionVolume {
    region: number[],
}
export interface IBoxVolume {
    box: number[],
}
export interface ISphereVolume {
    sphere: number[],
}

export type IRefine = "ADD" | "REPLACE"

export interface ITile {
    geometricError: number,
    boundingVolume: IBoundingVolume,
    content: {
        boundingVolume: IBoundingVolume,
        uri: string,
    },
    refine: IRefine,
    children: ITile[]
}


export interface IMinMax {
    minimum: number,
    maximum: number,
}
export interface I3dtileProperty {
    Longitude: IMinMax,
    Latitude: IMinMax,
    Height: IMinMax
}

export interface I3dtiles {
    asset: { version: string };
    properties: I3dtileProperty,
    geometricError: number,
    root: ITile,
}


//tile Format
export type ITileFormat = "b3dm" | "i3dm" | "pnts" | "cmpt";
export type IComponentType = "DOUBLE" | "FLOAT" | "INT" | "UNSIGNED INT" | "SHORT" | "UNSIGNED BYTE" | "BYTE";
export type IComponentDataType = "VEC4" | "VEC3" | "VEC2" | "SCALAR";

export interface IFeatureTableJson {
    INSTANCES_LENGTH: number,
    POSITION: {
        byteOffset: number,
    },
    NORMAL_UP?: {
        byteOffset: number,
    },
    NORMAL_RIGHT?: {
        byteOffset: number,
    },
    SCALE?: {
        byteOffset: number,
    }
}

export interface IBatchAtt {
    byteOffset: number,
    componentType: IComponentType,
    type: IComponentDataType
}
export interface IBatchTableJson {
    BATCH_LENGTH: number,
    RTC_CENTER: number,
    location: IBatchAtt,
    id: IBatchAtt,
}


//b3dm
//<----------------------  header bytes[0..12] ----------------------------->
//|-- tile format(uchar[4]) --|-- version(uint32) --|-- byteLength(uint32) --|
//
//....<---------------------- header bytes[12..28] ---------------------------------------------------------->
//....|-- featureTableJsonByteLength(uint32) --|-- featureTableBinaryByteLength(uint32) --|-- BatchTableJsonByteLength(uint32) --|-- batchTableBinaryByteLength(uint32) --|
//
//....<----------------------- body ---------------------------------------->
//....|-- Feature table --|-- batch table --|-- binary gltf --|

export interface IB3dmFeatureTableJson {
    BATCH_LENGTH: number,
    RTC_CENTER: number[],
}

// i3dm
// 如果 gltfFormat =0,则gltf数据是一个url，如果gltfFormat =1，则gltf数据放在body中。
//<----------------------  header bytes[0..12] ----------------------------->
//|-- tile format(uchar[4]) --|-- version(uint32) --|-- byteLength(uint32) --|
//
//....<---------------------- header bytes[12..32] ---------------------------------------------------------->
//....|-- featureTableJsonByteLength(uint32) --|-- featureTableBinaryByteLength(uint32) --|-- BatchTableJsonByteLength(uint32) --|-- batchTableBinaryByteLength(uint32) --|-- gltfFormat(uint32) --|
//
//....<----------------------- body ---------------------------------------->
//....|-- Feature table --|-- batch table --|-- url(UTF-8) OR binary gltf --|



export interface II3dmFeatureTableJson {
    INSTANCES_LENGTH: number,//uint32

    RTC_CENTER?: number[],//float32[3]
    QUANTIZED_VOLUME_OFFSET?: number[],//float32[3]
    QUANTIZED_VOLUME_SCALE?: number[],//float32[3]
    EAST_NORTH_UP?: boolean,

    POSITION?: {//per - float32[3]
        byteOffset: number,
    },
    POSITIONS_QUANTIZED: {//per - uint16[3]
        byteOffset: number,
    },

    NORMAL_UP?: {//per - float32[3]
        byteOffset: number,
    };
    NORMAL_UP_OCT32P?: any,//uint16[2]

    NORMAL_RIGHT?: {//per - float32[3]
        byteOffset: number,
    },
    NORMAL_RIGHT_OCT32P?: any,//uint16[2]

    SCALE?: {//per - float32
        byteOffset: number,
    },
    SCALE_NON_UNIFORM?: {//per - float32[3]
        byteOffset: number,
    }
    BATCH_ID: {//per - uint8/16/32
        byteOffset: number,
    },
}

//pnts
//<----------------------  header bytes[0..12] ----------------------------->
//|-- tile format(uchar[4]) --|-- version(uint32) --|-- byteLength(uint32) --|
//
//....<---------------------- header bytes[12..28] ---------------------------------------------------------->
//....|-- featureTableJsonByteLength(uint32) --|-- featureTableBinaryByteLength(uint32) --|-- BatchTableJsonByteLength(uint32) --|-- batchTableBinaryByteLength(uint32) --|
//
//....<---------------- body --------------->
//....|-- Feature table --|-- batch table --|
