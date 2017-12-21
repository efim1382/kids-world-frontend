import 'isomorphic-fetch';
import reduxApi from 'redux-api';
import adapterFetch from 'redux-api/lib/adapters/fetch';
import { cloneDeep } from 'lodash';
import fetchIntercept from 'fetch-intercept';

fetchIntercept.register({
  request: (url, configuration) => {
    const { headers = {}, ...rest } = cloneDeep(configuration);

    if (headers['Content-Type'] === undefined && typeof configuration.body === 'string') {
      headers['Content-Type'] = 'application/json';
    }

    // in case we have to let browser choose content-type
    if (headers['Content-Type'] === false) {
      delete headers['Content-Type'];
    }

    return [url, {
      ...rest,
      headers,
    }];
  },
});

function createApi(params) {
  return reduxApi(params).use('fetch', adapterFetch(fetch));
}

export { createApi }; // eslint-disable-line import/prefer-default-export
