import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { filterImage } from 'helpers/filters';
import { api as userApi } from 'containers/User';
import advertsApi from 'containers/Profile/Adverts/api';
import { Link } from 'react-router';
import { Button } from 'components';
import styles from './style.css';

const List = ({ adverts }) => <div className={styles.adverts}>
  <Link to="/profile/adverts/add">
    <Button appearance="primary" caption="Подать объявление" />
  </Link>

  {adverts.length > 0 && <ul className={styles.list}>
    {adverts.map(advert => <li key={advert.id} className={styles.advert}>
      <div className={styles.image} style={{ '--image': filterImage(advert.mainImage) }} />

      <div className={styles.tooltip}>
        <h4>{ advert.title }</h4>

        <Link to={`/profile/adverts/${advert.id}/edit`}>
          <Button caption="Редактировать" />
        </Link>
      </div>
    </li>)}
  </ul>}
</div>;

List.propTypes = {
  adverts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    mainImage: PropTypes.string,
  })),
};

export default compose(
  connect(
    state => ({
      adverts: _.get(state, 'adverts.getUserAdverts.data.data', []),
    }),

    {
      currentUser: userApi.actions.currentUser,
      getUserAdverts: advertsApi.actions.getUserAdverts.sync,
    },
  ),

  lifecycle({
    componentWillMount() {
      const token = JSON.parse(localStorage.getItem('token')).key;
      const { currentUser, getUserAdverts } = this.props;

      currentUser({}, {
        body: JSON.stringify({
          token,
        }),
      }).then((user) => {
        getUserAdverts({ id: user.id });
      });
    },
  }),
)(List);
