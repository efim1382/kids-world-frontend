import api from './api';

export const getUsers = () => api.actions.getUsers();
export const bestSalers = () => api.actions.bestSalers();
export const getOneUser = id => api.actions.getOneUser({ id });
