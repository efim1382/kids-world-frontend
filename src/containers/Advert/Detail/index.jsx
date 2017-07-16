import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';

import {
  Header,
  Footer,
} from 'components';

import baseStyles from 'containers/Layout/style.css';

import { api } from 'containers/Advert';
import { api as userApi } from 'containers/User';

import Sidebar from './Sidebar';
import styles from './style.css';

class AdvertDetail extends Component {
  static propTypes = {
    params: PropTypes.objectOf(PropTypes.string),
    dispatch: PropTypes.func.isRequired,
  }

  state = {
    user: {},
    advert: {},
  };

  componentWillMount() {
    const { dispatch, params: { id } } = this.props;

    if (id) {
      dispatch(api.actions.getOneAdvert({ id })).then((advert) => {
        const userId = advert.userId;

        dispatch(userApi.actions.getOneUser({ userId })).then((user) => {
          this.setState({
            user: user.data[0],
            advert,
          });
        });
      });
    }
  }

  render() {
    return (<div className={baseStyles.page}>
      <Header />

      <div className={classNames(baseStyles.content, styles.advertDetail)}>
        <div className={styles.advert}>
          <div className={styles.top}>
            <h2 className={styles.title}>{ this.state.advert.title }</h2>
            <span className={styles.price}>{ this.state.advert.price } р.</span>
          </div>

          <p className={styles.subcaption}>{ this.state.advert.date }, 10 просмотров</p>
          <div className={styles.mainImage} style={{ backgroundImage: `url(${this.state.advert.image})` }} />

          <div
            className={styles.description}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: this.state.advert.description }}
          />
        </div>

        <Sidebar user={this.state.user} className={styles.sidebar} />
      </div>

      <Footer />
    </div>);
  }
}

export default connect()(AdvertDetail);
