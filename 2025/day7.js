const fs = require("fs");
fs.readFile("inputs/day7.txt", "utf8", (err, contents) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  const lines = contents
    .split("\n")
    .filter((value) => value.length > 0)
    .map((line) => line.split(""));

  const height = lines.length;
  const width = lines[0].length;

  // Find start position
  let startCol = -1;
  for (let j = 0; j < width; j++) {
    if (lines[0][j] === "S") {
      startCol = j;
      break;
    }
  }

  // Memoization: key is "row,col" and value is the count of distinct paths from that position
  const memo = new Map();

  // Recursive function to count distinct paths from a given position
  function countPaths(row, col) {
    // Base case: reached the bottom
    if (row >= height - 1) {
      return 1;
    }

    const key = `${row},${col}`;
    if (memo.has(key)) {
      return memo.get(key);
    }

    const nextRow = row + 1;
    const cell = lines[nextRow][col];

    let count = 0;

    if (cell === "^") {
      // Splitter - sum paths from both branches
      if (col - 1 >= 0) {
        count += countPaths(nextRow, col - 1);
      }
      if (col + 1 < width) {
        count += countPaths(nextRow, col + 1);
      }
    } else {
      // Empty space or S - continue downward
      count = countPaths(nextRow, col);
    }

    memo.set(key, count);
    return count;
  }

  const result = countPaths(0, startCol);
  console.log("Total different timelines: " + result);
});
