import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { socketConnect } from 'socket.io-react';
import { push } from 'react-router-redux';
import { showNotification } from 'components/Notification/actions';
import { Card, Icon, Button } from 'components';
import { filterUserPhoto, filterAdvertImage } from 'helpers/filters';
import userApi from 'containers/User/api';
import reviewsApi from 'store/reviews';
import advertsApi from 'containers/Profile/Adverts/api';
import chatApi from '../api';
import styles from './style.css';

class Messages extends Component {
  static propTypes = {
    socket: PropTypes.shape({
      on: PropTypes.func,
      emit: PropTypes.func,
    }).isRequired,

    updateChats: PropTypes.func.isRequired,
    showMessage: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.updateUserData();
    this.updateMessages();
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleDocumentKeyDown);
    const { showMessage, updateChats, socket } = this.props;

    socket.on('message', (responce) => {
      if (responce.status !== 200) {
        showMessage(responce.message);
        return;
      }

      updateChats();
      this.updateMessages();
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.id !== this.props.params.id) {
      this.updateMessages(nextProps.params.id);
      this.updateUserData(nextProps.params.id);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleDocumentKeyDown);
  }

  handleDocumentKeyDown = (event) => {
    const { pushUrl } = this.props;

    if (event.keyCode === 27) {
      pushUrl('/profile/chat');
    }

    if (event.keyCode === 13 && this.input === document.activeElement) {
      this.sendMessage();
    }
  }

  updateMessages = (id = this.props.params.id) => {
    const { getChatMessages } = this.props;

    getChatMessages({ id }).then(() => {
      this.scrollMessagesToBottom();
    });
  };

  updateUserData = (idChat = this.props.params.id) => {
    const { getChatUser, params: { id }, userId } = this.props;
    getChatUser({ id: idChat, userId });
  };

  sendMessage = () => {
    const { params: { id }, userId } = this.props;
    const message = this.input.value;

    if (!message) {
      return;
    }

    const data = {
      id,
      userId,
      message,
    };

    this.props.socket.emit('message', data);
    this.input.value = '';
  };

  scrollMessagesToBottom = () => {
    this.scrollContainer.scrollTop = this.scrollContainer.scrollHeight;
  };

  filterMessagesUserPhoto = (idUser) => {
    const { userId, currentUser, chatUser } = this.props;
    return filterUserPhoto(idUser === userId ? currentUser.photo : chatUser.photo);
  };

  render() {
    const { messages, currentUser, chatUser, userId } = this.props;

    return <div className={styles.messages}>
      <div className={styles.list}>
        <div className={styles.info}>
          <span className={styles.time}>Был(а) в сети вчера в 22:00</span>
        </div>

        <div
          className={styles.scroll}
          ref={(container) => { this.scrollContainer = container; }}
        >
          {
            !_.isEmpty(messages) &&
            !_.isEmpty(chatUser) &&
            !_.isEmpty(currentUser) &&
            messages.map((message, index) => <div
              key={message.idMessage}
              className={styles.message}
              data-author={message.idUser === userId ? 'you' : 'user'}
            >
              <div className={styles.text}>{ message.text }</div>

              {
                (
                  (index > 0 && messages[index].idUser !== messages[index - 1].idUser) || (index === 0)
                ) && <div
                  className={styles.image}
                  style={{ '--image': this.filterMessagesUserPhoto(message.idUser) }}
                />
              }
            </div>)
          }
        </div>

        <div className={styles.fieldContainer}>
          <input type="text" placeholder="Введите Ваше сообщение" ref={(input) => { this.input = input; }} />
          <Button icon="send" className={styles.submit} onClick={this.sendMessage} />
        </div>
      </div>

      <div className={styles.panel} />
    </div>;
  }
}

export default socketConnect(connect(
  state => ({
    userId: parseInt(localStorage.getItem('id'), 10) || null,
    messages: _.get(state, 'chat.getChatMessages.data.messages', []),
    chatUser: _.get(state, 'chat.getChatUser.data.user', {}),
  }),

  {
    getChatMessages: chatApi.actions.getChatMessages.sync,
    getChatUser: chatApi.actions.getChatUser.sync,
    showMessage: showNotification,
    pushUrl: push,
  },
)(Messages));
