import React from 'react';
import PropTypes from 'prop-types';
import Raphael from 'raphael';

export default class Element extends React.Component {
  componentWillMount() {
    console.log("parent:", this.props.paper);
  }

  render() {
    return null;
  }
}

Element.propTypes = {
  attr: PropTypes.object,
  drag: PropTypes.object,
  update: PropTypes.func,
};