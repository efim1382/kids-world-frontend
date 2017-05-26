import React from 'react';
import Header from 'components/Header';
import Footer from 'components/Footer';
import styles from './style.css';

const Main = () => (
  <div>
    <Header />
    <div className={styles.main}>Main</div>
    <Footer />
  </div>
);

export default Main;
