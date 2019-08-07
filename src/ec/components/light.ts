import { Icomponent, Ientity, CullingMask } from "../ec";
import { IframeState } from "../../scene/frameState";
import { Vec3 } from "../../mathD/vec3";
import { Color } from "../../mathD/color";

export enum LigthTypeEnum {
    DIRECTION,
    SPOT,
    POINT,
}
export class Light implements Icomponent {
    entity: Ientity;
    type: LigthTypeEnum;
    cullingMask: CullingMask;
    color: Color = Color.create();
    range: number = 10;
    spotAngle: number = 30;
    update(frameState: IframeState): void {
        frameState.lightList.push(this);
    }
    dispose(): void {}
}
