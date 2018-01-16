import { apiPath } from 'configuration';
import { createApi } from 'components/Http';

export default createApi({
  getUser: {
    url: `${apiPath}/user/:id`,
  },
  getUsers: {
    url: `${apiPath}/users`,
  },
  getBestSalers: {
    url: `${apiPath}/users/bestSalers`,
  },
  currentUser: {
    url: `${apiPath}/user/me`,
    options: {
      method: 'post',
    },
  },
  changeAddress: {
    url: `${apiPath}/user/address`,
    options: {
      method: 'post',
    },
  },
  changePhone: {
    url: `${apiPath}/user/phone`,
    options: {
      method: 'post',
    },
  },
  changeEmail: {
    url: `${apiPath}/user/email`,
    options: {
      method: 'post',
    },
  },
  changePassword: {
    url: `${apiPath}/user/password`,
    options: {
      method: 'post',
    },
  },
  changePhoto: {
    url: `${apiPath}/user/photo`,
    options: {
      method: 'post',
    },
  },
  deleteProfile: {
    url: `${apiPath}/user/delete`,
    options: {
      method: 'delete',
    },
  },
});
