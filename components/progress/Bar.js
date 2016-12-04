import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import prefixer from '../utils/prefixer';
import { Icon } from 'react-eva';

export default class ProgressBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      percent  : 0,
      exception: false,
    };
  }

  componentWillMount() {
    this.updateState(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.updateState(nextProps);
  }

  updateState({ percent, exception }) {
    this.setState({
      percent,
      exception,
    });
  }

  renderInfo() {
    const { children } = this.props;
    const { percent, exception } = this.state;
    const cs = cx('bar-info', {
      'progress-text-active': !exception && percent !== 0,
    });
    let content;

    if (children) {
      content = children;
    } else if (exception) {
      content = <Icon name="cross" />;
    } else if (percent === 100) {
      content = <Icon name="check" />;
    } else {
      content = `${percent}%`;
    }

    return (
      <span className={cs}>
        {content}
      </span>
    );
  }

  render() {
    const { prefix, size, showInfo } = this.props;
    const { exception, percent } = this.state;

    const prefixCs = prefixer('progress-bar', prefix);
    const cs = cx(prefixCs, {
      'progress-bar-error': exception,
      [`progress-bar-${size}`]: size,
    });

    return (
      <div className={cs}>
        {showInfo ? this.renderInfo() : null}
        <div className="bar-under">
          <div className="bar-above"
            style={{ width: `${percent}%` }}>
            {percent > 0 && percent < 100
              ? <div className="move-light" />
              : null
            }
          </div>
        </div>
      </div>
    );
  }
}

ProgressBar.defaultProps = {
  percent  : 0,
  showInfo : true,
};

ProgressBar.propType = {
  percent  : PropTypes.number.required,
  showInfo : PropTypes.bool,
  exception: PropTypes.bool,
  size     : PropTypes.oneOf(['xs', 'sm', 'lg']),
  prefix   : PropTypes.string,
  style    : PropTypes['object'],
};
