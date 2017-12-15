import { apiPath } from 'configuration';
import { createApi } from 'components/Http';

export default createApi({
  currentUser: {
    url: `${apiPath}/user/me`,
    options: {
      method: 'post',
    },
  },
});
