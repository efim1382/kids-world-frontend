import { SHOW_CONFIRMATION, HIDE_CONFIRMATION } from './constants';

const initialState = {
  isShown: false,
  question: '',
  handleApprove: () => {},
};

const confirmModalReducer = (state = initialState, action) => {
  if (action.type === SHOW_CONFIRMATION) {
    return {
      isShown: true,
      question: action.question,
      handleApprove: action.handleApprove,
    };
  }

  if (action.type === HIDE_CONFIRMATION) {
    return {
      ...state,
      isShown: false,
    };
  }

  return state;
};

export default confirmModalReducer;
