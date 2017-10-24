import { AUTH_SET_TOKEN, AUTH_RESET_TOKEN } from './constants';

const initialTokenState = JSON.parse(localStorage.getItem('token') || '{}');

const tokenReducer = (state = initialTokenState, action) => {
  switch (action.type) {
    case AUTH_SET_TOKEN:
      return action.payload;
    case AUTH_RESET_TOKEN:
      return {};
    default:
      return state;
  }
};

export default tokenReducer;
