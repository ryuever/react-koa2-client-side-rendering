import React, { Component, PropTypes } from 'react';
import classes from 'classnames';
import prefixer from 'react-eva/utils/prefixer';

export default class TabPanel extends Component {
  render() {
    const { prefix, active, children } = this.props;
    const className = classes(prefixer('tab-panel', prefix), { active });
    return (
      <div className={className}>
        {children}
      </div>
    );
  }
}

TabPanel.propTypes = {
  prefix: PropTypes.string,
  active: PropTypes.bool,
};
