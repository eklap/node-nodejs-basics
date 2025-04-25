import { argv } from "process";

const parseEnv = () => {
  const data = argv.slice(2);
  data.forEach((item) => {
    const [key, value] = item.split("=");
    if (key.startsWith("RSS_")) {
      console.log("\x1b[32m%s\x1b[0m", `${key}=${value}`);
    }
  });
};

parseEnv();
