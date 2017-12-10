import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { replace } from 'react-router-redux';

import { Icon } from 'components';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import Drawer from 'material-ui/Drawer';

import { resetToken } from 'containers/Auth/actions';

import theme from './theme';
import styles from './style.css';

const Popup = ({ dispatch, isAuthorize }) => <IconMenu
  targetOrigin={{ horizontal: 'right', vertical: 'top' }}
  anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
  iconButtonElement={
    <IconButton>
      <Icon name="more_vert" color={theme.icon.color} />
    </IconButton>
  }
>
  {!isAuthorize && <Link to="/auth/login" className={styles.popupItem}>
    <Icon name="supervisor_account" />
    <label>Войти</label>
  </Link>}

  {!isAuthorize && <Link to="/auth/register" className={styles.popupItem}>
    <Icon name="person_add" />
    <label>Зарегистрироваться</label>
  </Link>}

  <Link to="/profile" className={styles.popupItem}>
    <Icon name="supervisor_account" />
    <label>Профиль</label>
  </Link>

  {isAuthorize && <button
    className={styles.popupItem}
    onClick={() => {
      dispatch(resetToken());
      dispatch(replace('/'));
    }}
  >
    <Icon name="exit_to_app" />
    <label>Выйти</label>
  </button>}
</IconMenu>;

Popup.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthorize: PropTypes.bool.isRequired,
};

class Header extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  state = {
    sidebarShowed: false,
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

  handleToggle = () => {
    this.setState({
      sidebarShowed: !this.state.sidebarShowed,
    });
  };

  handleClose = () => {
    this.setState({
      sidebarShowed: false,
    });
  };

  render() {
    const { dispatch } = this.props;

    const sidebarLinks = [{
      id: 1,
      caption: 'Главная',
      to: '/',
    }, {
      id: 2,
      caption: 'О нас',
      to: '/about',
    }];

    return <div>
      <AppBar
        className={styles.header}
        title={
          <h1 className={styles.title}>Kids World</h1>
        }
        iconElementRight={
          <Popup
            dispatch={dispatch}
            isAuthorize={this.state.isAuthorize}
          />
        }
        onLeftIconButtonTouchTap={this.handleToggle}
      />

      <Drawer
        docked={false}
        open={this.state.sidebarShowed}
        className={styles.sidebar}
        onRequestChange={this.handleClose}
      >
        <div className={styles.sidebarTitle}>Kids World</div>

        {sidebarLinks.map(link => <Link
          key={link.id}
          to={link.to}
          className={styles.sidebarItem}
          onlyActiveOnIndex
          activeClassName="_selected"
        >{ link.caption }</Link>)}
      </Drawer>
    </div>;
  }
}

export default connect()(Header);
