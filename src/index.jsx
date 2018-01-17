import React, { PropTypes } from 'react';
import Sector from './sector';

class CircularColor extends React.Component {
  renderSectors() {
    const { size } = this.props;
    const outerRadius = Math.floor(size / 2 * 0.9);
    const innerRadius = Math.floor(size / 2 * 0.6);

    return Array(360).fill(0).map((sector, idx) => {
      const startAngle = idx * Math.PI / 180;
      const endAngle = (idx + 1 === 360 ? 0 : idx + 1) * Math.PI / 180;
      return (
        <Sector 
          startAngle={-startAngle} 
          endAngle={-endAngle} 
          innerRadius={innerRadius} 
          outerRadius={outerRadius} 
        />
      );
    });
  }

  render() {
    const { size } = this.props;

    return (
      <svg width={size} height={size}>
          {this.renderSectors()}
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
