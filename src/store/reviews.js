import { apiPath } from 'configuration';
import { createApi } from 'components/Http';

const reviewsApi = createApi({
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

export default reviewsApi;
