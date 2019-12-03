const fs = require('fs');
 
fs.readFile('inputs/day3.txt', 'utf8', (err, contents) => {
    const values = contents.split('\n').filter(value => value.length > 0);
    const path1 = values[0].split(',');
    const path2 = values[1].split(',');

    const points = {};

    storePointsForPath(path1, points, 1);
    storePointsForPath(path2, points, 2);

    let shortestDistance = null;
    let fewestSteps = null;

    for (let point in points) {
        if (points[point].hasOwnProperty(1) && points[point].hasOwnProperty(2)) {
            let xy = point.split(",");            
            let distance = Math.abs(xy[0]) + Math.abs(xy[1]);
            if (distance !== 0 && (distance < shortestDistance || shortestDistance === null)) {
                shortestDistance = distance;
            }

            let steps = points[point][1] + points[point][2];
            if (steps !== 0 && (steps < fewestSteps || fewestSteps === null)) {
                fewestSteps = steps;
            }
        }
    }

    console.log(fewestSteps);
});

const storePointsForPath = (path, points, id) => {
    let x = 0;
    let y = 0;
    let steps = 0;

    for (let i = 0; i < path.length; i++) {
        let chunk = path[i];
        let direction = chunk.substring(0, 1);
        let distance = parseInt(chunk.substring(1));

        for (let j = 0; j < distance; j++) {
            let point = [x, y].join(",");
            if (!points[point]) {
                points[point] = {};
            }

            if (!points[point].hasOwnProperty(id)) {
                // Only need to keep track of the first time a wire gets to this point
                points[point][id] = steps;
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

            steps++;
        }
    }
}
