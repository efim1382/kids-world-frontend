import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import createStore from 'store/createStore';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Theme from './theme';

import Routes from './routes';

const initialState = window.___INITIAL_STATE__; // eslint-disable-line no-underscore-dangle
export const store = createStore(initialState); // eslint-disable-line import/prefer-default-export

render(
  <MuiThemeProvider muiTheme={Theme}>
    <Provider store={store}>
      <Routes store={store} />
    </Provider>
  </MuiThemeProvider>,

  document.getElementById('root'),
);
