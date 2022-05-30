"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var react_1 = require("react");
var sector_1 = require("./sector");
var hsvToRgb_1 = require("./hsvToRgb");
var rgbToHsv_1 = require("./rgbToHsv");
var CircularColor = function (props) {
    var _a;
    var size = props.size, numberOfSectors = props.numberOfSectors, className = props.className, onChange = props.onChange, centerRect = props.centerRect, renderRect = props.renderRect, renderHandle = props.renderHandle, color = props.color;
    var epsilon = 4;
    var handlerSize = Math.floor(((size / 2) * 0.3) / 2);
    var innerRadius = Math.floor((size / 2) * 0.6);
    var outerRadius = Math.floor((size / 2) * 0.9);
    var h = (_a = (0, rgbToHsv_1["default"])(color)) === null || _a === void 0 ? void 0 : _a.h;
    var _b = (0, react_1.useState)({
        touched: false,
        cx: Math.floor(size / 2 + (innerRadius + handlerSize) * Math.cos(h)),
        cy: Math.floor(size / 2 - (innerRadius + handlerSize) * Math.sin(h)),
        color: color
    }), state = _b[0], setState = _b[1];
    var preventScrolling = function (event) {
        var touched = state.touched;
        if (touched) {
            event.preventDefault();
        }
    };
    var renderSectors = function () {
        return Array(numberOfSectors)
            .fill(0)
            .map(function (sector, idx) {
            var startAngle = (((idx * Math.PI) / 180) * 360) / numberOfSectors;
            var endAngle = ((((idx + 1 === numberOfSectors ? 0 : idx + 1) * Math.PI) / 180) *
                360) /
                numberOfSectors;
            return (<sector_1["default"] key={idx} size={size} startAngle={-startAngle} endAngle={-endAngle} innerRadius={innerRadius} outerRadius={outerRadius}/>);
        });
    };
    (0, react_1.useEffect)(function () {
        window.addEventListener('touchmove', preventScrolling, {
            passive: false
        });
        return window.removeEventListener('touchmove', preventScrolling);
    }, []);
    var updateHandlerPosition = function (angle) {
        var innerColor = angle <= 0
            ? (-angle * 180) / Math.PI
            : ((2 * Math.PI - angle) * 180) / Math.PI;
        setState(__assign(__assign({}, state), { cx: Math.floor(size / 2 + (innerRadius + handlerSize) * Math.cos(angle)), cy: Math.floor(size / 2 - (innerRadius + handlerSize) * Math.sin(angle)), color: (0, hsvToRgb_1["default"])(innerColor) }));
        if (typeof onChange === 'function') {
            onChange((0, hsvToRgb_1["default"])(innerColor));
        }
    };
    var handleClick = function (event) {
        var _a = event.currentTarget.getBoundingClientRect(), xBlock = _a.x, yBlock = _a.y;
        var x = event.clientX - xBlock - size / 2;
        var y = event.clientY - yBlock - size / 2;
        var angle = -Math.atan2(y, x);
        var outX = Math.abs(Math.floor(outerRadius * Math.cos(angle)));
        var outY = Math.abs(Math.floor(outerRadius * Math.sin(angle)));
        var inX = Math.abs(Math.floor(innerRadius * Math.cos(angle)));
        var inY = Math.abs(Math.floor(innerRadius * Math.sin(angle)));
        if ((Math.abs(x) >= inX - epsilon && Math.abs(x) <= outX + epsilon) ||
            (Math.abs(y) >= inY - epsilon && Math.abs(y) <= outY + epsilon)) {
            updateHandlerPosition(angle);
        }
    };
    var handleDown = function () {
        setState(__assign(__assign({}, state), { touched: true }));
    };
    var handleUp = function () {
        setState(__assign(__assign({}, state), { touched: false }));
    };
    var handleMove = function (event) {
        var touched = state.touched;
        if (touched) {
            var _a = event.currentTarget.getBoundingClientRect(), xBlock = _a.x, yBlock = _a.y;
            var evt = event.type === 'touchmove'
                ? event.touches[0] || event.changedTouches[0]
                : event;
            var x = evt.clientX - xBlock - size / 2;
            var y = evt.clientY - yBlock - size / 2;
            var angle = -Math.atan2(y, x);
            updateHandlerPosition(angle);
        }
    };
    var cx = state.cx, cy = state.cy;
    var rectX = props.size / 2 - 15;
    var rectY = props.size / 2 - 15;
    return (<svg className={className} width={size} height={size} onMouseMove={handleMove} onMouseUp={handleUp} onTouchEnd={handleUp} onTouchMove={handleMove} onClick={handleClick}>
      {renderSectors()}
      {centerRect ? renderRect({ color: state.color, x: rectX, y: rectY }) : ''}
      {renderHandle({
            onHandleDown: handleDown,
            handleRadius: handlerSize,
            cx: cx,
            cy: cy
        })}
    </svg>);
};
var renderRect = function (_a) {
    var colorValue = _a.color, x = _a.x, y = _a.y;
    return (<rect x={x} y={y} height="30" width="30" fill={colorValue}/>);
};
var renderHandle = function (_a) {
    var onHandleDown = _a.onHandleDown, cx = _a.cx, cy = _a.cy, handleRadius = _a.handleRadius;
    return (<circle onMouseDown={onHandleDown} onTouchStart={onHandleDown} cx={cx} cy={cy} r={handleRadius} fill="transparent" stroke="#363636" strokeWidth="5"/>);
};
CircularColor.defaultProps = {
    size: 200,
    numberOfSectors: 360,
    centerRect: false,
    color: '#f2ff00',
    className: '',
    onChange: function () { },
    renderRect: renderRect,
    renderHandle: renderHandle
};
exports["default"] = CircularColor;
