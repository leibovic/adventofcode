const fs = require("fs");
fs.readFile("inputs/day7.txt", "utf8", (err, contents) => {
  const lines = contents
    .split("\n")
    .filter((value) => value.length > 0)
    .map((line) => line.split(""));

  // Shoot a beam down from the start position
  const startPosition = lines[0].indexOf("S");
  lines[1][startPosition] = "|";

  let splitCount = 0;

  for (let i = 1; i < lines.length - 1; i++) {
    // For each line, continue the beam down below
    for (let j = 0; j < lines[i].length; j++) {
      if (lines[i][j] == "|") {
        console.log(lines[i + 1][j]);
        if (lines[i + 1][j] == "^") {
          // If you hit a splitter, continue the beam to the left and right of the splitter
          splitCount++;
          lines[i + 1][j - 1] = "|";
          lines[i + 1][j + 1] = "|";
        } else {
          // Continue the beam
          lines[i + 1][j] = "|";
        }
      }
    }
  }
  console.log("Total splits: " + splitCount);
});
