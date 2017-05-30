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

render(
  <Provider>
    <Router history={browserHistory} >
      <Route path="/" component={Layout}>
        <IndexRoute component={Main} />
        <Route path="/advert/:id" component={AdvertDetail} />
      </Route>
    </Router>
  </Provider>,

  document.getElementById('root'),
);
