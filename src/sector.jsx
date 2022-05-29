import React from 'react';
import PropTypes from 'prop-types';
import hsvToRgb from './hsvToRgb';

function Sector(props) {
  const { startAngle, endAngle, outerRadius, innerRadius, size } = props;
  const pointOnCircle = (radius, angle) => {
    const center = {
      x: size / 2,
      y: size / 2,
    };
    return {
      // eslint-disable-next-line no-mixed-operators
      x: center.x + radius * Math.cos(angle),
      // eslint-disable-next-line no-mixed-operators
      y: center.y - radius * Math.sin(angle),
    };
  };

  const p1 = pointOnCircle(outerRadius, startAngle);
  const p2 = pointOnCircle(outerRadius, endAngle);
  const p3 = pointOnCircle(innerRadius, endAngle);
  const p4 = pointOnCircle(innerRadius, startAngle);
  const longArcFlag = +(endAngle < startAngle
    ? startAngle - endAngle > Math.PI
    : startAngle - endAngle > -Math.PI);
  const path = `M ${p1.x},${p1.y}
  A ${outerRadius},${outerRadius} 0 ${longArcFlag} 1 ${p2.x} ${p2.y}
  L ${p3.x},${p3.y}
  A ${innerRadius},${innerRadius} 0 ${longArcFlag} 0 ${p4.x} ${p4.y}
  Z`;

  const color = hsvToRgb((Math.abs(startAngle) * 180) / Math.PI);

  return <path d={path} fill={color} />;
}

Sector.propTypes = {
  startAngle: PropTypes.number,
  endAngle: PropTypes.number,
  outerRadius: PropTypes.number,
  innerRadius: PropTypes.number,
  size: PropTypes.number,
};

Sector.defaultProps = {
  startAngle: 0,
  endAngle: 0,
  outerRadius: 0,
  innerRadius: 0,
  size: 0,
};

export default Sector;
