export default (initialState, api, mainReducer) => (state = initialState, action) => {
  const reducers = {};
  Object.keys(api.reducers).forEach(
    (key) => {
      reducers[key] = api.reducers[key](state[key], action);
    },
  );
  return {
    ...mainReducer(state, action),
    ...reducers,
  };
};
