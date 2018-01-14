import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import { Link } from 'react-router';
import { Icon, Button, Popup } from 'components';
import styles from './style.css';

class Header extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  state = {
    isPopupShown: false,
    isAuthorize: false,
  };

  componentWillMount() {
    const token = localStorage.getItem('token');

    if (!token) {
      return;
    }

    this.setState({
      isAuthorize: true,
    });
  }

  handleTogglePopup = () => {
    this.setState({
      isPopupShown: !this.state.isPopupShown,
    });
  };

  handlePopupClose = () => {
    this.setState({
      isPopupShown: false,
    });
  };

  handleLogoutClick = () => {
    const { dispatch } = this.props;

    localStorage.removeItem('token');
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

      <Button icon="more_vert" onClick={this.handleTogglePopup} />

      <Popup
        parentComponent={this}
        show={this.state.isPopupShown}
        handleClose={this.handlePopupClose}
        className={styles.popup}
      >
        {!this.state.isAuthorize && <Link to="/auth/login" onClick={this.handlePopupClose}>
          <Icon name="supervisor_account" />
          <label>Войти</label>
        </Link>}

        {!this.state.isAuthorize && <Link to="/auth/register" onClick={this.handlePopupClose}>
          <Icon name="person_add" />
          <label>Зарегистрироваться</label>
        </Link>}

        {this.state.isAuthorize && <Link to="/profile/adverts/add" onClick={this.handlePopupClose}>
          <Icon name="note_add" />
          <label>Подать объявление</label>
        </Link>}

        {this.state.isAuthorize && <div className={styles.divider} />}

        {this.state.isAuthorize && <Link to="/profile/adverts" onClick={this.handlePopupClose}>
          <Icon name="view_list" />
          <label>Мои объявления</label>
        </Link>}

        {this.state.isAuthorize && <Link to="/profile/settings" onClick={this.handlePopupClose}>
          <Icon name="settings" />
          <label>Настройки</label>
        </Link>}

        {this.state.isAuthorize && <button
          onClick={() => {
            this.handlePopupClose();
            this.handleLogoutClick();
          }}
        >
          <Icon name="exit_to_app" />
          <label>Выйти</label>
        </button>}
      </Popup>
    </header>;
  }
}

export default connect()(Header);
