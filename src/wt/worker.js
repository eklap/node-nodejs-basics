import { parentPort, workerData } from "worker_threads";

// n should be received from main thread
const nthFibonacci = (n) => (n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2));

const sendResult = () => {
  const nData = workerData.nData;
  const wn = workerData.workerNumber;
  parentPort.postMessage({ type: "ready", workerNumber: wn });

  if (wn === 10) {
    throw new Error("Error");
  }

  parentPort.postMessage({ type: "result", data: nthFibonacci(nData), workerNumber: wn });
};

sendResult();
