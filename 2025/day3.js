const fs = require("fs");
fs.readFile("inputs/day3.txt", "utf8", (err, contents) => {
  const banks = contents.split("\n").filter((value) => value.length > 0);
  const joltages = findJoltages(banks);
  console.log("joltages: " + joltages);

  const totalOutput = joltages.reduce((acc, curr) => acc + curr, 0);
  console.log("Total output: " + totalOutput);
});

const findJoltages = (banks) => {
  const joltages = [];
  banks.forEach((bank) => {
    const maxJoltage = findMaxJoltage(bank);
    joltages.push(maxJoltage);
  });
  return joltages;
};

const findMaxJoltage = (bank) => {
  let result = "";
  let start = 0;
  let remaining = 12; // digits we still need to pick

  while (remaining > 0) {
    // How many digits can we skip and still have enough left?
    const canSkip = bank.length - start - remaining;

    // Find the maximum digit in the window we can skip
    let maxDigit = bank[start];
    let maxIndex = start;

    for (let i = start; i <= start + canSkip; i++) {
      if (bank[i] > maxDigit) {
        maxDigit = bank[i];
        maxIndex = i;
      }
    }

    result += maxDigit;
    start = maxIndex + 1;
    remaining--;
  }

  return parseInt(result, 10);
};
