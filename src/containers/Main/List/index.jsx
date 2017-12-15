import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose, lifecycle, withProps } from 'recompose';
import { Link } from 'react-router';
import { uploadPath } from 'configuration';

import { getAdverts } from 'containers/Profile/Adverts/actions';

import { Card } from 'components';

import categories from 'containers/Profile/Adverts/categories';

import styles from './style.css';

const filterCategories = advertCategory =>
  categories.filter(category => category.value === advertCategory)[0].name;

const filterImage = (image) => {
  if (image === '/images/ad-image.jpg') return `url('${image}')`;
  return `url(${uploadPath}/${image})`;
};

const List = ({ adverts }) => <div className={styles.list}>
  {adverts && adverts.map(advert => <div key={advert.id} className={styles.item}>
    <div className={styles.image} style={{ '--image': filterImage(advert.mainImage) }} />

    <div className={styles.content}>
      <div className={styles.header}>
        <Card
          image="url('/images/user-image.jpg')"
          link={`/user/${advert.idUser}`}
          name="Иван Петров"
          text={advert.date}
        />

        <p className={styles.price}>{ advert.price } ₽</p>
      </div>

      <h3>{ advert.title }</h3>
      <p className={styles.category}>{ filterCategories(advert.category) }</p>
      <p className={styles.address}>Ул. Красноармейская, 132</p>
      <Link to="#" className={styles.button}>Подробнее</Link>
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
  })).isRequired,
};

export default compose(
  connect(state => ({
    adverts: state.adverts.list,
  })),

  withProps(({ dispatch }) => bindActionCreators({ getAdverts }, dispatch)),

  lifecycle({
    componentWillMount() {
      this.props.getAdverts();
    },
  }),
)(List);
