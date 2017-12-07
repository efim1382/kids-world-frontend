import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import styles from './style.css';

const Navigation = ({ items }) => <nav className={styles.navigation}>
  {items.map(item => (
    <Link
      key={item.link}
      to={item.link}
      className={styles.link}
      onlyActiveOnIndex
      activeClassName="_selected"
    >
      { item.name }
    </Link>
  ))}
</nav>;

Navigation.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  })).isRequired,
};

export default Navigation;
