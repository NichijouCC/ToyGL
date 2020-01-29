
export class Config{

    static getAttLocationFromName(att:GeometryAttEnum){
        return AttLocationMap[att];
    }

}

export enum GeometryAttEnum{
    POSITION="position",
    TANGENT="tangent",
    NORMAL="normal"
}

const AttLocationMap={
    "position":1,
    "tangent":2,
    "normal":3
}