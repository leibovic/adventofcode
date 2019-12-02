const fs = require('fs');
 
fs.readFile('inputs/day2.txt', 'utf8', (err, contents) => {
    const values = contents.split(',').map(value => parseInt(value));
    runIntcodeProgram(values);
    console.log(values.join(','));
});

const runIntcodeProgram = (values) => {
    let currentPosition = 0;

    while (values[currentPosition] !== 99) {
        let opcode = values[currentPosition];
        let input1Position = values[currentPosition + 1];
        let input2Position = values[currentPosition + 2];
        let storePosition = values[currentPosition + 3];

        if (opcode === 1) {
            values[storePosition] = values[input1Position] + values[input2Position];
        } else if (values[currentPosition] === 2) {
            values[storePosition] = values[input1Position] * values[input2Position];
        }

        currentPosition = currentPosition + 4;
    }
}
