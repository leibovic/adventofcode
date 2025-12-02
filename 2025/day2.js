const fs = require("fs");
fs.readFile("inputs/day2.txt", "utf8", (err, contents) => {
  const ranges = contents.split(",");
  const invalidIds = findInvalidIds(ranges);
  console.log("invalidIds: " + invalidIds);

  const invalidIdsSum = invalidIds.reduce((acc, curr) => acc + curr, 0);
  console.log("Sum of invalid IDs: " + invalidIdsSum);
});

const findInvalidIds = (ranges) => {
  const invalidIds = [];

  ranges.forEach((range) => {
    const [min, max] = range.split("-").map((value) => parseInt(value, 10));

    for (let i = min; i <= max; i++) {
      const string = i.toString();

      for (let j = 2; j <= string.length; j++) {
        if (string.length % j !== 0) {
          // Can't split evenly
          continue;
        }
        const parts = splitIntoEqualParts(string, j);

        if (
          parts.length > 0 &&
          parts.every((p) => p === parts[0]) &&
          !invalidIds.includes(i)
        ) {
          invalidIds.push(i);
        }
      }
    }
  });

  return invalidIds;
};

function splitIntoEqualParts(s, parts) {
  const partLen = s.length / parts;
  const out = [];
  for (let i = 0; i < parts; i++) {
    out.push(s.slice(i * partLen, (i + 1) * partLen));
  }
  return out;
}
