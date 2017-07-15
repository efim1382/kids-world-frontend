import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  Header,
  Footer,
} from 'components';
import UserProfile from 'components/UserProfile';
import AdvertList from 'components/AdvertList';

import { api } from 'containers/User';

import baseStyles from 'containers/Layout/style.css';

class Profile extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }

  state = {
    user: {},
  };

  componentWillMount() {
    const { dispatch } = this.props;
    const token = JSON.parse(localStorage.getItem('token')).key;

    if (token) {
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
  }

  render() {
    const navItems = [{
      name: 'Мои объявления',
      link: '/profile',
      isActive: true,
    }, {
      name: 'Настройки',
      link: '/profile/settings',
    }];

    const adverts = [{
      id: '1',
      image: '/images/ad-image.jpg',
      title: 'Детские тапки, красные',
      link: '/profile/advert/edit/1',
    }, {
      id: '2',
      image: '/images/ad-image.jpg',
      title: 'Детские тапки, красные',
      link: '/profile/advert/edit/2',
    }, {
      id: '3',
      image: '/images/ad-image.jpg',
      title: 'Детские тапки, красные',
      link: '/profile/advert/edit/3',
    }];

    return (
      <div className={baseStyles.page}>
        <Header />

        <UserProfile user={this.state.user} navigationItems={navItems}>
          <AdvertList items={adverts} caption="Редактировать" />
        </UserProfile>

        <Footer />
      </div>
    );
  }
}

export default connect()(Profile);
