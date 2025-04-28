import path from "path";

import { fileURLToPath } from "url";
import { createHash } from "crypto";
import { createReadStream } from "fs";

const calculateHash = async () => {
  const filename = "fileToCalculateHashFor.txt";
  const dirname = path.dirname(fileURLToPath(import.meta.url));
  const filepath = path.join(dirname, "files", filename);

  const rs = createReadStream(filepath, { encoding: "utf8" });
  const hash = createHash("sha256");
  rs.on("data", (chunk) => {
    hash.update(chunk);
  });
  rs.on("end", () => {
    const hashResult = hash.digest("hex");
    console.log(`\x1b[32m${hashResult}\x1b[0m`);
  });
  rs.on("error", (err) => {
    console.error("\x1b[31m%s\x1b[0m", "FS operation failed");
  });
};

await calculateHash();
