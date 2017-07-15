import mergeReducers from 'helpers/mergeReducers';
import { AUTH_SET_TOKEN, AUTH_RESET_TOKEN } from './constants';
import api from './api';

const initialTokenState = JSON.parse(localStorage.getItem('token') || '{}');

export const tokenReducer = (state = initialTokenState, action) => {
  switch (action.type) {
    case AUTH_SET_TOKEN:
      return action.payload;
    case AUTH_RESET_TOKEN:
      return {};
    default:
      return state;
  }
};

const initialState = {
  list: [],
};

const usersReducer = (state = initialState, action) => {
  if (action.type === api.events.getUsers.actionSuccess) {
    return {
      ...state,
      list: action.data.data,
    };
  }

  return state;
};

export default mergeReducers(initialState, api, usersReducer);
