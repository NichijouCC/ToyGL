import { add } from '../testWorker';
import { createTaskProcessorWorker } from './createTaskProcessorWorker';

function helloWorker(params: any, transferableObjects?: any) {
    console.warn("test worker rec:", params);
    let res = add(3);
    return res;
}

export default createTaskProcessorWorker(helloWorker);