import { apiPath } from 'configuration';
import { createApi } from 'components/Http';

export default createApi({
  getAdverts: {
    url: `${apiPath}/adverts/`,
    options: {
      method: 'GET',
    },
  },
  addAdvert: {
    url: `${apiPath}/adverts/add/`,
    options: {
      method: 'POST',
    },
  },
});
