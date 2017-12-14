import React from 'react';

import { Card } from 'components';

import styles from './style.css';

const BestSalers = () => <div className={styles.bestSalers}>
  <h3 className={styles.title}>Лучшие продавцы</h3>

  <div className={styles.list}>
    <Card
      image="url('/images/user-image.jpg')"
      link="#"
      name="Иван Петров"
      text="25 декабря, 2017"
    />

    <Card
      image="url('/images/user-image.jpg')"
      link="#"
      name="Иван Петров"
      text="25 декабря, 2017"
    />

    <Card
      image="url('/images/user-image.jpg')"
      link="#"
      name="Иван Петров"
      text="25 декабря, 2017"
    />
  </div>
</div>;

export default BestSalers;
