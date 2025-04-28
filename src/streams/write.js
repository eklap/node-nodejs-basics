import path from "path";
import { fileURLToPath } from "url";
import { stdin } from "process";
import { createWriteStream } from "fs";
import { open } from "fs/promises";

const write = async () => {
  const filename = "fileToWrite.txt";
  const dirname = path.dirname(fileURLToPath(import.meta.url));
  const filepath = path.join(dirname, "files", filename);
  try {
    const ws = createWriteStream(filepath);
    stdin.on("data", (chunk) => {
      const data = chunk.toString().trim();
      if (data === "exit") {
        ws.end();
        process.exit(0);
      } else {
        ws.write(data + "\n");
      }
    });
  } catch (e) {
    console.error(`\x1b[31m%s\x1b[0m`, "FS operation failed");
  }
};

await write();
