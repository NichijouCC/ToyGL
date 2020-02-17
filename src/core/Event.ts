export class Event
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

export class ValueEvent<T>
{
    private listener: ((...args: any) => void)[] = [];
    addEventListener(func: (oldValue: T, newValue: T) => void)
    {
        this.listener.push(func);
    }
    removeEventListener(func: (oldValue: T, newValue: T) => void)
    {
        let index = this.listener.indexOf(func);
        if (index >= 0)
        {
            this.listener.splice(index);
        }
    }
    removeAll() { this.listener = []; }
    raiseEvent(oldValue: T, newValue: T)
    {
        this.listener.forEach(fuc =>
        {
            fuc(oldValue, newValue);
        });
    }
}
