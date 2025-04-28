import { argv } from "process";

const parseArgs = () => {
  const data = argv.slice(2);
  for (let i = 0; i < data.length; i += 1) {
    if (data[i].startsWith("--")) {
      console.log(`\x1b[32m${data[i]}\x1b[0m is \x1b[32m${data[i + 1] ?? "empty"}\x1b[0m`);
      i++;
    }
  }
};

parseArgs();
