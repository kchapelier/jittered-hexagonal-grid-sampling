"use strict";

var JHGS = require('../'),
    should = require('chai').should();

describe('Jittered Hexagonal Grid Sampling', function () {
    describe('fill()', function () {
        it('should return an array of points', function () {
            var sampling = new JHGS({ shape: [50, 30], radius: 4 }),
                points = sampling.fill();

            points.should.be.instanceof(Array);
            points.length.should.be.at.least(1);
            points[0].should.be.instanceof(Array);
        });

        it('should only generate points within the provided grid size', function () {
            var sampling = new JHGS({ shape: [50, 30], radius: 4, jitter: 1 }),
                points = sampling.fill();

            for (var i = 0; i < points.length; i++) {
                points[i][0].should.be.within(0, 50);
                points[i][1].should.be.within(0, 30);
            }
        });
    });

    describe('getAllPoints()', function () {
        it('should return an empty array after the instantiation', function () {
            var sampling = new JHGS({ shape: [50, 30], radius: 4 }),
                points = sampling.getAllPoints();

            points.should.be.instanceof(Array);
            points.length.should.be.equal(0);
        });

        it('should return an array of points after fill', function () {
            var sampling = new JHGS({ shape: [50, 30], radius: 4 });

            sampling.fill();

            var points = sampling.getAllPoints();

            points.should.be.instanceof(Array);
            points.length.should.be.at.least(1);
            points[0].should.be.instanceof(Array);
        });
    });

    describe('next()', function () {
        it('should return the point it successfully placed in the grid', function () {
            var sampling = new JHGS({ shape: [50, 30], radius: 4 });

            var newPoint = sampling.next();
            var points = sampling.getAllPoints();

            newPoint.should.be.instanceof(Array);
            newPoint.length.should.be.equal(2);

            points.length.should.be.equal(1);

            points[0].should.be.deep.equal(newPoint);
        });

        it('should return null if it cannot place any point', function () {
            var sampling = new JHGS({ shape: [10, 10], radius: 4 });

            sampling.fill();

            var newPoint = sampling.next();

            should.equal(newPoint, null);
        });
    });

    describe('reset()', function () {
        it('should clear the state of the JHGS instance', function () {
            var sampling = new JHGS({ shape: [50, 30], radius: 4 });

            sampling.fill();

            var points = sampling.getAllPoints();

            points.length.should.be.above(0);

            sampling.reset();

            points = sampling.getAllPoints();

            points.length.should.be.equal(0);
        });

        it('should not affect previously retrieved point collection', function () {
            var sampling = new JHGS({ shape: [50, 30], radius: 4 });

            sampling.fill();

            var points = sampling.getAllPoints();

            sampling.reset();

            points.length.should.be.above(0);
        });
    });

    describe('general behavior', function () {
        it('should be able to spawn point in a shape with dimensions of 1', function () {
            var sampling = new JHGS({ shape: [1, 1], radius: 0.3 });

            var points = sampling.fill();

            points.length.should.be.above(1);
        });
    });
});