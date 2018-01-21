import { apiPath } from 'configuration';
import { createApi } from 'components/Http';

export default createApi({
  getAdverts: {
    url: `${apiPath}/adverts`,
  },
  getUserAdverts: {
    url: `${apiPath}/adverts/user/:id`,
  },
  getAdvert: {
    url: `${apiPath}/advert/:id`,
  },
  addAdvert: {
    url: `${apiPath}/adverts/add`,
    options: {
      method: 'post',
    },
  },
  editAdvert: {
    url: `${apiPath}/adverts/:id/edit`,
    options: {
      method: 'post',
    },
  },
  setFavoriteAdvert: {
    url: `${apiPath}/advert/:id/favorite`,
    options: {
      method: 'post',
    },
  },
  isAdvertFavorite: {
    url: `${apiPath}/advert/:id/favorite/user/:userId`,
  },
  getFavoritesAdverts: {
    url: `${apiPath}/adverts/favorite/user/:userId`,
  },
  deleteAdvert: {
    url: `${apiPath}/adverts/:id/delete`,
    options: {
      method: 'delete',
    },
  },
});
