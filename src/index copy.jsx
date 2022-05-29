import React from 'react';
import PropTypes from 'prop-types';
import Sector from './sector';
import hsvToRgb from './hsvToRgb';
import rgbToHsv from './rgbToHsv';
import { useEffect, useState } from 'react/cjs/react.production.min';

function CircularColor(props) {
  const {
    size,
    numberOfSectors,
    className,
    onChange,
    centerRect,
    renderRect,
    renderHandle,
    color,
  } = props;
  const epsilon = 4;
  const handlerSize = Math.floor(((size / 2) * 0.3) / 2);
  const innerRadius = Math.floor((size / 2) * 0.6);
  const outerRadius = Math.floor((size / 2) * 0.9);

  const [state, setState] = useState({
    touched: false,
    // eslint-disable-next-line no-mixed-operators
    cx: Math.floor(size / 2 + (innerRadius + handlerSize) * Math.cos(h)),
    // eslint-disable-next-line no-mixed-operators
    cy: Math.floor(size / 2 - (innerRadius + handlerSize) * Math.sin(h)),
  });
  const preventScrolling = (event) => {
    const { touched } = state;
    if (touched) {
      event.preventDefault();
    }
  };

  const renderSectors = () =>
    Array(numberOfSectors)
      .fill(0)
      .map((sector, idx) => {
        const startAngle = (((idx * Math.PI) / 180) * 360) / numberOfSectors;
        const endAngle =
          ((((idx + 1 === numberOfSectors ? 0 : idx + 1) * Math.PI) / 180) *
            360) /
          numberOfSectors;
        return (
          <Sector
            // eslint-disable-next-line react/no-array-index-key
            key={idx}
            size={size}
            startAngle={-startAngle}
            endAngle={-endAngle}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
          />
        );
      });

  useEffect(() => {
    this.window.addEventListener('touchmove', preventScrolling, {
      passive: false,
    });
    return this.window.removeEventListener('touchmove', preventScrolling);
  }, []);

  const updateHandlerPosition = (angle) => {
    // const { size, onChange } = props;
    // const { innerRadius, handlerSize } = statics;

    const innerColor =
      angle <= 0
        ? (-angle * 180) / Math.PI
        : // eslint-disable-next-line no-mixed-operators
          ((2 * Math.PI - angle) * 180) / Math.PI;

    setState({
      // eslint-disable-next-line no-mixed-operators
      cx: Math.floor(size / 2 + (innerRadius + handlerSize) * Math.cos(angle)),
      // eslint-disable-next-line no-mixed-operators
      cy: Math.floor(size / 2 - (innerRadius + handlerSize) * Math.sin(angle)),
      color: hsvToRgb(innerColor),
    });

    if (typeof onChange === 'function') {
      onChange(hsvToRgb(innerColor));
    }
  };

  const handleClick = (event) => {
    const { x: xBlock, y: yBlock } =
      event.currentTarget.getBoundingClientRect();

    // eslint-disable-next-line no-mixed-operators
    const x = event.clientX - xBlock - size / 2;
    // eslint-disable-next-line no-mixed-operators
    const y = event.clientY - yBlock - size / 2;

    const angle = -Math.atan2(y, x);

    const outX = Math.abs(Math.floor(outerRadius * Math.cos(angle)));
    const outY = Math.abs(Math.floor(outerRadius * Math.sin(angle)));

    const inX = Math.abs(Math.floor(innerRadius * Math.cos(angle)));
    const inY = Math.abs(Math.floor(innerRadius * Math.sin(angle)));

    if (
      (Math.abs(x) >= inX - epsilon && Math.abs(x) <= outX + epsilon) ||
      (Math.abs(y) >= inY - epsilon && Math.abs(y) <= outY + epsilon)
    ) {
      updateHandlerPosition(angle);
    }
  };

  const handleDown = () => {
    setState({
      touched: true,
    });
  };

  const handleUp = () => {
    setState({
      touched: false,
    });
  };

  const handleMove = (event) => {
    const { touched } = state;

    if (touched) {
      const { x: xBlock, y: yBlock } =
        event.currentTarget.getBoundingClientRect();

      const evt =
        event.type === 'touchmove'
          ? event.touches[0] || event.changedTouches[0]
          : event;
      const x = evt.clientX - xBlock - size / 2;
      const y = evt.clientY - yBlock - size / 2;

      const angle = -Math.atan2(y, x);

      updateHandlerPosition(angle);
    }
  };

  const { h } = rgbToHsv(color);
  const { cx, cy } = state;
  // const { handlerSize } = statics;

  // eslint-disable-next-line no-mixed-operators
  const rectX = props.size / 2 - 15;
  // eslint-disable-next-line no-mixed-operators
  const rectY = props.size / 2 - 15;
  return (
    <svg
      className={className}
      width={size}
      height={size}
      onMouseMove={handleMove}
      onMouseUp={handleUp}
      onTouchEnd={handleUp}
      onTouchMove={handleMove}
      onClick={handleClick}
    >
      {renderSectors()}
      {centerRect ? renderRect({ color, x: rectX, y: rectY }) : ''}
      {renderHandle({
        onHandleDown: handleDown,
        handleRadius: handlerSize,
        cx,
        cy,
      })}
    </svg>
  );
}

// eslint-disable-next-line react/prop-types
const renderRect = ({ color: colorValue, x, y }) => (
  <rect x={x} y={y} height="30" width="30" fill={colorValue} />
);

// eslint-disable-next-line react/prop-types
const renderHandle = ({ onHandleDown, cx, cy, handleRadius }) => (
  <circle
    onMouseDown={onHandleDown}
    onTouchStart={onHandleDown}
    cx={cx}
    cy={cy}
    r={handleRadius}
    fill="transparent"
    stroke="#363636"
    strokeWidth="5"
  />
);

CircularColor.propTypes = {
  size: PropTypes.number,
  numberOfSectors: PropTypes.number,
  className: PropTypes.string,
  onChange: PropTypes.func,
  centerRect: PropTypes.bool,
  renderRect: PropTypes.func,
  renderHandle: PropTypes.func,
  color: PropTypes.string,
};

CircularColor.defaultProps = {
  size: 200,
  numberOfSectors: 360,
  centerRect: false,
  color: '#f2ff00',
  className: '',
  onChange: () => {},
  renderRect,
  renderHandle,
};
export default CircularColor;
