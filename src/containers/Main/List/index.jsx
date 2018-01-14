import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose, lifecycle, withProps } from 'recompose';
import { Link } from 'react-router';
import { filterCategories, filterAdvertImage, filterUserPhoto } from 'helpers/filters';
import { getAdverts } from 'containers/Profile/Adverts/actions';
import { Card, Button } from 'components';
import styles from './style.css';

const List = ({ adverts, userId }) => <div className={styles.list}>
  {adverts && adverts.map(advert => <div key={advert.id} className={styles.item}>
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
          icon="star"
          onClick={() => {}}
        />}
      </div>

      <h3>{ advert.title }</h3>
      <p className={styles.category}>{ filterCategories(advert.category) }</p>
      <p className={styles.address}>{ advert.address }</p>
      <Link to={`/advert/${advert.id}`} className={styles.button}>Подробнее</Link>
    </div>
  </div>)}
</div>;

List.propTypes = {
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
};

export default compose(
  connect(state => ({
    adverts: state.adverts.list,
    userId: parseInt(localStorage.getItem('id'), 10) || '',
  })),

  withProps(({ dispatch }) => bindActionCreators({ getAdverts }, dispatch)),

  lifecycle({
    componentWillMount() {
      this.props.getAdverts();
    },
  }),
)(List);
