import { apiPath } from 'configuration';
import { createApi } from 'components/Http';

export default createApi({
  getUsers: {
    url: `${apiPath}/users`,
  },
  getOneUser: {
    url: `${apiPath}/users/:id`,
  },
  bestSalers: {
    url: `${apiPath}/bestSalers`,
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
  updateEmail: {
    url: `${apiPath}/users/:id/updateEmail`,
    options: {
      method: 'post',
    },
  },
  updatePhone: {
    url: `${apiPath}/users/:id/updatePhone`,
    options: {
      method: 'post',
    },
  },
  updateAddress: {
    url: `${apiPath}/users/:id/updateAddress`,
    options: {
      method: 'post',
    },
  },
  updatePassword: {
    url: `${apiPath}/users/:id/updatePassword`,
    options: {
      method: 'post',
    },
  },
  deleteProfile: {
    url: `${apiPath}/deleteProfile`,
    options: {
      method: 'post',
    },
  },
});
