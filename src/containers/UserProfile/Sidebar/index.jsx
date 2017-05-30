import React, { PropTypes } from 'react';
import classnames from 'classnames';

import styles from './style.css';

const Sidebar = ({
  className,
}) => <div className={classnames(styles.sidebar, className)}>
  <header className={styles.header}>
    <div
      className={styles.image}
      style={{ backgroundImage: 'url(/images/user-image.jpg)' }}
    />

    <p className={styles.name}>Василий Петров</p>
  </header>

  <h3 className={styles.title}>Контакты</h3>

  <div className={styles.properties}>
    <div className={styles.property}>
      <label className={styles.label}>Телефон:</label>
      <label className={styles.value}>+7 (909) 407-93-12</label>
    </div>

    <div className={styles.property}>
      <label className={styles.label}>Почта:</label>
      <label className={styles.value}>vasya@mail.ru</label>
    </div>

    <div className={styles.property}>
      <label className={styles.label}>Адрес:</label>
      <label className={styles.value}>Ростов-на-Дону, Красноармейская, 213</label>
    </div>
  </div>
</div>;

Sidebar.propTypes = {
  className: PropTypes.string,
};

export default Sidebar;
