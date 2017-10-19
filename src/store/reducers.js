import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { api as authApi } from 'containers/Auth';

export const makeRootReducer = asyncReducers => combineReducers({
  auth: {
    ...authApi.reducers,
  },
  routing: routerReducer,
  ...asyncReducers,
});

export default makeRootReducer;
