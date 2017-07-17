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

import baseStyles from 'containers/Layout/style.css';

import api from './api';

export api from './api';
export reducers from './reducers';
export routes from './routes';

class User extends Component {
  static propTypes = {
    params: PropTypes.objectOf(PropTypes.string),
    children: PropTypes.node,
    user: PropTypes.shape({
      photo: PropTypes.string,
      name: PropTypes.string,
      phone: PropTypes.string,
      email: PropTypes.string,
      address: PropTypes.string,
    }),
    getOneUser: PropTypes.func,
  }

  componentWillMount() {
    const { params: { id } } = this.props;

    if (!id) {
      return;
    }

    this.props.getOneUser({ id });
  }

  componentWillReceiveProps(nextProps) {
    const prevId = this.props.params.id;
    const nextId = nextProps.params.id;

    if (prevId !== nextId) {
      this.props.getOneUser({ id: nextId });
    }
  }

  render() {
    const { children, user, params: { id } } = this.props;

    const navItems = [{
      name: 'Объявления',
      link: `/user/${id}/adverts`,
    }, {
      name: 'Отзывы',
      link: `/user/${id}/reviews`,
    }];

    return (
      <div className={baseStyles.page}>
        <Header />

        <UserProfile user={user} navigationItems={navItems}>
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
      user: get(state, 'users.getOneUser.data', {}),
    }),
    {
      getOneUser: api.actions.getOneUser.sync,
    },
  ),
)(User);
