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

    console.log(totalOrbits);
});

const sumOrbits = (node) => {
    if (!orbits[node]) {
        return 0;
    }
    return 1 + sumOrbits(orbits[node]);
}
