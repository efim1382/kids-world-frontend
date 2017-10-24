import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';

import { Form, Input } from 'components';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

import api from '../api';
import { setToken } from '../actions';

import styles from './style.css';

class Login extends Component {
  state = {
    snackbar: {
      showed: false,
      message: '',
    },
    errorMessages: {
      email: '',
      password: '',
    },
  };

  isFormHasErrors = () => {
    const keys = Object.keys(this.state.errorMessages);
    let isError = false;

    for (let i = 0; i < keys.length; i++) {
      if (this.state.errorMessages[keys[i]]) {
        isError = true;
      }
    }

    return isError;
  };

  sendHandler = (data) => {
    const hasErrors = this.isFormHasErrors();

    if (hasErrors) {
      this.showSnackbar('Заполните все поля');
      return;
    }

    const { dispatch } = this.props;

    dispatch(api.actions.login({}, {
      body: JSON.stringify(data),
    })).then((response) => {
      if (response.status !== 200) {
        this.showSnackbar(response.message);
        return;
      }

      dispatch(setToken(response.token));
      dispatch(replace('/'));
    });
  };

  showSnackbar = (message) => {
    this.setState({
      snackbar: {
        showed: true,
        message,
      },
    });
  };

  handleSnackbarClose = () => {
    this.setState({
      snackbar: {
        showed: false,
        message: '',
      },
    });
  };

  handleEmailChange = (event) => {
    // eslint-disable-next-line no-useless-escape
    const reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const value = event.target.value;
    const isValid = reg.test(value);

    this.setState({
      errorMessages: {
        ...this.state.errorMessages,
        email: (value && isValid) ? '' : 'Введите правильный Email',
      },
    });
  };

  handlePasswordChange = (event) => {
    const value = event.target.value;
    let message = '';

    if (!value) {
      message = 'Введите пароль';
    }

    if (value && value.length < 6) {
      message = 'Пароль должен состоять минимум из 6 символов';
    }

    this.setState({
      errorMessages: {
        ...this.state.errorMessages,
        password: message,
      },
      password: value,
    });
  };

  render() {
    return (<div className={styles.login}>
      <span className={styles.title}>Авторизация</span>

      <Form className={styles.form} model="login" onSubmit={this.sendHandler}>
        <div className={styles.fieldContainer}>
          <Input
            label="Email"
            model=".email"
            errorText={this.state.errorMessages.email}
            onChange={this.handleEmailChange}
          />
        </div>

        <div className={styles.fieldContainer}>
          <Input
            label="Пароль"
            model=".password"
            type="password"
            errorText={this.state.errorMessages.password}
            onChange={this.handlePasswordChange}
          />
        </div>

        <RaisedButton
          primary
          type="submit"
          label="Войти"
          className={styles.buttonSubmit}
        />
      </Form>

      <Snackbar
        open={this.state.snackbar.showed}
        message={this.state.snackbar.message}
        autoHideDuration={4000}
        onRequestClose={this.handleSnackbarClose}
      />
    </div>);
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default compose(
  connect(),
)(Login);
