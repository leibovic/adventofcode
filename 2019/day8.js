const fs = require('fs');
 
fs.readFile('inputs/day8.txt', 'utf8', (err, data) => {
    const width = 25;
    const height = 6;
    const layerSize = width * height;
    
    const layerPixelCounts = [];
    const image = [];

    for (let i = 0; i < data.length; i++) {
        const pixelIndex = i % layerSize;
        if (pixelIndex === 0) {
            layerPixelCounts.push({});
        }

        const pixel = data[i];
        if (!image[pixelIndex] || image[pixelIndex] === "2") {
            image[pixelIndex] = pixel;
        }

        const layerIndex = layerPixelCounts.length - 1;
        const pixelCount = layerPixelCounts[layerIndex][pixel];
        layerPixelCounts[layerIndex][pixel] = pixelCount ? pixelCount + 1 : 1;
    }

    let fewestZeroCount = Infinity;
    let fewestZeroIndex;
    for (let i = 0; i < layerPixelCounts.length; i++) {
        let zeroCount = layerPixelCounts[i]["0"] ? layerPixelCounts[i]["0"] : 0;
        if (zeroCount < fewestZeroCount) {
            fewestZeroCount = zeroCount;
            fewestZeroIndex = i;
        }
    }

    const fewestZeroLayer = layerPixelCounts[fewestZeroIndex];
    console.log(fewestZeroLayer["1"] * fewestZeroLayer["2"]);

    let imageString = image.join("").replace(/0/g, "■").replace(/1/g, "□");
    for (let i = 0; i < imageString.length; i = i + width) {
        console.log(imageString.substring(i, i + width))
    }
;});
