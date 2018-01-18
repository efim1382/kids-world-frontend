import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import { Form, Field, Button, Notification } from 'components';
import api from '../api';
import styles from './style.css';

class Login extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  state = {
    notificationShown: false,
    notificationMessage: '',
  };

  sendHandler = (data) => {
    const { dispatch } = this.props;

    dispatch(api.actions.login({}, {
      body: JSON.stringify(data),
    })).then((response) => {
      if (response.status !== 200) {
        this.setState({
          notificationMessage: response.message,
          notificationShown: true,
        });

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

      <Notification
        show={this.state.notificationShown}
        message={this.state.notificationMessage}

        onRequestClose={() => {
          this.setState({
            notificationMessage: '',
            notificationShown: false,
          });
        }}
      />
    </div>;
  }
}

export default connect()(Login);
