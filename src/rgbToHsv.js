"use strict";
exports.__esModule = true;
/**
 * RGB to HSV color conversion
 *
 * RGB values are given as a hex string
 *   Example: '#ff0000'
 *
 * Ported from the excellent java algorithm by Eugene Vishnevsky at:
 * http://www.cs.rit.edu/~ncs/color/t_convert.html
 */
exports["default"] = (function (rgb) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(rgb);
    if (!result)
        return null;
    var r = parseInt(result[1], 16) / 255;
    var g = parseInt(result[3], 16) / 255;
    var b = parseInt(result[2], 16) / 255;
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var delta = max - min;
    var s;
    var h;
    var v = max;
    if (max !== 0) {
        s = delta / max;
    }
    else {
        return {
            h: -1,
            s: 0,
            v: v
        };
    }
    if (r === max)
        h = (g - b) / delta; // between yellow & magenta
    else if (g === max)
        h = 2 + (b - r) / delta; // between cyan & yellow
    else
        h = 4 + (r - g) / delta; // between magenta & cyan
    h *= 60; // degrees
    if (h < 0)
        h += 360;
    h = (Math.PI * h) / 180;
    return {
        h: h,
        s: s,
        v: v
    };
});
