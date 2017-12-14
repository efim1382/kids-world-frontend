import moment from 'moment';
import api from './api';

// eslint-disable-next-line import/prefer-default-export
export const addAdvert = data => dispatch => new Promise((resolve, reject) => {
  dispatch(api.actions.createAdvert()).then((responce) => {
    if (responce.status !== 200) {
      reject(responce);
      return;
    }

    const advertId = responce.advertLastid;
    const date = moment().locale('ru').format('DD MMMM, YYYY');

    const newData = new FormData();
    newData.append('id', advertId);
    newData.append('userId', 1);
    newData.append('title', data.title);
    newData.append('date', date);
    newData.append('image', data.image[0]);
    newData.append('price', data.price);
    newData.append('category', data.category);
    newData.append('description', data.description.split('\n').join('<br />'));

    dispatch(api.actions.addAdvert({}, {
      body: newData,
    })).then((resp) => {
      if (resp.status !== 200) {
        reject(resp);
        return;
      }

      resolve(resp);
    });
  });
});
