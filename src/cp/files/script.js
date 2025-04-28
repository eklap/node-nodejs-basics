const args = process.argv.slice(2);

console.log(`Total number of arguments is ${args.length}`);
console.log(`Arguments: ${JSON.stringify(args)}`);

process.on("message", (message) => {
  if (message === "START") {
    process.send("Child process started");
  }
  if (message === "CLOSE") {
    process.send("Child process closed");
    process.exit(0);
  }
});

const echoInput = (chunk) => {
  const chunkStringified = chunk.toString();
  if (chunkStringified.includes("CLOSE")) process.exit(0);
  process.stdout.write(`Received from master process: ${chunk.toString()}\n`);
};

process.stdin.on("data", echoInput);
