import React, { Component } from 'react';
import ColorPicker from '../../src';

export default class CustomizedRect extends Component {

    renderRect = ({ color, x, y }) => {
        return (
            <circle
                cx={x + 14}
                cy={y + 14}
                r="14"
                fill={color}
            />
        );
    }

    render() {
        return (
            <ColorPicker
                renderRect={this.renderRect}
                centerRect={true}
            />
        );
    }
}