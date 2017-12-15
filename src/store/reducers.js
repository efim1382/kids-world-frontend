import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import {
  reducers as tokenReducer,
  api as authApi,
} from 'containers/Auth';

import { api as userApi } from 'containers/User';
import { reducers as advertsReducer } from 'containers/Profile/Adverts';

export const makeRootReducer = asyncReducers => combineReducers({
  auth: combineReducers({
    token: tokenReducer,
    ...authApi.reducers,
  }),
  users: {
    ...userApi.reducers,
  },
  adverts: advertsReducer,
  routing: routerReducer,
  ...asyncReducers,
});

export default makeRootReducer;
