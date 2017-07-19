import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { get } from 'lodash';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { uploadPath } from 'configuration';

import {
  Header,
  Footer,
} from 'components';

import baseStyles from 'containers/Layout/style.css';

import { api as advertApi } from 'containers/Advert';
import { api as userApi } from 'containers/User';

import Sidebar from './Sidebar';
import styles from './style.css';

class AdvertDetail extends Component {
  static propTypes = {
    params: PropTypes.objectOf(PropTypes.string),
    getOneAdvert: PropTypes.func,
    getOneUser: PropTypes.func,
    user: PropTypes.shape({
      photo: PropTypes.string,
      name: PropTypes.string,
      phone: PropTypes.string,
      email: PropTypes.string,
      address: PropTypes.string,
    }),
    advert: PropTypes.shape({
      title: PropTypes.string,
      price: PropTypes.number,
      date: PropTypes.string,
      image: PropTypes.string,
      description: PropTypes.string,
    }),
  }

  state = {
    userLoaded: false,
  };

  componentWillMount() {
    const { params: { id } } = this.props;

    if (!id) {
      return;
    }

    this.props.getOneAdvert({ id }).then((advert) => {
      const userId = advert.userId;

      this.props.getOneUser({ id: userId }).then(() => {
        this.setState({
          userLoaded: true,
        });
      });
    });
  }

  filterImage = (image) => {
    if (image === 'images/ad-image.jpg') {
      return `/${image}`;
    }

    return `${uploadPath}/${image}`;
  };

  render() {
    const { user, advert } = this.props;

    return (<div className={baseStyles.page}>
      <Header />

      <div className={classNames(baseStyles.content, styles.advertDetail)}>
        <div className={styles.advert}>
          <div className={styles.top}>
            <h2 className={styles.title}>{ advert.title }</h2>
            <span className={styles.price}>{ advert.price } р.</span>
          </div>

          <p className={styles.subcaption}>{ advert.date }, 10 просмотров</p>
          {advert.image !== undefined && <div
            className={styles.mainImage}
            style={{ backgroundImage: `url(${this.filterImage(advert.image)})` }}
          />}

          <div
            className={styles.description}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: advert.description }}
          />
        </div>

        {Object.keys(user).length > 0 && this.state.userLoaded && <Sidebar
          user={user}
          className={styles.sidebar}
        />}
      </div>

      <Footer />
    </div>);
  }
}

export default compose(
  connect(
    state => ({
      advert: get(state, 'adverts.getOneAdvert.data', {}),
      user: get(state, 'users.getOneUser.data', {}),
    }),
    {
      getOneAdvert: advertApi.actions.getOneAdvert.sync,
      getOneUser: userApi.actions.getOneUser.sync,
    },
  ),
)(AdvertDetail);
