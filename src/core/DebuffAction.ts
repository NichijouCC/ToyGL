
export interface IdebuffeAction
{
    excuteAction: (debuffAction: () => Function) => void;
    dispose: () => void;
}
/**
 * 执行需要进行清理的方法
 * @param action 
 */
export function excuteDebuffAction(action: () => Function): IdebuffeAction
{
    let dispose = action();
    return {
        excuteAction: (debuffAction: () => Function) =>
        {
            if (dispose) dispose();
            dispose = debuffAction();
        },
        dispose: () => { dispose(); dispose = undefined; }
    };
}