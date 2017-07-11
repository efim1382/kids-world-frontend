import React from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';
import Form from 'components/Form/Form';
import Field from 'components/Form/Field';
import Button from 'components/Button';

import api from 'containers/Auth/api';

import authStyles from 'containers/Auth/style.css';

const sendHandler = ({ dispatch }) => data => (
  dispatch(api.actions.register({}, {
    body: JSON.stringify(data),
  }))
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
