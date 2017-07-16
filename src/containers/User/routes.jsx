import React from 'react';
import { Route } from 'react-router';
import User from './';
import Review from './Reviews';
import Adverts from './Adverts';

export default () => <Route path="user/:id" component={User}>
  <Route path="adverts" component={Adverts} />
  <Route path="reviews" component={Review} />
</Route>;
