import path from "path";
import { fileURLToPath } from "url";
import { readFile } from "fs/promises";

const read = async () => {
  const dirname = path.dirname(fileURLToPath(import.meta.url));
  const folderPath = path.join(dirname, "files");
  const destinationFile = path.join(folderPath, "fileToRead.txt");

  try {
    const file = await readFile(destinationFile, { encoding: "utf8" });
    console.log("\x1b[32m%s\x1b[0m", "Here is the file content:");
    console.log("\x1b[36m%s\x1b[0m", file);
  } catch (e) {
    console.error("\x1b[31m%s\x1b[0m", "FS operation failed");
  }
};

await read();
