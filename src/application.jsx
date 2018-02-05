import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import createStore from 'store/createStore';
import { SocketProvider } from 'socket.io-react';
import io from 'socket.io-client';
import Routes from './routes';

const socket = io.connect('localhost:8000');

const initialState = window.___INITIAL_STATE__; // eslint-disable-line no-underscore-dangle
export const store = createStore(initialState); // eslint-disable-line import/prefer-default-export

render(
  <SocketProvider socket={socket}>
    <Provider store={store}>
      <Routes store={store} />
    </Provider>
  </SocketProvider>,

  document.getElementById('root'),
);
