import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router';

import styles from './style.css';

const Navigation = ({
  items,
  className,
}) => <div className={classNames(styles.navigation, className)}>
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
</div>;

Navigation.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  })).isRequired,
  className: PropTypes.string,
};

export default Navigation;
