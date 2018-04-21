import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Sector from './sector';
import hsvToRgb from './hsvToRgb';
import rgbToHsv from './rgbToHsv';

class CircularColor extends PureComponent {
  static epsilon = 4;

  constructor(props) {
    super(props);

    const { size, color  } = props;
    const handlerSize = Math.floor(size / 2 * 0.3 / 2);
    const innerRadius = Math.floor(size / 2 * 0.6);
    const outerRadius = Math.floor(size / 2 * 0.9);

    this.statics = {
      handlerSize,
      innerRadius,
      outerRadius
    };

    const h  = rgbToHsv(color);

    this.state = {
      touched: false,
      cx: Math.floor((size / 2) + (innerRadius + handlerSize) * Math.cos(h)),
      cy: Math.floor((size / 2) - (innerRadius + handlerSize) * Math.sin(h)),
      color,
    }
  }

  componentDidMount() {
    window.addEventListener('touchmove', this.preventScrolling, { passive: false });
  }

  componentWillUnmount() {
    window.removeEventListener('touchmove', this.preventScrolling);
  }

  preventScrolling = (event) => {
    const { touched } = this.state;
    if(touched) {
      event.preventDefault();
    }
  }

  renderSectors() {
    const { size, numberOfSectors } = this.props;
    const { innerRadius, outerRadius } = this.statics;

    return Array(numberOfSectors).fill(0).map((sector, idx) => {
      const startAngle = (idx * Math.PI / 180) * 360 / numberOfSectors;
      const endAngle = ((idx + 1 === numberOfSectors ? 0 : idx + 1) * Math.PI / 180) * 360 / numberOfSectors;
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

  handleClick = (event) => {
    const { size } = this.props;
    const { innerRadius, outerRadius } = this.statics;

    const { x: xBlock, y: yBlock } = event.currentTarget.getBoundingClientRect();

    const x = event.clientX - xBlock - size / 2;
    const y = event.clientY - yBlock - size / 2;

    const angle = -Math.atan2(y, x);

    const outX = Math.abs(Math.floor((outerRadius) * Math.cos(angle)));
    const outY = Math.abs(Math.floor((outerRadius) * Math.sin(angle)));

    const inX = Math.abs(Math.floor((innerRadius) * Math.cos(angle)));
    const inY = Math.abs(Math.floor((innerRadius) * Math.sin(angle)));

    if (Math.abs(x) >= (inX - CircularColor.epsilon)
        && Math.abs(x) <= (outX + CircularColor.epsilon)
        || Math.abs(y) >= (inY - CircularColor.epsilon)
        && Math.abs(y) <= (outY + CircularColor.epsilon)) {
      this.updateHandlerPosition(angle);
    }
  }

  handleDown = (event) => {
    this.setState({
      touched: true
    });
  }

  handleUp = (event) => {
    this.setState({
      touched: false
    });
  }

  handleMove = (event) => {
    const { size } = this.props;
    const { touched } = this.state;
    
    if(touched) {
      const { x: xBlock, y: yBlock } = event.currentTarget.getBoundingClientRect();

      const evt = event.type === 'touchmove' ? event.touches[0] || event.changedTouches[0] : event;
      const x = evt.clientX - xBlock - size / 2;
      const y = evt.clientY - yBlock - size / 2; 

      const angle = -Math.atan2(y, x);

      this.updateHandlerPosition(angle);
    }
  }

  updateHandlerPosition = (angle) => {
    const { size, onChange } = this.props;
    const { innerRadius, handlerSize } = this.statics;

    const color = angle <= 0 ? -angle * 180 / Math.PI : (2 * Math.PI - angle) * 180 / Math.PI;

    this.setState({
      cx: Math.floor((size / 2) + (innerRadius + handlerSize) * Math.cos(angle)),
      cy: Math.floor((size / 2) - (innerRadius + handlerSize) * Math.sin(angle)),
      color: hsvToRgb(color)
    });

    if(typeof onChange === 'function') {
      onChange(hsvToRgb(color))
    }
  }

  render() {
    const { size, className, centerRect } = this.props;
    const { cx, cy, color } = this.state;
    const { handlerSize } = this.statics;

    return (
      <svg 
        className={className}
        width={size}
        height={size}
        onMouseMove={this.handleMove}
        onMouseUp={this.handleUp}
        onTouchEnd={this.handleUp}
        onTouchMove={this.handleMove}
        onClick={this.handleClick}
      >
        {this.renderSectors()}
        {centerRect ? <rect 
          x={size / 2 - 15}
          y={size / 2 - 15}
          height="30"
          width="30"
          fill={color}
        />: ''}
        <circle 
          onMouseDown={this.handleDown}
          onTouchStart={this.handleDown}
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
  numberOfSectors: PropTypes.number,
  className: PropTypes.string,
  onChange: PropTypes.func,
  centerRect: PropTypes.bool,
  color: PropTypes.string
};

CircularColor.defaultProps = {
  size: 200,
  numberOfSectors: 360,
  centerRect: false,
  color: '#f2ff00',
};

export default CircularColor;
