const fs = require('fs');
 
fs.readFile('inputs/day1.txt', 'utf8', (err, contents) => {
    const values = contents.split('\n').filter(value => value.length > 0);
    const sum = sumFuelRequirements(values);
    console.log(sum);
});

const sumFuelRequirements = (values) => {
    const getFuel = (mass) => {
        return Math.floor(parseInt(mass)/3) - 2;
    }
    return values.reduce((accumulator, currentValue) => accumulator + getFuel(currentValue), 0);
}
