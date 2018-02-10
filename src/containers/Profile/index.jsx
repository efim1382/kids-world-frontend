import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { socketConnect } from 'socket.io-react';

import {
  Header,
  Form,
  Files,
  UserProfile,
  Navigation,
  Modal,
  ChatLayout,
} from 'components';

import { api as userApi } from 'containers/User';
import chatApi from 'containers/Profile/Chat/api';
import { showNotification } from 'components/Notification/actions';
import styles from './style.css';
import baseStyles from '../Layout/style.css';

export routes from './routes';

class Profile extends Component {
  static propTypes = {
    user: PropTypes.shape({
      id: PropTypes.number,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      phone: PropTypes.string,
      email: PropTypes.string,
      address: PropTypes.string,
      photo: PropTypes.string,
    }),

    chats: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      message: PropTypes.string,
      photo: PropTypes.string,
    })),

    socket: PropTypes.shape({
      on: PropTypes.func,
    }).isRequired,

    userId: PropTypes.number,
    showMessage: PropTypes.func.isRequired,
    getUserChats: PropTypes.func.isRequired,
    currentUser: PropTypes.func.isRequired,
    changePhoto: PropTypes.func.isRequired,
    children: PropTypes.node,
  };

  state = {
    modalShown: false,
  };

  componentWillMount() {
    this.updateChats();
    this.updateProfileData();
  }

  componentDidMount() {
    const { socket, showMessage } = this.props;

    socket.on('message', (responce) => {
      if (responce.status !== 200) {
        showMessage(responce.message);
        return;
      }

      this.updateChats();
    });
  }

  showModal = () => {
    this.setState({
      modalShown: true,
    });
  };

  closeModal = () => {
    this.setState({
      modalShown: false,
    });
  };

  handleSubmit = (data) => {
    const { changePhoto, user, showMessage } = this.props;

    const body = new FormData();
    body.append('id', user.id);
    body.append('photo', data.photo[0]);

    this.closeModal();

    changePhoto({}, { body }).then((responce) => {
      if (responce.status !== 200) {
        showMessage(responce.message);
        return;
      }

      this.updateProfileData();
    });
  };

  handleFilesChange = () => {
    // Не успевает почему то попадать данные формы в data
    // Поэтому ставим setTimeout на 0
    setTimeout(() => {
      this.uploadForm.submit();
    }, 0);
  };

  updateProfileData = () => {
    const token = localStorage.getItem('token');

    this.props.currentUser({}, {
      body: JSON.stringify({ token }),
    });
  };

  updateChats = () => {
    const { userId, getUserChats } = this.props;
    getUserChats({ id: userId });
  };

  render() {
    const { children, user, chats } = this.props;

    const navigationItems = [
      {
        name: 'Объявления',
        link: '/profile/adverts',
      },

      {
        name: 'Сообщения',
        link: '/profile/chat',
      },

      {
        name: 'Избранное',
        link: '/profile/favorites',
      },

      {
        name: 'Отзывы',
        link: '/profile/reviews',
      },

      {
        name: 'Настройки',
        link: '/profile/settings',
      },
    ];

    return <div className={baseStyles.page}>
      <Header />

      <div className={classNames(baseStyles.content, styles.profile)}>
        {!_.isEmpty(user) && !window.location.pathname.includes('/profile/chat') && <UserProfile
          name={`${user.firstName} ${user.lastName}`}
          phone={user.phone}
          email={user.email}
          address={user.address}
          photo={user.photo}
          className={styles.content}
          editablePhoto
          handlePhotoClick={this.showModal}
        >
          <Navigation items={navigationItems} />

          {
            // Переделать только для Settings
            React.cloneElement(children, { user, updateProfile: this.updateProfileData })
          }

          <Modal
            show={this.state.modalShown}
            title="Загрузка новой фотографии"
            className={styles.modal}
            handleClose={this.closeModal}
          >
            <p>Загрузите свою настоящую фотографию.</p>
            <p>Вы можете загрузить фотографию только в форматах JPG, GIF или PNG.</p>

            <Form
              model="changePhoto"
              getRef={(node) => { this.uploadForm = node; }}
              className={styles.photoForm}
              onSubmit={this.handleSubmit}
            >
              <Files
                model=".photo"
                onChange={this.handleFilesChange}
              />
            </Form>
          </Modal>
        </UserProfile>}

        {window.location.pathname.includes('/profile/chat') && !_.isEmpty(user) && <ChatLayout
          className={classNames(styles.content, styles.chat)}
          chats={chats}
        >
          <Navigation items={navigationItems} />

          {
           // Переделать только для Messages
           React.cloneElement(children, {
             currentUser: user,
             updateChats: this.updateChats,
           })
          }
        </ChatLayout>}
      </div>
    </div>;
  }
}

export default socketConnect(connect(
  state => ({
    user: _.get(state, 'users.currentUser.data.user', {}),
    userId: parseInt(localStorage.getItem('id'), 10) || null,
    chats: _.get(state, 'chat.getUserChats.data.chats', []),
  }),

  {
    currentUser: userApi.actions.currentUser.sync,
    changePhoto: userApi.actions.changePhoto.sync,
    getUserChats: chatApi.actions.getUserChats.sync,
    showMessage: showNotification,
  },
)(Profile));
