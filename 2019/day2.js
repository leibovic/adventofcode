const fs = require('fs');
 
fs.readFile('inputs/day2.txt', 'utf8', (err, contents) => {
    const values = contents.split(',').map(value => parseInt(value));
    const { noun, verb } = findOutput(19690720, values);
    console.log(noun, verb);
});

const findOutput = (desiredOutput, values) => {
    for (let noun = 0; noun < 100; noun++) {
        for (let verb = 0; verb < 100; verb++) {
            let valuesCopy = [...values];
            valuesCopy[1] = noun;
            valuesCopy[2] = verb;
            runIntcodeProgram(valuesCopy);
            if (valuesCopy[0] === desiredOutput) {
                return { noun, verb };
            }
        }
    }

    return { noun: -1, verb: -1 };
}

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
