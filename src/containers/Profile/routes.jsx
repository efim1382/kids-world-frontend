import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import Profile from './';
import Adverts from './Adverts/List';
import AddAdvert from './Adverts/Add';
import EditAdvert from './Adverts/Edit';
import Settings from './Settings';

export default () => <Route path="profile" component={Profile}>
  <IndexRedirect to="adverts" />
  <Route path="adverts" component={Adverts} />
  <Route path="adverts/add" component={AddAdvert} />
  <Route path="adverts/:id/edit" component={EditAdvert} />

  <Route path="settings" component={Settings} />
</Route>;
