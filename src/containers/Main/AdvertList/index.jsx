import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose, withProps } from 'recompose';

import classNames from 'classnames';

import { getAdverts } from 'containers/Advert/actions';

import Advert from './Item';
import styles from './style.css';

class AdvertList extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    className: PropTypes.string,
    getAdverts: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.getAdverts();
  }

  render() {
    const { items, className } = this.props;

    return (
      <div className={classNames(styles.advertList, className)}>
        {items.map(item => <Advert
          key={item._id} // eslint-disable-line no-underscore-dangle
          id={item._id} // eslint-disable-line no-underscore-dangle
          title={item.title}
          image={item.image}
          userImage={item.userImage}
          userName={item.userName}
          date={item.date}
          price={item.price}
          category={item.category}
          adress={item.adress}
        />)}
      </div>
    );
  }
}

export default compose(
  connect(state => ({
    items: state.adverts.list,
  })),
  withProps(({ dispatch }) => bindActionCreators({ getAdverts }, dispatch)),
)(AdvertList);
