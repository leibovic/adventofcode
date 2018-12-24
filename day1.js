const fs = require('fs');
 
fs.readFile('inputs/day1.txt', 'utf8', (err, contents) => {
    var values = contents.split('\n');
    var reduced = values.reduce((accumulator, currentValue) => {
        if (!currentValue) {
            return accumulator;
        }
        return accumulator + parseInt(currentValue);
    }, 0);
    console.log(reduced);
});
