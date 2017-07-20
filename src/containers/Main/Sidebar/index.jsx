import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose, withProps } from 'recompose';
import classNames from 'classnames';
import { uploadPath } from 'configuration';

import { bestSalers, getUsers } from 'containers/User/actions';

import Item from './Item';
import styles from './style.css';

class Sidebar extends Component {
  static propTypes = {
    className: PropTypes.string,
    getUsers: PropTypes.func,
    bestSalers: PropTypes.func,
    users: PropTypes.shape({
      photo: PropTypes.string,
      name: PropTypes.string,
      phone: PropTypes.string,
      email: PropTypes.string,
      address: PropTypes.string,
    }),
    best: PropTypes.shape({
      idUserTo: PropTypes.string,
    }),
  };

  componentWillMount() {
    this.props.getUsers();
    this.props.bestSalers();
  }

  getReviewsText = (count) => {
    const num = count % 100;
    const last = count % 10;

    if (num === 1 || (num > 20 && last === 1)) {
      return `${count} положительный отзыв`;
    }

    if (last > 1 && last < 5) {
      return `${count} положительных отзыва`;
    }

    return `${count} положительных отзывов`;
  };

  getUserById = (id) => {
    const { users } = this.props;

    // eslint-disable-next-line no-underscore-dangle
    return users.data.filter(user => user._id === id)[0];
  };

  filterItems = () => {
    const { best, users } = this.props;

    if (!best || !users || !best.data || !users.data) {
      return [];
    }

    const items = [];

    best.data.forEach((item) => {
      const user = this.getUserById(item[0].idUserTo);
      items.push({
        id: user._id, // eslint-disable-line no-underscore-dangle
        image: this.filterImage(user.photo),
        title: user.name,
        caption: this.getReviewsText(item.length),
        link: `/user/${user._id}`, // eslint-disable-line no-underscore-dangle
        count: item.length,
      });
    });

    return items;
  };

  filterImage = (image) => {
    if (image === 'images/user-image.jpg') {
      return `/${image}`;
    }

    return `${uploadPath}/${image}`;
  };

  render() {
    const { className } = this.props;
    const items = this.filterItems();

    const bestAds = [{
      id: '1',
      image: 'images/ad-image.jpg',
      title: 'Обувь для мальчика',
      caption: '145 просмотров',
      link: '/advert/1',
    }, {
      id: '2',
      image: 'images/ad-image.jpg',
      title: 'Обувь для мальчика',
      caption: '145 просмотров',
      link: '/advert/2',
    }, {
      id: '3',
      image: 'images/ad-image.jpg',
      title: 'Обувь для мальчика',
      caption: '145 просмотров',
      link: '/advert/3',
    }];

    return (
      <div className={classNames(styles.sidebar, className)}>
        {items && items.length > 0 && <Item
          title="Лучшие продавцы"
          items={items}
        />}

        <Item
          title="Самые популярные объявления"
          items={bestAds}
        />
      </div>
    );
  }
}

export default compose(
  connect(state => ({
    users: state.users.getUsers.data,
    best: state.users.bestSalers.data,
  })),
  withProps(({ dispatch }) => bindActionCreators({ getUsers, bestSalers }, dispatch)),
)(Sidebar);

/*

1 ый ыв
2-4 ых ва
5-20 ых ов

21 ый ыв
22-24 ых ва
25-30 ых ов

---

101 ый ыв
102-104 ых ва
105-120 ых ов


*/
