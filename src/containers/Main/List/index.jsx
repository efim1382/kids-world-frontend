import React from 'react';
import { Link } from 'react-router';

import { Card } from 'components';

import styles from './style.css';

const List = () => <div className={styles.list}>
  <div className={styles.item}>
    <div className={styles.image} style={{ '--image': 'url("/images/ad-image.jpg")' }} />

    <div className={styles.content}>
      <div className={styles.header}>
        <Card
          image="url('/images/user-image.jpg')"
          link="#"
          name="Иван Петров"
          text="25 декабря, 2017"
        />

        <p className={styles.price}>324 ₽</p>
      </div>

      <h3>Детская футболка</h3>
      <p className={styles.category}>Детская одежда</p>
      <p className={styles.address}>Ул. Красноармейская, 132</p>
      <Link to="#" className={styles.button}>Подробнее</Link>
    </div>
  </div>

  <div className={styles.item}>
    <div className={styles.image} style={{ '--image': 'url("/images/ad-image.jpg")' }} />

    <div className={styles.content}>
      <div className={styles.header}>
        <Card
          image="url('/images/user-image.jpg')"
          link="#"
          name="Иван Петров"
          text="25 декабря, 2017"
        />

        <p className={styles.price}>324 ₽</p>
      </div>

      <h3>Детская футболка</h3>
      <p className={styles.category}>Детская одежда</p>
      <p className={styles.address}>Ул. Красноармейская, 132</p>
      <Link to="#" className={styles.button}>Подробнее</Link>
    </div>
  </div>
</div>;

export default List;
