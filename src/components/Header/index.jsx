import React, { Component } from 'react';
import { Link } from 'react-router';
import ClickOutside from 'helpers/click-outside-popup';

import Button from 'components/Button';
import UserLinks from './UserLinks';

import styles from './style.css';

class Header extends Component {
  state = {
    showed: false,
  };

  togglePopup = () => {
    this.setState({
      showed: !this.state.showed,
    });
  }

  closePopup = () => {
    this.setState({
      showed: false,
    });
  }

  render() {
    return (
      <div className={styles.header}>
        <Link className={styles.logo} to="/">Детский мир</Link>

        <div className={styles.links}>
          <Link>
            <Button
              caption="Подать объявление"
              type="transparent"
              className={styles.addAdv}
            />
          </Link>

          <Button
            type="transparent"
            icon="person"
            className={styles.person}
            onClick={this.togglePopup}
            isActive={this.state.showed}
          />
        </div>

        <UserLinks show={this.state.showed} />
      </div>
    );
  }
}

export default ClickOutside(Header);
