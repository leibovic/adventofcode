const fs = require('fs');
 
fs.readFile('inputs/day8.txt', 'utf8', (err, data) => {
    const width = 25;
    const height = 6;
    const layerSize = width * height;
    const layers = [];

    for (let i = 0; i < data.length; i++) {
        if (i % layerSize === 0) {
            layers.push({});
        }

        const pixel = data[i];
        const pixelCount = layers[layers.length - 1][pixel];
        layers[layers.length - 1][pixel] = pixelCount ? pixelCount + 1 : 1;
    }

    let fewestZeroCount = Infinity;
    let fewestZeroIndex;
    for (let i = 0; i < layers.length; i++) {
        let zeroCount = layers[i]["0"] ? layers[i]["0"] : 0;
        if (zeroCount < fewestZeroCount) {
            fewestZeroCount = zeroCount;
            fewestZeroIndex = i;
        }
    }

    const fewestZeroLayer = layers[fewestZeroIndex];
    console.log(fewestZeroLayer["1"] * fewestZeroLayer["2"]);
;});
