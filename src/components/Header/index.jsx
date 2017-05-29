import React from 'react';
import { Link } from 'react-router';
import Button from 'components/Button';
import styles from './style.css';

const Header = () => (
  <div className={styles.header}>
    <Link className={styles.logo} to="/">Kids World</Link>

    <div className={styles.links}>
      <Button
        caption="Подать объявление"
        type="transparent"
      />

      <Button
        type="transparent"
        icon="person"
      />
    </div>
  </div>
);

export default Header;
