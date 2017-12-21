import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';
import { filterCategories, filterImage, filterUserPhoto } from 'helpers/filters';
import advertsApi from 'containers/Profile/Adverts/api';
import { Header, Card } from 'components';
import styles from './style.css';
import baseStyles from '../Layout/style.css';

const Advert = ({ advert }) => <div className={baseStyles.page}>
  <Header />

  {!_.isEmpty(advert) && <main className={classNames(baseStyles.content, styles.advert)}>
    <div className={styles.advertDetails}>
      <header className={styles.header}>
        <div className={styles.title}>
          <h2>{ advert.title }</h2>
          <span>{ advert.price } ₽</span>
        </div>

        <p className={styles.description}>{ advert.date }, 10 просмотров</p>
      </header>

      <div className={styles.image} style={{ '--image': filterImage(advert.mainImage) }} />

      <article className={styles.article}>
        <p>{ filterCategories(advert.category) }</p>

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
        name={`${advert.firstName} ${advert.lastName}`}
        text={`${advert.email}`}
      />

      <div className={styles.properties}>
        <p className={styles.item}>
          <span className={styles.propertyTitle}>Телефон: </span>
          { advert.phone }
        </p>

        <p className={styles.item}>
          <span className={styles.propertyTitle}>Адрес: </span>
          { advert.address }
        </p>
      </div>
    </div>
  </main>}
</div>;

Advert.propTypes = {
  advert: PropTypes.shape({
    title: PropTypes.string,
    date: PropTypes.string,
    price: PropTypes.number,
    category: PropTypes.string,
    description: PropTypes.string,
    mainImage: PropTypes.string,
    userId: PropTypes.number,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    address: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    photo: PropTypes.string,
  }),
};

export default compose(
  connect(
    state => ({
      advert: _.get(state, 'adverts.getAdvert.data', {}),
    }),

    {
      getAdvert: advertsApi.actions.getAdvert.sync,
    },
  ),

  lifecycle({
    componentWillMount() {
      const { params: { id }, getAdvert } = this.props;
      getAdvert({ id });
    },
  }),
)(Advert);
