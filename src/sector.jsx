import React, { PureComponent } from 'react';
import hsvToRgb from './hsvToRgb';

class Sector extends PureComponent {
  pointOnCircle(radius, angle) {
    const { size } = this.props;
    const center = {
      x: size / 2,
      y: size / 2
    }
    return {
      x: center.x + radius * Math.cos(angle),
      y: center.y - radius * Math.sin(angle)
    };
  }

  render() {
    const { startAngle, endAngle, outerRadius, innerRadius } = this.props;
    
    const p1 = this.pointOnCircle(outerRadius, startAngle);
    const p2 = this.pointOnCircle(outerRadius, endAngle);
    const p3 = this.pointOnCircle(innerRadius, endAngle);
    const p4 = this.pointOnCircle(innerRadius, startAngle);

    const longArcFlag = +(endAngle < startAngle ? startAngle - endAngle > Math.PI : startAngle - endAngle > -Math.PI);
    const path = `M ${p1.x},${p1.y}
    A ${outerRadius},${outerRadius} 0 ${longArcFlag} 1 ${p2.x} ${p2.y}
    L ${p3.x},${p3.y}
    A ${innerRadius},${innerRadius} 0 ${longArcFlag} 0 ${p4.x} ${p4.y}
    Z`;

    const color = hsvToRgb(Math.abs(startAngle) * 180 / Math.PI);
    
    return (
      <path d={path} fill={color}/>
    )
  }
}

export default Sector;
