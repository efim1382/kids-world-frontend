import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';

import { Form, Field, Notification } from 'components';
import RaisedButton from 'material-ui/RaisedButton';

import api from '../api';

import styles from './style.css';

class Register extends Component {
  state = {
    snackbar: {
      showed: false,
      message: '',
    },
    errorMessages: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      password: '',
      repassword: '',
    },
    password: '',
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

    dispatch(api.actions.register({}, {
      body: JSON.stringify({
        ...data,
        photo: 'images/user-image.jpg',
      }),
    })).then((response) => {
      if (response.status !== 200) {
        this.showSnackbar(response.message);
        return;
      }

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

  handleFirstNameChange = (event) => {
    const value = event.target.value;

    this.setState({
      errorMessages: {
        ...this.state.errorMessages,
        firstName: (value) ? '' : 'Введите имя',
      },
    });
  };

  handleLastNameChange = (event) => {
    const value = event.target.value;

    this.setState({
      errorMessages: {
        ...this.state.errorMessages,
        lastName: (value) ? '' : 'Введите фамилию',
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

  handlePhoneChange = (event) => {
    const value = event.target.value;

    this.setState({
      errorMessages: {
        ...this.state.errorMessages,
        phone: (value) ? '' : 'Введите телефон',
      },
    });
  };

  handleAddressChange = (event) => {
    const value = event.target.value;

    this.setState({
      errorMessages: {
        ...this.state.errorMessages,
        address: (value) ? '' : 'Введите адрес',
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

  handleRepasswordChange = (event) => {
    const value = event.target.value;
    let message = '';

    if (!value) {
      message = 'Введите пароль';
    }

    if (value !== this.state.password) {
      message = 'Пароли не совпадают';
    }

    this.setState({
      errorMessages: {
        ...this.state.errorMessages,
        repassword: message,
      },
    });
  };

  render() {
    return (<div className={styles.register}>
      <span className={styles.title}>Регистрация</span>

      <Form className={styles.form} model="register" onSubmit={this.sendHandler}>
        <div className={styles.fieldContainer}>
          <Field
            label="Имя"
            model=".firstName"
            errorText={this.state.errorMessages.firstName}
            onChange={this.handleFirstNameChange}
          />

          <Field
            label="Фамилия"
            model=".lastName"
            errorText={this.state.errorMessages.lastName}
            onChange={this.handleLastNameChange}
          />
        </div>

        <div className={styles.fieldContainer}>
          <Field
            label="Email"
            model=".email"
            errorText={this.state.errorMessages.email}
            onChange={this.handleEmailChange}
          />

          <Field
            label="Телефон"
            model=".phone"
            errorText={this.state.errorMessages.phone}
            onChange={this.handlePhoneChange}
          />
        </div>

        <div className={styles.fieldContainer}>
          <Field
            label="Адресс"
            model=".address"
            errorText={this.state.errorMessages.address}
            onChange={this.handleAddressChange}
          />
        </div>

        <div className={styles.fieldContainer}>
          <Field
            label="Пароль"
            model=".password"
            type="password"
            errorText={this.state.errorMessages.password}
            onChange={this.handlePasswordChange}
          />

          <Field
            label="Повторите пароль"
            model=".repassword"
            type="password"
            errorText={this.state.errorMessages.repassword}
            onChange={this.handleRepasswordChange}
          />
        </div>

        <RaisedButton
          primary
          type="submit"
          label="Зарегистрироваться"
          className={styles.buttonSubmit}
        />
      </Form>

      <Notification
        show={this.state.snackbar.showed}
        message={this.state.snackbar.message}
        onRequestClose={this.handleSnackbarClose}
      />
    </div>);
  }
}

Register.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default compose(
  connect(),
)(Register);
