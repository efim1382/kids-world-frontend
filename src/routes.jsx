import React from 'react';
import PropTypes from 'prop-types';
import {
  Router,
  Route,
  IndexRoute,
  browserHistory,
} from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import Layout from './containers/Layout';
import Main from './containers/Main';
import AdvertDetail from './containers/Advert/Detail';

import { routes as authRoutes } from './containers/Auth';
import { routes as userRoutes } from './containers/User';
import { routes as profileRoutes } from './containers/Profile';

const Routes = ({ store }) => <Router history={syncHistoryWithStore(browserHistory, store)}>
  <Route path="/" component={Layout}>
    <IndexRoute component={Main} />
    <Route path="advert/:id" component={AdvertDetail} />
    {userRoutes()}
    {authRoutes()}
    {profileRoutes()}
  </Route>
</Router>;

Routes.propTypes = {
  store: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

export default Routes;
