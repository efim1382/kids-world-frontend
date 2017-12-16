import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';

import { Form, Button } from 'components';

import styles from './style.css';

class Login extends Component {
  render() {
    return (<div className={styles.login}>
      <span className={styles.title}>Авторизация</span>

      <Form className={styles.form} model="login" onSubmit={() => {}}>
        <Button
          type="submit"
          appearance="primary"
          caption="Войти"
          className={styles.buttonSubmit}
        />
      </Form>
    </div>);
  }
}

Login.propTypes = {
};

export default compose(
  connect(),
)(Login);
