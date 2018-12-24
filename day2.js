const fs = require('fs');
 
fs.readFile('inputs/day2.txt', 'utf8', (err, contents) => {
    var values = contents.split('\n').filter(value => value.length > 0);

    var twoTimes = 0;
    var threeTimes = 0;

    values.forEach((value) => {
        var repeats = countRepeatCharacters(value);
        if (repeats[2]) {
            twoTimes++;
        }
        if (repeats[3]) {
            threeTimes++;
        }
    });

    var checksum = twoTimes * threeTimes;
    console.log(checksum);
});

function countRepeatCharacters(string) {
    var counts = {};
    for (var i = 0; i < string.length; i++) {
        var char = string[i];
        if (counts[char]) {
            counts[char] = counts[char] + 1;
        } else {
            counts[char] = 1;
        }
    }
    return {
        2: Object.values(counts).includes(2),
        3: Object.values(counts).includes(3)
    };
}
