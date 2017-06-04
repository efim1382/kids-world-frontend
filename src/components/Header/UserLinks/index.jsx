import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Popup from 'components/Popup';
import Button from 'components/Button';
import styles from './style.css';

const UserLinks = ({ show }) => <Popup
  show={show}
  className={styles.popup}
>
  <div className={styles.userLinks}>
    <Link to="/auth/login">
      <Button
        type="transparent"
        caption="Войти"
        icon="input"
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
};

export default UserLinks;
