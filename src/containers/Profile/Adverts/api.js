import { apiPath } from 'configuration';
import { createApi } from 'components/Http';

export default createApi({
  addAdvert: {
    url: `${apiPath}/adverts/add`,
    options: {
      method: 'post',
    },
  },
});
