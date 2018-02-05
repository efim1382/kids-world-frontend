import { apiPath } from 'configuration';
import { createApi } from 'components/Http';

export default createApi({
  getMessages: {
    url: `${apiPath}/chat/messages`,
    options: {
      method: 'post',
    },
  },
  getChats: {
    url: `${apiPath}/chats`,
    options: {
      method: 'post',
    },
  },
});

