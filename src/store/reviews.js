import { apiPath } from 'configuration';
import { createApi } from 'components/Http';

export const reviewsApi = createApi({
  reviews: {
    url: `${apiPath}/reviews`,
  },
  addReview: {
    url: `${apiPath}/reviews/add`,
    options: {
      method: 'post',
    },
  },
});

export const getReviews = () => reviewsApi.actions.reviews();
