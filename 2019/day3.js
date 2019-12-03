const fs = require('fs');
 
fs.readFile('inputs/day3.txt', 'utf8', (err, contents) => {
    const values = contents.split('\n').filter(value => value.length > 0);
    const path1 = values[0].split(',');
    const path2 = values[1].split(',');

    const grid = {};

    mapPathToGrid(path1, grid);
    mapPathToGrid(path2, grid, true);

    let shortestDistance = null;
    for (let x in grid) {
        let row = grid[x];
        for (let y in row) {
            if (row[y] === 2) {
                let distance = Math.abs(x) + Math.abs(y);
                if (distance !== 0 && (distance < shortestDistance || shortestDistance === null)) {
                    shortestDistance = distance;
                }
            }
        }
    }

    console.log(shortestDistance);
});

const mapPathToGrid = (path, grid, markIntersections) => {
    let x = 0;
    let y = 0;
    for (let i = 0; i < path.length; i++) {
        let chunk = path[i];
        let direction = chunk.substring(0, 1);
        let distance = parseInt(chunk.substring(1));

        for (let j = 0; j < distance; j++) {
            if (!grid[x]) {
                grid[x] = {};
            }
            if (markIntersections && grid[x][y] === 1) {
                grid[x][y] = 2;
            } else {
                grid[x][y] = 1;
            }

            if (direction === "D") {
                y--;
            } else if (direction === "U") {
                y++;
            } else if (direction === "L") {
                x--;
            } else if (direction === "R") {
                x++;
            }
        }
    }
}
