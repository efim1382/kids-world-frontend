import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { replace } from 'react-router-redux';

import {
  Popup,
  Button,
} from 'components';

import { resetToken } from 'containers/Auth/actions';

import styles from './style.css';

class UserLinks extends Component {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  state = {
    token: false,
  }

  componentWillMount() {
    const item = localStorage.getItem('token');

    if (!item) {
      return;
    }

    this.setState({
      token: true,
    });
  }

  render() {
    const { show, dispatch } = this.props;

    return (<Popup show={show} className={styles.popup} >
      <div className={styles.userLinks}>
        {!this.state.token && <Link to="/auth/login">
          <Button
            type="transparent"
            caption="Войти"
            icon="supervisor_account"
            className={styles.button}
          />
        </Link>}

        {!this.state.token && <Link to="/auth/register">
          <Button
            type="transparent"
            caption="Зарегистрироваться"
            icon="person_add"
            className={styles.button}
          />
        </Link>}

        {this.state.token && <Link to="/profile">
          <Button
            type="transparent"
            caption="Профиль"
            icon="supervisor_account"
            className={styles.button}
          />
        </Link>}

        {this.state.token && <Button
          type="transparent"
          caption="Выйти"
          icon="exit_to_app"
          onClick={() => {
            dispatch(resetToken());

            this.setState({
              token: false,
            });

            dispatch(replace('/'));
          }}
          className={styles.button}
        />}
      </div>
    </Popup>);
  }
}

export default connect()(UserLinks);
