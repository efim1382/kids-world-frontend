import _ from 'lodash';
import { combineReducers } from 'redux';
import api from './api';

const initialState = {
  filtered: [],
  full: [],
};

const chatsReducer = (state = initialState, action) => {
  if (action.type === 'FILTER_CHATS') {
    return {
      ...state,
      filtered: _.filter(state.full, chat => chat.name.match(action.text)),
    };
  }

  if (action.type === api.events.getUserChats.actionSuccess) {
    return {
      filtered: action.data.chats,
      full: action.data.chats,
    };
  }

  return state;
};

export default combineReducers({
  list: chatsReducer,
  ...api.reducers,
});
