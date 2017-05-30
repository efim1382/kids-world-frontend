import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import styles from './style.css';

const Navigation = ({
  items,
}) => <div className={styles.navigation}>
  {items.map(item => <Link
    key={item.link}
    to={item.link}
    className={styles.link}
    {...item.isActive ? { 'data-active': '' } : {}}
  >
    { item.name }
  </Link>)}
</div>;

Navigation.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    isActive: PropTypes.bool,
  })).isRequired,
};

export default Navigation;
