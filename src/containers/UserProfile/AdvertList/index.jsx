import React, { PropTypes } from 'react';
import classNames from 'classnames';

import Item from './Item';

import styles from './style.css';

const AdvertList = ({
  className,
}) => {
  const adverts = [{
    id: '1',
    image: '/images/ad-image.jpg',
    title: 'Детские тапки, красные',
    link: '/advert/1',
  }, {
    id: '2',
    image: '/images/ad-image.jpg',
    title: 'Детские тапки, красные',
    link: '/advert/2',
  }, {
    id: '3',
    image: '/images/ad-image.jpg',
    title: 'Детские тапки, красные',
    link: '/advert/3',
  }];

  return (
    <div className={classNames(styles.advertListPage, className)}>
      <h3 className={styles.title}>3 активных объявления</h3>

      <div className={styles.advertList}>
        {adverts.map(advert => (
          <Item
            key={advert.id}
            image={advert.image}
            title={advert.title}
            link={advert.link}
            className={styles.advert}
          />
        ))}
      </div>
    </div>
  );
};

AdvertList.propTypes = {
  className: PropTypes.string,
};

export default AdvertList;
