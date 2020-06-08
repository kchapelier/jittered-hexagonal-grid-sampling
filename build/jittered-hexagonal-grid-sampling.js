(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.JitteredHexagonalGridSampling = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var hexSide = 0.8660254037844386;

var vertices = [
    [
        0.0,
        -1.0
    ],
    [
        hexSide,
        -0.5
    ],
    [
        hexSide,
        0.5
    ],
    [
        0.0,
        1.0
    ],
    [
        -hexSide,
        0.5
    ],
    [
        -hexSide,
        -0.5
    ]
];


/**
 * JitteredHexagonalGridSampling constructor
 * @param {object} options Options
 * @param {Array} options.shape Shape of the space
 * @param {float} options.radius Minimum distance between each points
 * @param {float} [options.jitter] Jitter amount, defaults to 0.666
 * @param {function|null} [rng] RNG function, defaults to Math.random
 * @constructor
 */
function JitteredHexagonalGridSampling (options, rng) {
    this.width = options.shape[0];
    this.height = options.shape[1];
    this.r = options.radius || 1;
    this.jitter = typeof options.jitter === 'undefined' ? 0.6666 : options.jitter;
    this.jitterRadius = this.r * this.jitter;

    this.rng = rng || Math.random;

    this.maxY = Math.ceil(this.height / this.r);
    this.maxXEven = Math.ceil(this.width / (this.r * 2 * hexSide) + 0.5);
    this.maxXOdd = Math.ceil(this.width / (this.r * 2 * hexSide));

    this.currentX = 0;
    this.currentY = 0;
    this.samplePoints = [];
}

JitteredHexagonalGridSampling.prototype.width = 0;
JitteredHexagonalGridSampling.prototype.height = 0;
JitteredHexagonalGridSampling.prototype.r = 0;
JitteredHexagonalGridSampling.prototype.jitter = 0;
JitteredHexagonalGridSampling.prototype.jitterRadius = 0;

JitteredHexagonalGridSampling.prototype.rng = null;

JitteredHexagonalGridSampling.prototype.maxY = 0;
JitteredHexagonalGridSampling.prototype.maxXEven = 0;
JitteredHexagonalGridSampling.prototype.maxXOdd = 0;

JitteredHexagonalGridSampling.prototype.currentX = 0;
JitteredHexagonalGridSampling.prototype.currentY = 0;
JitteredHexagonalGridSampling.prototype.samplePoints = null;

/**
 * Get all the points in the grid.
 * @returns {Array[]} Sample points
 */
JitteredHexagonalGridSampling.prototype.getAllPoints = function () {
    return this.samplePoints;
};

/**
 * Try to generate a new point in the grid, returns null if it wasn't possible
 * @returns {Array|null} The added point or null
 */
JitteredHexagonalGridSampling.prototype.next = function () {
    var y = this.currentY;
    var x = this.currentX;
    
    for (; y < this.maxY; y++) {
        var yOdd = y % 2;
        for (; x < (yOdd ? this.maxXOdd : this.maxXEven) ; x++) {
            var cx = (x * 2 + yOdd) * this.r * hexSide;
            var cy = y * 1.5 * this.r;

            var p = this.rng() * 6;
            var q = this.rng();
            var tri = p | 0;
            p = p % 1;

            var v0 = vertices[tri];
            var v1 = vertices[(tri + 1) % 6];

            if (p + q > 1) {
                p = 1 - p;
                q = 1 - q;
            }

            var point = [
                cx + (v0[0] * p + v1[0] * q) * this.jitterRadius,
                cy + (v0[1] * p + v1[1] * q) * this.jitterRadius
            ];

            if (point[0] < 0 || point[0] >= this.width || point[1] < 0 || point[1] >= this.height) {
                continue;
            }

            this.samplePoints.push(point);
            this.currentY = y;
            this.currentX = x + 1;

            return point;
        }

        x = 0;
    }

    return null;
};

/**
 * Automatically fill the grid.
 * @returns {Array[]} Sample points
 */
JitteredHexagonalGridSampling.prototype.fill = function () {
    while(this.next()) {}

    return this.samplePoints;
};

/**
 * Reinitialize the grid as well as the internal state
 */
JitteredHexagonalGridSampling.prototype.reset = function () {
    this.samplePoints = [];
    this.currentX = this.currentY = 0;
};

module.exports = JitteredHexagonalGridSampling;
},{}]},{},[1])(1)
});
