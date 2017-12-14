import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { api as authApi } from 'containers/Auth';
import { reducers as advertsReducer } from 'containers/Profile/Adverts';

export const makeRootReducer = asyncReducers => combineReducers({
  auth: {
    ...authApi.reducers,
  },
  adverts: advertsReducer,
  routing: routerReducer,
  ...asyncReducers,
});

export default makeRootReducer;
