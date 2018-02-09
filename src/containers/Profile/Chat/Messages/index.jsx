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
import reviewsApi from 'store/reviews';
import advertsApi from 'containers/Profile/Adverts/api';
import chatApi from '../api';
import styles from './style.css';

class Messages extends Component {
  static propTypes = {
    userId: PropTypes.number.isRequired,

    messages: PropTypes.arrayOf(PropTypes.shape({
      idMessage: PropTypes.number,
      idUser: PropTypes.number,
      text: PropTypes.string,
    })),

    params: PropTypes.shape({
      id: PropTypes.string,
    }),

    adverts: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      description: PropTypes.string,
      mainImage: PropTypes.string,
    })),

    chatUser: PropTypes.shape({
      id: PropTypes.number,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      phone: PropTypes.string,
      email: PropTypes.string,
      address: PropTypes.string,
      photo: PropTypes.string,
    }),

    currentUser: PropTypes.shape({
      id: PropTypes.number,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      phone: PropTypes.string,
      email: PropTypes.string,
      address: PropTypes.string,
      photo: PropTypes.string,
    }),

    reviews: PropTypes.arrayOf(PropTypes.shape({
      idAuthor: PropTypes.number,
      image: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      text: PropTypes.string,
      emotion: PropTypes.string,
    })),

    socket: PropTypes.shape({
      on: PropTypes.func,
      emit: PropTypes.func,
    }).isRequired,

    showMessage: PropTypes.func.isRequired,
    pushUrl: PropTypes.func.isRequired,
    getChatMessages: PropTypes.func.isRequired,
    getUserReviews: PropTypes.func.isRequired,
    getUserAdverts: PropTypes.func.isRequired,
    getChatUser: PropTypes.func.isRequired,
  };

  state = {
    isSubmitDisabled: true,
  };

  componentWillMount() {
    this.updateUserData();
    this.updateMessages();
  }

  componentDidMount() {
    const { showMessage, socket } = this.props;
    document.addEventListener('keydown', this.handleDocumentKeyDown);

    socket.on('message', (responce) => {
      if (responce.status !== 200) {
        showMessage(responce.message);
        return;
      }

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

    if (event.keyCode === 13 && !event.shiftKey && !this.state.isSubmitDisabled) {
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
    const {
      getUserAdverts, getUserReviews, getChatUser, userId,
    } = this.props;

    getChatUser({ id: idChat, userId }).then((responce) => {
      getUserReviews({ id: responce.user.id });
      getUserAdverts({ id: responce.user.id });
    });
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
    if (!this.scrollContainer) {
      return;
    }

    const { scrollHeight, clientHeight } = this.scrollContainer;

    if (scrollHeight > clientHeight) {
      this.scrollContainer.scrollTop = scrollHeight;
    }
  };

  filterMessagesUserPhoto = (idUser) => {
    const { userId, currentUser, chatUser } = this.props;
    return filterUserPhoto(idUser === userId ? currentUser.photo : chatUser.photo);
  };

  filterText = text => text.split(' ').join('').split('\n').join('');

  handleKeyUpInput = (event) => {
    const value = this.filterText(event.target.value);

    if (this.state.isSubmitDisabled && value) {
      this.setState({ isSubmitDisabled: false });
    }

    if (!this.state.isSubmitDisabled && !value) {
      this.setState({ isSubmitDisabled: true });
    }
  };

  render() {
    const {
      messages, currentUser, chatUser, userId, reviews, adverts,
    } = this.props;

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

              {(
                (index > 0 && messages[index].idUser !== messages[index - 1].idUser) ||
                (index === 0)
              ) && <div
                className={styles.image}
                style={{ '--image': this.filterMessagesUserPhoto(message.idUser) }}
              />}
            </div>)
          }
        </div>

        <div className={styles.fieldContainer}>
          <input
            type="text"
            placeholder="Введите Ваше сообщение"
            ref={(input) => { this.input = input; }}
            onKeyUp={this.handleKeyUpInput}
          />

          <Button
            icon="send"
            className={styles.submit}
            onClick={this.sendMessage}
            {...this.state.isSubmitDisabled ? { disabled: 'true' } : {}}
          />
        </div>
      </div>

      <div className={styles.panel}>
        {!_.isEmpty(chatUser) && <header className={styles.header}>
          <Card
            image={filterUserPhoto(chatUser.photo)}
            link={`/user/${chatUser.id}`}
            name={`${chatUser.firstName} ${chatUser.lastName}`}
            text={chatUser.email}
            className={styles.card}
          />

          <div className={styles.property}>
            <Icon name="phone" className={styles.icon} />
            <span className={styles.value}>{ chatUser.phone }</span>
          </div>

          <div className={styles.property}>
            <Icon name="home" className={styles.icon} />
            <span className={styles.value}>{ chatUser.address }</span>
          </div>
        </header>}

        <div className={styles.userActivity}>
          <div className={styles.section}>
            <h3 className={styles.title}>Отзывы о пользователе</h3>

            {!_.isEmpty(reviews) && reviews.map(review => <Card
              key={review.id}
              image={filterUserPhoto(review.photo)}
              link={`/user/${review.idAuthor}`}
              name={`${review.firstName} ${review.lastName}`}
              text={review.text}
              emotion={review.emotion}
              multiple
              className={styles.review}
            />)}

            {reviews.length >= 3 && <Link
              to={`/user/${chatUser.id}/reviews`}
              className={styles.showAll}
            >Посмотреть все</Link>}

            {_.isEmpty(reviews) && <div className={styles.sectionEmptyMessage}>
              О пользователе еще не оставляли отзывов
            </div>}
          </div>

          <div className={styles.section}>
            <h3 className={styles.title}>Объявления пользователя</h3>

            {!_.isEmpty(adverts) && adverts.map(advert => <Card
              key={advert.id}
              image={filterAdvertImage(advert.mainImage)}
              link={`/advert/${advert.id}`}
              name={advert.title}
              text={advert.description}
              className={styles.review}
            />)}

            {adverts.length >= 3 && <Link
              to={`/user/${chatUser.id}/adverts`}
              className={styles.showAll}
            >Посмотреть все</Link>}

            {_.isEmpty(adverts) && <div className={styles.sectionEmptyMessage}>
              У пользователя еще нет объявлений
            </div>}
          </div>
        </div>
      </div>
    </div>;
  }
}

export default socketConnect(connect(
  state => ({
    userId: parseInt(localStorage.getItem('id'), 10) || null,
    messages: _.get(state, 'chat.getChatMessages.data.messages', []),
    chatUser: _.get(state, 'chat.getChatUser.data.user', {}),
    adverts: _.get(state, 'adverts.getUserAdverts.data.adverts', []),
    reviews: _.get(state, 'reviews.getUserReviews.data.reviews', []),
  }),

  {
    getChatMessages: chatApi.actions.getChatMessages.sync,
    getChatUser: chatApi.actions.getChatUser.sync,
    getUserAdverts: advertsApi.actions.getUserAdverts.sync,
    getUserReviews: reviewsApi.actions.getUserReviews.sync,
    showMessage: showNotification,
    pushUrl: push,
  },
)(Messages));
