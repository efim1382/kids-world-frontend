import React, { Component } from 'react';
import { Link } from 'react-router';

import { Icon } from 'components';

import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import Drawer from 'material-ui/Drawer';

import theme from './theme';
import styles from './style.css';

const Popup = () => <IconMenu
  targetOrigin={{ horizontal: 'right', vertical: 'top' }}
  anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
  iconButtonElement={
    <IconButton>
      <Icon name="more_vert" color={theme.icon.color} />
    </IconButton>
  }
>
  <Link to="/" className={styles.popupItem}>
    <Icon name="supervisor_account" />
    <label>Войти</label>
  </Link>

  <Link to="/auth/register" className={styles.popupItem}>
    <Icon name="person_add" />
    <label>Зарегистрироваться</label>
  </Link>
</IconMenu>;

class Header extends Component {
  state = {
    sidebarShowed: false,
  };

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
    const sidebarLinks = [{
      id: 1,
      caption: 'Главная',
      to: '/',
    }, {
      id: 2,
      caption: 'О нас',
      to: '/about',
    }];

    return (<div>
      <AppBar
        className={styles.header}
        title={
          <h1 className={styles.title}>Kids World</h1>
        }
        iconElementRight={
          <Popup />
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
    </div>);
  }
}

export default Header;
