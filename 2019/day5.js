const fs = require('fs');
 
fs.readFile('inputs/day5.txt', 'utf8', (err, contents) => {
    const values = contents.split(',').map(value => parseInt(value));
    
    runIntcodeProgram(values, 1);
});


const runIntcodeProgram = (values, input) => {
    let currentPosition = 0;

    while (values[currentPosition] !== 99) {
        const instruction = values[currentPosition].toString().padStart(5, 0);

        const opcode = parseInt(instruction.substring(3));
        const modeParam1 = parseInt(instruction.substring(2, 3));
        const modeParam2 = parseInt(instruction.substring(1, 2));

        const param1 = values[currentPosition + 1];
        const param2 = values[currentPosition + 2];
        const param3 = values[currentPosition + 3];

        if (opcode === 1 || opcode === 2) {
            const value1 = modeParam1 === 0 ? values[param1] : param1;
            const value2 = modeParam2 === 0 ? values[param2] : param2;
            if (opcode === 1) {
                values[param3] = value1 + value2;
            } else {
                values[param3] = value1 * value2;
            }
            currentPosition += 4;
        } else if (opcode === 3 || opcode === 4) {
            if (opcode === 3) {
                values[param1] = input;
            } else {
                const value = modeParam1 === 0 ? values[param1] : param1;
                console.log(value);
            }
            currentPosition += 2;
        } else {
            throw "unknown opcode: " + opcode;
        }

        // console.log(currentPosition, values);
    }
}
