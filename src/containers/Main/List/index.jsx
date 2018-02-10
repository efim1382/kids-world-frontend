import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {
  filterCategories,
  filterAdvertImage,
  filterUserPhoto,
  filterMoney,
} from 'helpers/filters';
import advertsApi from 'containers/Profile/Adverts/api';
import { showNotification } from 'components/Notification/actions';
import { Card, Button } from 'components';
import styles from './style.css';

class List extends Component {
  static propTypes = {
    adverts: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
      mainImage: PropTypes.string.isRequired,
      userId: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      photo: PropTypes.string.isRequired,
    })).isRequired,

    userId: PropTypes.number,
    isAdvertFavorite: PropTypes.func.isRequired,
    setFavoriteAdvert: PropTypes.func.isRequired,
    getAdverts: PropTypes.func.isRequired,
    showMessage: PropTypes.func.isRequired,
    getAdvertsLogged: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.loadData();
  }

  loadData = () => {
    const { getAdverts, getAdvertsLogged, userId } = this.props;

    if (!userId) {
      getAdverts();
      return;
    }

    getAdvertsLogged({}, {
      body: JSON.stringify({ id: userId }),
    });
  };

  toggleAdvertFavorite = (idAdvert) => {
    const { userId, setFavoriteAdvert, showMessage } = this.props;

    setFavoriteAdvert({ id: idAdvert }, {
      body: JSON.stringify({ userId }),
    }).then((responce) => {
      if (responce.status !== 200) {
        showMessage(responce.message);
        return;
      }

      this.loadData();
    });
  };

  render() {
    const { adverts, userId } = this.props;

    return <div className={styles.list}>
      {adverts && adverts.map(advert => <div key={advert.id} className={styles.item}>
        <div className={styles.image} style={{ '--image': filterAdvertImage(advert.mainImage) }} />

        <div className={styles.content}>
          <div className={styles.header}>
            <Card
              image={filterUserPhoto(advert.photo)}
              link={`/user/${advert.userId}`}
              name={advert.name}
              text={advert.date}
            />

            {userId && advert.userId !== userId && <Button
              icon="star"
              onClick={() => { this.toggleAdvertFavorite(advert.id); }}
              {...advert.isFavorite ? { className: styles.isFavorite } : {}}
            />}

            <p className={styles.price}>{ filterMoney(advert.price) } ₽</p>
          </div>

          <h3>{ advert.title }</h3>
          <p className={styles.category}>{ filterCategories(advert.category) }</p>
          <p className={styles.address}>{ advert.address }</p>
          <Link to={`/advert/${advert.id}`} className={styles.button}>Подробнее</Link>
        </div>
      </div>)}
    </div>;
  }
}

export default connect(
  state => ({
    adverts: _.get(state, 'adverts.list', []),
    userId: parseInt(localStorage.getItem('id'), 10) || null,
  }),

  {
    getAdverts: advertsApi.actions.getAdverts.sync,
    getAdvertsLogged: advertsApi.actions.getAdvertsLogged.sync,
    setFavoriteAdvert: advertsApi.actions.setFavoriteAdvert.sync,
    isAdvertFavorite: advertsApi.actions.isAdvertFavorite.sync,
    showMessage: showNotification,
  },
)(List);

