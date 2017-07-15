import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose, withProps } from 'recompose';

import classNames from 'classnames';

import { getAdverts } from 'containers/Advert/actions';
import { getUsers } from 'containers/Auth/actions';

import Advert from './Item';
import styles from './style.css';

class AdvertList extends Component {
  static propTypes = {
    className: PropTypes.string,
    users: PropTypes.arrayOf(PropTypes.shape({
      photo: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
    })),
    items: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
    })),
    getUsers: PropTypes.func.isRequired,
    getAdverts: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.getAdverts();
    this.props.getUsers();
  }

  filterAdverts = () => {
    const { items, users } = this.props;
    const array = [];

    items.forEach((item) => {
      // eslint-disable-next-line no-underscore-dangle
      const currentUser = users.filter(user => user._id === item.userId)[0];
      array.push({
        ...item,
        userId: currentUser._id, // eslint-disable-line no-underscore-dangle
        userName: currentUser.name,
        address: currentUser.address,
        userImage: currentUser.photo,
      });
    });

    return array;
  }

  render() {
    const { className } = this.props;

    return (
      <div className={classNames(styles.advertList, className)}>
        {this.filterAdverts().map(item => <Advert
          key={item._id} // eslint-disable-line no-underscore-dangle
          id={item._id} // eslint-disable-line no-underscore-dangle
          {...item}
        />)}
      </div>
    );
  }
}

export default compose(
  connect(state => ({
    items: state.adverts.list,
    users: state.users.list,
  })),
  withProps(({ dispatch }) => bindActionCreators({ getAdverts, getUsers }, dispatch)),
)(AdvertList);
