import path from "path";
import { writeFile } from "fs/promises";
import { fileURLToPath } from "url";

const create = async () => {
  const filename = "fresh.txt";
  const dirname = path.dirname(fileURLToPath(import.meta.url));
  const filepath = path.join(dirname, "files", filename);

  try {
    await writeFile(filepath, "I am fresh and young", { encoding: "utf8", flag: "wx" });

    console.log("\x1b[32m%s\x1b[0m", "the file was created, check it");
  } catch (e) {
    console.error("\x1b[31m%s\x1b[0m", "FS operation failed: the file exists already");
  }
};

await create();
