import { apiPath } from 'configuration';
import { createApi } from 'components/Http';

export default createApi({
  getUser: {
    url: `${apiPath}/user/:id`,
  },
  getUsers: {
    url: `${apiPath}/users`,
  },
  currentUser: {
    url: `${apiPath}/user/me`,
    options: {
      method: 'post',
    },
  },
});
