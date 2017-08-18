import React, { PropTypes } from 'react';
import Raphael from 'raphael';

export default class Paper extends React.Component {
  componentDidMount() {
    const { size } = this.props;
    this._paper = Raphael(this.wrapper, size, size);
  }

  componentDidUpdate() {
    const { size } = this.props;
    this._paper.setSize(size, size);
  }

  componentWillUnmount() {
    this._paper.remove();
  }

  get paper() {
    return this._paper || null;
  }

  render() {
    return (
      <div ref={div => { this.wrapper = div; }}>
        {this.paper && React.Children.map(this.props.children,
          child => React.cloneElement(child, {
            paper: this.paper
          })
        )}
      </div>
    );
  }
}

Paper.propTypes = {
  size: PropTypes.number
}

Paper.defaultProps = {
  size: 200
}