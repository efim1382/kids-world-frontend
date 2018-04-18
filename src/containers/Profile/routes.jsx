import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import { replace } from 'react-router-redux';
import Profile from './';
import Adverts from './Adverts/List';
import AddAdvert from './Adverts/Add';
import EditAdvert from './Adverts/Edit';
import Favorites from './Adverts/Favorites';
import Reviews from './Reviews';
import Chat from './Chat/Index';
import Messages from './Chat/Messages';
import Settings from './Settings';

const Routes = store => <Route
  path="profile"
  component={Profile}

  onEnter={() => {
    if (!localStorage.getItem('id')) {
      store.dispatch(replace('/profile'));
    }
  }
}>
  <IndexRedirect to="adverts" />
  <Route path="adverts" component={Adverts} />
  <Route path="adverts/add" component={AddAdvert} />
  <Route path="adverts/:id/edit" component={EditAdvert} />
  <Route path="favorites" component={Favorites} />
  <Route path="reviews" component={Reviews} />
  <Route path="settings" component={Settings} />
  <Route path="chat" component={Chat} />
  <Route path="chat/:id" component={Messages} />
</Route>;

export default Routes;
