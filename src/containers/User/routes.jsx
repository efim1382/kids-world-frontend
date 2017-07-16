import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import User from './';
import Review from './Reviews';
import Adverts from './Adverts';

export default () => <Route path="user/:id" component={User}>
  <IndexRedirect to="adverts" />
  <Route path="adverts" component={Adverts} />
  <Route path="reviews" component={Review} />
</Route>;
