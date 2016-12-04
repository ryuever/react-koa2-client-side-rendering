import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import prefixer from '../utils/prefixer';

export default class Steps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 1,
    };
  }

  render() {
    const { prefix, direction, children } = this.props;

    let cs = prefixer('steps', prefix);
    cs = cx(cs, {
      vertical: direction === 'y',
    });

    return (
      <div className={cs}>
        <ol className="steps-list">
          {React.Children.map(children, (child, i) => {
            const np = { number: i + 1 };
            return React.cloneElement(child, np);
          })}
        </ol>
      </div>
    );
  }
}

Steps.defaultProps = {
  direction: 'x',
  prefix   : '',
};

Steps.propTypes = {
  prefix   : PropTypes.string,
  direction: PropTypes.oneOf(['x', 'y']),
};
