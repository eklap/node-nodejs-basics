import { cpus } from "os";
import { Worker, isMainThread } from "worker_threads";

const performCalculations = async () => {
  const cpslength = cpus().length;

  const array = Array.from({ length: cpslength }, (_, i) => i + 10);

  if (isMainThread) {
    const order = [];

    const workerTask = async (n) =>
      new Promise((resolve, reject) => {
        const worker = new Worker(new URL("./worker.js", import.meta.url), {
          workerData: { nData: n, workerNumber: n - 9 },
        });

        worker.on("message", (result) => {
          if (result.type === "ready") {
            order.push(result.workerNumber);
          }
          if (result.type === "result") {
            resolve({ status: "resolved", data: result.data, workerNumber: result.workerNumber });
          }
        });
        worker.on("error", (error) => {
          reject({ status: "error", data: null, workerNumber: n - 9 });
        });
      });

    const results = (await Promise.allSettled(array.map((n) => workerTask(n)))).map(
      (v) => v.value ?? v.reason,
    );

    const finalResult = order.map((wn) => {
      const res = results.find((r) => r.workerNumber === wn);
      return {
        status: res.status,
        data: res.data ?? null,
      };
    });
    console.log("finalResult", finalResult);
  } else {
  }
};

await performCalculations();
