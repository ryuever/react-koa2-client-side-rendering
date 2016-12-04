import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import prefixer from '../utils/prefixer';
import { Icon } from 'react-eva';

export default class ProgressCircle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      percent   : 0,
      exception : false,
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
    const { size, children } = this.props;
    const { percent, exception } = this.state;
    const cs = cx({ 'progress-text-active': !exception && percent !== 0 });
    let content;

    if (children) {
      content = children;
    } else if (exception) {
      content = <Icon name="cross" />;
    } else if (percent === 100) {
      content = <Icon name="check" />;
    } else if (size !== 'xs') {
      content = `${percent}%`;
    }

    return (
      <div className="progress-info-container">
        <span className={cs}>
          {content}
        </span>
      </div>
    );
  }

  render() {
    const { showInfo, size, prefix } = this.props;
    const { exception, percent } = this.state;

    const prefixCs = prefixer('progress-circle', prefix);
    const cs = cx(prefixCs, {
      'progress-circle-error': exception,
      [`progress-circle-${size}`]: size,
    });

    const rotateDegR = 45 + (percent < 50 ? 3.6 * percent : 180);
    const rotateDegL = 45 + (percent > 50 ? 3.6 * (percent - 50) : 0);

    const hideCircle = size === 'xs' && (percent === 100 || exception);

    return (
      <div className={cs}>
        {showInfo ? this.renderInfo() : null}
        {!hideCircle ? (
          <div className="progress-circle-container">
            <div className="half-container">
              <div className="circle-left"
                style={{ transform: `rotate(${rotateDegL}deg)` }}>
              </div>
            </div>
            <div className="half-container">
              <div className="circle-right"
                style={{
                  transform: `translateX(-50%) rotate(${rotateDegR}deg)`,
                }}>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

ProgressCircle.defaultProps = {
  percent  : 0,
  showInfo : true,
};

ProgressCircle.propType = {
  percent   : PropTypes.number.required,
  showInfo  : PropTypes.bool,
  exception : PropTypes.bool,
  size      : PropTypes.oneOf(['xs', 'sm', 'lg']),
  prefix    : PropTypes.string,
  style     : PropTypes['object'],
};
