import React from 'react';
import classNames from 'classnames';

import { Header, Footer } from 'components';

import styles from './style.css';
import baseStyles from '../Layout/style.css';

const Main = () => <div className={baseStyles.page}>
  <Header />
  <div className={classNames(baseStyles.content, styles.main)} />
  <Footer />
</div>;

export default Main;
