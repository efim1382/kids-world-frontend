import React from 'react';
import { Route } from 'react-router';
import Auth from './';
import Register from './Register';

export default () => <Route path="auth" component={Auth}>
  <Route path="register" component={Register} />
</Route>;
