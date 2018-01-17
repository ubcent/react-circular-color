import React, { PureComponent, PropTypes } from 'react';
import Sector from './sector';

class CircularColor extends PureComponent {
  constructor(props) {
    super(props);

    const { size } = props;
    const handlerSize = Math.floor(size / 2 * 0.3 / 2);

    this.state = {
      touched: false,
      cx: Math.floor((size / 2) + (Math.floor(size / 2 * 0.6) + handlerSize) * Math.cos(Math.PI)),
      cy: Math.floor((size / 2) - (Math.floor(size / 2 * 0.6) + handlerSize) * Math.sin(Math.PI))
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
    const { size } = this.props;
    const { touched } = this.state;
    
    if(touched) {
      const { x: xBlock, y: yBlock } = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - xBlock - size / 2;
      const y = event.clientY - yBlock - size / 2; 
      const angle = -Math.atan2(y, x);
      
      const handlerSize = Math.floor(size / 2 * 0.3 / 2);

      this.setState({
        cx: Math.floor((size / 2) + (Math.floor(size / 2 * 0.6) + handlerSize) * Math.cos(angle)),
        cy: Math.floor((size / 2) - (Math.floor(size / 2 * 0.6) + handlerSize) * Math.sin(angle))
      })
    }
  }

  render() {
    const { size } = this.props;
    const { cx, cy } = this.state;
    const handlerSize = Math.floor(size / 2 * 0.3 / 2);

    return (
      <svg width={size} height={size} onMouseMove={this.mouseMove}>
        {this.renderSectors()}
        <circle 
          onMouseDown={this.mouseDown} 
          onMouseUp={this.mouseUp}
          cx={cx} 
          cy={cy} 
          r={handlerSize} 
        />
      </svg>
    )
  }
}

CircularColor.propTypes = {
  size: PropTypes.number
};

CircularColor.defaultProps = {
  size: 200
};

export default CircularColor;
