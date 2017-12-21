import React from 'react';
import classNames from 'classnames';
import { Header } from 'components';
import List from './List';
import BestSalers from './BestSalers';
import styles from './style.css';
import baseStyles from '../Layout/style.css';

const Main = () => <div className={baseStyles.page}>
  <Header />

  <div className={classNames(baseStyles.content, styles.main)}>
    <List />
    <BestSalers />
  </div>
</div>;

export default Main;
