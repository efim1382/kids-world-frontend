import React from 'react';

import AdvertList from 'components/AdvertList';

const Adverts = () => {
  const adverts = [{
    id: '1',
    image: '/images/ad-image.jpg',
    title: 'Детские тапки, красные',
    link: '/profile/advert/edit/1',
  }, {
    id: '2',
    image: '/images/ad-image.jpg',
    title: 'Детские тапки, красные',
    link: '/profile/advert/edit/2',
  }, {
    id: '3',
    image: '/images/ad-image.jpg',
    title: 'Детские тапки, красные',
    link: '/profile/advert/edit/3',
  }];

  return <AdvertList items={adverts} caption="Подробнее" />;
};

export default Adverts;
