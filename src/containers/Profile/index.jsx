import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
    dispatch: PropTypes.func.isRequired,
    children: PropTypes.node,
  }

  state = {
    user: {},
  };

  componentWillMount() {
    const { dispatch } = this.props;
    const token = JSON.parse(localStorage.getItem('token')).key;

    if (!token) {
      return;
    }

    dispatch(api.actions.currentUser({}, {
      body: JSON.stringify({
        token,
      }),
    })).then((resp) => {
      this.setState({
        user: resp,
      });
    });
  }

  render() {
    const { children } = this.props;

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

        <UserProfile user={this.state.user} navigationItems={navItems}>
          { children }
        </UserProfile>

        <Footer />
      </div>
    );
  }
}

export default connect()(Profile);
