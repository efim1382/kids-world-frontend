import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { api as authApi } from 'containers/Auth';
import { reducers as advertReducers } from 'containers/Profile/Adverts';
import userApi from 'containers/User/api';
import chatApi from 'containers/Profile/Chat/api';
import { reducers as notificationReducer } from 'components/Notification';
import reviewsApi from './reviews';

export const makeRootReducer = asyncReducers => combineReducers({
  auth: combineReducers({
    ...authApi.reducers,
  }),
  users: combineReducers({
    ...userApi.reducers,
  }),
  adverts: advertReducers,
  notification: notificationReducer,
  reviews: combineReducers({
    ...reviewsApi.reducers,
  }),
  chat: combineReducers({
    ...chatApi.reducers,
  }),
  routing: routerReducer,
  ...asyncReducers,
});

export default makeRootReducer;
