import { IWorkerRequest, IWorkerResponse } from "../taskProcessor";

function executeWorkerFunction(workerFunction: (params: any, transferableObjects: any) => any, parameters: any, transferableObjects: any[]) {
    return new Promise((resolve, reject) => {
        try {
            let result = workerFunction(parameters, transferableObjects);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    })
}

export function createTaskProcessorWorker(workerFunc: (...args: any) => any) {
    return (event: any) => {
        let data = event.data as IWorkerRequest;
        let transferableObjects: any[] = [];
        let responseMessage: IWorkerResponse = {
            id: data.id,
            result: undefined,
            error: undefined
        } as any;
        return executeWorkerFunction(workerFunc, data.parameters, transferableObjects)
            .then((res) => {
                responseMessage.result = res;
                (self as any).postMessage(responseMessage);
            })
            .catch((err) => {
                responseMessage.error = err.message;
                (self as any).postMessage(responseMessage);
            })
    }
}