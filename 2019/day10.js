const fs = require('fs');

const asteroids = [];

fs.readFile('inputs/day10.txt', 'utf8', (err, contents) => {
    const rows = contents.split('\n');

    for (let y = 0; y < rows.length; y++) {
        let row = rows[y];
        for (let x = 0; x < row.length; x++) {
            if (row[x] === "#") {
                asteroids.push({x, y});
            }
        }
    }

    let mostDetected = 0;
    let mostDetectedPoint = null;
    for (let i = 0; i < asteroids.length; i++) {
        let monitoringPoint = asteroids[i];
        let detected = detectAsteroids(monitoringPoint);
        if (detected > mostDetected) {
            mostDetected = detected;
            mostDetectedPoint = monitoringPoint;
        }
    }

    console.log("most detected", mostDetected, mostDetectedPoint);
});


const detectAsteroids = (monitoringPoint) => {
    const detected = asteroids.filter((asteroid) => !isAsteroidBlocked(asteroid, monitoringPoint));
    // Don't include the monitoring point
    return detected.length - 1;
}

const isAsteroidBlocked = (a, m) => {
    // console.log("asteroid", a);

    for (let i = 0; i < asteroids.length; i++) {
        const b = asteroids[i];

        // Don't compare against the given asteroid or the monitoring point 
        if ((a.x === b.x && a.y === b.y) || (m.x === b.x && m.y === b.y)) {
            continue;
        }

        // Check to see if the blocking asteroid is on a line segment drawn
        // between the asteroid and the monitoring point
        const slopeA = (a.y - m.y) / (a.x - m.x);
        const slopeB = (b.y - m.y) / (b.x - m.x);

        const aX = a.x - m.x;
        const bX = b.x - m.x;
        const aY = a.y - m.y;
        const bY = b.y - m.y;

        if (slopeA === slopeB &&
            ((aX >= 0 && bX >= 0) || (aX <= 0 && bX <= 0)) &&
            ((aY >= 0 && bY >= 0) || (aY <= 0 && bY <= 0)) &&
            (Math.abs(aX) >= Math.abs(bX)) &&
            (Math.abs(aY) >= Math.abs(bY))) {
            // console.log("BLOCKED BY", b);
            return true;
        }
        
    }

    // console.log("NOT BLOCKED");
    return false;
}
