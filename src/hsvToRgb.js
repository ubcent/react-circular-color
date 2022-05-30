'use strict';
/* eslint-disable no-mixed-operators */
/* eslint-disable no-multi-assign */
/* eslint-disable no-param-reassign */
/**
 * HSV to RGB color conversion
 *
 * H runs from 0 to 360 degrees
 * S and V run from 0 to 100
 *
 * Ported from the excellent java algorithm by Eugene Vishnevsky at:
 * http://www.cs.rit.edu/~ncs/color/t_convert.html
 */
exports.__esModule = true;
exports['default'] = function (h, s, v) {
  if (s === void 0) {
    s = 100;
  }
  if (v === void 0) {
    v = 100;
  }
  var r;
  var g;
  var b;
  // Make sure our arguments stay in-range
  h = Math.max(0, Math.min(360, h));
  s = Math.max(0, Math.min(100, s));
  v = Math.max(0, Math.min(100, v));
  // We accept saturation and value arguments from 0 to 100 because that's
  // how Photoshop represents those values. Internally, however, the
  // saturation and value are calculated from a range of 0 to 1. We make
  // That conversion here.
  s /= 100;
  v /= 100;
  if (s === 0) {
    // Achromatic (grey)
    r = g = b = v;
    return '#'
      .concat(
        Math.round(r * 255)
          .toString(16)
          .padStart(2, '0')
      )
      .concat(
        Math.round(g * 255)
          .toString(16)
          .padStart(2, '0')
      )
      .concat(
        Math.round(b * 255)
          .toString(16)
          .padStart(2, '0')
      );
  }
  h /= 60; // sector 0 to 5
  var i = Math.floor(h);
  var f = h - i; // factorial part of h
  var p = v * (1 - s);
  var q = v * (1 - s * f);
  var t = v * (1 - s * (1 - f));
  switch (i) {
    case 0:
      r = v;
      g = t;
      b = p;
      break;
    case 1:
      r = q;
      g = v;
      b = p;
      break;
    case 2:
      r = p;
      g = v;
      b = t;
      break;
    case 3:
      r = p;
      g = q;
      b = v;
      break;
    case 4:
      r = t;
      g = p;
      b = v;
      break;
    default: // case 5:
      r = v;
      g = p;
      b = q;
  }
  return '#'
    .concat(
      Math.round(r * 255)
        .toString(16)
        .padStart(2, '0')
    )
    .concat(
      Math.round(g * 255)
        .toString(16)
        .padStart(2, '0')
    )
    .concat(
      Math.round(b * 255)
        .toString(16)
        .padStart(2, '0')
    );
};
