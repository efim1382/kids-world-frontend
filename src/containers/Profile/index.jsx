import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import {
  Header,
  Form,
  Files,
  UserProfile,
  Navigation,
  Modal,
} from 'components';

import { api as userApi } from 'containers/User';
import styles from './style.css';
import baseStyles from '../Layout/style.css';

export routes from './routes';

class Profile extends Component {
  static propTypes = {
    user: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      phone: PropTypes.string,
      email: PropTypes.string,
      address: PropTypes.string,
      photo: PropTypes.string,
    }),

    currentUser: PropTypes.func.isRequired,
    changePhoto: PropTypes.func.isRequired,
    children: PropTypes.node,
  };

  state = {
    modalShown: false,
  };

  componentWillMount() {
    this.loadData();
  }

  onPhotoClick = () => {
    this.setState({
      modalShown: true,
    });
  };

  loadData = () => {
    const token = localStorage.getItem('token');

    this.props.currentUser({}, {
      body: JSON.stringify({ token }),
    });
  };

  render() {
    const { children, user, changePhoto } = this.props;

    return <div className={baseStyles.page}>
      <Header />

      <div className={classNames(baseStyles.content, styles.profile)}>
        {!_.isEmpty(user) && <UserProfile
          name={`${user.firstName} ${user.lastName}`}
          phone={`${user.phone}`}
          email={`${user.email}`}
          address={`${user.address}`}
          photo={`${user.photo}`}
          className={styles.content}
          editablePhoto
          handlePhotoClick={this.onPhotoClick}
        >
          <Navigation
            items={[
              {
                name: 'Объявления',
                link: '/profile/adverts',
              },

              {
                name: 'Избранное',
                link: '/profile/favorites',
              },

              {
                name: 'Настройки',
                link: '/profile/settings',
              },
            ]}
          />
          {
            // Переделать только для Settings
            React.cloneElement(children, { user, updateProfile: this.loadData })
          }
        </UserProfile>}

        <Modal
          show={this.state.modalShown}
          title="Загрузка новой фотографии"
          className={styles.modal}

          hancleClose={() => {
            this.setState({
              modalShown: false,
            });
          }}
        >
          <p>Загрузите свою настоящую фотографию.</p>
          <p>Вы можете загрузить фотографию только в форматах JPG, GIF или PNG.</p>

          <Form
            model=" "
            getRef={(node) => { this.uploadForm = node; }}
            className={styles.photoForm}
            onSubmit={(data) => {
              const newData = new FormData();
              newData.append('id', user.id);
              newData.append('photo', data.photo[0]);

              this.setState({
                modalShown: false,
              });

              // eslint-disable-next-line no-underscore-dangle
              changePhoto({}, {
                body: newData,
              }).then(() => {
                this.loadData();
              });
            }
          }>
            <Files
              model=".photo"
              onChange={() => {
                // Не успевает почему то попадать данные формы в data
                // Поэтому ставим setTimeout на 0
                setTimeout(() => {
                  this.uploadForm.submit();
                }, 0);
              }}
            />
          </Form>
        </Modal>
      </div>
    </div>;
  }
}

export default compose(connect(
  state => ({
    user: _.get(state, 'users.currentUser.data', {}),
  }),

  {
    currentUser: userApi.actions.currentUser.sync,
    changePhoto: userApi.actions.changePhoto.sync,
  },
))(Profile);
