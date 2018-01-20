import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import { Form, Field, Button } from 'components';
import { showNotification } from 'components/Notification/actions';
import api from '../api';
import styles from './style.css';

class Login extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  sendHandler = (data) => {
    const { dispatch } = this.props;

    dispatch(api.actions.login({}, {
      body: JSON.stringify(data),
    })).then((response) => {
      if (response.status !== 200) {
        dispatch(showNotification(response.message));
        return;
      }

      localStorage.setItem('id', response.user.id);
      localStorage.setItem('token', response.user.token);
      dispatch(replace('/'));
    });
  };

  render() {
    return <div className={styles.login}>
      <span className={styles.title}>Авторизация</span>

      <Form className={styles.form} model="login" onSubmit={this.sendHandler}>
        <Field
          caption="E-Mail"
          type="email"
          model=".email"
        />

        <Field
          caption="Пароль"
          type="password"
          model=".password"
        />

        <Button
          type="submit"
          appearance="primary"
          caption="Войти"
          className={styles.buttonSubmit}
        />
      </Form>
    </div>;
  }
}

export default connect()(Login);
