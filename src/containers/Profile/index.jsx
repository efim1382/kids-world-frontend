import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import {
  Header,
  Footer,
} from 'components';
import UserProfile from 'components/UserProfile';

import { api } from 'containers/User';

import baseStyles from 'containers/Layout/style.css';

export routes from './routes';

class Profile extends Component {
  static propTypes = {
    children: PropTypes.node,
    user: PropTypes.shape({
      photo: PropTypes.string,
      name: PropTypes.string,
      phone: PropTypes.string,
      email: PropTypes.string,
      address: PropTypes.string,
    }),
    currentUser: PropTypes.func,
  }

  componentWillMount() {
    const token = JSON.parse(localStorage.getItem('token')).key;

    if (!token) {
      return;
    }

    this.props.currentUser({}, {
      body: JSON.stringify({
        token,
      }),
    });
  }

  render() {
    const { children, user } = this.props;

    const navItems = [{
      name: 'Объявления',
      link: '/profile/adverts',
    }, {
      name: 'Настройки',
      link: '/profile/settings',
    }];

    return (
      <div className={baseStyles.page}>
        <Header />

        <UserProfile
          changePhoto
          user={user}
          navigationItems={navItems}
        >
          { children }
        </UserProfile>

        <Footer />
      </div>
    );
  }
}

export default compose(
  connect(
    state => ({
      user: get(state, 'users.currentUser.data', {}),
    }),
    {
      currentUser: api.actions.currentUser.sync,
    },
  ),
)(Profile);
