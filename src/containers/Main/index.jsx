import React from 'react';
import classNames from 'classnames';

import {
  Header,
  Footer,
} from 'components';

import AdvertList from './AdvertList';
import Sidebar from './Sidebar';
import styles from './style.css';
import baseStyles from '../Layout/style.css';

const Main = () => (
  <div className={baseStyles.page}>
    <Header />

    <div className={classNames(baseStyles.content, styles.main)}>
      <AdvertList className={styles.list} />
      <Sidebar className={styles.sidebar} />
    </div>

    <Footer />
  </div>
  );

export default Main;
