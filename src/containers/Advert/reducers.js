const initialState = {
  adverts: {},
};

function advertsReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_NEW_ADVERT':
      return {
        ...state,
        adverts: action.data,
      };
    default:
      return state;
  }
}

export default advertsReducer;
