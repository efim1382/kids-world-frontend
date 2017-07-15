import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import {
  Popup,
  Button,
} from 'components';

import { resetToken } from 'containers/Auth/actions';

import styles from './style.css';

const UserLinks = ({ show, dispatch }) => <Popup
  show={show}
  className={styles.popup}
>
  <div className={styles.userLinks}>
    <Link to="/auth/login">
      <Button
        type="transparent"
        caption="Войти"
        icon="supervisor_account"
        className={styles.button}
      />
    </Link>

    <Link to="/auth/register">
      <Button
        type="transparent"
        caption="Зарегистрироваться"
        icon="person_add"
        className={styles.button}
      />
    </Link>

    <Button
      type="transparent"
      caption="Выйти"
      icon="exit_to_app"
      onClick={() => dispatch(resetToken())}
      className={styles.button}
    />

    <Link to="/profile">
      <Button
        type="transparent"
        caption="Профиль"
        className={styles.button}
      />
    </Link>
  </div>
</Popup>;

UserLinks.propTypes = {
  show: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(UserLinks);
