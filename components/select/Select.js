import React, { Component, PropTypes } from 'react';
import prefixer from 'react-eva/utils/prefixer';
import cx from 'classnames';

class Select extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { prefix, className } = this.props;
    const prefixCls = prefixer('select', prefix);
    const classes = cx(prefixCls, className);
    return (
      <div className={classes}>
      </div>
    );
  }
}

Select.defaultProps = {
  prefix: '',
};

Select.propTypes = {
  prefix: PropTypes.string,
};
