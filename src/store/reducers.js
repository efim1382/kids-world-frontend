import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { api as authApi } from 'containers/Auth';
import advertApi from 'containers/Profile/Adverts/api';
import userApi from 'containers/User/api';
import { reducers as notificationReducer } from 'components/Notification';
import reviewsApi from './reviews';

export const makeRootReducer = asyncReducers => combineReducers({
  auth: combineReducers({
    ...authApi.reducers,
  }),
  users: combineReducers({
    ...userApi.reducers,
  }),
  adverts: combineReducers({
    ...advertApi.reducers,
  }),
  notification: notificationReducer,
  reviews: combineReducers({
    ...reviewsApi.reducers,
  }),
  routing: routerReducer,
  ...asyncReducers,
});

export default makeRootReducer;
