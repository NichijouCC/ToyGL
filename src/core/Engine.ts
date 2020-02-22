export interface IEngineConfig
{
    container?: HTMLCanvasElement;
    startupUrl?: string;
    startupScene?: string;
}


namespace Private
{
    export let targetCanvas: HTMLCanvasElement;
}

export class Engine
{
    static create(config: IEngineConfig)
    {
        console.log("Toy engine creation!");

        if (config.container)
        {
            Private.targetCanvas = config.container;
        }
    }
}