import { apiPath } from 'configuration';
import { createApi } from 'components/Http';

export default createApi({
  login: {
    url: `${apiPath}/auth/login`,
    options: {
      method: 'post',
    },
  },
  register: {
    url: `${apiPath}/auth/register`,
    options: {
      method: 'post',
    },
  },
});
