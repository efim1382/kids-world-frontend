import { apiPath } from 'configuration';
import { createApi } from 'components/Http';

export const reviewsApi = createApi({
  getUserReviews: {
    url: `${apiPath}/reviews/user/:id`,
  },
  createReview: {
    url: `${apiPath}/reviews/add`,
    options: {
      method: 'post',
    },
  },
});
