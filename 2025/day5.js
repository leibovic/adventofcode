const fs = require("fs");
fs.readFile("inputs/day5.txt", "utf8", (err, contents) => {
  const lines = contents.split("\n").filter((value) => value.length > 0);

  const ranges = lines.filter((line) => line.includes("-"));
  const availableIngredients = lines
    .filter((line) => !line.includes("-") && line.length > 0)
    .map((value) => parseInt(value, 10));

  console.log("Ranges: " + ranges);
  console.log("Available ingredients: " + availableIngredients);

  const freshIngredients = [];
  ranges.forEach((range) => {
    const [min, max] = range.split("-").map((value) => parseInt(value, 10));

    for (let i = min; i <= max; i++) {
      if (!freshIngredients.includes(i) && availableIngredients.includes(i)) {
        freshIngredients.push(i);
      }
    }
  });

  console.log("Fresh ingredients: " + freshIngredients);
  console.log("Total fresh ingredients: " + freshIngredients.length);
});
