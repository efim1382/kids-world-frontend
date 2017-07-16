import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import Profile from './';
import Settings from './Settings';
import Adverts from './Adverts';
import AddAdvert from './AddAdvert';
import EditAdvert from './EditAdvert';

export default () => <Route path="profile" component={Profile}>
  <IndexRedirect to="adverts" />
  <Route path="adverts" component={Adverts} />
  <Route path="settings" component={Settings} />
  <Route path="advert/add" component={AddAdvert} />
  <Route path="advert/edit/:id" component={EditAdvert} />
</Route>;
