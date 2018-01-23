import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import { Icon } from 'components';
import { filterUserPhoto } from 'helpers/filters';
import classNames from 'classnames';
import styles from './style.css';

const items = [
  {
    id: 1,
    firstName: 'Роман',
    lastName: 'Ефимов',
    text: 'Еще продаете детские тапки',
    photo: '/images/user-image.jpg',
  },

  {
    id: 2,
    firstName: 'Роман',
    lastName: 'Ефимов',
    text: 'Еще продаете детские тапки',
    photo: '/images/user-image.jpg',
  },

  {
    id: 3,
    firstName: 'Роман',
    lastName: 'Ефимов',
    text: 'Еще продаете детские тапки',
    photo: '/images/user-image.jpg',
  },

  {
    id: 4,
    firstName: 'Роман',
    lastName: 'Ефимов',
    text: 'Еще продаете детские тапки',
    photo: '/images/user-image.jpg',
  },

  {
    id: 5,
    firstName: 'Роман',
    lastName: 'Ефимов',
    text: 'Еще продаете детские тапки',
    photo: '/images/user-image.jpg',
  },

  {
    id: 6,
    firstName: 'Роман',
    lastName: 'Ефимов',
    text: 'Еще продаете детские тапки',
    photo: '/images/user-image.jpg',
  },

  {
    id: 7,
    firstName: 'Роман',
    lastName: 'Ефимов',
    text: 'Еще продаете детские тапки',
    photo: '/images/user-image.jpg',
  },

  {
    id: 8,
    firstName: 'Роман',
    lastName: 'Ефимов',
    text: 'Еще продаете детские тапки',
    photo: '/images/user-image.jpg',
  },

  {
    id: 9,
    firstName: 'Роман',
    lastName: 'Ефимов',
    text: 'Еще продаете детские тапки',
    photo: '/images/user-image.jpg',
  },

  {
    id: 10,
    firstName: 'Роман',
    lastName: 'Ефимов',
    text: 'Еще продаете детские тапки',
    photo: '/images/user-image.jpg',
  },

  {
    id: 11,
    firstName: 'Роман',
    lastName: 'Ефимов',
    text: 'Еще продаете детские тапки',
    photo: '/images/user-image.jpg',
  },

  {
    id: 12,
    firstName: 'Роман',
    lastName: 'Ефимов',
    text: 'Еще продаете детские тапки',
    photo: '/images/user-image.jpg',
  },
];

const ChatLayout = ({ children, className }) => <div className={styles.chatLayout}>
  <div className={styles.sidebar}>
    <div className={styles.search}>
      <Icon name="search" className={styles.icon} />
      <input className={styles.field} type="text" placeholder="Поиск" />
    </div>

    <div className={styles.list}>
      {items.map(item => <Link
        to={`/profile/chat/${item.id}`}

        className={
          (window.location.pathname.includes(`/profile/chat/${item.id}`))
          ? classNames(styles.item, '_selected')
          : styles.item
        }
      >
        <div className={styles.image} style={{ '--image': filterUserPhoto(item.photo) }} />

        <div className={styles.section}>
          <h4 className={styles.title}>{ item.firstName } {item.lastName}</h4>
          <p className={styles.text}>{ item.text }</p>
        </div>
      </Link>)}
    </div>
  </div>

  <div className={classNames(styles.content, className)}>{ children }</div>
</div>;

ChatLayout.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default ChatLayout;
