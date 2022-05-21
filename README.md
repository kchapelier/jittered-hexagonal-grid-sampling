# jittered-hexagonal-grid-sampling

[![Build Status](https://travis-ci.org/kchapelier/jittered-hexagonal-grid-sampling.svg)](https://travis-ci.org/kchapelier/jittered-hexagonal-grid-sampling) [![NPM version](https://badge.fury.io/js/jittered-hexagonal-grid-sampling.svg)](http://badge.fury.io/js/jittered-hexagonal-grid-sampling)

Jittered Hexagonal Grid Sampling

<img src="https://github.com/kchapelier/jittered-hexagonal-grid-sampling/raw/master/img/debugview.png" style="image-rendering:pixelated; width:500px;"></img>

## Installing

With [npm](https://www.npmjs.com/) do:

```
npm install jittered-hexagonal-grid-sampling
```

With [yarn](https://yarnpkg.com/) do:

```
yarn add jittered-hexagonal-grid-sampling
```

A compiled version for web browsers is also available on a CDN:

```html
<script src="https://cdn.jsdelivr.net/gh/kchapelier/jittered-hexagonal-grid-sampling@1.0.1/build/jittered-hexagonal-grid-sampling.min.js"></script>
```

## Features

- Can be used with a custom RNG function.
- Similar general API as [poisson-disk-sampling](https://github.com/kchapelier/poisson-disk-sampling) and [fast-2d-poisson-disk-sampling](https://github.com/kchapelier/fast-2d-poisson-disk-sampling).

## Basic example

```js
var p = new JitteredHexagonalGridSampling({
    shape: [500, 200],
    radius: 5
});
var points = p.fill();

console.log(points); // array of sample points, themselves represented as simple arrays
```

### Result as an image

<img src="https://github.com/kchapelier/jittered-hexagonal-grid-sampling/raw/master/img/example1.png" style="image-rendering:pixelated; width:500px;"></img>

## Public API

### Constructor

**new JitteredHexagonalGridSampling(options[, rng])**

- *options :*
  - *shape :* Size/dimensions of the grid to generate points in, required.
  - *radius :* Radius of the circumcircle of the regular hexagon, required.
  - *jitter :* Jitter amount, defaults to 0.666.
- *rng :* A function to use as random number generator, defaults to Math.random.

The following code will allow the generation of points where both coordinates will range from *0 up to 50* (including 0, but not including 50, **0 <= c < 50**).

```js
var sampling = new JitteredHexagonalGridSampling({
    shape: [50, 50],
    radius: 4
});
```

### Methods

**sampling.fill()**

Fill the grid with jittered points.

Returns the entirety of the points in the grid as an array of coordinate arrays. The points are sorted in their generation order.

```js
var points = sampling.fill();

console.log(points[0]);
// prints something like [30, 16]
```

**sampling.getAllPoints()**

Get all the points present in the grid without trying to generate any new points.

Returns the entirety of the points in the grid as an array of coordinate arrays. The points are sorted in their generation order.

```js
var points = sampling.getAllPoints();

console.log(points[0]);
// prints something like [30, 16]
```

**sampling.next()**

Try to generate a new point in the grid.

Returns a coordinate array when a point is generated, null otherwise.

```js
var point;

while(point = sampling.next()) {
    console.log(point); // [x, y]
}
```

**sampling.reset()**

Reinitialize the grid as well as the internal state.

## History

### [1.0.1](https://github.com/kchapelier/jittered-hexagonal-grid-sampling/tree/1.0.1) (2022-05-21) :

- Update dev dependencies

### [1.0.0](https://github.com/kchapelier/jittered-hexagonal-grid-sampling/tree/1.0.0) (2020-06-08) :

- First release

## Roadmap

None.

## How to contribute ?

For new features and other enhancements, please make sure to contact me beforehand, either on [Twitter](https://twitter.com/kchplr) or through an issue on Github.

## License

MIT