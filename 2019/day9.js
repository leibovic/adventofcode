const fs = require('fs');
 
fs.readFile('inputs/day9.txt', 'utf8', (err, contents) => {
    const values = contents.split(',').map(value => parseInt(value));    
    runIntcodeProgram(values, 1);
});

const runIntcodeProgram = (values, input) => {
    let currentPosition = 0;
    let relativeBase = 0;

    const getParamValue = (mode, param) => {
        let value;
        if (mode === 0) {
            value = values[param];
        } else if (mode === 1) {
            value = param;
        } else if (mode === 2) {
            value = values[relativeBase + param];
        }
        return value ? value : 0;
    }

    while (values[currentPosition] !== 99) {
        const instruction = values[currentPosition].toString().padStart(5, 0);

        const opcode = parseInt(instruction.substring(3));
        const modeParam1 = parseInt(instruction.substring(2, 3));
        const modeParam2 = parseInt(instruction.substring(1, 2));
        const modeParam3 = parseInt(instruction.substring(0, 1));

        const param1 = values[currentPosition + 1];
        const param2 = values[currentPosition + 2];
        const param3 = values[currentPosition + 3];

        const value1 = getParamValue(modeParam1, param1);
        const value2 = getParamValue(modeParam2, param2);
        const value3 = getParamValue(modeParam3, param3);

        if (opcode === 1) {
            values[value3] = value1 + value2;
            currentPosition += 4;
        } else if (opcode === 2) {
            values[value3] = value1 * value2;
            currentPosition += 4;
        } else if (opcode === 3) {
            values[value1] = input;
            currentPosition += 2;
        } else if (opcode === 4) {
            console.log(value1);
            currentPosition += 2;
        } else if (opcode === 5) {
            if (value1 !== 0) {
                currentPosition = value2;
            } else {
                currentPosition += 3;
            }
        } else if (opcode === 6) {
            if (value1 === 0) {
                currentPosition = value2;
            } else {
                currentPosition += 3;
            }
        } else if (opcode === 7) {
            values[value3] = value1 < value2 ? 1 : 0;
            currentPosition += 4;
        } else if (opcode === 8) {
            values[value3] = value1 === value2 ? 1 : 0;
            currentPosition += 4;
        } else if (opcode === 9) {
            relativeBase += value1;
            console.log("updating relative base", relativeBase);
            currentPosition += 2;
        } else {
            throw "unknown opcode: " + opcode;
        }
    }
}
