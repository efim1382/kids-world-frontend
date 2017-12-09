import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { api as authApi } from 'containers/Auth';
import { api as advertsApi } from 'containers/Profile/Adverts';

export const makeRootReducer = asyncReducers => combineReducers({
  auth: {
    ...authApi.reducers,
  },
  adverts: {
    ...advertsApi.reducers,
  },
  routing: routerReducer,
  ...asyncReducers,
});

export default makeRootReducer;
