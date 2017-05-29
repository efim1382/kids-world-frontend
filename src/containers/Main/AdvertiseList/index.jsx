import React, { PropTypes } from 'react';
import classNames from 'classnames';
import Advertise from './Item';
import styles from './style.css';

const AdvertiseList = ({
  items,
  className,
}) => <div className={classNames(styles.advertiseList, className)}>
  {items.map(item => <Advertise
    key={item.id}
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

AdvertiseList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  className: PropTypes.string,
};

export default AdvertiseList;
