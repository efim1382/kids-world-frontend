import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
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
      <div className={styles.box}>
        <div className={styles.logo} />

        <h3 className={styles.title}>Вход в аккаунт</h3>
        <p className={styles.subcaption}>Продайте все что хотите</p>

        <Form className={styles.form} model="login" onSubmit={this.sendHandler}>
          <Field
            caption="E-Mail"
            type="email"
            model=".email"
            className={styles.field}
          />

          <Field
            caption="Пароль"
            type="password"
            model=".password"
            className={styles.field}
          />

          <Button
            type="submit"
            appearance="primary"
            caption="Войти"
            className={styles.submit}
          />
        </Form>
      </div>

      <p className={styles.registerText}>Еще нет аккаунта?
        <Link to="/auth/register">Зарегистрируйтесь</Link>
      </p>
    </div>;
  }
}

export default connect()(Login);
