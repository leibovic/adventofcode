const fs = require("fs");
fs.readFile("inputs/day6.txt", "utf8", (err, contents) => {
  const lines = contents.split("\n").filter((value) => value.length > 0);
  const grid = lines.map((line) => line.split(""));

  const numRows = grid.length;
  const numCols = grid[0].length;

  const results = [];
  let currentProblemOperator = null;
  let problemNumbers = [];

  // Process columns right-to-left
  for (let col = numCols - 1; col >= 0; col--) {
    // Check if column is empty (all spaces)
    const isEmpty = grid.every((row) => !row[col] || row[col] === " ");

    if (isEmpty) {
      // This is a separator - finalize current problem if any
      if (problemNumbers.length > 0) {
        let result = problemNumbers[0];
        for (let i = 1; i < problemNumbers.length; i++) {
          if (currentProblemOperator === "+") {
            result += problemNumbers[i];
          } else {
            result *= problemNumbers[i];
          }
        }
        results.push(result);
        problemNumbers = [];
        currentProblemOperator = null;
      }
      continue;
    }

    // Build number from this column (top to bottom, excluding operator row)
    let numberStr = "";
    for (let row = 0; row < numRows - 1; row++) {
      const char = grid[row][col];
      if (char !== " ") {
        numberStr += char;
      }
    }

    // Get operator from bottom
    const operator = grid[numRows - 1][col];
    if (operator && operator !== " ") {
      currentProblemOperator = operator;
    }

    if (numberStr) {
      const number = parseInt(numberStr, 10);
      problemNumbers.unshift(number); // Add to front (reading right-to-left)
    }
  }

  // Finalize last problem
  if (problemNumbers.length > 0) {
    let result = problemNumbers[0];
    for (let i = 1; i < problemNumbers.length; i++) {
      if (currentProblemOperator === "+") {
        result += problemNumbers[i];
      } else {
        result *= problemNumbers[i];
      }
    }
    results.push(result);
  }

  console.log("Results: " + results);
  const total = results.reduce((acc, curr) => acc + curr, 0);
  console.log("Total: " + total);
});
