import { add } from '../testWorker';
import { createTaskProcessorWorker } from './createTaskProcessorWorker';
function helloWorkerB(params: any) {
    console.warn("test worker rec:", params);
    return add(4);
}
export default createTaskProcessorWorker(helloWorkerB);