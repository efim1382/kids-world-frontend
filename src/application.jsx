import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import {
  Router,
  Route,
  IndexRoute,
  browserHistory,
} from 'react-router';

import Layout from './containers/Layout';
import Main from './containers/Main';
import AdvertDetail from './containers/AdvertDetail';
import UserProfile from './containers/UserProfile';
import UserProfileReviews from './containers/UserProfile/Reviews';

render(
  <Provider>
    <Router history={browserHistory} >
      <Route path="/" component={Layout}>
        <IndexRoute component={Main} />
        <Route path="/advert/:id" component={AdvertDetail} />
        <Route path="/user/:id" component={UserProfile} />
        <Route path="/user/:id/reviews" component={UserProfileReviews} />
      </Route>
    </Router>
  </Provider>,

  document.getElementById('root'),
);
