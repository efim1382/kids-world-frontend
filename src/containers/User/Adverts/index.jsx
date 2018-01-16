import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { filterAdvertImage } from 'helpers/filters';
import advertsApi from 'containers/Profile/Adverts/api';
import { CardAdvert } from 'components';
import classNames from 'classnames';
import styles from './style.css';

class Adverts extends Component {
  static propTypes = {
    adverts: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      mainImage: PropTypes.string,
    })),

    params: PropTypes.shape({
      id: PropTypes.string,
    }),

    userId: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),

    getUserAdverts: PropTypes.func.isRequired,
    setFavoriteAdvert: PropTypes.func.isRequired,
    isAdvertFavorite: PropTypes.func.isRequired,
    pushURL: PropTypes.func.isRequired,
  };

  state = {
    advertsFavorites: [],
  };

  componentWillMount() {
    this.loadData();
  }

  loadData = () => {
    const {
      getUserAdverts, isAdvertFavorite, userId, params: { id },
    } = this.props;

    getUserAdverts({ id }).then(() => {
      if (!userId) {
        return;
      }

      const arrayAdverts = [];

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
  }

  render() {
    const {
      adverts, pushURL, userId, setFavoriteAdvert,
    } = this.props;

    return <div className={styles.adverts}>
      {!_.isEmpty(adverts) && <div className={styles.list}>
        {adverts.map((advert) => {
          const favoriteAdvert = _.find(this.state.advertsFavorites, { id: advert.id });
          const isFavorite = _.get(favoriteAdvert, 'isFavorite');

          const advertActions = [
            {
              icon: 'open_in_new',

              onClick: () => {
                pushURL(`/advert/${advert.id}`);
              },
            },
          ];

          if (userId) {
            advertActions.push({
              icon: 'star',
              className: classNames(styles.favoriteButton, isFavorite ? styles.isFavorite : ''),

              onClick: () => {
                setFavoriteAdvert({ id: advert.id }, {
                  body: JSON.stringify({
                    userId,
                  }),
                }).then(() => {
                  this.loadData();
                });
              },
            });
          }

          return <CardAdvert
            key={advert.id}
            title={advert.title}
            image={filterAdvertImage(advert.mainImage)}
            className={styles.advert}
            actions={advertActions}
          />;
        })}
      </div>}

      {_.isEmpty(adverts) && <div className={styles.emptyMessage}>
        Этот пользователь еще не размещал объявлений
      </div>}
    </div>;
  }
}

export default connect(
  state => ({
    adverts: _.get(state, 'adverts.getUserAdverts.data.data', []),
    userId: parseInt(localStorage.getItem('id'), 10) || '',
  }),

  {
    getUserAdverts: advertsApi.actions.getUserAdverts.sync,
    setFavoriteAdvert: advertsApi.actions.setFavoriteAdvert.sync,
    isAdvertFavorite: advertsApi.actions.isAdvertFavorite.sync,
    pushURL: push,
  },
)(Adverts);
