import path from "path";
import { fileURLToPath } from "url";
import { opendir } from "fs/promises";

const list = async () => {
  const dirname = path.dirname(fileURLToPath(import.meta.url));
  const folderPath = path.join(dirname, "files");

  try {
    const filesDir = await opendir(folderPath);

    for await (const file of filesDir) {
      console.log("\x1b[36m%s\x1b[0m", file.name);
    }
  } catch (e) {
    console.error("\x1b[31m%s\x1b[0m", "FS operation failed");
  }
};

await list();
