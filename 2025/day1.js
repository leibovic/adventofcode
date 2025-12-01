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
    console.log("Start position: " + currentValue);
    console.log("Rotation: " + rotation);

    const direction = rotation.charAt(0);
    const clicks = parseInt(rotation.slice(1), 10);

    let timesPastZero = 0;
    // Brute force that shit!
    for (let i = 0; i < clicks; i++) {
      if (direction === "L") {
        currentValue -= 1;
      } else {
        currentValue += 1;
      }

      if (currentValue == -1) {
        currentValue = 99;
      } else if (currentValue == 100) {
        currentValue = 0;
      }

      if (currentValue == 0) {
        timesPastZero++;
      }
    }

    zeroCount += timesPastZero;

    console.log("New value: " + currentValue);
    console.log("--------------------");
  });

  return zeroCount;
};
