import React, { PropTypes } from 'react';
import Item from './Item';
import styles from './style.css';

const AdvertList = ({
  items,
}) => (
  <div className={styles.advertListPage}>
    <h3 className={styles.title}>3 активных объявления</h3>

    <div className={styles.advertList}>
      {items.map(advert => (
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

AdvertList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  })).isRequired,
};

export default AdvertList;
