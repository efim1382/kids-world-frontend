import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import Profile from './';
import Adverts from './Adverts/List';
import AddAdvert from './Adverts/Add';
import EditAdvert from './Adverts/Edit';
import Favorites from './Adverts/Favorites';
import Reviews from './Reviews';
import Chat from './Chat/Index';
import Messages from './Chat/Messages';
import Settings from './Settings';

export default () => <Route path="profile" component={Profile}>
  <IndexRedirect to="adverts" />
  <Route path="adverts" component={Adverts} />
  <Route path="adverts/add" component={AddAdvert} />
  <Route path="adverts/:id/edit" component={EditAdvert} />
  <Route path="favorites" component={Favorites} />
  <Route path="reviews" component={Reviews} />
  <Route path="chat" component={Chat} />
  <Route path="chat/:id" component={Messages} />
  <Route path="settings" component={Settings} />
</Route>;
