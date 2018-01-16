import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { filterCategories, filterAdvertImage, filterUserPhoto } from 'helpers/filters';
import advertsApi from 'containers/Profile/Adverts/api';
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
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      photo: PropTypes.string.isRequired,
    })).isRequired,

    userId: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),

    isAdvertFavorite: PropTypes.func.isRequired,
    setFavoriteAdvert: PropTypes.func.isRequired,
    getAdverts: PropTypes.func.isRequired,
  };

  state = {
    advertsFavorites: [],
  };

  componentWillMount() {
    this.loadData();
  }

  loadData = () => {
    const { getAdverts, isAdvertFavorite, userId } = this.props;

    const arrayAdverts = [];

    getAdverts().then(() => {
      if (!userId) {
        return;
      }

      this.props.adverts.forEach((advert) => {
        isAdvertFavorite({
          id: advert.id,
          userId,
        }).then((responce) => {
          arrayAdverts.push({
            id: advert.id,
            isFavorite: responce.data || false,
          });

          this.setState({
            advertsFavorites: arrayAdverts,
          });
        });
      });
    });
  };

  render() {
    const { adverts, userId, setFavoriteAdvert } = this.props;

    return <div className={styles.list}>
      {adverts && adverts.map((advert) => {
        const favoriteAdvert = _.find(this.state.advertsFavorites, { id: advert.id });
        const isFavorite = _.get(favoriteAdvert, 'isFavorite');

        return <div key={advert.id} className={styles.item}>
          <div className={styles.image} style={{ '--image': filterAdvertImage(advert.mainImage) }} />

          <div className={styles.content}>
            <div className={styles.header}>
              <Card
                image={filterUserPhoto(advert.photo)}
                link={`/user/${advert.userId}`}
                name={`${advert.firstName} ${advert.lastName}`}
                text={advert.date}
              />

              <p className={styles.price}>{ advert.price } ₽</p>

              {userId && userId !== advert.userId && <Button
                {...isFavorite ? { className: styles.isFavorite } : {}}
                icon="star"

                onClick={() => {
                  setFavoriteAdvert({ id: advert.id }, {
                    body: JSON.stringify({
                      userId,
                    }),
                  }).then(() => {
                    this.loadData();
                  });
                }}
              />}
            </div>

            <h3>{ advert.title }</h3>
            <p className={styles.category}>{ filterCategories(advert.category) }</p>
            <p className={styles.address}>{ advert.address }</p>
            <Link to={`/advert/${advert.id}`} className={styles.button}>Подробнее</Link>
          </div>
        </div>;
      })}
    </div>;
  }
}

export default connect(
  state => ({
    adverts: _.get(state, 'adverts.list', []),
    userId: parseInt(localStorage.getItem('id'), 10) || '',
  }),

  {
    getAdverts: advertsApi.actions.getAdverts.sync,
    setFavoriteAdvert: advertsApi.actions.setFavoriteAdvert.sync,
    isAdvertFavorite: advertsApi.actions.isAdvertFavorite.sync,
  },
)(List);

