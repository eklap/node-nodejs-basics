import { Transform } from "stream";
import { pipeline } from "stream/promises";
import { stdin, stdout } from "process";

const transform = async () => {
  const transformStream = new Transform({
    transform(chunk, encoding, callback) {
      const data = chunk.toString().trim();
      if (data === "exit") {
        this.push(null);
        process.exit(0);
      } else {
        const upperChunk = chunk.toString().split("").reverse().join("") + "\n";
        callback(null, `\x1b[32m${upperChunk}\x1b[0m`);
      }
    },
  });

  await pipeline(stdin, transformStream, stdout);
};

await transform();
