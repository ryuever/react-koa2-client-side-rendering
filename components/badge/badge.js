import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import prefixer from '../utils/prefixer';

export default class Badge extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { prefix, children, count, maxShowCount, dot } = this.props;
    const prefixCs = prefixer('badge', prefix);
    const cs = cx(prefixCs, {
      'badge-dot': dot && count > 0,
    });

    return (
      <span className={cs}>
        {children}
        {!dot && count > 0 ? (
          <sup className="badge-number">
            {count > maxShowCount ? `${maxShowCount}+` : count}
          </sup>
        ) : null}
      </span>
    );
  }
}

Badge.defaultProps = {
  maxShowCount: 99,
  count       : 0,
  dot         : false,
};

Badge.propTypes = {
  maxShowCount: PropTypes.number,
  count       : PropTypes.number,
  dot         : PropTypes.bool,
};
