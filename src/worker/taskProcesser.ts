/**
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
    constructor(workerName: string) {
        this._worker = createWorker(workerName, this.handelWorkerMessage.bind(this), this.handleWorkerError.bind(this));
    }
    private handleWorkerError(ev: ErrorEvent) {}
    private handelWorkerMessage(msg: MessageEvent) {}

    scheduleTask(Parameter: any, transferableObjects: Transferable[] = []) {
        this._worker.postMessage(Parameter, transferableObjects);
    }
    dispose() {
        this._worker.terminate();
    }
}

function createWorker(workerName: string, onMessage?: (msg: MessageEvent) => void, onError?: (ev: ErrorEvent) => void) {
    let jsUrl = "";
    let worker = new Worker(jsUrl, { name: workerName });
    let bootstrapMessage = {
        workerModule: workerName,
    };
    worker.postMessage(bootstrapMessage);
    worker.onmessage = onMessage;
    worker.onerror = onError;
    return worker;
}
