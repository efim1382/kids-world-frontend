import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { Card } from 'components';

import {
  filterUserPhoto,
} from 'helpers/filters';

import usersApi from 'containers/User/api';
import styles from './style.css';

const getReviewsText = (count) => {
  const num = count % 100;
  const last = count % 10;

  if (num === 1 || (num > 20 && last === 1)) {
    return `${count} положительный отзыв`;
  }

  if (last > 1 && last < 5) {
    return `${count} положительных отзыва`;
  }

  return `${count} положительных отзывов`;
};

const BestSalers = ({ users }) => <div className={styles.bestSalers}>
  <h3 className={styles.title}>Лучшие продавцы</h3>

  {users && <div className={styles.list}>
    {users.map(user => <Card
      key={user.id}
      image={filterUserPhoto(user.photo)}
      link={`/user/${user.id}`}
      name={`${user.firstName} ${user.lastName}`}
      text={getReviewsText(user.likes)}
    />)}
  </div>}
</div>;

BestSalers.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    photo: PropTypes.string,
    likes: PropTypes.number,
  })),
};

export default compose(
  connect(
    state => ({
      users: _.get(state, 'users.getBestSalers.data.data', []),
    }),

    {
      getBestSalers: usersApi.actions.getBestSalers.sync,
    },
  ),

  lifecycle({
    componentWillMount() {
      const { getBestSalers } = this.props;
      getBestSalers();
    },
  }),
)(BestSalers);
