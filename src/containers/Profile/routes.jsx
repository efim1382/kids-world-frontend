import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import Profile from './';
import Adverts from './Adverts';

export default () => <Route path="profile" component={Profile}>
  <IndexRedirect to="adverts" />
  <Route path="adverts" component={Adverts} />
</Route>;
