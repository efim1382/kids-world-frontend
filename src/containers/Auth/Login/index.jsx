import React from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import { Form, Field, Button } from 'components';
import api from '../api';
import { setToken } from '../actions';
import styles from './style.css';

const sendHandler = ({ dispatch }) => (data) => {
  dispatch(api.actions.login({}, {
    body: JSON.stringify(data),
  })).then((response) => {
    if (response.status !== 200) {
      return;
    }

    dispatch(setToken(response.token));
    dispatch(replace('/'));
  });
};

const Login = ({ send }) => <div className={styles.login}>
  <span className={styles.title}>Авторизация</span>

  <Form className={styles.form} model="login" onSubmit={send}>
    <Field
      caption="E-Mail"
      type="email"
      model=".email"
      isValidate
    />

    <Field
      caption="Пароль"
      type="password"
      model=".password"
      isValidate
    />

    <Button
      type="submit"
      appearance="primary"
      caption="Войти"
      className={styles.buttonSubmit}
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
