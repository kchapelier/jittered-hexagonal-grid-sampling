"use strict";

function toMs (time) {
    return (time[0] * 1000 + time[1] / 1000000);
}

var JitteredHexSampling = require('./');

function benchmark (shape, radius, jitter, iterations, warmup) {
    var time = process.hrtime(),
        s = 0,
        sampling, i;

    for (i = 0; i < iterations; i++) {
        sampling = new JitteredHexSampling({
            shape: shape,
            radius: radius,
            jitter: jitter
        });

        s+= sampling.fill().length;
    }

    time = process.hrtime(time);

    if (!warmup) {
        console.log('[' + shape.join('x') + ' radius ' + radius + ' jitter ' + jitter + ']: ' + (toMs(time) / iterations).toFixed(3) + 'ms for ~' + (s/iterations|0)+' points');
    }
}

console.log();

benchmark([800, 800], 4, 0.666, 50, true);
benchmark([800, 800], 5.4, 0.666, 30, false);
benchmark([800, 800], 2.7, 0.666, 30, false);
benchmark([800, 800], 1.35, 0.666, 30, false);

console.log();