import React, { PropTypes } from 'react';
import classNames from 'classnames';
import Item from './Item';
import styles from './style.css';

const Sidebar = ({
  className,
}) => {
  const salers = [{
    id: '1',
    image: '/images/user-image.jpg',
    title: 'Валентина Петровна',
    caption: '45 положительных отзывов',
    link: '/user/1',
  }, {
    id: '2',
    image: '/images/user-image.jpg',
    title: 'Валентина Петровна',
    caption: '45 положительных отзывов',
    link: '/user/2',
  }, {
    id: '3',
    image: '/images/user-image.jpg',
    title: 'Валентина Петровна',
    caption: '45 положительных отзывов',
    link: '/user/3',
  }];

  const bestAds = [{
    id: '1',
    image: '/images/ad-image.jpg',
    title: 'Обувь для мальчика',
    caption: '145 просмотров',
    link: '/advert/1',
  }, {
    id: '2',
    image: '/images/ad-image.jpg',
    title: 'Обувь для мальчика',
    caption: '145 просмотров',
    link: '/advert/2',
  }, {
    id: '3',
    image: '/images/ad-image.jpg',
    title: 'Обувь для мальчика',
    caption: '145 просмотров',
    link: '/advert/3',
  }];

  return (
    <div className={classNames(styles.sidebar, className)}>
      <Item
        title="Лучшие продавцы"
        items={salers}
      />

      <Item
        title="Самые популярные объявления"
        items={bestAds}
      />
    </div>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
};

export default Sidebar;
