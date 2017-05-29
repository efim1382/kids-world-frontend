import React from 'react';
import classnames from 'classnames';

import Header from 'components/Header';
import Footer from 'components/Footer';
import AdvertiseList from './AdvertiseList';
import Sidebar from './Sidebar';

import styles from './style.css';
import baseStyles from '../Layout/style.css';

const Main = () => {
  const items = [{
    id: '1',
    image: '/images/ad-image.jpg',
    userImage: '/images/user-image.jpg',
    userName: 'Василий Петров',
    date: '25 января, 2017',
    title: 'Детская курточка на вырост',
    price: 14000,
    category: 'Детские вещи',
    adress: 'Ростов-на-Дону, Красноармейская, 231',
  }, {
    id: '2',
    image: '/images/ad-image.jpg',
    userImage: '/images/user-image.jpg',
    userName: 'Василий Петров',
    date: '25 января, 2017',
    title: 'Детская курточка на вырост',
    price: 14000,
    category: 'Детские вещи',
    adress: 'Ростов-на-Дону, Красноармейская, 231',
  }, {
    id: '3',
    image: '/images/ad-image.jpg',
    userImage: '/images/user-image.jpg',
    userName: 'Василий Петров',
    date: '25 января, 2017',
    title: 'Детская курточка на вырост',
    price: 14000,
    category: 'Детские вещи',
    adress: 'Ростов-на-Дону, Красноармейская, 231',
  }, {
    id: '4',
    image: '/images/ad-image.jpg',
    userImage: '/images/user-image.jpg',
    userName: 'Василий Петров',
    date: '25 января, 2017',
    title: 'Детская курточка на вырост',
    price: 14000,
    category: 'Детские вещи',
    adress: 'Ростов-на-Дону, Красноармейская, 231',
  }];

  return (
    <div className={baseStyles.page}>
      <Header />

      <div className={classnames(baseStyles.content, styles.main)}>
        <AdvertiseList className={styles.list} items={items} />
        <Sidebar className={styles.sidebar} />
      </div>

      <Footer />
    </div>
  );
};

export default Main;
