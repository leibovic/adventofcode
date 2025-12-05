const fs = require("fs");
fs.readFile("inputs/day5.txt", "utf8", (err, contents) => {
  const lines = contents.split("\n").filter((value) => value.length > 0);

  const ranges = lines.filter((line) => line.includes("-"));

  // Parse ranges into intervals
  const intervals = ranges.map((range) => {
    const parts = range.split("-").map((v) => parseInt(v, 10));
    const a = parts[0];
    const b = parts[1];
    return { start: Math.min(a, b), end: Math.max(a, b) };
  });

  if (intervals.length === 0) {
    console.log("Total distinct numbers in all ranges: 0");
    return;
  }

  // Sort by start and merge overlapping/adjacent intervals
  intervals.sort((x, y) => x.start - y.start);

  let total = 0;
  let cur = { start: intervals[0].start, end: intervals[0].end };

  for (let i = 1; i < intervals.length; i++) {
    const it = intervals[i];
    if (it.start <= cur.end + 1) {
      // Overlapping or adjacent -> extend current
      cur.end = Math.max(cur.end, it.end);
    } else {
      // Disjoint -> add current length and move to next
      total += cur.end - cur.start + 1;
      cur = { start: it.start, end: it.end };
    }
  }

  // Add last interval
  total += cur.end - cur.start + 1;

  console.log("Total distinct numbers in all ranges: " + total);
});
