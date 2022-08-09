
export type IBoundingVolume = IRegionVolume | IBoxVolume | ISphereVolume;
export interface IVolume {
    extensions?: object,
    extras?: any,
}
export interface IRegionVolume extends IVolume {
    region: number[],
}
export interface IBoxVolume extends IVolume {
    box: number[],
}
export interface ISphereVolume extends IVolume {
    sphere: number[],
}

export type IRefine = "ADD" | "REPLACE"

export interface ITile {
    geometricError: number,
    boundingVolume: IBoundingVolume,
    transform?: number[],//mat4
    content?: ITileContent,
    viewerRequestVolume?: IBoundingVolume,
    refine?: IRefine,
    children?: ITile[],
    extras?: any,
}

export interface ITileContent {
    boundingVolume: IBoundingVolume,
    url?: string,
    uri?: string,
}


export interface I3dtileProperty {
    minimum: number,
    maximum: number,
    extensions?: object,
}

export interface I3dTiles {
    asset: { version: string, tilesetVersion?: string, extensions?: object, extras?: any };
    geometricError: number,
    root: ITile,
    properties?: { [att: string]: I3dtileProperty },
    extensionsUsed?: string[],
    extensionsRequired?: string[],
    extensions?: { [att: string]: any },
    extras?: any,
}

//tile Format
export type ITileFormat = "b3dm" | "i3dm" | "pnts" | "cmpt" | "json";
export type IComponentType = "DOUBLE" | "FLOAT" | "INT" | "UNSIGNED INT" | "SHORT" | "UNSIGNED BYTE" | "BYTE";
export type IComponentDataType = "VEC4" | "VEC3" | "VEC2" | "SCALAR";
export interface IBatchAtt {
    byteOffset: number,
    componentType?: IComponentType,
    type?: IComponentDataType
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
    RTC_CENTER?: number[],//float32[3]
    extensions?: object,
    extras?: any;
}
export interface IB3dmBatchTableJson {

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

    POSITION?: IBatchAtt,//per - float32[3]
    POSITIONS_QUANTIZED: IBatchAtt, //per - uint16[3]

    NORMAL_UP?: IBatchAtt//per - float32[3]
    NORMAL_UP_OCT32P?: IBatchAtt,//uint16[2]

    NORMAL_RIGHT?: IBatchAtt//per - float32[3]
    NORMAL_RIGHT_OCT32P?: IBatchAtt,//uint16[2]

    SCALE?: IBatchAtt,//per - float32
    SCALE_NON_UNIFORM?: IBatchAtt//per - float32[3]
    BATCH_ID: IBatchAtt//per - uint8/16/32
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

export interface IPntsFeatureTableJson {
    POINTS_LENGTH: number,//uint32
    QUANTIZED_VOLUME_OFFSET?: number[],//float32[3]
    QUANTIZED_VOLUME_SCALE?: number[],//float32[3]
    CONSTANT_RGBA?: number[],//uint8[4]
    RTC_CENTER?: number[],//float32[3]

    POSITION: IBatchAtt,//per - float32[3]
    POSITIONS_QUANTIZED: IBatchAtt, //per - uint16[3]
    NORMAL?: IBatchAtt,//per - float32[3]
    NORMAL_OCT16P?: IBatchAtt//per - uint8[2]
    RGB?: IBatchAtt,//per - uint8[3]
    RGBA?: IBatchAtt,//per - uint8[4]
    RGB565?: IBatchAtt,//per - uint16   RED-5BIT GREEN-6BIT BLUE-5BIT
    BATCH_LENGTH?: number,
    BATCH_ID?: IBatchAtt,
}

//cmpt
//<----------------------  header bytes[0..12] -------------------------------------------------------->
//|-- tile format(uchar[4]) --|-- version(uint32) --|-- byteLength(uint32) --|-- tilesLength(uint32) --|
//<------------ body -------------->
//|----- tiles[] ------------------|