import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { reducers as advertsReducer } from 'containers/Advert';
import { api as authApi } from 'containers/Auth';

export const makeRootReducer = asyncReducers => combineReducers({
  auth: combineReducers({
    ...authApi.reducers,
  }),
  adverts: advertsReducer,
  routing: routerReducer,
  ...asyncReducers,
});

export default makeRootReducer;
