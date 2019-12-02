const fs = require('fs');
 
fs.readFile('inputs/day1.txt', 'utf8', (err, contents) => {
    const values = contents.split('\n').filter(value => value.length > 0);
    const sum = sumFuelRequirements(values);
    console.log(sum);
});

const getFuel = (mass) => {
    const fuel = Math.floor(parseInt(mass)/3) - 2;
    if (fuel <= 0) {
        return 0;
    }
    return fuel + getFuel(fuel);
}

const sumFuelRequirements = (values) => {
    return values.reduce((accumulator, currentValue) => {
        const fuel = getFuel(currentValue);
        return accumulator + fuel;
    }, 0);
}
