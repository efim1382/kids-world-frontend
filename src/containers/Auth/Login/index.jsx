import React from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';

import {
  Form,
  Field,
  Button,
} from 'components';

import api from 'containers/Auth/api';
import { setToken } from 'containers/Auth/actions';

import authStyles from 'containers/Auth/style.css';

const sendHandler = ({ dispatch }) => data => (
  dispatch(api.actions.login({}, {
    body: JSON.stringify(data),
  })).then((resp) => {
    dispatch(setToken(resp.token));
    dispatch(replace('/profile'));

    return resp;
  })
);

const Login = ({ send }) => <div>
  <h2 className={authStyles.title}>Авторизация</h2>

  <Form className={authStyles.form} model="login" onSubmit={send}>
    <Field
      type="email"
      model=".email"
      placeholder="Эл. почта"
    />

    <Field
      type="password"
      model=".password"
      placeholder="Пароль"
    />

    <Button
      type="primary"
      caption="Войти"
      className={authStyles.button}
    />
  </Form>
</div>;

Login.propTypes = {
  send: PropTypes.func.isRequired,
};

export default compose(
  connect(),
  withHandlers({
    send: sendHandler,
  }),
)(Login);
