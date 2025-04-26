import { createUnzip } from "zlib";
import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream/promises";
import path from "path";
import { fileURLToPath } from "url";
import { unlink } from "fs/promises";

const decompress = async () => {
  const dirname = path.dirname(fileURLToPath(import.meta.url));
  const sourceFile = path.join(dirname, "files", "archive.gz");
  const destinationFile = path.join(dirname, "files", "fileToCompress.txt");

  const unzip = createUnzip();
  const source = createReadStream(sourceFile);
  const destination = createWriteStream(destinationFile);
  try {
    await pipeline(source, unzip, destination);
    await unlink(sourceFile);
  } catch (e) {
    console.error("\x1b[31m%s\x1b[0m", "FS operation failed");
  }
};

await decompress();
