import React from 'react';
import classNames from 'classnames';

import { Header, Card } from 'components';

import styles from './style.css';
import baseStyles from '../Layout/style.css';

const Main = () => <div className={baseStyles.page}>
  <Header />

  <main className={classNames(baseStyles.content, styles.advert)}>
    <div className={styles.advertDetails}>
      <header className={styles.header}>
        <div className={styles.title}>
          <h2>Детские тапки для мальчика</h2>
          <span>220 ₽</span>
        </div>

        <p className={styles.description}>25 мая, 2017, 10 просмотров</p>
      </header>

      <div className={styles.image} style={{ '--image': 'url("/images/ad-image.jpg")' }} />

      <article className={styles.article}>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Reiciendis alias quia, aut, voluptatem quibusdam veniam ullam porro quaerat,
        enim aliquid, molestias adipisci animi?
        Odio voluptates dicta molestias maiores modi voluptate.</p>
      </article>
    </div>

    <div className={styles.sidebar}>
      <Card
        image="url('/images/user-image.jpg')"
        link="#"
        name="Иван Петров"
        text="25 декабря, 2017"
      />

      <div className={styles.properties}>
        <p className={styles.item}><span className={styles.propertyTitle}>Телефон:</span> +7 (909) 40-79-312</p>
        <p className={styles.item}><span className={styles.propertyTitle}>Адрес:</span> Ростов-на-Дону, Красноармейская, 123</p>
      </div>
    </div>
  </main>
</div>;

export default Main;
