const fs = require("fs");
fs.readFile("inputs/day5.txt", "utf8", (err, contents) => {
  const lines = contents.split("\n").filter((value) => value.length > 0);

  const ranges = lines.filter((line) => line.includes("-"));
  const availableIngredients = new Set(
    lines
      .filter((line) => !line.includes("-") && line.length > 0)
      .map((value) => parseInt(value, 10))
  );

  const freshIngredients = new Set();

  // For each available ingredient, check if it's in any range
  availableIngredients.forEach((ingredient) => {
    const inRange = ranges.some((range) => {
      const [min, max] = range.split("-").map((value) => parseInt(value, 10));
      return ingredient >= min && ingredient <= max;
    });
    if (inRange) {
      freshIngredients.add(ingredient);
    }
  });

  console.log("Total fresh ingredients: " + freshIngredients.size);
});
