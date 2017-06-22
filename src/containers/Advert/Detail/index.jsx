import React from 'react';
import classNames from 'classnames';
import Header from 'components/Header';
import Footer from 'components/Footer';
import baseStyles from 'containers/Layout/style.css';
import Sidebar from './Sidebar';
import styles from './style.css';

const AdvertDetail = () => (
  <div className={baseStyles.page}>
    <Header />

    <div className={classNames(baseStyles.content, styles.advertDetail)}>
      <div className={styles.advert}>
        <div className={styles.top}>
          <h2 className={styles.title}>Детские тапки для мальчика, красные</h2>
          <span className={styles.price}>250 р.</span>
        </div>

        <p className={styles.subcaption}>25 мая, 2017, 10 просмотров</p>
        <div className={styles.mainImage} style={{ backgroundImage: 'url(/images/ad-image.jpg)' }} />

        <div className={styles.gallary}>
          <div className={styles.smallImage} style={{ backgroundImage: 'url(/images/ad-image.jpg)' }} />
          <div className={styles.smallImage} style={{ backgroundImage: 'url(/images/ad-image.jpg)' }} />
          <div className={styles.smallImage} style={{ backgroundImage: 'url(/images/ad-image.jpg)' }} />
          <div className={styles.smallImage} style={{ backgroundImage: 'url(/images/ad-image.jpg)' }} />
          <div className={styles.smallImage} style={{ backgroundImage: 'url(/images/ad-image.jpg)' }} />
          <div className={styles.smallImage} style={{ backgroundImage: 'url(/images/ad-image.jpg)' }} />
        </div>

        <div className={styles.values}>
          <p className={styles.value}>Размер: 35</p>
          <p className={styles.value}>Цвет: красный</p>
        </div>

        <article className={styles.description}>
          <p>Продаю новые хлопковые брюки на мальчика 5-6 лет.длина от пояса до низа 70 см,
          ширина в поясе 29 см,есть резинка на поясе для регулировки объема. Возможна доставка.</p>
          <p>Продаю новые хлопковые брюки на мальчика 5-6 лет.длина от пояса до низа 70 см,
          ширина в поясе 29 см,есть резинка на поясе для регулировки объема. Возможна доставка.</p>
        </article>
      </div>

      <Sidebar className={styles.sidebar} />
    </div>

    <Footer />
  </div>
);

export default AdvertDetail;
