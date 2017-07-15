import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  Header,
  Footer,
} from 'components';
import UserProfile from 'components/UserProfile';

import baseStyles from 'containers/Layout/style.css';

import api from '../api';
import ReviewsList from './ReviewsList';

class UserReviews extends Component {
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
    }, {
      name: 'Отзывы',
      link: `/user/${id}/reviews`,
      isActive: true,
    }];

    return (
      <div className={baseStyles.page}>
        <Header />

        <UserProfile user={this.state.user} navigationItems={navItems}>
          <ReviewsList />
        </UserProfile>

        <Footer />
      </div>
    );
  }
}

export default connect()(UserReviews);
