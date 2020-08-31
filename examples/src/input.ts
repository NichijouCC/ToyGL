import { Input, ToyGL, KeyCodeEnum, MouseKeyEnum } from "TOYGL";
export class InputTest {
    static start(toy: ToyGL) {
        toy.preUpdate.addEventListener(() => {
            if (toy.input.getKeyDown(KeyCodeEnum.A)) {
                console.log("a down");
            }

            if (toy.input.getMouseDown(MouseKeyEnum.Left)) {
                console.log("mouse left down");
            }
        });
    }
}
