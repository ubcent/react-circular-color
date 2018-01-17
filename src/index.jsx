import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Sector from './sector';
import hsvToRgb from './hsvToRgb';

class CircularColor extends PureComponent {
  constructor(props) {
    super(props);

    const { size } = props;
    const handlerSize = Math.floor(size / 2 * 0.3 / 2);

    this.state = {
      touched: false,
      cx: Math.floor((size / 2) + (Math.floor(size / 2 * 0.6) + handlerSize) * Math.cos(Math.PI)),
      cy: Math.floor((size / 2) - (Math.floor(size / 2 * 0.6) + handlerSize) * Math.sin(Math.PI)),
      color: hsvToRgb(Math.abs(Math.PI) * 180 / Math.PI)
    }
  }

  renderSectors() {
    const { size } = this.props;
    const outerRadius = Math.floor(size / 2 * 0.9);
    const innerRadius = Math.floor(size / 2 * 0.6);

    return Array(360).fill(0).map((sector, idx) => {
      const startAngle = idx * Math.PI / 180;
      const endAngle = (idx + 1 === 360 ? 0 : idx + 1) * Math.PI / 180;
      return (
        <Sector 
          key={idx}
          size={size}
          startAngle={-startAngle} 
          endAngle={-endAngle} 
          innerRadius={innerRadius} 
          outerRadius={outerRadius} 
        />
      );
    });
  }

  mouseDown = (event) => {
    this.setState({
      touched: true
    });
  }

  mouseUp = (event) => {
    this.setState({
      touched: false
    });
  }

  mouseMove = (event) => {
    const { size, onChange } = this.props;
    const { touched } = this.state;
    
    if(touched) {
      const { x: xBlock, y: yBlock } = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - xBlock - size / 2;
      const y = event.clientY - yBlock - size / 2; 
      const angle = -Math.atan2(y, x);
      
      const handlerSize = Math.floor(size / 2 * 0.3 / 2);

      this.setState({
        cx: Math.floor((size / 2) + (Math.floor(size / 2 * 0.6) + handlerSize) * Math.cos(angle)),
        cy: Math.floor((size / 2) - (Math.floor(size / 2 * 0.6) + handlerSize) * Math.sin(angle)),
        color: hsvToRgb(Math.abs(angle) * 180 / Math.PI)
      });

      if(typeof onChange === 'function') {
        onChange(hsvToRgb(Math.abs(angle) * 180 / Math.PI));
      }
    }
  }

  render() {
    const { size, className, centerRect } = this.props;
    const { cx, cy, color } = this.state;
    const handlerSize = Math.floor(size / 2 * 0.3 / 2);

    return (
      <svg className={className} width={size} height={size} onMouseMove={this.mouseMove} onMouseUp={this.mouseUp}>
        {this.renderSectors()}
        {centerRect ? <rect 
          x={size / 2 - 15}
          y={size / 2 - 15}
          height="30"
          width="30"
          fill={color}
        />: ''}
        <circle 
          onMouseDown={this.mouseDown}
          cx={cx} 
          cy={cy} 
          r={handlerSize}
          fill="transparent"
          stroke="#363636"
          strokeWidth="5"
        />
      </svg>
    )
  }
}

CircularColor.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string,
  onChange: PropTypes.func,
  centerRect: PropTypes.bool
};

CircularColor.defaultProps = {
  size: 200,
  centerRect: false
};

export default CircularColor;
