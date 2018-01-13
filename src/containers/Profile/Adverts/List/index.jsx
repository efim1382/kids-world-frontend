import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { filterImage } from 'helpers/filters';
import { api as userApi } from 'containers/User';
import advertsApi from 'containers/Profile/Adverts/api';
import { Link } from 'react-router';
import { Button } from 'components';
import styles from './style.css';

class List extends Component {
  static propTypes = {
    adverts: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      mainImage: PropTypes.string,
    })),

    currentUser: PropTypes.func.isRequired,
    getUserAdverts: PropTypes.func.isRequired,
    deleteAdvert: PropTypes.func.isRequired,
  };

  componentWillMount() {
    const token = JSON.parse(localStorage.getItem('token')).key;
    const { currentUser, getUserAdverts } = this.props;

    currentUser({}, {
      body: JSON.stringify({
        token,
      }),
    }).then((user) => {
      getUserAdverts({ id: user.id });
      this.userId = user.id;
    });
  }

  render() {
    const { adverts, deleteAdvert, getUserAdverts } = this.props;

    return <div className={styles.adverts}>
      <Link to="/profile/adverts/add">
        <Button appearance="primary" caption="Подать объявление" />
      </Link>

      {adverts.length > 0 && <ul className={styles.list}>
        {adverts.map(advert => <li key={advert.id} className={styles.advert}>
          <div className={styles.image} style={{ '--image': filterImage(advert.mainImage) }} />

          <div className={styles.tooltip}>
            <h4>{ advert.title }</h4>

            <div className={styles.actions}>
              <Link to={`/profile/adverts/${advert.id}/edit`}>
                <Button icon="mode_edit" />
              </Link>

              <Button
                icon="delete"
                onClick={() => {
                  deleteAdvert({ id: advert.id }).then(() => {
                    getUserAdverts({ id: this.userId });
                  });
                }}
              />
            </div>
          </div>
        </li>)}
      </ul>}
    </div>;
  }
}

export default connect(
  state => ({
    adverts: _.get(state, 'adverts.getUserAdverts.data.data', []),
  }),

  {
    currentUser: userApi.actions.currentUser,
    getUserAdverts: advertsApi.actions.getUserAdverts.sync,
    deleteAdvert: advertsApi.actions.deleteAdvert.sync,
  },
)(List);
