import React from 'react';
import PropTypes from 'prop-types';
import Raphael from 'raphael';

export default class Circle extends React.Component {
  componentWillMount() {
    console.log("parent:", this.props.paper);
  }

  render() {
    return null;
  }
}

Circle.propTypes = {
  paper: PropTypes.element.isRequired,
  attr: PropTypes.object,
  drag: PropTypes.object,
  update: PropTypes.func,
};