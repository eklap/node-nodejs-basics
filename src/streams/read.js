import path from "path";
import { fileURLToPath } from "url";
import { stdout } from "process";
import { createReadStream } from "fs";

const read = async () => {
  const filename = "fileToRead.txt";
  const dirname = path.dirname(fileURLToPath(import.meta.url));
  const filepath = path.join(dirname, "files", filename);

  const rs = createReadStream(filepath, { encoding: "utf8" });
  rs.on("data", (chunk) => {
    let index = 0;

    const interval = setInterval(() => {
      if (index < chunk.length) {
        process.stdout.write(`\x1b[32m${chunk[index]}\x1b[0m`);
        index++;
      } else {
        clearInterval(interval);
        process.stdout.write("\n");
      }
    }, 150);
  });
  rs.on("end", () => {
    stdout.write("\n");
  });

  rs.on("error", (err) => {
    console.error("\x1b[31m%s\x1b[0m", "FS operation failed");
  });
};

await read();
