/**
 * RGB to HSV color conversion
 *
 * RGB values are given as a hex string
 *   Example: '#ff0000'
 *
 * Ported from the excellent java algorithm by Eugene Vishnevsky at:
 * http://www.cs.rit.edu/~ncs/color/t_convert.html
 */
export default (rgb: string): { h: number; s: number; v: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(rgb);
  if (!result) return null;

  const r = parseInt(result[1], 16) / 255;
  const g = parseInt(result[3], 16) / 255;
  const b = parseInt(result[2], 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let s;
  let h;
  const v = max;
  if (max !== 0) {
    s = delta / max;
  } else {
    return {
      h: -1,
      s: 0,
      v,
    };
  }

  if (r === max) h = (g - b) / delta; // between yellow & magenta
  else if (g === max) h = 2 + (b - r) / delta; // between cyan & yellow
  else h = 4 + (r - g) / delta; // between magenta & cyan

  h *= 60; // degrees
  if (h < 0) h += 360;

  h = (Math.PI * h) / 180;
  return {
    h,
    s,
    v,
  };
};
