import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  Header,
  Footer,
} from 'components';
import UserProfile from 'components/UserProfile';
import AdvertList from 'components/AdvertList';

import baseStyles from 'containers/Layout/style.css';

import api from './api';

export api from './api';
export reducers from './reducers';

class User extends Component {
  static propTypes = {
    params: PropTypes.objectOf(PropTypes.string),
    dispatch: PropTypes.func.isRequired,
  }

  state = {
    user: {},
  };

  componentWillMount() {
    const { dispatch, params: { id } } = this.props;

    if (id) {
      dispatch(api.actions.getOneUser({ id })).then((resp) => {
        this.setState({
          user: resp,
        });
      });
    }
  }

  render() {
    const { params: { id } } = this.props;

    const navItems = [{
      name: 'Объявления',
      link: `/user/${id}`,
      isActive: true,
    }, {
      name: 'Отзывы',
      link: `/user/${id}/reviews`,
    }];

    const adverts = [{
      id: '1',
      image: '/images/ad-image.jpg',
      title: 'Детские тапки, красные',
      link: '/advert/1',
    }, {
      id: '2',
      image: '/images/ad-image.jpg',
      title: 'Детские тапки, красные',
      link: '/advert/2',
    }, {
      id: '3',
      image: '/images/ad-image.jpg',
      title: 'Детские тапки, красные',
      link: '/advert/3',
    }];

    return (
      <div className={baseStyles.page}>
        <Header />

        <UserProfile user={this.state.user} navigationItems={navItems}>
          <AdvertList items={adverts} caption="Подробнее" />
        </UserProfile>

        <Footer />
      </div>
    );
  }
}

export default connect()(User);
