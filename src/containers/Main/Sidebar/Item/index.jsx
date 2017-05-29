import React, { PropTypes } from 'react';
import Card from 'components/Card';
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
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  })).isRequired,
};

export default Item;
