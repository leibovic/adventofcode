const fs = require("fs");

fs.readFile("inputs/day8.txt", "utf8", (err, contents) => {
  const boxes = contents
    .split("\n")
    .filter((value) => value.length > 0)
    .map((line) => line.split(",").map((v) => parseInt(v, 10)));

  // Build all pairwise edges with squared distances (preserves ordering)
  const edges = [];
  for (let i = 0; i < boxes.length; i++) {
    const a = boxes[i];
    for (let j = i + 1; j < boxes.length; j++) {
      const b = boxes[j];
      const dx = a[0] - b[0];
      const dy = a[1] - b[1];
      const dz = a[2] - b[2];
      const dist2 = dx * dx + dy * dy + dz * dz;
      edges.push([dist2, i, j]);
    }
  }

  // Sort edges by distance (ascending)
  edges.sort((x, y) => x[0] - y[0]);

  // Disjoint Set Union (union-find) to track components
  class DSU {
    constructor(n) {
      this.parent = new Array(n);
      this.size = new Array(n).fill(1);
      for (let i = 0; i < n; i++) this.parent[i] = i;
    }
    find(x) {
      if (this.parent[x] !== x) this.parent[x] = this.find(this.parent[x]);
      return this.parent[x];
    }
    union(a, b) {
      let ra = this.find(a),
        rb = this.find(b);
      if (ra === rb) return false;
      if (this.size[ra] < this.size[rb]) [ra, rb] = [rb, ra];
      this.parent[rb] = ra;
      this.size[ra] += this.size[rb];
      return true;
    }
    components() {
      const map = new Map();
      for (let i = 0; i < this.parent.length; i++) {
        const r = this.find(i);
        if (!map.has(r)) map.set(r, []);
        map.get(r).push(i);
      }
      return map;
    }
  }

  const dsu = new DSU(boxes.length);

  // Continue applying sorted edges until all boxes are in one component
  let remaining = boxes.length;
  let finalPair = null; // store [i, j] that caused the last union
  let edgesUsed = 0;

  for (let e = 0; e < edges.length; e++) {
    const [, i, j] = edges[e];
    edgesUsed++;
    if (dsu.union(i, j)) {
      remaining -= 1;
      if (remaining === 1) {
        finalPair = [i, j];
        break;
      }
    }
  }

  if (finalPair) {
    const [ai, bi] = finalPair;
    const A = boxes[ai];
    const B = boxes[bi];
    console.log(`Final connecting pair: ${A.join(",")} and ${B.join(",")}`);
    console.log(`Product of X coordinates: ${A[0] * B[0]}`);
  } else {
    console.log("Could not connect all boxes with available edges.");
  }
});
