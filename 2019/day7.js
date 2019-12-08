const fs = require('fs');
 
fs.readFile('inputs/day7.txt', 'utf8', (err, contents) => {
    const values = contents.split(',').map(value => parseInt(value));
    
    let settingSequence = [4, 3, 2, 1, 0];
    let signal = 0;

    for (let i = 0; i < 5; i++) {
        const program = [...values];
        console.log(program, settingSequence[i]);

        runIntcodeProgram(program, settingSequence[i]);
        signal = runIntcodeProgram(program, signal);
    }


    console.log("output signal:", signal);
});


const runIntcodeProgram = (values, input) => {
    let currentPosition = 0;
    let output;

    while (values[currentPosition] !== 99) {
        const instruction = values[currentPosition].toString().padStart(5, 0);

        const opcode = parseInt(instruction.substring(3));
        const modeParam1 = parseInt(instruction.substring(2, 3));
        const modeParam2 = parseInt(instruction.substring(1, 2));

        const param1 = values[currentPosition + 1];
        const param2 = values[currentPosition + 2];
        const param3 = values[currentPosition + 3];

        const value1 = modeParam1 === 0 ? values[param1] : param1;
        const value2 = modeParam2 === 0 ? values[param2] : param2;

        if (opcode === 1) {
            values[param3] = value1 + value2;
            currentPosition += 4;
        } else if (opcode === 2) {
            values[param3] = value1 * value2;
            currentPosition += 4;
        } else if (opcode === 3) {
            values[param1] = input;
            currentPosition += 2;
        } else if (opcode === 4) {
            return value1;
            // output = value1;
            // console.log("output:", value1);
            // currentPosition += 2;
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
            values[param3] = value1 < value2 ? 1 : 0;
            currentPosition += 4;
        } else if (opcode === 8) {
            values[param3] = value1 === value2 ? 1 : 0;
            currentPosition += 4;
        } else {
            throw "unknown opcode: " + opcode;
        }
    }

    return output;
}
