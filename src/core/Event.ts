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
    raiseEvent(...args: any)
    {
        this.listener.forEach(fuc =>
        {
            fuc(args);
        });
    }
}
