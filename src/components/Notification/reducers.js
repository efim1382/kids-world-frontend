import { SHOW_NOTIFICATION, HIDE_NOTIFICATION } from './constants';

const initialState = {
  isShown: false,
  message: '',
};

const notificationReducer = (state = initialState, action) => {
  if (action.type === SHOW_NOTIFICATION) {
    return {
      isShown: true,
      message: action.message,
    };
  }

  if (action.type === HIDE_NOTIFICATION) {
    return {
      ...state,
      isShown: false,
    };
  }

  return state;
};

export default notificationReducer;
