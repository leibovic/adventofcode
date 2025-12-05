const fs = require("fs");
fs.readFile("inputs/day4.txt", "utf8", (err, contents) => {
  let lines = contents.split("\n").filter((value) => value.length > 0);

  const width = lines[0].length;
  const height = lines.length;

  let totalRemovedRolls = 0;

  while (true) {
    const result = removeAccessibleRolls(lines, width, height);
    if (result.count === 0) {
      break;
    }
    totalRemovedRolls += result.count;
    lines = result.lines;
  }

  console.log("Total removed rolls: " + totalRemovedRolls);
});

const removeAccessibleRolls = (lines, width, height) => {
  let accessibleCount = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (lines[y][x] === "@") {
        // Count rolls in 8 adjacent positions
        let adjacentRolls = 0;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            if (dx === 0 && dy === 0) continue; // Skip the center cell
            const ny = y + dy;
            const nx = x + dx;
            if (ny >= 0 && ny < height && nx >= 0 && nx < width) {
              if (lines[ny][nx] === "@") {
                adjacentRolls++;
              }
            }
          }
        }
        if (adjacentRolls < 4) {
          accessibleCount++;

          // Remove the roll
          lines[y] = lines[y].substring(0, x) + "." + lines[y].substring(x + 1);
        }
      }
    }
  }

  return { count: accessibleCount, lines: lines };
};
