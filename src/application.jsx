import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import createStore from 'store/createStore';

import Routes from './routes';

const initialState = window.___INITIAL_STATE__; // eslint-disable-line no-underscore-dangle
export const store = createStore(initialState); // eslint-disable-line import/prefer-default-export

render(
  <Provider store={store}>
    <Routes store={store} />
  </Provider>,

  document.getElementById('root'),
);
