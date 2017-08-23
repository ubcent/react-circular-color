import React, { PropTypes } from 'react';
import Raphael from 'raphael';

export default class Paper extends React.Component {
  componentDidMount() {
    const { size } = this.props;
    this.paperElement = Raphael(this.wrapper, size, size);
  }

  componentDidUpdate() {
    const { size } = this.props;
    this.paperElement.setSize(size, size);
  }

  componentWillUnmount() {
    this.paperElement.remove();
  }

  get paper() {
    return this.paperElement || null;
  }

  render() {
    return (
      <div ref={(div) => { this.wrapper = div; }}>
        {this.paper && React.Children.map(this.props.children,
          child => React.cloneElement(child, {
            paper: this.paper,
          })
        )}
      </div>
    );
  }
}

Paper.propTypes = {
  size: PropTypes.number,
  children: PropTypes.children.isRequired,
};

Paper.defaultProps = {
  size: 200,
};
