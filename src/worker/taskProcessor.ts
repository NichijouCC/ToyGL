/**
 * 启动一个webworker执行任务
 * @example
 * let taskProcessor = new TaskProcessor('myWorkerName');
 * let promise = taskProcessor.scheduleTask({
 *     someParameter : true,
 *     another : 'hello'
 * });
 * promise.then((res)=>{
 *   ........
 * });
 */
export class TaskProcessor {
    private _worker: Worker;
    private count: number = 0;
    /**
     * worker 启动器位置
     */
    private static _bootstrapUrl: string = "workers/workerBootstrap.js";
    /**
     * worker 模块所在目录
     */
    static baseUrl = "workers"
    constructor(workerName: string) {
        let worker = new Worker(TaskProcessor._bootstrapUrl, { name: workerName });
        let bootstrapMessage = {
            loaderConfig: {
                baseUrl: TaskProcessor.baseUrl,
            },
            workerModule: workerName
        };
        worker.postMessage(bootstrapMessage);
        worker.onmessage = this.handelWorkerMessage;
        worker.onerror = this.handleWorkerError;
        this._worker = worker;
    }
    private handelWorkerMessage = (msg: MessageEvent) => {
        let data = msg.data as IWorkerResponse;
        if (data.error) {
            this._tasks[data.id]?.reject(data.error);
        } else {
            this._tasks[data.id]?.resolve(data.result);
        }
        delete this._tasks[data.id];
    }
    private handleWorkerError = (ev: ErrorEvent) => { }
    private _tasks: { [taskId: number]: { resolve, reject } } = {};
    scheduleTask(parameters: any, transferableObjects: Transferable[] = []): Promise<any> {
        let msg = {
            parameters: parameters,
            id: this.count++,
        }
        this._worker.postMessage(msg, transferableObjects);
        return new Promise((resolve, reject) => {
            this._tasks[msg.id] = { resolve, reject }
        });
    }
    dispose() {
        this._worker.terminate();
    }
}

export interface IWorkerRequest {
    id: number;
    parameters: any;
}

export interface IWorkerResponse {
    id: number,
    result: any,
    error: string,
}