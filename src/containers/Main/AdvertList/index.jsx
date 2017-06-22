import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Advert from './Item';
import styles from './style.css';

const AdvertList = ({
  items,
  className,
}) => <div className={classNames(styles.advertList, className)}>
  {items.map(item => <Advert
    key={item.id}
    id={item.id}
    title={item.title}
    image={item.image}
    userImage={item.userImage}
    userName={item.userName}
    date={item.date}
    price={item.price}
    category={item.category}
    adress={item.adress}
  />)}
</div>;

AdvertList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  className: PropTypes.string,
};

export default AdvertList;
