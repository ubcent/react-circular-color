import React, { PropTypes } from 'react';
import Raphael from 'raphael';

class CircularColor extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    const { size } = this.props;
    const a = Math.PI / 2 - Math.PI * 2 / this.segments * 1.3,
      R = (size / 2) - this.padding,
      R2 = (size / 2) - this.padding - (size / 20) * 2,
      path = ["M", size / 2, this.padding, "A", R, R, 0, 0, 1, R * Math.cos(a) + R + this.padding, R - R * Math.sin(a) + this.padding, "L", R2 * Math.cos(a) + R + this.padding, R - R2 * Math.sin(a) + this.padding, "A", R2, R2, 0, 0, 0, size / 2, this.padding + size / 20 * 2, "z"].join(),
      fi = 1.6180339887;

    this.x = this.wrapper.clientTop + this.wrapper.clientHeight / 2
    this.y = this.wrapper.clientLeft + this.wrapper.clientWidth / 2 ;

    console.log(this.x, this.y);
    this.rElement = Raphael(this.wrapper, size, size);

    for (let i = 0; i < this.segments; i++) {
      this.rElement.path(path).attr({
        stroke: "none",
        fill: "hsb(" + i * (255 / this.segments) / 255 + ", 1, 0.78)",
        transform: "r" + [(360 / this.segments) * i, size / 2, size / 2]
      });
    }

    this.cursorhsb = this.rElement.set();
    var h = size / 20 * 2 + 2;
    this.cursorhsb.push(this.rElement.circle(size / 2 - h / fi / 2, this.padding + 10, (R - R2) / 2).attr({
      fill: "#fff",
      opacity: .5,
      "stroke-width": 0
    }));
    this.ring = this.rElement.path(["M", size / 2, this.padding, "A", R, R, 0, 1, 1, size / 2 - 1, this.padding, "l1,0M", size / 2, this.padding + size / 20 * 2, "A", R2, R2, 0, 1, 1, size / 2 - 1, this.padding + size / 20 * 2, "l1,0"]).attr({
      fill: "#000",
      opacity: 0,
      stroke: "none"
    });

    this.ring.drag((dx, dy, x, y) => {
      this.docOnMove(dx, dy, x, y);
    }, (x, y) => {
      this.hsbOnTheMove = true;
      this.setH(x - this.x - size / 2, y - this.y - size / 2);
    }, function () {
      this.hsbOnTheMove = false;
    });
  }

  docOnMove(dx, dy, x, y) {
    const {size} = this.props;
    if (this.hsbOnTheMove) {
      this.setH(x - this.x - size / 2, y - this.y - size / 2);
    }
  }

  setH(x, y) {
    const d = Raphael.angle(x, y, 0, 0),
      rd = Raphael.rad(d), { size } = this.props;
      console.log(rd, d);
    this.cursorhsb.attr({ transform: "r" + [d + 90, size / 2, size / 2] });
  }

  get const200() {
    return 200;
  }

  get padding() {
    const { size } = this.props;
    return 2 * size / 200;
  }

  get segments() {
    const { size } = this.props;
    return Math.PI * size / 5;
  }

  render() {
    return (
      <div ref={div => { this.wrapper = div; }} />
    );
  }
}

CircularProgressbar.propTypes = {
  size: PropTypes.number,
  initialColor: PropTypes.string
};

CircularProgressbar.defaultProps = {
  size: 200
};

export default CircularProgressbar;
