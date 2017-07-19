import { apiPath } from 'configuration';
import { createApi } from 'components/Http';

export default createApi({
  getUsers: {
    url: `${apiPath}/users`,
  },
  getOneUser: {
    url: `${apiPath}/users/:id`,
  },
  currentUser: {
    url: `${apiPath}/users/me`,
    options: {
      method: 'post',
    },
  },
  updatePhoto: {
    url: `${apiPath}/users/:id/updatePhoto`,
    options: {
      method: 'post',
    },
  },
});
