import { apiPath } from 'configuration';
import { createApi } from 'components/Http';

export default createApi({
  login: {
    url: `${apiPath}/auth/login/`,
    options: {
      method: 'post',
    },
  },
  register: {
    url: `${apiPath}/auth/register/`,
    options: {
      method: 'post',
    },
  },
  getUsers: {
    url: `${apiPath}/auth/users/`,
  },
  currentUser: {
    url: `${apiPath}/auth/users/me/`,
    options: {
      method: 'post',
    },
  },
});
