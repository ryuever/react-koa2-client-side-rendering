import { handleActions } from 'redux-actions';
import * as actions from './actions';

const initialState = {
  notifications: [],
};

const showNotification = (state, { payload }) => {
  const noties = [...state.notifications];
  const renotify = noties.filter(noti => noti.tag === payload.tag);

  return {
    ...state,
    notifications: renotify.length ? noties : [...noties, payload],
  };
};

const closeNotification = (state, { payload }) => ({
  ...state,
  notifications: [...state.notifications].filter(noti =>
    noti.tag !== payload
  ),
});

const clearNotifications = (state) => ({
  ...state,
  notifications: [],
});

export default handleActions({
  [actions.showNotification]: showNotification,
  [actions.close]: closeNotification,
  [actions.clear]: clearNotifications,
}, initialState);
