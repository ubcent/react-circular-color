import { FC, ReactElement, useEffect, useState } from 'react';
import Sector from './sector';
import hsvToRgb from './hsvToRgb';
import rgbToHsv from './rgbToHsv';
import { CircularColorProps, RenderHandle, RenderReact } from './types';

const CircularColor: FC<CircularColorProps> = (
  props: CircularColorProps
): ReactElement => {
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

  const h: any = rgbToHsv(color)?.h;

  const [state, setState] = useState({
    touched: false,

    cx: Math.floor(size / 2 + (innerRadius + handlerSize) * Math.cos(h)),

    cy: Math.floor(size / 2 - (innerRadius + handlerSize) * Math.sin(h)),
    color,
  });
  const preventScrolling = (event: Event): void => {
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
    window.addEventListener('touchmove', preventScrolling, {
      passive: false,
    });
    return window.removeEventListener('touchmove', preventScrolling);
  }, []);
  const updateHandlerPosition = (angle: number) => {
    const innerColor =
      angle <= 0
        ? (-angle * 180) / Math.PI
        : ((2 * Math.PI - angle) * 180) / Math.PI;

    setState({
      ...state,

      cx: Math.floor(size / 2 + (innerRadius + handlerSize) * Math.cos(angle)),

      cy: Math.floor(size / 2 - (innerRadius + handlerSize) * Math.sin(angle)),
      color: hsvToRgb(innerColor),
    });

    if (typeof onChange === 'function') {
      onChange(hsvToRgb(innerColor));
    }
  };

  const handleClick = (event: any) => {
    const { x: xBlock, y: yBlock } =
      event.currentTarget.getBoundingClientRect();

    const x = event.clientX - xBlock - size / 2;

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
      ...state,
      touched: true,
    });
  };

  const handleUp = () => {
    setState({
      ...state,
      touched: false,
    });
  };

  const handleMove = (event: any) => {
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

  const { cx, cy } = state;

  const rectX = props.size / 2 - 15;
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
      {centerRect ? renderRect({ color: state.color, x: rectX, y: rectY }) : ''}
      {renderHandle({
        onHandleDown: handleDown,
        handleRadius: handlerSize,
        cx,
        cy,
      })}
    </svg>
  );
};

const renderRect = ({ color: colorValue, x, y }: RenderReact) => (
  <rect x={x} y={y} height="30" width="30" fill={colorValue} />
);

const renderHandle = ({ onHandleDown, cx, cy, handleRadius }: RenderHandle) => (
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
