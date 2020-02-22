export class InterEvent
{
    private listener: ((...args: any) => void)[] = [];
    addEventListener(func: (...args: any) => void)
    {
        this.listener.push(func);
    }
    removeEventListener(func: (...args: any) => void)
    {
        let index = this.listener.indexOf(func);
        if (index >= 0)
        {
            this.listener.splice(index);
        }
    }
    removeAll() { this.listener = []; }
    raiseEvent(...args: any)
    {
        this.listener.forEach(fuc =>
        {
            fuc(args);
        });
    }
}

export class ValueEvent<A, B>
{
    private listener: ((...args: any) => void)[] = [];
    addEventListener(func: (target: A, oldValue: B, newValue: B) => void)
    {
        this.listener.push(func);
    }
    removeEventListener(func: (target: A, oldValue: B, newValue: B) => void)
    {
        let index = this.listener.indexOf(func);
        if (index >= 0)
        {
            this.listener.splice(index);
        }
    }
    removeAll() { this.listener = []; }
    raiseEvent(target: A, oldValue: B, newValue: B)
    {
        this.listener.forEach(fuc =>
        {
            fuc(target, oldValue, newValue);
        });
    }
}
