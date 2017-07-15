import api from './api';

export const getUsers = () => api.actions.getUsers();
export const getOneUser = id => api.actions.getOneUser({ id });
