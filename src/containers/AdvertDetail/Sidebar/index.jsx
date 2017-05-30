import React, { PropTypes } from 'react';
import classNames from 'classnames';

import Card from 'components/Card';

import Reviews from './Reviews';

import styles from './style.css';

const AdvertDetail = ({ className }) => (
  <div className={classNames(styles.sidebar, className)}>
    <Card
      image="/images/user-image.jpg"
      title="Василий Петров"
      caption="vasya@mail.ru"
      link="/user/1"
    />

    <div className={styles.showPhone}>Показать телефон</div>
    <p className={styles.adress}>Адрес: Ростов-на-Дону, Красноармейская, 213</p>

    <Reviews />
  </div>
);

AdvertDetail.propTypes = {
  className: PropTypes.string,
};

export default AdvertDetail;
