import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'components';
import styles from './style.css';

const Item = ({
  title,
  items,
}) => <div className={styles.item}>
  <h3 className={styles.title}>{ title }</h3>

  <div className={styles.section}>
    {items.map(item => <Card
      key={item.id}
      image={item.image}
      title={item.title}
      caption={item.caption}
      link={item.link}
      className={styles.card}
    />)}
  </div>
</div>;

Item.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  })).isRequired,
};

export default Item;
