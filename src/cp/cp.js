import { fork } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const spawnChildProcess = async (args) => {
  const dirname = path.dirname(fileURLToPath(import.meta.url));
  const scriptFile = path.join(dirname, "files", "script.js");
  const child = fork(scriptFile, args);
  child.on("error", (error) => {
    console.error("\x1b[31m%s\x1b[0m", "Child process error");
  });
  child.on("message", (msg) => {
    console.log("Received from child:", msg);
  });
  child.send("START");
  setTimeout(() => {
    child.send("CLOSE");
  }, 6000);
};

// Put your arguments in function call to test this functionality
spawnChildProcess(["someArgument1", "someArgument2", "someArgument3"]);
