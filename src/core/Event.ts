export class EventHandler<T>
{
    private listener: ((event: T) => void)[] = [];
    addEventListener(func: (event: T) => void)
    {
        this.listener.push(func);
    }
    removeEventListener(func: (event: T) => void)
    {
        let index = this.listener.indexOf(func);
        if (index >= 0)
        {
            this.listener.splice(index);
        }
    }
    removeAll() { this.listener = []; }
    raiseEvent(event: T)
    {
        this.listener.forEach(fuc =>
        {
            fuc(event);
        });
    }
    destroy()
    {
        this.listener = undefined;
    }
}
