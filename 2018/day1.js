const fs = require('fs');
 
fs.readFile('inputs/day1.txt', 'utf8', (err, contents) => {
    var values = contents.split('\n').filter(value => value.length > 0);
    findFrequencySeenTwice(values);
});

function reduce(values, frequency) {
    return values.reduce((accumulator, currentValue) => {
        return accumulator + parseInt(currentValue);
    }, frequency);
}

function findFrequencySeenTwice(values) {
    var seen = {};
    var seenTwice = undefined;
    var frequency = 0;

    while (seenTwice === undefined) {
        frequency = values.reduce((accumulator, currentValue) => {
            if (!seen[accumulator]) {
                seen[accumulator] = true;
            } else if (seenTwice === undefined) {
                seenTwice = accumulator;
            }
            return accumulator + parseInt(currentValue);
        }, frequency);
    }
    console.log("First frequency seen twice: " + seenTwice);
}
