import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import Profile from './';
import Adverts from './Adverts';
import Settings from './Settings';

export default () => <Route path="profile" component={Profile}>
  <IndexRedirect to="adverts" />
  <Route path="adverts" component={Adverts} />
  <Route path="settings" component={Settings} />
</Route>;
