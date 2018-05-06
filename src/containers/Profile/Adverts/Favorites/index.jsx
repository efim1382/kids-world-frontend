import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { filterAdvertImage } from 'helpers/filters';
import advertsApi from 'containers/Profile/Adverts/api';
import { showNotification } from 'components/Notification/actions';
import { CardAdvert } from 'components';
import styles from './style.css';

class Favorites extends Component {
  static propTypes = {
    adverts: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      mainImage: PropTypes.string,
    })),

    userId: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),

    setFavoriteAdvert: PropTypes.func.isRequired,
    getFavoritesAdverts: PropTypes.func.isRequired,
    showMessage: PropTypes.func.isRequired,
    pushURL: PropTypes.func.isRequired,
  };

  componentWillMount() {
    const { getFavoritesAdverts, userId } = this.props;
    getFavoritesAdverts({ userId });
  }

  render() {
    const {
      adverts, pushURL, userId, setFavoriteAdvert, getFavoritesAdverts, showMessage,
    } = this.props;

    return <div className={styles.favorites}>
      {!_.isEmpty(adverts) && <div className={styles.list}>
        {adverts.map(advert => <CardAdvert
          key={advert.id}
          title={advert.title}
          image={filterAdvertImage(advert.mainImage)}
          className={styles.advert}

          actions={[
            {
              icon: 'open-in-new',
              onClick: () => {
                pushURL(`/advert/${advert.id}`);
              },
            },

            {
              icon: 'delete',
              className: styles.delete,

              onClick: () => {
                setFavoriteAdvert({ id: advert.id }, {
                  body: JSON.stringify({ userId }),
                }).then((responce) => {
                  if (responce.status !== 200) {
                    showMessage(responce.message);
                    return;
                  }

                  getFavoritesAdverts({ userId });
                });
              },
            },
          ]}
        />)}
      </div>}

      {_.isEmpty(adverts) && <div className={styles.emptyMessage}>
        У Вас нет ничего в избранных
      </div>}
    </div>;
  }
}

export default connect(
  state => ({
    adverts: _.get(state, 'adverts.getFavoritesAdverts.data.adverts', []),
    userId: parseInt(localStorage.getItem('id'), 10) || '',
  }),

  {
    setFavoriteAdvert: advertsApi.actions.setFavoriteAdvert.sync,
    getFavoritesAdverts: advertsApi.actions.getFavoritesAdverts.sync,
    showMessage: showNotification,
    pushURL: push,
  },
)(Favorites);
