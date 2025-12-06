const fs = require("fs");
fs.readFile("inputs/day6.txt", "utf8", (err, contents) => {
  const lines = contents
    .split("\n")
    .filter((value) => value.length > 0)
    .map((line) => line.split(" ").filter((word) => word.length > 0));
  console.log(lines);

  const columns = lines[0].length;
  const results = [];
  for (let i = 0; i < columns; i++) {
    const operator = lines[lines.length - 1][i];
    console.log(operator);

    let result = operator === "*" ? 1 : 0;

    for (let j = 0; j < lines.length - 1; j++) {
      const value = parseInt(lines[j][i], 10);
      console.log("  " + value);

      if (operator === "+") {
        result += value;
      } else {
        result *= value;
      }
    }
    results.push(result);
  }
  console.log("Results: " + results);

  const total = results.reduce((acc, curr) => acc + curr, 0);
  console.log("Total: " + total);
});
