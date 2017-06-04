import React from 'react';
import {
  Router,
  Route,
  IndexRoute,
  browserHistory,
} from 'react-router';

import Layout from './containers/Layout';
import Main from './containers/Main';
import AdvertDetail from './containers/AdvertDetail';
import User from './containers/User';
import UserReviews from './containers/User/Reviews';
import Auth from './containers/Auth';
import Login from './containers/Auth/Login';
import Register from './containers/Auth/Register';
import Profile from './containers/Profile';
import ProfileSettings from './containers/Profile/Settings';

const Routes = () => <Router history={browserHistory} >
  <Route path="/" component={Layout}>
    <IndexRoute component={Main} />
    <Route path="advert/:id" component={AdvertDetail} />
    <Route path="user/:id" component={User} />
    <Route path="user/:id/reviews" component={UserReviews} />

    <Route path="auth" component={Auth}>
      <Route path="login" component={Login} />
      <Route path="register" component={Register} />
    </Route>

    <Route path="profile" component={Profile} />
    <Route path="profile/settings" component={ProfileSettings} />
  </Route>
</Router>;

export default Routes;
