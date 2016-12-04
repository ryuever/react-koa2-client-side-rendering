import { createAction } from 'redux-actions';

// Show an new notification
export const showNotification = createAction('SHOW_NOTIFICATION');
export const notify = (title, options = {}) => dispatch => {
  const tag = options.tag || Date.now();
  dispatch(showNotification({ title, ...options, tag }));
};

// Close the notification
export const close = createAction('CLOSE_NOTIFICATION');

// Clear all notifications
export const clear = createAction('CLEAR_NOTIFICATIONS');
