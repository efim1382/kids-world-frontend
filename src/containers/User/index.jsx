import React from 'react';
import _ from 'lodash';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { replace } from 'react-router-redux';

import {
  Header,
  UserProfile,
  Navigation,
} from 'components';

import api from './api';
import styles from './style.css';
import baseStyles from '../Layout/style.css';

export routes from './routes';
export api from './api';
export reducers from './reducers';

const User = ({ children, user, params: { id } }) => <div className={baseStyles.page}>
  <Header />

  <div className={classNames(baseStyles.content, styles.user)}>
    {!_.isEmpty(user) && <UserProfile
      name={`${user.firstName} ${user.lastName}`}
      phone={`${user.phone}`}
      email={`${user.email}`}
      address={`${user.address}`}
      photo={`${user.photo}`}
      className={styles.content}
    >
      <Navigation
        items={[
          {
            name: 'Объявления',
            link: `/user/${id}/adverts`,
          },
        ]}
      />

      { children }
    </UserProfile>}
  </div>
</div>;

User.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.string,
    photo: PropTypes.string,
    token: PropTypes.string,
  }),

  params: PropTypes.shape({
    id: PropTypes.string,
  }),

  children: PropTypes.node,
};

export default compose(
  connect(
    state => ({
      user: _.get(state, 'users.getUser.data', {}),
    }),

    dispatch => bindActionCreators({
      getUser: api.actions.getUser.sync,
      redirect: replace,
    }, dispatch),
  ),

  lifecycle({
    componentWillMount() {
      const token = localStorage.getItem('token');
      const { params: { id }, getUser, redirect } = this.props;

      getUser({ id }).then((user) => {
        if (user.token === token) {
          redirect('/profile');
        }
      });
    },
  }),
)(User);
