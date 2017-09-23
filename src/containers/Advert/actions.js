import api from './api';

export const addAdvert = data => api.actions.addAdvert({}, {
  body: JSON.stringify(data),
});

export const getAdverts = () => api.actions.getAdverts();
export const getOneAdvert = id => api.actions.getAdverts({ id });
