import path from "path";
import { fileURLToPath } from "url";
import { copyFile, opendir, mkdir } from "fs/promises";

const copy = async () => {
  const dirname = path.dirname(fileURLToPath(import.meta.url));
  const sourcePath = path.join(dirname, "files");
  const destinationPath = path.join(dirname, "files_copy");
  try {
    const filesDir = await opendir(sourcePath);

    try {
      await mkdir(destinationPath);
      console.log("\x1b[32m%s\x1b[0m", "The directory 'files_copy' was created");
    } catch (e) {
      console.error(
        "\x1b[31m%s\x1b[0m",
        "FS operation failed: The directory 'files_copy' already exists",
      );
      return;
    }

    for await (const file of filesDir) {
      const sourceFilePath = path.join(sourcePath, file.name);
      const destinationFilePath = path.join(destinationPath, file.name);
      await copyFile(sourceFilePath, destinationFilePath);
    }
    console.log("\x1b[32m%s\x1b[0m", "Files were copied successfully");
  } catch (e) {
    console.error("\x1b[31m%s\x1b[0m", "FS operation failed: Error copying files:", e);
  }
};

await copy();
