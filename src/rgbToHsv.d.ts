/**
 * RGB to HSV color conversion
 *
 * RGB values are given as a hex string
 *   Example: '#ff0000'
 *
 * Ported from the excellent java algorithm by Eugene Vishnevsky at:
 * http://www.cs.rit.edu/~ncs/color/t_convert.html
 */
declare const _default: (rgb: string) => {
  h: number;
  s: number;
  v: number;
};
export default _default;
