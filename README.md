# React Circular Color picker [![npm](https://img.shields.io/npm/dt/react-circular-color.svg)](https://www.npmjs.com/package/react-circular-color)


A circular color picker component also named color-wheel performed with react and pure svg. Mobile compatible.

![circular color picker](/assets/wheel.png) ![circular color picker](/assets/wheel32.PNG)

# Installation

```bash
npm install react-circular-color
```

# Usage

```javascript
import React, { Component } from 'react';

import CircularColor from 'react-circular-color';


class ExampleComponent extends Component {
  handleColorChange(color) {
    console.log(color); // it will be string with a color hash e.g. #1c1c1c
  }

  render() {
    return (
      <CircularColor size={200} onChange={this.handleColorChange} />
    );
  }
}
```

# Props

| Name | Description |
| ---- | ----------- |
| `size` | Numeric size of the element in pixels. Default: `200` |
| `numberOfSectors` | Number of wheel's sectors. Default: `360` |
| `className` | Classes to apply to the svg element |
| `centerRect` | Whether to display central rectangle with picked color. Default: `false`. |
| `onChange` | Fired when the color is changing |

# Development

To run demo locally on localhost:8080:

```bash
npm install
npm start
```

# Test

To run test type:

```bash
npm run test
```