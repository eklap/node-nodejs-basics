import path from "path";
import { release, version } from "os";
import { createServer as createServerHttp } from "http";
import "./files/c.cjs";
import { readFile } from "fs/promises";
import { fileURLToPath } from "url";

const filename = import.meta.url;

const randomFn = async () => {
  const random = Math.random();

  const fileName = random > 0.5 ? "a.json" : "b.json";

  const filePath = path.join(path.dirname(fileURLToPath(filename)), "files", fileName);

  const text = JSON.parse(await readFile(filePath, { encoding: "utf8" }));
  return text;
};

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${filename}`);
console.log(`Path to current directory is ${path.dirname(filename)}`);

const myServer = createServerHttp((_, res) => {
  res.end("Request accepted");
});

const PORT = 3000;

let unknownObject;

randomFn().then((res) => {
  let unknownObject = res;
  console.log(unknownObject);
});

myServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log("To terminate it, use Ctrl+C combination");
});

export default {
  unknownObject,
  myServer,
};
