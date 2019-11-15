interface Imessage {
    initConfig: string;
    params: any;
}

self.addEventListener("message", ev => {
    let message = ev.data as Imessage;
    if (message.initConfig) {
        //moudelName
        initWorker(message.initConfig);
    }
    if (message.params != null) {
    }
});

function postMessageToMain(msg: any) {
    self.postMessage(msg);
}
function initWorker(workerName: string) {
    importScripts("./" + workerName);
}
