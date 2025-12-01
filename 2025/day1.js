const fs = require("fs");
const { parse } = require("path");

fs.readFile("inputs/day1.txt", "utf8", (err, contents) => {
  const rotations = contents.split("\n").filter((value) => value.length > 0);
  const password = countZeros(rotations);
  console.log("PASSWORD: " + password);
});

const countZeros = (rotations) => {
  // Number of times we see a zero
  let zeroCount = 0;

  // Where the dial is currently pointing
  let currentValue = 50;

  rotations.forEach((rotation) => {
    const direction = rotation.charAt(0);
    const clicks = parseInt(rotation.slice(1), 10);

    if (direction === "L") {
      currentValue = currentValue - clicks;
    } else {
      currentValue = currentValue + clicks;
    }

    currentValue = ((currentValue % 100) + 100) % 100;

    console.log(currentValue);
    if (currentValue == 0) {
      zeroCount += 1;
    }
  });

  return zeroCount;
};
