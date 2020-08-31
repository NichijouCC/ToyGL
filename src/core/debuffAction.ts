
export interface IdebuffeAction
{
    excuteAction: (debuffAction: () => Function) => void;
    dispose: Function;
}
/**
 * 执行需要进行清理的方法
 * @param action 
 */
export function excuteDebuffAction(action: () => Function): IdebuffeAction {
    let dispose = action();
    return {
        excuteAction: (debuffAction: () => Function) => {
            if (dispose) dispose();
            dispose = debuffAction();
        },
        dispose: () => { dispose(); dispose = undefined; }
    };
}

export class DebuffAction implements IdebuffeAction {
    excuteAction = (debuffAction: () => Function) => {
        if (this.dispose) this.dispose();
        this.dispose = debuffAction();
    };

    dispose: Function;
    static create(action?: () => Function) {
        const newAct = new DebuffAction();
        if (action) {
            newAct.dispose = action();
        }
        return newAct;
    }
}
