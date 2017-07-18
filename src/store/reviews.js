import { apiPath } from 'configuration';
import { createApi } from 'components/Http';

export const reviewsApi = createApi({
  reviews: {
    url: `${apiPath}/reviews`,
  },
  userReviews: {
    url: `${apiPath}/reviews/user/:id`,
  },
  addReview: {
    url: `${apiPath}/reviews/add`,
    options: {
      method: 'post',
    },
  },
});

export const getReviews = () => reviewsApi.actions.reviews();
export const getUserReviews = id => reviewsApi.actions.userReviews({ id });
