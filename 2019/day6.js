const fs = require('fs');
 
const orbits = {};

fs.readFile('inputs/day6.txt', 'utf8', (err, contents) => {
    const values = contents.split('\n').filter(value => value.length > 0);

    for (let i = 0; i < values.length; i++) {
        const nodes = values[i].split(")");
        const inner = nodes[0];
        const outer = nodes[1];

        orbits[outer] = inner;
    }
    
    let totalOrbits = 0;
    for (let node in orbits) {
        totalOrbits += sumOrbits(node);
    }

    console.log("total orbits:", totalOrbits);
    console.log("min transfers:", minTransfers("YOU", "SAN"));
});

const sumOrbits = (node) => {
    if (!orbits[node]) {
        return 0;
    }
    return 1 + sumOrbits(orbits[node]);
}

const makePath = (node) => {
    if (!orbits[node]) {
        return [];
    }
    return [node].concat(makePath(orbits[node]));
}

const minTransfers = (node1, node2) => {
    const path1 = makePath(node1);
    const path2 = makePath(node2);

    for (let i = 0; i < path1.length; i++) {
        for (let j = 0; j < path2.length; j++) {
            if (path1[i] === path2[j]) {
                return i + j - 2; // subtract 2 because we don't want to include original nodes in count
            }
        }
    }
}
