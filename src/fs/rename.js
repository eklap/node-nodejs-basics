import path from "path";
import { fileURLToPath } from "url";
import { readFile, rename as renameFile } from "fs/promises";

const rename = async () => {
  const dirname = path.dirname(fileURLToPath(import.meta.url));
  const folderPath = path.join(dirname, "files");

  const wrongName = path.join(folderPath, "wrongFilename.txt");
  const correctName = path.join(folderPath, "properFilename.md");

  try {
    await readFile(wrongName, { encoding: "utf8" });

    try {
      await readFile(correctName, { encoding: "utf8" });
      console.error(
        "\x1b[31m%s\x1b[0m",
        "FS operation failed:File with a correct name already exists",
      );
      return;
    } catch (e) {
      const result = await renameFile(wrongName, correctName);
      if (!result) {
        console.log("\x1b[32m%s\x1b[0m", "File was renamed successfully");
      } else throw new Error("FS operation failed");
    }
  } catch (e) {
    if (e.code === "ENOENT") {
      console.error(
        "\x1b[31m%s\x1b[0m",
        "FS operation failed: File with a wrong name does not exist",
      );
    } else {
      console.error("\x1b[31m%s\x1b[0m", "FS operation failed");
    }
  }
};

await rename();
