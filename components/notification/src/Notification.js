import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import Notice from './Notice';
import * as actions from '../actions';

import '../assets/styles.css';

const Notification = ({
  notifications,
  transitionName,
  transitionEnterTimeout,
  transitionLeaveTimeout,
  ...rest
}) => (
  <div className="notifications">
    <CSSTransitionGroup
      transitionName={`notification-${transitionName}`}
      transitionEnterTimeout={transitionEnterTimeout}
      transitionLeaveTimeout={transitionLeaveTimeout}>
      {notifications.map(noti =>
        <Notice key={noti.tag} {...noti} {...rest} />
      )}
    </CSSTransitionGroup>
  </div>
);

Notification.propTypes = {
  transitionName: PropTypes.string,
  transitionEnterTimeout: PropTypes.number,
  transitionLeaveTimeout: PropTypes.number,
};

Notification.defaultProps = {
  transitionName: 'fade',
  transitionEnterTimeout: 500,
  transitionLeaveTimeout: 350,
};

export default connect(
  state => state.notifications,
  dispatch => bindActionCreators(actions, dispatch)
)(Notification);
