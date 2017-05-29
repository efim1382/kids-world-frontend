import React from 'react';
import Header from 'components/Header';
import Footer from 'components/Footer';
import classnames from 'classnames';
import styles from './style.css';
import baseStyles from '../Layout/style.css';

const Main = () => (
  <div className={baseStyles.page}>
    <Header />
    <div className={classnames(baseStyles.content, styles.main)}>Main</div>
    <Footer />
  </div>
);

export default Main;
