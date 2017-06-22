import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { reducers as advertsReducer } from 'containers/Advert';

export const makeRootReducer = asyncReducers => combineReducers({
  adverts: advertsReducer,
  routing: routerReducer,
  ...asyncReducers,
});

export default makeRootReducer;
