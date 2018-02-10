import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';
import { connect } from 'react-redux';
import chatApi from 'containers/Profile/Chat/api';
import { push } from 'react-router-redux';

import {
  filterCategories,
  filterAdvertImage,
  filterUserPhoto,
  filterMoney,
} from 'helpers/filters';

import { api as advertsApi } from 'containers/Profile/Adverts';
import { showNotification } from 'components/Notification/actions';
import { Header, Card, Button, Icon } from 'components';
import styles from './style.css';
import baseStyles from '../Layout/style.css';

class Advert extends Component {
  static propTypes = {
    advert: PropTypes.shape({
      title: PropTypes.string,
      date: PropTypes.string,
      price: PropTypes.number,
      category: PropTypes.string,
      description: PropTypes.string,
      mainImage: PropTypes.string,
      userId: PropTypes.number,
      name: PropTypes.string,
      address: PropTypes.string,
      email: PropTypes.string,
      phone: PropTypes.string,
      photo: PropTypes.string,
    }),

    userId: PropTypes.number,
    setFavoriteAdvert: PropTypes.func.isRequired,
    isAdvertFavorite: PropTypes.func.isRequired,
    getAdvert: PropTypes.func.isRequired,
    showMessage: PropTypes.func.isRequired,
    createChat: PropTypes.func.isRequired,
    pushUrl: PropTypes.func.isRequired,
    isFavorite: PropTypes.bool.isRequired,

    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  };

  componentWillMount() {
    this.loadData();
  }

  setAdvertFavorite = () => {
    const {
      showMessage, setFavoriteAdvert, params: { id }, userId,
    } = this.props;

    setFavoriteAdvert({ id }, {
      body: JSON.stringify({ userId }),
    }).then((responce) => {
      if (responce.status !== 200) {
        showMessage(responce.message);
        return;
      }

      this.loadData();
    });
  };

  loadData = () => {
    const {
      params: { id }, getAdvert, isAdvertFavorite, userId,
    } = this.props;

    getAdvert({ id });

    if (!userId) {
      return;
    }

    isAdvertFavorite({ id, userId });
  };

  render() {
    const {
      advert, userId, isFavorite, pushUrl, showMessage, createChat,
    } = this.props;

    return <div className={baseStyles.page}>
      <Header />

      {!_.isEmpty(advert) && <main className={classNames(baseStyles.content, styles.advert)}>
        <div className={styles.advertDetails}>
          <header className={styles.header}>
            <div className={styles.title}>
              <h2>{ advert.title }</h2>
              <span>{ filterMoney(advert.price) } ₽</span>
            </div>

            <div className={styles.description}>
              <p>{ advert.date }, 10 просмотров</p>

              {userId && advert.userId !== userId && <Button
                icon="star"
                onClick={this.setAdvertFavorite}
                {...isFavorite ? { className: styles.isFavorite } : {}}
              />}
            </div>
          </header>

          <div className={styles.image} style={{ '--image': filterAdvertImage(advert.mainImage) }} />

          <p className={styles.category}>
            <span className={styles.nameCategory}>Категория: </span>
            { filterCategories(advert.category) }
          </p>

          <article className={styles.article}>
            <p
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: advert.description }}
            />
          </article>
        </div>

        <div className={styles.sidebar}>
          <Card
            image={filterUserPhoto(advert.photo)}
            link={`/user/${advert.userId}`}
            name={advert.name}
            text={advert.email}
          />

          <div className={styles.properties}>
            {advert.phone && <div className={styles.item}>
              <Icon name="phone" className={styles.icon} />
              <span className={styles.text}>{ advert.phone }</span>
            </div>}

            <div className={styles.item}>
              <Icon name="home" className={styles.icon} />
              <span className={styles.text}>{ advert.address }</span>
            </div>
          </div>

          {userId && advert.userId !== userId && <Button
            caption="Написать продавцу"
            appearance="primary"
            className={styles.whiteUser}

            onClick={() => {
              createChat({}, {
                body: JSON.stringify({
                  idAuthor: userId,
                  idRecipient: advert.userId,
                }),
              }).then((responce) => {
                if (responce.status !== 200) {
                  showMessage(responce.message);
                  return;
                }

                pushUrl(`/profile/chat/${responce.chat.id}`);
              });
            }}
          />}
        </div>
      </main>}
    </div>;
  }
}

export default connect(
  state => ({
    advert: _.get(state, 'adverts.getAdvert.data.advert', {}),
    isFavorite: _.get(state, 'adverts.isAdvertFavorite.data.isFavorite', false),
    userId: parseInt(localStorage.getItem('id'), 10) || null,
  }),

  {
    getAdvert: advertsApi.actions.getAdvert.sync,
    setFavoriteAdvert: advertsApi.actions.setFavoriteAdvert.sync,
    isAdvertFavorite: advertsApi.actions.isAdvertFavorite.sync,
    createChat: chatApi.actions.createChat.sync,
    pushUrl: push,
    showMessage: showNotification,
  },
)(Advert);
