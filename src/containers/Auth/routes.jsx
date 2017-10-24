import React from 'react';
import { Route } from 'react-router';
import Auth from './';
import Login from './Login';
import Register from './Register';

export default () => <Route path="auth" component={Auth}>
  <Route path="login" component={Login} />
  <Route path="register" component={Register} />
</Route>;
