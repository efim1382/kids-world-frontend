import { apiPath } from 'configuration';
import { createApi } from 'components/Http';

export default createApi({
  getAdverts: {
    url: `${apiPath}/adverts`,
  },
  getOneAdvert: {
    url: `${apiPath}/adverts/:id`,
  },
  addAdvert: {
    url: `${apiPath}/adverts/add`,
    options: {
      method: 'POST',
    },
  },
});
