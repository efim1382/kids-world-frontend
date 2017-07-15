import { AUTH_SET_TOKEN, AUTH_RESET_TOKEN } from './constants';

export const setToken = token => (dispatch) => {
  const payload = {
    key: token,
  };

  dispatch({
    type: AUTH_SET_TOKEN,
    payload,
  });

  localStorage.setItem('token', JSON.stringify(payload));
};

export const resetToken = () => (dispatch) => {
  dispatch({
    type: AUTH_RESET_TOKEN,
  });

  localStorage.removeItem('token');
};
