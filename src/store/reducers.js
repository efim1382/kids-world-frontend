import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { api as authApi } from 'containers/Auth';
import { reducers as advertReducers } from 'containers/Profile/Adverts';
import userApi from 'containers/User/api';
import chatReducers from 'containers/Profile/Chat/reducers';
import { reducers as notificationReducer } from 'components/Notification';
import { reducers as confirmModalReducer } from 'components/ConfirmModal';
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
  confirmModal: confirmModalReducer,
  reviews: combineReducers({
    ...reviewsApi.reducers,
  }),
  chat: chatReducers,
  routing: routerReducer,
  ...asyncReducers,
});

export default makeRootReducer;
