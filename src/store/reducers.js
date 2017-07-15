import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { reducers as advertsReducer } from 'containers/Advert';
import {
  reducers as tokenReducer,
  reducers as usersReducer,
  api as authApi,
} from 'containers/Auth';

export const makeRootReducer = asyncReducers => combineReducers({
  auth: combineReducers({
    token: tokenReducer,
    ...authApi.reducers,
  }),
  users: usersReducer,
  adverts: advertsReducer,
  routing: routerReducer,
  ...asyncReducers,
});

export default makeRootReducer;
