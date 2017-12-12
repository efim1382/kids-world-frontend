import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import { Link } from 'react-router';

import { Icon, Button, Popup } from 'components';

import { resetToken } from 'containers/Auth/actions';

import styles from './style.css';

class UserLinks extends Component {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    isAuthorize: PropTypes.bool.isRequired,
    handleLogoutClick: PropTypes.func.isRequired,
    handleClosePopup: PropTypes.func.isRequired,
  };

  render() {
    const { show, isAuthorize, handleClosePopup, handleLogoutClick } = this.props;

    return <Popup
      className={styles.popup}
      show={show}
    >
      {!isAuthorize && <Link to="/auth/login" onClick={handleClosePopup}>
        <Icon name="supervisor_account" />
        <label>Войти</label>
      </Link>}

      {!isAuthorize && <Link to="/auth/register" onClick={handleClosePopup}>
        <Icon name="person_add" />
        <label>Зарегистрироваться</label>
      </Link>}

      {isAuthorize && <Link to="/profile/adverts" onClick={handleClosePopup}>
        <Icon name="view_list" />
        <label>Мои объявления</label>
      </Link>}

      {isAuthorize && <Link to="/profile/settings" onClick={handleClosePopup}>
        <Icon name="settings" />
        <label>Настройки</label>
      </Link>}

      {isAuthorize && <button
        onClick={() => {
          handleClosePopup();
          handleLogoutClick();
        }}
      >
        <Icon name="exit_to_app" />
        <label>Выйти</label>
      </button>}
    </Popup>;
  }
}

class Header extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  state = {
    shown: false,
    isAuthorize: false,
  };

  componentWillMount() {
    const token = JSON.parse(localStorage.getItem('token'));

    if (!token) {
      return;
    }

    this.setState({
      isAuthorize: true,
    });
  }

  togglePopup = () => {
    this.setState({
      shown: !this.state.shown,
    });
  };

  handleClosePopup = () => {
    this.setState({
      shown: false,
    });
  };

  handleLogoutClick = () => {
    const { dispatch } = this.props;

    dispatch(resetToken());
    dispatch(replace('/'));

    this.setState({
      isAuthorize: false,
    });
  };

  render() {
    return <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        <img src="/logo-white.png" alt="Kids World" />
        <h1>Kids World</h1>
      </Link>

      <Button icon="more_vert" onClick={this.togglePopup} />

      <UserLinks
        show={this.state.shown}
        isAuthorize={this.state.isAuthorize}
        handleClosePopup={this.handleClosePopup}
        handleLogoutClick={this.handleLogoutClick}
      />
    </header>;
  }
}

export default connect()(Header);
