import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { filterImage } from 'helpers/filters';
import { api as userApi } from 'containers/User';
import advertsApi from 'containers/Profile/Adverts/api';
import { Link } from 'react-router';
import { Button, CardAdvert } from 'components';
import styles from './style.css';

class List extends Component {
  static propTypes = {
    adverts: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      mainImage: PropTypes.string,
    })),

    currentUser: PropTypes.func.isRequired,
    getUserAdverts: PropTypes.func.isRequired,
    deleteAdvert: PropTypes.func.isRequired,
    pushURL: PropTypes.func.isRequired,
  };

  componentWillMount() {
    const token = JSON.parse(localStorage.getItem('token')).key;
    const { currentUser, getUserAdverts } = this.props;

    currentUser({}, {
      body: JSON.stringify({
        token,
      }),
    }).then((user) => {
      getUserAdverts({ id: user.id });
      this.userId = user.id;
    });
  }

  render() {
    const {
      adverts, deleteAdvert, getUserAdverts, pushURL,
    } = this.props;

    return <div className={styles.adverts}>
      <Link to="/profile/adverts/add">
        <Button appearance="primary" caption="Подать объявление" />
      </Link>

      {adverts.length > 0 && <div className={styles.list}>
        {adverts.map(advert => <CardAdvert
          key={advert.id}
          title={advert.title}
          image={filterImage(advert.mainImage)}
          className={styles.advert}

          actions={[
            {
              icon: 'open_in_new',
              onClick: () => {
                pushURL(`/advert/${advert.id}`);
              },
            },

            {
              icon: 'mode_edit',
              onClick: () => {
                pushURL(`/profile/adverts/${advert.id}/edit`);
              },
            },

            {
              icon: 'delete',
              className: styles.deleteButton,
              onClick: () => {
                deleteAdvert({ id: advert.id }).then(() => {
                  getUserAdverts({ id: this.userId });
                });
              },
            },
          ]}
        />)}
      </div>}
    </div>;
  }
}

export default connect(
  state => ({
    adverts: _.get(state, 'adverts.getUserAdverts.data.data', []),
  }),

  {
    currentUser: userApi.actions.currentUser,
    getUserAdverts: advertsApi.actions.getUserAdverts.sync,
    deleteAdvert: advertsApi.actions.deleteAdvert.sync,
    pushURL: push,
  },
)(List);
