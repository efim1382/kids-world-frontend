import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import { Form, Field, Button } from 'components';
import api from '../api';
import { setToken } from '../actions';
import styles from './style.css';

class Register extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  state = {
    password: '',
    confirmPassword: '',
  };

  sendHandler = (data) => {
    const { dispatch } = this.props;

    dispatch(api.actions.register({}, {
      body: JSON.stringify({
        ...data,
        photo: '/images/user-image.jpg',
      }),
    })).then((response) => {
      if (response.status !== 200) {
        return;
      }

      dispatch(setToken(response.token));
      dispatch(replace('/'));
    });
  };

  render() {
    return (<div className={styles.register}>
      <span className={styles.title}>Регистрация</span>

      <Form className={styles.form} model="register" onSubmit={this.sendHandler}>
        <Field
          caption="Имя"
          type="text"
          model=".firstName"
          className={styles.fieldFirstName}
        />

        <Field
          caption="Фамилия"
          type="text"
          model=".lastName"
          className={styles.fieldLastName}
        />

        <Field
          caption="E-Mail"
          type="email"
          model=".email"
          className={styles.fieldEmail}
        />

        <Field
          caption="Телефон"
          type="text"
          model=".phone"
          className={styles.fieldPhone}
        />

        <Field
          caption="Адрес"
          type="text"
          model=".address"
          className={styles.fieldAddress}
        />

        <Field
          caption="Пароль"
          type="password"
          model=".password"
          className={styles.fieldPassword}
        />

        <Field
          caption="Повторите пароль"
          type="password"
          model=".confirmPassword"
          className={styles.fieldConfirmPassword}
        />

        <Button
          type="submit"
          appearance="primary"
          caption="Зарегистрироваться"
          className={styles.buttonSubmit}
        />
      </Form>
    </div>);
  }
}

export default connect()(Register);
