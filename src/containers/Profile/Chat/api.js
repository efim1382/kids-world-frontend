import { apiPath } from 'configuration';
import { createApi } from 'components/Http';

export default createApi({
  createChat: {
    url: `${apiPath}/chat/create`,
    options: {
      method: 'post',
    },
  },
  getUserChats: {
    url: `${apiPath}/chats/user/:id`,
  },
  getChatMessages: {
    url: `${apiPath}/chat/:id/messages`,
  },
  getChatUser: {
    url: `${apiPath}/chat/:id/user/currentUser/:userId`,
  },
});

