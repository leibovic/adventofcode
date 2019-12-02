const fs = require('fs');
 
fs.readFile('inputs/day3.txt', 'utf8', (err, contents) => {
    var values = contents.split('\n').filter(value => value.length > 0);
    var cloth = [];

    fillCloth(cloth, values);

    console.log("Multiple claims: " + countMultipleClaims(cloth));

    for (let i = 0; i < values.length; i++) {
        var chunks = values[i].split(' ');
        var coords = getCoords(chunks);
        var size = getSize(chunks);

        // All values equal to 1 means that there is no overlap with any other piece
        var overlapExists = false;
        for (let x = coords[0]; x < coords[0] + size[0]; x++) {
            for (let y = coords[1]; y < coords[1] + size[1]; y++) {
                if (cloth[x][y] > 1) {
                    overlapExists = true;
                }
            }
        }

        if (!overlapExists) {
            console.log("No overlap for entry: " + chunks[0]);
        }
    }
});

function getCoords(chunks) {
    var coordsChunk = chunks[2];
    var coordsString = coordsChunk.substring(0, coordsChunk.length - 1);
    return coordsString.split(',').map(x => parseInt(x));
}

function getSize(chunks) {
    return chunks[3].split('x').map(x => parseInt(x));
}

function fillCloth(cloth, values) {
    values.forEach((value) => {
        var chunks = value.split(' ');
        var coords = getCoords(chunks);
        var size = getSize(chunks);

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
}

function countMultipleClaims(cloth) {
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
    return multipleClaimsCount;
}
