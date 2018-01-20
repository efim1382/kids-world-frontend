import { SHOW_NOTIFICATION, HIDE_NOTIFICATION } from './constants';

export const showNotification = message => (dispatch) => {
  dispatch({
    type: SHOW_NOTIFICATION,
    message,
  });
};

export const hideNotification = () => (dispatch) => {
  dispatch({
    type: HIDE_NOTIFICATION,
  });
};
