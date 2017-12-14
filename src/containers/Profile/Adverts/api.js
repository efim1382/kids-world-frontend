import { apiPath } from 'configuration';
import { createApi } from 'components/Http';

export default createApi({
  getAdverts: {
    url: `${apiPath}/adverts`,
  },
  createAdvert: {
    url: `${apiPath}/adverts/create`,
    options: {
      method: 'post',
    },
  },
  addAdvert: {
    url: `${apiPath}/adverts/add`,
    options: {
      method: 'post',
    },
  },
});
