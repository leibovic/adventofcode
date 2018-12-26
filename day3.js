const fs = require('fs');
 
fs.readFile('inputs/day3.txt', 'utf8', (err, contents) => {
    var values = contents.split('\n').filter(value => value.length > 0);
    var cloth = [];

    values.forEach((value) => {
        var chunks = value.split(' ');

        var coordsChunk = chunks[2];
        var coordsString = coordsChunk.substring(0, coordsChunk.length - 1);
        var coords = coordsString.split(',').map(x => parseInt(x));

        var size = chunks[3].split('x').map(x => parseInt(x));

        for (let x = coords[0]; x < coords[0] + size[0]; x++) {
            for (let y = coords[1]; y < coords[1] + size[1]; y++) {
                if (cloth[x] === undefined) {
                    cloth[x] = [];
                }
                if (cloth[x][y]) {
                    cloth[x][y] = cloth[x][y] + 1;
                } else {
                    cloth[x][y] = 1;
                }
            }
        }
    });

    var multipleClaimsCount = 0;

    for (let i = 0; i < cloth.length; i++) {
        let row = cloth[i];
        if (row !== undefined) {
            for (j = 0; j < row.length; j++) {
                if (row[j] !== undefined && row[j] > 1) {
                    multipleClaimsCount++;
                }
            }
        }
    }

    console.log(multipleClaimsCount);
});
