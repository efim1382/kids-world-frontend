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

    userId: PropTypes.number,
    getUserAdverts: PropTypes.func.isRequired,
    setFavoriteAdvert: PropTypes.func.isRequired,
    pushURL: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.loadData();
  }

  loadData = () => {
    const {
      getUserAdverts, userId, params: { id },
    } = this.props;

    let data = {};

    if (userId) {
      data = {
        body: JSON.stringify({ userId }),
      };
    }

    getUserAdverts({ id }, { ...data });
  }

  render() {
    const {
      adverts, pushURL, userId, setFavoriteAdvert,
    } = this.props;

    return <div className={styles.adverts}>
      {!_.isEmpty(adverts) && <div className={styles.list}>
        {adverts.map(advert => <CardAdvert
          key={advert.id}
          title={advert.title}
          image={filterAdvertImage(advert.mainImage)}
          className={styles.advert}

          actions={[
            {
              icon: 'open_in_new',

              onClick: () => {
                pushURL(`/advert/${advert.id}`);
              },
            },

            {
              icon: 'star',
              className: classNames(styles.favoriteButton, { '_is-favorite': advert.isFavorite }),

              onClick: () => {
                setFavoriteAdvert({ id: advert.id }, {
                  body: JSON.stringify({ userId }),
                }).then(() => {
                  this.loadData();
                });
              },
            },
          ]}
        />)}
      </div>}

      {_.isEmpty(adverts) && <div className={styles.emptyMessage}>
        Этот пользователь еще не размещал объявлений
      </div>}
    </div>;
  }
}

export default connect(
  state => ({
    adverts: _.get(state, 'adverts.getUserAdverts.data.adverts', []),
    userId: parseInt(localStorage.getItem('id'), 10) || null,
  }),

  {
    getUserAdverts: advertsApi.actions.getUserAdverts.sync,
    setFavoriteAdvert: advertsApi.actions.setFavoriteAdvert.sync,
    pushURL: push,
  },
)(Adverts);
