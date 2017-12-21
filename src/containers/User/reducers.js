import mergeReducers from 'helpers/mergeReducers';
import api from './api';

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
