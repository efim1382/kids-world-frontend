import mergeReducers from 'helpers/mergeReducers';
import api from './api';

const initialState = {
  list: [],
};

export const advertsReducer = (state = initialState, action) => {
  if (action.type === api.events.getAdverts.actionSuccess) {
    return {
      ...state,
      list: action.data.adverts,
    };
  }

  if (action.type === api.events.getAdvertsLogged.actionSuccess) {
    return {
      ...state,
      list: action.data.adverts,
    };
  }

  return state;
};

export default mergeReducers(initialState, api, advertsReducer);
