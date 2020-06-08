"use strict";

var JitteredHexSampling = require('./');
var PNG = require('pngjs-nozlib').PNG;

function outputPng (sampling, drawFunc) {
    var png = new PNG({
        width: sampling.width,
        height: sampling.height,
        colortype: 6,
        inputHasAlpha: true,
        filterType: 4
    });
  
    var pngData = new Uint8Array(png.data);
  
    drawFunc(sampling, pngData);
  
    for (var i = 3; i < pngData.length; i+=4) {
        pngData[i] = 255;
    }
  
    png.data = pngData;
  
    png.pack().pipe(process.stdout);
}

var sampling = new JitteredHexSampling({
    shape: [600, 600],
    radius: 7,
    jitter: 0.666
});
sampling.fill();

outputPng(sampling, function (sampling, pngData) {
    sampling.getAllPoints().forEach(function (point) {
        var pixelIndex = (Math.floor(point[0]) + Math.floor(point[1]) * sampling.width) * 4;
        pngData[pixelIndex] = pngData[pixelIndex + 1] = pngData[pixelIndex + 2] = 255;
    });
});