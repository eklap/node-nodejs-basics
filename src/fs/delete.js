import path from "path";
import { fileURLToPath } from "url";
import { readFile, unlink as deleteFile } from "fs/promises";

const remove = async () => {
  const dirname = path.dirname(fileURLToPath(import.meta.url));
  const folderPath = path.join(dirname, "files");

  const destinationFile = path.join(folderPath, "fileToRemove.txt");

  try {
    await readFile(destinationFile, { encoding: "utf8" });

    await deleteFile(destinationFile);
    console.log("\x1b[32m%s\x1b[0m", "File was deleted successfully");
  } catch (e) {
    console.error("\x1b[31m%s\x1b[0m", "FS operation failed");
  }
};

await remove();
