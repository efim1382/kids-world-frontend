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
import Auth from './containers/Auth';
import Login from './containers/Auth/Login';
import Register from './containers/Auth/Register';
import Profile from './containers/Profile';
import ProfileSettings from './containers/Profile/Settings';
import AddAdvert from './containers/Advert/Add';
import EditAdvert from './containers/Advert/Edit';

import { routes as userRoutes } from './containers/User';

const Routes = ({ store }) => <Router history={syncHistoryWithStore(browserHistory, store)}>
  <Route path="/" component={Layout}>
    <IndexRoute component={Main} />
    <Route path="advert/:id" component={AdvertDetail} />
    {userRoutes(store)}

    <Route path="auth" component={Auth}>
      <Route path="login" component={Login} />
      <Route path="register" component={Register} />
    </Route>

    <Route path="profile" component={Profile} />
    <Route path="profile/settings" component={ProfileSettings} />
    <Route path="profile/advert/add" component={AddAdvert} />
    <Route path="profile/advert/edit/:id" component={EditAdvert} />
  </Route>
</Router>;

Routes.propTypes = {
  store: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

export default Routes;
